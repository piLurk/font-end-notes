var express             = require('express');
var fs                  =require('fs');
var app                 = express();
var bodyParse           = require('body-parser');
var cookieParser        = require('cookie-parser');
var multiparty      =require('multiparty');

app.use(cookieParser()) ;
app.use(bodyParse.urlencoded({extended:false}));
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
	console.log('请求主页');
    res.redirect('http://192.168.1.90:8091');
}) ;

app.post('/ttt',function(req,res){
  console.log('test');
    res.json({message:'hehe'});
}) ;
app.post('/upload',function(req,res){
	console.log('这个是get图片请求');
    res.json({sucess:'这个是get图片请求'});
});
//处理post请求
/*********************
      组织架构
*******************/
app.post('/departmentGetJSON',function(req,res){
    res.json([{ id:1, pId:0, name:"江寓（200人）",code:'BM000', open:true},
        { id:11, pId:1, name:"业务拓展部（100人）", code:'BM001',time:'2017-05-25',father:'江寓',type:'业务拓展部'},
        { id:111, pId:11, name:"光谷区域（20人）",code:'BM011',time:'2017-05-25',father:'业务拓展部',type:'业务拓展部'},
        { id:112, pId:11, name:"南湖区域（20人）",code:'BM0012',time:'2017-05-25',father:'业务拓展部',type:'业务拓展部'},
        { id:113, pId:11, name:"江汉区域（40人）",code:'BM0013',time:'2017-05-25',father:'业务拓展部',type:'业务拓展部'},
        { id:1131, pId:113, name:"江汉汉中区域（20人）",code:'BM131',time:'2017-05-25',father:'江汉区域',type:'业务拓展部'},
        { id:1132, pId:113, name:"江汉汉西区域（20人）",code:'BM132',time:'2017-05-25',father:'江汉区域',type:'业务拓展部'},
        { id:12, pId:1, name:"总经办（1人）",code:'BM002',time:'2017-05-25',father:'江寓',type:'总经办'},
        { id:13, pId:1, name:"产品中心（20人）",code:'BM003',time:'2017-05-25',father:'江寓',type:'产品中心'},
        { id:14, pId:1, name:"技术中心（20人）",code:'BM004',time:'2017-05-25',father:'江寓',type:'技术中心'},
        { id:15, pId:1, name:"市场营销部（20人）",code:'BM005',time:'2017-05-25',father:'江寓',type:'市场营销部'},
        { id:16, pId:1, name:"营运支撑部（20人）",code:'BM006',time:'2017-05-25',father:'江寓',type:'营运支撑部'}
      ]);

    
});

// 监听8088端口
var server=app.listen(8006,function(){
	console.log('正在运行于8006端口');
});
