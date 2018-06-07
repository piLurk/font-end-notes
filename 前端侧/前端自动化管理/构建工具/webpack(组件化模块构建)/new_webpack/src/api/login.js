import request from './request'


export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  console.log('a')
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
  console.log("b")
}

