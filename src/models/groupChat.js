const {
	query
} = require("../utils/db");
/**
 * 获取群消息
 * @param  群id
 * @return  message 群消息
 * @return  time  时间
 * @return  from_user  发送人id
 *  @return  avatar  发送人头像
 */
let getGroupMsg = function(groupId, pageIndex, pageNum) {
    const data = [groupId, Number(pageIndex), Number(pageNum)];
    const _sql = "SELECT * FROM (SELECT g.message , g.time , g.from_user ,i.avatar ,i.name FROM group_msg  As g inner join user_info AS i ON g.from_user = i.id  WHERE to_group = ? order by time desc limit ?,?) as n order by n.time";
    return query(_sql, data);
};

/**
 * 获取群成员 获取人员id
 * @param   群id
 * @return  group_member_id  群成员id
 */
let getGroupMember = function(groupId) {
	let _sql = " SELECT user_id AS group_member_id  FROM group_user_relation  WHERE group_id = ? ";
	return query(_sql, groupId);
};

/**
 * 获取群成员
 * @param   群id
 * @return  group_member_id  群成员id
 */
let getGroupMemberInfo = function(groupId) {
    let _sql = "SELECT g.user_id, u.name, u.status, u.avatar, u.github, u.intro,u.website FROM group_user_relation AS g inner join user_info AS u ON g.user_id = u.id WHERE group_id = ?";
    return query(_sql, groupId);
};

/**
 * 获取群资料
 * @param   arr 包括 groupId  goupName 至少一个
 * @return
 */
let getGroupInfo = function(arr) {
	let _sql = " SELECT * FROM group_info  WHERE group_id = ? OR group_name = ? ;";
	return query(_sql, arr);
};


/**
 * 存聊天记录
 * @param   userId  用户id
 * @param   groupId 群id
 * @param   message  消息
 * @param   name 用户名
 * @param   time  时间
 * @return
 */

let saveGroupMsg = function(userId, groupId, message, name, time) {
	const data = [userId, groupId, `${name} : ${message}`, time];
	let _sql = " INSERT INTO group_msg(from_user,to_group,message ,time) VALUES(?,?,?,?); ";
	return query(_sql, data);
};
/**
 * 群添加成员并返回群成员
 * @param   userId  用户id
 * @param   groupId 群id
 * @return
 */
let addGroupUserRelation = function(userId, groupId) {
	const data = [groupId, userId];
	let _sql = " INSERT INTO  group_user_relation(group_id,user_id) VALUES(?,?); ";
	return query(_sql, data);
};
module.exports = {
	getGroupMsg,
	getGroupMember,
    getGroupMemberInfo,
	getGroupInfo,
	saveGroupMsg,
	addGroupUserRelation
};
