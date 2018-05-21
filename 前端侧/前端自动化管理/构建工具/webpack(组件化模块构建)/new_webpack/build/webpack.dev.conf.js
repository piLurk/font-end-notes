const config = require('config-lite')(__dirname)

//合并配置
var merge = require('webpack-merge');

var baseWebpackConfig = require('./webpack.base.conf');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 命令行友好错误提示
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

// css 各种loader配置
var styleGenerate = require('./style-loader');



var rules = styleGenerate({ sourceMap: config.dev.cssSourceMap });
module.exports = merge(baseWebpackConfig, {
    mode:'development',

    module: {
      rules
    },
    // 生成只有行信息的sourcemap ，更快。
    devtool: '#cheap-module-eval-source-map',

    performance: {
      hints:'error',
      maxEntrypointSize:3000000, // 最大html + js体积
      maxAssetSize:2000000    // 最大单个文件体积
    }
  }
  
)
  
