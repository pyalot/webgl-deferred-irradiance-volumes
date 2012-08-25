{Framebuffer} = require 'framebuffer'

class Texture
    bound = []
    ids = 0

    constructor: ->
        @handle = @gl.createTexture()
        @id = ids++
        @unit = null

    bind: (unit=0) ->
        @unit = unit
        if bound[unit] != @id
            @gl.activeTexture @gl.TEXTURE0+unit
            @gl.bindTexture @target, @handle
            bound[unit] = @id
        return @
    
    unbind: (unit=@unit) ->
        if unit and bound[unit] == @id
            @gl.activeTexture @gl.TEXTURE0+unit
            @gl.bindTexture @target, null
            bound[unit] = null
        return @
    
    mipmap: ->
        @gl.texParameteri @target, @gl.TEXTURE_MAG_FILTER, @gl.LINEAR
        @gl.texParameteri @target, @gl.TEXTURE_MIN_FILTER, @gl.LINEAR_MIPMAP_LINEAR
        @gl.generateMipmap @target
        return @
    
    mipmapNearest: ->
        @gl.texParameteri @target, @gl.TEXTURE_MAG_FILTER, @gl.NEAREST
        @gl.texParameteri @target, @gl.TEXTURE_MIN_FILTER, @gl.LINEAR_MIPMAP_LINEAR
        @gl.generateMipmap @target
        return @

    linear: ->
        @gl.texParameteri @target, @gl.TEXTURE_MAG_FILTER, @gl.LINEAR
        @gl.texParameteri @target, @gl.TEXTURE_MIN_FILTER, @gl.LINEAR
        return @
    
    nearest: ->
        @gl.texParameteri @target, @gl.TEXTURE_MAG_FILTER, @gl.NEAREST
        @gl.texParameteri @target, @gl.TEXTURE_MIN_FILTER, @gl.NEAREST
        return @
    
    clampToEdge: ->
        @gl.texParameteri @target, @gl.TEXTURE_WRAP_S, @gl.CLAMP_TO_EDGE
        @gl.texParameteri @target, @gl.TEXTURE_WRAP_T, @gl.CLAMP_TO_EDGE
        return @
    
    repeat: ->
        @gl.texParameteri @target, @gl.TEXTURE_WRAP_S, @gl.REPEAT
        @gl.texParameteri @target, @gl.TEXTURE_WRAP_T, @gl.REPEAT
        return @
            
    anisotropy: ->
        ext = @gl.getExtension 'WEBKIT_EXT_texture_filter_anisotropic'
        if ext
            max = @gl.getParameter ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT
            @gl.texParameterf @target, ext.TEXTURE_MAX_ANISOTROPY_EXT, max
        return @

exports.Texture2D = class Texture2D extends Texture
    constructor: (@gl, {@channels, @format, @type}={}) ->
        super()
        @channels ?= @gl.RGBA
        @format ?= @gl.RGBA
        @type ?= @gl.UNSIGNED_BYTE
        @target = @gl.TEXTURE_2D

    upload: (image) ->
        @uploadImage image
        return @

    uploadImage: (image) ->
        @width = image.width
        @height = image.height
        @gl.texImage2D @target, 0, @channels, @format, @type, image
        return @

    uploadData: (data, @width, @height) ->
        @gl.texImage2D @target, 0, @channels, width, height, 0, @format, @type, data
        return @

    setSize: (@width, @height) ->
        @gl.texImage2D @target, 0, @channels, width, height, 0, @format, @type, null
        return @

    read: (dst=new Uint8Array(@width*@height*4)) ->
        if @fbo
            @fbo.bind()
        else
            @fbo = new Framebuffer(@gl).bind().color(@)
        
        @gl.readPixels 0, 0, @width, @height, @gl.RGBA, @gl.UNSIGNED_BYTE, dst
        @fbo.unbind()

        return dst

    toPNG: ->
        canvas = document.createElement 'canvas'
        canvas.height = @height
        canvas.width = @width
        ctx = canvas.getContext '2d'
        imgdata = ctx.createImageData @width, @height
        imgdata.data.set @read(), 0
        ctx.putImageData imgdata, 0, 0
        url = canvas.toDataURL 'image/png'
        data = atob(url.split(',')[1])
        result = new Uint8Array(data.length)
        for i in [0...data.length]
            result[i] = data.charCodeAt i
        return result
        
exports.Cubemap = class Cubemap extends Texture
    constructor: (@gl) ->
        super()
        @target = @gl.TEXTURE_CUBE_MAP

        @up = @gl.TEXTURE_CUBE_MAP_POSITIVE_Y
        @down = @gl.TEXTURE_CUBE_MAP_NEGATIVE_Y
        @right = @gl.TEXTURE_CUBE_MAP_POSITIVE_X
        @left = @gl.TEXTURE_CUBE_MAP_NEGATIVE_X
        @back = @gl.TEXTURE_CUBE_MAP_NEGATIVE_Z
        @front = @gl.TEXTURE_CUBE_MAP_POSITIVE_Z

    uploadSide: (name, image) ->
        @gl.texImage2D @gl['TEXTURE_CUBE_MAP_' + name], 0, @gl.RGBA, @gl.RGBA, @gl.UNSIGNED_BYTE, image

    upload: (folder, ext='jpg') ->
        @uploadSide 'POSITIVE_Y', folder.get "up.#{ext}"
        @uploadSide 'NEGATIVE_Y', folder.get "down.#{ext}"
        @uploadSide 'POSITIVE_X', folder.get "right.#{ext}"
        @uploadSide 'NEGATIVE_X', folder.get "left.#{ext}"
        @uploadSide 'POSITIVE_Z', folder.get "front.#{ext}"
        @uploadSide 'NEGATIVE_Z', folder.get "back.#{ext}"
        return @

    setSize: (@size) ->
        @gl.texImage2D @gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, @gl.RGBA, @size, @size, 0, @gl.RGBA, @gl.UNSIGNED_BYTE, null
        @gl.texImage2D @gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, @gl.RGBA, @size, @size, 0, @gl.RGBA, @gl.UNSIGNED_BYTE, null
        @gl.texImage2D @gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, @gl.RGBA, @size, @size, 0, @gl.RGBA, @gl.UNSIGNED_BYTE, null
        @gl.texImage2D @gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, @gl.RGBA, @size, @size, 0, @gl.RGBA, @gl.UNSIGNED_BYTE, null
        @gl.texImage2D @gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, @gl.RGBA, @size, @size, 0, @gl.RGBA, @gl.UNSIGNED_BYTE, null
        @gl.texImage2D @gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, @gl.RGBA, @size, @size, 0, @gl.RGBA, @gl.UNSIGNED_BYTE, null
        return @
