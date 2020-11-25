$(function () {
    let layer = layui.layer
    let form = layui.form
    var laypage = layui.laypage
    var p={
        pagenum:1,
        pagesize:2,
        cate_id: "",
        state:"",
    }
    wzhq()
    
    // 格式化时间
    template.defaults.imports.dataFormat = function(date) {
        const dt = new Date(date)
    
        var y = dt.getFullYear()
        var m = a(dt.getMonth() + 1)
        var d = a(dt.getDate())
    
        var hh = a(dt.getHours())
        var mm = a(dt.getMinutes())
        var ss = a(dt.getSeconds())
    
        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
      }
      function a(n) {
       return n>9? n:'0'+n;
        }
    // 获取文章列表
    function wzhq() {  
        $.ajax({
            method:'GET', 
            url:'/my/article/list',
            data:p,
            success: function (str){
                let shuju=template('wenz',str)
                $('tbody').html(shuju)
                xuanrana(str.total)
            }
        })
    }
    wzlb()
    // 文章分类
    function wzlb() { 
        $.ajax({
            method: 'GET',
            url:'/my/article/cates',
            success: function (str){
                let leibie=template('wenl',str)
                $('[name=cate_id]').html(leibie)
                form.render()
            }
        })
     }
     function xuanrana(total){
       
            //执行一个laypage实例
            laypage.render({
              elem: 'yema' //注意，这里的 test1 是 ID，不用加 # 号
              ,count: total ,//数据总数，从服务端得到
              curr:p.pagenum,
              limit:p.pagesize,
              limits:[2,3,5,10],
              layout:["count","limit","prev","page","next","skip"],
              jump:function(obj,first){
                  p.pagenum=obj.curr,
                  p.pagesize = obj.limit
                  if (!first) {
                    wzhq()
                  }
              }

            });
          
     }
     
     $('#shaixuan').on('submit', function (e){
         e.preventDefault();
         let cate_id=$('[name=cate_id]').val();
         let state=$('[name=state]').val();
        //  console.log(cate_id);
        //  console.log(state);
         p.cate_id=cate_id;
         p.state=state;
         wzhq()
     })
     $('body').on('click', '.scan',function() {
        layer.confirm('确认删除?', function(index){
            //do something
            let id=$('.scan').attr('data-id')
           $.ajax({
               method: 'GET',
               url:'/my/article/delete/'+id,
               data:id,
               success:function(sat){
                   if(sat.status !==0)return layer.msg('删除失败')
                   layer.msg('删除成功')
                   wzhq()
               }
           })
            layer.close(index);
          });   
     })
     $('body').on('click', '.bj', function () {
        // let id=$(this).attr('data-id');
        // console.log(id);
        // $.ajax({
        //     method: 'GET',
        //     url:'/my/article/'+id,
        //     data:id,
        //     success: function (str) {
        //         if(str.status !==0)return layer.msg(str.message);
        //         layer.msg(str.message);
        //         console.log(str);
        //         location.href ='/wenzhang/fabiao.html'
        //         form.val('form-edit',str.data)
        //     }
        // })
        location.href = '/wenzhang/fabiao.html?id=' + $(this).attr('data-id')
    })
  })