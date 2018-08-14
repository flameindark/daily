import Router from 'koa-router'
import Redis from 'ioredis'
import mongoose, { Schema } from 'mongoose'
import Article from '../models/article'
import ArticleService from '../service/article'
import {reqPath, get} from '../utils/routerDecorator'

let router = new Router();
var redis = new Redis();

let sArticle = new ArticleService();

// @reqPath('/save')
// export default class SaveRouter {
//     @get('/list')
//     getList(ctx, next) {
//         sArticle.getList(ctx, next);
//     }
// }

// // 请求接口
// router.get('/list', (ctx, next) => {
//     console.log(new sArticle())
//     let serveiceArticle = new sArticle();
//     serveiceArticle.getList(ctx, next)
// })

// router.get('/', (ctx, next) => {
//     // 链接mongodb
//     let db = mongoose.connection;
//     // 链接成功回调
//     db.once('open', function() {
//         // we're connected!
//         console.log('连接成功')
//         let article = new Article({ 
//             content: '测试',
//             title: '标题',
//             tags: ['node', 'javascript'],
//             category: ['小时'],
//             readNum: 1   
//         });
//         // Article.findById(new mongoose.Types.ObjectId('5b724fb17338772d70ae3372'),function (err, found) {
//         //     console.log(found);
//         // })
//         Article.update(Article.findById(new mongoose.Types.ObjectId('5b724fb17338772d70ae3372')), { 
//             content: '测试123',
//             title: '标题123',
//             tags: ['node1', 'javascript1'],
//             category: ['小时1'],
//             readNum: 3 
//          }).exec(
//             function(err) {
//                 if (err) console.log(err);
//                 else {
//                     console.log('修改成功')
//                 }
//             }
//         );
//         // article.save(function (err) {
//         //     if (err) console.log(err);
//         //     else {
//         //         console.log('存储成功')
//         //     }
//         // });
//     });
//     // 开始连接
//     mongoose.connect('mongodb://localhost/test');

    

//     // redis.pipeline([
//     //     ['set', 'foo', 'bar'],
//     //     ['get', 'foo']
//     // ]).exec(function (t, s) {
//     //     console.log(s);
//     // });
// })

// export default router