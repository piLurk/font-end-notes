/****
 * 
 * js求值
 * 
*/

// eval

  var str = 'var a= 10;var b = 11;a+b;';
  var r = eval(str);
  console.log(r)


// 构造函数求值

  var add = new Function("a", "b", "return a + b;");

//创建script在全局 执行字符串
function globalEval(data) {
  data = data.replace(/^\s*|\s*$/g, '');
  if(data) {
    var head = document.getElementsByTagName('head')[0] ||
               document.documentElement,
        script = document.createElement('script');
    script.type = "text/javascript";
    script.text = data;
    head.appendChild(script);
    head.removeChild(script);
  }
}

