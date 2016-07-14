var path = require('path');
var fs = require('fs');
var exec = require('child_process').exec;
var sys = require('sys');
var express = require('express');
var ejs = require('ejs');
var browserify = require('browserify');
var less = require('less');

var port = process.env.PORT || 63214;
var app = express();

var handleHtml = {
    //@note ejs编译
    compileEjs: function(filePath) {
        var content = fs.readFileSync(filePath);
        return ejs.render(content.toString(), {
            filename: filePath
        });
    },

    //@note 解析文件
    parsePath: function(filePath) {
        try {
            return this.compileEjs(filePath);
        } catch (e) {
            return e.message;
        }
    },

    //@note 处理html请求
    do: function(fixPath) {
        var self = this;
        return function(req, res) {
            var filePath = __dirname + (fixPath || '') + req.path;
            fs.stat(filePath, function(err, stats) {
                if (err || !stats.isFile()) {
                    //@note 没有文件
                    res.end("page is not found");
                } else {
                    //@note 读取该文件
                    res.end(self.parsePath(filePath));
                }
            });
        }
    }
};

var handleJs = {
    showError: function(content) {
        return [
            "var div = document.createElement('div') ;",
            'div.innerHTML = "' + content.replace(/\\/g, '\/').replace(/\n/g, '<br/><br/>') + '";',
            "div.style.width = '14rem';div.style.backgroundColor = '#000' ;",
            "div.style.padding = '5px 5px 5px 15px' ; div.style.margin = '0 auto' ;",
            "div.style.left = '0' ;div.style.right = '0' ;",
            "div.style.position = 'fixed' ; div.style.borderRadius = '3px' ;",
            "div.style.boxShadow = '0 0 1rem rgba(0,0,0,.3)' ;div.style.top='5rem';",
            "div.style.fontSize = '.6rem' ;div.style.color = '#fff' ;div.style.zIndex = '999' ;",
            "div.style.wordBreak = 'break-word' ;",
            "document.querySelector('body').appendChild(div);"
        ].join('');
    },

    do: function() {
        var self = this;
        return function(req, res) {
            //@note 设置响应头类型 
            res.setHeader('Content-Type', 'text/javascript');

            var path = __dirname + req.path;

            //js文件不存在 404
            if (!fs.existsSync(path)) {
                var err = new Error('Not Found');
                err.status = 404;
                res.status(err.status || 500);
                res.end(err.message);
                return;
            }

            //启动debug模式
            var b = browserify({
                entries: path,
                debug: true
            }).bundle();

            b.on('error', function(err) {
                //@note 若解析出错 显示错误
                res.end(self.showError(err.toString()));
                this.emit('end');
            }).pipe(res);
        }
    }
};

var handleLess = {
    showError: function(e) {
        var spaces = '';
        var errorContent = e.filename + ' : ' + e.line + '\n\n';
        errorContent += '--------------------------' + '\n';
        errorContent += (e.extract[0] ? e.extract[0] : '') + '\n';
        errorContent += e.extract[1] + '\n';
        spaces += e.extract[1].match(/[\t]*/) && e.extract[1].match(/[\t]*/)[0];
        for (; e.column--;) spaces += ' ';
        errorContent += spaces + '^^' + '\n';
        errorContent += (e.extract[2] ? e.extract[2] : '') + '\n';
        errorContent += '--------------------------' + '\n\n';
        errorContent += 'message : ' + e.message;
        return errorContent;
    },
    do: function() {
        var self = this;
        return function(req, res) {
            //@note 设置响应头类型 
            res.setHeader('Content-Type', 'text/css');

            var path = __dirname + req.path;

            //less文件不存在 404
            if (!fs.existsSync(path)) {
                var err = new Error('Not Found');
                err.status = 404;
                res.status(err.status || 500);
                res.end(err.message);
                return;
            }

            var contentText = fs.readFileSync(path);
            less.render(contentText.toString(), {
                filename: path
            }, function(e, output) {
                if (e) {
                    res.end(self.showError(e));
                } else {
                    res.end(output.css);
                }
            });

        }
    }
};


//@note 访问html目录
app.use('/html', express.static('html'));

//@note 解析demo目录下html
app.get('/', function(req, res) {
    res.redirect('/index.html');
});
app.get('/*.html', handleHtml.do('/html/'));


//@note 解析src下的js
app.get('/src/*.js', handleJs.do());

//@note 解析src下的less
app.get('/src/*.less', handleLess.do());

// 其他访问 作为静态资源反馈
app.use(express.static(__dirname));

var server = app.listen(port, function() {
    console.log('hospital server listening on port ' + port);
});