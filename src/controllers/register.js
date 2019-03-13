let userModel= require("../models/userInfo");
let md5 = require("md5");

module.exports = async (ctx, next) => {
    console.log("register");
    let user = {
        name: ctx.request.body.name,
        password: ctx.request.body.password
    }
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
            userModel.insertUser([
                ctx.request.body.name,
                md5(ctx.request.body.password)
            ])
        }
    })
}
