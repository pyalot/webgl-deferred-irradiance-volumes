{Framebuffer, Depthbuffer} = require 'webgl/framebuffer'
{Texture2D, Cubemap} = require 'webgl/texture'
Quad = require 'webgl/quad'

class State
    constructor: (@gl) ->
        @depthTest = false
        @depthWrite = false
        @cullFace = null
        @alphaToCoverage = false
        @blend = false

    set: ->
        if @depthTest
            @gl.enable @gl.DEPTH_TEST
            mode = @gl[@depthTest]
            if mode
                @gl.depthFunc mode
            else
                @gl.depthFunc @gl.LEQUAL

        if @depthWrite then @gl.depthMask true
        if @cullFace
            @gl.enable @gl.CULL_FACE
            @gl.cullFace @gl[@cullFace]
        if @blend
            @gl.enable @gl.BLEND
            if @blend == 'additive'
                @gl.blendFunc @gl.ONE, @gl.ONE

        if @alphaToCoverage then @gl.enable @gl.SAMPLE_ALPHA_TO_COVERAGE
        return @

    revert: ->
        if @depthTest
            @gl.disable @gl.DEPTH_TEST
            @gl.depthFunc @gl.LESS
        if @depthWrite then @gl.depthMask false
        if @cullFace
            @gl.disable @gl.CULL_FACE
        if @blend then @gl.disable @gl.BLEND
        if @alphaToCoverage then @gl.disable @gl.SAMPLE_ALPHA_TO_COVERAGE
        return @
        
return class Rendernode
    constructor: (@gl, {@width, @height, @program, @drawable, @type, @front, depthTest, depthWrite, cullFace, @depthBuffer, blend, @filter, @channels, @format, @hdrClear}) ->
        @xoff = 0
        @yoff = 0
        @state = new State(@gl)
        
        @texunit_counter = 0
        @texunits = {}

        @type ?= @gl.UNSIGNED_BYTE
        @front ?= false

        depthTest ?= false
        @depthTest depthTest

        depthWrite ?= false
        @depthWrite depthWrite

        cullFace ?= null
        @cullFace cullFace

        blend ?= false
        @state.blend = blend

        if not @front
            @createBuffers()

        if @hdrClear
            @clearShader = get 'hdr_clear.shader'

    createBuffers: ->
        @output = new Texture2D(@gl, channels:@channels, format:@format, type:@type).bind().clampToEdge()
        if @filter == 'nearest'
            @output.nearest()
        else
            @output.linear()

        if @width and @height
            @output.setSize(@width, @height)
        else
            @output.setSize(16, 16)
        @output.unbind()

        @fbo = new Framebuffer(@gl).bind().color(@output).unbind()

        if @depthBuffer then @addDepth()
    
    addDepth: (buffer=@depthBuffer) ->
        if not @depth and not @front
            if buffer instanceof Depthbuffer
                @depth = buffer
            else
                @depth = new Depthbuffer(@gl).setSize(@output.width, @output.height)
            @fbo.bind().depth(@depth).unbind()
        return @

    cullFace: (side=null) ->
        @state.cullFace = side
        return @

    depthWrite: (enabled=false) ->
        @state.depthWrite = enabled
        return @

    depthTest: (enabled=false) ->
        @state.depthTest = enabled
        return @

    alphaToCoverage: (enabled=false) ->
        @state.alphaToCoverage = enabled
        return @

    blendAdditive: ->
        @state.blend = 'additive'
        return @

    filterNearest: ->
        @output.bind().nearest().unbind()
        return @

    start: ->
        @started = true
        @viewport()
        @state.set()
        if @program then @program.use()
        if not @front then @fbo.bind()
        if @drawable then @setPointers @drawable
        return @

    setPointers: (drawable) ->
        if drawable != @current_drawable
            @current_drawable = drawable
            drawable.setPointersForShader @program
    
    end: ->
        @started = false
        @current_drawable = null
        @state.revert()
        if not @front then @fbo.unbind()
        return @

    sampler: (name, source) ->
        if source.output
            texture = source.output
        else
            texture = source

        unit = @texunits[name]
        if unit == undefined
            unit = @texunits[name] = @texunit_counter++
        texture.bind(unit)
        @program.i name, unit
        return @

    mat4: (name, value) ->
        @program.mat4(name, value)
        return @
    
    mat3: (name, value) ->
        @program.mat3(name, value)
        return @

    val3: (name, x, y, z) ->
        @program.val3(name, x, y, z)
        return @
    
    vec3: (name, value) ->
        @program.vec3(name, value)
        return @

    f: (name, value) ->
        @program.f name, value
        return @

    fv: (name, values) ->
        @program.fv name, values
        return @

    val2: (name, x, y) ->
        @program.val2(name, x, y)
        return @
    
    val4: (name, x, y, z, w) ->
        @program.val4(name, x, y, z, w)
        return @

    clear: (r=0, g=0, b=0, a=1) ->
        if @hdrClear
            if not @front then @fbo.bind()
            @clearShader.use().val4('clear_color', r, g, b, a).draw(quad)
        else
            @gl.clearColor r, g, b, a
            @gl.clear @gl.COLOR_BUFFER_BIT
        return @

    clearBoth: (r=0, g=0, b=0, a=1, depth=1) ->
        @gl.clearColor r, g, b, a
        @gl.clearDepth depth
        @gl.clear @gl.COLOR_BUFFER_BIT | @gl.DEPTH_BUFFER_BIT
        return @

    clearDepth: (depth=1) ->
        @gl.clearDepth depth
        @gl.clear @gl.DEPTH_BUFFER_BIT
        return @

    draw: (drawable=@drawable) ->
        do_end = false
        if not @started
            do_end = true
            @start()

        @program.val2 'viewport', @width, @height
        if drawable != @current_drawable
            @setPointers drawable
        drawable.draw()

        if do_end
            @end()

        return @

    drawModel: (texture_type, sampler_name=texture_type) ->
        if texture_type
            for material in @drawable.materials[texture_type]
                @f('specularity', material.specularity)
                c = material.diffuse_color
                @val3('diffuse_color', c.r, c.g, c.b)
                @sampler(sampler_name, material[texture_type])
                @drawable.drawRange material.start, material.size
        else
            @draw()
        return @

    resize: (width, height) ->
        @width = Math.floor(width)
        @height = Math.floor(height)
        if @output
            @output.bind()
                .setSize(@width, @height)
                .unbind()

        if @depth
            @depth.setSize(@width, @height)

        if @fbo
            @fbo.bind().check().unbind()

    viewport: (x=@xoff, y=@yoff, width=@width, height=@height) ->
        if width and height
            @xoff = x
            @yoff = y
            @width = width
            @height = height
            if @started
                @gl.viewport x, y, width, height
            return @

    bind: (unit=0) ->
        @output.bind(unit)
