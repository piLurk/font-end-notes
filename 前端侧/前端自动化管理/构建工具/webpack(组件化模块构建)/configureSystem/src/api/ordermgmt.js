import http from './http'

//get data of orderQuery lists 
export function getOrderList(params,cb,errorCb) {
  return http.put('/order/all', params, cb, errorCb)
}
//get data of orderDetail 
export function getorderDetail(pkId,cb,errorCb) {
  return http.get(`/order/details/${pkId}`, cb, errorCb)
}
//query order data
export function getNewOrderData(contractNumber,cb,errorCb){
  return http.get(`deploy/compact/${contractNumber}`,cb,errorCb)
}
// query missing order list
export function getMissOrderList(params,cb,errorCb) {
  return http.put('/order/recreate/all', params, cb, errorCb)
}
// add missing order
export function addMissOrder(params,cb,errorCb) {
  return http.post('/order/recreate', params, cb, errorCb)
}
//set data of order
export function setOrder(cb,errorCb) {
    // return http.post('jrProvider/providers')
    //   .then((res) => {
    //     cb(res.data);
    //   })
    //   .catch(error => { errorCb && errorCb(error) });
  }

// 根据订单ID查询返回基本信息
export function getOrdersPlanDetail(planId, cb, errorCb) {
  return http.get(`deploy/basic/${planId}`, cb, errorCb)
}
// 根据配置方案ID查询配置方案详情
export function getConfPlan(pkId, cb, errorCb) {
  return http.get(`deploy/configure/${pkId}`, cb, errorCb)
}
//获取超期原因
export function getOutTime(orderId,cb,errorCb) {
  return http.get(`/payment/apply/${orderId}`,cb, errorCb)
}
//提交竣工验收
export function submitAcceptance(orderId,cb,errorCb) {
  return http.get(`/payment/confirm/${orderId}`,cb, errorCb)
}
//录入超期原因
export function saveOutReason(params,cb,errorCb) {
  return http.put('/payment/cause',params,cb, errorCb)
}
//set HousePic
export function setHousePic_1(params,cb,errorCb) {
  return http.post('/payment/pic', params, cb, errorCb)
}
export function setHousePic_2(params,cb,errorCb) {
  return http.put('/payment/pic', params, cb, errorCb)
}
