const githubToken = require("../config").githubToken;
const axios = require('axios');
const jwt = require("jsonwebtoken");
const secret = require("../config").secret;
const userModel = require("../models/userInfo");
const { toNomalTime } = require('../utils/common');

module.exports = async (ctx, next) => {
    const requestToken = ctx.request.query.code;
    const tokenResponse = await axios({
        method: 'post',
        url: 'https://github.com/login/oauth/access_token?' +
            `client_id=${githubToken.clientID}&` +
            `client_secret=${githubToken.clientSecret}&` +
            `code=${requestToken}`,
        headers: {
            accept: 'application/json'
        }
    });
    const accessToken = tokenResponse.data.access_token;
    const result = await axios({
        method: 'get',
        url: `https://api.github.com/user`,
        headers: {
            accept: 'application/json',
            Authorization: `token ${accessToken}`
        }
    });
    const response = result.data;
    const {
        avatar_url, html_url, bio, login, location, id, blog
    } = response;
    const data = {
        avatar: avatar_url,
        github: html_url,
        intro: bio,
        name: login,
        place: location,
        github_id: id,
        website: blog,
    };
    const RowDataPacket = await userModel.findGithubUser(id); // judge if this github account exist
    let githubUser = JSON.parse(JSON.stringify(RowDataPacket));
    if (githubUser.length > 0) {
        await userModel.updateGithubUser(data);
    } else {
        await userModel.insertGithubData(data);
        const RowDataPacket = await userModel.findGithubUser(id);
        githubUser = JSON.parse(JSON.stringify(RowDataPacket));
    }
    data.user_id = githubUser[0].id;
    const payload = { id: data.user_id,  name: login };
    const token = jwt.sign(payload, secret, {expiresIn: '7d'});
    let loginDate = toNomalTime(new Date().getTime());
    // /* 获取客户端IP 无代理和有代理 */
    let req = ctx.req;
    let clientIP = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    userModel.logLogin(['github', data.name, ' ', clientIP, '', true, loginDate]);
    ctx.body = {
        success: true,
        message: "github登陆成功",
        token: token,
        userInfo: data
    };
}

