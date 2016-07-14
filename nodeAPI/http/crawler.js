var http = require('http');
var cheerio = require('cheerio');
var url = 'http://www.imooc.com/learn/348';

// 过滤章节信息
function filterChapters(html) {
    var $ = cheerio.load(html);
    var chapters = $(".chapter"); //.chapter和课程有关的最外层
    var courseData = [];    //课程信息

    chapters.each(function(index, item) {    //遍历5个大章节
        var chapter = $(item);    
        var chapterTitle = chapter.find('strong').text();
        var chapterItem = chapter.find('li');
        var chaperData = {
            'title': chapterTitle,
            'videos': []
        }
        chapterItem.each(function(index, item) {    //遍历每大章下面的小章节
            var video = $(item);
            var videoTitle = video.find('.studyvideo').text();

            var videoId = video.find('.studyvideo').attr('href').split('video/')[1];

            chaperData.videos.push({
                'title': videoTitle,
                'id': videoId
            });
        });
        courseData.push(chaperData);
    });

    return courseData;


}
// 显示课程信息
function printCourseInfo(course) {
    course.forEach(function(element) {
        var chapterTitle = element.title;
        console.log(chapterTitle + '\n');
        element.videos.forEach(function(video) {
            console.log('【' + video.id + '】' + video.title.trim()+ '\n');
        });
    });
}

//此匿名函数中的参数response为http.ClientRequest的一个实例
http.get(url, function(response) {
    var html = '';
    response.on('data', function(data) {
        html += data;
    });
    response.on('end', function() {
        var courseArr = filterChapters(html);
        printCourseInfo(courseArr);
    });
}).on('error', function() {
    console.log('获取课程错误');
});


console.log('crawling..');