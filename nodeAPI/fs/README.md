## 概述
在这里我把fs的api拆分成了两类，常用的和不常用的。不常用的一般都是由于此函数和linux上文件操作相关的命令相似，不是很需要在代码里做这样的设置。

常用的包括：
* 读取文件readFile函数
* 写文件writeFile函数
* 以追加方式写文件appendFile函数
* 查看文件与目录的信息; 试试在命令行里输出stat -l；此api与之功能类似。fs.stat(path, callback);
* 读取目录readdir
* 查看文件与目录的是否存在exists
* 创建读取流(包括一个复制文件的实例)
* 文件流操作详解

不常用的包括：
* 截断文件内容ftruncate
* 改变文件权限chown
* 创建硬链link
* 删除目录rmdir
* 创建目录mkdir
* 监视文件watchFile
* 取消监视unwatchFile


## 参考资料
> [node api](http://nodeapi.ucdok.com/#/api/fs.html)
[node Errors api](http://nodejs.cn/api/errors.html#errors_error_errno)
[Node.js学习笔记4【核心模块--fs】](http://blog.csdn.net/pigpigpig4587/article/details/38017779)
[Node.js文件系统、路径的操作函数](http://www.cnblogs.com/gaojun/p/4159488.html)
[[译] NodeJS 错误处理最佳实践](http://cnodejs.org/topic/55714dfac4e7fbea6e9a2e5d)
[文件读写权限简介，也可以看鸟哥的linux那本](http://www.111cn.net/sys/linux/59979.htm)
