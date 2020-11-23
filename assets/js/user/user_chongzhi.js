$(function() {
    let layer = layui.layer
    let form = layui.form
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: '/my/updatepwd',
            data: $('.layui-form').serialize(),
            success: function (sat) {
                if(sat.status!==0)return layer.msg(sat.message)
                localStorage.removeItem('token')
                window.parent.location.href="/login.html"
                return layer.msg(sat.message)
            }
    })
  
    })
    form.verify({
        quzhi: function(value){
            if($('[name="oldPwd"]').val()==value)return"旧密码和新密码不能一致!"
        },
        buneng: function(value){
            if(value.length<6)return "密码不能少于6位!"
        },
        yizhi: function(value){
            if(value!==$('[name="xinpwd"]').val())return "确认密码和新密码不一致"
        }
    })
})