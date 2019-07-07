const baseApi = 'api/chat'
const db = {
    host: '127.0.0.1', // 数据库IP
    port: 3306, // 数据库端口
    database: 'happy_chat', // 数据库名称
    user: 'root', // 数据库用户名
    password: '111111111111', // 数据库密码,
    salt: '111111111111',
    encoding: "utf8mb4"
}

const mailer = {
    host:"smtp.qq.com",
    port: 465,
    domains:'["qq.com"]',
    account:'184866445@qq.com',
    pass: "111111111111",
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
