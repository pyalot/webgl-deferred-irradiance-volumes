Rendernode = require '/rendernode'
Blur = require '/blur'

return class SSAO
    constructor: (gl, @normaldepth) ->
        @moments = new Rendernode gl,
            program: get 'moments.shader'
            type: floatExt.type
            drawable: quad

        @blur = new Blur gl, type: floatExt.type

        @output = new Rendernode gl,
            program: get 'ssao.shader'
            drawable: quad

    update: ->
        @moments.start()
            .sampler('normaldepth', @normaldepth)
            .f('range', 42)
            .clear()
            .draw()
            .end()

        @blur.update(@moments)

        @output.start()
            .sampler('normaldepth', @normaldepth)
            .sampler('momentsmap', @blur.output)
            .f('range', 42)
            .clear()
            .draw()
            .end()

    resize: (width, height) ->
        @moments.resize width/2, height/2
        @blur.resize width/4, height/4
        @output.resize width, height
