var http = require("http");
var url = require("url");
var fs = require('fs');
var jade = require('jade');
var querystring = require('querystring');

function start() {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;

        if (pathname === '/favicon.ico') {
            response.end();
        }
        
        //输出表单
        if (pathname === '/') {

            //fs.readFile(filename,[options],callback);
            
            fs.readFile(__dirname + '/form.jade', {encoding: 'utf-8'}, function(err, file){
                if (err) throw err;
                var fn = jade.compile(file);
                var html = fn({
                    user: '',
                    birthday: '',
                    phone: '',
                    desc: '',
                    sex: ''
                });
                response.writeHead(200, {'content-type': 'text/html'});
                response.end(html);
            });

        }

        //表单
        if (pathname === '/submit') {
            var post = '';
            request.on('data', function (chunk) {
                post += chunk;
            });

            request.on('end', function () {
                var info = '';
                post = querystring.parse(post);
                
                if(post.user.length === 0 || post.user.length > 5) {
                    info += '用户名长度不正确！';
                }
                if(!post.sex) {
                    info += '请选择性别';
                }
                fs.readFile(__dirname + '/form.jade', {encoding: 'utf-8'}, function(err, file){
                    if (err) throw err;
                    var fn = jade.compile(file);
                    var html = fn({
                        user: post.user,
                        birthday: post.birthday,
                        phone: post.phone,
                        desc: post.desc,
                        sex: post.sex,
                        info: info
                    });
                    console.log(post.sex);
                    response.writeHead(200, {'content-type': 'text/html'});
                    response.end(html);
                });
            });

        }
        

        
    }
    http.createServer(onRequest).listen(3000);
    console.log("Server has started.");
}

start();
