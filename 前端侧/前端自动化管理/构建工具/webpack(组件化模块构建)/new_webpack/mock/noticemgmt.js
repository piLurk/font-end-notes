module.exports = function (app) {

  // 公告列表
  app.post('/notice/selectNoticeByKeyWords', (req, res) => {
    res.json({
      code: 200,
      data: {
        list: [{
          title: '这是测试标题jdad111',
          content: '这是测试数据，这是测试数据这是测试数据这是测试数据这是测试数据这是测试数据',
          departmentName: '技术中心',
          gmtModified: 1528704548766,
          labelMsg: '',
          publishFlag: 0,
          stickFlag: 0,
          viewTimes: 10530
        },
        {
          title: '这是测试标题jdad222',
          content: '这是测试数据，这是测试数据这是测试数据这是测试数据这是测试数据这是测试数据',
          departmentName: '技术中心',
          gmtModified: 1528704548766,
          labelMsg: '',
          publishFlag: 1,
          stickFlag: 0,
          viewTimes: 1057
        },
        {
          title: '这是测试标题jdad333',
          content: '这是测试数据，这是测试数据这是测试数据这是测试数据这是测试数据这是测试数据',
          departmentName: '技术中心',
          gmtModified: 1528704548766,
          labelMsg: '',
          publishFlag: 1,
          stickFlag: 0,
          viewTimes: 1053
        },
        {
          title: '这是测试标题jdad22',
          content: '这是测试数据，这是测试数据这是测试数据这是测试数据这是测试数据这是测试数据',
          departmentName: '技术中心',
          gmtModified: 1528704548766,
          labelMsg: '',
          publishFlag: 1,
          stickFlag: 0,
          viewTimes: 1105
        },
        {
          title: '这是测试标题jdad',
          content: '这是测试数据，这是测试数据这是测试数据这是测试数据这是测试数据这是测试数据',
          departmentName: '技术中心',
          gmtModified: 1528704548766,
          labelMsg: '',
          publishFlag: 1,
          stickFlag: 0,
          viewTimes: 1015
        }],
        total: 102
      }

    })
  })

  // 获取所有部门
  app.get('/notice/getDepartments', (req, res) => {
    res.json({
      code: 200,
      data: [{'departmentName':'技术中心', id: 100}, {'departmentName':'素质拓展部', id: 101}, {'departmentName':'人事部', id: 102}]
    })
  })

  // 上传文件
  app.post('/notice/uploadFile', (req, res) => {
    res.josn({
      code: 200,
      data: {
        state: '',
        url: 'http://jiangrooom.com'
      }
    })
  })

  // 新增公告保存
  app.post('/notice/addNotice', (req, res) => {
    res.josn({
      code: 200,
      data: {
        id: '2018notice'
      }
    })
  })
  // 获取公告详情
  app.get('/notice/findNoticeById', (req, res) => {
    res.josn({
      code: 200,
      data: {
        fileURL: ['http://baidu.com', 'http://jiangroom.com'],
        noticeDetail: {
          title: '这是测试标题jdad111',
          content: '这是测试数据，这是测试数据这是测试数据这是测试数据这是测试数据这是测试数据',
          departmentName: '技术中心',
          gmtModified: 1528704548766,
          labelMsg: '火',
          publishFlag: 0,
          stickFlag: 0,
          viewTimes: 10530
        }
      }
    })
  })
  //编辑公告保存
  app.post('/notice/editNotice', (req, res) => {
    res.josn({
      code: 200
    })
  })

}


