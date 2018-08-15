import Router from 'koa-router'
import Redis from 'ioredis'
import mongoose, { Schema } from 'mongoose'
import Article from '../models/article'
import ArticleService from '../service/article'
import {reqPath, get, put, post, del} from '../utils/routerDecorator'

let router = new Router();
var redis = new Redis();

let sArticle = new ArticleService();


@reqPath('/save')
export default class Upload {
    @post('/')
    async add(ctx, next) {
        await sArticle.add(ctx.request.body).then(data => {
            ctx.body = data;
        }).catch(err => {
            ctx.body = {
                error: 1,
                message: 'fail'
            }
        });
    }
}