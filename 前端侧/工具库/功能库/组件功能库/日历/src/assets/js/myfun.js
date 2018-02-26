
//转时区 yyyy-mm-dd
Date.prototype.getBJDate = function (value) {
    var d = new Date(value);  
    var year = d.getFullYear();
	var month = d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1):d.getMonth() + 1;
	var day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
	var dateStr = year + "-" + month + "-" + day;
	return dateStr
}
//yyyy-mm
Date.prototype.getBJMonth = function (value) {
    var d = new Date(value);
    var year = d.getFullYear();
	var month = d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1):d.getMonth() + 1;
	var dateStr = year + "-" + month;
	return dateStr
}
// 依赖juqip或jQuery
//  验证正则
	var regTest={
		trim:/^\s+|\s+$/gm,
		mobile:/^1(3|4|5|7|8)\d{9}$/,
		email:/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
		id:/^\d{17}(\d|x)$/mi,
		userName:/^[A-Za-z ]+\w+$/
	}
	// 验证类
	var GetTest=function (obj) {
		if (!(this instanceof GetTest)) {
			return new GetTest(obj);
		}
		//总：获取需要填写字段的input objArr
		if (!!obj) {
			var $w=$(obj.wrap);
			var thatArr=this.needArr=[];
			$w.find('[need]').each(function(i,ele){
				thatArr.push(ele);
			})
			//总的map错误信息
			this.testErrorArr=[];
		}
		
 
	
	}
	
	GetTest.init=function(str){
		return str.replace(regTest.trim);
	}
	GetTest.prototype={
		submit:function(){
			this.testErrorArr=[];
			var thatArr=this.needArr;
			
			for(var i=0;i<thatArr.length;i++){
				this.str=GetTest.init(thatArr[i].value);
				this.need(thatArr[i],'SUBMIT');
			}
		},
		need:function(obj,type){
			if (type=='SUBMIT') {
			
				if (this.str=='') {
					obj['need']={name:'need',msg:'输入不能为空！'};
					this.testErrorArr.push(obj);								
				}else{				
					return
				}
				
			}else{
				if (this.str==''){
					this.testErrorObj['need']={name:'need',msg:'输入不能为空！'};
				}else{
					this.testErrorObj['need']=null;				
					
				}
			}
			
			return this;
		},
		max:function(n){
			if (this.str.length>n) {
				this.testErrorObj['max']={name:'max',msg:'输入字符长度不能大于'+n+'！'};
			}else{
				this.testErrorObj['max']=null;
							
			}
			return this
		},
		min:function(n){
			if (this.str.length<n) {
				this.testErrorObj['min']={name:'min',msg:'输入字符长度不能少于'+n+'！'};
			}else{
				this.testErrorObj['min']=null;
				
			}
			return this;
		},
		mobile:function(){
			if (!regTest.mobile.test(this.str) && this.str!=='') {
				this.testErrorObj['mobile']={name:'mobile',msg:'输入手机号不合法！'};
			}else{
				this.testErrorObj['mobile']=null;
					
			}
			return this;
		},
		email:function(){

			if (!regTest.email.test(this.str) && this.str!=='') {
				this.testErrorObj['email']={name:'email',msg:'输入邮箱不合法！'};
			}else{
				this.testErrorObj['email']=null;
			}
			return this;
		},
		userName:function(){
			if (!regTest.userName.test(this.str) && this.str!=='') {
				this.testErrorObj['userName']={name:'userName',msg:'用户名输入不合法！'};
			}else{
				this.testErrorObj['userName']=null;
			}
			return this;
		},
		id:function(obj){
			var id=this.str;
			var city = {11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};
			var arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
			var arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
			var sum = 0, i, residue;
			for(i=0; i<17; i++) {
			  sum += id.substr(i, 1) * arrInt[i];
			}
			residue = arrCh[sum % 11];
			if(regTest.id.test(id) && city[id.substr(0,2)]!==undefined && residue===id.substr(17, 1) || this.str===''){
				this.testErrorObj['id']=null;
				}else{
					this.testErrorObj['id']={name:'id',msg:'输入身份证号不合法！'};
				}
		}
	}
	GetTest.child=function(str){
		this.testErrorObj={};
		this.str=str;
	}	
	GetTest.child.prototype=new GetTest({});

/*边框拖动*/
var Drag =function(el,target,obj){
	if (!(this instanceof Drag)) {
		return new Drag(obj);
	}
	var defaultOjb={
		maxW:500,
		minW:240,
		speed:3
	}
	for(var i in defaultOjb){
		if(!!obj[i]){
			defaultOjb[i]=obj[i];
		}
	}
	this.x=0;
	this.y=0;
	this.$el=$(el);
	this.$target=$(target);
	this.config=defaultOjb;
	this.init();
}
Drag.prototype.init=function(){
	var flag=false;
	var that=this;
	$('.control-line').mousedown(function(e){
		window.document.body.style.cursor='e-resize';
		that.x=e.pageX;
		that.y=e.pageY;
		flag=true;
	});

	$(document).mousemove(function(e){
		if (flag) {
			var w=that.$target.width();
			if(e.pageX>that.x){
				//向右移动
				if(w>=that.config.maxW){
					return;
				}
				that.$target.width(w+=that.config.speed);
				that.x+=that.config.speed;
			}else{
				//向左移动
				if(w<=that.config.minW){
					return;
				}
				that.$target.width(w-=that.config.speed);
				that.x-=that.config.speed;
			}
		}
	})
	$(document).mouseup(function(){
		flag=false;
		window.document.body.style.cursor='auto';
	})
}

// 判断鼠标移动方向
var hoverDir = function(wrap,e){
    var w = wrap.offsetWidth,  
        h = wrap.offsetHeight,  
        x = ( e.clientX - wrap.offsetLeft - ( w / 2 ) ) * ( w > h ? ( h / w ) : 1 ),  
        y = (e.clientY - wrap.offsetTop - (h / 2)) * (h > w ? (w / h) : 1),  
        // 上(0) 右(1) 下(2) 左(3)  
        direction = Math.round( ( ( ( Math.atan2( y, x ) * ( 180 / Math.PI ) ) + 180 ) / 90) + 3 ) % 4
    return direction
}

