var http = require('http');
var url = require('url'); 
var fs = require('fs');
var deal = require('./deal');

function start() {
    function onRequest(request, response) {
        var params = url.parse(request.url, true),
            pathname = params.pathname;

        //静态资源服务器
        //fs.readFile(filename,[options],callback);
        if (pathname === '/') {
            response.end('index page，the author only left this message');
        } else {
            fs.readFile(__dirname + pathname, 'utf8', function(err, file){
                if (err && err.code === 'ENOENT') {
                    response.writeHead(404, {'Content-Type': 'text/plain'});
                    response.write(err + "\n");
                    response.end();
                } else if (err) {
                    response.writeHead(500, {'Content-Type': 'text/plain'});
                    response.write(err + "\n");
                    response.end();
                } else {
                    response.writeHead(200, {'Content-Type': 'text/plain'});
                    
                    //有callback字段则为jsonp请求。
                    if (params.query && params.query.callback) {
                         var str = params.query.callback + '(' + deal(file) + ')';
                         response.end(str);  
                     } else {  
                         response.end(deal(file));//普通的json  
                     }
                    
                }
            });
        }
    }
    var port = process.argv[2] || 9527;
    http.createServer(onRequest).listen(port);
    console.log("Server has started at port " + port);
}
start();

