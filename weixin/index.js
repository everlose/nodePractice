var express = require('express'),
    routes = require('./routes/routes'),
    http = require('http'),
    path = require('path'),
    fs = require('fs');
var template = require('art-template');
var signature = require('./signature');
var config = require('./config')();
console.log(config);


var app = express();
app.configure(function() {
    app.set('port', process.env.PORT || 1342);

    template.config('base', '');
    template.config('extname', '.html');
    app.engine('.html', template.__express);
    app.set('view engine', 'html');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));

    // user
    // 这是用来 在接口配置信息 中验证的; 仅仅使用 JS-SDK 不需要使用;
    // app.use(signature.checkSignature(config));
});

app.configure('development', function() {
    app.use(express.errorHandler());
});

routes(app);

http.createServer(app).listen(app.get('port'), function() {
    console.log("Express server listening on port " + app.get('port'));
});
