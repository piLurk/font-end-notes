// 这里写的是index的处理逻辑，和数据库交互
var path = require('path')

var __dirname = path.resolve()



exports.index = function(req, res) {
  res.sendFile(__dirname+'/index.html')
}