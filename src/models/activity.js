const {
	query
} = require('../utils/db');

// 留言反馈列表
let getActivityList = function(pageIndex, pageNum) {
    const data = [Number(pageIndex), Number(pageNum)];
	let _sql = `select * from activity where is_show = '1'`;
	return query(_sql, data)
}

module.exports = {
    getActivityList,
}
