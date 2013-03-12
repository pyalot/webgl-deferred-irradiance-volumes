directives = [
    'precision highp int;',
    'precision highp float;',
]

in_use = null

return class Shader
    @lastError = ''

    @splitLines = (path, source) ->
        result = []
        for line, i in source.split '\n'
            result.push
                line: i
                text: line
                path: path
        return result

    @error = 'ShaderError'

    constructor: (@gl, @path, source) ->
        dirname = @path.split '/'
        dirname.pop()
        @dirname = dirname.join '/'

        @program    = @gl.createProgram()
        @vs         = @gl.createShader gl.VERTEX_SHADER
        @fs         = @gl.createShader gl.FRAGMENT_SHADER

        @gl.attachShader @program, @vs
        @gl.attachShader @program, @fs

        @link source

    preprocess: (source) ->
        lines = source.split '\n'
        shaders = {'global': [], 'fragment': [], 'vertex': []}
        type = 'global'
        for line, i in lines
            match = line.match /^(\w+):$/
            if match
                type = match[1]
            else
                shaders[type].push
                    line: i
                    text: line
                    path: @path

        global = @resolveLines(shaders.global)
        shaders.fragment = global.concat(@resolveLines(shaders.fragment))
        shaders.vertex = global.concat(@resolveLines(shaders.vertex))
        return shaders

    resolveLines: (stage) ->
        result = []
        for line in stage
            match = line.text.match /^\s+#require (\S+)\s*$/
            if match
                path = "#{match[1]}.shaderlib"
                abspath = loader.resolvePath(@dirname, path)
                lib = get abspath
                for line in lib
                    result.push line
            else
                result.push line
        return result

    concat: (stage) ->
        result = ''
        for line in directives
            result += line + '\n'
        result += '#line 0\n'
        for line in stage
            result += line.text + '\n'
        return result

    link: (source) ->
        shaders = @preprocess source
        @compile @vs, shaders.vertex
        @compile @fs, shaders.fragment
        @gl.linkProgram @program

        if not @gl.getProgramParameter @program, @gl.LINK_STATUS
            error = "Shader Link Error for file: #{@path}:\n#{@gl.getProgramInfoLog(@program)}"
            console.error error
            Shader.lastError = error
            throw Shader.error

        @attrib_cache = {}
        @uniform_cache = {}
        @value_cache = {}
            
    compile: (shader, lines) ->
        source = @concat lines
        @gl.shaderSource shader, source
        @gl.compileShader shader

        if not @gl.getShaderParameter shader, @gl.COMPILE_STATUS
            error = @gl.getShaderInfoLog(shader)
            group = "Shader Compile Error for file: #{@path}"
            translated = @translateError(error, lines)
            text = group + '\n' + translated
            Shader.lastError = text

            console.group group
            console.warn translated
            console.groupEnd()

            throw Shader.error
        return

    translateError: (error, sourcelines) ->
        result = []
        for line, i in error.split('\n')
            match = line.match /ERROR: \d+:(\d+): (.*)/
            if match
                lineno = parseFloat(match[1])
                message = match[2]
                sourceline = sourcelines[lineno-1]
                result.push "ERROR: Line #{sourceline.line+1}: File #{sourceline.path}: #{message} SOURCE: #{sourceline.text}"
            else
                result.push line
        return result.join('\n')

    attribLoc: (name) ->
        location = @attrib_cache[name]
        if location is undefined
            location = @attrib_cache[name] = @gl.getAttribLocation @program, name
        @gl.enableVertexAttribArray location if location >= 0
        return location

    use: ->
        if @ != in_use
            in_use = @
            @gl.useProgram @program
        return @
    
    unbind: ->
        if in_use
            in_use = null
            @gl.useProgram null
        return @

    loc: (name) ->
        location = @uniform_cache[name]
        if location is undefined
            location = @uniform_cache[name] = @gl.getUniformLocation @program, name
        return location

    i: (name, value) ->
        cached = @value_cache[name]
        if cached != value
            @value_cache[name] = value
            loc = @loc name
            @gl.uniform1i loc, value if loc
        return @

    f: (name, value) ->
        cached = @value_cache[name]
        if cached != value
            @value_cache[name] = value
            loc = @loc name
            @gl.uniform1f loc, value if loc
        return @

    fv: (name, values) ->
        loc = @loc name
        @gl.uniform1fv loc, values if loc
        return @
    
    val2: (name, a, b) ->
        cached = @value_cache[name]
        if cached
            if cached.a != a or cached.b != b
                cached.a = a; cached.b = b
                loc = @loc name
                @gl.uniform2f loc, a, b if loc
        else
            @value_cache[name] = {a:a, b:b}
            loc = @loc name
            @gl.uniform2f loc, a, b if loc
        return @
    
    val3: (name, a, b, c) ->
        cached = @value_cache[name]
        if cached
            if cached.a != a or cached.b != b or cached.c != c
                cached.a = a; cached.b = b; cached.c = c
                loc = @loc name
                @gl.uniform3f loc, a, b, c if loc
        else
            @value_cache[name] = {a:a, b:b, c:c}
            loc = @loc name
            @gl.uniform3f loc, a, b, c if loc
        return @
    
    vec2: (name, value) ->
        loc = @loc name
        @gl.uniform2fv loc, value if loc
        return @
    
    vec3: (name, value) ->
        loc = @loc name
        @gl.uniform3fv loc, value if loc
        return @

    val4: (name, a, b, c, d) ->
        loc = @loc name
        @gl.uniform4f loc, a, b, c, d if loc
        return @
    
    vec4: (name, a, b, c, e) ->
        loc = @loc name
        @gl.uniform2f loc, a, b, c, e if loc
        return @

    mat4: (name, value) ->
        loc = @loc name
        if loc
            if value instanceof Mat4
                @gl.uniformMatrix4fv loc, @gl.FALSE, value.data
            else
                @gl.uniformMatrix4fv loc, @gl.FALSE, value
        return @

    mat3: (name, value) ->
        loc = @loc name
        @gl.uniformMatrix3fv loc, @gl.FALSE, value.data if loc
        return @

    draw: (drawable) ->
        drawable
            .setPointersForShader(@)
            .draw()
            .disableAttribs(@)
        return @
