const router = require('koa-router')();
const baseApi = require('../config').baseApi;
const verify = require('../middlewares/verify');
const robot = require('../controllers/robot');
const register = require('../controllers/register');
const login = require('../controllers/login');
const message = require('../controllers/message');
const privateChat = require('../controllers/privateChat.js');
const userInfo = require('../controllers/userInfo.js');
const newFriends = require('../controllers/newFriends.js');
const groupInfo = require('../controllers/groupInfo.js');
const groupChat = require('../controllers/groupChat.js');
const github = require('../controllers/github');
const feedback = require('../controllers/feedback');

router.prefix(`/${baseApi}`)

router.post('/register', register.unActivate) //注册-未激活
router.get('/activate', register.activate) //注册-激活
router.get('/robot',verify, robot) //机器人交流
router.post('/login', login) //登陆
router.get('/message', verify, message) // 获取首页列表信息
router.get('/private_detail', verify, privateChat.getprivateDetail) // 获取私聊相关内容
router.post('/private_save_msg', verify, privateChat.savePrivateMsg) //保存私聊信息
router.get('/find_people', verify, userInfo.findUIByName) //通过用户名搜索加人，此接口返回用户信息
router.get('/user_info', verify, userInfo.getUserInfo) // 获取用户资料
router.get('/is_friend', verify, userInfo.isFriend) // 是否是好友
router.post('/insert_newfriends', verify, newFriends.insertNewFriends) // 添加我的新好友通知
router.get('/get_newfriends', verify, newFriends.getNewFriends) // 获取新朋友通知
router.get('/get_friends', verify, newFriends.getFriends) // 获取朋友列表
router.post('/be_friend', verify, userInfo.agreeBeFriend) // 加为好友
router.delete('/del_friend', verify, userInfo.delFriend) // 删除好友
router.put('/update_newfriends', verify, newFriends.updateNewFriends) // 更新 新好友状态  是否已被同意加好友
router.put('/editor_remark', verify, userInfo.editorRemark) // 修改备注
router.post('/create_group', verify, groupInfo.createGroup) // 建群
router.post('/edit_group', verify, groupInfo.editGroup) // 编辑群
router.post('/join_group', verify, groupInfo.joinGroup) // 加入群
router.get('/group_chat', verify, groupChat.getGroupDetail) //获取群相关内容
router.post('/group_chat_msg', verify, groupChat.saveGroupMsg) // 保存群信息
router.post('/group_chat_relation', verify, groupChat.addGroupUserRelation) //群添加成员并返回群成员
router.get('/get_group_info', verify, groupChat.getGroupInfo) //获取群资料
router.get('/is_in_group', verify, groupInfo.isInGroup) // 看某个用户是否在某个群中(根据返回的数组长度是不是为零就知道)
router.delete('/exit_group', verify, groupInfo.exitGroup) // 退群
router.get('/get_groups', verify, groupInfo.getGroups) // 获取朋友列表
router.put('/editor_info', verify, userInfo.editorInfo) // 修改我的信息
router.post('/update_password', verify, userInfo.updatePassword)   // 更新密码
router.post('/pv_log', userInfo.pvLog) // pv日志
router.get('/oauth', github)   // github授权
router.get('/get_feedback', feedback.getFeedbackList)   // 留言反馈列表
router.post('/submit_feedback', feedback.submitFeedback)   // 留言反馈列表


console.log("router");

module.exports = router
