import http from './http'
import { getToken, TokenKey, removeToken } from '@/utils/auth'
import config from 'config'

export function logout() {
  return http.post('/login/logout')
}

export function getUserInfo(token, cb, errorCb) {
  return http.get('/role', cb, errorCb)
  // .then(cb).catch(response => {
  //   console.log(response.response.status)
  //   if(response.response.status === 401) {
  //     removeToken()
  //     // location.href = config.logOut + '/logout'
  //   }
  // })
}
