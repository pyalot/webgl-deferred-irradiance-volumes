class Backend
    constructor: ->
        @loading = 0
        @handlers = []
    
    loaded: ->
        if @loading == 0
            for handler in @handlers
                if handler.event == 'loaded' then handler.callback.apply(handler)
        return

    bind: (event, callback) ->
        handler =
            event: event
            callback: callback
        @handlers.push handler
        return handler

    unbind: (handler) ->
        index = @handlers.indexOf handler
        if index >= 0 then @handlers.splice index, 1

class HTMLAudio extends Backend
    @available = (
        (window.Audio != undefined) and
        (window.URL != undefined) and
        (window.BlobBuilder != undefined)
    )

    class Sample
        constructor: (@backend, data) ->
            @backend.loading += 1
            @url = blob.pack data, 'audio/ogg'
        
        play: (looping) ->
            voice = @backend.getFree()
            voice.play(@url, looping) if voice

    class Voice
        constructor: (backend, @id) ->
            self = @
            @audio = new Audio()
            @audio.onended = ->
                backend.ended(self)

        play: (url) ->
            @audio.src = url
            @audio.play()

    constructor: ->
        @free = {}
        @playing = {}

        for id in [0...20]
            @free[id] = new Voice(@, id)

        setInterval @check, 100

    check: =>
        #for id, voice of @playing
            #console.log voice.audio.duration

    getFree: ->
        for id, voice of @free
            delete @free[id]
            @playing[id] = voice
            return voice

    ended: (voice) ->
        @free[voice.id] = voice
        delete @playing[voice.id]
    
    createSample: (data) ->
        @start_time = gettime()
        return new Sample @, data

class WebAudio extends Backend
    @available = window.webkitAudioContext != undefined
    
    constructor: ->
        super()
        @ctx = new webkitAudioContext()

    play: (buffer, looping=false) ->
        source = @ctx.createBufferSource()
        source.buffer = buffer
        source.loop = looping
        source.connect(@ctx.destination)
        source.noteOn(@ctx.currentTime)
   
    decode: (data, callback) ->
        @ctx.decodeAudioData data, (buffer) ->
            callback(buffer)

if WebAudio.available
    backend = new WebAudio()

    exports.decode = (data, callback) ->
        backend.decode data, callback

    exports.play = (buffer) ->
        backend.play buffer
else
    exports.decode = (data, callback) ->
    exports.play = (buffer) ->
