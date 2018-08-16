'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _upload = require('./upload');

var _upload2 = _interopRequireDefault(_upload);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _save = require('./save');

var _save2 = _interopRequireDefault(_save);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _koaRouter2.default();

router.use('/user', _user2.default.routes(), _user2.default.allowedMethods());
router.use('/upload', _upload2.default.routes(), _upload2.default.allowedMethods());
router.use('/api', _api2.default.routes(), _api2.default.allowedMethods());
// router.use('/save',save.routes(),save.allowedMethods())

// 404路由
router.get('/*', function (ctx, next) {
  ctx.throw(404);
});
exports.default = router;