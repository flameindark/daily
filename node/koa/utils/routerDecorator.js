import Router from 'koa-router'
import glob from 'glob'
import {controllersPath} from '../config'
import {resolve} from 'path'

const allRouters = new Map()
let router = new Router();

// controller的请求基础目录
const symbolPrefix = Symbol('prefix');
const reqPath = path => target =>{
  target.prototype[symbolPrefix]=path;
}

// 方法修饰器
const method = conf => (target, name, descriptor) => {
  allRouters.set({
    target,
    ...conf
  }, target[name])
}

const createAllRoutes = function(apiPath) {
  let router = new Router();
  glob.sync(resolve(controllersPath)).forEach(require);
  for(let [conf,controller] of allRouters){
    let prefixPath= conf.target[symbolPrefix]
    const routerPath = prefixPath+conf.path;
    router[conf.method](routerPath,controller)
  }
  return router.routes();
}

export {
  reqPath,
  method,
  createAllRoutes
}