var http = require('http');
var mkdirp = require('mkdirp');
var fs = require('fs');
var EventEmitter = require('events').EventEmitter; 

var event = new EventEmitter(); 
var url = 'http://www.meizitu.com/a/5318.html';
var pics = [];
var dir = './images';
var idx = 0;

//创建目录
mkdirp(dir, function(err) {
    if(err){
        console.log(err);
    }
});

//匹配图片（g表示匹配所有结果i表示区分大小写）
var imgReg = /<img.*?(?:>|\/>)/gi;
//匹配src属性 
var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;

http.get(url, function(response) {
    var html = '';
    console.log(response.constructor);
    response.on('data', function(data) {
        html += data;
    });
    response.on('end', function() {
        // console.log(html.match(reg));
        var arr = html.match(imgReg);
        // 这里注意，用match进行匹配的话，g模式是不支持输出匹配结果的，所以先匹配出页面中所有的图片（img标签），再匹配出img标签中的src属性值，push到数组pics中
        for (var i = 0; i < arr.length; i++) {
          pics.push(arr[i].match(srcReg)[1]);
        }
        console.log(pics);
        // 事件驱动：发出图片地址解析完成的事件parse_done，参数0表示进行第0次图片下载事件
        event.emit('parse_done', 0); 
    });
}).on('error', function() {
    console.log('网络繁忙');
});

// 事件监听：当监听到parse_done事件后，发http请求获取图片
event.on('parse_done', function(idx) { 
    http.get(pics[idx], function(res){
        var imgData = '';
        // 对图片进行编码传输，图片、视频只能用binary或base64编码，不能用utf8编码
        res.setEncoding('binary'); 
        // 图片开始传输
        res.on('data', function(chunk){
            imgData += chunk;
        });
        // 传输结束，将图片保存到本地
        res.on('end', function(){
            fs.writeFile('./images/meizi'+idx+'.jpg', imgData, 'binary', function(err){
                if(err){
                    console.log('down fail');
                    console.log(idx);
                // 判断是否是最后一张图片，如果不是，继续发parse_done事件进行下一张图片的下载，如果是，就停止循环
                } else if(idx < pics.length-1){
                    console.log('down success');
                    console.log(idx);
                    idx = idx + 1;
                    event.emit('parse_done', idx);
                } else {
                    console.log('down success');
                }
            });
        });
    });
}); 