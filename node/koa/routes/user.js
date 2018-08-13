import Router from 'koa-router'
import jwt from 'jsonwebtoken'
import {secret} from '../config'

let router = new Router();
const user = {
  name: 'test',
  age: 12
}

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

export default router