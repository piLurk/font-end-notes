import request from '@/utils/request'
//   ----------------------------------------------- 业主管理页面 -----------------------------------------------------
// 获取责任区域大区
export function getlistAreaDeparement(params) {
  return request({
    url: '/proprietorManager/listAreaDeparement',
    method: 'get',
    params
  })
}
// 获取责任区域大区旗下子业务组
export function getlistGroupDeparement(params) {
  return request({
    url: '/proprietorManager/listGroupDeparement',
    method: 'get',
    params
  })
}
// 获取数据总条数(全部业主)
export function getAllcount(params) {
  return request({
    url: '/proprietorManager/count',
    method: 'get',
    params
  })
}
// 根据条件获取所有表格数据(全部业主)
export function getOwnerList(params) {
  return request({
    url: '/proprietorManager/list',
    method: 'get',
    params
  })
}
// 获取数据总条数(我的业主)
export function getcountMy(params) {
  return request({
    url: '/proprietorManager/countMy',
    method: 'get',
    params
  })
}
// 根据条件获取数据(我的业主)
export function getMyOwnerList(params) {
  return request({
    url: '/proprietorManager/listMy',
    method: 'get',
    params
  })
}