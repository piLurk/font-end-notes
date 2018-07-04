const CopyWebpackPlugin = require('copy-webpack-plugin')
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
  module:{

  },
  plugins: [
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
console.log(prodWebpackConfig)
module.exports = prodWebpackConfig