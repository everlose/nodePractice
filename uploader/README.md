## 简介
上传是个老生常谈的话题了，多数情况下各位想必用的是uplodify，webUploader之类的插件，但近期团队定制组件的时候，笔者总觉得插件太重，许多功能用不到，那么就自己练手写了一个demo，并且支持图片拖拽排序。支持chrome 31及以上，IE就呵呵了。不过笔者的团队就是不用兼容IE，所以任性。。另外，后端处理部分本篇不会详细讨论，请直接查看下面的源码。

## 单图上传
上传主要涉及 XMLHttpRequest Level 2的API：FormData。下面的脚本chrome 31版后才会兼容。

css部分使用了一个障眼法，将input type=file的表单项设置为opacity:0的，然后绝对定位撑满父容器。这样一来用户看到的只有父容器的样子，而点击到的元素input type=file却是透明的。
```css
.photo-item, .photo-add {
    position: relative;
        float: left;
        width: 120px;
        height: 90px;
        margin-bottom: 52px;
        margin-right: 16px;
    }
}

.item-image {
    display: block;
    width: 100%;
    height: 100%;
}

.uploader-file {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
}
```

accept属性表示可以选择的文件MIME类型，多个MIME类型用英文逗号分开，常见MIME类型见[这里](http://ryanjoy.iteye.com/blog/1583584)。

```html
<div class="photo-add">
    <img class="item-image" src="http://7xn4mw.com1.z0.glb.clouddn.com/16-9-13/13827291.jpg" alt="">

    <input type="file" accept="image/*"
        name="uploader-input" 
        class="uploader-file"
        id="upload">
</div>

<div id="box"></div>
```

js需要监听input的onchange事件，从而拿到file对象，塞进FormData的实例对象里，就能用ajax提交。

```javascript
document.getElementById('upload').addEventListener('change', function (event) {
    var $file = event.currentTarget;
    var formData = new FormData();
    var file = $file.files;
    formData = new FormData();
    formData.append(file[0].name, file[0]);
    $.ajax({
        url: '/upload',
        type: 'POST',
        dataType: 'json',
        data: formData,
        contentType: false,
        processData: false
    })
    .done(data => {
        $('#box').append(`<div class="photo-item">
            <img class="item-image" width="100%" height="100%" src="${data.url}"/>
        </div>`);
    })
    .fail(data => {
        console.log(data);
    });
});
```

## 多选上传
注意多了一个multiple属性，是否可以选择多个文件，多个文件时其value值为第一个文件的虚拟路径。
```html
<input type="file" accept="image/*" multiple
    name="uploader-input" 
    class="uploader-file"
    id="upload">
```
注意需要对file对象进行遍历，由于服务器暂时做的很简单，只能响应单图的上传请求，所以需要多次发起ajax。
```javascript
document.getElementById('upload').addEventListener('change', function (event) {
    var $file = event.currentTarget;
    var formData = new FormData();
    var file = $file.files;
    for (var i = 0; i < file.length; i++) {
        // 文件名称，文件对象
        formData = new FormData();
        formData.append(file[i].name, file[i]);
        $.ajax({
            url: '/upload',
            type: 'POST',
            dataType: 'json',
            data: formData,
            contentType: false,
            processData: false
        })
        .done(data => {
            $('#box').append(`<div class="photo-item">
                <img class="item-image" width="100%" height="100%" src="${data.url}"/>
            </div>`);
        })
        .fail(data => {
            console.log(data);
        });
    }
});
```

## drag and drop api
这里已经支持外部文件系统拖拽图片到div.photo-add上可上传，浏览器已经替我们做了处理了，为了练习drag api，于是尝试加入上传的图可以拖动排序的需求，则可以使用drag and drop的api。chrome 7+以上支持。这里只使用了三个事件：

* ondragstart 当拖拽元素开始被拖拽的时候触发的事件，此事件作用在被拖曳元素上
* ondragover 拖拽元素在目标元素上移动的时候触发的事件，此事件作用在目标元素上
* ondrop 被拖拽的元素在目标元素上同时鼠标放开触发的事件，此事件作用在目标元素上

```javascript
......
var temp;
$('#box')
.on('dragstart', '.photo-item', function (e) {
    temp = this;
})
.on('dragover', '.photo-item', function (e) {
	//此事件切记要preventDefault，否则接下来将不会触发drop事件
    e.preventDefault();
})
.on('drop', '.photo-item', function (e) {
    var sourceHTML = temp.innerHTML;
    temp.innerHTML = this.innerHTML;
    this.innerHTML = sourceHTML;
});
```

## 思考
上面的代码只是演示的demo，当然有很多改进的空间，比如说:
* 上传图片的删除，酷一点的当然可以将图片拖到页面某个区域直接就删除。
* 上传显示进度百分比，这个效果需要ajax请求里加入xhr参数
* 上传前预览以及压缩图片，需要canvas支持，请看[链接](https://segmentfault.com/a/1190000002535673)

## 服务端
服务端是一个结构分层的node处理图片上传，抄自node入门篇里的结构：

* /staticfile 静态文件所在，主要是jq和uploader插件。
* /tmp 图片存储文件夹。
* index.js 请求控制，控制某请求调用某方法进行的。
* requestHandlers.js 请求处理，逻辑最重的地方。
* router.js 请求的路由，控制请求接受来后调用哪个请求控制组的。
* server.js 应用启动入口。

这里略过描述，有需要的直接去下文档下面找到github源码地址看。

## 源码
源代码包括node版服务端，路径：[github地址](https://github.com/everlose/nodePractice/tree/master/uploader)
找到代码目录后运行命令
```
npm install formidable
node index.js
```
访问`localhost:8066/uploader2.html`。


## 参考
[张鑫旭drag & drop demo](http://www.zhangxinxu.com/wordpress/2011/02/html5-drag-drop-%E6%8B%96%E6%8B%BD%E4%B8%8E%E6%8B%96%E6%94%BE%E7%AE%80%E4%BB%8B/)
[HTML5之input:file说明](http://qianduanblog.com/post/html5-learning-4-html5-input-file.html)