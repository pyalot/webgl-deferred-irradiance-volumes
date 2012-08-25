Rendernode = require '/rendernode'
Quad = require '/webgl/quad'

return class AntiAlias
    constructor: (@gl, gui, @source) ->
        gui.remember @
        @node = new Rendernode @gl,
            #program: get 'fxaa.shader'
            program: get 'fxaa3_11.shader'
            drawable: quad
            
        @subpixel_aa = 0.75
        @contrast_treshold = 0.166
        @edge_treshold = 0.0
        folder = gui.addFolder('Antialias')
        folder.add(@, 'subpixel_aa', 0.0, 1.0).name('Subpixel aa')
        folder.add(@, 'contrast_treshold', 0.063, 0.333).name('Contrast Treshold')
        folder.add(@, 'edge_treshold', 0.0, 0.0833).name('Edge Treshold')

    apply: ->
        @node.start()
            .f('subpixel_aa', @subpixel_aa)
            .f('contrast_treshold', @contrast_treshold)
            .f('edge_treshold', @edge_treshold)
            .clear()
            .sampler('source', @source)
            .draw()
            .end()

    resize: (width, height) ->
        @node.resize width, height
