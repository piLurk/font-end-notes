
module.exports = function(app) {


  //获取用户信息
  app.get('/cms/validToken', (req, res) => {
    res.json({
      code:0,
      data:{
        userId: 110
      }
    })
  })

  app.get('/cms/getRolesAndPermissionsByUserId', (req, res) => {
    res.json({
      code:0,
      data:{
        roles: [1, 2],
        name:'吴东岳',
        avatar:null,
        introduction: null,
        jobName: '前端工程师'
      }
    })
  })
}