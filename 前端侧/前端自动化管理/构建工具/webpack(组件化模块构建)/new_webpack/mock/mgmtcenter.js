module.exports = function(app) {
  app.put('mgmt/all', (req, res) => {
    res.json({total:10, items:[{name:'hh'}]});
  });

  app.get('mgmt:pkId', (req, res) => {
    res.josn({provider:'这是管理中心！'})
  })
}