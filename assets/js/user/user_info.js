$(function () {
   $('.layui-form').on('submit',function (e) {
       e.preventDefault();
       $.ajax({
           type: 'POST',
         url:'/my/userinfo',
         data: $(this).serialize(),
         success: function (sat){
             if(sat.status!==0)return layer.msg(sat.message);
             layer.msg(sat.message);
             window.parent.huoqu()
         }
})
   })
   
huo()
$('#chongzhi').click(function(e) {
    e.preventDefault();
    huo()
})
form.verify({
    ccc: function (value) {
        if(value.length>6) return "昵称长度必须在 1 ~ 6 个字符之间！"
    }
})
 })
 let form = layui.form
    let layer = layui.layer
 function huo() {
     $.ajax({
         type: "GET",
         url: '/my/userinfo',
         success: function (sat) {
             if(sat.status!==0) return layer.msg('获取用户基本信息失败！');
             form.val('formuser_info', sat.data);
         }
     })
 }