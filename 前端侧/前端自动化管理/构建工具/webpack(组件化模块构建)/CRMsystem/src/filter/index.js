// import debounce from 'lodash/debounce'
function blankFilter(value) {
  if (value === false || value === 0) {
    return value
  }
  return value || '---'
}
function moneyFilter(value) {
  return value + ' 元'
}
function squareMeter(value) {
  return value + ' ㎡'
}
function getAbs(value) {
  if (value === false) {
    return value
  }
  if( value === null){
    return '---'
  }
  if(!isNaN(value)){
    return Math.abs(value)+'%'
  }else{
    return value || '---'
  }
}
export default {
  install(Vue, options) {
    Vue.filter('blank', blankFilter)
    Vue.filter('￥', moneyFilter)
    Vue.filter('sMeter', squareMeter)
    Vue.filter('perAbs', getAbs)
  }
}