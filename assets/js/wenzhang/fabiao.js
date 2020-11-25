$(function() {
  var params = new URLSearchParams(location.search)
  var artId = params.get('id')
    var layer = layui.layer
  var form = layui.form
  fwzlb()
  initEditor()
var $image = $('#image')

// 2. 裁剪选项
var options = {
  aspectRatio: 400 / 280,
  preview: '.img-preview'
}

// 3. 初始化裁剪区域
$image.cropper(options)
function fwzlb() { 
    $.ajax({
        method: 'GET',
        url: '/my/article/cates',
        success: function(str) {
            if(str.status !==0)return
            let htmlstr=template('tpl-cate',str);
            $('[name=cate_id]').html(htmlstr);
            form.render()
            getArticleById()
        }
    })
 }
 
 function getArticleById() {
  // 发起请求，获取文章详情
  $.get('/my/article/' + artId, function(res) {
    // 获取数据失败
    if (res.status !== 0) {
      return
    }
    // 获取数据成功
    var art = res.data
    // 为 form 表单赋初始值
    form.val('form-edit', {
      Id: art.Id,
      title: art.title,
      cate_id: art.cate_id,
      content: art.content
    })

    // 手动初始化富文本编辑器
    initEditor()

    // 初始化图片裁剪器
    var $image = $('#image')

    $image.attr('src', 'http://ajax.frontend.itheima.net' + art.cover_img)
  // $image.attr('src', 'http://www.liulongbin.top:3007' + art.cover_img)

    // 裁剪选项
    var cropperOption = {
      aspectRatio: 400 / 280,
      preview: '.img-preview',
      // 初始化图片裁剪框的大小
      autoCropArea: 1
    }
    // 初始化裁剪区域
    $image.cropper(cropperOption)
  })
}


 $('#btnChooseImage').on('click',function() {
    $('#coverFile').click()
 })
 $('#coverFile').on('change',function(e) {
    var files = e.target.files
    if(files.length=== 0){
        return;
    }
    var newImgURL = URL.createObjectURL(files[0])
    $image
   .cropper('destroy')      // 销毁旧的裁剪区域
   .attr('src', newImgURL)  // 重新设置图片路径
   .cropper(options) 
 })
 let zhuangtai="已发布"
 $('#btnSave2').on('click', function (){
     zhuangtai="草稿"
 })
 $('#form-pub').on('submit', function (e) {
     e.preventDefault();
     let fd=new FormData($(this)[0])
     fd.append('state',zhuangtai)
     $image
  .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
    width: 400,
    height: 280
  })
  .toBlob(function(blob) {       // 将 Canvas 画布上的内容，转化为文件对象
    // 得到文件对象后，进行后续的操作
    fd.append('cover_img',blob)
    tj(fd)
  })
    
    
 })
 function tj(fd) {
    $.ajax({
        method: 'POST',
        url:'/my/article/add',
        data:fd,
        contentType: false,
        processData: false,
        success: function(str) {
            if(str.status!==0){
                return layer.msg("发布文章失败!")
            }
            layer.msg("发布文章成功!")
            location.href ='/wenzhang/liebiao.html'
            // console.log(window.parent);
            // window.parent.lb();
        }
    })
   }
})

