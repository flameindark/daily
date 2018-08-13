
import Router from 'koa-router'
import user from './user'
import upload from './upload'
import api from './api'


var router = new Router();
// 登录路由
// router.get('/login', (ctx, next) => {
//     ctx.body = {
//       message: '登录成功',
//       token: jwt.sign({
//         data: user,
//         exp: Math.floor(Date.now() / 1000) + 15, // 60 seconds * 60 minutes = 1 hour
//       }, secret),
//     }
//   })
  
//   // 请求接口
// router.get('/api', (ctx, next) => {
//     const token = ctx.header.authorization  // 获取jwt
//     let payload
//     if (token) {
//       try {
//         payload =  jwt.verify(token.split(' ')[1], secret)  // // 解密，获取payload
//         ctx.body = {
//           payload
//         }
//       } catch(e) {
//         console.log(e)
//         if(e.name === 'TokenExpiredError') {
//           ctx.body = '登录信息已经过期啦，请重新登录'
//         } else {
//           ctx.body = e.message;
//         }
//       }
//     } else {
//         ctx.body = {
//           message: 'token 错误',
//           code: -1
//         }
//     }
// })

// // 图片展示
// router.get('/img',  async (ctx) => {
//   let _content = await readFileThunk(__dirname + '/images/1.png');
//   ctx.type = 'image/png'
//   ctx.status = 200;
//   ctx.res.write(_content, 'binary')
//   // 如果是读取图片这种不能用下面这种
//   // ctx.body = _content;
// })

router.use('/user',user.routes(),user.allowedMethods())
router.use('/upload',upload.routes(),upload.allowedMethods())
router.use('/api',api.routes(),api.allowedMethods())

// 404路由
router.get('/*', (ctx,next)=> {
  ctx.throw(404)
})
export default router;