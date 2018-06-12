import http from './http'

//get data of measureQuery lists 
export function getMeasureList(params,cb,errorCb) {
  return http.put('/measure/all', params, cb, errorCb)
}

//get houseMeasure 
export function getHouseMeasure(pkId,cb,errorCb) {
  return http.get(`measure/order/${pkId}`, cb, errorCb)
}
//set houseMeasure 
export function setHouseMeasure_1(params,cb,errorCb) {
  return http.put('/measure/cycleRule', params, cb, errorCb)
}
export function setHouseMeasure_2(params,cb,errorCb) {
  return http.put('/measure/modifyCycle', params, cb, errorCb)
}

//get HouseMsg 
export function getHouseMsg_1(pkId,cb,errorCb) {
  return http.get(`/house/room/${pkId}`, cb, errorCb)
}
export function getHouseMsg_2(pkId,cb,errorCb) {
  return http.get(`/house/rooms/${pkId}`, cb, errorCb)
}
//set HouseMsg 
export function setHouseMsg_1(params,cb,errorCb) {
  return http.put('/house/room', params, cb, errorCb)
}
export function setHouseMsg_2(params,cb,errorCb) {
  return http.put('/house/housing', params, cb, errorCb)
}

//get HouseProperty 
export function getHouseProperty_1(pkId,cb,errorCb) {
  return http.get(`/measure/goods/${pkId}`, cb, errorCb)
}
export function getHouseProperty_2(pkId,cb,errorCb) {
  return http.get(`/measure/roomGoods/${pkId}`, cb, errorCb)
}
//set HouseProperty 
export function setHouseProperty_1(params,cb,errorCb) {
  return http.put('/measure/goods', params, cb, errorCb)
}
export function setHouseProperty_2(params,cb,errorCb) {
  return http.put('/measure/modifyGoods', params, cb, errorCb)
}

//get HousePic
export function getHousePic(params,cb,errorCb) {
  return http.put('/alter/pics',params, cb, errorCb)
}
//set HousePic
export function setHousePic_1(params,cb,errorCb) {
  return http.post('/alter/pic', params, cb, errorCb)
}
export function setHousePic_2(params,cb,errorCb) {
  return http.put('/alter/pic', params, cb, errorCb)
}


