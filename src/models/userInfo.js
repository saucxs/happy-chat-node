const {query} = require('../utils/db');

/*注册用户-未激活*/
let insertUser= function (value) {
    let sql = "insert into user_info(name, password, email, activate, activateCode) values(?,?,?,?,?)"
    return query(sql, value)
}

/*注册用户-激活*/
let activateUser= function (value) {
    let sql = "update user_info(name, password, email, activate) values(?,?,?,?)"
    return query(sql, value)
}

/*通过用户名查找用户信息 user_info*/
let findDataByName = function(name) {
    let _sql = 'SELECT * FROM user_info WHERE name= ? '
    return query(_sql, name)
}

module.exports = {
    insertUser,
    findDataByName,

}
