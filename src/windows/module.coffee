Quad = require '/webgl/quad'
Rendernode = require '/rendernode'
keys = require '/keys'

class Window
    constructor: (@index, @texture, @node, @x, @y) ->
        @label = @texture.label

        if @texture.diva
            @diva = 1
        else
            @diva = 0

        if @texture.gamma == false
            @gamma = 0
        else
            @gamma = 1

        if @texture.affine
            @mul = @texture.affine[0]
            @add = @texture.affine[1]
        else
            @mul = 1
            @add = 0

    draw: (xscale, yscale, one2one, cx, cy, active) ->
        width = @texture.tex.width
        height = @texture.tex.height
        max = Math.max width, height

        w = width/max
        h = height/max

        s = 1/Math.max(w*xscale, h*yscale)
        w = w * (1-one2one) + s*w*one2one
        h = h * (1-one2one) + s*h*one2one

        @node
            .sampler('source', @texture.tex)
            .f('mixgamma', @gamma)
            .f('diva', @diva)
            .f('border_factor', active)
            .val2('affine', @mul, @add)
            .val2('size', w*xscale, h*yscale)
            .val2('offset', (@x-cx)*xscale, (@y-cy)*yscale)
            .draw()

return class Windows
    constructor: (@gl, gui, @textures) ->
        gui.remember @

        @label = $('<div id="windowlabel">test</div>').appendTo('#ui').hide()
        @show_all = false
        @show_label = false
        @needs_clear = $.browser.mozilla
        #console.log @needs_clear

        @node = new Rendernode @gl,
            front: true
            program: get 'window.shader'
            drawable: quad

        @windows = []
        @labelmap = {}
        labels = []

        gridsize = Math.ceil(Math.sqrt(@textures.length))
        for texture, i in @textures
            x = i%gridsize
            y = gridsize - Math.floor(i/gridsize) - 1
            window = new Window i, texture, @node, x*2.2, y*2.2
            @labelmap[window.label] = window
            @windows.push window
            labels.push window.label

        minx = null
        maxx = null
        miny = null
        maxy = null

        for window in @windows
            minx = if minx!=null then Math.min(window.x, minx) else window.x
            maxx = if maxx!=null then Math.max(window.x, maxx) else window.x
            miny = if miny!=null then Math.min(window.y, miny) else window.y
            maxy = if maxy!=null then Math.max(window.y, maxy) else window.y

        @cx = (minx+maxx)/2
        @cy = (miny+maxy)/2
        @full_scale = 1.9/Math.min(maxx-minx+2, maxy-miny+2)

        @zoom = 0.0

        @active = @windows.length - 1
        keys.press 'right', @next
        keys.press 'left', @prev

        keys.press 'down', =>
            new_value = @active + gridsize
            if new_value < @windows.length
                @active = new_value
            else
                @active = @active % gridsize
            @setActive()
        
        keys.press 'up', =>
            new_value = @active - gridsize
            if new_value >= 0
                @active = new_value
            else
                new_value = gridsize*gridsize + new_value
                while new_value >= @windows.length
                    new_value -= gridsize
                @active = new_value
            @setActive()

        keys.press 'space', =>
            @show_all = not @show_all
            @all_ctrl.setValue(@show_all)
        keys.press 'enter', =>
            @show_all = not @show_all
            @all_ctrl.setValue(@show_all)

        active = @getActive()
        @x = active.x
        @y = active.y
       
        folder = gui.addFolder('Views')
        @all_ctrl = folder.add(@, 'show_all').name('Overview')
        folder.add(@, 'next').name('Next view')
        folder.add(@, 'prev').name('Prev view')

        @window_label = active.label
        @guiLabel = folder.add(@, 'window_label', labels).name('View').onChange(@guiLabelChange)
        folder.add(@, 'show_label').name('Labels').onChange @labelVisibilityChange
        @guiLabelChange()

    labelVisibilityChange: =>
        if @show_label
            @label.clearQueue().fadeIn()
        else
            @label.clearQueue().fadeOut()


    guiLabelChange: =>
        window = @labelmap[@window_label]
        @active = window.index
        @setActive()

    getActive: -> @windows[@active]
        
    setActive: ->
        text = @getActive().label
        @window_label = text
        @guiLabel.updateDisplay()
        @label.text(text)

    next: =>
        @active = (@active+1) % @windows.length
        @setActive()
    prev: =>
        if @active == 0
            @active = @windows.length - 1
        else
            @active -= 1
        @setActive()

    step: ->
        active = @getActive()
        tx = active.x
        ty = active.y

        @x = @x+(tx-@x)*0.1
        @y = @y+(ty-@y)*0.1

        if @show_all
            @zoom = @zoom + (1-@zoom)*0.1
        else
            @zoom = @zoom + (0-@zoom)*0.1

    draw: (gamma) ->
        @step()
        if @needs_clear == true
            @gl.clearColor 0, 0, 0, 0
            @gl.clear @gl.COLOR_BUFFER_BIT | @gl.DEPTH_BUFFER_BIT
        @node
            .start()
            .f('gamma', gamma)

        width = @node.width
        height = @node.height

        if width > height
            xscale = height/width
            yscale = 1
        else
            xscale = 1
            yscale = width/height

        factor = 1.0-@zoom + @zoom * @full_scale
        #factor = @full_scale
        xscale *= factor
        yscale *= factor

        active = @getActive()

        for window in @windows
            if window != active
                @drawWindow xscale, yscale, window, 0

        @drawWindow xscale, yscale, active, 1

        @node.end()

    drawWindow: (xscale, yscale, window, active) ->
        dx = window.x - @x
        dy = window.y - @y
        l = Math.sqrt(dx*dx+dy*dy)
        if l > 0
            one2one = Math.min(1/(l*2), 1)
        else
            one2one = 1

        x = @x*(1-@zoom) + @cx*@zoom
        y = @y*(1-@zoom) + @cy*@zoom
        active = Math.pow(one2one, 2.0) * @zoom

        window.draw(xscale, yscale, one2one*(1-@zoom), x, y, active)
        
