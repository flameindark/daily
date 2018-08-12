
import Router from 'koa-router'
import jwt from 'jsonwebtoken'


const secret = 'flameindark';
const user = {
  name: 123,
  age: 2
}


var router = new Router();
// 登录路由
router.get('/login', (ctx, next) => {
    ctx.body = {
      message: '登录成功',
      token: jwt.sign({
        data: user,
        exp: Math.floor(Date.now() / 1000) + 15, // 60 seconds * 60 minutes = 1 hour
      }, secret),
    }
  })
  
  // 请求接口
router.get('/api', (ctx, next) => {
    const token = ctx.header.authorization  // 获取jwt
    let payload
    if (token) {
      try {
        payload =  jwt.verify(token.split(' ')[1], secret)  // // 解密，获取payload
        ctx.body = {
          payload
        }
      } catch(e) {
        console.log(e)
        if(e.name === 'TokenExpiredError') {
          ctx.body = '登录信息已经过期啦，请重新登录'
        } else {
          ctx.body = e.message;
        }
      }
    } else {
        ctx.body = {
          message: 'token 错误',
          code: -1
        }
    }
})

export default router;