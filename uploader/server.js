//服务器
var http = require("http");
var url = require("url");

function start(route, handle) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;

        if (pathname === '/favicon.ico') {
            return;
        }
        console.log("Request for " + pathname + " received.");

        route(handle, pathname, response, request);
    }
    http.createServer(onRequest).listen(3000);
    console.log("Server has started.");
}

exports.start = start;