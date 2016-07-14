url，解析url地址的好帮手。
API地址详见：http://nodeapi.ucdok.com/#/api/url.html。

## URL API
* url.parse(urlStr, [parseQueryString], [slashesDenoteHost])
* url.format(urlObj)
* url.resolve(from, to)

### url.parse，输入 URL 字符串，返回一个对象。
在命令行node里输入url.parse('http://test.com:8080/path1/path2?query1=string1&querty2=string2#hash')
```javascript
{ 
	protocol: 'http:',
	slashes: true,
	auth: null,
	host: 'test.com:8080',
	port: '8080',
	hostname: 'test.com',
	hash: '#hash',
	search: '?query1=string1&querty2=string2',
	query: { query1: 'string1', querty2: 'string2' },
	pathname: '/path1/path2',
	path: '/path1/path2?query1=string1&querty2=string2',
	href: 'http://test.com:8080/path1/path2?query1=string1&querty2=string2#hash' 
}
```
参数具体释义见api，slashes是指是否有协议后的双斜线。
其中，url.parse的第二个参数如果填了true，那么返回的query将会以对象的形式展示；第三个参数则是解析缺省协议的这样的路径//foo/bar

### url.format，输入一个 URL 对象，返回格式化后的 URL 字符串。
在命令行node里输入
```javascript
url.format({protocol: 'http:',
slashes: true,
auth: null,
host: 'test.com:8080',
port: '8080',
hostname: 'test.com',
hash: '#hash',
search: '?query1=string1&querty2=string2',
query: { query1: 'string1', querty2: 'string2' },
pathname: '/path1/path2',
path: '/path1/path2?query1=string1&querty2=string2',
href: 'http://test.com:8080/path1/path2?query1=string1&querty2=string2#hash' });
```
就会得到一串拼接好的url：'http://test.com:8080/path1/path2?query1=string1&querty2=string2#hash'。

### url.resolve，给定一个基础URL路径，和一个href URL路径，并且象浏览器那样处理他们可以带上锚点。 例子：
```
url.resolve('/one/two/three', 'four')         // '/one/two/four'
url.resolve('http://example.com/', '/one')    // 'http://example.com/one'
url.resolve('http://example.com/one', '/two') // 'http://example.com/two'
```