var fs = require('fs'),
    path = require('path');

//截断文件内容 ftruncate, truncate
/*
    说白了就是把整个文件内容删除了，然后再加入new Buffer(len)的空数据，这个方法多数情况没什么用。
    fs.ftruncate(fd, len, callback)，fd为文件描述符（文件描述符是一个索引值，非负整数，指向内核为每一个进程所维护的该进程打开文件的记录表），len为截断长度
    fs.ftruncateSync(fd, len)
    fs.truncate(path, len, callback)，path为文件路径，len为截断长度
    fs.truncateSync(path, len)
*/

// fuck，ftruncate处理文件，输出的文件编码不对，不知怎么办，还是用下面的truncate吧。
// fs.open(__dirname + '/test.txt', 'w', function(err, fd) {
//     if (err) throw err;
//     console.log(fd);
//     fs.ftruncate(fd, 5, function(err){
//         if (err) throw err;
//         console.log('文本截断成功');
//     });
// });

// fs.truncate(__dirname + '/test.txt', 5, function(err){
//     if (err) throw err;
//     console.log('文本截断成功');
// });


//改变文件权限
/*
    更改文件所有权
    fs.chown(path, uid, gid)
    fs.chownSync(path, uid, gid)
    fs.fchown(fd, uid, gid, callback)
    fs.fchownSync(fd, uid, gid)
    fs.lchown(path, uid, gid, callback)
    fs.lchownSync(path, uid, gid)
*/

// 在控制台运行id，得到自己的uid和gid
// fs.chown(__dirname + '/test.txt', 501, 20, function(err){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("change done");
//     }
// });

//改写文件的读写权限。运行ls -l查看文件权限
// fs.chmod(path, mode, callback)
// fs.chmod(path, mode, callback)
// fs.chmodSync(path, mode)
// fs.fchmod(fd, mode, callback)，fd为文件描述符
// fs.fchmodSync(fd, mode)
// fs.lchmod(path, mode, callback)
// fs.lchmodSync(path, mode)，
/*
    path 文件路径
    mode 读写权限，是一个8进制数，默认为0666，即438
    callback 回调
*/
// fs.chmod(__dirname + '/test.txt', 0666, function (err) {
//     if (err) throw err;
//     console.log('权限更改成功');
// });

// 创建硬链
//fs.link(srcpath, dstpath, callback)
// fs.link(__dirname + '/test.txt', __dirname + '/test1.txt', function (err) {
//     if (err) throw err;
//     console.log('创建链接成功');
// });

// 删除目录，先建一个testdir的目录吧。
// fs.rmdir(__dirname + '/testdir', function(err){
//     if (err) throw err;
//     console.log('删除目录成功');
// })

// 创建目录
// fs.mkdir(__dirname + '/testdir', function(err){
//     if (err) throw err;
//     console.log('创建目录成功');
// })

// 监视文件
//对文件进行监视，并且在监视到文件被修改时执行处理
//fs.watchFile(filename, [options], listener);
/**
 * filename, 完整路径及文件名；
 * [options], persistent true表示持续监视，不退出程序；interval 单位毫秒，表示每隔多少毫秒监视一次文件
 * listener, 文件发生变化时回调，有两个参数：curr为一个fs.Stat对象，被修改后文件，prev,一个fs.Stat对象，表示修改前对象
*/
// fs.watchFile(__dirname + '/test.txt', {interval: 20}, function (curr, prev) {
//     if(Date.parse(prev.ctime) == 0) {
//         console.log('文件被创建!');
//     } else if(Date.parse(curr.ctime) == 0) {
//         console.log('文件被删除!')
//     } else if(Date.parse(curr.mtime) != Date.parse(prev.mtime)) {
//         console.log('文件有修改');
//     }
// });
// fs.watchFile(__dirname + '/test.txt', function (curr, prev) {
//     console.log('这是第二个watch,监视到文件有修改');
// });

// 取消监视文件
// fs.unwatchFile(filename, [listener]);
/**
 * filename, 完整路径及文件名；
 * [listener], 要取消的监听器事件，如果不指定，则取消所有监听处理事件
*/
// var listener = function (curr, prev) {
//     console.log('我是监视函数');
// }
// s.unwatchFile(__dirname + '/test.txt', listener);
