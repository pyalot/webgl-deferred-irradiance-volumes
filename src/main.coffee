audio = require 'audio'
loading = require 'loading'
Shader = require 'webgl/shader'
Quad = require 'webgl/quad'
require 'webgl-nuke-vendor-prefix'
require 'webgl-texture-float-extension-shims'

#crashes firefox
#worker = new Worker('worker.js')
#worker.postMessage('Ping')
#worker.onmessage = (event) ->
#    console.log event

load_hooks =
    '\.jpg$|\.jpeg$|\.gif$|\.png': (name, buffer, callback) ->
        ext =name.split('.').pop()
        switch ext
            when 'png' then mime = 'image/png'
            when 'gif' then mime = 'image/gif'
            when 'jpg', 'jpeg' then mime = 'image/jpeg'
                
        image = new Image()
        image.src = getURL(buffer, mime)
        image.onload = ->
            callback image
    '\.mpg$|\.ogg$|\.wav$': (name, buffer, callback) ->
        audio.decode buffer, (result) ->
            callback result

errorContainer = (title) ->
    canvas.remove()
    $('#ui').empty()
    return $('<div></div>')
        .css(
            position: 'absolute',
            width: 300,
            left: '50%',
            top: 50,
            marginLeft: -100
        )
        .append($('<h1></h1>').text(title))
        .appendTo('#ui')

disableSelect = ->
    $('*').each ->
        $(@)
            .attr('unselectable', 'on')
            .css
               '-moz-user-select':'none',
               '-webkit-user-select':'none',
               'user-select':'none',
               '-ms-user-select':'none'
        @onselectstart = -> false

    document.oncontextmenu = ->
        return false

enableSelect = ->
    $('*').each ->
        $(@)
            .removeAttr('unselectable')
            .css
               '-moz-user-select':'text',
               '-webkit-user-select':'text',
               'user-select':'text',
               '-ms-user-select':'text'
        @onselectstart = undefined

    document.oncontextmenu = undefined

exports.main = ->
    disableSelect()
    window.canvas = $ 'canvas'
    window.onerror = (error) ->
        if error.search(Shader.error) > 0
            return true

    try
        window.gl = canvas[0].getContext 'experimental-webgl'
        if not window.gl
            window.gl = canvas[0].getContext 'webgl'

    if window.gl
        window.quad = new Quad window.gl

        stddev = gl.getExtension 'OES_standard_derivatives'
        if not stddev
            return errorContainer('Missing Extension: Standard Derivatives')
                .append('''
                    <p>This application requires the WebGL <a href="http://www.khronos.org/registry/webgl/extensions/OES_standard_derivatives/">Standard Derivatives extension</a> which you do not have, sorry.</p>
                ''')

        floatExt = gl.getFloatExtension require: ['renderable'], prefer:['filterable', 'half'], throws:false
        if not floatExt
            return errorContainer('Missing Extension: Floating Point Textures')
                .append('''
                    <p>This application requires the WebGL <a href="http://www.khronos.org/registry/webgl/extensions/OES_texture_float/">Floating Point Textures extension</a> which you do not have, sorry.</p>
                ''')

        Application = require('application').Application
        application = null

        loading.show 'Loading ...'

        loader.hooks(load_hooks).mount
            url: 'assets.pack',
            loaded: (files, fs) ->
                for name, value of files
                    if name.match('\.shaderlib$')
                        fs[name] = Shader.splitLines name, value
                try
                    for name, value of files
                        if name.match('\.shader$')
                            fs[name] = new Shader gl, name, value
                    application = new Application(window.canvas, window.gl)
                catch error
                    if error == 'ShaderError'
                        enableSelect()
                        container = errorContainer('Shader Error').append('''
                            <p>
                                An error occured when compiling a shader, you can <a href="mailto:pyalot@gmail.com">paste me the error</a>.
                            </p>
                        ''')
                        container.css
                            width: 600
                            marginLeft: -300

                        $('<pre></pre>')
                            .text(Shader.lastError)
                            .css('overflow', 'auto')
                            .appendTo(container)
                    else
                        throw error
                    
            progress: loading.progress
    else
        container = errorContainer('You dont have WebGL')
        if $.browser.msie
            container.append('''
                <p>
                    You have Internet Explorer, please install
                    <a href="https://www.google.com/intl/en/chrome/browser/">Google Chrome</a> or
                    <a href="http://www.mozilla.org/en-US/firefox/new/">Firefox</a>
                </p>
            ''')
        else if $.browser.webkit
            container.append('''
                <p>
                    If you use OSX Safari, please <a href="http://www.ikriz.nl/2011/08/23/enable-webgl-in-safari">enable WebGL manually</a>.
                    If you use iOS Safari, you cannot use WebGL.
                    If you use Android, please try <a href="http://www.mozilla.org/en-US/mobile/">Firefox Mobile</a> or
                    <a href="https://play.google.com/store/apps/details?id=com.opera.browser&hl=en">Opera Mobile</a>
                </p>
            ''')

        container.append('''
            <p>
                Please consult the <a href="http://support.google.com/chrome/bin/answer.py?hl=en&answer=1220892">support pages</a>
                on how to get WebGL for your machine.
            </p>
        ''')
