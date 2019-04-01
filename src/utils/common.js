/*邮件模板*/
let mailTemplate = function (receiveEmailName, emailContent, name, homepage, description, fontcolor, bgcolor) {
    var name = name || 'HappyChat';
    var homepage = homepage || 'http://chat.chengxinsong.cn';
    var description = description || 'HappyChat乐聊';
    var fontcolor = fontcolor || '#fff';
    var bgcolor = bgcolor || '#363941';
    var newHtml = '<div style="width:700px;margin:0 auto;background-color:#f7f7f7;padding-top:30px;">\n' +
        '\t\t\t<table cellpadding="0" cellspacing="0" style="margin: auto;background-color:white;font-family:PingFangSC,&quot;Microsoft Yahei&quot;,&quot;Heiti SC&quot;,sans-serif ;border-radius:8px;overflow:hidden;">\n' +
        '\t\t\t\t<tbody>\n' +
        '\t\t\t\t\t<tr style="width:700px;height:100px;background: #363941;">\n' +
        '\t\t\t\t\t\t<th style="width:700px;">\n' +
        '\t\t\t\t\t\t\t<img style="width: 70px;" src="http://chat.chengxinsong.cn/icon/happyChat.png" />\n' +
        '\t\t\t\t\t\t\t<p style="color: #9fa1a1;margin: -10px auto 20px;font-size: 16px;">'+ name +'</span>\n' +
        '\t\t\t\t\t\t</th>\n' +
        '\t\t\t\t\t</tr>\n' +
        '\t\t\t\t\t<tr style="width:700px;height:60px;">\n' +
        '\t\t\t\t\t\t<td>\n' +
        '\t\t\t\t\t\t\t<h2 style="color:#555555;margin-left:36px;margin-top:34px;">亲爱的'+ receiveEmailName +' ,</h2>\n' +
        '\t\t\t\t\t\t</td>\n' +
        '\t\t\t\t\t</tr>\n' +
        '\t\t\t\t\t<tr style="width:700px;height:70px;">\n' +
        '\t\t\t\t\t\t<td>\n' +
        '\t\t\t\t\t\t\t<p style="font-size: 14px;line-height: 20px;color: #393939;margin-left:36px;margin-top:32px;margin-right: 36px;">'+ emailContent +'\n' +
        '\t\t\t\t\t\t\t</p>\n' +
        '\t\t\t\t\t\t</td>\n' +
        '\t\t\t\t\t</tr>\n' +
        '\t\t\t\t\t<tr style="width:700px;height:100px;">\n' +
        '\t\t\t\t\t\t<td>\n' +
        '\t\t\t\t\t\t\t<p style="margin-left:36px;font-size: 14px;line-height: 20px;color: #393939;">\n' +
        '\t\t\t\t\t\t\t\t'+ description +'\n' +
        '\t\t\t\t\t\t\t</p>\n' +
        '\t\t\t\t\t\t\t<a style="margin-left:36px;font-size: 14px;color: #4d90fd;display: block;" href="'+ homepage +'">'+ homepage +'</a>\n' +
        '\t\t\t\t\t\t</td>\n' +
        '\t\t\t\t\t</tr>\n' +
        '\t\t\t\t\t<tr style="width:700px;background: #eee;">\n' +
        '\t\t\t\t\t\t<th style="display: flex;justify-content: center;align-items: center;padding: 20px;">\n' +
        '\t\t\t\t\t\t\t<div style="margin: 0px 10px;">\n' +
        '\t\t\t\t\t\t\t\t<a target="_blank" href="https://github.com/saucxs" title="Github">\n' +
        '\t\t\t\t\t\t\t\t\t<img style="width: 30px;" src="http://chat.chengxinsong.cn/icon/GitHub.png" />\n' +
        '\t\t\t\t\t\t\t\t</a>\n' +
        '\t\t\t\t\t\t\t</div>\n' +
        '\t\t\t\t\t\t\t<div style="margin: 0px 10px;">\n' +
        '\t\t\t\t\t\t\t\t<a target="_blank" href="https://mwcxs.top" title="sau交流学习社区">\n' +
        '\t\t\t\t\t\t\t\t\t<img style="width: 30px;" src="http://chat.chengxinsong.cn/icon/cloud.png" />\n' +
        '\t\t\t\t\t\t\t\t</a>\n' +
        '\t\t\t\t\t\t\t</div>\n' +
        '\t\t\t\t\t\t\t<div style="margin: 0px 10px;">\n' +
        '\t\t\t\t\t\t\t\t<a target="_blank" href="http://chengxinsong.cn" title="songEagle研究">\n' +
        '\t\t\t\t\t\t\t\t\t<img style="width: 30px;" src="http://chat.chengxinsong.cn/icon/research.png" />\n' +
        '\t\t\t\t\t\t\t\t</a>\n' +
        '\t\t\t\t\t\t\t</div>\n' +
        '\t\t\t\t\t\t\t<div style="margin: 0px 10px;">\n' +
        '\t\t\t\t\t\t\t\t<a target="_blank" href="http://weekly.mwcxs.top" title="weekly周报">\n' +
        '\t\t\t\t\t\t\t\t\t<img style="width: 30px;" src="http://chat.chengxinsong.cn/icon/menu-weekly-select.png" />\n' +
        '\t\t\t\t\t\t\t\t</a>\n' +
        '\t\t\t\t\t\t\t</div>\n' +
        '\t\t\t\t\t\t\t<div style="margin: 0px 10px;">\n' +
        '\t\t\t\t\t\t\t\t<a target="_blank" href="http://book.mwcxs.top" title="loveBook">\n' +
        '\t\t\t\t\t\t\t\t\t<img style="width: 30px;" src="http://chat.chengxinsong.cn/icon/book.png" />\n' +
        '\t\t\t\t\t\t\t\t</a>\n' +
        '\t\t\t\t\t\t\t</div>\n' +
        '\t\t\t\t\t\t\t<div style="margin: 0px 10px;">\n' +
        '\t\t\t\t\t\t\t\t<a href="mailto:saucxs@163.com" title="联系反馈">\n' +
        '\t\t\t\t\t\t\t\t\t<img style="width: 30px;" src="http://chat.chengxinsong.cn/icon/Email.png" />\n' +
        '\t\t\t\t\t\t\t\t</a>\n' +
        '\t\t\t\t\t\t\t</div>\n' +
        '\t\t\t\t\t\t</th>\n' +
        '\t\t\t\t\t</tr>\n' +
        '\t\t\t\t</tbody>\n' +
        '\t\t\t</table>\n' +
        '\t\t</div>\n'

    return newHtml;

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
