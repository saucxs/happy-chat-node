const githubToken = require("../config").githubToken;
const axios = require('axios');
const jwt = require("jsonwebtoken");
const secret = require("../config").secret;
const activityModel = require("../models/activity");
const { toNomalTime } = require('../utils/common');

/* 获取反馈留言列表 */
let getActivityList = async (ctx, next) => {
    const RowDataPacket = await activityModel.getActivityList(),
    activityList = JSON.parse(JSON.stringify(RowDataPacket));
    ctx.body = {
        success: true,
        data: {
            activityList: activityList
        }
    };
};

module.exports = {
    getActivityList
}

