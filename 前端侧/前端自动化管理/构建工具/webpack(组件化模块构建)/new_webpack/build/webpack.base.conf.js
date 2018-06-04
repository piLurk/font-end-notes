var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var config = require('jr-config')(__dirname);


function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    // vendor:['vue', 'vue-router', 'lodash', 'vuex'], //第三方库，提出来会放在vendorjs中，方便做缓存。
    app:'./src/main.js'
  },
  output: {
    path: config.build.distPath,
    filename:'[name].js',
    publicPath:'/'
  },
  resolve: {
    alias: { //别名
      'vue$': 'vue/dist/vue.esm.js',
      '@':resolve('src'),
      'components': resolve('src/components'),
      'utils': resolve('src/utils')
    },
    extensions:['.js', '.vue', '.json'], //扩展名匹配规则
    mainFields:['module', 'main'],   //修改包查找路径(有package.json文件时)， 默认是module ,main
    mainFiles: ['index'],  //没有package.json时，默认使用当前目录下index.js。这个也可以配置。
  },
  module:{
    rules: [
      // {
      //   test: /\.jsx?/, // 条件
      //   include: [ 
      //     path.resolve(__dirname, 'src'),
      //   ], // 条件
      //   use: 'babel-loader', // 规则应用结果
      // }, // 一个 object 即一条规则

      {
        resource: {
          test: /\.vue$/,
          include: [
            resolve('src')
          ]
        },
        use: 'vue-loader' // 是loaders的别名
      },
      {
        resource: {
          test: /\.js$/,
          include: [
            resolve('src'),
            resolve('test')
          ]
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
              pngquant: { // 使用 imagemin-pngquant 压缩 png
                quality: '65-90',
                speed: 4
              },
              gifsicle: { // 压缩 gif 的配置
                interlaced: false,
              },
              webp: { // 开启 webp，会把 jpg 和 png 图片压缩为 webp 格式
                quality: 75
              },
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
  performance: {
    hints:'error',
    maxEntrypointSize:1000000, // 最大html + js体积
    maxAssetSize:500000    // 最大单个文件体积
  },
  optimization: {
    splitChunks: {
      // chunks: "all",  //所有公共chunk代码的公共部分分离成为一个文件。
      chunks:'async',
      minSize: 10000,
      minChunks: 1, 
      maxInitialRequests: 3, // 最大初始化请求数
      maxAsyncRequests: 5, // 最大异步请求数
    },
    minimize:false,  // UglifyjsWebpackPlugin production中默认为true。开启压缩
    // minimizer: [  // 使用另外的压缩插件
    //   new webpack.optimize.UglifyJsPlugin({ /* your config */ })
    // ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      favicon: path.resolve('favicon.ico'),
      inject: true
    })
  ]

  

}