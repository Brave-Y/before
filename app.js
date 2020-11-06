//初始化
const express = require('express');
const utility = require('utility');
const app = express();
app.listen(3006, () => {
    console.log('服务器启动了')
});
//加载数据库
const sql = require('./sql')
//配置
app.use(express.urlencoded({ extended: false }))
//--------------------------------注册
app.post('/api/register', (req, res) => {
    // console.log(req.body)
    req.body.password = utility.md5(req.body.password)
    sql('insert into user set ?', req.body, (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.send({ status: 200, message: '注册成功' })
        } else {
            res.send({ status: 201, message: '注册失败' })
        }
    })
})

//---------------------登录
app.post('/api/login', (req, res) => {
    //console.log(req.body)
    let username = req.body.username;
    let password = utility.md5(req.body.password);
    sql('select * from user where username=? and password=?', [username, password], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send({
                status: 200,
                message: '登陆成功'
            })
        } else {
            res.send({
                status: 201,
                message: '登录失败'
            })
        }
    })
})