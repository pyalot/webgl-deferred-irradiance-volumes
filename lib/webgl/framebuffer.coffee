framebufferBinding = null

exports.Framebuffer = class Framebuffer
    constructor: (@gl) ->
        @buffer = @gl.createFramebuffer()

    bind: ->
        if framebufferBinding isnt @
            @gl.bindFramebuffer @gl.FRAMEBUFFER, @buffer
            framebufferBinding = @

        return @

    unbind: ->
        if framebufferBinding isnt null
            @gl.bindFramebuffer @gl.FRAMEBUFFER, null
            framebufferBinding = null

        return @

    check: ->
        result = @gl.checkFramebufferStatus @gl.FRAMEBUFFER
        switch result
            when @gl.FRAMEBUFFER_UNSUPPORTED
                throw 'Framebuffer is unsupported'
            when @gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT
                throw 'Framebuffer incomplete attachment'
            when @gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS
                throw 'Framebuffer incomplete dimensions'
            when @gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT
                throw 'Framebuffer incomplete missing attachment'
        return @

    color: (texture, target=texture.target) ->
        @gl.framebufferTexture2D @gl.FRAMEBUFFER, @gl.COLOR_ATTACHMENT0, target, texture.handle, 0
        @check()
        return @
        
    depth: (buffer) ->
        @gl.framebufferRenderbuffer @gl.FRAMEBUFFER, @gl.DEPTH_ATTACHMENT, @gl.RENDERBUFFER, buffer.id
        @check()
        return @

    destroy: ->
        @gl.deleteFramebuffer @buffer

class Renderbuffer
    constructor: (@gl) ->
        @id = @gl.createRenderbuffer()

    bind: ->
        @gl.bindRenderbuffer @gl.RENDERBUFFER, @id
        return @

    setSize: (@width, @height) ->
        @bind()
        @gl.renderbufferStorage @gl.RENDERBUFFER, @gl[@format], @width, @height
        @unbind()

    unbind: ->
        @gl.bindRenderbuffer @gl.RENDERBUFFER, null
        return @

exports.Depthbuffer = class extends Renderbuffer
    format: 'DEPTH_COMPONENT16'
