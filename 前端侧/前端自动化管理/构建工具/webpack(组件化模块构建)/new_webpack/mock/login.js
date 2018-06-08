
module.exports = function(app) {


  //获取用户信息
  app.get('/user/info', (req, res) => {
    res.json({
      code:200,
      data:{
        roles: [1, 2],
        name:'吴东岳',
        avatar:null,
        introduction: null,
        userId: 110
      }
      
    })
  })
}