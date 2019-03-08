const router = require('koa-router')(),
    baseApi = require('../../config').baseApi,
    robot = require('../controllers/robot');

router.prefix(`/${baseApi}`)

router.get('/robot', robot) //机器人交流

console.log("router");

module.exports = router
