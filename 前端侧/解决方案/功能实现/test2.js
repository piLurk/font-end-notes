var express             = require('express');
var fs                  =require('fs');
var app                 = express();

app.use(express.static(__dirname));

//解决前端ajax跨域问题
app.all('*',function (req, res, next) { 
  res.header('Access-Control-Allow-Origin', 'http://localhost:8000');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (req.method == 'OPTIONS') {
    res.send(200); /让options请求快速返回/
  }else{    
    next();  
}});
// 处理get请求
app.get('/cross',function(req,res){
  res.header('Access-Control-Allow-Credentials',true);
  res.json({sucess:'跨域请求成功12！'});
}) ;


//处理post请求

app.post('/getaaa',function(req,res){
   
});


// 监听8088端口
var server=app.listen(8001,function(){
  console.log('test2正在运行于8001端口');
});
