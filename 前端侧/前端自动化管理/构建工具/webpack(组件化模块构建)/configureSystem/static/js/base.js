// JavaScript Document
//左侧下拉菜单
var sideMenu = {
	init:function(){
		this.sidebar();
	},
	sidebar:function(){
		var side = {
			myside:'#side-menu',//树形菜单
			switchBtn:"#switchBar"//展开收起按钮
		};
		var oside = $(side.myside);
		var oswitch = $(side.switchBtn);
		
		//匹配所有无子菜单的元素
		oside.children("li:not(:has(ul))").children("a").on('click',function(){
			//判断侧边栏状态，是否为展开状态
			if(oswitch.attr("data-val") == "bigval"){
				oside.children("li").removeClass("active");
				oside.find(".nav-second-level li").children("a").removeClass("active");
				oside.find(".nav-second-level").slideUp(300);
				$(this).parent().addClass("active");
			}else{
				oside.children("li").removeClass("active");
				$(this).parent().addClass("active");
			}
		});
		//匹配所有有子菜单的元素
		oside.find("li:has(ul)").children("a").on('click',function(){
			//判断侧边栏状态，是否为展开状态
			if(oswitch.attr("data-val") == "bigval"){
				oside.children("li").removeClass("active");
				oside.find(".nav-second-level").slideUp(300);
			 	if($(this).next("ul").css("display")=='none'){
			 		$(this).parent("li").addClass("active").siblings().removeClass("active");;
					$(this).next("ul").slideDown(300);
					if($(this).parent("li").siblings("li").children("ul").css("display")=='block'){
						$(this).parent("li").siblings("li").children("ul").slideUp(300);
					}
				}else{
					$(this).parent("li").removeClass("active");
					$(this).next("ul").slideUp(300);
				}
			}
	 	});
	 	//二级栏目点击事件
	 	oside.find(".nav-second-level li").children("a").on('click',function(){
	 		//判断侧边栏状态，是否为展开状态
			if(oswitch.attr("data-val") == "bigval"){
	 			oside.find(".nav-second-level li").children("a").removeClass("active");
	 			$(this).addClass("active");
	 		}else{
	 			oside.children("li").removeClass("active");
				$(this).parents(".secondli").addClass("active");
	 			oside.find(".nav-second-level li").children("a").removeClass("active");
	 			$(this).addClass("active");
	 		}
	 	});

		

	 	//左侧侧边栏底部按钮(展开或收起开关)
	    oswitch.on('click',function(){
	    	//收起
	        if(oswitch.attr("data-val") == "bigval"){
	            $(".navbar-static-side").animate({width:"50px"},100);
	            $("#page-wrapper").animate({"margin-left":"50px"},100);
	            $(this).animate({width:"50px"},100);
	            $(this).attr("data-val","smallval");
	            $(".navbar-static-side").addClass("smallside");
	            $(".nav-second-level").hide();

	        }//展开
	        else if(oswitch.attr("data-val") == "smallval"){
	            $(".navbar-static-side").animate({width:"160px"},100);
	            $("#page-wrapper").animate({"margin-left":"160px"},100);
	            $(this).animate({width:"160px"},100);
	            $(this).attr("data-val","bigval");
	            $(".navbar-static-side").removeClass("smallside");
	            oside.children("li").removeAttr("style");
	            oside.find(".nav-second-level").removeAttr("style");
	            oside.find(".nav-label").removeAttr("style");
	        }
	    });


	    //匹配所有无子菜单的元素
	 	oside.children("li:not(:has(ul))").hover(function(){
	   		if(oswitch.attr("data-val") == "smallval"){
	   			$(this).addClass("lihover");
	   			$(this).children("a").find(".nav-label").show();
 				$(this).animate({width:"160px"},100);
 			}
 		},function(){
	    	if(oswitch.attr("data-val") == "smallval"){
	    		$(this).removeClass("lihover");
	    		$(this).children("a").find(".nav-label").hide();
 				$(this).animate({width:"50px"},100);
 			}
 		});
	 	//匹配所有有子菜单的元素
		oside.find("li:has(ul)").hover(function(){
	   		if(oswitch.attr("data-val") == "smallval"){
	   			$(this).addClass("lihover");
	   			$(this).animate({width:"160px"},100);
	   			$(this).children("a").find(".nav-label").show();
	   			$(this).children("a").next("ul").show();
	   		}
		},function(){
	    	if(oswitch.attr("data-val") == "smallval"){
	    		$(this).removeClass("lihover");
 				$(this).animate({width:"50px"},100);
 				$(this).children("a").find(".nav-label").hide();
 				$(this).children("a").next("ul").hide();
 			}
		});
	}
};

//框架页面添加动画
function addClassFn(obj){
	$(obj).addClass('animated '+ $(obj).attr('data-animateName'));
};
//框架页面移除动画
function removeClassFn(obj){
	$(obj).removeClass('animated '+ $(obj).attr('data-animateName'));
};

//判断浏览器是否支持placeholder,执行的方法
function placeholderFn(){
	supportPlaceholder='placeholder'in document.createElement('input'),
 
  	placeholder=function(input){
	    var text = input.attr('placeholder'),
	    	defaultValue = input.defaultValue;
	 
	    if(!defaultValue){
	    	input.val(text).addClass("phcolor");
	    }
	 
	    input.focus(function(){
	    	if(input.val() == text){
	        	$(this).val("");
	    	}
	    });
	 
	    input.blur(function(){
		    if(input.val() == ""){
		    	$(this).val(text).addClass("phcolor");
		    }
	    });
	 
	    //输入的字符不为灰色
	    input.keydown(function(){
	    	$(this).removeClass("phcolor");
	    });
	};
 
	//当浏览器不支持placeholder属性时，调用placeholder函数
	if(!supportPlaceholder){
		$('input').each(function(){
			text = $(this).attr("placeholder");
			if($(this).attr("type") == "text"){
		    	placeholder($(this));
			}
		});

	}

};

//全局调用
$(document).ready(function(){

	sideMenu.init();//左侧下拉菜单
	$('#side-menu .defaultOpen').trigger('click');

	//addClassFn("#mypage");//框架页面添加动画

	placeholderFn();//判断浏览器是否支持placeholder属性执行的函数

});
