// 1. 占用内存，出现 xxxxx的string
// var a = 12;
// function fn() {
//   var a = new Array(10000000).join('x')
//   return function () {
//     console.log(a);
//   }
// }
// var f = fn();

//2. 函数虽然没被调用，但是绑定了事件中间的属性已经出现在内存中了
// var oDiv = document.getElementById("div1");
// ~function() {
//   var fn = function() {};
//   fn.data = new Array(10000000).join('x');
// //   oDiv.onclick = fn;
// }();


// 由于是return的不会去执行这个函数，而且fn执行完之后会被回收
// function fn(){
//     var aa = 100;
//     return function(){
//         console.log(aa);
//     }
// }
// fn();

function fn(){
    var a = new Array(10000000).join('x');
    return function(){
        console.log(a);
    }
}
fn()();