import request from './request'


export function queryRightData() {
  return request({
    url: '/queryRightData',
    method: 'get'
  })
}
export function queryLeftData(options) {
  return request({
    url: '/queryLeftData',
    method: 'get',
    ...options
  })
}
export function getNewOrderList(options) {
  return request({
    url: '/getNewOrderList',
    method: 'get',
    ...options
  })
}

