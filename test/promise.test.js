const {
 Promise1,
 Promise2,
 Promise3,
 Promise4
} = require('../js/promise/index.js')

const assert = require('assert');
// 测试套件
it('Promise1 基础功能测试', function(done) {
    new Promise1(function(resolve, reject) {
        setTimeout(function() {
            resolve(1);
        }, 100);
    }).then(function(res) {
        done()
    })
});

it('Promise3 链式调用功能测试', function(done) {
    var a = 1;
    var pr2 = new Promise3(function(resolve, reject) {
        setTimeout(function() {
            a++;
            resolve();
        }, 100);
    }).then(function() {
        return new Promise3(function(resolve, reject) {
            setTimeout(function() {
                a++;
                resolve(1);
            }, 100);
        })
    }).then(function() {
        console.log(a);
        done();
    })
});