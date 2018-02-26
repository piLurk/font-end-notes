var express             = require('express');
var fs                  =require('fs');
var app                 = express();

app.use(express.static(__dirname));

//解决前端ajax跨域问题
app.all('*',function (req, res, next) { 
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (req.method == 'OPTIONS') {
    res.send(200); /让options请求快速返回/
  }else{    
    next();  
  }});
// 处理get请求
app.get('/',function(req,res){
  res.sendFile(__dirname+'/es2015.html');
}) ;


app.get('/uplaod',function(req,res){
  console.log('这个是get图片请求');
    res.json({sucess:'这个是get图片请求'});
}) ;
//处理post请求

app.post('/getaaa',function(req,res){
    res.json({sucess:'跨域请求成功12！'});
});


// 监听8088端口
var server=app.listen(8084,function(){
  console.log('正在运行于8084端口');
});
