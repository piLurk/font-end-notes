
var basicdatamgmt = require('./basicdatamgmt.js');
var mgmtcenter = require("./mgmtcenter");


module.exports = function(app) {
  
  // 基础数据管理
  basicdatamgmt(app);

  //管理中心
  mgmtcenter(app);
  //
}