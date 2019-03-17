const router = require('koa-router')();
const baseApi = require('../config').baseApi;
const verify = require('../middlewares/verify');
const robot = require('../controllers/robot');
const register = require('../controllers/register');
const login = require('../controllers/login');
const message = require('../controllers/message');
const privateChat = require('../controllers/privateChat.js');

router.prefix(`/${baseApi}`)

router.post('/register', register.unActivate) //注册-未激活
router.get('/robot',verify, robot) //机器人交流
router.get('/activate', register.activate) //注册-激活
router.post('/login', login) //登陆
router.get('/message', verify, message) // 获取首页列表信息
router.get('/private_detail', verify, privateChat.getprivateDetail) // 获取私聊相关内容
router.post('/private_save_msg', verify, privateChat.savePrivateMsg) //保存私聊信息

console.log("router");

module.exports = router
