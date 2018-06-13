// 使用自定义的Markdownloader处理markdown文件
import markdown from  '../md/index.md';

// console.log(markdown.html)
// var oDiv = document.createElement('div');
// var app = document.getElementById('app');
// oDiv.innerHTML =  markdown.html;
// app.appendChild(oDiv);
var container = document.getElementById("app");

container.innerHTML = markdown;