import erroHandle from  './middlewares/errorHandle';
import log from './middlewares/log'
import router from './router'
import koa from 'koa';
import fs from 'fs'
import koaJwt from 'koa-jwt'

const secret = 'flameindark';
const user = {
  name: 123,
  age: 2
}

// 实例化koa
var app = new koa();

// 日志
app.use(log);
// 拦截某些路由
app.use(function(ctx, next){
  if (ctx.url.match(/^\/public/)) {
    ctx.body = 'unprotected\n';
  } else {
    return next();
  }
});

// 登录验证
app.use(koaJwt({
    secret,
  }).unless({
    path: [/\/register/, /\/login/, /^\/public/],
  })
)
// 错误处理
app.use(erroHandle);

// 路由
app.use(router.routes())
// 监听3000端口
app.listen(3000)