import Router from 'koa-router'
import Redis from 'ioredis'
import mongoose, { Schema } from 'mongoose'
import Article from '../models/article'
import ArticleService from '../service/article'
import {reqPath, method} from '../utils/routerDecorator'

let router = new Router();
var redis = new Redis();

let sArticle = new ArticleService();


@reqPath('/save')
export default class SaveRouter {
    @method({
        method: 'get',
        path: '/list'
    })
    async getList(ctx, next) {
        let data = await sArticle.finds();
        ctx.body = data;
    }
    @method({
        method: 'get',
        path: '/:id'
    })
    async find(ctx, next) {
        let data = await sArticle.find(ctx.params.id);
        ctx.body = data;
    }

    @method({
        method: 'post',
        path: '/:id'
    })
    async update(ctx, next) {
        let data = await sArticle.update(new mongoose.Types.ObjectId(ctx.params.id));
        ctx.body = data;
    }
}