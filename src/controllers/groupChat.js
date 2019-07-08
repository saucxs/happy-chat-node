const groupChatModel = require("../models/groupChat");

/**
 * 获取群资料
 * @param   groupMsg  群聊信息
 * @param   groupInfo  群资料
 * @param   message  消息
 * @param   name 用户名
 * @param   time  时间
 * @return
 */

let getGroupInfo = async (ctx, next) => {
	try {
		const RowDataPacket = await groupChatModel.getGroupInfo([ctx.query.groupId, ctx.query.groupName]),
			groupInfo = JSON.parse(JSON.stringify(RowDataPacket));
		ctx.body = {
			success: true,
			data: {
				groupInfo: groupInfo
			}
		};
	} catch (error) {
		console.log(error);
	}
};


/**
 * 获取群聊相关内容
 * @param   groupMsg  群聊信息
 * @param   groupInfo  群资料
 * @param   message  消息
 * @param   name 用户名
 * @param   time  时间
 * @return
 */

let getGroupDetail = async (ctx, next) => {
	try {
        let page = ctx.query.page || 1;
        let pageNum = ctx.query.pageNum || 20;
        let pageIndex = (page - 1) * pageNum < 0 ? 0 : (page - 1) * pageNum;
		const groupId = ctx.query.groupId,
			RowDataPacket1 = await groupChatModel.getGroupMsg(groupId, pageIndex, pageNum),
			RowDataPacket2 = await groupChatModel.getGroupInfo([groupId, null]),
			RowDataPacket3 = await groupChatModel.getGroupMember(groupId),
            RowDataPacket4 = await groupChatModel.getGroupMemberInfo(groupId),
			groupMsg = JSON.parse(JSON.stringify(RowDataPacket1)),
			groupInfo = JSON.parse(JSON.stringify(RowDataPacket2)),
			groupMember = JSON.parse(JSON.stringify(RowDataPacket3)),
        	groupMemberInfo = JSON.parse(JSON.stringify(RowDataPacket4));
		let newGroupMember = [];
		groupMember.forEach(element => {
			newGroupMember.push(element.group_member_id);
		});
		// console.log('newGroupMember',newGroupMember)
		ctx.body = {
			success: true,
			data: {
				groupMsg: groupMsg,
				groupInfo: groupInfo,
				groupMember: newGroupMember,
                groupMemberInfo: groupMemberInfo
			}
		};
	} catch (error) {
		console.log(error);
	}
};
/**
 * 存储群聊信息
 * @param   userId  用户id
 * @param   groupId 群id
 * @param   message  消息
 * @param   name 用户名
 * @param   time  时间
 * @return
 */
let saveGroupMsg = async (ctx, next) => {
	const userId = ctx.user_id,
		groupId = ctx.request.body.groupId,
		message = ctx.request.body.message,
		name = ctx.request.body.name,
		time = ctx.request.body.time;
	// console.log(userId,groupId,message,name,time)
	await groupChatModel.saveGroupMsg(userId, groupId, message, name, time)
		.then(result => {
			console.log("saveGroupMsg11", result);
			if (result) {
				ctx.body = {
					success: true
				};
				console.log("保存群消息成功");
			}
		})
		.catch(err => {
			console.log(err);
		});
};
/**
 * 群添加成员并返回群成员
 * @param   userId  用户id
 * @param   groupId 群id
 * @return 群成员
 */
let addGroupUserRelation = async (ctx, next) => {
	const userId = ctx.user_id,
		groupId = ctx.request.body.groupId,
		RowDataPacket3 = await groupChatModel.getGroupMember(groupId),
        groupMember = JSON.parse(JSON.stringify(RowDataPacket3));
	if(groupMember.length > 50){
        ctx.body = {
            success: false,
            data: {},
			message: '当前群的人数已达上限50人'
        };
	}else{
        await groupChatModel.addGroupUserRelation(userId, groupId);
        let newGroupMember = [userId];
        groupMember.forEach(element => {
            newGroupMember.push(element.group_member_id);
        });
        ctx.body = {
            success: true,
            data: {
                groupMember: newGroupMember
            },
			message: '添加群成员成功'
        };
	}
};

module.exports = {
	getGroupInfo,
	getGroupDetail,
	saveGroupMsg,
	addGroupUserRelation,
};
