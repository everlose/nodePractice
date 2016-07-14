querystring，提供一些字符串处理，如url编码，序列化成对象。
API地址详见：http://nodeapi.ucdok.com/#/api/url.html。

## Query String API
* querystring.stringify(obj, [sep], [eq])
* querystring.parse(str, [sep], [eq], [options])
* querystring.escape
* querystring.unescape

### querystring.stringify(obj, [sep], [eq])，序列化一个对象到一个 query string。可以选择是否覆盖默认的分割符（'&'）和分配符（'='）。
在命令行node里输入querystring.stringify({'name':'ctt', 'skill':['html', 'css', 'js']});
```javascript
'name=ctt&skill=html&skill=css&skill=js'
```

其中，第二个参数填一个字符串，用于覆盖&分隔符；
第三个参数填一个字符串，用于覆盖＝分隔符；

### querystring.parse，反序列化字符串为一个对象，可以选择是否覆盖默认的分割符（'&'）和分配符（'='）。
options对象可能包含maxKeys属性(默认为1000),它可以用来限制处理过的键(key)的数量.设为0可以去除键(key)的数量限制.
在命令行node里输入querystring.parse('name=ctt&skill=html&skill=css&skill=js')
自然会解析成上面的对象。至于其他参数自己试验吧

### querystring.escape，参数编码转义
例如 querystring.escape('中国');
得到：'%E4%B8%AD%E5%9B%BD'