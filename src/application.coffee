schedule = require 'schedule'
loading = require 'loading'
camera = require 'camera'

Quad = require '/webgl/quad'
Cube = require '/webgl/cube'

Antialias = require 'antialias'
Model = require 'model'
Illumination = require 'illumination'
Rendernode = require '/rendernode'
Windows = require '/windows'
{DepthRender, DeferredShadowMap} = require '/depth'
Sun = require 'sun'
DeferredModel = require 'deferred_model'
SSAO = require 'ssao'

class CompositingControl
    constructor: (gui) ->
        gui.remember @
        @draw_probes = false
        @gi = 1
        @di = 1
        @ao = 0.8
        
        folder = gui.addFolder('Compositing')
        folder.add(@, 'draw_probes').name('Draw Probes')
        folder.add(@, 'gi', 0.0, 2.0).name('Glob. Illum.')
        folder.add(@, 'di', 0.0, 2.0).name('Direct. Illum.')
        folder.add(@, 'ao', 0.0, 1.0).name('SSAO')

class Lighting extends require('events')
    constructor: (gui) ->
        gui.remember @
        super()
        @sunRadiance = 1.0
        @skyRadiance = 1.0
        @giGain = 1.0
        @bounces = 3
        @sunColor = [255, 255, 255]
        @skyColor = [0x07, 0xcb, 0xf5]

        @sun_radiance = [0,0,0]
        @sky_radiance = [0,0,0]

        folder = gui.addFolder('Lighting')
        folder.addColor(@, 'sunColor').name('Sun Color').onChange @computeRadiance
        folder.add(@, 'sunRadiance', 0.0, 20.0).name('Sun Radiance').onChange @computeRadiance
        folder.addColor(@, 'skyColor').name('Sky Color').onChange @computeRadiance
        folder.add(@, 'skyRadiance', 0.0, 20.0).name('Sky Radiance').onChange @computeRadiance
        folder.add(@, 'giGain', 0.0, 20.0).name('GI-gain').onChange @update
        folder.add(@, 'bounces', 1.0, 10.0).step(1).name('Bounces').onChange @bouncesChanged

        @computeRadiance()

        @lastbounces = @bounces

    computeRadiance: =>
        @sun_radiance[0] = @sunRadiance * (@sunColor[0]/255.0)
        @sun_radiance[1] = @sunRadiance * (@sunColor[1]/255.0)
        @sun_radiance[2] = @sunRadiance * (@sunColor[2]/255.0)
        @sky_radiance[0] = @skyRadiance * (@skyColor[0]/255.0)
        @sky_radiance[1] = @skyRadiance * (@skyColor[1]/255.0)
        @sky_radiance[2] = @skyRadiance * (@skyColor[2]/255.0)
        @update()

    bouncesChanged: =>
        if @bounces != @lastBounces
            @lastBounces = @bounces
            @update()

    update: => @trigger('change')

class PictureSettings
    constructor: (gui) ->
        gui.remember @
        @inputGamma = 1.8
        @outputGamma = 1.8
        @brightness = 1.0
        @saturation = 1.0

        folder = gui.addFolder('Picture')
        folder.add(@, 'inputGamma', 0.25, 3.0).name('Input Gamma')
        folder.add(@, 'outputGamma', 0.25, 3.0).name('Output Gamma')
        folder.add(@, 'brightness', 0.0, 10.0).name('Exposure')
        folder.add(@, 'saturation', 0.0, 4.0).name('Saturation')

makeStat = (mode, offset) ->
    stats = new Stats()
    stats.setMode(mode)
    node = $(stats.domElement)
    node.css(
            position: 'absolute'
            left: offset
            top: 0
    ).appendTo('body').hide()

    stats.hide = ->
        node.clearQueue().fadeOut()
    stats.show = ->
        node.clearQueue().fadeIn()

    return stats

exports.Application = class
    constructor: (@canvas) ->
        $('<div id="controls"></div>')
            .css('margin', 10)
            .appendTo('#ui')
        
        gui = @gui = new dat.GUI
            load: get 'presets/new.json'

        gui.remember @
        @gui_width = gui.width = 370
        @gui.closed = true
        @fps = makeStat(0, 0)
        @rtime = makeStat(1, 80)
        @gui_closed = gui.closed

        @resolution = 0.5
        @resolution_label = '1:2 default'
        resmap =
            '2:1 very slow!': 2
            '1:1 slow': 1
            '1:2 default': 0.5
            '1:4 ugly': 0.25
            '1:8 worse': 0.125

        folder = gui.addFolder('Performance')
        $('<li>WASD=move, space=overview, cursor keys=navigate</li>').appendTo(folder.__ul)
        folder.add(@, 'resolution_label', ['2:1 very slow!', '1:1 slow', '1:2 default', '1:4 ugly', '1:8 worse']).name('Resolution').onChange =>
            @resolution = resmap[@resolution_label]
            @resizeBuffers()
        @resolution = resmap[@resolution_label]

        @show_fps = false
        folder.add(@, 'show_fps').name('FPS').onChange =>
            if @show_fps
                @fps.show()
                @rtime.show()
            else
                @fps.hide()
                @rtime.hide()
        if @show_fps
            @fps.show()
            @rtime.show()
        else
            @fps.hide()
            @rtime.hide()
        

        @picture = new PictureSettings(gui)
        @sun = new Sun(gui).on('change', @sunChanged)
        @compositing_control = new CompositingControl(gui)
        @lighting = new Lighting(gui).on('change', @lightChange)

        loading.hide()
        @near = 0.1
        @far = 42

        @camera = new camera.FlyCam(gui: gui, near: @near, far: @far, x: -10, y:7, z:-1.5, o:100, p:20)
        @sponza = new Model gl

        @view_normaldepth = new Rendernode gl,
            program: get 'normaldepth.shader'
            drawable: @sponza
            depthBuffer: true
            depthTest: true
            depthWrite: true
            cullFace: 'BACK' #disabled because of mesh gaps
            type: gl.FLOAT #float is required to avoid banding issues (tried packing, doesn't come out well)
            hdrClear: true

        @ssao = new SSAO gl, @view_normaldepth
        
        @sundepth = new DepthRender gl, 512, 512, @sponza, @sun, blurred:true
        @direct_light = new DeferredShadowMap gl,
            eyeNormaldepth: @view_normaldepth
            depth: @sundepth
            light: @sun
            camera: @camera

        @illumination = new Illumination gl, gui, @sun, @sundepth, @lighting, @sponza, @view_normaldepth
       
        @albedo = new Rendernode gl,
            program: get 'albedo.shader'
            drawable: @sponza
            depthBuffer: true
            depthTest: true
            depthWrite: true
            #cullFace: 'BACK' #disabled because of mesh gaps
            #type: gl.FLOAT #not really required, adds little, the source is bytes anyway

        @global_illumination = new Rendernode gl,
            program: get 'global_illumination.shader'
            drawable: new DeferredModel gl, @illumination.probes
            cullFace: 'FRONT'
            blend: 'additive'
            type: gl.FLOAT #float is required because of additive summation, does not yield a perf benefit
            depthBuffer: @view_normaldepth.depth # early z gives some performance
            depthWrite: false
            depthTest: 'GEQUAL'
        
        @composit = new Rendernode gl,
            program: get 'composit.shader'
            drawable: quad

        @antialias = new Antialias gl, gui, @composit
       
        @windows = new Windows gl, gui, [
                {label: 'Scene depth from sun', affine: [1, 0], gamma: false, tex: @sundepth.output},
                {label: 'Probes Albedo', tex: @illumination.diffusemap},
                {label: 'Probes Positions', gamma: false, affine: [1/21, 0.5], tex: @illumination.probes_position},
                {label: 'Probes Normal', gamma: false, affine: [0.5, 0.5], tex: @illumination.probes_normal},
                {label: 'Probes Shadow', tex: @illumination.probes_shadow.output},
                {label: 'Probes Global Illumination', diva: true, tex: @illumination.probes_global_illumination.output},
                {label: 'Probes', tex: @illumination.lightprobes.output},
                {label: 'Spherical Harmonics Coefficients', tex: @illumination.coefficients},
                {label: 'Scene normal/depth', affine: [0.5, 0.5], gamma: false, tex: @view_normaldepth},
                {label: 'Albedo', tex: @albedo},
                {label: 'Scene depth moments', gamma: false, tex: @ssao.blur.output},
                {label: 'SSAO', gamma: false, tex: @ssao.output},
                {label: 'Direct Illumination', tex: @direct_light.output},
                {label: 'Global Illumination', diva: true, tex: @global_illumination},
                {label: 'Composited', gamma: false, tex: @composit},
                {label: 'Antialiased', gamma: false, tex: @antialias.node},
            ]

        @target_width = @canvas.width()
        @current_width = @target_width

        $(window).resize @resize
        @resize()
        schedule.run @update
        @canvas.fadeIn(2000)
        $('div.dg > ul').css('margin-top', 0)

    sunChanged: =>
        @sundepth.update()
        @illumination.updateDirectLight()
        @lightChange()

    lightChange: =>
        @illumination.update()

    resizeBuffers: (width, height) ->
        w = @width*@resolution
        h = @height*@resolution

        @view_normaldepth.resize w, h
        @albedo.resize w, h
        @global_illumination.resize w, h
        @direct_light.resize w, h
        @composit.resize w, h
        @antialias.resize w, h
        @illumination.debug.resize w, h
        @ssao.resize w, h
        
    resize: =>
        @width = @canvas.width()
        @height = @canvas.height()
        @camera.aspect @width, @height

        @canvas[0].width = @width
        @canvas[0].height = @height

        @resizeBuffers @width, @height
        @resizeWindows()

    update: =>
        @fps.end()
        @fps.begin()
        @rtime.begin()
        @step()
        @draw()
        @rtime.end()
    
    resizeWindows: ->
        @windows.node.viewport 0, 0, @current_width, @height

    step: ->
        gui_closed = @gui.closed
        if gui_closed
            @target_width = @width
        else
            gui_width = @gui.width
            @target_width = @width - (gui_width+10)


        dw = @target_width - @current_width
        @current_width = @current_width+dw*0.1

        dw = Math.abs(@target_width - @current_width)

        if dw > 1
            @resizeWindows()
        else if dw <= 1 and dw > 0
            @current_width = @target_width
            @resizeWindows()

        @camera.update()

    draw: ->
        @view_normaldepth
            .clear(0, 0, 0, 100)
            .start()
            .clearDepth()
            .mat4('proj', @camera.proj)
            .mat4('view', @camera.view)
            .mat3('view_rot', @camera.rot)
            .drawModel('bumpmap')
            .end()

        @ssao.update()
        
        @albedo.start()
            .f('gamma', @picture.inputGamma)
            .mat4('proj', @camera.proj)
            .mat4('view', @camera.view)
            .mat3('view_rot', @camera.rot)
            .clearBoth(0, 0, 0, 0)
            .drawModel('diffuse_texture')
            .end()
      
        @global_illumination.start()
            .f('gi_gain', @lighting.giGain)
            .sampler('normaldepth', @view_normaldepth)
            .mat4('proj', @camera.proj)
            .mat4('view', @camera.view)
            .mat4('inv_view', @camera.inv_view)
            .sampler('coefficients', @illumination.coefficients)
            .val2('coefficients_size', @illumination.coefficients.width, @illumination.coefficients.height)
            .clear()
            .draw()
            .end()

        @direct_light.updateShadow()

        if @compositing_control.draw_probes
            probe_factor = 1
            @illumination.drawDebug(@camera, @view_normaldepth)
        else
            probe_factor = 0

        @composit.start()
            .clear()
            .f('gamma', @picture.outputGamma)
            .f('brightness', @picture.brightness)
            .f('saturation', @picture.saturation)
            .vec3('sun_radiance', @lighting.sun_radiance)
            .vec3('sky_radiance', @lighting.sky_radiance)
            .f('probe_factor', probe_factor)
            .f('gi_factor', @compositing_control.gi)
            .f('di_factor', @compositing_control.di)
            .f('ao_factor', @compositing_control.ao)
            .vec3('sky_color', @lighting.skyColor)
            .sampler('debug', @illumination.debug)
            .sampler('albedo', @albedo)
            .sampler('global', @global_illumination)
            .sampler('direct', @direct_light.output)
            .sampler('ssao', @ssao.output)
            .draw()
            .end()
       
        @antialias.apply()

        @windows.draw(@picture.outputGamma)
