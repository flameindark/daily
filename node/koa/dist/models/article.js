'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = new _mongoose.Schema({
  id: _mongoose.Schema.Types.ObjectId,
  content: String,
  title: String,
  createTime: { type: Date, default: Date.now },
  tags: [String],
  category: [String],
  readNum: Number
});

exports.default = _mongoose2.default.model('Article', schema);