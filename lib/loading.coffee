ui = $('#ui')
hidden = true

container = $('<div></div>').css
    position: 'absolute'
    top: '50%'
    left: '50%'
    width: 200
    height: 40
    marginLeft: -100
    marginTop: -20

label = $('<div></div>').appendTo(container).css
    position: 'absolute'
    top: 0
    left: 0
    width: 200
    height: 20
    textAlign: 'center'
    color: 'white'

loading = $('<div></div>').appendTo(container).css
    position: 'absolute'
    top: 20
    left: 0
    width: 200
    height: 20
    border: '1px solid white'

bar = null
makeBar = ->
    loading.empty()
    bar = $('<div></div>').appendTo(loading).css
        position: 'absolute'
        top: 0
        left: 0
        width: 0
        height: 20
        backgroundColor: 'white'
        '-webkit-transition': 'width 0.7s'

exports.show = (text) ->
    label.text text
    makeBar()
    container
        .fadeIn('slow')
        .appendTo(ui)

exports.hide = ->
    container.fadeOut 'slow', ->
        container.detach()

exports.progress = (factor) ->
    bar.width(factor*200)
