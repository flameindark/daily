'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _desc, _value, _class2;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _article = require('../service/article');

var _article2 = _interopRequireDefault(_article);

var _routerDecorator = require('../utils/routerDecorator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

var sArticle = new _article2.default();
var SaveRouter = (_dec = (0, _routerDecorator.reqPath)('/article'), _dec2 = (0, _routerDecorator.get)('/list'), _dec3 = (0, _routerDecorator.get)('/:id'), _dec4 = (0, _routerDecorator.put)('/:id'), _dec5 = (0, _routerDecorator.post)('/'), _dec6 = (0, _routerDecorator.del)('/:id'), _dec(_class = (_class2 = function () {
    function SaveRouter() {
        _classCallCheck(this, SaveRouter);
    }

    _createClass(SaveRouter, [{
        key: 'getList',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx, next) {
                var data;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return sArticle.finds();

                            case 2:
                                data = _context.sent;

                                ctx.body = data;

                            case 4:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getList(_x, _x2) {
                return _ref.apply(this, arguments);
            }

            return getList;
        }()
    }, {
        key: 'find',
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(ctx, next) {
                var data;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return sArticle.find(ctx.params.id);

                            case 2:
                                data = _context2.sent;

                                ctx.body = data;

                            case 4:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function find(_x3, _x4) {
                return _ref2.apply(this, arguments);
            }

            return find;
        }()
    }, {
        key: 'update',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3(ctx, next) {
                var data;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return sArticle.update(new _mongoose2.default.Types.ObjectId(ctx.params.id));

                            case 2:
                                data = _context3.sent;

                                ctx.body = data;

                            case 4:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function update(_x5, _x6) {
                return _ref3.apply(this, arguments);
            }

            return update;
        }()
    }, {
        key: 'add',
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee4(ctx, next) {
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.next = 2;
                                return sArticle.add().then(function (data) {
                                    ctx.body = data;
                                }).catch(function (err) {
                                    ctx.body = {
                                        error: 1,
                                        message: 'fail'
                                    };
                                });

                            case 2:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function add(_x7, _x8) {
                return _ref4.apply(this, arguments);
            }

            return add;
        }()
    }, {
        key: 'delete',
        value: function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee5(ctx, next) {
                return _regenerator2.default.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                _context5.next = 2;
                                return sArticle.delete(ctx.params.id).then(function (data) {
                                    ctx.body = data;
                                }).catch(function (err) {
                                    ctx.body = {
                                        error: 1,
                                        message: 'fail'
                                    };
                                });

                            case 2:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function _delete(_x9, _x10) {
                return _ref5.apply(this, arguments);
            }

            return _delete;
        }()
    }]);

    return SaveRouter;
}(), (_applyDecoratedDescriptor(_class2.prototype, 'getList', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'getList'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'find', [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, 'find'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'update', [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, 'update'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'add', [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, 'add'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, 'delete', [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, 'delete'), _class2.prototype)), _class2)) || _class);
exports.default = SaveRouter;