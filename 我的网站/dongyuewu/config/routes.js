
// 路由
var Index=require('../controllers/index');

module.exports = function( app ) {
  app.get('/', Index.index)


  // ajax
  app.get('/getJson/test1',function(req, res) {
    res.json({
      code:200,
      message:'请求成功！',
      data:'这是数据'
    })
  })
}