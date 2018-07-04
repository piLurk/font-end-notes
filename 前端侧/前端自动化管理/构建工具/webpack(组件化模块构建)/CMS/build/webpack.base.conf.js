const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('jr-config')(__dirname);
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 15+版本vue-loader需要这个插件
const { VueLoaderPlugin } = require('vue-loader');


function resolve(dir) {
  return path.join(__dirname, '..', dir)
}


module.exports = {
  entry: {
  // vendor:['vue', 'vue-router', 'element-ui', 'lodash', 'vuex'], //第三方库，提出来会放在vendorjs中，方便做缓存。
  app:['babel-polyfill', './src/index.js']
  },
  output: {
    path: config.build.distPath,
    filename:'[name].[hash:8].js',
    publicPath:  process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    alias: { //别名
      'vue$': 'vue/dist/vue.esm.js',
      '@':resolve('src'),
      'components': resolve('src/components'),
      'utils': resolve('src/utils'),
      'api': resolve('src/api')
    },
    extensions:['.js', '.vue', '.json'], //扩展名匹配规则
    mainFields:['module', 'main'],   //修改包查找路径(有package.json文件时)， 默认是module ,main
    mainFiles: ['index'],  //没有package.json时，默认使用当前目录下index.js。这个也可以配置。
  },
  module:{
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
        // resource: {
        //   test: /\.vue$/,
        //   include: [
        //     resolve('src')
        //   ]
        // },
        // use: 'vue-loader' // 是loaders的别名
      },
      {
        test: /\.s?[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { name: 'static/css/[name].css', sourceMap: true }},
          // { loader: 'postcss-loader', options: { sourceMap: true }},
          { loader: 'sass-loader', options: { sourceMap: true }},
        ]
      },
      {
        resource: {
          test: /\.js$/,
          exclude: /node_modules/
        },
        use: 'babel-loader' // 
      },
      {
        resource: {
          test: /.*\.(gif|png|jpe?g|svg|webp)$/i,
          include: [
            resolve('src')
          ]
        },
        use: [
          {
            loader: 'file-loader',
            options: {}
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: { // 压缩 jpeg 的配置
                progressive: true,
                quality: 65
              },
              optipng: { // 使用 imagemin-optipng 压缩 png，enable: false 为关闭
                enabled: false,
              },
              gifsicle: { // 压缩 gif 的配置
                interlaced: false,
              }
            },
          }
        ]
      },
      {
        resource: {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/
        },
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'fonts/[name].[hash:7].[ext]'
            }
          }
        ]
      }
    ]
  },
  
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      // 注意； 由于DefinePlugin插件是直接文本替换，使用时必须要是‘“ss”’格式，或者使用stringify('ss')
      BROWSER_CONFIG: JSON.stringify(config.BROWSER_CONFIG)
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      favicon: path.resolve('favicon.ico'),
      inject: true,
      path: config.dev.assetsPublicPath + config.dev.assetsSubDirectory
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].[hash:8].css",
      chunkFilename: "[id].[hash:8].css"
    })
  ]

  

}