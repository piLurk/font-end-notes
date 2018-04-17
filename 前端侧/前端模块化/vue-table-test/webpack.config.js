

var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry:{
    main:'./src/main.js'
  },
  output: {
    path:path.resolve(__dirname, './dist'),
    publicPath:'/dist/',
    filename:'/static/js/[name].[chunkhash].js'
  },
  externals:{
    vue:"vue"
  },
  resolve:{
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  module:{
    rules:[
      {
        test:/\.vue$/,
        loader:'vue-loader',
        options:{
          loaders: {
            'scss' : 'css-loader!sass-loader'
          }
        }
      },
      {
        test:/\.js$/,
        loader: 'babel-loader',
        exclude: /node_module/
      }
  
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  ]
  

}