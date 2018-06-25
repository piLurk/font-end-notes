import request from '@/utils/request'
//   ----------------------------------------------- 线索页面 -----------------------------------------------------
// 获取跟进状态
export function getlistStat(params) {
  return request({
    url: '/renterBespeak/listStat',
    method: 'get',
    params
  })
}
// 获取信息来源
export function getlistSource(params) {
  return request({
    url: '/renterBespeak/listSource',
    method: 'get',
    params
  })
}
// 获取责任区域大区
export function getlistAreaDeparement(params) {
  return request({
    url: '/renterBespeak/listAreaDeparement',
    method: 'get',
    params
  })
}
// 获取责任区域大区旗下子业务组
export function getlistGroupDeparement(params) {
  return request({
    url: '/renterBespeak/listGroupDeparement',
    method: 'get',
    params
  })
}
// 获取数据总条数(全部线索)
export function getAllcount(params) {
  return request({
    url: '/renterBespeak/count',
    method: 'get',
    params
  })
}
// 根据条件获取所有表格数据(全部线索)
export function getClueList(params) {
  return request({
    url: '/renterBespeak/list',
    method: 'get',
    params
  })
}
// 获取数据总条数(我的线索)
export function getcountMy(params) {
  return request({
    url: '/renterBespeak/countMy',
    method: 'get',
    params
  })
}
// 根据条件获取数据(我的线索)
export function getMyClueList(params) {
  return request({
    url: '/renterBespeak/listMy',
    method: 'get',
    params
  })
}
// 新增线索获取区域
export function getAreaOptions(params) {
  return request({
    url: '/renterBespeak/listTrading',
    method: 'get',
    params
  })
}
// 新增线索获取客户类别
export function getCustomerTypeOptions(params) {
  return request({
    url: '/renterBespeak/listCustomerType',
    method: 'get',
    params
  })
}
// 新增线索获取意向楼盘查询列表
export function getsearchHouseResourcesListOptions(params) {
  return request({
    url: '/renterBespeak/searchHouseResourcesList',
    method: 'get',
    params
  })
}
// 保存新增线索
export function saveAddNewclue(params) {
  return request({
    url: '/renterBespeak/add',
    method: 'get',
    params
  })
}

// 查询线索详情
export function renterBespeak(params) {
  return request({
    url: '/renterBespeak/get.json',
    method: 'get',
    params
  })
}