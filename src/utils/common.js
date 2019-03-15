/*邮件模板*/
let mailTemplate = function (name, homepage, description, fontcolor, bgcolor,othercolor) {

};

/*随机字符串*/
let randomString = function (length) {
    length = length || 64;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678oOLl9gqVvUuI1+-*_';
    var maxLen = $chars.length;
    var str = '';
    for (let i = 0; i < length; i++) {
        str += $chars.charAt(Math.floor(Math.random() * maxLen));
    }
    return str;
};

/*时间戳转时间*/
let toNomalTime = function (timeStamp) {
    var date = new Date(parseInt(timeStamp));
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = date.getDate() + ' ';
    var h = (date.getHours()<10?'0'+date.getHours(): date.getHours()) + ':';
    var m = (date.getMinutes()<10?'0'+date.getMinutes(): date.getMinutes()) + ':';
    var s = (date.getSeconds()<10?'0'+date.getSeconds(): date.getSeconds());
    return Y+M+D+h+m+s;
};

module.exports = {
    mailTemplate,
    randomString,
    toNomalTime
}
