const jwt = require("jsonwebtoken");
const secret = require("../config").secret;
const userModel = require("../models/userInfo");
const  md5 = require("md5");
const dbConfig = require('../config').db;

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
    console.log(name, password, '------')
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
                const token = jwt.sign(userToken, secret, {expiresIn: '24h'});
                ctx.body = {
                    success: true,
                    message: "登陆成功",
                    token: token,
                    userInfo: {
                        name: res[0]["name"],
                        user_id: res[0]["id"],
                        sex: res[0]["sex"],
                        website: res[0]["website"],
                        github: res[0]["github"],
                        intro: res[0]["intro"],
                        avator: res[0]["avator"],
                        place: res[0]["place"],
                        socketId: res[0]["socketid"]
                    }
                }
            } else {
                ctx.body = {
                    success: false,
                    message: "密码错误"
                }
            }
        } else {
            ctx.body = {
                success: false,
                message: "请先激活注册邮箱"
            }
        }

    } else {
        ctx.body = {
            success: false,
            message: "用户名错误"
        };
    }
}
