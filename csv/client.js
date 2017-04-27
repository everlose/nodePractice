// 引入模块
var http = require('http');
var https = require('https');
var fs = require('fs');

//需要带上user－agent参数这个网站才会处理我的请求，不然会出现403错误
// var opt = {
//     //代理服务器的ip或者域名，默认localhost
//     host: 'js.str.hucdn.com',
//     //代理服务器的端口号，默认80
//     //port: 80,
//     //path是访问的路径，process.argv[2]为目标请求路径
//     path: process.argv[2] || '/api.json',
//     //希望发送出去的请求头
//     headers: {
//         'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36',
//     }
// };

//用于判断是否是最后一个数据信息 
var sourceDataUrl =  process.argv[2] || 'http://localhost:8094/api.json';
var targetFile = process.argv[3] ? __dirname + '/' + process.argv[3] : __dirname + '/test.csv';

var realHttp = sourceDataUrl.indexOf('https://') > -1 ? https : http;

var req = realHttp.get(sourceDataUrl, function(res) {
    var data = '';
    res.setEncoding("utf8"); 

    res.on('data', function(chunk) {
        data += chunk;
    }).on('end', function() {
        console.log(data);
        var content = 'date,price\r\n';
        content += JSON.parse(data).map(function (item) {
            return item.join(',');
        }).join('\r\n');
        fs.writeFile(targetFile, content, {flag:'w+', encoding:'utf-8'}, function (err) {
            if (err) {
                console.log(err);
            }
        });
    });
});