Rendernode = require '/rendernode'
Blur = require '/blur'

exports.DepthRender = class DepthRender
    constructor: (gl, width, height, drawable, @light, {blurred}={}) ->
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
            #cullFace: 'BACK'
       
        if blurred
            @blurred = new Blur gl,
                width: width
                height: height
                type: gl.FLOAT

        @output = if @blurred then @blurred.output else @direct
        @update()

    update: ->
        @direct.start()
            .clearBoth(0,0,0,1)
            .mat4('proj', @light.proj)
            .mat4('view', @light.view)
            .f('range', 42) #FIXME
            .draw()
            .end()

        if @blurred
            @blurred.update(@direct)

exports.DeferredShadowMap = class DeferredShadowMap
    constructor: (gl, {drawable, @depth, @eyeNormaldepth, @light, @camera}) ->
        @output = new Rendernode gl,
            program: get 'deferred_shadow_map.shader'
            drawable: quad

    resize: (width, height) ->
        @output.resize width, height
        return @

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
        return @

exports.DeferredProbeShadowMap = class DeferredProbeShadowMap
    constructor: (gl, {drawable, @depth, @probes_normal, @probes_position, @light}) ->
        @output = new Rendernode gl,
            program: get 'deferred_probe_shadow_map.shader'
            drawable: quad

    resize: (width, height) ->
        @output.resize width, height
        return @

    updateShadow: ->
        @output
            .start()
            .clear(1, 0, 1)
            .sampler('probes_normal', @probes_normal)
            .sampler('probes_position', @probes_position)
            .sampler('light_depth', @depth.output)
            .mat4('light_view', @light.view)
            .mat4('light_proj', @light.proj)
            .mat3('light_rot', @light.rot)
            .draw()
            .end()
        return @
