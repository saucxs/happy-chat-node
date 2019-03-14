/*邮件模板*/
let mailTemplate = function (name, homepage, description, fontcolor, bgcolor,othercolor) {

}

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
}

module.exports = {
    mailTemplate,
    randomString
}
