const express = require('express');
const sql = require('../sql');
const router = express.Router();
//------------更新用户信息
router.get('/userinfo', (req, res) => {
    console.log(req.user)
    sql('select * from user where id=?', req.user.id, (err, result) => {
        if (err) throw err;
        res.send({
            status: 200,
            message: '获取用户信息',
            data: result[0],
        })
    })
})
//-----------重置密码

//-------------更换头像
router.post('/updata/pic', (req, res) => {
    sql('update user set userpic=? where id=?', [req.body.pic, req.user.id], (err, result) => {
        if (err) throw err;
        console.log(result)
        if (result.changedRows > 0) {
            res.send({ status: 0, message: '修改头像成功' });
        } else {
            res.send({ status: 1, message: '修改头像失败' });
        }
    })
})
module.exports = router;


