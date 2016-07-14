/**
 * Created by Antianlu on 14-5-6.
 * http.serverRequest 源为http.IncomingMessage，是客服端浏览器请求详细内容
 */
var http = require('http');
 
var server = http.createServer(function(req,res){
    /**
     * 源API：Event: 'close'
     * 说明：每次请求执行一次，触发它说明底层连接已关闭，与res.end()差不多效果
     */
    req.on('close',function(){});
 
    /**
     * 源API：message.httpVersion
     * 说明：这种其概况属于HTTP服务请求，客服端向服务端发送的http版本。可能的版本号是1.0或1.1
     */
    console.log(req.httpVersion);
 
    /**
     * 源API：message.headers
     * 说明：
     * { host: 'localhost:3000',
         connection: 'keep-alive',
         'cache-control': 'max-age=0',
         accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*\/*;q=0.8',
         'user-agent': 'Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1700.76 Safari/537.36',
        'accept-encoding': 'gzip,deflate,sdch',
        'accept-language': 'zh-CN,zh;q=0.8,en;q=0.6,de;q=0.4' }
     */
    console.log(req.headers);
 
    /**
     * 源API：message.trailers
     * 说明：只是request和response的追加对象,加在end事件之后
     */
    console.log(req.trainers);
 
    /**
     * 源API：message.setTimeout(msecs, callback)
     * 说明：调用 message.connection.setTimeout(msecs, callback).
     * @param {Number} msecs 超时时间
     * @param {Function} callback 回调函数
     */
    //req.setTimeout(1000,function(){});
 
    /**
     * 源API：message.method
     * 说明：从http.server获得唯一有效的请求，这个请求方法是一个只读字符串，比如‘GET','POST','DELETE'等
     */
    console.log(req.method);
 
    /**
     * 源API：message.url
     * 说明：从http.server获得唯一有效的请求，请求的url是一个字符串，包含了目前实际的url请求
     * 如果请求是：GET /status?name=ryan HTTP/1.1\r\n
                   Accept: text/plain\r\n
                   \r\n
     *
     * 则req.url 为 '/status?name=ryan'
     * 如果你想解析url为对象使用require('url').parse(req.url),输出为：
     * { href: '/status?name=ryan',
         search: '?name=ryan',
         query: 'name=ryan',
         pathname: '/status' }
     * 如果想把query也解析了，有两种方法：1.require('url').parse(req.url，true),2.require('querystring').parse(queryString)
     * 此后的query:'name=ryan' => query:{name:ryan}
     */
    console.log(req.url);
 
    /**
     * 源API：message.statusCode
     * 说明：状态码，为404等
     */
    console.log(req.statusCode);
 
    /**
     * 源API：message.socket
     * 说明：与net.socket相关联的连接对象
     * 为HTTPS支持，使用request.connection.verifyPeer()和request.connection.getPeerCertificate()获得客户端的身份验证详情
     */
    console.log(req.socket);
 
    // 结束测试请求，关闭连接
    res.end('test');
}).listen(3000);