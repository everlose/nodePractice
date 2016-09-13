var http = require('http');
var fs = require('fs');
var url = require('url');
var port = process.argv[2] || 3000;


http.createServer(function (req, res) {
    var pathname = url.parse(req.url).pathname;
    if(pathname === '/msg') {
        // 1. 设定头信息
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        });

        // 2. 输出内容，必须 "data:" 开头 "\n\n" 结尾（代表结束）
        setInterval(function () {
            res.write('data: ' + Date.now() + '\n\n');
        }, 1000);
    } else if (pathname === '/index.html' || pathname === '/client.html') {
        // 其他请求显示index.html
        fs.readFile('./client.html', function (err, content) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(content, 'utf-8');
        });
    } else {
        res.end('');
    }
}).listen(port);


console.log('Server running on port ' + port);