keys = require 'keys'

class MouseDrag
    constructor: (@which) ->
        @x = 0
        @y = 0

        @lx = 0
        @ly = 0
        @pressed = false

        if navigator.appVersion.indexOf('Mac') != -1
            $('#ui').bind 'mousewheel', (event) =>
                event.preventDefault()
                event.stopImmediatePropagation()
                event.stopPropagation()
                
                @x += event.originalEvent.wheelDeltaX*0.25
                @y += event.originalEvent.wheelDeltaY*0.25
                return false

        $('#ui').mousedown (event) =>
            if event.which == @which
                @lx = event.pageX
                @ly = event.pageY
                @pressed = true
            return undefined

        $(document).mouseup =>
            @pressed = false
            return undefined

        $(document).mousemove (event) =>
            if @pressed and event.which == @which
                x = event.pageX
                y = event.pageY
                @x += x - @lx
                @y += y - @ly
                @lx = x
                @ly = y
                return false
            return undefined

    reset: ->
        @x = 0
        @y = 0

class Camera
    constructor: (@delta=1/180, @near=0.1, @far=1000) ->
        @last_gui_update = gettime()
        @time = gettime()
        @proj = new Mat4()
        @inv_proj = new Mat4()
        @view = new Mat4()
        @inv_view = new Mat4()
        @rot = new Mat3()
        @inv_rot = new Mat3()
        @acc = new Vec3()

    aspect: (width, height) ->
        @proj.perspective 75, width/height, @near, @far
        @inv_proj.inversePerspective 75, width/height, @near, @far
    
    step: ->
        @accelerate()
        @limit()
        @move()
        @limit()
        @time += @delta
    
    update: ->
        now = gettime()

        if now - @last_gui_update > 0.5
            @guiUpdate()
            @last_gui_update = now

        if now - @time > @delta*30
            @time = now - @delta*30

        while @time < now
            @step()
        @finish()

        @view.invert @inv_view.identity()
        @view.toMat3 @rot.identity()
        @inv_view.toMat3 @inv_rot.identity()

    limit: ->
    guiUpdate: ->

exports.GameCam = class GameCam extends Camera
    constructor: ({@sl, @sr, delta, x, y, z}={}) ->
        super(delta)
        @realpos = new Vec4()
        @sl ?= 200
        @sr ?= 100
        x ?= 0
        y ?= 0
        z ?= 0

        @mouse = new MouseDrag(3)

        @target_height = 0
        @height = 0

        @x=x; @lx=x
        #@y=y; @ly=y
        @z=z; @lz=z
        @o=0; @lo=0
        @d=0; @ld=0; @ad=0
            
        $(document).bind 'mousewheel', (event) =>
            event.preventDefault()
            event.stopImmediatePropagation()
            event.stopPropagation()
            
            @ad -= event.originalEvent.wheelDeltaY
            return false

    accelerate: ->
        sl = @delta*@delta*@sl
        sr = @delta*@delta*@sr
        
        ctrl_x = if keys.a then -1 else if keys.d then 1 else 0
        ctrl_y = if keys.q then -1 else if keys.e then 1 else 0
        ctrl_z = if keys.w then -1 else if keys.s then 1 else 0

        ax = ctrl_x * sl
        #ay = ctrl_y * sl
        az = ctrl_z * sl
        
        @rot
            .identity()
            .rotatey(-@o)
            .mulVal3(ax, 0, az, @acc)

        @x += @acc.x
        #@y += @acc.y
        @z += @acc.z
        @o += @mouse.x * sr
        @d += @ad * @delta * @delta * 20
       
        move = @delta*@delta*4000
        if move > 1 then move = 1
        @height = @height + (@target_height - @height) * move

    move: ->
        retl = 0.97
        retr = 0.94
        x = @x + (@x - @lx) * retl
        #y = @y + (@y - @ly) * retl
        z = @z + (@z - @lz) * retl
        d = @d + (@d - @ld) * retl
        o = @o + (@o - @lo) * retr

        @lx = @x; @x = x
        #@ly = @y; @y = y
        @lz = @z; @z = z
        @lo = @o; @o = o
        @ld = @d; @d = d


    limit: ->
        if @d < 0 then @d = 0
        else if @d > 30 then @d = 30

        high = 128+64
        low = 128-64
        if @x < low then @x = low
        else if @x > high then @x = high
        
        if @z < low then @z = low
        else if @z > high then @z = high

    finish: ->
        @mouse.reset()
        @ad = 0
        @view
            .identity()
            .translateVal3(0, 0, -@d-5)
            .rotatex(25+(@d/30)*40)
            .rotatey(@o)
            .translateVal3(-@x, -@height, -@z)

    update: (picker) ->
        @view
            .identity()
            .translateVal3(0, 0, -@d-5)
            .rotatex(25+(@d/30)*40)
            .rotatey(@o)
            .translateVal3(-@x, 0, -@z)
        @view.invert @inv_view.identity()

        h1 = picker.getHeight @x, @z
        @inv_view.mulVal4 0, 0, 0, 1, @realpos
        h2 = picker.getHeight(@realpos.x, @realpos.z)+2
        real_height = h1+@realpos.y
        if real_height < h2
            diff = h2 - real_height
            @target_height = h1 + diff
        else
            @target_height = h1

        super()

exports.Orbit = class Orbit extends Camera
    constructor: ({@sr, delta, x, y, z, @dist}={}) ->
        super(delta)
        @sr ?= 100
        @dist ?= 0.6

        @mouse = new MouseDrag(1)

        @o=0; @lo=0
        @p=0; @lp=0
            
    accelerate: ->
        sr = @delta*@delta*@sr
        @o += @mouse.x * sr
        @p += @mouse.y * sr

    move: ->
        retr = 0.94
        o = @o + (@o - @lo) * retr
        p = @p + (@p - @lp) * retr

        @lo = @o; @o = o
        @lp = @p; @p = p

    finish: ->
        @mouse.reset()

    update: () ->
        @view
            .identity()
            .translateVal3(0, 0, -@dist)
            .rotatex(@p)
            .rotatey(@o)
        @view.invert @inv_view.identity()

        super()

exports.FlyCam = class FlyCam extends Camera
    constructor: ({@sl, @gui, @sr, delta, near, far, lookbutton, x, y, z, o, p}={}) ->
        super(delta, near, far)
        @sl ?= 50
        @sr ?= 100
        lookbutton ?= 1
        x ?= 0
        y ?= 0
        z ?= 0
        o ?= 0
        p ?= 0

        @mouse = new MouseDrag(lookbutton)

        @x=x; @lx=x
        @y=y; @ly=y
        @z=z; @lz=z
        @o=o; @lo=o
        @p=p; @lp=p

        folder = @gui.addFolder('Camera')
        @gui.remember @
        @xgui = folder.add(@, 'x', -30.0, 30.0).onChange(@guiChanged)
        @ygui = folder.add(@, 'y', -30.0, 30.0).onChange(@guiChanged)
        @zgui = folder.add(@, 'z', -30.0, 30.0).onChange(@guiChanged)
        @go = @o
        @ogui = folder.add(@, 'go', 0.0, 360.0).name('Orientation').onChange(@guiChanged)
        @pgui = folder.add(@, 'p', -80.0, 80.0).name('Pitch').onChange(@guiChanged)
        @guiChanged()

    guiChanged: =>
        @lx=@x
        @ly=@y
        @lz=@z
        @o=@go; @lo=@go
        @lp=@p

    guiUpdate: ->
        @go = @o % 360
        @xgui.updateDisplay()
        @ygui.updateDisplay()
        @zgui.updateDisplay()
        @ogui.updateDisplay()
        @pgui.updateDisplay()

    accelerate: ->
        sl = @delta*@delta*@sl
        sr = @delta*@delta*@sr
        
        ctrl_x = if keys.a then -1 else if keys.d then 1 else 0
        ctrl_y = if keys.q then -1 else if keys.e then 1 else 0
        ctrl_z = if keys.w then -1 else if keys.s then 1 else 0

        ax = ctrl_x * sl
        ay = ctrl_y * sl
        az = ctrl_z * sl
        
        @rot
            .identity()
            .rotatey(-@o)
            .rotatex(-@p)
            .mulVal3(ax, ay, az, @acc)

        @x += @acc.x
        @y += @acc.y
        @z += @acc.z
        @o += @mouse.x * sr
        @p += @mouse.y * sr

    move: ->
        retl = 0.97
        retr = 0.94
        x = @x + (@x - @lx) * retl
        y = @y + (@y - @ly) * retl
        z = @z + (@z - @lz) * retl
        o = @o + (@o - @lo) * retr
        p = @p + (@p - @lp) * retr

        if p > 80 then p = 80
        else if p < -80 then p = -80

        @lx = @x; @x = x
        @ly = @y; @y = y
        @lz = @z; @z = z
        @lo = @o; @o = o
        @lp = @p; @p = p

    finish: ->
        @mouse.reset()
        @view
            .identity()
            .rotatex(@p)
            .rotatey(@o)
            .translateVal3(-@x, -@y, -@z)
