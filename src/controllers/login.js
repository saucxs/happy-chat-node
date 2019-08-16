const jwt = require("jsonwebtoken");
const secret = require("../config").secret;
const userModel = require("../models/userInfo");
const  md5 = require("md5");
const dbConfig = require('../config').db;
const { toNomalTime } = require('../utils/common');

module.exports = async (ctx, next) => {
    let name = ctx.request.body.name || "";
    let password = ctx.request.body.password || "";
    if (name === "" || password === "") {
        ctx.body = {
            success: false,
            message: "用户名或密码不能为空"
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
    const alreadyRow = await userModel.findDataByName(name);
    const res = JSON.parse(JSON.stringify(alreadyRow));
    if (res.length > 0) {
        if (res[0]['activate']) {
            /*验证成功，服务端会签发一个token，token返回给客户端*/
            let salt = dbConfig.salt
            if (md5(salt + password + salt) === res[0]["password"]) {
                /*用户token*/
                const userToken = {
                    name: name,
                    id: res[0]["id"]
                };
                const token = jwt.sign(userToken, secret, {expiresIn: '7d'});
                userModel.logLogin(['password', name, password, clientIP, true, true, loginDate]);
                ctx.body = {
                    success: true,
                    message: "登陆成功",
                    token: token,
                    userInfo: {
                        name: res[0]["name"],
                        email: res[0]["email"],
                        user_id: res[0]["id"],
                        sex: res[0]["sex"],
                        website: res[0]["website"],
                        github: res[0]["github"],
                        intro: res[0]["intro"],
                        avatar: res[0]["avatar"],
                        place: res[0]["place"],
                        socketId: res[0]["socketid"]
                    }
                }
            } else {
                userModel.logLogin(['password', name, password, clientIP, true, false, loginDate]);
                ctx.body = {
                    success: false,
                    message: "用户名或密码错误"
                }
            }
        } else {
            userModel.logLogin(['password', name, password, clientIP, false,  false, loginDate]);
            ctx.body = {
                success: false,
                message: "前往注册邮箱进行激活"
            }
        }

    } else {
        userModel.logLogin(['password', name, password, clientIP, false, false, loginDate]);
        ctx.body = {
            success: false,
            message: "用户名或密码错误"
        };
    }
}
