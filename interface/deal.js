var crypto = require('crypto');

var generateRandomNum = function (base, limit) {
    //产生从base到limit范围内的数字
    min = +base;
    max = +limit - min + 1;
    return Math.floor((Math.random() * max + min));

};
var generateRandomString = function (len) {
    //产生len位长度的随机字符串
    len = +len;
    var rdmString = "";
    for (; rdmString.length < len; rdmString += Math.random().toString(36).substr(2));
    return rdmString.substr(0, len);
};
var generateRandomDate = function (past, future) {
    //产生从现在为起点，过去past年到未来future年间的时间
    var rdmString = '',
        now = new Date().getTime();
    past = +past * 31536000000;
    future = +future * 31536000000;
    min = now - past,
    max = future + past;
    return Math.floor((Math.random() * max + min));
};

var deal = function(data){
    //正则匹配，抓出类型然后替换字符
    var result = data;
    //var reg = /{{[A-Za-z0-9\|\-]+}}/g;
    //result = result.replace(reg, '11');
    result = result.replace(/{{[A-Za-z0-9\|\-]+}}/g, function(word){
        var arr, newWord, temp;
        
        //去除双括号
        word = word.slice(2);
        word = word.slice(0, word.length-2);

        //比如说拆分成["{{num", "1-11}}"]
        arr = word.split('|');
        arr[0] = arr[0].trim();
        arr[1] ? arr[1] = arr[1].trim() : '';
        newWord = word;

        switch (arr[0].trim()) {
            case 'num':
                //默认随机数从0到9999
                arr[1] ? temp = arr[1].split('-') : temp = [0,9999];
                newWord = generateRandomNum(temp[0], temp[1]);
                break;
            case 'string':
                //默认字符串位数有10位
                arr[1] ? temp = arr[1] : temp = 10;
                newWord = generateRandomString(temp);
                break;
            case 'date':
                //默认时间为本地时间的前10年到后10年间。
                arr[1] ? temp = arr[1].split('-') : temp = [10,10];
                newWord = generateRandomDate(temp[0], temp[1]);
                break;
            default:
                newWord = word;

        }
        return newWord;
    });
    return result;
};
module.exports = deal;