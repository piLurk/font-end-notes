module.exports=function(Vue){
    // 注册一个全局自定义指令 v-focus
    Vue.directive('focus', {
        // 当绑定元素插入到 DOM 中。
        inserted: function (el) {
        // 聚焦元素
        el.focus()
        }
    });

    //输入数据验证
    Vue.directive('validate',function(el,binding){
        var value=binding.value;
        if(value.length===0 || value===false){
            el.style.display='none';
            removeClass(el,'validateError')
        }else{
            el.style.display="block";
            el.innerHTML=value[0];
            el.style.color="red";
            addClass(el,'validateError');
        }
    });
}

function hasClass( elements,cName ){ 
    return !!elements.className.match( new RegExp( "(\\s|^)" + cName + "(\\s|$)") ); 
}; 
function addClass( elements,cName ){ 
if( !hasClass( elements,cName ) ){ 
    elements.className += " " + cName; 
}; 
}; 
function removeClass( elements,cName ){ 
if( hasClass( elements,cName ) ){ 
    elements.className = elements.className.replace( new RegExp( "(\\s|^)" + cName + "(\\s|$)" ), " " );
}; 
};