'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _koaRouter2.default();
var user = {
  name: 'test',
  age: 12

  // 登录路由
};router.get('/login', function (ctx, next) {
  ctx.body = {
    message: '登录成功',
    token: _jsonwebtoken2.default.sign({
      data: user,
      exp: Math.floor(Date.now() / 1000) + 15 // 60 seconds * 60 minutes = 1 hour
    }, _config.secret)
  };
});

exports.default = router;