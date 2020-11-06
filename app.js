//初始化
const express = require('express');
const app = express();
app.listen(3006, () => {
    console.log('服务器启动了')
});
//对token进行解密，目的是获取用户信息中保存的id
const jwt = require('express-jwt')
//讲token解密，并且用户储存的数据直接复制给了req.user
app.use(jwt({
    secret: 'brave',
    algorithms: ['HS256'],
}).unless({
    // path: ['/api/login', '/api/reguser']
    path: /^\/api/
})
)
//配置
app.use(express.urlencoded({ extended: false }))
//加载touter模块---注册
let loginRouter = require('./router/login')
app.use('/api', loginRouter)
//加载--个人中心
let userRouter = require('./router/user')
app.use('/my', userRouter)
// 错误处理中间件
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send({ stauts: 1, message: '身份认证失败！' });
    }
});