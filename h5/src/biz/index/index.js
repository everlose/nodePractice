var parseUrl = require('../../common/parseUrl/parseUrl.js');

var consoleFn = function () {
	var urlparam = parseUrl(window.location.href);
	$('body').append('the url = ' + urlparam.protocol);
}

$(function(){
	consoleFn();
});