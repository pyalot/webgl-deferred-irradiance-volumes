clamp = (value, left, right) ->
    return if value < left then left else if value > right then right else value

return class Hexgrid extends require('drawable')
    attribs: ['position', 'texcoord', 'barycentric']

    constructor: (@gl, xsize=16, ysize=16, width=1, height=1) ->
        super()
        vertices = []

        for x in [0..xsize]
            x1 = clamp((x-0.5)/xsize, 0, 1)
            x2 = clamp((x+0.0)/xsize, 0, 1)
            x3 = clamp((x+0.5)/xsize, 0, 1)
            x4 = clamp((x+1.0)/xsize, 0, 1)
            for y in [0...ysize] by 2
                t = (y+0)/ysize
                m = (y+1)/ysize
                b = (y+2)/ysize

                vertices.push(
                    x2*width,0,m*height, x2,m, 0,0,1,
                    x3*width,0,t*height, x3,t, 0,1,0,
                    x1*width,0,t*height, x1,t, 1,0,0,

                    x4*width,0,m*height, x4,m, 0,0,1,
                    x3*width,0,t*height, x3,t, 0,1,0,
                    x2*width,0,m*height, x2,m, 1,0,0,
                    
                    x3*width,0,b*height, x3,b, 0,0,1,
                    x2*width,0,m*height, x2,m, 0,1,0,
                    x1*width,0,b*height, x1,b, 1,0,0,
                    
                    x3*width,0,b*height, x3,b, 0,0,1
                    x4*width,0,m*height, x4,m, 0,1,0,
                    x2*width,0,m*height, x2,m, 1,0,0,
                )
        @size = vertices.length/8
        @uploadList vertices

    setPointersForShader: (shader) ->
        @gl.bindBuffer @gl.ARRAY_BUFFER, @buffer
        @setPointer shader, 'position', 3, 0, 8
        @setPointer shader, 'texcoord', 2, 3, 8
        @setPointer shader, 'barycentric', 3, 5, 8

        return @
