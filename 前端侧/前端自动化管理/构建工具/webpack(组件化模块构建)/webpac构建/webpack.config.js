
var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry:{
    crm:'./src/crm/index.js',
    oa:'./src/oa/index.js'
  },

  output:{
    path:path.resolve(__dirname,'dist'),
    filename:'[name]/static/js/[name].[hash:8].js',
    publicPath:'/'
  },
  module:{
    rules:[
      {
        test:/\.css$/,
        loader:'style-loader!css-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename:"crm/index.html",
      template:'src/crm/index.html',
      inject:true
    }),
    new HtmlWebpackPlugin({
      filename:"oa/index.html",
      template:'src/oa/index.html',
      inject:true
    })
  ]
}