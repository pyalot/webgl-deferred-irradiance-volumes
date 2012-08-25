return class Quad extends require('drawable')
    attribs: ['position']
    pointers: [
        {name: 'position', size: 2, offset: 0, stride: 2},
    ]

    constructor: (@gl) ->
        super()
        @size = 6

        vertices = [
            -1, -1,  1, -1,  1, 1,
            -1, -1,  1, 1,  -1, 1,
        ]

        @uploadList vertices
