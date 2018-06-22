require.register('b', function(module, exports, require) {
    module.exports = function(x) {
        console.log(x);
    }
})