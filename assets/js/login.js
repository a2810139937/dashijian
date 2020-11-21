$(function() {
    $('#dl').on('click', function(){
        $('.denglu').hide();
        $('.zuce').show();
    })
    $('#zc').on('click', function(){
        $('.denglu').show();
        $('.zuce').hide();
    })

    let form=layui.form;
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
        ccc: function(value){
              let queren=$('.zuce [name=password]').val()
              if(value!==queren)return '两次密码不一致!'
          }
    })
    // 注册页面的提交事件
    let layer = layui.layer;
    $('#zcym').on('submit', function (e) {
        e.preventDefault()
        let data={username:$('#zcym [name=username]').val(), password:$('#zcym [name=password]').val()}
        $.post('/api/reguser',data,function(sta){
            if(sta.status!==0)return layer.msg(sta.message);
            layer.msg(sta.message);
            $('#zc').click();
            $('#zcym')[0].reset();
        })
    })
    // 登录页面的提交事件
    $('#dlym').on('submit',function(e) {
        e.preventDefault();
        let data=$(this).serialize();
        $.post('/api/login',data,function(sta) {
            if(sta.status!==0)return layer.msg(sta.message);
            layer.msg(sta.message);
            localStorage.setItem('token',sta.token)
            location.href="/index.html"
            $('#dlym')[0].reset();
        })
    })
})

