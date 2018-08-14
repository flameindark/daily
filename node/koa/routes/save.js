import Router from 'koa-router'
import Redis from 'ioredis'

let router = new Router();
var redis = new Redis();

// 请求接口
router.get('/', (ctx, next) => {
    
    redis.pipeline([
        ['set', 'foo', 'bar'],
        ['get', 'foo']
    ]).exec(function (t, s) {
        console.log(s);
    });
})

export default router