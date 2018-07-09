const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('jr-config')(__dirname)

const path = require('path')

//合并配置
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf');

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const prodWebpackConfig = merge(baseWebpackConfig, {
  mode:'production',
  devtool: false,
  performance: {
    hints:'error',
    maxEntrypointSize: 1200 * 1024, // 最大html + js体积
    maxAssetSize:1000 * 1024    // 最大单个文件体积
  },
  optimization: {
    splitChunks: {
      // chunks: "all",  //所有公共chunk代码的公共部分分离成为一个文件。
      chunks:'async',
      minSize: 1 * 1024,
      minChunks: 1, 
      maxInitialRequests: 3, // 最大初始化请求数
      maxAsyncRequests: 5, // 最大异步请求数

    },
    minimize:true,  // UglifyjsWebpackPlugin production中默认为true。开启压缩
    // minimizer: [  // 使用另外的压缩插件
    //   new webpack.optimize.UglifyJsPlugin({ /* your config */ })
    // ]
  },
  module:{

  },
  plugins: [
    new CleanWebpackPlugin('dist', {
      root: path.resolve(__dirname, '../'),
      verbose: true
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      favicon: resolve('favicon.ico'),
      path: config.build.assetsPublicPath + config.build.assetsSubDirectory,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      // chunksSortMode: 'dependency'
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
    
  ]
})
module.exports = prodWebpackConfig