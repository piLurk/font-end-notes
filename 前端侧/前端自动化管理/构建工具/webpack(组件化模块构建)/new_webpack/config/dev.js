var path = require('path');

module.exports = {
  web: {
    host:"dev.jiangroom.com",
  },
  build:{
    distPath: path.resolve(__dirname, '../dist'),
    assetsPublicPath: "/", // 必填项
    assetsSubDirectory: 'static',// 必填项
  },
  
  dev:{
    port:8072, // 选填项
    host:'http://localhost',  // 选填
    proxyTable:{},
    autoOpenBrowser:true, // 必填项
    cssSourceMap:true, // 必填项
    assetsPublicPath: "/",// 必填项
    assetsSubDirectory: "static",// 必填项
    mocking: true, // 是否开启mock
    cssExtract: true, // 是否分割css文件
  },
  BROWSER_CONFIG:{ 
    BASE_API: 'http://localhost:8072', // 必填项 - 后端地址
    COOKIE:'aaabbbccc' // 开发环境的cookie
  }
}