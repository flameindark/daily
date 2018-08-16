'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initSchema = initSchema;
exports.connect = connect;

var _config = require('../config');

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function initSchema() {
  var files = glob.sync(resolve(__dirname, './schema', './*.js')).forEach(require);
}

function connect() {
  console.log(_config.DbConfig);
  return new Promise(function (resolve, reject) {
    _mongoose2.default.connect(_config.DbConfig.url);
    _mongoose2.default.connection.on('error', function (err) {
      throw new Error('数据库连接失败');
    });

    _mongoose2.default.connection.once('open', function () {
      console.log('链接成功');
      resolve();
    });
  });
}