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

## 压缩图片

需要canvas的支持，原理是利用了canvas定好所要生成的宽高，并且HTMLCanvasElement.toDataURL()的第二个参数代表着清晰度。这样就完成了裁剪和压缩的步骤。

js需要改写成下面的样子：

```javascript
var uploadFn = function (formData) {
    //发送到服务端
    $.ajax({
        url: '/upload2',
        type: 'POST',
        dataType: 'json',
        data: formData,
        contentType: false,
        processData: false
    })
    .done(res => {
        $('#box').append(`<div class="photo-item">
            <img class="item-image" width="100%" height="100%" src="${res.url}"/>
        </div>`);
        console.log(res.path);
    })
    .fail(res => {
        console.log(res);
    });
};
var compass = function (imgObj, type, maxWidth, maxHeight, encoderOptions) {

    //生成比例
    if (imgObj.height > maxHeight) { //按最大高度等比缩放
        imgObj.width = Math.round(imgObj.width * (maxHeight / imgObj.height));
        imgObj.height = maxHeight;
    }
    if (imgObj.width > maxWidth) { //按最大高度等比缩放
        imgObj.height = Math.round(imgObj.height * (maxWidth / imgObj.width));
        imgObj.width = maxWidth;
    }

    //生成canvas
    var $canvas = document.createElement('canvas');
    var ctx = $canvas.getContext('2d');
    $canvas.width = imgObj.width;
    $canvas.height = imgObj.height;
    ctx.drawImage(imgObj, 0, 0, $canvas.width, $canvas.height);
    //canvas.toDataURL的第二个参数决定了图片的质量
    var base64 = $canvas.toDataURL(type, encoderOptions);
    $canvas = null;

    var text = window.atob(base64.split(',')[1]);
    var buffer = new ArrayBuffer(text.length);
    var ubuffer = new Uint8Array(buffer);
    for (var i = 0; i < text.length; i++) {
        ubuffer[i] = text.charCodeAt(i);
    }
    var Builder = window.WebKitBlobBuilder || window.MozBlobBuilder;
    var blob;
    if (Builder) {
        var builder = new Builder();
        builder.append(buffer);
        blob = builder.getBlob(type);
    } else {
        blob = new window.Blob([buffer], {type: type});
    }

    return blob;
};

document
.getElementById('upload')
.addEventListener('change', function (event) {

    var $file = event.currentTarget;
    var file = $file.files;
    for (var i = 0; i < file.length; i++) {
        var url = window.URL.createObjectURL(file[i]);
        var $img = new Image();
        $img.src = url;
        $img.onload = (function (sourceFile) {
            return function () {
                var formData = new FormData();

                //png图片不需要canvas压缩，不然会越压越大
                if (sourceFile.type === 'image/png') {
                    formData.append('upload', sourceFile, sourceFile.name);
                } else {
                    formData.append('upload',
                        compass(this, sourceFile.type, 1000, 800, 0.65),
                        sourceFile.name);
                }
                uploadFn(formData);
                
            }
        })(file[i])
    }
});

```

本地预览并压缩

本地预览需要依赖fileReader API。

```javascript
function compressImg(imgData, file, maxHeight, maxWidth, onCompress) {
    if (!imgData) return;
    onCompress = onCompress || function() {};
    maxHeight = maxHeight || 1000; //默认最大高度200px
    maxWidth = maxWidth || 1000; //默认最大高度200px
    
    var canvas = document.createElement('canvas');
    var img = new Image();
    img.onload = function() {
        if (img.height > maxHeight) { //按最大高度等比缩放
            img.width = Math.round(img.width * (maxHeight / img.height));
            img.height = maxHeight;
        }
        if (img.width > maxWidth) { //按最大高度等比缩放
            img.height = Math.round(img.height * (maxWidth / img.width));
            img.width = maxWidth;
        }
        var ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;

        ctx.clearRect(0, 0, canvas.width, canvas.height); // canvas清屏
        //重置canvans宽高 canvas.width = img.width; canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height); // 将图像绘制到canvas上 

        var base64 = canvas.toDataURL(file.type, 0.65);
        var text = window.atob(base64.split(',')[1]);
        var buffer = new ArrayBuffer(text.length);
        var ubuffer = new Uint8Array(buffer);
        for (var i = 0; i < text.length; i++) {
            ubuffer[i] = text.charCodeAt(i);
        }
        var Builder = window.WebKitBlobBuilder || window.MozBlobBuilder;
        var blob;
        if (Builder) {
            var builder = new Builder();
            builder.append(buffer);
            blob = builder.getBlob(file.type);
        } else {
            blob = new window.Blob([buffer], {type: file.type});
        }
        //必须等压缩完才读取canvas值，否则canvas内容是黑帆布
        //canvas.toDataURL的第二个参数决定了图片的质量，笔者在此写死0.65
        onCompress(blob, file.name, file.type); 
    };

    // 记住必须先绑定事件，才能设置src属性，否则img没内容可以画到canvas
    img.src = imgData;
}

document
.getElementById('upload')
.addEventListener('change', function (event) {

    var $file = event.currentTarget;
    var file = $file.files;
    var FR;
    for (var i = 0; i < file.length; i++) {
        FR = new FileReader();
        FR.readAsDataURL(file[i]); //先注册onload，再读取文件内容，否则读取内容是空的
        FR.onload = (function (targetFile) {
            return function (previewObj) {
                compressImg(previewObj.target.result, targetFile, 800, 1000,
                    function(compressData, name, type) {

                    var formData = new FormData();
                    //压缩完成后执行的callback
                    formData.append('upload', compressData, name);
                    $.ajax({
                        url: '/upload2',
                        type: 'POST',
                        dataType: 'json',
                        data: formData,
                        contentType: false,
                        processData: false
                    })
                    .done(res => {
                        console.log(res.path);
                    })
                    .fail(res => {
                        console.log(res);
                    });
                    $('#box').append(`<div class="photo-item">
                        <img class="item-image" width="100%" height="100%" src="${previewObj.target.result}"/>
                    </div>`);
                });
            }
        })(file[i]);
    }
});
```

## 思考

上面的代码只是演示的demo，当然有很多改进的空间，比如说:

* 上传图片的删除，酷一点的当然可以将图片拖到页面某个区域直接就删除。
* 上传显示进度百分比，这个效果需要ajax请求里加入xhr参数

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

源代码包括node版服务端，路径：[github地址](https://github.com/everlose/nodePractice/tree/master/uploader)，目录如下：

* /staticfile 静态文件所在，主要是jq和uploadify插件。
* /tmp 上传图片后存储文件夹的位子。
* index.js 服务端：请求控制，控制某请求调用某方法进行的。
* requestHandlers.js 服务端：请求处理，逻辑最重的地方。
* router.js 服务端：请求的路由，控制请求接受来后调用哪个请求控制组的。
* server.js 服务端：应用启动入口。
* uploader.html 前端页面，演示了用uploadify插件上传，访问`localhost:8066/uploader.html`可以看到。
* uploader1.html 前端页面，演示了h5多图上传，访问`localhost:8066/uploader1.html`可以看到。
* uploader2.html 前端页面，演示了图片上传前压缩，访问`localhost:8066/uploader2.html`可以看到。
* uploader3.html 前端页面，演示了图片压缩并预览上传，访问`localhost:8066/uploader3.html`可以看到。

找到代码目录后运行命令

```
npm install formidable
node index.js
```


## 参考

* [张鑫旭drag & drop demo](http://www.zhangxinxu.com/wordpress/2011/02/html5-drag-drop-%E6%8B%96%E6%8B%BD%E4%B8%8E%E6%8B%96%E6%94%BE%E7%AE%80%E4%BB%8B/)
* [HTML5之input:file说明](http://qianduanblog.com/post/html5-learning-4-html5-input-file.html)
* [HTMLCanvasElement.toDataURL()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL)
* [移动前端－图片压缩上传实践](http://www.open-open.com/lib/view/open1435407597794.html)
* [canvas.toDataUrl压缩图片](http://www.cnblogs.com/plusice/p/3817391.html)