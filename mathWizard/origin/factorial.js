//阶乘界面
var htutil = require('./htutil');
var math = require('./math');

exports.get = function(req, res) {
	res.writeHead(200, {
		'Content-Type': 'text/html'
	});
	var a = isNaN(req.a) ? 0 : req.a;
	res.end(
		htutil.page('Factorial',
			htutil.navbar(),
			'<p class="result">'+ a +' factory = ' + math.factorial(Math.floor(a)) + '</p>' + 
			'<p>Enter numbers to multiply</p>' + 
			'<form action="/factorial" name="factorial" method="get">' + 
			'A: <input type="text" name="a" /><br />' +
			'<input type="submit" value="submit" />' + 
			'</form>')
	);
}