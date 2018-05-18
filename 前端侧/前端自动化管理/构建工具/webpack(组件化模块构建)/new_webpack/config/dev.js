var path = require('path');

module.exports = {
  web: {
    host:"dev.jiangroom.com",
  },
  build:{
    distPath: path.resolve(__dirname, '../dist')
  },
  dev:{
    port:8072,
    proxyTable:{},
    autoOpenBrowser:true,
    cssSourceMap:true, // 必填项
    assetsPublicPath: "./",
    assetsSubDirectory: "dist"
  }
}