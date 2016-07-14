
var http = require("http");
var url = require("url");
var fs = require('fs');
var querystring = require('querystring');

function start() {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;

        if (pathname === '/favicon.ico') {
            response.end();
        } else if (pathname === '/') {
            fs.readFile(__dirname + '/view/index/index.html', function(err, file){
                if (err) throw err;
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.write(file, 'utf-8');
                response.end();
                
            });
        } else {

            //静态资源服务器
            //fs.readFile(filename,[options],callback);
            fs.readFile(__dirname + pathname, 'binary', function(err, file){
                if (err && err.code === 'ENOENT') {
                    response.writeHead(404, {'Content-Type': 'text/plain'});
                    response.write(err + "\n");
                    response.end();
                } else if (err) {
                    response.writeHead(500, {'Content-Type': 'text/plain'});
                    response.write(err + "\n");
                    response.end();
                } else {
                    var type = pathname.slice(pathname.lastIndexOf('.') + 1);
                    if (type === 'css') {
                        response.writeHead(200, {'Content-Type': 'text/css'});
                    } else if (type === 'png') {
                        response.writeHead(200, {'Content-Type': 'image/png'});
                    } else if (type === 'js') {
                        response.writeHead(200, {'Content-Type': 'text/javascript'});
                    }
                    response.write(file, 'binary');
                    response.end();
                }
                
            });
        }

        
    }
    http.createServer(onRequest).listen(3000);
    console.log("Server has started.");
}

start();