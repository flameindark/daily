import erroHandle from  './middlewares/errorHandle';
import log from './middlewares/log'
import koa from 'koa';
import bodyparser from 'koa-bodyparser'
import cors from 'koa-cors'
import {createAllRoutes} from './utils/routerDecorator'
import {connect} from './utils/connectDB'

// 实例化koa
var app = new koa();

// 连接数据库
(async () => {
  await connect()
})()

// 错误处理
app.use(erroHandle);

// 日志
app.use(log);

// 运行跨域
app.use(cors());

// body参数解析
app.use(bodyparser())

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
app.use(createAllRoutes())

// 监听3000端口
app.listen(3000)