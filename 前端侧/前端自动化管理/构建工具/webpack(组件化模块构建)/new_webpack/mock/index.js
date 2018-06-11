

var login = require("./login")

var noticemgmt = require('./noticemgmt')

module.exports = function(app) {
  // 登陆
  login(app);
  
  // 基础数据管理
  noticemgmt(app);
  
}