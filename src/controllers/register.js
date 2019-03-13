let userModel= require("../models/userInfo");
const dbConfig = require('../config').db;
let md5 = require("md5");

module.exports = async (ctx, next) => {
    console.log("register");
    let user = {
        name: ctx.request.body.name,
        password: ctx.request.body.password,
        email: ctx.request.body.email
    }
    let salt = dbConfig.salt
    await userModel.findDataByName(user.name).then(res => {
        console.log(res, '结果')
        if(res.length) {
            ctx.body = {
                success: false,
                message: "用户名已经存在"
            }
        }else{
            ctx.body = {
                success: true,
                message: "注册成功"
            };
            console.log(user, '--------------------')
            userModel.insertUser([
                user.name,
                md5(salt + user.password + salt),
                user.email,
            ])
        }
    })
}
