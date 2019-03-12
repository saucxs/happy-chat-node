const mysql = require('mysql');
const dbConfig = require('../config').db;
const mysqlpool = mysql.createPool({
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    host: dbConfig.host
});

let query = function (sql, values) {
    return new Promise((resolve => {
        mysqlpool.getConnection(function (err, connection) {
            if(err){
                resolve(err);
            }else{
                connection.query(sql, values, (err, rows) => {
                    if(err){
                        reject(err)
                    }else{
                        resolve(rows);
                    }
                    connection.release();
                })
            }
        })
    }))
}

export.exports = {
    query
}
