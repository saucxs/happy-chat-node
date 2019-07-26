let userModel= require("../models/userInfo");
const md5 = require("md5");
const nodemailer = require("nodemailer");
const dbConfig = require('../config').db;
const mailer = require('../config').mailer;
const {randomString, toNomalTime, mailTemplate} = require('../utils/common');

let unActivate = async (ctx, next) => {
    let user = {
        name: ctx.request.body.name,
        password: ctx.request.body.password,
        email: ctx.request.body.email
    }
    let salt = dbConfig.salt
    await userModel.findDataByName(user.name).then(res => {
        if(res.length) {
            ctx.body = {
                success: false,
                message: "用户名已经存在"
            }
        }else{
            let code =  md5(salt + randomString(64) +salt);
            userModel.insertUser([
                user.name,
                md5(salt + user.password + salt),
                user.email,
                false,
                code
            ]);
            ctx.body = {
                success: true,
                message: "注册成功，请前往注册邮箱进行激活"
            };
            let activateUrl = "http://chat.chengxinsong.cn/#/activate/" + code;
            /*sendeamil*/
            let content =  '<p style="width: 700px">用户激活邮件，点击下方的连接进行激活:</p>' +
                '<a target="_blank" style="width: 700px;color: #5579ee;font-size: 20px" href="'+ activateUrl +'">'+ activateUrl +'</a>';
            let newHtml = mailTemplate(user.name, content)
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
                html: newHtml
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

let activate = async (ctx, next) => {
    let code = ctx.query.code;
    await userModel.findDataByActivateCode(code).then(res => {
        if(res.length) {
            let user = res[0]
            if (user.activate) {
                ctx.body = {
                    success: false,
                    message: "该邮箱"+ user.email +"，用户名："+ user.name+"。\r在"+ user.activateDate +"已经激活"
                }
            } else {
                let activateDate = toNomalTime(new Date().getTime())
                let data = userModel.activateUser(true, activateDate, user.email);
                if(data){
                    ctx.body = {
                        success: true,
                        message: "恭喜你，"+ user.email +"激活成功，用户名："+ user.name +'。'
                    }
                }else{
                    ctx.body = {
                        success: false,
                        message: "服务器开小差"
                    }
                }
            }
        } else {
            ctx.body = {
                success: false,
                message: "请检查激活码是否正确"
            }
        }
    })
}

module.exports = {
    unActivate,
    activate
}
