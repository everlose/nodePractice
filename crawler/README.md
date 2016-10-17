## 简介

node爬虫相关文件夹

## 爬虫测试

test.js，演示一个最基本的服务端request请求发送。

## 演示node爬虫

* crawler-mzt.js 批量爬取妹子图网的图片，封装的比较完好
* crawler-mzt-one-by-one.js 尝试使用EventEmitter控制让图片一张一张的爬取。

## crawler-torrent

爬取种子的脚本，爬取完的结果放入./welfare文件夹的对应番号系列txt文件中，同时其目录下的count文件里的该番号系列后面的序列参数+1.

需要制定序列的话，去./welfare/count文件里找到添加或者修改所需要的番号系列的参数。

需要更改番号话，去./welfare/count文件里找到添加或者修改所需要的番号系列的参数，并且去crawler-torrent.js修改config配置里的配置，例如下面。

```javascript
searchSerie: 'SKYHD0', //搜索的时候的参数前缀

torrentSerie: 'SKYHD', //种子的系列，也是存储的文件名
```

搜索序列为番号前缀加上该数值，如SMD45，但例外的目前已知：

* SKYHD搜索前缀为SKY0，整合起来就是SKYHD0XX。

## 反爬虫

爬虫返回403，表示网站采用了防爬技术anti-web-crawling，反爬虫一般会采用比较简单即会检查用户代理（User Agent）信息。再请求头部构造一个User Agent就行了。也可能会检测Referer请求头，还有cookie等。高级的反爬虫会统计一个ip在一小时内请求量是否超过限制，达到则封锁ip，这样的方案就需要加上代理，test.js演示了一个连代理的最基本例子，而具体的寻找代理的设置看[这篇文章](http://kaito-kidd.com/2015/11/02/proxies-service/)

```
url: {
	hostname: '122.228.179.178', //代理设置
    path: 'http://www.163.com',
    agent: false,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36'
    }
}
```