## 简介
演示node爬虫
* crawler.js 封装的比较完好
* crawler1.js 尝试使用EventEmitter控制让图片一张一张的下载。

## 遇到的问题如下：
* 爬虫返回403，表示网站采用了防爬技术anti-web-crawling technique（Amazon所用），比较简单即会检查用户代理（User Agent）信息。再请求头部构造一个User Agent就行了。构造的url如下。
```
url: {
    hostname: 'www.mzitu.com',
    port: 80,
    path: '/share/comment-page-',
    agent: false,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36'
    }
}
```