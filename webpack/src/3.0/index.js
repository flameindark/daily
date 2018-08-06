var oDiv = document.createElement('div');
var app = document.getElementById('app');
let str = '';
(() => {
    str = '<div id="image">哈哈哈，我是页面11111</div>'
})()
oDiv.innerHTML = str
app.appendChild(oDiv);