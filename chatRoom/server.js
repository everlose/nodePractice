var http = require("http");
var url = require("url");
var fs = require('fs');
var io = require('socket.io');

function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    if (pathname === '/' || pathname === '/client.html') {
        fs.readFile(__dirname + '/client.html', function(err, file){
            if (err) throw err;
            response.write(file, 'binary');
            response.end();
        });
    } else {
        fs.readFile(__dirname + pathname, 'binary', function(err, file){
            if (err && err.code === 'ENOENT') {
                response.writeHead(404, {'Content-Type': 'text/plain'});
                response.write(err + "\n");
                response.end();
            } else if (err) {
                response.writeHead(500, {'Content-Type': 'text/plain'});
                response.write(err + "\n");
                response.end();
            } else {
                var type = pathname.slice(pathname.lastIndexOf('.') + 1);
                switch (type) {
                    case 'css':
                        response.writeHead(200, {'Content-Type': 'text/css'});
                        break;
                    case 'js':
                        response.writeHead(200, {'Content-Type': 'text/javascript'});
                        break;
                    case 'png':
                        response.writeHead(200, {'Content-Type': 'image/png'});
                        break;
                    case 'jpg':
                        response.writeHead(200, {'Content-Type': 'image/jpeg'});
                        break;
                    case 'svg':
                        response.writeHead(200, {'Content-Type': 'text/xml'});
                        break;
                    default:
                        break;
                }
                response.write(file, 'binary');
                response.end();
            }
        });
    }
    
}
var port = process.argv[2] || 9537;
var server = http.createServer(onRequest).listen(port);
console.log("Server has started at port " + port);
    
var ws = io.listen(server);

// 检查昵称是否重复
var checkNickname = function(name){
    for(var k in ws.sockets.sockets){
        if(ws.sockets.sockets.hasOwnProperty(k)){
            if(ws.sockets.sockets[k] && ws.sockets.sockets[k].nickname == name){
                return true;
            }
        }
    }
    return false;
}
// 获取所有的昵称数组
var getAllNickname = function(){
    var result = [];
    for(var k in ws.sockets.sockets){
        if(ws.sockets.sockets.hasOwnProperty(k)){
            result.push({
                name: ws.sockets.sockets[k].nickname
            });
        }
    }
    return result;
}
ws.on('connection', function(client){
    console.log('\033[96msomeone is connect\033[39m \n');
    client.on('join', function(msg){
        // 检查是否有重复
        if(checkNickname(msg)){
            client.emit('nickname', '昵称有重复!');
        }else{
            client.nickname = msg;
            ws.sockets.emit('announcement', '系统', msg + ' 加入了聊天室!', {type:'join', name:getAllNickname()});
        }
    });
    // 监听发送消息
    client.on('send.message', function(msg){
        client.broadcast.emit('send.message',client.nickname,  msg);
    });

    client.on('disconnect', function(){
        if(client.nickname){
            client.broadcast.emit('send.message','系统',  client.nickname + '离开聊天室!', {type:'disconnect', name:client.nickname});
        }
    })

})

