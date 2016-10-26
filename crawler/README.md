## 简介

node爬虫相关文件夹

## 爬虫测试

crawler-test.js，演示一个最基本的服务端request请求发送，伪造了user-agent，并且使用了代理ip。

## 演示node爬虫

### crawler-mzt.js

批量爬取妹子图网的图片，封装的比较完好，把爬来的图片放进/images目录下。

### crawler-mzt-one-by-one.js

尝试使用EventEmitter控制让妹子图的图片一张一张的被爬取，爬来的图片放在/images目录下。

## crawler-torrent.js 爬取种子

资源的番号通常可以代表一个口味系列，比方说SMD系列的资源比较轻口味的，并且无码，其番号通常是SMD-xx。 其他的系列如IPZ、STAR、ABP则为有码，女性向的资源可以搜索SIKL系列。

举例爬取ABP系列种子，需要在/welfare目录下找到count文件，添加一行（如果已经有这一行，那么可以直接修改ABP:后面的数字）

```
ABP:478
```

上面文本代表从ABP系列的478号影片资源开始爬虫抓去，注意格式不要有空格，每个番号系列都为独立的1行。

启动时运行

```bash
node crawler-torrent.js ABP
```

爬取完的结果放入/welfare/ABP.txt中，/welfare/count文件里的ABP系列后面的序列参数+1。

搜索序列为番号前缀加上该数值，如SMD45，但例外的目前已知：

* SKYHD搜索前缀为SKY0，整合起来就是SKYHD0XX。

需要带特殊搜索前缀的，去crawler-torrent.js修改config配置里的配置，例如下面。

```javascript
searchSerie: 'SKYHD0', //搜索的时候的参数前缀

torrentSerie: 'SKYHD', //种子的系列，也是存储的文件名
```

## 反爬虫

爬虫返回403，表示网站采用了防爬技术anti-web-crawling，反爬虫一般会采用比较简单即会检查用户代理（User Agent）信息。再请求头部构造一个User Agent就行了。也可能会检测Referer请求头，还有cookie等。高级的反爬虫会统计一个ip在一小时内请求量是否超过限制，达到则封锁ip，这样的方案就需要加上代理，test.js演示了一个连代理的最基本例子，而具体的寻找代理的设置看[这篇文章](http://kaito-kidd.com/2015/11/02/proxies-service/)

```javascript
var http = require('http');

var url = {
    hostname: '122.228.179.178', //代理设置
    path: 'http://www.163.com',
    agent: false,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36'
    }
};

http.get(url, function(res) {
    var data = '';
    res.setEncoding("utf8"); 

    res.on('data', function(chunk) {
        data += chunk;
    }).on('end', function() {

        console.log(data)
    });
});
```