Sphere = require '/webgl/sphere'

return class DeferredModel extends require('webgl/drawable')
    attribs: ['position', 'lightprobe', 'center']
    pointers: [
        {name: 'position',    size: 3, offset: 0, stride: 7},
        {name: 'lightprobe',  size: 4, offset: 3, stride: 7},
    ]
    constructor: (@gl, probes) ->
        super()
        template = Sphere.makeVertices(5.1, 2)

        buffer = []
        for probe, i in probes
            px = probe.x
            py = probe.y
            pz = probe.z
            for vi in [0...template.length] by 3
                x = template[vi]
                y = template[vi+1]
                z = template[vi+2]
                buffer.push(x,y,z,px,py,pz,i)

        @size = buffer.length/7
        @uploadList buffer
