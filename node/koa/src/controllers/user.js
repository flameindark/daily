import UserService from '../service/article'
import {reqPath, get, post} from '../utils/routerDecorator'

let sUser = new UserService();

@reqPath('/user')
export default class User {
    @get('/login')
    async login(ctx, next) {
      ctx.body = await sUser.login(ctx.request.body);
    }
    @post('/register')
    async register(ctx, next) {
      ctx.body = await sUser.register(ctx.request.body);
    }
}