// import debounce from 'lodash/debounce'
import { dateFilter, timeFilter, timeFilter00 } from './date'
import config from 'config'
import { setToken, getToken, TokenKey } from './auth'

function getHost() {
  return config.host
}
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
function getTokenFromUrl() {
  try {
    const search = decodeURIComponent(location.search)
    const loginInfo = search.slice(1).split('=')[1]
    const infoObj = JSON.parse(loginInfo)
    return infoObj[TokenKey]
  } catch (error) {
    // console.log(error)
    return ''
  }
}
const token = getTokenFromUrl()
if (token) {
  setToken(token)
}
if (process.env.NODE_ENV === 'development') {
  setToken(config.cookie)
}

export default {
  install(Vue, options) {

    Vue.prototype.host = getHost()
    Vue.prototype.token = getToken()
    Vue.filter('toDate', dateFilter)
    Vue.filter('toTime00', timeFilter00)
    Vue.filter('toTime', timeFilter)
    Vue.filter('blank', blankFilter)
    Vue.filter('￥', moneyFilter)
    Vue.filter('sMeter', squareMeter)
    Vue.filter('ifOrNot', ifOrNot)
    Vue.filter('toDay', dayFilter)
  }
}