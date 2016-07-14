// 引入模块
var http = require('http');
var fs = require('fs');
var request = require('request');

//需要带上user－agent参数这个网站才会处理我的请求，不然会出现403错误
var opt = {
    hostname: 'www.mzitu.com',
    port: 80,
    path: '/share/comment-page-2',
    agent: false,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36'
    }
}
http.get(opt, function(res) {
    var data = '';
    res.setEncoding("utf8"); 

    res.on('data', function(chunk) {
        data += chunk;
    }).on('end', function() {

        console.log(data)
    });
});

