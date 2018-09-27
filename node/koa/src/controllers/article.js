import mongoose from 'mongoose'
import ArticleService from '../service/article'
import {reqPath, get, put, post, del} from '../utils/routerDecorator'

let sArticle = new ArticleService();
@reqPath('/articles')
export default class Article {
    @get('/')
    async getList(ctx, next) {
        let data = await sArticle.finds();
        ctx.body = data;
    }
    @get('/:id')
    async find(ctx, next) {
        let data = await sArticle.find(ctx.params.id);
        ctx.body = data;
    }

    @put('/:id')
    async update(ctx, next) {
        let data = await sArticle.update(new mongoose.Types.ObjectId(ctx.params.id));
        ctx.body = data;
    }

    @post('/')
    async add(ctx, next) {
        await sArticle.add().then(data => {
            ctx.body = data;
        }).catch(err => {
            ctx.body = {
                error: 1,
                message: 'fail'
            }
        });
    }

    @del('/:id')
    async delete(ctx, next) {
        await sArticle.delete(ctx.params.id).then(data => {
            ctx.body = data;
        }).catch(err => {
            ctx.body = {
                error: 1,
                message: 'fail'
            }
        });
    }
}