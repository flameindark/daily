const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
module.exports = {
  entry: './index.js',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html')
    })
  ],
  devtool: 'cheap-source-map',
  devServer: {
    hot: true,  // 开启热更新
    contentBase: false, // 编译之后的的路径，可以禁用
    compress: true, // 开启gzip压缩
    host: '127.0.0.1', // 域名
    port: '8888', // 端口
  }
}