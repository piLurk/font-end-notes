var express             = require('express');
var fs                  =require('fs');
var app                 = express();

app.use(express.static(__dirname));

// 处理get请求
app.get('/',function(req,res){
  res.json({sucess:'跨域请求成功12！'});
}) ;


//处理post请求

app.post('/getaaa',function(req,res){
   
});


// 监听8088端口
var server=app.listen(8000,function(){
  console.log('test1正在运行于8000端口');
});
