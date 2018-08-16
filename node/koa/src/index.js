import erroHandle from  './middlewares/errorHandle';
import log from './middlewares/log'
import koa from 'koa';
import bodyparser from 'koa-bodyparser'
import cors from 'koa-cors'
import {createAllRoutes} from './utils/routerDecorator'
import {connect} from './utils/connectDB'
import {resolve} from 'path'
import koaJwt from 'koa-jwt'
import {secret} from './config'
import upload from './service/upload'
import serve from 'koa-static'
import {uploadPath} from './config'

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

// 登录验证
// app.use(koaJwt({
//     secret,
//   }).unless({
//     path: [/\/user\/register/, /\/user\/login/, /^\/public/ ],
//   })
// )


// 路由
let router = createAllRoutes(resolve(__dirname, './controllers/*.js'));
// 上传文件路由
router.use('/upload',upload.routes(),upload.allowedMethods())

app.use(router.routes(), router.allowedMethods())


app.use(serve(uploadPath))

// 监听3000端口
app.listen(3000)