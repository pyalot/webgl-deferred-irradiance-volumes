return class Plane extends require('drawable')
    attribs: ['position', 'normal', 'texcoord']

    constructor: (@gl, s=1) ->
        super()
        @size = 6

        vertices = [
            -s,  0, -s,  0,  1,  0,  0,0,
            -s,  0,  s,  0,  1,  0,  0,1,
             s,  0,  s,  0,  1,  0,  1,1,

             s,  0, -s,  0,  1,  0,  1,0,
            -s,  0, -s,  0,  1,  0,  0,0,
             s,  0,  s,  0,  1,  0,  1,1,
        ]

        @uploadList vertices

    setPointersForShader: (shader) ->
        @gl.bindBuffer @gl.ARRAY_BUFFER, @buffer
        @setPointer shader, 'position', 3, 0, 8
        @setPointer shader, 'normal', 3, 3, 8
        @setPointer shader, 'texcoord', 2, 6, 8

        return @
