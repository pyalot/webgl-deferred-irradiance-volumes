return class Sun extends require('events')
    constructor: (gui, @orientation=104, @elevation=60) ->
        gui.remember @
        super()
        folder = gui.addFolder('Sun')
        folder.add(@, 'orientation', 0, 360).onChange(@update)
        folder.add(@, 'elevation', 0, 90).onChange(@update)

        @near = -1
        @far = 41
        @proj = new Mat4().ortho(@near, @far, 21, -21, -21, 21)
        @view = new Mat4()
        @rot = new Mat3()
        @update()

    update: =>
        @view.identity()
            .translateVal3(0, 0, -21)
            .rotatex(@elevation)
            .rotatey(@orientation)
            .translateVal3(0, -7.5, 0)
            .toMat3 @rot.identity()

        @trigger('change')
        return @

