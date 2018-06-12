import http from './http'

//get data of orderQuery lists 
export function getOrderList(params, cb, errorCb) {
  return http.post('/jrOrder/orders', params, cb, errorCb)
}
//get data of orderDetail 
export function getorderDetail(pkId, cb, errorCb) {
  return http.get(`jrOrder/order/${pkId}`, cb, errorCb)
}

//请求工期规则管理列表数据
export function getSchedulePlanData(params, cb, errorCb) {
  return http.put(`rules/all`, params, cb, errorCb)
}

//获取所有装修项目列表
export function getGoodsName(cb, errorCb) {
  return http.get(`goods/decorate`, cb, errorCb)
}

//保存新增工期规则
export function saveSchedulePlan(params, cb, errorCb) {
  return http.post('rules', params, cb, errorCb)
}

//编辑查看工期规则
export function getidforSchedulePlan(pkId, cb, errorCb) {
  return http.get(`rules/${pkId}`, cb, errorCb)
}

//保存编辑工期规则  
export function saveEditSchedulePlan(params, cb, errorCb) {
  return http.put(`rules`, params, cb, errorCb)
}

//删除工期规则
export function deleteSchedulePlan(pkId, cb, errorCb) {
  return http.delete(`rules/${pkId}`, cb, errorCb)
}



//******************************************** 日历项目获取节假日数据  ********************************************//
//获取当月节假日数据
export function getHoliday(year, month, cb, errorCb) {
  return http.get(`holiday/${year}/${month}/days`, cb, errorCb)
}

//保存当月节假日数据
export function saveHolidayData(params, cb, errorCb) {
  return http.post('holiday', params, cb, errorCb)
}


//******************************************** 配置方案审批  ********************************************//
//获取配置方案数据列表
export function getAllData(params, cb, errorCb) {
  return http.put(`deploy/all`, params, cb, errorCb)
}

//根据父ID获取子级数据
export function getSubproGroup(pkId, cb, errorCb) {
  return http.get(`deploy/order/${pkId}`, cb, errorCb)
}

// 查看审批记录
export function getApproveRecord(id, cb, errorCb) {
  return http.get(`flow/${id}`, cb, errorCb)
}

// 驳回/审批
export function approvePlan(params, cb, errorCb){
  return http.put(`flow`, params, cb, errorCb)
}

//query order data
export function getNewOrderData(contractNumber, cb, errorCb) {
  return http.get(`jrdeploy/queryLeaseInfo/${contractNumber}`, cb, errorCb)
}

//获取房屋信息变更列表
export function getHouseInfoList(params, cb, errorCb) {
  return http.put('/alter/all', params, cb, errorCb)
}

//获取补充工期订单列表
export function getRelenishList(params, cb, errorCb) {
  return http.put('/schedule/all', params, cb, errorCb)
}
//根据订单id查询补充工期
export function getRelenishReasonList(orderId, cb, errorCb) {
  return http.get(`/schedule/${orderId}`, cb, errorCb)
}

//存储补充工期
export function saveRelenishReason(params, cb, errorCb) {
  return http.post('/schedule', params, cb, errorCb)
}
//查询信息变更列表
export function getInfoChangeList(params, cb, errorCb) {
  return http.put('/alter', params, cb, errorCb)
}
// 获取房屋信息图片
export function getHousePic(pkId, cb, errorCb) {
  return http.get(`/house/rooms/${pkId}`, cb, errorCb)
}
//保存房屋信息变更列表
export function saveInfoChangeList(params, cb, errorCb) {
  return http.put('/alter/modifyRoom', params, cb, errorCb)
}
//查询成本统计列表
export function getCostCountList(params, cb, errorCb) {
  return http.put('/statistics/all', params, cb, errorCb)
}

