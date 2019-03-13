const router = require('koa-router')();
const baseApi = require('../config').baseApi;
const robot = require('../controllers/robot');
const register = require('../controllers/register');

router.prefix(`/${baseApi}`)

router.post('/register', register) //注册
router.get('/robot', robot) //机器人交流

console.log("router");

module.exports = router
