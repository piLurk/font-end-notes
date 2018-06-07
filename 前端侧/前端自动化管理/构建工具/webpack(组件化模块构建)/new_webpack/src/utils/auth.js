import Cookies from 'js-cookie'

export const TokenKey = 'access-token'


export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  console.log(token,'guagua')
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}