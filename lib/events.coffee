return class Emitter
    constructor: ->
        @handlers = {}

    on: (name, callback) ->
        handlers = @handlers[name]
        if handlers == undefined
            handlers = @handlers[name] = []
        handlers.push callback
        return @

    trigger: (name, a1, a2, a3, a4, a5, a6) ->
        handlers = @handlers[name]
        if handlers != undefined
            for handler in handlers
                handler(a1, a2, a3, a4, a5, a6)
        return @

