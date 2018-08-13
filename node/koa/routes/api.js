import Router from 'koa-router'
import jwt from 'jsonwebtoken'
import {secret} from '../config'
let router = new Router();

// 请求接口
router.get('/', (ctx, next) => {
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

export default router