const newFriendsModel = require("../models/newFriends");

/**
 *  获取我的新好友通知
 * @param user_id  我的id
 * @return
 */

let getNewFriends = async (ctx, next) => {
	const RowDataPacket = await newFriendsModel.getnewFriends(ctx.user_id, 1),
		newFriends = JSON.parse(JSON.stringify(RowDataPacket));
	ctx.body = {
		success: true,
		data: {
			newFriends: newFriends
		}
	};
};

/**
 *  获取好友列表
 * @param user_id  我的id
 * @return
 */

let getFriends = async (ctx, next) => {
    const RowDataPacket = await newFriendsModel.getFriends(ctx.user_id, 1),
        alreadyFriends = JSON.parse(JSON.stringify(RowDataPacket));
    ctx.body = {
        success: true,
        data: {
            alreadyFriends: alreadyFriends
        }
    };
};


/**
 *  添加我的新好友通知
 * @param
 * @return
 */

let insertNewFriends = async (ctx, next) => {
	const arr = [ctx.user_id, ctx.request.body.to_user, ctx.request.body.content, ctx.request.body.time, ctx.request.body.status, 1];
	await newFriendsModel.insertNewFriends(arr).then(result => {
		if(result){
            ctx.body = {
                success: true
            };
		}
	}).catch(err => {
		console.log(err);
	});
};

/**
 *  更新我的新好友通知状态
 * @param
 * @return
 */

let updateNewFriends = async (ctx, next) => {
	await newFriendsModel.updateNewFriends(ctx.request.body.from_user, ctx.user_id).then(result => {
		ctx.body = {
			success: true
		};
	}).catch(err => {
		console.log(err);
	});
};

module.exports = {
	getNewFriends,
    getFriends,
	insertNewFriends,
	updateNewFriends
};
