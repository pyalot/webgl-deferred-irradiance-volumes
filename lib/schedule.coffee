exports.run = (callback) ->
    last = gettime()

    step = ->
        current = gettime()
        delta = current-last
        last = current
        callback current, delta
        requestAnimationFrame step

    requestAnimationFrame step
