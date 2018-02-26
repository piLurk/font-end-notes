var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: {
    app:['babel-polyfill','./src/main.js']
  },
  output: {
    path: path.resolve(__dirname, './src/assets/'),
    publicPath: '/src/assets/',
    filename: 'js/build.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader',
        options:{
          name:'images/icon/[name].[ext]'
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,        
        use: [
           {
             loader: 'file-loader',
             options: {
                 name:'images/[name]-[hash:5].[ext]'
             }
           },
           {
             loader: 'image-webpack-loader',
             options: {
                 mozjpeg: {
                  // progressive:渐进式图片
                   progressive:true,
                   quality:85
                 },
                 gifsicle: {
                   interlaced: true,
                 },
                 // pngquant:{
                 //   quality: "65-90",
                 //   speed: 4
                 // },
                 optipng: {
                   optimizationLevel: 7,
                 },
                 svgo:{
                   plugins: [
                     {
                       removeViewBox: false
                     },
                     {
                       removeEmptyAttrs: false
                     }
                   ]
                 }
             }
           }]
      }
    ]
  },
  resolve: {

  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
