var path = require('path');

module.exports = {
  web: {
    hosts:"dev.jiangroom.com"
  },
  build:{
    distPath: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static'
  },
  dev:{
    port:8071,
    autoOpenBrowser:true,
    proxyTable:{},
    assetsPublicPath: "./",
    assetsSubDirectory: "dist"
  }
}