return class Model extends require('drawable')
    attribs: ['position', 'normal', 'texcoord']

    constructor: (@gl, data) ->
        super()
        @size = data.byteLength/(8*Float32Array.BYTES_PER_ELEMENT)
        @upload data

    setPointersForShader: (shader) ->
        @gl.bindBuffer @gl.ARRAY_BUFFER, @buffer
        @setPointer shader, 'position', 3, 0, 8
        @setPointer shader, 'normal', 3, 3, 8
        @setPointer shader, 'texcoord', 2, 6, 8

        return @
