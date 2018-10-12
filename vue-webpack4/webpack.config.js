'use strict'
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HappyPack = require('happypack');
const PrerenderSPAPlugin = require('prerender-spa-plugin')

module.exports = {
  entry: {
    app: './src/index.js',
    test: './src/test.js',
    pollyfill: "@babel/polyfill"
  },
  resolve: {
    alias: {
      '#': path.resolve(__dirname, 'src/styles')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.js$/,
        use: 'happypack/loader?id=js',
        exclude: file => (
          /node_modules/.test(file) &&
          !/\.vue\.js/.test(file)
        )
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ],
        // exclude: file => (
        //   /node_modules/.test(file) &&
        //   !/\.vue\.css/.test(file)
        // )
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'static/img/[name].[hash:7].[ext]'
            }
          },
          'image-webpack-loader',
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/fonts/[name].[hash:7].[ext]'
        }
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root:  path.resolve(__dirname),
      dry: true
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html', // 打包后生成的文件名
      chunks: [
        'app', 'vendors', 'commons', 'runtime'
      ],
      template: path.resolve(__dirname, 'index.html'), // 使用的模板
      hash:true,//防止缓存
      // 压缩
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'test/index.html', // 打包后生成的文件名
      chunks: [
        'test', 'vendors', 'commons', 'runtime'
      ],
      template: path.resolve(__dirname, 'index.html'), // 使用的模板
      hash:true,//防止缓存
      // 压缩
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }),
    new VueLoaderPlugin(),
    new HappyPack({
      id: 'js',
      threads: 4,
      loaders: ['babel-loader?cacheDirectory']
    }),
    new PrerenderSPAPlugin({
      staticDir: path.join(__dirname, 'dist'),
      routes: [ '/Contact' ], // 需要预渲染的路由（视你的项目而定）
      minify: {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        decodeEntities: true,
        keepClosingSlash: true,
        sortAttributes: true
      }
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            warnings: false
          }
        },
        sourceMap: true,
        parallel: true
      }),
      new OptimizeCssAssetsPlugin({})
    ],
    runtimeChunk: 'single'
  },
  devServer: {
    clientLogLevel: 'warning', // 日志的级别
    historyApiFallback: {
      rewrites: [
        // { from: /.*/, to: path.posix.join('/app/', 'index.html') },  // 重定向逻辑，静态资源的重定向
      ],
    },
    hot: true,  // 开启热更新
    // contentBase: path.join(__dirname, 'dist'), // 编译之后的的路径，可以禁用
    contentBase: false, // 编译之后的的路径，可以禁用
    compress: true, // 开启gzip压缩
    host: '127.0.0.1', // 域名
    port: '8686', // 端口
    open: true, // 编译完自动打开浏览器
    overlay: { warnings: false, errors: true }, // 在警告时不弹出overlay，错误时弹出
    // publicPath: '/app/', // 应用根路径
    proxy: {
      // '/api': 'http://localhost:3000'  // 代理，可以配置跨域
    },
    quiet: true, // 除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见。
    watchOptions: {
      poll: false, // 是否使用轮询的方式监听文件变动(针对某些无法监听到文件变动时时使用)
    }
  },
  // 监听打包
  watch: true,
  watchOptions: {
    ignored: /node_modules/, //忽略不用监听变更的目录
    aggregateTimeout: 500, //防止重复保存频繁重新编译,500毫米内重复保存不打包
    poll:1000 //每秒询问的文件变更的次数
  },
}

if (process.env.NODE_ENV === 'production') {
  console.log('-----------------')
  module.exports.output = {
    path: path.resolve(__dirname, 'dist'), // 打包的路径
    filename: 'static/js/[name]-[chunkhash].bundle.js' // 打包生成的文件名 [name] -> entry的键值 这里就是 'app'
  }
  module.exports.plugins.push(
    new BundleAnalyzerPlugin(), // 打包分析插件
    new webpack.HashedModuleIdsPlugin(),
    new MiniCssExtractPlugin({
      chunkFilename: "static/css/[name]-[chunkhash].css",
      filename:  'static/css/[name]-[chunkhash].css' // 生成的css文件名
    })
  )
} else {
  console.log('++++++++++')
  module.exports.output = {
    path: path.resolve(__dirname, 'dist'), // 打包的路径
    filename: 'static/js/[name].bundle.js' // 打包生成的文件名 [name] -> entry的键值 这里就是 'app'
  }
  module.exports.plugins.push(
    new webpack.HotModuleReplacementPlugin(), // 热更新插件，供devserver使用
    new MiniCssExtractPlugin({
      chunkFilename: "static/css/[name].css",
      filename:  'static/css/[name].css' // 生成的css文件名
    }),
  )
}

