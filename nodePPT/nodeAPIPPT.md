title: ppt演示
speaker: 陈子云
url: https://github.com/ksky521/nodePPT
transition: cards
files: /js/demo.js,/css/demo.css

[slide]

# nodeAPIPPT演示  
## 演讲者：陈子云

[slide]
# 这节内容主要包括以下三个api。
* url {:&.moveIn}
* querystring
* http

[slide]
# url
## 这是一个解析url地址的好帮手。[api地址戳这里](http://nodeapi.ucdok.com/#/api/url.html)
* url.parse(urlStr, [parseQueryString], [slashesDenoteHost]) 把url字符串解析为对象 {:&.moveIn}
	* 第一个参数为url字符串 {:&.moveIn}
	* 第二个参数为true的话，返回的query将以对象的形式展示
	* 第三个参数则是解析缺省协议的这样的路径
* url.format(urlObj)，输入一个 URL 对象，返回格式化后的 URL 字符串。
* url.resolve(from, to)，拼接给定的基础URL路径和其他url路径，合成一个新的路径。

[slide]
# querystring
## 这是一个解析参数的好帮手。[api地址戳这里](http://nodeapi.ucdok.com/#/api/url.html)
* querystring.stringify(obj, [sep], [eq]) {:&.moveIn}
	* querystring.stringify({'name':'ctt', 'skill':['html', 'css', 'js']});
* querystring.parse(str, [sep], [eq], [options])
* querystring.escape，转义
	* querystring.escape('中国');
* querystring.unescape

[slide]
# http
## 用途：收发http请求的时候，需要此模块。
## 想知道的包括：
[api地址戳这里](http://nodeapi.ucdok.com/#/api/http.html)

* 如何接受并处理一个http请求 {:&.moveIn}
* 如何发送一个http请求
* api中各种类那么混乱，要怎么解读才好
* 实例演示

[slide]
# 爬虫演示
http.get

[slide]
thanks！