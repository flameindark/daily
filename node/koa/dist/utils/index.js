'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readFileThunk = readFileThunk;
exports.connectDB = connectDB;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function readFileThunk(src) {
  return new Promise(function (resolve, reject) {
    _fs2.default.readFile(src, 'binary', function (err, data) {
      if (err) return reject(err);
      resolve(data);
    });
  });
}

function connectDB() {

  // 链接mongodb
  var db = mongoose.connection;

  // 开始连接
  mongoose.connect('mongodb://localhost/test');
}