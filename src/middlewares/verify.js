/*处理验证是否登陆*/
const jwt = require("jsonwebtoken");
const secret = require("../config").secret;

module.exports = async (ctx, next) => {
    /*同步 校验token*/
    const auth = ctx.get("Authorization");
    const token = auth.split(' ')[1];
    try {
        const userToken = jwt.verify(token, secret)
        ctx.user_id = userToken.id;
        ctx.name = userToken.name;
        await next()
    } catch (err){
        ctx.throw(401, err)
    }
}
