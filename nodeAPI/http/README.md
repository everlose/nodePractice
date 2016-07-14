# http模块简介

## 创建http服务器，接收处理请求
```
var http = require('http');
 
// createServer返回了一个http.server对象，拥有listen方法
// 此req为http.IncommingMessage（实现了 Readable Stream 接口以及其他额外的事件，方法和属性。）的一个实例
// 此res为http.serverResponse（实现Writable Stream 接口，也是一个包含若干事件的EventEmitter）的一个实例

http
	.createServer(function(req, res){
		
		console.log(res.constructor);
		//写入请求头
		res.writeHead(200, {'Content-Type': 'text/plain'});

		//写入返回内容
		res.write('Hello nodejs');
		

		//结束本次响应
		res.end();
	})
	.listen(8888);

// 开起来后运行这条命令测试并发量：ab -n1000 -c10 http://localhost:8888/
```
注意createServer返回的的对象，他拥有的方法可以在API中的http.server里找到，req和res同理。

## 向其他服务器发送请求
```
//此匿名函数中的参数response为http.ClientRequest的一个实例
http.get(url, function(req) {
    var html = '';
    req.on('data', function(data) {
        html += data;
    });
    req.on('end', function() {
        var courseArr = filterChapters(html);
        printCourseInfo(courseArr);
    });
}).on('error', function() {
    console.log('获取课程错误');
});
```
也要注意这里http.get实际上在http.request方法上进行进一步封装，只多了一个不用手动写res.end()的功能。此匿名函数里的req是http.IncomingMessage的一个实例。

## 简单爬妹子图的代码
```
var http = require('http');
var url = 'http://www.meizitu.com/a/5318.html';
var reg = /<img\s*src="(.*?)"\s*>/g;

http.get(url, function(response) {
    var html = '';
    console.log(response.constructor);
    response.on('data', function(data) {
        html += data;
    });
    response.on('end', function() {
        console.log(html.match(reg));
    });
}).on('error', function() {
    console.log('网络繁忙');
});
```
这里只是简单过滤出了图片的的src字符串，如果要自动下载爬取的图片的话，期待其他大牛下一次分享fs文件操作和buffer流操作吧。

## 参考资料
> [nodejs 中文版API](http://nodeapi.ucdok.com/#/api/) 
> [nodejs HTTP源码](https://github.com/nodejs/node/blob/v0.12.7-release/lib/http.js)
> [nodejs HTTP详解](http://my.oschina.net/antianlu/blog/228511)