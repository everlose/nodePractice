## 概述
一个结构分层的node处理图片上传，抄自node入门篇里的结构

* /staticfile 静态文件所在，主要是jq和uploader插件。
* /tmp 图片存储文件夹。
* index.js 请求控制，控制某请求调用某方法进行的。
* requestHandlers.js 请求处理，逻辑最重的地方。
* router.js 请求的路由，控制请求接受来后调用哪个请求控制组的。
* server.js 应用启动入口。
