// import {
//  Promise1,
//  Promise2,
//  Promise3,
//  Promise4
// } from './js/promise/index.js'

const assert = require('assert');

// 测试套件
it('Promise done', function(done) {
    // 这里写测试代码
    // setImmediate(done);
    setImmediate(done);
});

it('should complete this test', function (done) {
    return new Promise(function (resolve) {
        assert.ok(true);
        resolve();
    })
    .then(done);
});