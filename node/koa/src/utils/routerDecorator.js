import Router from 'koa-router'
import glob from 'glob'
import {resolve} from 'path'

const allRouters = new Map()
let router = new Router();

// controller的请求基础目录
const symbolPrefix = Symbol('prefix');

const reqPath = path => target =>{
  target.prototype[symbolPrefix]=path;
}

const addMethod =  conf =>  (target, name, descriptor) => {
  allRouters.set({
    target,
    ...conf
  }, target[name])
}

// 方法修饰器
const get = path => {
  return addMethod({
    method: 'get',
    path: path
  })
}

const post = path => {
  return addMethod({
    method: 'post',
    path: path
  })
}

const put = path => {
  return addMethod({
    method: 'put',
    path: path
  })
}

const del = path => {
  return addMethod({
    method: 'delete',
    path: path
  })
}

const createAllRoutes = function(controllersPath) {
  let router = new Router();
  glob.sync(resolve(controllersPath)).forEach(require);
  for(let [conf,controller] of allRouters){
    let prefixPath= conf.target[symbolPrefix]
    const routerPath = prefixPath+conf.path;
    router[conf.method](routerPath,controller)
  }
  return router;
}

export {
  reqPath,
  post,
  get,
  del,
  put,
  createAllRoutes
}