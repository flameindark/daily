const path = require('path')
const UglifyPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const SpritesmithPlugin = require('webpack-spritesmith')

module.exports = {
    entry: './src/1.0/index.js', //入口文件
    plugins: [
        new UglifyPlugin(), //混淆html
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './src/index.html'
        }), //使用html模板嵌入打包后的js
        new webpack.HotModuleReplacementPlugin(),
        //雪碧图的plugin设置
        new SpritesmithPlugin({
            src: {
                cwd: path.resolve(__dirname, 'src/images/ico'), //多个图片的所知地址
                glob: '*.png'
            },
            target: {
                image: path.resolve(__dirname, 'src/sprite/sprite.png'), //生成的图片放置的路径
                css: path.resolve(__dirname, 'src/sprite/sprite.less'), //生成所需的Sass/Less/Stylus mixins代码
            },
            apiOptions: {
                cssImageRef: "~sprite.png"
            }
        })
    ],
    resolve: {
        modules: [
            'node_modules',
            'spritesmith-generated'
        ]
    },
    output: {
        //打包文件保存位置
        filename: '[name].bundle01.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        // loaders
        rules: [
            { 
                test: /\.jsx?$/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                use: ['style-loader','css-loader']
            },
            {
                test: /\.(png|jpg|gif)$/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                use: {
                    loader: 'file-loader',
                    options: {

                    }
                }
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            noIeCompat: 1,
                            javascriptEnabled: true
                        }
                    }
                ]
            }
        ]
    },
    devServer:  {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
        hot: true
    }
}