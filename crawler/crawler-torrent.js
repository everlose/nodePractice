var http = require('http');
var fs = require('fs');
var cheerio = require('cheerio');
var EventEmitter = require('events').EventEmitter; 
var event = new EventEmitter(); 

//取文件
var getFile = function (path) {
    return new Promise(function (resolve, reject) {
        fs.readFile(path, {flag:'r+', encoding:'utf-8'}, function (err, file) {
            if (err) {
                reject('read ' + path + ' failed');
            } else {
                resolve(file);
            }
            
        });
    });
};
//写文件
var writeFile = function (path, content) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(path, content, {flag:'w+', encoding:'utf-8'}, function (err) {
            if (err) {
                reject('write ' + path + ' failed');
            } else {
                resolve('write ' + path + ' success');
            }
            
        });
    });
};
//追加文件
var appendFile = function (path, content) {
    return new Promise(function (resolve, reject) {
        fs.appendFile(path, content, {flag:'a'}, function (err) {
            if (err) {
                reject('append ' + path + ' failed');
            } else {
                resolve('append ' + path + ' success');
            }
        });
    });
};

//第二个请求，请求具体的某个资源
var getMagnet = function (url) {
    return new Promise(function (resolve, reject) {
        http.get(url, function(response) {
            var html = '';
            response.on('data', function(data) {
                html += data;
            });
            response.on('end', function() {
                var magnet = html.match(/magnet:\??[^"|<]+/);
                if (magnet) {
                    resolve(html);
                } else {
                    reject('can not match magnetReg');
                }
                
            });
        }).on('error', function (res) {
            reject(res);
        });
    });
};

//第一个请求，请求资源列表
var getResourceUrl = function (url) {
    return new Promise(function (resolve, reject) {
        http.get(url, function(response) {
            var html = '';
            response.on('data', function(data) {
                html += data;
            });
            response.on('end', function() {
                var ul = html.match(/<ul class="media-list media-list-set">[\s\S]*<\/ul>/);
                if (ul) {
                    resolve(ul[0]);
                } else {
                    reject('can not match ul dom');
                }
                
            });
        }).on('error', function() {
            reject('getResourceUrl failed');
        });
    });
};

//开始函数
var start = function () {
    //初始化重新设置searchId
    var searchId = 1;
    var torrentId = '1';

    getFile(config.countPath)
    .then(function (countFile) {
        var reg = new RegExp('(?:' + config.torrentSerie + ':)\\d+');
        if (countFile.match(reg)) {
            var match = countFile.match(reg)[0];
            searchId = match.slice(match.lastIndexOf(':') + 1);
            torrentId = searchId;
            var url = config.path + config.searchSerie + 
                torrentId + '_ctime_1.html';
            console.log('list url: ', url);
            var opt = {
                hostname: config.origin,
                path: config.path + config.searchSerie + torrentId + '_ctime_1.html',
                agent: false,
                headers: config.headers
            };
            return getResourceUrl(url);
        } else {
            return Promise.reject('can not parse count file correct');
        }
        
    }, function (res) {
        console.log(res);
        return res;
    })
    .then(function (html) {
        var reqArr = [];
        var $ = cheerio.load(html);
        var $body = $('.media-body');
        $body.each(function (i, elem) {
            if (reqArr.length === 3) {
                return false;
            }
            var $elem = $(elem);
            var size = $elem.find('.label.label-warning').text();
            //小于4G则允许去获取
            if (size && size.indexOf('GB') > -1 && parseInt(size) < 4 ||
                size && size.indexOf('MB') > -1 && parseInt(size) > 700 && parseInt(size) < 4000) {
                var href = $elem.find('.title').attr('href');
                console.log('detail url: ' + href);
                reqArr.push(getMagnet({
                    hostname: config.origin,
                    path: href,
                    headers: config.headers
                }));
            }
        });
        if (reqArr.length > 0) {
            return Promise.all(reqArr);
        } else {
            //当第二次请求正常或者第一次请求没有匹配到合适的资源，计数+1。
            event.emit('parse_done', null, searchId);
            console.log('can not match suitable resource');
        }
    }, function (res) {
        return res;
    })
    .then(function (resArr) {
        console.log('torrent search done!');
        var res = [];
        resArr.forEach(function (v, k) {
            var $ = cheerio.load(v);
            var name = $('.row-fluid.tor-title h2').text();
            var magnet = $('#magnetLink').val();
            var size = $('.tor-detail').html().match(/\d+(\.\d{1,2})?(MB|GB)/)[0];
            var haspic = $('.tor-info').html().match(/(png|jpg)/) ? true : false;
            res.push({
                name: name,
                magnet: magnet,
                size: size,
                haspic: haspic
            });
        });

        if (res.length > 0) {
            console.log(res);
            // 事件驱动：发出图片地址解析完成的事件parse_done
            event.emit('parse_done', res, searchId);
        } else {
            console.log('can not match suitable magnetReg');
            //当第二次请求正常或者第一次请求没有匹配到合适的资源，计数+1。
            event.emit('parse_done', null, searchId);
        }
    }, function (res) {
        console.log(res);
        start();
    });
};

// 事件监听：当监听到parse_done事件后，把res参数里的种子信息写入文件。
event.on('parse_done', function(resArr, id) {
    console.log('request parse done, ready for write file');
    //resArr存在的话，则写入具体的文件并计数文件内容+1，否则只是计数文件内容+1；
    var newId = +id + 1;

    getFile(config.countPath)
    .then(function (content) {
        var reg = new RegExp('(?:' + config.torrentSerie + ':)\\d+');
        var updateContent = content.replace(reg, config.torrentSerie + ':' + newId);
        return writeFile(config.countPath, updateContent);
    }, function (res) {
        return Promise.reject(res);
    })
    .then(function (res) {
        start();
    }, function (res) {
        console.log(res);
    });
    
    if (resArr) {
        var text = '\n';
        resArr.forEach(function (v, k) {
            text += 'name: ' + v.name + '\n';
            text += 'size: ' + v.size + ' hasPic: ' + v.haspic + '\n';
            text += v.magnet + '\n';
        });

        appendFile(config.torrentPath, text)
        .then(function (res) {

        }, function (res) {
            console.log(res);
        });
    }
    
}); 


//配置
var config = {
    origin: 'bt2.bt87.cc', //搜索的域名
    path: 'http://bt2.bt87.cc/search/', //搜索路径
    //搜索头部
    headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36',
        'Referer': 'http://bt2.bt87.cc/'
    },
    searchSerie: process.argv[3] || process.argv[2] || 'MCDV', //搜索的时候的参数前缀
    torrentSerie: process.argv[2] || 'MCDV', //种子的系列，也是存储的文件名
    folder: __dirname + '/welfare' //存储的路径
};
//种子存放路径
config.torrentPath = config.folder + '/' + config.torrentSerie + '.txt';
//计数器文件，存放每个种子系列已下载的最大番号
config.countPath = config.folder + '/count';

start();