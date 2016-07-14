//乘法运算界面
var htutil = require('./htutil');
exports.get = function(req, res) {
	res.writeHead(200, {
		'Content-Type': 'text/html'
	});
	var a = isNaN(req.a) ? 0 : req.a,
		b = isNaN(req.b) ? 0 : req.b,
		result = a * b;
	res.end(
		htutil.page('mult',
			htutil.navbar(),
			'<p class="result">'+ a +' * ' + b + ' = ' + result + '</p>' + 
			'<p>Enter numbers to multiply</p>' + 
			'<form action="/mult" name="mult" method="get">' + 
			'A: <input type="text" name="a" /><br />' +
			'B: <input type="text" name="b" />' + 
			'<input type="submit" value="submit" />' + 
			'</form>')
	);
}

