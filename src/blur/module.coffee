Rendernode = require '/rendernode'

return class Blur
    constructor: (gl, {width, height, type, filter}) ->
        type ?= gl.UNSIGNED_BYTE
        filter ?= 'linear'

        @output = new Rendernode gl,
            width: width
            height: height
            program: get 'blur.shader'
            drawable: quad
            filter: filter
            type: type

    update: (source) ->
        @output
            .start()
            .sampler('source', source)
            .draw()
            .end()

    resize: (width, height) ->
        @output.resize(width, height)
