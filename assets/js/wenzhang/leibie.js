$(function() {
    let layer = layui.layer
    let form = layui.form
    wzlb()
    function wzlb() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res){
                if(res.status!==0){
                    console.log('获取失败');
                }
                var htmld=template('buhuo',res)
                $('tbody').html(htmld);
            }
        })
         }
         let index;
         $('body').on('click','#bianji',function(){
            index=layer.open({
                type:1,
                title: '修改文章类别',
                area: ['500px', '250px'],
                content: $('#formbj').html()
              });
              let id=$(this).attr('data-id');
              $.ajax({
                  method:'GET',
                  url:'/my/article/cates/'+id,
                  success: function(res) {
                    form.val('form-edit',res.data)
                  }
              })
         })
         $('body').on('submit', '#form-edit', function (e) {
             e.preventDefault();
             $.ajax({
                 method: 'POST',
                 url:'/my/article/updatecate',
                 data:$(this).serialize(),
                 success: function (sta) {
                    if(sta.status!==0)layer.msg('修改失败')
                    wzlb()
                    layer.close(index)
                 }
             })
         })
         $('body').on('click', '#shanchu', function () {
            let id=$(this).attr('data-id')
            layer.confirm('确定删除?', {icon: 3, title:'提示'}, function(index){
                $.ajax({
                    method:'GET',
                    url:'/my/article/deletecate/'+id,
                    success:function (sta) {
                       wzlb()
                    }
                })
                layer.close(index);
              });
             
             
         })
         let indexs;
         $('#butadd').on('click', function(){
            indexs=layer.open({
                type:1,
                title: '修改文章类别',
                area: ['500px', '250px'],
                content: $('#formtj').html()
              });
            
         })
         $('body').on('submit','#form-add',function (e) {
            e.preventDefault();
            $.ajax({
                method: 'POST',
                url:'/my/article/addcates',
                data:$(this).serialize(),
                success: function (sta) {
                    if(sta.status!==0)return layer.msg('添加图书失败')
                   wzlb()
                   layer.close(indexs);
                }
            })
          })
          
         
})
