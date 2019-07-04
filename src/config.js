const baseApi = 'api/chat'
const db = {
    host: '120.27.109.67', // 数据库IP
    port: 3306, // 数据库端口
    database: 'happy_chat', // 数据库名称
    user: 'root', // 数据库用户名
    password: 'cxs@Aa!', // 数据库密码,
    salt: 'happy-chat'
}

const mailer = {
    host:"smtp.qq.com",
    port: 465,
    domains:'["qq.com"]',
    account:'184866445@qq.com',
    pass: "fbicrroqnfzwbifd",
    from: "happyChat乐聊<184866445@qq.com>",
    route_on: true,
    encoding: "utf-8"
}

const secret = 'happy-chat-sec'


module.exports = {
    db,
    mailer,
	baseApi,
	secret
}
