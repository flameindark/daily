
function log(target) {
    console.log(target.prototype)
    const desc = Object.getOwnPropertyDescriptors(target.prototype);
    console.log(desc)
    for (const key of Object.keys(desc)) {
        if(key === 'constructor') {
            continue;
        }

        const func  = desc[key].value;

        if('function' === typeof func) {
            Object.defineProperty(target.prototype, key, {
                value(...args) {
                    console.log( 'before' + key);
                    const ret = func.apply(this, args);
                    console.log('after' + key)
                    return ret
                }
            })
        }
    }
}


@log
class Numberic {
    PI = 33.1415926;

    add(...nums) {
        return nums.reduce((p, n) => (p + n), 0)
    }
}
new Numberic().add(1, 2)