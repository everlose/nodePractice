// 引入模块
var http = require('http');

//需要带上user－agent参数这个网站才会处理我的请求，不然会出现403错误
var opt = {
    //代理服务器的ip或者域名，默认localhost
    host: '122.228.179.178',
    //代理服务器的端口号，默认80
    port: 80,
    //path是访问的路径
    path: 'http://www.163.com',
    //希望发送出去的请求头
    headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36',

    }
};

//一个request请求，下面是接收的代码。
var req = http.get(opt, function(res) {
    var data = '';
    res.setEncoding("utf8"); 

    res.on('data', function(chunk) {
        data += chunk;
    }).on('end', function() {

        console.log(data)
    });
});

//console.log(req);