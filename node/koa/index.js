import erroHandle from  './middlewares/errorHandle';
import log from './middlewares/log'
import router from './routes/'
import koa from 'koa';
import koaJwt from 'koa-jwt'
import koaBody from 'koa-body'
import multer from 'koa-multer'
import cors from 'koa-cors'

const secret = 'flameindark';
const user = {
  name: 123,
  age: 2
}

// 实例化koa
var app = new koa();


// 错误处理
app.use(erroHandle);

// 日志
app.use(log);

// 运行跨域
app.use(cors());

// // 将文件二进制流写入body
// app.use(koaBody({
//   multipart: true
// }));

// 登录验证
// app.use(koaJwt({
//     secret,
//   }).unless({
//     path: [/\/register/, /\/login/, /^\/public/ ],
//   })
// )


// 路由
app.use(router.routes(), router.allowedMethods())

// 监听3000端口
app.listen(3000)