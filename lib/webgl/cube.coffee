return class Cube extends require('drawable')
    attribs: ['position', 'normal', 'barycentric']
    pointers: [
        {name: 'position',      size: 3, offset: 0, stride: 9},
        {name: 'normal',        size: 3, offset: 3, stride: 9},
        {name: 'barycentric',   size: 3, offset: 6, stride: 9},
    ]

    constructor: (@gl, s=1) ->
        super()
        @size = 6 * 6
        vertices = [
            -s, -s, -s,  0,  0, -1, 1,0,0,
            -s,  s, -s,  0,  0, -1, 0,1,0,
             s,  s, -s,  0,  0, -1, 0,0,1,
             s, -s, -s,  0,  0, -1, 1,0,0,
            -s, -s, -s,  0,  0, -1, 0,1,0,
             s,  s, -s,  0,  0, -1, 0,0,1,
                                   
             s,  s,  s,  0,  0,  1, 1,0,0,
            -s,  s,  s,  0,  0,  1, 0,1,0,
            -s, -s,  s,  0,  0,  1, 0,0,1,
             s,  s,  s,  0,  0,  1, 1,0,0,
            -s, -s,  s,  0,  0,  1, 0,1,0,
             s, -s,  s,  0,  0,  1, 0,0,1,
                                   
            -s,  s, -s,  0,  1,  0, 1,0,0,
            -s,  s,  s,  0,  1,  0, 0,1,0,
             s,  s,  s,  0,  1,  0, 0,0,1,
             s,  s, -s,  0,  1,  0, 1,0,0,
            -s,  s, -s,  0,  1,  0, 0,1,0,
             s,  s,  s,  0,  1,  0, 0,0,1,
                                   
             s, -s,  s,  0, -1,  0, 1,0,0,
            -s, -s,  s,  0, -1,  0, 0,1,0,
            -s, -s, -s,  0, -1,  0, 0,0,1,
             s, -s,  s,  0, -1,  0, 1,0,0,
            -s, -s, -s,  0, -1,  0, 0,1,0,
             s, -s, -s,  0, -1,  0, 0,0,1,
                                   
            -s, -s, -s, -1,  0,  0, 1,0,0,
            -s, -s,  s, -1,  0,  0, 0,1,0,
            -s,  s,  s, -1,  0,  0, 0,0,1,
            -s,  s, -s, -1,  0,  0, 1,0,0,
            -s, -s, -s, -1,  0,  0, 0,1,0,
            -s,  s,  s, -1,  0,  0, 0,0,1,
                                   
             s,  s,  s,  1,  0,  0, 1,0,0,
             s, -s,  s,  1,  0,  0, 0,1,0,
             s, -s, -s,  1,  0,  0, 0,0,1,
             s,  s,  s,  1,  0,  0, 1,0,0,
             s, -s, -s,  1,  0,  0, 0,1,0,
             s,  s, -s,  1,  0,  0, 0,0,1,
        ]

        @uploadList vertices
