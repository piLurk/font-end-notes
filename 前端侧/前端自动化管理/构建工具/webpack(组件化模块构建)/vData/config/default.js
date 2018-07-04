var path = require('path');

module.exports = {
  wx: {
    host:'wx.jiangroom.com'
  },
  web: {
    host:"default.jiangroom.com"
  },
  build:{
    distPath: path.resolve(__dirname, '../dist'),
    assetsRoot: path.resolve(__dirname, '../dist'),
  },
  dev:{
    port:8071,
    autoOpenBrowser:true,
    proxyTable:{},
    assetsPublicPath: "./",
    assetsSubDirectory: "dist",
  }
}