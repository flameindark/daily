import UserService from '../service/user'
import {reqPath, get, post} from '../utils/routerDecorator'

let sUser = new UserService();
@reqPath('/user')
export default class User {
  @get('/login')
  async login(ctx, next) {
    console.log(sUser)
    ctx.body = await sUser.login(ctx.request.body);
  }
  @post('/register')
  async register(ctx, next) {
    console.log('********')
    await sUser.register(ctx.request.body).then(data => {
      ctx.body = {
        error: 0,
        data: data
      }
    }).catch(err => {
      ctx.body = {
        error: 1,
        data: err
      }
    });
  }
}