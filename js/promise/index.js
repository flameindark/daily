// 单纯的简单的实现仅仅就是依次调用回调函数
function Promise1(fn) {
    var value = null,
        callbacks = []; //then中的函数都会加入回调函数里面

    this.then = function(onFulFilled) {
        callbacks.push(onFulFilled);
        return this; // 能够实现链式调用
    }
    function resolve(value) {
        console.log(callbacks)
        callbacks.forEach(function(callback) {
            callback(value) //依次调用then里面的函数（但是这里如果是再来个Promise就不能按照期待的方式运行了）
        })
    }
    fn(resolve)
}

//加入延时机制及状态处理
function Promise2(fn) {
    var value = null,
        state = 'pending', //加入状态控制
        callbacks = [];

    this.then = function(onFulFilled) {
        if(state === 'pending') {
            callbacks.push(onFulFilled);
            return this;
        }
        onFulFilled(value); //如果是非pending状态(这里即fulfilled状态)，就执行then里面的回调函数
        return this
    }
    function resolve(newVal) {
        value = newVal;
        state = 'fulfilled';
        setTimeout(function() {
            callbacks.forEach(function(callback) {
                callback(value)
            })
        }, 0) //利用js的执行机制，等promise里的同步的任务执行完再执行then里面的函数
    }
    fn(resolve)
}

// 加入链式Promise
function Promise3(fn) {
    var value = null,
        state = 'pending',
        callbacks = [];

    this.then = function(onFulFilled) {
        return new Promise(function(resolve) {
            handle( {
                onFulFilled: onFulFilled || null,
                resolve: resolve
            })
        })
    }
    function handle(callback) {
        if (state === 'pending') {
            callbacks.push(callback);
            return;
        }
        // 如果then没有传任何东西
        if(!callback.onFulFilled) {
            callback.resolve(value);
            return;
        }

        var ret = callback.onFulFilled(value);
        callback.resolve(ret);
    }
    function resolve(newVal) {
        if(newVal && (typeof newVal === 'object' || typeof newVal === 'function')) {
            var then = newVal.then;
            if(typeof then === 'function') {
                // 上面的逻辑判断是否有then方法以此来判断是否为Promise的链式调用
                then.call(newVal, resolve);
                // 执行新的promise的resolve方法
                return;
            }
        }
        value = newVal;
        state = 'fulfilled';
        setTimeout(function() {
            callbacks.forEach(function(callback) {
                handle(callback)
            })
        }, 0)
    }
    fn(resolve)
}
// 06.05今日Promise链式调用的一部分代码没有理解通透

// 失败的处理
function Promise4(fn) {
    var value = null,
        state = 'pending',
        callbacks = [];

    this.then = function(onFulFilled, onRejected) {
        return new Promise(function(resolve) {
            handle( {
                onFulFilled: onFulFilled || null,
                onRejected: onRejected || null,
                resolve: resolve,
                reject: reject
            }) // 将状态和回调函数传入，根据状态执行不同的回调
        })
    }
    function handle(callback) {
        if (state === 'pending') {
            callbacks.push(callback);
            return;
        }
        
        var cb = state === 'fulfilled' ? callback.onFulFilled : callback.onRejected,
        ret;
        // 对这段代码进行相应的改写
        // if(!callback.onFulFilled) {
        //     callback.resolve(value);
        //     return;
        // }
        if(cb === null) {
            cb = state === 'fulfilled' ? callback.resolve : callback.reject;
            cb(value);
            return;
        }

        var ret = cb(value);
        callback.resolve(ret);
    }
    function resolve(newVal) {
        if(newVal && (typeof newVal === 'object' || typeof newVal === 'function')) {
            var then = newVal.then;
            if(typeof then === 'function') {
                // 上面的逻辑判断是否有then方法以此来判断是否为Promise的链式调用
                then.call(newVal, resolve);
                // 执行新的promise的resolve方法
                return;
            }
        }
        value = newVal;
        state = 'fulfilled';
        
    }
    function reject(reject) {
        state = 'rejected';
        value = reason;
        execute();
    }   

    function execute() {
        setTimeout(function() {
            callbacks.forEach(function(callback) {
                handle(callback)
            })
        }, 0);
    }

    fn(resolve, reject)
}

// 异常处理（执行回调时代码报错，通过try-catch捕获，将状态设置成reject）
// 做法就是改写上面的handle方法
function handle(callback) {
    if (state === 'pending') {
        callbacks.push(callback);
        return;
    }
    
    var cb = state === 'fulfilled' ? callback.onFulFilled : callback.onRejected,
    ret;
    if(cb === null) {
        cb = state === 'fulfilled' ? callback.resolve : callback.reject;
        cb(value);
        return;
    }
    // 将下面两行用try catch来做错误的处理，报错就调用reject方法
    // var ret = cb(value);
    // callback.resolve(ret);
    try {
        ret = cb(value);
        callback.resolve(ret);
    } catch (e) {
        callback.reject(e);
    } 
}
module.exports =  {
    Promise1,
    Promise2,
    Promise3,
    Promise4
}