//入口文件
var http_port = 8124;

var http = require('http');
var htutil = require('./htutil');

//路由请求
var server = http.createServer(function (req, res) {
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

server.listen(http_port);
console.log('listening to http://localhost:8124');