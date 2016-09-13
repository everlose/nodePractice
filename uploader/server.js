//服务器
var http = require("http");
var url = require("url");

function start(route, handle) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;

        if (pathname === '/favicon.ico') {
            response.end();
        }
        console.log("Request for " + pathname + " received.");

        route(handle, pathname, response, request);
    }
    http.createServer(onRequest).listen(8066);
    console.log("Server has started at port 8066 ");
}

exports.start = start;