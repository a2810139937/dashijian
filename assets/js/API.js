$(function() {
    $.ajaxPrefilter(function(a) {
        a.url = 'http://www.liulongbin.top:3007' + a.url
    })
})