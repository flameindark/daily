###一步步使用webpack4简单打包vue

>环境： webpack4、vue2、yarn

#### 开始(若对webpack有一些了解的话请略过该步)
安装依赖
``` bash
#初始化
yarn init 

#webpack4中需要安装webpack-cli 
yarn add webpack webpack-cli -D

#添加vue
yarn add vue
```

添加入口文件，src>index.js，为了测试先简单如下
```
// src>index.js
import Vue from 'vue'
console.log(Vue)
```

添加基础配置文件, webpack.config.js(webpack默认加载的配置文件名称，如果换名字的话后面执行webpack命令需指定配置文件名)
```
// webpack.config.js
const path = require('path')

module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'), // 打包的路径
    filename: '[name]-[hash].js' //打包生成的文件名 [name] -> entry的键值 这里就是 'app'
  }
}
```
在packag.json中添加运行的scripts
```
"scripts": {
  "build": "webpack --mode production"
}
```
然后在目录下执行 ``` yarn build ``` 就可以看到目录下新生成了dist目录

#### dev(开发)环境的webpack配置
首先我们需要安装一些dev环境需要的webpack loader和插件
```
yarn add webpack-dev-server webpack-bundle-analyzer vue-loader vue-template-compiler html-webpack-plugin -D
## 其中vue-loader 和 vue-template-comiler 用来编译和加载.vue文件
## webpack-dev-server 启动一个本地http服务器，常用配置说明见下方配置
## webpack-bundle-analyzer 用来可视化分析打包
## html-webpack-compiler 生成html文件并引用打包后的js
```
此时webpack的配置文件如下
```
// webpack.config.js
'use strict'
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')

module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'), // 打包的路径
    filename: '[name]-[hash].js' // 打包生成的文件名 [name] -> entry的键值 这里就是 'app'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', // 打包后生成的文件名
      template: path.resolve(__dirname, 'index.html') // 使用的模板
    }),
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(), // 热更新插件，供devserver使用
    new BundleAnalyzerPlugin() // 打包分析插件
  ],
  devServer: { // dev-server的配置
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
    port: '9999', // 端口
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
}
```
HtmlWebpack插件[文档](https://github.com/jantimon/html-webpack-plugin#options)

index.html模板文件中定义一个id为app的dom节点，供下面的vue渲染后挂载
```
// src>index.js
import Vue from 'vue' // 默认的版本是vue的runtime版本
import App from './App.vue' // 这个文件省略，简单的vue文件

new Vue({
  render: h => h(App) // 为runtime版本提供渲染函数
}).$mount('#app') // 将vue挂载到#app上
```

package.json中scripts添加
```
"dev": "webpack-dev-server --mode development"
```
此时你可以通过 ``` yarn dev ```来启动webpackserver来查看你的应用


**样式问题**
此时会有一个问题vue中写的style不会起作用而且会报错，因为我们的vue-loader会将.vue文件中的style处理为.css，但是我们未添加.css文件的相关的loader所以会报错，而处理样式有以下两种方式
1. 使用css-loader + style-loader这个会将样式打包到js中
2. 使用css-loader + mini-css-extract-plugin，将样式抽取到单独的css文件中

这里我选择的第二种，mini-css-extract-plugin的具体用法见[文档](https://github.com/webpack-contrib/mini-css-extract-plugin)，以下是简单的配置
```
    new MiniCssExtractPlugin({
      chunkFilename: "[name]-[hash].css",
      filename:  'static/css/[name]-[hash].css' // 生成的css文件名
    })
```

#### production(生产)环境的webpack配置

生产环境和开发环境的区别主要可能体现在代码压缩(大部分)

当然主要就是以下几种资源的压缩
1. html

    之前开发环境的HtmlWebpack插件是可以通过配置来压缩html的，简单配置如下
    
    ```
    new HtmlWebpackPlugin({
      filename: 'index.html', // 打包后生成的文件名
      template: path.resolve(__dirname, 'index.html'), // 使用的模板
      hash:true,//防止缓存
      // 压缩
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }), 
    ```

    可以看到生成的html被压缩成了一行，因为是单页应用所以html文件较少且内联js和css也较少，若有压缩内联的资源等更多的压缩需求请参考该[文档](https://github.com/kangax/html-minifier#options-quick-reference)

2. css,js（可以参照[官网文档](https://webpack.js.org/plugins/mini-css-extract-plugin/#minimizing-for-production)）

    因为我们将css提取成了单独的css文件，所以需要对css文件进行压缩。我们需要使用 ``` yarn add optimize-css-assets-webpack-plugin```安装插件,
    ```
    optimization: {
        // 压缩
        minimizer: [
          new UglifyJsPlugin({
            cache: true,
            parallel: true,
            sourceMap: true 
          }),
          new OptimizeCssAssetsPlugin({})
        ]
    },
    ```
    > **注意** 若此时uglifyJS打包报错可能是因为你安装的uglifyJS不支持es2015,此时需要设置babel的preset参数来编译代码
3. 图片、其他

    图片可以使用url-loader将小图转换成base64内嵌到文档中(当然小图也可以使用sprite插件来实现)，大图使用image-webpack-loader配合其他压缩插件来压缩。简单的配置如下图。若要更加精确的控制压缩可以看image-webpack-loader的[文档](https://www.npmjs.com/package/image-webpack-loader)
    ```
    {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'img/[name].[hash:7].[ext]'
            }
          },
          'image-webpack-loader',
        ]
    },
    ```
最后打包的时候能自动清除之前的的打包的旧文件,这里使用Vue-cli中使用的rimraf包
```
'use strict'
process.env.NODE_ENV = 'production' // 注意设置生产环境变量
const rm = require('rimraf')
const webpack = require('webpack')
const path = require('path')
const webpackConfig = require('./webpack.config') // 这里是你生产环境webpack配置文件路径
const dest = path.resolve(__dirname, 'dist/'); // 这里是你打包的路径

rm(dest, err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    // 对错误、及完成状态的处理
  })
})
```

以上打包过程没有友好的提示(不是最要紧的)，可以自行添加


#### 环境变量的设置

vue-cli3中是通过加载并解析自定义的文件将其设置到环境变量中,如下
```
function loadEnv (path = '.env') {
  const config = parse(fs.readFileSync(path, 'utf-8')) // 读取解析文件
  Object.keys(config).forEach(key => {
    if (typeof process.env[key] === 'undefined') {
      process.env[key] = config[key] // 设置到环境变量中
    }
  })
  return config
}
```
另外简单的我们可以使用[cross-env](https://github.com/kentcdodds/cross-env)直接设置环境变量（不同平台设置环境变量会不同所以使用该插件），然后你就可以使用process.env.xxx来使用设置好的环境变量啦~~~如我们可以通过环境变量来控制修改模板html的内容
```
  <p><%= process.env.NODE_ENV === 'development' ? '测试': '正式'%></p>
 ```
 
 
 #### 打包优化
 
 现在我就只了解这几种方式 1.减少打包体积 2.加快打包速度 3.利用缓存 4.首屏优化
 
 
 1.减小打包的体积(代码压缩见上)  
 - 抽取公共代码使用split(多页面应用有必要，而且由于这些代码很少改变利用好缓存的话能很好的提升体验)
 
下面是简单的配置，抽取所有的三方库中的代码中的css和js到一个文件中，相当于多了个name为vendor的chunk。

```
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
```

这时候js我们通过在htmlWebpackPlugin就能引用，如下
```
    new HtmlWebpackPlugin({
      ...
      chunks: [
        ..., 'vendor' //在chunk中多加一个vendor就能将第三方库中打包出来的js引入html中
      ],
      ...
    })
```
而css会自动引用

 - 按需引入js
 
 支持按如下的方式异步引入资源而不统一打包，适合针对不常用的js代码使用。
```
async function load() {
    // 引用lodash
    const { default: _ } = await import(/* webpackChunkName: "lodash" */ 'lodash');
}
```
使用这个语法需要babel的支持，主要是[@babel/plugin-syntax-dynamic-import](https://babeljs.io/docs/en/babel-plugin-syntax-dynamic-import)插件和配置，低版本的浏览器中需要用到[@babel/polyfill](https://babeljs.io/docs/en/babel-polyfill)
- 按需加载组件库  
    
使用babel的[babel-plugin-import](https://github.com/ant-design/babel-plugin-import)插件，他能将我们的import语句自动转换成Node的模块的引用方式
- cdn加载  
 

 类似echarts这种很大的库单独在html模板中引用cdn版本是好的选择
 
 2. 加快打包速度
 - 设置别名，每次打包时查找模块就不用按照nodejs的规则去寻找而是直接按照指定的路径寻找,示例如下
 ```
 // wepack 配置示例
resolve: {
    alias: {
      '#': path.resolve(__dirname, 'src/styles')
    }
}
  
  // 引用示例
import '#/common.css'
```  
- 设置loader的include或exclude，缩小loader处理的范围，示例如下
```
  {
    test: /\.js$/,
    use: 'babel-loader?cacheDirectory',
    include: path.resolve(__dirname, 'src')
  }
```
- 使用DllPlugin、happyPack(这两用起来都有些问题没解决，暂不知-_-||)

3. 利用缓存
- pwa相关  
    使用webpack的[offline-plugin](https://github.com/NekR/offline-plugin)
-  控制打包文件名中hash值  

  > 说明： 即文件内容未发生更改的时候文件的hash值也不发生变化(那么就能利用此缓存)。多chunk时一个chunk改变不影响其他文件的缓存、这对前面抽取出来的vendor chunk很有必要(不经常变动、而且体积大)。
  
    
  方法([官方文档](https://webpack.docschina.org/guides/caching)): 
  ```
      output: {
        path: path.resolve(__dirname, 'dist'), // 打包的路径
        filename: 'static/js/[name]-[chunkhash].bundle.js' // 这里必须使用chunkhash因为hash在项目变的时候就可能变动，详细介绍见文末链接
      },
    plugins: [
        new webpack.HashedModuleIdsPlugin(), //针对chunkhash自增(代码未变动chunkhash也会变动)的情况，添加此插件。貌似就是如此-.-
    ]
  ```
  > **会与dev-server的热更新的冲突，所以在dev环境下就用hash就好，生产环境下使用chunkhash**
   
    
4. preload  
使用[prerender-spa-plugin](https://github.com/chrisvfritz/prerender-spa-plugin)插件来实现，针对静态页面提高性能

##### 链接
- [yesvods](https://github.com/yesvods/Blog/issues/15)
- [hash,chunkhash,contenthash](https://juejin.im/post/5a4502be6fb9a0450d1162ed)