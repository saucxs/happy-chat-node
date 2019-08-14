const githubToken = require("../config").githubToken;
const axios = require('axios');
const jwt = require("jsonwebtoken");
const secret = require("../config").secret;
const feedbackModel = require("../models/feedback");
const { toNomalTime } = require('../utils/common');

/* 获取反馈留言列表 */
let getFeedbackList = async (ctx, next) => {
    let page = ctx.query.page || 1;
    let pageNum = ctx.query.pageNum || 3;
    let pageIndex = (page - 1) * pageNum < 0 ? 0 : (page - 1) * pageNum;
    const RowDataPacket = await feedbackModel.getFeedbackList(pageIndex, pageNum),
        feedbackList = JSON.parse(JSON.stringify(RowDataPacket));

    if(feedbackList.length > 0){
        feedbackList.map(item => {
            item.ip = item.ip.substring(0, parseInt(item.ip.length/2)) + '****' + item.ip.substring(parseInt(item.ip.length/2)+4,item.ip.length);
            item.email = item.email.substring(0, parseInt(item.email.length/2)) + '****' + item.email.substring(parseInt(item.email.length/2)+4,item.email.length);
        })
    }
    ctx.body = {
        success: true,
        data: {
            feedbackList: feedbackList
        }
    };
};

/* 提交留言反馈 */
let submitFeedback = async (ctx, next) => {
    let email = ctx.request.body.email || "";
    let content = ctx.request.body.content || "";
    if (email === "" || content === "") {
        ctx.body = {
            success: false,
            message: "邮箱和内容不能为空"
        };
        return ;
    }
    let loginDate = toNomalTime(new Date().getTime());
    // /* 获取客户端IP 无代理和有代理 */
    let req = ctx.req;
    let clientIP = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    await feedbackModel.submitFeedback(email, content, clientIP, loginDate),
    ctx.body = {
        success: true,
        message: '留言反馈提交成功'
    };
};

module.exports = {
    getFeedbackList,
    submitFeedback
}

