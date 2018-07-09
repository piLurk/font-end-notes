module.exports = function(app) {


  //log
  app.post('/sendLogs', (req, res) => {
    res.json({
      code:0
    })
  })

}