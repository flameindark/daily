// 错误处理
import erroHandle from  './middlewares/errorHandle';
const secret = 'flameindark';
const user = {
  name: 123,
  age: 2
}
const koa = require('koa');
const fs = require('fs');
var koaJwt = require('koa-jwt');
var jwt = require('jsonwebtoken');
var app = new koa();

// 统计请求用时
app.use(async (ctx, next) => {
  const start = Date.now();
  // console.log(ctx.header)
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use(erroHandle);
app.use((ctx, next) => {
  koaJwt({
    secret,
  }).unless({
    path: [/\/register/, /\/login/, /^\/public/],
  })
  next();
}) 

app.use((ctx, next) => {
  if(ctx.request.url === "/login") {
    ctx.body = {
      message: '登录成功',
      token: jwt.sign({
        data: user,
        exp: Math.floor(Date.now() / 1000) + 20, // 60 seconds * 60 minutes = 1 hour
      }, secret),
    }
  }
  next();
})
// 拦截某些路由
app.use(function(ctx, next){
  if (ctx.url.match(/^\/public/)) {
    ctx.body = 'unprotected\n';
  } else {
    return next();
  }
});
app.use(async function(ctx){
  if (ctx.url.match(/^\/api/)) {
    const token = ctx.header.authorization  // 获取jwt
    let payload
    if (token) {
      try {
        payload = await jwt.verify(token.split(' ')[1], secret)  // // 解密，获取payload
        ctx.body = {
          payload
        }
      } catch(e) {
        if(e.name === 'TokenExpiredError') {
          ctx.body = '登录信息已经过期啦，请重新登录'
        }
      }
    } else {
        ctx.body = {
            message: 'token 错误',
            code: -1
        }
    }
    // ctx.body = 'protected\n';
  }
});

app.listen(3000)