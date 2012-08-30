{Texture2D} = require '/webgl/texture'

Materials = class Materials
    createTexture: (path) ->
        texture = @texture_cache[path]
        if not texture
            image = get path
            texture = new Texture2D(@gl)
                .bind()
                .upload(image)
                .mipmap()
                .repeat()
                .unbind()
            @texture_cache[path] = texture
        return texture

    constructor: (@gl) ->
        @texture_cache = {}

        @definitions = get 'materials.json'
        @gl.pixelStorei @gl.UNPACK_FLIP_Y_WEBGL, true


        for definition in @definitions
            diffuse = "diffuse/#{definition.diffuse_texture}"
            jpgbump = "bump/#{definition.bumpmap}"
            pngbump = jpgbump.replace('.jpg', '.png')

            definition.diffuse_texture = @createTexture diffuse

            specular = definition.specular_color
            luma = (specular.r + specular.g + specular.b)/3
            definition.specularity = luma*definition.specularity

            if get.exists pngbump
                definition.bumpmap = @createTexture pngbump
            else if get.exists jpgbump
                definition.bumpmap = @createTexture jpgbump
            else
                definition.bumpmap = definition.diffuse_texture

        @gl.pixelStorei @gl.UNPACK_FLIP_Y_WEBGL, false

        @diffuse_texture = @sortById('diffuse_texture')
        @bumpmap = @sortById('bumpmap')

    sortById: (type) ->
        result = for definition in @definitions
            definition

        result.sort (a,b) ->
            return a[type].id - b[type].id
        return result

return class Model extends require('/webgl/drawable')
    attribs: ['position', 'texcoord', 'normal']
    pointers: [
        {name: 'position', size: 3, offset: 0, stride: 8},
        {name: 'texcoord', size: 2, offset: 3, stride: 8},
        {name: 'normal', size: 3, offset: 5, stride: 8},
    ]
    constructor: (@gl) ->
        super()
        @materials = new Materials @gl

        indices = new Uint16Array(get('sponza.indices'))
        vertices = new Float32Array(get('sponza.vertices'))
        @size = indices.length
        @max_angle = Math.cos(Math.PI*2*(43/360))
        @computeVertexFaces(indices, vertices)
        @computeFaceNormals(indices, vertices)
        buffer = @calculateVertices(indices, vertices)
        @upload buffer

    computeVertexFaces: (indices, vertices) ->
        start = gettime()

        vertex_count = vertices.length/5

        #how much storage do I need?
        counts = new Uint8Array(vertex_count)
        for index in indices
            counts[index] += 1

        max = 0
        for count in counts
            if count > max
                max = count

        @max_count = max

        #store face indices
        vertex_faces = new Uint32Array(max*vertex_count)
        counts = new Uint8Array(vertex_count)
        face_count = indices.length/3
        for face_index in [0...face_count]
            iv = face_index*3
            idx1 = indices[iv]
            idx2 = indices[iv+1]
            idx3 = indices[iv+2]

            c1 = counts[idx1]++
            c2 = counts[idx2]++
            c3 = counts[idx3]++

            vertex_faces[idx1*max+c1] = face_index
            vertex_faces[idx2*max+c2] = face_index
            vertex_faces[idx3*max+c3] = face_index

        end = gettime()
        #console.log 'compute vertex faces', (end-start)*1000
        @vertex_face_count = counts
        @vertex_faces = vertex_faces

    computeFaceNormals: (indices, vertices) ->
        start = gettime()
        face_count = indices.length/3
        normals = new Float32Array(face_count*3)
        
        for i in [0...face_count]
            iv = i*3
            i1 = indices[iv]
            i2 = indices[iv+1]
            i3 = indices[iv+2]

            x1 = vertices[i1*5]
            y1 = vertices[i1*5+1]
            z1 = vertices[i1*5+2]
            
            x2 = vertices[i2*5]
            y2 = vertices[i2*5+1]
            z2 = vertices[i2*5+2]
            
            x3 = vertices[i3*5]
            y3 = vertices[i3*5+1]
            z3 = vertices[i3*5+2]

            tx=x2-x1; ty=y2-y1; tz=z2-z1
            btx=x3-x1; bty=y3-y1; btz=z3-z1

            nx = ty*btz - tz*bty
            ny = tz*btx - tx*btz
            nz = tx*bty - ty*btx
            l = Math.sqrt(nx*nx + ny*ny + nz*nz)
            nx/=l; ny/=l; nz/=l

            normals[iv+0] = nx
            normals[iv+1] = ny
            normals[iv+2] = nz

        @normals = normals
        end = gettime()
        #console.log 'compute face normals', (end-start)*1000

    getNormal: (face_index, vertex_index) ->
        rx = @normals[face_index*3+0]
        ry = @normals[face_index*3+1]
        rz = @normals[face_index*3+2]
        #return [rx, ry, rz]

        nx = 0; ny=0; nz=0
        for c in [0...@vertex_face_count[vertex_index]]
            vfidx = @vertex_faces[vertex_index*@max_count+c]
            x = @normals[vfidx*3+0]
            y = @normals[vfidx*3+1]
            z = @normals[vfidx*3+2]
            cos = rx*x + ry*y + rz*z
            if cos > @max_angle
                nx = x
                ny = y
                nz = z

        l = Math.sqrt(nx*nx + ny*ny + nz*nz)
        return [nx/l, ny/l, nz/l]

    calculateVertices: (indices, vertices, normals) ->
        start = gettime()
        result = new Float32Array(indices.length*8)
        for i in [0...indices.length/3]
            iv = i*3
            i1 = indices[iv]
            i2 = indices[iv+1]
            i3 = indices[iv+2]

            x1 = vertices[i1*5]
            y1 = vertices[i1*5+1]
            z1 = vertices[i1*5+2]
            u1 = vertices[i1*5+3]
            v1 = vertices[i1*5+4]
            
            x2 = vertices[i2*5]
            y2 = vertices[i2*5+1]
            z2 = vertices[i2*5+2]
            u2 = vertices[i2*5+3]
            v2 = vertices[i2*5+4]
            
            x3 = vertices[i3*5]
            y3 = vertices[i3*5+1]
            z3 = vertices[i3*5+2]
            u3 = vertices[i3*5+3]
            v3 = vertices[i3*5+4]

            [nx,ny,nz] = @getNormal i, i1
            result[(iv+0)*8 + 0] = x1
            result[(iv+0)*8 + 1] = y1
            result[(iv+0)*8 + 2] = z1
            result[(iv+0)*8 + 3] = u1
            result[(iv+0)*8 + 4] = v1
            result[(iv+0)*8 + 5] = nx
            result[(iv+0)*8 + 6] = ny
            result[(iv+0)*8 + 7] = nz
            
            [nx,ny,nz] = @getNormal i, i2
            result[(iv+1)*8 + 0] = x2
            result[(iv+1)*8 + 1] = y2
            result[(iv+1)*8 + 2] = z2
            result[(iv+1)*8 + 3] = u2
            result[(iv+1)*8 + 4] = v2
            result[(iv+1)*8 + 5] = nx
            result[(iv+1)*8 + 6] = ny
            result[(iv+1)*8 + 7] = nz
            
            [nx,ny,nz] = @getNormal i, i3
            result[(iv+2)*8 + 0] = x3
            result[(iv+2)*8 + 1] = y3
            result[(iv+2)*8 + 2] = z3
            result[(iv+2)*8 + 3] = u3
            result[(iv+2)*8 + 4] = v3
            result[(iv+2)*8 + 5] = nx
            result[(iv+2)*8 + 6] = ny
            result[(iv+2)*8 + 7] = nz

        end = gettime()
        #console.log 'build vertices', (end - start)*1000
        return result
