
// 获取所有供应商

module.exports = function(app) {
  app.put('/provider/all', (req, res) => {
    res.json({total:10, items:[{name:'ww'}]});
  });

  app.get('/provider:pkId', (req, res) => {
    res.josn({provider:`这是供应商！${req.params.pkId}`})
  })
}
