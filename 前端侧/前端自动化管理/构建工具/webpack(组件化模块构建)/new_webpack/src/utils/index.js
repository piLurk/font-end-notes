import { setToken, getToken, TokenKey } from './auth'


function getHost() {
  return BROWSER_CONFIG.BASE_API
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
  console.log('yes', BROWSER_CONFIG.COOKIE)
  setToken(BROWSER_CONFIG.COOKIE)
}

export default {
  install(Vue, options) {
    Vue.prototype.host = getHost()
    Vue.prototype.token = getToken()
  }
}