const {
    query
} = require('../utils/db');

/**
 * 更新成员的socketId
 * @param   成员的id 之前的socketId
 */
let saveUserSocketId  = function(userId, socketId){
    const data = [socketId,userId]
    let _sql = ' UPDATE  user_info SET socketid = ? WHERE id= ? limit 1 ; '
    return query( _sql,data)
}

/**
 * 获取成员的socketId
 * @param   成员的id
 * @return  成员的socketId
 */
let getUserSocketId  = function(toUserId){
    let _sql = ' SELECT socketid FROM user_info WHERE id=? limit 1 ;'
    return query( _sql,[toUserId])
}


module.exports = {
    saveUserSocketId,
    getUserSocketId,
}
