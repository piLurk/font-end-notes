const config = require('jr-config')(__dirname)
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

//合并配置
var merge = require('webpack-merge');

var baseWebpackConfig = require('./webpack.base.conf');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 命令行友好错误提示
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

// css 各种loader配置
var styleGenerate = require('./style-loader');


let isCssExtract = !!config.dev.cssExtract;
var rules = styleGenerate({ sourceMap: config.dev.cssSourceMap, cssExtract: isCssExtract });



function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
let plugins = ( () => {
  let plugins =[];
  
  if(isCssExtract) {
    plugins.push(
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "[name].[hash:8].css",
        chunkFilename: "[id].[hash:8].css"
      })
    )
  }
  return plugins;
})()

const devWebpackConfig = merge(baseWebpackConfig, {
    mode:'development',

    module: {
      rules: [
        {
          test: /\.s?[ac]ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            { loader: 'css-loader', options: { sourceMap: true }},
            // { loader: 'postcss-loader', options: { sourceMap: true }},
            { loader: 'sass-loader', options: { sourceMap: true }},
          ]
        }
      ]
    },
    // 生成只有行信息的sourcemap ，更快。
    devtool: '#cheap-module-eval-source-map',

    performance: {
      hints:'error',
      maxEntrypointSize:30000000, // 最大html + js体积
      maxAssetSize:20000000    // 最大单个文件体积
    },
    plugins: plugins.concat([
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.html',
        favicon: path.resolve('favicon.ico'),
        inject: true,
        path: config.dev.assetsPublicPath + config.dev.assetsSubDirectory
      }),
    ])
  }
  
)

module.exports = devWebpackConfig;
  
