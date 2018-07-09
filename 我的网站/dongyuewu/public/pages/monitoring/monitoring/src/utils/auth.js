import Cookies from 'js-cookie'

export const TokenKey = 'token'


export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function getHost() {
  return BROWSER_CONFIG.BASE_API
}
export function removeToken() {
  return Cookies.remove(TokenKey)
}