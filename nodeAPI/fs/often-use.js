var fs = require('fs'),
    path = require('path');

//1、读取文件readFile函数
//readFile(filename,[options],callback);
/**
 * 异步读取一个文件的全部内容
 * filename, 必选参数，文件名
 * [options],可选参数，可指定flag（文件操作选项，default为r只读，如r+ 读写；w+ 读写，文件不存在则创建）及encoding属性
 * callback 读取文件后的回调函数，参数默认第一个err（查找英文版node文档的Errors对象）, 第二个data 数据
 * 如果未指定编码方式，原生buffer就会被返回。
*/

// fs.readFile(__dirname + '/README.md', {flag:'r+', encoding:'utf-8'}, function(err, file){
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log(file);
// });

// 同步版本，还得自己手动写try和catch
// try {
//     console.log(fs.readFileSync(__dirname + '/README.md', {flag:'r+', encoding:'utf-8'}));
// } catch (err) {
//     console.log(err);
// }

//2. 写文件writeFile函数
//fs.writeFile(filename,data,[options],callback);
/**
 * 异步的将数据写入一个文件, 如果文件原先存在，会被替换。 data 可以是一个string，也可以是一个原生buffer。
 * filename, 必选参数，文件名
 * data, 写入的数据，可以字符或一个Buffer对象
 * [options],flag（default为'w'）,mode(权限,default为438), encoding(default为utf-8)
 * callback 读取文件后的回调函数，参数默认第一个err.
*/

// fs.writeFile(__dirname + '/README1.md', 'test', {flag:'w+', encoding:'utf-8'}, function(err){
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log('done!');
    
// });

//3. 以追加方式写文件
//fs.appendFile(filename, data, [options], callback)
/**
 * 异步的将数据添加到一个文件的尾部，如果文件不存在，会创建一个新的文件。 data 可以是一个string，也可以是原生buffer。
 * filename {String}
 * data {String | Buffer}
 * options {Object}
 * encoding {String | Null} default = 'utf8'
 * mode {Number} default = 438 (aka 0666 in Octal), mode详见http://www.111cn.net/sys/linux/59979.htm
 * flag {String} default = 'a'
 * callback {Function}
*/
// fs.appendFile(__dirname + '/README1.md', '使用fs.appendFile追加文件内容', {flags:'w+'},function (err) {
//     if (err) throw err;
//     console.log('追加内容完成');
// });

//4. 查看文件与目录的信息; 试试在命令行里输出stat -l；此api与之功能类似。
//fs.stat(path, callback);
//fs.fstat(fd, callback); fd为文件描述符
//fs.lstat(path, callback);

// fs.stat(__dirname + '/test.txt', function(err, stats){
//     if (err) throw err;
//     console.log(stats);
//     // 1.fs.stat()调用会将一个stats类的实例作为参数传递给它的回调函数，可以像下面这样使用stats实例：
//     // 2.stats.isFile() —— 如果是个标准文件，而不是目录，socket，符号链接或者设备，则返回true，否则false
//     // 3.stats.isDiretory() —— 如果是目录则返回tue，否则false
//     // 4.stats.isBlockDevice() —— 如果是块设备则返回true，在大多数UNIX系统中块设备通常都在/dev目录下
//     // 5.stats.isChracterDevice() —— 如果是字符设备返回true
//     // 6.stats.isSymbolickLink() —— 如果是文件链接返回true
//     // 7.stats.isFifo() —— 如果是个FIFO(UNIX命名管道的一个特殊类型)返回true
//     // 8.stats.isSocket() —— 如果是个UNIX socket（TODO：googe it）
// });

//5. 读取目录
//fs.readdir(path, callback)
/**
 * path, 要读取目录的完整路径及目录名；
 * [callback(err, files)], 读完目录回调函数；err错误对象，files数组，存放读取到的目录中的所有文件名
*/
// fs.readdir(__dirname + '/', function(err, files){
//     if (err) throw err;
//     files.forEach(function(file, index) {
//         var filePath = path.normalize(__dirname + '/' + file);
//         fs.stat(filePath, function(err, stat){
//             if (stat.isFile()) {
//                 console.log(filePath + ' is: ' + 'file');
//             } else if (stat.isDirectory()) {
//                 console.log(filePath + ' is: ' + 'dir');
//             }
//         });
//     });
// });

//6. 查看文件与目录的是否存在
// fs.exists(__dirname + '/README.md', function(exists){
//     console.log('exists:', exists);
// });


//7. 创建读取流
//fs.createReadStream(path, [options])
/**
 * path 文件路径
 * [options] flags:指定文件操作，默认'r',读操作；encoding,指定读取流编码；autoClose, 是否读取完成后自动关闭，默认true；start指定文件开始读取位置；end指定文件开始读结束位置
*/
/*
var rs = fs.createReadStream(__dirname + '/test.txt', {
    encoding: 'utf-8',
    autoClose: true
});
//open是ReadStream对象中表示文件打开时事件，
rs.on('open', function(fd) {
	console.log('开始读取文件');
});
//接收到数据的时候触发
rs.on('data', function (data) {
	console.log(data.toString());
});
//接收完成时触发
rs.on('end', function () {
	console.log('读取文件结束')
});
//文件关闭时触发
rs.on('close', function () {
	console.log('文件关闭');
});
//接收数据出错时触发
rs.on('error', function (err) {
	console.error(err);
});
*/

//暂停和回复文件读取；
/*
rs.on('open', function () {
	console.log('开始读取文件');
});
rs.pause();
rs.on('data', function (data) {
	console.log(data.toString());
});
setTimeout(function () {
	rs.resume();
}, 2000);
*/


//fs.createWriteStream(path, [options])
/*
 * path 文件路径
 * [options] flags:指定文件操作，默认'w',；encoding,指定读取流编码；start指定写入文件的位置
 */
/* ws.write(chunk, [encoding], [callback]);
 * chunk,  可以为Buffer对象或一个字符串，要写入的数据
 * [encoding],  编码
 * [callback],  写入后回调
 */
/* ws.end([chunk], [encoding], [callback]);
 * [chunk],  要写入的数据
 * [encoding],  编码
 * [callback],  写入后回调
 */
 
/* 简单的ws输出
var ws = fs.createWriteStream(__dirname + '/test.txt', {
    encoding: 'utf-8',
    start: 0
});
var buffer = new Buffer('没想到你是这种js');
ws.write(buffer, 'utf-8', function(err, buffer){
	if (err) throw err;
	console.log('写入完成，回调函数没有参数');
});
ws.end('see you!');
*/

/* 复制文件实例
var rs = fs.createReadStream(__dirname + '/test.txt', {
    encoding: 'utf-8'
});
var ws = fs.createWriteStream(__dirname + '/test1.txt', {
	flags: 'w+',
    encoding: 'utf-8',
    start: 0
});
rs.on('data', function (data) {
	ws.write(data);
});
ws.on('open', function(fd){
	console.log('要写入的数据文件已经打开，文件描述符是： ' + fd);
});
rs.on('end', function(){
	console.log('文件读取完成');
	ws.end('done！', function() {
		console.log('目标复制完成')
	});
});
*/






// 18、文件流

/*

 * 流，在应用程序中表示一组有序的、有起点有终点的字节数据的传输手段；

 * Node.js中实现了stream.Readable/stream.Writeable接口的对象进行流数据读写；以上接口都继承自EventEmitter类，因此在读/写流不同状态时，触发不同事件；

 * 关于流读取：Node.js不断将文件一小块内容读入缓冲区，再从缓冲区中读取内容；

 * 关于流写入：Node.js不断将流数据写入内在缓冲区，待缓冲区满后再将缓冲区写入到文件中；重复上面操作直到要写入内容写写完；

 * readFile、read、writeFile、write都是将整个文件放入内存而再操作，而则是文件一部分数据一部分数据操作；

 *

 * -----------------------流读取-------------------------------------

 * 读取数据对象：

 * fs.ReadStream 读取文件

 * http.IncomingMessage 客户端请求或服务器端响应

 * net.Socket    Socket端口对象

 * child.stdout  子进程标准输出

 * child.stdin   子进程标准入

 * process.stdin 用于创建进程标准输入流

 * Gzip、Deflate、DeflateRaw   数据压缩

 *

 * 触发事件：

 * readable  数据可读时

 * data      数据读取后

 * end       数据读取完成时

 * error     数据读取错误时

 * close     关闭流对象时

 *

 * 读取数据的对象操作方法：

 * read      读取数据方法

 * setEncoding   设置读取数据的编码

 * pause     通知对象众目停止触发data事件

 * resume    通知对象恢复触发data事件

 * pipe      设置数据通道，将读入流数据接入写入流；

 * unpipe    取消通道

 * unshift   当流数据绑定一个解析器时，此方法取消解析器

 *

 * ------------------------流写入-------------------------------------

 * 写数据对象：

 * fs.WriteStream           写入文件对象

 * http.clientRequest       写入HTTP客户端请求数据

 * http.ServerResponse      写入HTTP服务器端响应数据

 * net.Socket               读写TCP流或UNIX流，需要connection事件传递给用户

 * child.stdout             子进程标准输出

 * child.stdin              子进程标准入

 * Gzip、Deflate、DeflateRaw  数据压缩

 *

 * 写入数据触发事件：

 * drain            当write方法返回false时，表示缓存区中已经输出到目标对象中，可以继续写入数据到缓存区

 * finish           当end方法调用，全部数据写入完成

 * pipe             当用于读取数据的对象的pipe方法被调用时

 * unpipe           当unpipe方法被调用

 * error            当发生错误

 *

 * 写入数据方法：

 * write            用于写入数据

 * end              结束写入，之后再写入会报错；

 */

