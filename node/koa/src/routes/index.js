
import Router from 'koa-router'
import user from './user'
import upload from './upload'
import api from './api'
import save from './save'


var router = new Router();

router.use('/user',user.routes(),user.allowedMethods())
router.use('/upload',upload.routes(),upload.allowedMethods())
router.use('/api',api.routes(),api.allowedMethods())
// router.use('/save',save.routes(),save.allowedMethods())

// 404路由
router.get('/*', (ctx,next)=> {
  ctx.throw(404)
})
export default router;