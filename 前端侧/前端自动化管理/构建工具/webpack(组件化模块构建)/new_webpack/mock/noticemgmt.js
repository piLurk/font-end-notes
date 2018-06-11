module.exports = function(app) {

// 公告列表
  app.post('/notice/selectNoticeByKeyWords', (req, res) => {
    res.json({
      code:200,
      data:{
        list: [{
          title:'这是测试标题jdad111',
          content:'这是测试数据，这是测试数据这是测试数据这是测试数据这是测试数据这是测试数据',
          departmentName:'技术中心',
          gmtModified:1528704548766,
          labelMsg:'',
          publishFlag:0,
          stickFlag:0,
          viewTimes: 10530
        },
        {
          title:'这是测试标题jdad222',
          content:'这是测试数据，这是测试数据这是测试数据这是测试数据这是测试数据这是测试数据',
          departmentName:'技术中心',
          gmtModified:1528704548766,
          labelMsg:'',
          publishFlag:0,
          stickFlag:0,
          viewTimes: 1057
        },
        {
          title:'这是测试标题jdad333',
          content:'这是测试数据，这是测试数据这是测试数据这是测试数据这是测试数据这是测试数据',
          departmentName:'技术中心',
          gmtModified:1528704548766,
          labelMsg:'',
          publishFlag:0,
          stickFlag:0,
          viewTimes: 1053
        },
        {
          title:'这是测试标题jdad22',
          content:'这是测试数据，这是测试数据这是测试数据这是测试数据这是测试数据这是测试数据',
          departmentName:'技术中心',
          gmtModified:1528704548766,
          labelMsg:'',
          publishFlag:0,
          stickFlag:0,
          viewTimes: 1105
        },
        {
          title:'这是测试标题jdad',
          content:'这是测试数据，这是测试数据这是测试数据这是测试数据这是测试数据这是测试数据',
          departmentName:'技术中心',
          gmtModified:1528704548766,
          labelMsg:'',
          publishFlag:0,
          stickFlag:0,
          viewTimes: 1015
        }],
        total: 102
      }
      
    })
  })
}