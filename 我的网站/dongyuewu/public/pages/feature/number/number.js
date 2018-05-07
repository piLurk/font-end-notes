
function log(msg) {
  console.log(`/*************
  ${msg}
  ***************/`)
}


// 数值处理

var arr =[1.4801, 1.810, -1.8, -1.499, -1.51, -1.55, 1.52]

// ceil 向上取整
log('Math.ceil')
function getCeil(x) {
  console.log( Math.ceil(x) )
}
arr.map( getCeil )


// floor 向下取整
log('Math.floor')
function getFloor(x) {
  console.log( Math.floor(x) )
}
arr.map( getFloor )

// round 四舍五入
log('Math.round')
function getRound(x) {
  console.log( Math.round(x) )
}
arr.map( getRound )

// prototype.toFixed( x ) 获取x位小数
log('Math.prototype.toFixed')
function getToFixed(x) {
  console.log( x.toFixed(1) )
}
arr.map( getToFixed );


// 取极值
log('Math.max')
console.log(Math.max(...arr));
log('Math.min')
console.log(Math.min(...arr));

// 取随机数
log('Math.random')
console.log(Math.ceil( Math.random() * 100  + 1 ) );

// 开平方
log('Math.sqrt')
console.log(Math.sqrt(2))
// 对数运算
  // 求值 3为底 27的对数
log('Math.log')
function getBaseLog(base, x) {
  return Math.log(x) / Math.log(base);
}
var r = getBaseLog(3, 27);
console.log(r)  // --> 3.0000000000000004 有浮点误差的影响