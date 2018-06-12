
//转时区 yyyy-mm-dd
Date.prototype.getBJDate = function (value) {
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

// get timestamp
Date.prototype.getStamp = function (value) {
    return (new Date(value)).getTime();
}

/*********************
 * 数据处理
 * ******************************/ 
var DataHandle=function(){
	
}

DataHandle.isArray=function(){

}
DataHandle.isWindow=function(obj){
	//现代浏览器（ie9）
	var rwindow=/^\[object (?:Window|DOMWindow|global)\]$/;
	return rwindow.test(toString.call(obj));
}
DataHandle.isNaN=function(obj){
	return obj !== obj;
}
DataHandle.isNull=function(obj){
	return obj === null;
}
DataHandle.isUndefined=function(obj){
	return obj === void 0;
}
//深拷贝
DataHandle.deepCopy=function(obj){
	if(typeof obj !== 'object'|| obj===null){
		return obj;
	}
	var str, newobj = Object.prototype.toString.call(obj) === '[object Array]' ? [] : {};
	if(window.JSON){
		str = JSON.stringify(obj), //系列化对象
		newobj = JSON.parse(str); //还原
	} else {
		for(var i in obj){
			newobj[i] = typeof obj[i] === 'object' ? 
			cloneObj(obj[i]) : obj[i]; 
		}
	}
	return newobj;
}

//get array
DataHandle.prototype.getArray = function (arr=[]) {
     return (!!arr && Object.prototype.toString.apply(arr) === '[object Array]')? arr:[];
}
//get stamp
DataHandle.prototype.getStamp = function (value) {
	return !!value? (new Date(value)).getTime() : '';
}
//get need json
DataHandle.prototype.getNeedJson = function (obj) {
	let o={};
    for(let i in obj){
		if(!!obj[i] || obj[i]===0 || obj[i]===false){
			o[i]=obj[i];
		}
	}
	return o;
}
//获取的josn赋值给前端json。
DataHandle.prototype.assignJson = function(nowJson,getJson){
	for(let i in nowJson){
		if(getJson[i] !== undefined){
			nowJson[i] = getJson[i];
		}else{
			nowJson[i] = null
		}
	}
}
//stamp to yyyy-mm-dd(时间戳转日期)
Date.prototype.getStampDate = function (value) {
	var d = new Date(parseInt(value));
	var year = d.getFullYear();
	var month = d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1):d.getMonth() + 1;
	var day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
	var dateStr = year + "-" + month + "-" + day;
	return dateStr
}

//stamp to yyyy-mm-dd hh:mm:ss(时间戳转日期时间)
Date.prototype.getStampDateTime = function(value) {
   var mydt = new Date(parseInt(value));
   return mydt.toLocaleDateString().replace(/\//g, "-") + " " + mydt.toTimeString().substr(0, 8);
}

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


