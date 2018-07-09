

var login = require("./login")

var noticemgmt = require('./noticemgmt')

var questioncenter = require('./questioncenter')

const log = require('./log')

module.exports = function(app) {
  // 登陆
  login(app);
  
  // 公告管理
  noticemgmt(app);

  // 问题中心
  questioncenter(app);

  // log
  log(app)
  
}