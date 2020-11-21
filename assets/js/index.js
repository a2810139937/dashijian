$(function () {
huoqu()
  })

  function huoqu(){
      $.ajax({
          type: "GET",
          url: '/my/userinfo',
          headers:{
            Authorization:localStorage.getItem('token')||""
          },
          success: function(sta) {
            touxiang(sta.data)
          }
          
      })
  }
  function touxiang(aaa) { 
    let name=aaa.nickname||aaa.username
    $('.lll').html('欢迎&nbsp;&nbsp;'+name)
    if(aaa.user_pic!==null){
      
      $('.layui-nav-img').attr('src',aaa.user_pic)
      $('.touxiang').hide();
    }else{
      $('.layui-nav-img').hide()
      let daxie = name[0].toUpperCase()
      $('.touxiang').html(daxie).show();
    }

   }
  let  layer= layui.layer;
  $('#tuichu').on('click',function () {
    layer.confirm('确认退出吗?', {icon: 3, title:'提示'}, function(index){
      localStorage.removeItem('token'),
      location.href='/login.html',
      layer.close(index);
    });
    })