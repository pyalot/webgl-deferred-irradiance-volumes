Quad = require '/webgl/quad'
Sphere = require '/webgl/sphere'
{Texture2D} = require '/webgl/texture'

Rendernode = require '/rendernode'

{DepthRender, LightmapShadowMap} = require '/depth'
BounceModel = require 'bounce_model'
    
return class Illumination
    constructor: (@gl, sun, @lighting, model, highresmodel, normaldepth, orientation, elevation, @shconst) ->
        @proj = new Mat4().perspective(90, 1, 0.01, 42)
        @view = new Mat4()

        @mapsize = 32
        @probesize = 16

        @generateProbes()
        
        @debug = new Rendernode @gl,
            program: get 'debug.shader'
            drawable: new Sphere @gl, 0.6
            depthBuffer: true
            depthTest: true
            depthWrite: true
            cullFace: 'BACK'
            type: @gl.FLOAT #maybe, not really essential to scene quality
        
        @lightprobes = new Rendernode @gl,
            width: @probesize*6
            height: @probesize*@probes.length
            program: get 'transfer.shader'
            drawable: quad
            filter: 'nearest'
            type: @gl.FLOAT #float is required due to HDR, maybe could solve this with color packing

        @coefficients = new Rendernode @gl,
            width: 9
            height: @probes.length
            program: get 'harmonics.shader'
            drawable: quad
            filter: 'nearest'
            type: @gl.FLOAT #float is required, otherwise bad banding and wrong colors, maybe could solve this with color packing
        
        @direct_light = new LightmapShadowMap gl,
            drawable: model
            depthWidth: 128
            depthHeight: 128
            light: sun
            blurred: true

        @bounce = new Rendernode @gl,
            width: 256
            height: 256
            program: get 'bounce.shader'
            drawable: new BounceModel @gl, model, @probes
            type: @gl.FLOAT #float is required due to additive blending
            blend: 'additive'

        @renderProbes(model, highresmodel)
        @update()

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
    
    updateDirectLight: ->
        @direct_light.update()

    update: () ->
        @bounce.start()
            .clear(0, 0, 0, 1)
            .f('gi_gain', @lighting.giGain)
            .val2('coefficients_size', @coefficients.width, @coefficients.height)
            .fv('shconst', @shconst.data)
            .end()

        @lightprobes
            .start()
            .vec3('sun_radiance', @lighting.sun_radiance)
            .vec3('sky_radiance', @lighting.sky_radiance)
            .sampler('texmap', @texmap)
            .sampler('diffusemap', @diffusemap)
            .sampler('bounce', @bounce)
            .sampler('lightmap', @direct_light.output)
            .draw()
            .end()

        @coefficients
            .start()
            .val2('lightprobes_size', @lightprobes.width, @lightprobes.height)
            .sampler('lightprobes', @lightprobes)
            .fv('shconst', @shconst.data)
            .draw()
            .end()

        for i in [0...@lighting.bounces-1]
            @bounce
                .start()
                .clear(0, 0, 0, 0)
                .sampler('coefficients', @coefficients)
                .draw()
                .end()
            
            @lightprobes
                .start()
                .sampler('texmap', @texmap)
                .sampler('bounce', @bounce)
                .sampler('lightmap', @direct_light.output)
                .draw()
                .end()

            @coefficients
                .start()
                .val2('lightprobes_size', @lightprobes.width, @lightprobes.height)
                .sampler('lightprobes', @lightprobes)
                .draw()
                .end()


    renderProbes: (model, highresmodel) ->
        if get.exists 'texmap.png'
            @texmap = new Texture2D(@gl)
                .bind()
                .upload(get 'texmap.png')
                .nearest()
                .clampToEdge()
                .unbind()
        else
            @texmap = new Rendernode @gl,
                width: @mapsize*6
                height: @mapsize*@probes.length
                program: get 'cubeprobe.shader'
                drawable: model
                depthTest: true
                depthWrite: true
                cullFace: 'BACK'
                filter: 'nearest'
                depthBuffer: true

            @texmap.start().clear(0, 0, 1)
            @texmap.mat4('proj', @proj)
            for probe, i in @probes
                @renderProbe(i, @texmap, null, probe.x, probe.y, probe.z)
            @texmap.end()
            @texmap = @texmap.output

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
                @renderProbe(i, @diffusemap, 'diffuse_texture', probe.x, probe.y, probe.z)
            @diffusemap.end()
            @diffusemap = @diffusemap.output

        #url = getURL @texmap.output.read().buffer
        #$('<a download="texmap.bin">texmap</a>').appendTo('#ui')[0].href = url
        #url = getURL @diffusemap.output.read().buffer
        #$('<a download="diffusemap.bin">texmap</a>').appendTo('#ui')[0].href = url

    renderProbe: (i, node, texture_type, x, y, z) ->
        s = @mapsize
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

    drawDebug: (camera, normaldepth) ->
        @debug.start()
            .clearBoth(0, 0, 0, 0)
            .f('gi_gain', @lighting.giGain)
            .sampler('normaldepth', normaldepth)
            .sampler('coefficients', @coefficients)
            .val2('coefficients_size', @coefficients.width, @coefficients.height)
            .fv('shconst', @shconst.data)
            .mat4('proj', camera.proj)
            .mat4('view', camera.view)

        for probe, i in @probes
            @debug
                .val3('offset', probe.x, probe.y, probe.z)
                .f('index', i)
                .draw()

        @debug.end()
