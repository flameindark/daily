// 感觉下面这个依然未达到要求
// 如果所依赖的模块的代码在该代码的后面引用会导致引用不到

function require(p){
    var path = require.resolve(p);
    var mod = require.modules[path];
    if (!mod) throw new Error('failed to require "' + p + '"');
    if (!mod.exports) {
        mod.exports = {};
        // 通过下面这个将要导出的函数赋值给mod.exports(主要是第二个参数)
        mod.call(mod.exports, mod, mod.exports);
    }
    return mod.exports;
}

require.modules = {};

require.resolve = function (path){
// 解析path, 解析顺序 [path].js  [path]/index.js  [path]
var orig = path;
var reg = path + '.js';
var index = path + '/index.js';
return require.modules[reg] && reg
    || require.modules[index] && index
    || orig;
};

// 注册模块,将模块的代码赋到require.modeles里面
require.register = function (path, fn){
    require.modules[path] = fn;
};