fs = {}

makeURL = (blob) ->
    return URL.createObjectURL blob

makeBlob = (data, type) ->
    builder = new BlobBuilder()
    builder.append(data)
    blob = builder.getBlob(type)
    #is recommended, but doesn't work in either Firefox or Chrome o_O
    #blob = new Blob(data, type)
    #return blob
    return blob

window.getURL = (data) ->
    blob = makeBlob data
    return makeURL blob

resolvePath = (base, path) ->
    if path[0] == '/'
        return path
    else
        path = path.split '/'
        if base == '/'
            base = ['']
        else
            base = base.split '/'

        while base.length > 0 and path.length > 0 and path[0] == '..'
            base.pop()
            path.shift()

        if base.length == 0 || path.length == 0 || base[0] != ''
            throw "Invalid path: #{base.join '/'}/#{path.join '/'}"
        return "#{base.join('/')}/#{path.join('/')}"

getJSON = (url, callback) ->
    request = new XMLHttpRequest()
    request.open 'GET', url, true
    request.onload = ->
        callback(JSON.parse(request.response))
    request.send()

getBuffer = (url, progress, callback) ->
    request = new XMLHttpRequest()
    request.open 'GET', url, true
    request.responseType = 'arraybuffer'
    request.onload = ->
        callback(request.response)
    request.onprogress = (event) ->
        if event.lengthComputable
            progress event.loaded/event.total
    request.send()

isImage = (path) ->
    return path.match('\.jpg$|\.jpeg|\.gif$|\.png')

window.loader =
    resolvePath: resolvePath
    main: ->
        main = @require 'main'
        if main.main
            main.main()
        else
            throw 'Main function is not defined in main module.'

    define: (path, code) ->
        dirname = path.split '/'
        dirname.pop()
        dirname = dirname.join '/'

        require = (modpath) ->
            abspath = resolvePath dirname, modpath
            node = fs["#{abspath}.js"]
            if not node
                node = fs["#{abspath}/module.js"]
            if not node then throw "Module not found: #{abspath}"
            if !node.value then node.create()
            return node.value

        get = (respath) ->
            abspath = resolvePath dirname, respath
            node = fs[abspath]
            if not node then throw "Resource not found: #{abspath}"
            return node

        get.exists = (respath) ->
            abspath = resolvePath dirname, respath
            node = fs[abspath]
            return node != undefined

        folder = get.folder = (folderpath) ->
            folder_abs = resolvePath dirname, folderpath
            return {
                path: folder_abs,
                name: folder_abs.split('/')[folder_abs.split('/').length-1]
                get: (respath) ->
                    nodepath = resolvePath folder_abs, respath
                    node = fs[nodepath]
                    if not node then throw "Resource not found: #{nodepath}"
                    return node

                exists: (respath) ->
                    nodepath = resolvePath folder_abs, respath
                    return fs[nodepath] != undefined
                    
                listdir: (respath) ->
                    if respath then nodepath = resolvepath folder_abs, respath
                    else nodepath = folder_abs

                    result = []
                    for name of fs
                        match = name.match "#{folder_abs}/[a-zA-Z0-9-\.]+"
                        if match
                            match = match[0]
                            if result.indexOf(match) == -1
                                result.push match

                    translated = []
                    for name in result
                        if name.match /\.[a-z]+$/
                            translated.push name
                        else
                            translated.push folder name
                    return translated
            }

        get.listdir = (respath, match) ->
            if respath
                abspath = resolvePath dirname, respath
            else
                abspath = dirname

            result = []
            for name of fs
                if name.search(abspath) == 0
                    if match
                        if name.match match
                            result.push name
                    else
                        result.push name
            return result

        fs[path] =
            path: path
            type: 'code'
            data: code
            create: ->
                @value = {}
                retval = code @value, require, get
                if retval
                    @value = retval

    require: (modpath) ->
        abspath = resolvePath '/', modpath
        node = fs["#{abspath}.js"]
        if not node
            node = fs["#{abspath}/module.js"]

        if not node then throw "Module not found: #{abspath}"
        if !node.value then node.create()
        return node.value

    loadPack: ({url, progress, loaded}) ->
        files = {}
        hooks = @hooks
        getBuffer url, ((factor) -> if progress then progress(factor*0.5, 'network')), (data) ->
            decoding = 0
            decoded = 0

            doLoad = (name, info) ->
                if typeof info == 'object' and info.offset != undefined and info.size != undefined
                    storage = new ArrayBuffer info.size
                    dst = new Uint8Array storage
                    src = new Uint8Array data, 8+length+info.offset, info.size
                    dst.set src
                    dst = dst.buffer

                    if hooks
                        for matcher, decode of hooks
                            if name.match(matcher)
                                decoding += 1
                                decode dst, (result) ->
                                    decoded += 1
                                    files[name] = result
                                    if progress then progress(0.5+(decoded/decoding)*0.5, 'decode')
                                    if decoding == decoded and loaded then loaded(files)
                                return
                    files[name] = dst
                else
                    if hooks
                        for matcher, decode of hooks
                            if name.match(matcher)
                                decode info, (result) ->
                                    files[name] = result
                                return
                    files[name] = info

            length = new Uint32Array(data, 4, 1)[0]
            metadata = new Uint8Array(data, 8, length)
            result = ''
            for i in [0...length]
                result += String.fromCharCode(metadata[i])
            result = JSON.parse(result)

            for name, info of result
                doLoad name, info, data

            if decoding == decoded and loaded then loaded(files)

    hooks: (@hooks) -> return @

    mount: ({url, mountpoint, progress, loaded}) ->
        mountpoint ?= '/'
        @loadPack url: url, progress: progress, loaded: (data) ->
            for name, value of data
                fs[name] = value
            loaded(data, fs)
