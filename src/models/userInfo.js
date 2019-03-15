const {query} = require('../utils/db');

/*注册用户-未激活*/
let insertUser= function (value) {
    let sql = "insert into user_info(name, password, email, activate, activateCode) values(?,?,?,?,?)"
    return query(sql, value)
}

/*注册用户-激活*/
let activateUser= function (activate, activateDate, email) {
    console.log(activate, email, 'activateCode--------------------')
    let sql = "update user_info SET activate = ?, activateDate = ? WHERE email = ? "
    return query(sql, [activate, activateDate, email])
}

/*通过用户名查找用户信息 user_info*/
let findDataByName = function(name) {
    let _sql = 'SELECT * FROM user_info WHERE name= ? '
    return query(_sql, name)
}
/*通过activateCode查找用户信息 user_info*/
let findDataByActivateCode = function(activateCode) {
    let _sql = 'SELECT * FROM user_info WHERE activateCode= ? '
    return query(_sql, activateCode)
}


module.exports = {
    insertUser,
    activateUser,
    findDataByName,
    findDataByActivateCode

}
