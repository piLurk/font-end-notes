import request from '@/utils/request'
// 获取用户userId
export function getUserId(token) {
  return request({
    url: '/workPlat/validToken',
    method: 'get',
    params: { token }
  })
}
// 获取用户信息
export function getInfo(userId) {
  return request({
    url: '/workPlat/getRolesAndPermissionsByUserId',
    method: 'get',
    params: { userId }
  })
}

// 登出接口
// export function ajaxLogout(userId) {
//   return request({
//     url: '/workPlat/ajaxLogout',
//     method: 'get',
//     params: { userId }
//   })
// }

// 验证用户是否可以使用
export function vaildUser(params) {
  return request({
    url: '/workPlat/vaildUser',
    method: 'post',
    params
  })
}

// 发送短信验证码
export function sendVcode(params) {
  return request({
    url: '/workPlat/sendVcode',
    method: 'post',
    params
  })
}

// 验证短信验证码
export function vaildVcode(params) {
  return request({
    url: '/workPlat/vaildVcode',
    method: 'post',
    params
  })
}
