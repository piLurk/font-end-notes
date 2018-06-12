import http from './http'

/****************   条件查询订单列表   ****************/
// 派工单验收
export function getOrders1(params, cb, errorCb) {
  return http.put('allot/all', params, cb, errorCb)
}
// 信息交付
export function getOrders2(params, cb, errorCb) {
  return http.put('payment/all', params, cb, errorCb)
}
// 竣工验收
export function getOrders3(params, cb, errorCb) {
  return http.put('completion/all', params, cb, errorCb)
}
/****************   条件查询订单列表   ******end*******/

// 根据订单id查询派工单列表
export function getWorkOrders(orderId, cb, errorCb) {
  return http.get(`allot/order/${orderId}`, cb, errorCb)
}

// 点击验收返回基本信息
export function getCheckOrders(pkId, cb, errorCb) {
  return http.get(`allot/check/${pkId}`, cb, errorCb)
}

// 查看派工单详情
export function getCheckedOrders(pkId, cb, errorCb) {
  return http.get(`allot/allot/${pkId}`, cb, errorCb)
}

// 验收派工单
export function checkOrders(params, cb, errorCb) {
  return http.post('allot', params, cb, errorCb)
}
// 编辑工单
export function editOrders(params, cb, errorCb) {
  return http.post('allot/modify', params, cb, errorCb)
}

// 查看竣工验收基本信息
export function getCompletedBasic(id, cb, errorCb) {
  return http.get(`completion/order/${id}`, cb, errorCb)
}

// 根据配置详情id查询配置明细
export function getCompletedDetail(ids, cb, errorCb) {
  ids = typeof ids === 'string' ? [ids] : ids
  return http.put('completion/details', ids, cb, errorCb)
}

// 竣工验收驳回、通过
export function operCompletion(operate, id, cb, errorCb) {
  return http.get(`completion/${operate}/${id}`, cb, errorCb)
}

//补派单
export function supplyallot(id, cb, errorCb) {
  return http.get(`allot/supplyallot/${id}`, cb, errorCb)
}

