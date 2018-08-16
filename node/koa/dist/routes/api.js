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

// 请求接口
router.get('/', function (ctx, next) {
  var token = ctx.header.authorization; // 获取jwt
  var payload = void 0;
  if (token) {
    try {
      payload = _jsonwebtoken2.default.verify(token.split(' ')[1], _config.secret); // // 解密，获取payload
      ctx.body = {
        payload: payload
      };
    } catch (e) {
      console.log(e);
      if (e.name === 'TokenExpiredError') {
        ctx.body = '登录信息已经过期啦，请重新登录';
      } else {
        ctx.body = e.message;
      }
    }
  } else {
    ctx.body = {
      message: 'token 错误',
      code: -1
    };
  }
});

exports.default = router;