import http from './http'

// 配置房源总览
export function getHouseOverview(type, cb, errorCb) {
  return http.get(`workbench/order/${type}`, cb, errorCb)
}

// 配置进度总览
export function getProgressOverview(type,cb, errorCb) {
  return http.get(`workbench/config/${type}`, cb, errorCb)
}

// 订单总览
export function getOrdersOverview(params, cb, errorCb) {
  return http.put('workbench/all', params, cb, errorCb)
}

