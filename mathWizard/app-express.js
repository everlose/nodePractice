//入口文件,使用express框架实现

var http_port = 8124;
var htutil = require('./htutil');
var math = require('./math');
var express = require('express');
var ejs = require('ejs');
var app = express();

app.set('port', http_port);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

//路由请求
app.get('/', function(req, res) {
	res.render('./views/layout.html', {title: 'Math Wizard'});
});

app.get('/mult', htutil.loadParams, function(req, res) {
	req.result = 0;
	if(req.a && req.b) req.result = req.a * req.b;
	res.render('mult.html', {
		title: 'Math Wizard',
		req: req
	});
});

app.get('/square', htutil.loadParams, function(req, res) {
	if(req.a) req.result = req.a * req.a;
	res.render('square.html', {
		title: 'Math Wizard',
		req: req
	});
});

app.get('/fibonacci', htutil.loadParams, function(req, res) {
	if(req.a) {
		req.result = math.fibonacci(Math.floor(req.a));
		res.render('fibo.html', {
			title: 'Math Wizard',
			req: req
		});
	} else {
		res.render('fibo.html', {
			title: 'Math Wizard',
			req: req
		})
	}
	
});

app.get('/factorial', htutil.loadParams, function(req, res) {
	if(req.a) req.result = math.factorial(req.a);
	res.render('factorial.html', {
		title: 'Math Wizard',
		req: req
	});
});

app.get('/404', function(req, res){
	res.send('NOT FOUND ' + req.url);
});

app.listen(http_port);

/*var server = http.createServer(function (req, res) {
	htutil.loadParams(req, res, undefined);
	if(req.requrl.pathname === '/') {
		require('./home').get(req, res);
	} else if (req.requrl.pathname === '/square') {
		require('./square').get(req, res);
	} else if (req.requrl.pathname === '/factorial') {
		require('./factorial').get(req, res);
	} else if (req.requrl.pathname === '/fibonacci') {
		require('./fibo').get(req, res);
	} else if (req.requrl.pathname === '/mult') {
		require('./mult').get(req, res);
	} else {
		res.writeHead(404, {'Content-Type': 'text/plain'});
		res.end('bad url' + req.url);
	}
});

server.listen(http_port);*/
console.log('listening to http://localhost:8124');