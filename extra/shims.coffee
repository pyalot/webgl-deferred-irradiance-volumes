if window.performance
    if window.performance.now
        now = -> window.performance.now()
    else if window.performance.webkitNow
        now = -> window.performance.webkitNow()
    else if window.performance.mozNow
        now = -> window.performance.mozNow()
    else if window.performance.oNow
        now = -> window.performance.oNow()
    else
        now = -> Date.now()
else
    now = -> Date.now()

start = now()
window.gettime = -> (now() - start)/1000

if not window.requestAnimationFrame
    if window.webkitRequestAnimationFrame
        window.requestAnimationFrame = window.webkitRequestAnimationFrame
    else if window.mozRequestAnimationFrame
        window.requestAnimationFrame = window.mozRequestAnimationFrame
    else if window.oRequestAnimationFrame
        window.requestAnimationFrame = window.oRequestAnimationFrame
    else
        window.requestAnimationFrame = (fun) ->
            setTimeout(fun, 1000/30)

window.URL = window.URL or window.mozURL or window.webkitURL or window.oURL
window.BlobBuilder = window.BlobBuilder or window.MozBlobBuilder or window.WebKitBlobBuilder or window.OBlobBuilder

log_count = 0
window.console.logN = (n) ->
    if log_count < n
        log_count += 1
        args = [].slice.call(arguments, 1)
        console.log.apply console, args
