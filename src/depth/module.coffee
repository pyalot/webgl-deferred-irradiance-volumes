Rendernode = require '/rendernode'
Blur = require '/blur'

exports.DepthRender = class DepthRender
    constructor: (gl, width, height, drawable, {blurred}={}) ->
        blurred ?= false

        @direct = new Rendernode gl,
            width: width
            height: height
            program: get 'depth.shader'
            drawable: drawable
            depthBuffer: true
            depthTest: true
            depthWrite: true
            filter: if blurred then 'nearest' else 'linear'
            type: gl.FLOAT #float is required because of depth precision
            cullFace: 'BACK'
       
        if blurred
            @blurred = new Blur gl,
                width: width
                height: height
                type: gl.FLOAT

        @output = if @blurred then @blurred.output else @direct

    update: (proj, view) ->
        @direct.start()
            .clearBoth(0,0,0,1)
            .mat4('proj', proj)
            .mat4('view', view)
            .f('range', 42) #FIXME
            .draw()
            .end()

        if @blurred
            @blurred.update(@direct)

exports.DeferredShadowMap = class DeferredShadowMap
    constructor: (gl, {drawable, depthWidth, depthHeight, @eyeNormaldepth, @light, @camera, blurred}) ->
        @depth = new DepthRender gl, depthWidth, depthHeight, drawable, blurred:blurred
        @output = new Rendernode gl,
            program: get 'deferred_shadow_map.shader'
            drawable: quad

        @updateDepth()

    resize: (width, height) ->
        @output.resize width, height

    updateDepth: ->
        @depth.update @light.proj, @light.view

    updateShadow: ->
        @output
            .start()
            .clear(1, 0, 1)
            .sampler('eye_normaldepth', @eyeNormaldepth)
            .sampler('light_depth', @depth.output)
            .mat4('inv_eye_proj', @camera.inv_proj)
            .mat4('inv_eye_view', @camera.inv_view)
            .mat4('light_view', @light.view)
            .mat4('light_proj', @light.proj)
            .mat3('light_rot', @light.rot)
            .draw()
            .end()

exports.LightmapShadowMap = class LightmappedShadowMap
    constructor: (gl, {drawable, depthWidth, depthHeight, lightmapSize, @light, blurred}) ->
        @depth = new DepthRender gl, depthWidth, depthHeight, drawable, blurred:blurred

        lightmapSize ?= 256

        @output = new Rendernode gl,
            width: lightmapSize
            height: lightmapSize
            program: get 'lightmap_shadow_map.shader'
            drawable: drawable

        @update()
    
    update: ->
        @depth.update @light.proj, @light.view
        @output
            .start()
            .sampler('light_depth', @depth.output)
            .mat4('light_view', @light.view)
            .mat4('light_proj', @light.proj)
            .mat3('light_rot', @light.rot)
            .draw()
            .end()
