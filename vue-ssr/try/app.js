const Vue = require('vue')
module.exports = function createApp() {
    // 会将vue的template转换成html，插入到页面模板中模板
    return new Vue({
        data: {
            url: 'test'
        },
        template: `<div>访问的 URL 是： {{ url }}</div>`
    })
}
