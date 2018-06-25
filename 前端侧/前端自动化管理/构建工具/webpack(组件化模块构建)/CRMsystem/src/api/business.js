import request from '@/utils/request'
//   ----------------------------------------------- 商机页面 -----------------------------------------------------
// 获取跟进状态
export function getlistStat(params) {
  return request({
    url: '/proprietorBespeak/listStat',
    method: 'get',
    params
  })
}
// 获取信息来源
export function getlistSource(params) {
  return request({
    url: '/proprietorBespeak/listSource',
    method: 'get',
    params
  })
}
// 获取责任区域大区
export function getlistAreaDeparement(params) {
  return request({
    url: '/proprietorBespeak/listAreaDeparement',
    method: 'get',
    params
  })
}
// 获取责任区域大区旗下子业务组
export function getlistGroupDeparement(params) {
  return request({
    url: '/proprietorBespeak/listGroupDeparement',
    method: 'get',
    params
  })
}
// 获取数据总条数(全部商机)
export function getAllcount(params) {
  return request({
    url: '/proprietorBespeak/count',
    method: 'get',
    params
  })
}
// 根据条件获取所有表格数据(全部商机)
export function getBusinessList(params) {
  return request({
    url: '/proprietorBespeak/list',
    method: 'get',
    params
  })
}
// 获取数据总条数(我的商机)
export function getcountMy(params) {
  return request({
    url: '/proprietorBespeak/countMy',
    method: 'get',
    params
  })
}
// 根据条件获取数据(我的商机)
export function getMyBusinessList(params) {
  return request({
    url: '/proprietorBespeak/listMy',
    method: 'get',
    params
  })
}
// 新增商机获取区域
export function getAreaBusinessOptions(params) {
  return request({
    url: '/proprietorBespeak/listTrading',
    method: 'get',
    params
  })
}
// 获取客户类别
export function getCustomerBusinessTypeOptions(params) {
  return request({
    url: '/proprietorBespeak/listCustomerType',
    method: 'get',
    params
  })
}
// 新增商机获取委托楼盘查询列表
export function getsearchlistPremiseOptions(params) {
  return request({
    url: '/proprietorBespeak/listPremise',
    method: 'get',
    params
  })
}
// 保存新增商机
export function saveAddNewbusiness(params) {
  return request({
    url: '/proprietorBespeak/add',
    method: 'get',
    params
  })
}