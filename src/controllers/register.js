let userModel= require("../models/userInfo");
let md5 = require("md5");
let nodemailer = require("nodemailer");
const dbConfig = require('../config').db;
const mailer = require('../config').mailer;
const {randomString} = require('../utils/common');

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
            console.log(user, '--------------------')
            userModel.insertUser([
                user.name,
                md5(salt + user.password + salt),
                user.email,
                false,
                randomString(128)
            ]);
            ctx.body = {
                success: true,
                message: "注册成功，请前往注册邮箱进行激活"
            };
            /*sendeamil*/
            let html = '<div style="width:800px;font-size:14px;margin:0 auto;border:1px solid #eee;box-shadow: 0 0 16px 0 rgba(85, 121, 238, 0.39);background: #eee;">' +
                '<p>亲爱的'+ user.name +':</p>' +
                '<p>用户激活邮件，点击下方的连接进行激活:</p>' +
                '<a target="_blank" style="color: #5579ee;font-size: 16px">'+  +'</a>' +
                '</div>'
            /*创建email的连接*/
            let smtpTransport = nodemailer.createTransport({
                host: mailer.host,
                secureConnection: true,
                port: mailer.port,
                requiresAuth: true,
                domains: mailer.domains,
                auth: {
                    user: mailer.account,
                    pass: mailer.pass
                }
            });
            /*邮件内容配置项*/
            let specialOption = {
                from: mailer.from,
                to: user.email,
                subject: user.name+'用户激活邮件',
                html: html
            };
            smtpTransport.sendMail(specialOption, function (err, res) {
                if(err){
                    console.log(err);
                }else{
                    console.log(res,'注册激活邮件发送邮件日志-----------------------------------------------');
                }
                //如果不在发送可以直接关闭，如果还需要发送其他邮件，那么就不要关闭连接池，直接发送
                smtpTransport.close();
            })

        }
    })
}
