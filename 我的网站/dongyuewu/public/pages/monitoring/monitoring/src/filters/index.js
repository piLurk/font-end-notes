


function blankFilter(value) {
  if (value === false || value === 0) {
    return value
  }
  return value || '---'
}
function moneyFilter(value) {
  if(value === '---'){
    return value
  }
  return value + ' 元'
}

function dateFilter(time, cFormat) {
  if(arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date;
  if(typeof time === 'object') {
    date = time
  }else{
    if(('' + time).length === 10 && (''+time).indexOf('-') === -1 ) time = parseInt(time) * 1000;
    date = new Date(time)
  }
  var formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if(key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if((''+value).length > 0 && value - 10 < 0) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
} 
function dayFilter(value){
  if(value === '---'){
    return value
  }
  return value + '天'
}
function squareMeter(value) {
  if(value === '---'){
    return value
  }
  return value + ' ㎡'
}
function ifOrNot(value) {
  switch (value) {
    case null:
      return '---'
    case 1:
      return '是'
    case 0:
      return '否'
    default:
      return '---'
  }
}

export default {
  install(Vue, options) {
    Vue.filter('blank', blankFilter)
    Vue.filter('toDate', dateFilter)
    Vue.filter('￥', moneyFilter)
    Vue.filter('sMeter', squareMeter)
    Vue.filter('ifOrNot', ifOrNot)
    Vue.filter('toDay', dayFilter)
  }
}