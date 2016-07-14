//平方运算界面
var htutil = require('./htutil');
exports.get = function(req, res) {
	res.writeHead(200, {
		'Content-Type': 'text/html'
	});
	var a = isNaN(req.a) ? 0 : req.a;
	res.end(
		htutil.page('Square',
			htutil.navbar(),
			'<p class="result">'+ a +' ^2  = ' + (a * a) + '</p>' + 
			'<p>Enter numbers to multiply</p>' + 
			'<form action="/square" name="square" method="get">' + 
			'A: <input type="text" name="a" /><br />' +
			'<input type="submit" value="submit" />' + 
			'</form>')
	);
}