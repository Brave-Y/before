//数据库初始化
module.exports = function (sql, val, cb) {
    const mysql = require('mysql');
    const conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'before'
    })
    conn.connect();
    conn.query(sql, val, cb);
    conn.end();
}