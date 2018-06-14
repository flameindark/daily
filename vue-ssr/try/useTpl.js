
const server = require('express')()
const createApp = require('./app')


// 读取页面模板,创建一个renderer
const renderer = require('vue-server-renderer').createRenderer({
    template: require('fs').readFileSync('./index.template.html', 'utf-8')
})

// 对页面模板进行插值
const context = {
    title: 'hello',
    meta: `
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
    `
}
server.get('*', (req, res) => {
    const app = createApp();
    renderer.renderToString(app, context, (err, html) => {
        if (err) {
            res.status(500).end('Internal Server Error')
            return
        }
        res.end(html)
    })
})
  
server.listen(8080)