// 测试多页面开发
const path = require('path')
const UglifyPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const SpritesmithPlugin = require('webpack-spritesmith')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: {
        index: './src/3.0/index.js',
        other: './src/3.0/other.js',
    }, //入口文件
    plugins: [
        new UglifyPlugin(), //混淆html
        ...(() => {
            return ['index', 'other'].map(
                (item) => {
                    return new HtmlWebpackPlugin({
                        filename: `./${item}.html`,
                        template: `./src/${item}.html`,
                        minify: {
                            minifyCSS: true,
                            minifyJS: true
                        },
                        chunks: [`${item}`]
                    })
                }
                
            );
        })(),
        // new HtmlWebpackPlugin({
        //     filename: `./${item}.html`,
        //     template: `./src/${item}.html`,
        //     minify: {
        //         minifyCSS: true,
        //         minifyJS: true
        //     },
        //     "chunks": {
        //         "index": {
        //             "entry": './src/3.0/index.js'
        //         },
        //         "other": {
        //             "entry": './src/3.0/other.js'
        //         }
        //     }
        // }),
         //使用html模板嵌入打包后的js
        new webpack.HotModuleReplacementPlugin(),
        //雪碧图的plugin设置
        new SpritesmithPlugin({
            src: {
                cwd: path.resolve(__dirname, 'src/images/ico'), //多个图片的所知地址
                glob: '*.png'
            },
            target: {
                image: path.resolve(__dirname, 'src/sprite/sprite.png'), //生成的图片放置的路径
                css: path.resolve(__dirname, 'src/sprite/sprite.scss'), //生成所需的Sass/Less/Stylus mixins代码
            },
            apiOptions: {
                cssImageRef: "~sprite.png"
            }
        }),
        new ExtractTextPlugin("index.css") //生成单独css的插件最后生成的css名称
    ],
    resolve: {
        modules: ["node_modules", "sprite"]
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
                use: ['style-loader',{
                    loader: 'css-loader',
                    options: {
                        minimize: true
                    }
                }]
            },
            {
                test: /\.(png|jpg|gif)$/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 4000
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                            progressive: true,
                            quality: 65
                            },
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            webp: {
                                quality: 75
                            }
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    }, 'sass-loader']
                })
            }
        ]
    },
    devServer:  {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
        hot: true
    },
    optimization: {
        splitChunks: {
            chunks: "all" //这样会把所有模块的公共的部分分离出来成为一个单独的组件
        }
    },
    devtool: isProduction ? null : 'source-map'
}