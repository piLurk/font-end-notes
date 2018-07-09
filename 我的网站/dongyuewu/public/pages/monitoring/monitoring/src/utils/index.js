import { setToken, getToken, TokenKey, getHost } from './auth'

import './errorLog'

function getTokenFromUrl() {
  try {
    const search = decodeURIComponent(location.search)
    const token = search.split('?token=')[1]
    return token
  } catch (error) {
    // console.log(error)
    return ''
  }
}

let token = getTokenFromUrl()
if (token) {
  setToken(token)
} else {
  token = getToken()
}

if (process.env.NODE_ENV === 'development' & !token) {
  setToken(BROWSER_CONFIG.COOKIE)
}

export default {
  install(Vue, options) {
    Vue.prototype.host = getHost()
    Vue.prototype.token = getToken()
  }
}