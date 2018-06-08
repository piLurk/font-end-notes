import request from './request'


export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(options) {
  return request({
    url: '/user/info',
    method: 'get',
    ...options
  })
}

