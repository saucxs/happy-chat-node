const {
	query
} = require('../utils/db');

// 留言反馈列表
let getFeedbackList = function(pageIndex, pageNum) {
    const data = [Number(pageIndex), Number(pageNum)];
	let _sql = `select SQL_CALC_FOUND_ROWS * from feed_back where is_show = '1' order by date desc limit ?, ? `;
	return query(_sql, data)
}

// 提交留言反馈
let submitFeedback = function(email, content, clientIP, loginDate) {
    const data = [email, content, clientIP, loginDate, '1'];
    let _sql = `insert into feed_back(email, content, ip, date, is_show) values(?,?,?,?,?)`;
    return query(_sql, data)
}


module.exports = {
    getFeedbackList,
    submitFeedback
}
