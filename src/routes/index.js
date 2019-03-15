const router = require('koa-router')();
const baseApi = require('../config').baseApi;
const verify = require('../middlewares/verify');
const robot = require('../controllers/robot');
const register = require('../controllers/register');
const login = require('../controllers/login');

router.prefix(`/${baseApi}`)

router.post('/register', register.unActivate) //注册-未激活
router.get('/robot',verify, robot) //机器人交流
router.get('/activate', register.activate) //注册-激活
router.post('/login', login) //登陆

console.log("router");

module.exports = router
