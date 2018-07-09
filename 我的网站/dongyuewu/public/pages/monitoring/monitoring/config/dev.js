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
    host:'http://192.168.1.91',  // 选填
    proxyTable:{},
    autoOpenBrowser:true, // 必填项
    cssSourceMap:true, // 必填项
    assetsPublicPath: "/",// 必填项
    assetsSubDirectory: "static",// 必填项
    mocking: true, // 是否开启mock
    cssExtract: true, // 是否分割css文件
  },
  BROWSER_CONFIG:{
    // BASE_API: 'http://192.168.1.194:8095', // 必填项 - 后端地址
    // BASE_API: 'http://192.168.1.160:8095', 

    BASE_API: 'http://192.168.1.91:8072',
    // BASE_API: 'http://thcms.jiangroom.com',
    // BASE_API: 'http://192.168.1.88:8096',
    COOKIE:'aaabbbccc' // 开发环境的cookie
  }
}