var inpObj=document.getElementById('myNum');

	document.getElementById('confirm').onclick=function(){

		var content=inpObj.value.replace(/^\s+|\s+$/gm,'');
		if (content=='') {
			alert('请输入序号！')
		}else if (!m[content]) {
			alert('无这个序号对应解决方案！')
		}else{
			m[content]();
		}

	}
		
	
	var m={
		/************************
		g-0001 :一个事件添加多个事件函数，不覆盖
		*************************/
		g0001:function(){
			console.log('g0001生效！——添加多个事件函数');
			function addEvent(dom,type,fn) {
				if (dom.addEventListener) {
					dom.addEventListener(type,fn,false);
					
				}else if(dom.attachEvent){
					dom.attachEvent('on'+type,fn);
				}else{
					dom['on'+type]=fn;
				}
			}

			var fun1=function(){
				console.log(1);
			}
			var fun2=function(){
				console.log(2);
			}
			var doc=document;
			addEvent(doc,'click',fun1);
			addEvent(doc,'click',fun2);
		},
		/************************
		g-0002 :跨域问题
		*************************/
		g0002:function(){
			console.log('g0002生效——跨域');

			var xhr=new XMLHttpRequest();
			xhr.open('GET','http://localhost:8001/cross');
			xhr.withCredentials=true;
			xhr.onload=onLoadHandler;
			xhr.send();
			function onLoadHandler(a){
				console.log(a.target);
			}

		},
		/************************
		g-0003 :跨域问题
		*************************/
		g0003:function(){



			var img=new Image();
			img.src=src;


		},

		/************************
		g-0004 :类型检测
		*************************/

		g0004:function(){
			console.log( typeof null)
			console.log( typeof document.childNodes)
			console.log( typeof document.createElement('embed'))
			console.log( typeof document.createElement('object'))	
			console.log( typeof document.createElement('applet'))
			console.log( typeof /\d/i)
			var iframe=document.createElement('iframe');
			document.body.appendChild(iframe);
			var xArray=window.frames[window.frames.length-1].Array;
			var arr=new xArray(1,2,3);
			console.log(arr instanceof Array);
			console.log(arr.constructor === Array);
			console.log(isNaN('aaa'));
				// alert(window.constructor);
				// alert(document.constructor);
				// alert(document.body.constructor);
				// alert(new ActiveXObject('Microsoft.XMLHTTP')).constructor;
				// alert(document.constructor);	
			/*********************
			 * 数据处理
			 * ******************************/ 
			var DataHandle=function(){
				
			}
			DataHandle.prototype.getStamp = function (value) {
				return (new Date(value)).getTime();
			}
			DataHandle.isArray=function(){

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


			window.DataHandle=DataHandle;
			
		},
	}

