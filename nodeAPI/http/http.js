var http = require('http');

//createServer返回了一个http.server对象，拥有listen方法
//此req为http.IncommingMessage的一个实例
//此res为http.serverResponse的一个实例
http
	.createServer(function(req, res){
		
		console.log(res.constructor);
		//写入请求头
		res.writeHead(200, {'Content-Type': 'text/plain'});

		//写入返回内容
		res.write('Hello nodejs');
		

		//结束本次响应
		res.end();
	})
	.listen(8888);

// 开起来后运行这条命令测试并发量：ab -n1000 -c10 http://localhost:8888/

