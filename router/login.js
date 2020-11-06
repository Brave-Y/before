//加载数据库
const sql = require('../sql')
//加载utility模块
const utility = require('utility');
//加载jsonwebtoken模块
const jwt = require('jsonwebtoken')

//配置express模块
const express = require('express')
const router = express.Router();

//--------------------------------注册
router.post('/register', (req, res) => {
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
router.post('/login', (req, res) => {
    //console.log(req.body)
    let username = req.body.username;
    let password = utility.md5(req.body.password);
    sql('select * from user where username=? and password=?', [username, password], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send({
                status: 200,
                message: '登陆成功',
                token: 'Bearer ' + jwt.sign({ id: result[0].id }, 'brave', { expiresIn: '2h' }),
            })
        } else {
            res.send({
                status: 201,
                message: '登录失败',
            })
        }
    })
})

module.exports = router