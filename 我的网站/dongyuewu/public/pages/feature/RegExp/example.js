
// 获取页面中query对应的值
function getParamName(attr) {
  let _search = '?name=jawil&year=15&time=2018'
  let match = RegExp(`[?&]${attr}=([^&]*)`) //分组运算符是为了把结果存到exec函数返回的结果里
    .exec(window.location.search || _search)
  //["?name=jawil", "jawil", index: 0, input: "?name=jawil&age=23"]
  return match && decodeURIComponent(match[1].replace(/\+/g, ' ')) // url中+号表示空格,要替换掉
}
  
// 格式化数字
function formatNum(str,n){
  let reg = RegExp(`\\B(?=(\\d{${n}})+(?!\\d))`,'g')
  return str.replace(reg,',')
}


//去空格
function trim(str){
  return str.replace(/(^\s+)|(\s+$)/g, '')
}
//判读是否为质数
function isPrime(num) {
  return !/^1?$|^(11+?)\1+$/.test(Array(num+1).join('1'))
}

// 数组去重
function unique(arr) {
    return arr.sort().join(",,").
    replace(/(,|^)([^,]+)(,,\2)+(,|$)/g, "$1$2$4").
    replace(/,,+/g, ",").
    replace(/,$/, "").
    split(",")
}
  


