var http = require('http');
var url = 'http://www.meizitu.com/a/5318.html';
var reg = /<img\s*src="(.*?)"\s*>/g;

http.get(url, function(response) {
    var html = '';
    console.log(response.constructor);
    response.on('data', function(data) {
        html += data;
    });
    response.on('end', function() {
        console.log(html.match(reg));
    });
}).on('error', function() {
    console.log('网络繁忙');
});