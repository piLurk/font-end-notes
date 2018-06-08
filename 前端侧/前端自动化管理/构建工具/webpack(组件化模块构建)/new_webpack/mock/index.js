
var basicdatamgmt = require('./basicdatamgmt.js');
var mgmtcenter = require("./mgmtcenter");
var login = require("./login")

module.exports = function(app) {
  // 登陆
  login(app);
  
  // 基础数据管理
  basicdatamgmt(app);

  //管理中心
  mgmtcenter(app);
  
}