$(function() {
    $.ajaxPrefilter(function(a) {
        a.url = 'http://ajax.frontend.itheima.net' + a.url
        if (a.url.indexOf('/my/') !== -1) {
            a.headers = {
              Authorization: localStorage.getItem('token') || ''
            }
          }
          //  最后完成都会走的
          a.complete = function(res) {
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
              localStorage.removeItem('token')
              location.href = '/login.html'
            }
          }
    })
})