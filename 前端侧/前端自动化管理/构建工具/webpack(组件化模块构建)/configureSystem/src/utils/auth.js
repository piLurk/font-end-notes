import Cookies from 'js-cookie'

export const TokenKey = 'access_token'
export const UserKey = ['username', 'userid']

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, { expires: 7 })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setCookie(key, value) {
  return Cookies.set(key, value, { expires: 7 })
}

export function removeCookie(key) {
  return Cookies.remove(key)
}