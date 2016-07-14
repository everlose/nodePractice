## 先期准备
* 安装mongodb，运行`brew install mongodb`。
* 安装可视化mongodb操作界面，这里选择Robomongo。
* 打开mongodb服务，运行`mongod —config /usr/local/etc/mongod.conf`.
* 新建数据库immoc，新建表movies。
* 本地搭建同样需要bower install。

## 目录简介
* /models 控制层
* /public 静态资源目录
* /routes 路由处理
* /schemas 数据库持久层
* /views 视图层
	* includes 共用头部等页面
	* pages 逻辑页面
* app.js 主逻辑入口

## 项目启动
* sudo app.js后访问localhost:3000即可
