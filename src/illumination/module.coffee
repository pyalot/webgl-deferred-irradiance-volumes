Quad = require '/webgl/quad'
Sphere = require '/webgl/sphere'
{Texture2D} = require '/webgl/texture'
Rendernode = require '/rendernode'
{DeferredProbeShadowMap} = require '/depth'

class SHConstants extends require('/events')
    constructor: (gui) ->
        super()
        gui.remember @
        @c1 = 0.43
        @c2 = 0.66
        @band3 = 1.0
        @c3 = 0.9
        @c4 = 0.34
        @c5 = 0.43
        
        @data = new Float32Array(5)

        folder = gui.addFolder('Harmonics')
        folder.add(@, 'c1', 0.0, 4.0).name('L0').onChange @change
        folder.add(@, 'c2', 0.0, 4.0).name('L1').onChange @change
        folder.add(@, 'band3', 0.0, 4.0).name('L2').onChange @change
        folder.add(@, 'c3', 0.0, 4.0).name('L2m2/L2m1/L21').onChange @change
        folder.add(@, 'c4', 0.0, 4.0).name('L20').onChange @change
        folder.add(@, 'c5', 0.0, 4.0).name('L22').onChange @change
        
        @updateData()

    updateData: ->
        @data[0] = @c1
        @data[1] = @c2
        @data[2] = @band3 * @c3
        @data[3] = @band3 * @c4
        @data[4] = @band3 * @c5

    change: =>
        @updateData()
        @trigger 'change'
    
return class Illumination
    constructor: (@gl, gui, sun, sundepth, @lighting, model, normaldepth) ->
        @shconst = new SHConstants(gui).on('change', @update)

        @proj = new Mat4().perspective(90, 1, 0.01, 42)
        @view = new Mat4()

        @mapsize = 32
        @probesize = 16

        @generateProbes()
        @renderProbes(model)
        
        @debug = new Rendernode @gl,
            program: get 'debug.shader'
            drawable: new Sphere @gl, 0.6
            depthBuffer: true
            depthTest: true
            depthWrite: true
            cullFace: 'BACK'
            type: floatExt.type #maybe, not really essential to scene quality
        
        @coefficients = new Rendernode @gl,
            width: 9
            height: @probes.length
            program: get 'harmonics.shader'
            drawable: quad
            filter: 'nearest'
            type: floatExt.type #float is required, otherwise bad banding and wrong colors, maybe could solve this with color packing

        @probes_shadow = new DeferredProbeShadowMap @gl,
            drawable: model
            depth: sundepth
            probes_normal: @probes_normal
            probes_position: @probes_position
            light: sun
            blurred: true

        @probes_shadow
            .resize(@probesize*6, @probesize*@probes.length)
            .updateShadow()

        @probes_global_illumination = new Rendernode gl,
            width: @probesize*6
            height: @probesize*@probes.length
            program: get 'probes_global_illumination.shader'
            blend: 'additive'
            type: floatExt.type
            drawable: quad
        
        @lightprobes = new Rendernode @gl,
            width: @probesize*6
            height: @probesize*@probes.length
            program: get 'composit.shader'
            drawable: quad
            filter: 'nearest'
            type: floatExt.type #float is required due to HDR, maybe could solve this with color packing

        @update()
   
    ## Initialization ##
    generateProbes: () ->
        @probes = []
        for i in [0...7]
            @probes.push
                x: i*4.5 - 3*4.5
                y: 2.2
                z: 0

            @probes.push
                x: i*4.5 - 3*4.5
                y: 2.2
                z: 5.5
            @probes.push
                x: i*4.5 - 3*4.5
                y: 2.2
                z: -5.5

            @probes.push
                x: i*4.5 - 3*4.5
                y: 7.0
                z: 0
            
            @probes.push
                x: i*4.5 - 3*4.5
                y: 7.0
                z: 5.5
            @probes.push
                x: i*4.5 - 3*4.5
                y: 7.0
                z: -5.5

        for i in [1...6]
            @probes.push
                x: i*4.5 - 3*4.5
                y: 12.5
                z: 0
    
    renderProbes: (model) ->
        if get.exists 'diffusemap.jpg'
            @diffusemap = new Texture2D(@gl)
                .bind()
                .upload(get 'diffusemap.jpg')
                .nearest()
                .clampToEdge()
                .unbind()
        else
            @diffusemap = new Rendernode @gl,
                width: @mapsize*6
                height: @mapsize*@probes.length
                program: get 'cube_diffuse.shader'
                drawable: highresmodel
                depthTest: true
                depthWrite: true
                cullFace: 'BACK'
                filter: 'nearest'
                depthBuffer: true

            @diffusemap.start().clear(0, 0, 0)
            @diffusemap.mat4('proj', @proj)
            for probe, i in @probes
                @renderProbe(i, @diffusemap, 'diffuse_texture', probe.x, probe.y, probe.z, @mapsize)
            @diffusemap.end()
            @diffusemap = @diffusemap.output
            
        @probes_position = new Rendernode @gl,
            width: @probesize*6
            height: @probesize*@probes.length
            program: get 'probes_position.shader'
            drawable: model
            depthTest: true
            depthWrite: true
            cullFace: 'BACK'
            filter: 'nearest'
            type: floatExt.type
            depthBuffer: true

        @probes_position.start().clear(0, 0, 0)
        @probes_position.mat4('proj', @proj)
        for probe, i in @probes
            @renderProbe(i, @probes_position, null, probe.x, probe.y, probe.z, @probesize)
        @probes_position.end()
        @probes_position = @probes_position.output
        
        @probes_normal = new Rendernode @gl,
            width: @probesize*6
            height: @probesize*@probes.length
            program: get 'probes_normal.shader'
            drawable: model
            depthTest: true
            depthWrite: true
            cullFace: 'BACK'
            filter: 'nearest'
            type: floatExt.type
            depthBuffer: true

        @probes_normal.start().clear(0, 0, 0, 0)
        @probes_normal.mat4('proj', @proj)
        for probe, i in @probes
            @renderProbe(i, @probes_normal, null, probe.x, probe.y, probe.z, @probesize)
        @probes_normal.end()
        @probes_normal = @probes_normal.output

    renderProbe: (i, node, texture_type, x, y, z, s) ->
        offset = i*s

        @view.identity().translateVal3(-x, -y, -z)
        node.viewport(s*0, offset, s, s).mat4('view', @view).drawModel(texture_type)

        @view.identity().rotatey(180).translateVal3(-x, -y, -z)
        node.viewport(s*1, offset, s, s).mat4('view', @view).drawModel(texture_type)

        @view.identity().rotatey(-90).translateVal3(-x, -y, -z)
        node.viewport(s*2, offset, s, s).mat4('view', @view).drawModel(texture_type)
        
        @view.identity().rotatey(90).translateVal3(-x, -y, -z)
        node.viewport(s*3, offset, s, s).mat4('view', @view).drawModel(texture_type)
        
        @view.identity().rotatex(-90).translateVal3(-x, -y, -z)
        node.viewport(s*4, offset, s, s).mat4('view', @view).drawModel(texture_type)
        
        @view.identity().rotatex(90).translateVal3(-x, -y, -z)
        node.viewport(s*5, offset, s, s).mat4('view', @view).drawModel(texture_type)

    ## Realtime methods ##
    updateGlobalIllumination: ->
        @probes_global_illumination
            .start()
            .clear(0, 0, 0, 0)
            .f('gi_gain', @lighting.giGain)
            .sampler('coefficients', @coefficients)
            .val2('coefficients_size', @coefficients.width, @coefficients.height)
            .sampler('probes_position', @probes_position)
            .sampler('probes_normal', @probes_normal)

        for probe, i in @probes
            @probes_global_illumination
                .val4('lightprobe', probe.x, probe.y, probe.z, i)
                .draw()

        @probes_global_illumination.end()

    updateLightprobes: ->
        @lightprobes
            .start()
            .sampler('direct', @probes_shadow)
            .sampler('global', @probes_global_illumination)
            .sampler('albedo', @diffusemap)
            .sampler('probes_normal', @probes_normal)
            .vec3('sun_radiance', @lighting.sun_radiance)
            .vec3('sky_radiance', @lighting.sky_radiance)
            .draw()
            .end()

    updateDirectLight: ->
        @probes_shadow.updateShadow()

    updateCoefficients: ->
        @coefficients
            .start()
            .val2('lightprobes_size', @lightprobes.width, @lightprobes.height)
            .sampler('lightprobes', @lightprobes)
            .fv('shconst', @shconst.data)
            .draw()
            .end()
    
    update: =>
        @probes_global_illumination.start().clear().end()
        @updateLightprobes()
        @updateCoefficients()

        for i in [0...@lighting.bounces-1]
            @updateGlobalIllumination()
            @updateLightprobes()
            @updateCoefficients()

    drawDebug: (camera, normaldepth) ->
        @debug.start()
            .clearBoth(0, 0, 0, 0)
            .f('gi_gain', @lighting.giGain)
            .sampler('normaldepth', normaldepth)
            .sampler('coefficients', @coefficients)
            .val2('coefficients_size', @coefficients.width, @coefficients.height)
            .mat4('proj', camera.proj)
            .mat4('view', camera.view)

        for probe, i in @probes
            @debug
                .val3('offset', probe.x, probe.y, probe.z)
                .f('index', i)
                .draw()

        @debug.end()
