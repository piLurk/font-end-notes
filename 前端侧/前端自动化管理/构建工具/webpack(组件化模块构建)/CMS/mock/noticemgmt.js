module.exports = function (app) {

  // 公告列表
  app.post('/notice/selectNoticeByKeyWords', (req, res) => {
    res.json({
      code: 0,
      data: {
        list: [{
          title: '这是测试标题jdad111',
          content: '这是测试数据，这是测试数据这是测试数据这是测试数据这是测试数据这是测试数据',
          departmentName: '技术中心',
          gmtModified: 1528704548766,
          labelMsg: '',
          publishFlag: '0',
          stickFlag: '1',
          viewTimes: 10530,
          id: 1256
        },
        {
          title: '这是测试标题jdad222',
          content: '这是测试数据，这是测试数据这是测试数据这是测试数据这是测试数据这是测试数据',
          departmentName: '技术中心',
          gmtModified: 1528704548766,
          labelMsg: '',
          publishFlag: 1,
          stickFlag: 0,
          viewTimes: 1057,
          id: 1258
        },
        {
          title: '这是测试标题jdad333',
          content: '这是测试数据，这是测试数据这是测试数据这是测试数据这是测试数据这是测试数据',
          departmentName: '技术中心',
          gmtModified: 1528704548766,
          labelMsg: '',
          publishFlag: 1,
          stickFlag: 0,
          viewTimes: 1053,
          id: 1210
        },
        {
          title: '这是测试标题jdad22',
          content: '这是测试数据，这是测试数据这是测试数据这是测试数据这是测试数据这是测试数据',
          departmentName: '技术中心',
          gmtModified: 1528704548766,
          labelMsg: '',
          publishFlag: 1,
          stickFlag: 0,
          viewTimes: 1105,
          id: 12565
        },
        {
          title: '这是测试标题jdad',
          content: '这是测试数据，这是测试数据这是测试数据这是测试数据这是测试数据这是测试数据',
          departmentName: '技术中心',
          gmtModified: 1528704548766,
          labelMsg: '',
          publishFlag: 1,
          stickFlag: 0,
          viewTimes: 1015,
          id: 125636
        }],
        total: 102
      }

    })
  })

  // 获取所有部门
  app.get('/notice/toNoticeAdd', (req, res) => {
    res.json({
      code: 0,
      data: [{'departmentName':'技术中心', id: 100}, {'departmentName':'素质拓展部', id: 101}, {'departmentName':'人事部', id: 102}]
    })
  })

  // 上传文件
  app.post('/notice/uploadFile', (req, res) => {
    res.json({
      code: 0,
      data: {
        state: '',
        url: 'http://jiangrooom.com'
      }
    })
  })

  // 新增公告保存
  app.post('/notice/addNotice', (req, res) => {
    res.json({
      code: 0,
      data: {
        id: '2018notice'
      }
    })
  })
  // 获取公告详情
  app.get('/notice/findNoticeById', (req, res) => {
    res.json({
      code: 0,
      data: {
        portalYunFiles: [{fileName:'测试问价1111', fileUrl:'http://baidu.com'}, {fileName:'测试文件222', fileUrl:'http://baidu.com'}],
        noticeDetail: {
          title: '这是测试标题jdad111',
          content: '这是测试数据，这是测试数据这是测试数据这是测试数据这是测试数据这是测试数据',
          departmentName: '技术中心',
          noticeBelongto:'1',
          gmtModified: 1528704548766,
          labelMsg: '火',
          publishFlag: '0',
          stickFlag: 0,
          viewTimes: 10530
        }
      }
    })
  })
  //编辑公告保存
  app.post('/notice/editNotice', (req, res) => {
    res.json({
      code: 0
    })
  })
  // 公告发布
  app.post('/notice/publishNotice', (req, res) => {
    res.json({
      code: 0
    })
  })

  // 公告文件上传
  app.post('/notice/uploadNoticeFile', (req, res) => {
    res.json({
      code: 0,
      data: {
        fileId: '1110000',
        fileName:'测试文件名',
        fileUrl:'http://baidu.com'
      }
    })
  })

  // 公告文件删除
  app.post('/notice/deleteAttach', (req, res) => {
    res.json({
      code: 0,
      data: {}
    })
  })

}


