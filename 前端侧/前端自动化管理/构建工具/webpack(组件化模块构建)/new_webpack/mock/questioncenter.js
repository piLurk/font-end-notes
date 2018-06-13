
module.exports = function(app) {

  // 问题列表
  app.post('/cmsQuestion/listCmsQuestionByPageAndCondition', (req, res) => {
    res.json({
      code: 200,
      data: {
        list: [{
          questionTitle: '这是测试标题jdad111',
          questionTypeName: '密码问题',
          resolvedCount: 101,
          unsolvedCount: 8,
          viewCount: 300,
          gmtModified: 1528704548766
        },
        {
          questionTitle: '这是测试标题jdad111',
          questionTypeName: '密码问题',
          resolvedCount: 101,
          unsolvedCount: 8,
          viewCount: 300,
          gmtModified: 1528704548766
        },
        {
          questionTitle: '这是测试标题jdad111',
          questionTypeName: '密码问题',
          resolvedCount: 101,
          unsolvedCount: 8,
          viewCount: 300,
          gmtModified: 1528704548766
        },
        {
          questionTitle: '这是测试标题2222',
          questionTypeName: '测试问题',
          resolvedCount: 101,
          unsolvedCount: 8,
          viewCount: 300,
          gmtModified: 1528704548766
        },
        {
          questionTitle: '这是测试标题33333',
          questionTypeName: '门锁问题',
          resolvedCount: 201,
          unsolvedCount: 8,
          viewCount: 410,
          gmtModified: 1528704548766
        }],
        total: 102
      }

    })
  })

  // 获取所有问题分类
  app.get('/cmsQuestion/listCmsQuestionType', (req, res) => {
    res.json({
      code: 200,
      data: [{
        id: 100,
        name:'密码问题'
      },{
        id: 101,
        name:'门锁问题'
      },{
        id: 102,
        name:'续租问题'
      },{
        id: 103,
        name:'手续费问题'
      }]
    })
  })


  // 获取问题分类分页
  app.post('/cmsQuestionType/listCmsQuestionTypeByPage', (req, res) => {
    res.json({
      code: 200,
      data: {
        list: [{
          id: 110,
          stopFlag: 0,
          typeName:'密码问题'
        },
        {
          id: 111,
          stopFlag: 0,
          typeName: '测试问题'
        },
        {
          id: 112,
          stopFlag: 0,
          typeName: '门锁问题'
        }],
        total: 3
      }

    })
  })

  // 切换问题分类状态
  app.post('/cmsQuestionType/stopOrStartCmsQuestionType', (req, res) => {
    res.json({
      code: 200,
      data:''
    })
  })

  // 新建分类
  app.post('/cmsQuestionType/addCmsQuestionType', (req, res) => {
    res.json({
      code: 500,
      data:"",
      message:'分类名重复，分类新建失败！'
    })
  })

}