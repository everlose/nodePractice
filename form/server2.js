
var http = require("http");
var url = require("url");
var fs = require('fs');
var querystring = require('querystring');
var formidable = require('formidable');  //处理图片上传的组件

function start() {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;

        if (pathname === '/favicon.ico') {
            response.end();
        } else if (pathname === '/') {
            fs.readFile(__dirname + '/upload.html', function(err, file){
                if (err) throw err;
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.write(file, 'utf-8');
                response.end();
                
            });
        } else if(pathname === '/upload') {
            var form = new formidable.IncomingForm();
            form.parse(request, function(err, fields, files) {
                if (err) throw err;
                var filepath = files.Filedata.path,
                    newpath = '/tmp' + filepath.slice(filepath.lastIndexOf('/')) + '.png';
                
                var readStream = fs.createReadStream(filepath)
                var writeStream = fs.createWriteStream(__dirname + newpath);
                
                //复制文件方法1
                readStream.on('data', function (data) {
                    writeStream.write(data);
                });
                readStream.on('end', function(){
                    console.log('文件读取完成');
                    writeStream.end();
                    response.writeHead(200, {"Content-Type": "text/json"});
                    response.write('{"success": true, "path": "' + newpath + '", "url": "' + request.headers.origin + newpath +'"}');
                    response.end();
                });

                //复制文件方法2
                // readStream.pipe(writeStream);
                // response.writeHead(200, {"Content-Type": "text/json"});
                // response.write('{"success": true, "path": "' + newpath + '", "url": "' + request.headers.origin + newpath +'"}');
                // response.end();
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