// 1. 纯函数
// 类似于以下这种，只要输入确定了就唯一确定了（有点类似数学中的函数,x确定了，y就唯一确定了），
// 并且不会对外界造成影响，无副作用(不会更改函数作用域外的对象和环境)
function add(x, y) {
    return x + y
}

// 函数柯里化,将一部分的参数固定。
function CurryAdd(x) {
    return function(y) {
       return x + y
    }
}
let add2 = new CurryAdd(2);
console.log(add2(6))


// 2. 高阶函数(函数当参数，返回封装的函数)
// 2.1 等价函数
function __equal__(fn) {
    return function(...args) {
        console.log('之前干点啥~~')
        let res = fn.apply(this, args);
        console.log('之后干点啥') // 这个貌似不会在后面才执行
        return res;
    }
}

let addNew = __equal__(add);
console.log(add(1, 3))
console.log(addNew(1, 3))

// TODO: 明儿个继续 https://juejin.im/post/5b26a8b66fb9a00e925bcf30?utm_source=gold_browser_extension#heading-1