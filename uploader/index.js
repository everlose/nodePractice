var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/upload1"] = requestHandlers.upload1;
handle["/upload2"] = requestHandlers.upload2;
handle["/staticfile"] = requestHandlers.staticfile;

server.start(router.route, handle);