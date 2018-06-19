import './index.scss'
import 'normalize-css'
import './lodash-test1.js'


var oDiv = document.createElement('div');
var app = document.getElementById('app');
let str = '';
(() => {
    str = '<div id="image">哈哈哈，箭头函数可以用了么？</div>'
})()
oDiv.innerHTML = str
app.appendChild(oDiv);