import request from './request'


export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}
export function getUserId(options) {
  return request({
    url: '/cms/validToken',
    method: 'get',
    ...options
  })
}
export function getUserInfo(options) {
  return request({
    url: '/cms/getRolesAndPermissionsByUserId',
    method: 'get',
    ...options
  })
}

