var http = require('http'),
    fs = require('fs'),
    jade = require('jade'),
    url = require('url'),
    querystring = require('querystring');

http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;

    if(pathname === '/') {
        response.writeHead(200, {"Content-Type": "text/html"});
        fs.readFile('form.jade', 'utf-8', function (err, file) {
            var fn = jade.compile(file);
            var html = fn({
                user: '',
                birthday: '',
                phone: '',
                desc: ''
            });
            response.end(html);
        });
    } 
    else if (pathname === '/post') {
        var post = '';
        response.writeHead(200, {"Content-Type": "text/html"});
        request.on('data', function (chunk) {
            post += chunk;
        });

        request.on('end', function () {
            var info = '',
                check = '';
            post = querystring.parse(post);

            if(post.user.length === 0 || post.user.length > 5) {
                info += '用户名长度不正确！';
            }

            if(!post.sex) {
                info += '请输入性别!';
            }


            fs.readFile('form.jade', 'utf-8', function (err, file) {
                var fn = jade.compile(file);
                var html = fn({
                    user: post.user,
                    birthday: post.birthday,
                    phone: post.phone,
                    desc: post.desc,
                    check: post.sex,
                    info: info
                });

                response.end(html);
            });
        });
    } 
}).listen(3000);