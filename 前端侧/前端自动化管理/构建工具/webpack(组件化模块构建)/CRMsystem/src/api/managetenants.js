import request from '@/utils/request'

// 获取所有租客
export function getRenterinfo(params) {
  return request({
    url: '/renterinfo/list.json',
    method: 'get',
    params
  })
}

// 获取责任区域大区
export function getlistAreaDeparement(params) {
  return request({
    url: '/renterinfo/listAreaDeparement.json',
    method: 'get',
    params
  })
}

// 获取责任区域大区旗下子业务组
export function getlistGroupDeparement(params) {
  return request({
    url: '/renterinfo/listGroupDeparement.json',
    method: 'get',
    params
  })
}

// 详情页
// 查询租客详情
export function getBasic(params) {
  return request({
    url: '/renterinfo/getbasic.json',
    method: 'get',
    params
  })
}

// 查询租客合同信息
export function getContracts(params) {
  return request({
    url: '/renterinfo/getcontracts.json',
    method: 'get',
    params
  })
}

// 查询租客解约信息
export function getCancelContracts(params) {
  return request({
    url: '/renterinfo/getcancelcontracts.json',
    method: 'get',
    params
  })
}

// 学历审批接口
export function workflowComplete(params) {
  return request({
    url: '/renterinfo/workflowComplete.json',
    method: 'post',
    params
  })
}

// 手动发免押卷接口
export function sendcoupon(params) {
  return request({
    url: '/renterinfo/sendcoupon.json',
    method: 'get',
    params
  })
}