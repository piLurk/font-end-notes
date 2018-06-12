import http from './http'

// 条件查询订单列表
export function getOrders(params, cb, errorCb) {
  return http.put('deploy/all', params, cb, errorCb)
}

// 根据订单ID查询配置方案列表
export function getOrdersPlan(orderId, cb, errorCb) {
  return http.get(`deploy/order/${orderId}`, cb, errorCb)
}

// 提交、提交审批、作废配置方案
export function operOrdersPlan(operType, planId, cb, errorCb) {
  return http.put(`deploy/${operType}_state/operate/${planId}`, {}, cb, errorCb)
}

// 根据订单ID查询返回基本信息
export function getOrdersPlanDetail(planId, cb, errorCb) {
  return http.get(`deploy/basic/${planId}`, cb, errorCb)
}

// 获取标配物品
export function getStandardDetail(contractNumber, sortId, cb, errorCb) {
  return http.get(`${contractNumber}/standard/${sortId}`, cb, errorCb)
}

// 获取获取相关配配件及组装费
export function getGoodsAddition(functionType, goodsId, proId, cb, errorCb) {
  return http.put('accessory', { functionType, goodsId, pkId: proId }, cb, errorCb)
}

// 获取物品价格
export function getGoodsPriceDetail(goodsId, proId, cb, errorCb) {
  return http.get(`cost/${goodsId}/unit/${proId}`, cb, errorCb)
}

// 保存物品配置
export function saveConfPlan(params, cb, errorCb) {
  return http.post('deploy', params, cb, errorCb)
}

// 根据配置方案ID查询配置方案详情
export function getConfPlan(pkId, cb, errorCb) {
  return http.get(`deploy/configure/${pkId}`, cb, errorCb)
}

// 根据配置详情id查询配置详情
export function getConfPlanDetail(detailsId, cb, errorCb) {
  return http.get(`detail/${detailsId}`, cb, errorCb)
}

// 编辑配置方案
export function editConfPlan(params, cb, errorCb) {
  return http.put('deploy', params, cb, errorCb)
}

// 查询订单(派工单)
export function getOrdersByWork(params, cb, errorCb) {
  return http.put('orders/all', params, cb, errorCb)
}

// 查询配置方案下的派工单
export function getWorkOrders(deployId, cb, errorCb) {
  return http.get(`allot/deploy/${deployId}`, cb, errorCb)
}

// 查看制定施工计划
export function getConstructionPlan(deployId, cb, errorCb) {
  return http.get(`orders/${deployId}`, cb, errorCb)
}

// 修改施工计划（单项）
export function getEditPlan(workOrdersId, cb, errorCb) {
  return http.get(`orders/allot/${workOrdersId}`, cb, errorCb)
}

// 修改施工计划（单项）
export function putEditPlan(params, cb, errorCb) {
  return http.put(`orders`, params, cb, errorCb)
}

// 保存施工计划
export function saveConstructionPlan(params, cb, errorCb) {
  return http.post('orders', params, cb, errorCb)
}

// 修改派单状态
export function operOrdersState(type, id, cb, errorCb) {
  return http.delete(`orders/${type}/operate/${id}`, cb, errorCb)
}







