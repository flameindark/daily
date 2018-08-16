'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAllRoutes = exports.put = exports.del = exports.get = exports.post = exports.reqPath = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _path = require('path');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var allRouters = new Map();
var router = new _koaRouter2.default();

// controller的请求基础目录
var symbolPrefix = Symbol('prefix');

var reqPath = function reqPath(path) {
  return function (target) {
    target.prototype[symbolPrefix] = path;
  };
};

var addMethod = function addMethod(conf) {
  return function (target, name, descriptor) {
    allRouters.set(_extends({
      target: target
    }, conf), target[name]);
  };
};

// 方法修饰器
var get = function get(path) {
  return addMethod({
    method: 'get',
    path: path
  });
};

var post = function post(path) {
  return addMethod({
    method: 'post',
    path: path
  });
};

var put = function put(path) {
  return addMethod({
    method: 'put',
    path: path
  });
};

var del = function del(path) {
  return addMethod({
    method: 'delete',
    path: path
  });
};

var createAllRoutes = function createAllRoutes(controllersPath) {
  var router = new _koaRouter2.default();
  _glob2.default.sync((0, _path.resolve)(controllersPath)).forEach(require);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = allRouters[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _slicedToArray(_step.value, 2),
          conf = _step$value[0],
          controller = _step$value[1];

      var prefixPath = conf.target[symbolPrefix];
      var routerPath = prefixPath + conf.path;
      router[conf.method](routerPath, controller);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return router.routes();
};

exports.reqPath = reqPath;
exports.post = post;
exports.get = get;
exports.del = del;
exports.put = put;
exports.createAllRoutes = createAllRoutes;