var path = require('path');

module.exports = {
  web: {
    host:"dev.jiangroom.com",
  },
  build:{
    distPath: path.resolve(__dirname, '../dist')
  },

  dev:{
    port:8072, // 选填项
    host:'http://192.168.1.91',  // 选填
    proxyTable:{},
    autoOpenBrowser:true, // 必填项
    cssSourceMap:true, // 必填项
    assetsPublicPath: "./",// 必填项
    assetsSubDirectory: "dist",// 必填项
    mocking: true, // 是否开启mock
    cssExtract: true, // 是否分割css文件
  },
  backEnd:{
    BASE_API: 'http://192.168.1.91:8087' // 选填项 - 后端地址
  }
}