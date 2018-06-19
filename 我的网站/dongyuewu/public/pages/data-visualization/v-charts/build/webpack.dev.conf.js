const config = require('jr-config')(__dirname)

const path = require('path');

//合并配置
var merge = require('webpack-merge');

var baseWebpackConfig = require('./webpack.base.conf');

// 命令行友好错误提示
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

// css 各种loader配置
var styleGenerate = require('./style-loader');


let isCssExtract = !!config.dev.cssExtract;
var rules = styleGenerate({ sourceMap: config.dev.cssSourceMap, cssExtract: isCssExtract });



function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const devWebpackConfig = merge(baseWebpackConfig, {
    mode:'development',

    module: {
      rules: [
        
      ]
    },
    // 生成只有行信息的sourcemap ，更快。
    devtool: '#cheap-module-eval-source-map',

    performance: {
      hints:'error',
      maxEntrypointSize:30000000, // 最大html + js体积
      maxAssetSize:20000000    // 最大单个文件体积
    }
  }
  
)

module.exports = devWebpackConfig;
  
