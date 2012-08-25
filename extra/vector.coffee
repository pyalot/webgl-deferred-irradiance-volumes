window.Vec3 = class Vec3
    @property 'x'
        get: -> @data[0]
        set: (val) -> @data[0] = val
    @property 'y'
        get: -> @data[1]
        set: (val) -> @data[1] = val
    @property 'z'
        get: -> @data[2]
        set: (val) -> @data[2] = val

    @property 'length'
        get: -> Math.sqrt(@x*@x + @y*@y + @z*@z)

    constructor: (@data) ->
        @data ?= new Float32Array 3

    sub: (other, dst=@) ->
        dst.x = @x - other.x
        dst.y = @y - other.y
        dst.z = @z - other.z
        return dst

    add: (other, dst=@) ->
        dst.x = @x + other.x
        dst.y = @y + other.y
        dst.z = @z + other.z
        return dst

    addVal3: (x, y, z, dst=@) ->
        dst.x = @x + x
        dst.y = @y + y
        dst.z = @z + z
        return dst

    mul: (scalar, dst=@) ->
        dst.x = @x * scalar
        dst.y = @y * scalar
        dst.z = @z * scalar
        return dst
    
    div: (scalar, dst=@) ->
        dst.x = @x / scalar
        dst.y = @y / scalar
        dst.z = @z / scalar
        return dst

    divVal3: (x, y, z, dst=@) ->
        dst.x = @x/x
        dst.y = @y/y
        dst.z = @z/z
        return dst
    
    dot: (other) ->
        return @x*other.x + @y*other.y + @z*other.z

    normalize: (dst=@) ->
        l = @length
        if l > 0 then @mul 1/@length, dst
        return dst

    set: (x,y,z) ->
        @x = x
        @y = y
        @z = z
        return @

window.Vec4 = class Vec4
    @property 'x'
        get: -> @data[0]
        set: (val) -> @data[0] = val
    @property 'y'
        get: -> @data[1]
        set: (val) -> @data[1] = val
    @property 'z'
        get: -> @data[2]
        set: (val) -> @data[2] = val
    @property 'w'
        get: -> @data[3]
        set: (val) -> @data[3] = val

    constructor: (@data) ->
        @data ?= new Float32Array 4

    sub: (other, dst=@) ->
        dst.x = @x - other.x
        dst.y = @y - other.y
        dst.z = @z - other.z
        dst.w = @w - other.w

        return dst

    dot: (other) ->
        return @x*other.x + @y*other.y + @z*other.z + @w*other.w

    toVec3: (dst) ->
        dst ?= new Vec3()
        dst.x = @x
        dst.y = @y
        dst.z = @z

        return dst
