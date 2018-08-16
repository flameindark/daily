'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _errorHandle = require('./middlewares/errorHandle');

var _errorHandle2 = _interopRequireDefault(_errorHandle);

var _log = require('./middlewares/log');

var _log2 = _interopRequireDefault(_log);

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaBodyparser = require('koa-bodyparser');

var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

var _koaCors = require('koa-cors');

var _koaCors2 = _interopRequireDefault(_koaCors);

var _routerDecorator = require('./utils/routerDecorator');

var _connectDB = require('./utils/connectDB');

var _path = require('path');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// 实例化koa
var app = new _koa2.default();

// 连接数据库
_asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _connectDB.connect)();

        case 2:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined);
}))();

// 错误处理
app.use(_errorHandle2.default);

// 日志
app.use(_log2.default);

// 运行跨域
app.use((0, _koaCors2.default)());

// body参数解析
app.use((0, _koaBodyparser2.default)());

// // 将文件二进制流写入body
// app.use(koaBody({
//   multipart: true
// }));

// 登录验证
// app.use(koaJwt({
//     secret,
//   }).unless({
//     path: [/\/register/, /\/login/, /^\/public/ ],
//   })
// )


// 路由
app.use((0, _routerDecorator.createAllRoutes)((0, _path.resolve)(__dirname, './controllers/*.js')));

// 监听3000端口
app.listen(3000);