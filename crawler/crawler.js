// 引入模块
var http = require('http');
var fs = require('fs');

var Crawler = function(options) {
    //计算图片数量
    this.num = 1;

    this.init.call(this, options);
    return this;
}

Crawler.prototype = {
    init: function(options) {
        this.baseUrl = options.baseUrl;
        this.url = options.url;

        this.dir = options.dir || '';
        this.reg = options.reg;
        this.total = options.total;
        this.page = options.from || 1;

    },
    start: function() {
        this.getPage();
    },
    // 获取html代码
    getPage: function() {
        var self = this,
            opt = this.url,
            data = null;
        if (self.page <= self.total) {
            opt.path = opt.path +  self.page;
            http.get(opt, function(res) {
                // 设置编码格式 （乱码.. 一堆Buffer）
                res.setEncoding("utf8"); 

                res.on('data', function(chunk) {
                    data += chunk;
                }).on('end', function() {
                    self.parseData(data);
                });
            });
        }
    },
    // 解析出需要的图片代码
    parseData: function(data) {
        var res = [],
            match;
        // 筛选出，获取图片的队列
        while ((match = this.reg.exec(data)) != null) {
            res.push(match[1]);
        }
        // 下载图片
        this.download(res);
    },
    // 下载图片
    download: function(resource) {
        var self = this,
            currentPage = self.page;

        resource.forEach(function(src, idx) {
            var imagename = src.substring(src.lastIndexOf('/') + 1),
                // fs.createWriteStream(path, [options])
                // 创建个名为xxxxx.jpg(根据imagename而定)的文件...
                writestream = fs.createWriteStream(self.dir + imagename); 

            http.get(src, function(res) {
                // pipe自动调用了data,end等事件
                res.pipe(writestream);

            });

            writestream.on('finish', function() {
                console.log('page: ' + currentPage + ' num: ' + self.num++ + ' download: ' + imagename);
            });
        });

        // 下一页
        self.page++;
        // 重新请求下一页
        self.getPage();
    }
};

//需要带上User-Agent参数这个网站才会处理我的请求，不然会出现403错误
var crawler = new Crawler({
    baseUrl: 'http://www.mzitu.com/share/comment-page-', //对应的网址
    url: {
        hostname: 'www.mzitu.com',
        port: 80,
        path: '/share/comment-page-',
        agent: false,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36'
        }
    },
    
    dir: './images/', //存放路径
    reg: /<img\s*src="(.*?)"\s*alt=".*"\s*\/>/g,  //这里 为什么没下载到小广告 , 因为正规图片<img src="。。。" alt="。。。"> 小广告<img alt="。。。" src="。。。">；
    total: 151, //页码上限
    from: 1  //从第几页开始
});

crawler.start();










