const path = require('path')

module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, 'src/index.jsx'), //入口文件
    output: {
        //打包文件保存位置
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    module: {
        // loaders
        rules: [{ 
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env', 'react'],
                    plugins: ['transform-decorators-legacy', 'transform-class-properties']
                }
            }
        }]
    },
    devtool: 'inline-source-map'
}