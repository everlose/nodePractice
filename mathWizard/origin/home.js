//主页
var htutil = require('./htutil');
exports.get = function(req, res) {
	res.writeHead(200, {
		'Content-Type': 'text/html'
	});
	res.end(
		htutil.page('Math Wizard',
			htutil.navbar(),
			'<p>Math Wizard</p>')
	);
}