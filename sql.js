//数据库初始化
module.exports = function () {
    const mysql = require('mysql');
    const conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'toot',
        database: 'before'
    })
    conn.connect();
    conn.query(sql, val, cb);
    conn.end();
}