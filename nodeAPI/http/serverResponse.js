/**
 * Created by Administrator on 14-5-5.
 */
 
var http = require('http');
 
// createServer返回了一个http.server对象，拥有listen方法
// 此req为http.IncommingMessage（实现了 Readable Stream 接口以及其他额外的事件，方法和属性。）的一个实例
// 此res为http.serverResponse（实现Writable Stream 接口，也是一个包含若干事件的EventEmitter）的一个实例

var server = http.createServer(function(req,res){
 
    /**
     * 源API：Event: 'close'
     * 说明：在底层连接终止之前先调用response.end或清空缓冲区
      */
    res.on('close',function(){});
 
    /**
     * 源API：Event: 'finish'
     * 当response被发送时触发，更具体的说，当回应的头和体已经被递交给了操作系统时该事件被触发，它并不意味着客户端收到了什么。
     * 此事件触发后，将不再触发response对象
     */
    res.on('finish',function(){});
 
    /**
     * response.writeHead(statusCode, [reasonPhrase], [headers])
     * 说明：发送一个响应头，状态为三个数字的HTTP状态码，比如404，最后参数，headers是一个响应头，中间那个参数可选
     *       在res.write()和res.end()之前被调用，在使用’Content-Length时应该注意，字符串的长度计算是以英文字符来计算，如果包含其他字符请用Buffer.byteLength()
     * @param {Number} statusCode 状态码
     * @param {Object} reasonPhrase [未知]
     * @param {Object} headers 头内容
     */
    res.writeHead(200,{'Content-Type':'text/plain'})
 
    /**
     * 说明：为上面writeHead拆开的单独设置写法
     * @type {number}
     */
    res.statusCode = 404;
 
    /**
     * 源API:response.setHeader(name, value)
     * 说明：单独发送一个隐式头的值，如果存在会被替换，可以使用数组方式设置多个头的键对值。
     * res.setHeader('Set-Cookie':['key1=value1','key2=value2']);
     * @param {String} name 键
     * @param {String} value 值
     */
    res.setHeader('Content-Type','text/plain');
 
    /**
     * 源API：response.getHeader(name)
     * 说明：从已有的头队列读取一个头而不是发送给客户端，不区分大小写
     * @type {*}
     */
    var contentType = res.getHeader('Content-Type');
 
    /**
     * 源API：response.removeHeader(name)
     * 说明：
     */
    res.removeHeader("Content-Encoding");
 
    /**
     * 源API：response.writeContinue()
     * 说明：发送一个http/1.1 100 continue消息到客户端，表明请求的内容已经被发送完毕。
     */
    res.writeContinue();
 
    //response.headersSent 只读，布尔值，检查头消息是否已经发出，成功发出为true，否则为false
    console.log(response.headersSent);
    /**
     * 为true时，如果不存在在header中，日期头在响应时将自动生成并发送，默认值为true
     * 建议在测试时禁用
     * @type {boolean}
     */
    response.sendDate = false;
 
    /**
     * 源API：response.setTimeout(msecs, callback)
     * 说明：设置socket超时时间，如果提供了callback，响应对象会监听timeout事件。
     * @param {Number} msesc 毫秒
     * @param {Function} callback 回调函数
     */
    res.setTimeout(1000,function(){})
 
    /**
     * 源API：response.write(chunk, [encoding])
     * 说明：想客户端输出的内容，chunk问对象或者字符串，为字符串时可以设置编码方式
     */
    res.write(chunk, [encoding]);
 
    /**
     * 源API：response.addTrailers(headers)
     * 说明：如下所示，在尾部追加trailer 然后再使用addTrailers添加内容
     */
    res.writeHead(200, { 'Content-Type': 'text/plain','Trailer': 'Content-MD5' });
    res.write('data');
    res.addTrailers({'Content-MD5': "7895bf4b8828b55ceaf47747b4bca667"});
 
    /**
     * 源API：response.end([data], [encoding])
     * 说明：
     * @param {String} data 内容为字符串
     * @param {String} encoding 编码方式
     */
    res.end('data');
 
    res.send();
})
