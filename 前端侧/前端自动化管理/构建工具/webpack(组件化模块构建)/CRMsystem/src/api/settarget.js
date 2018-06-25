import request from '@/utils/request'
//   ----------------------------------------------- 设置目标页面 -----------------------------------------------------
// 获取大区数据列表
export function getlistAllObjectives(params) {
  return request({
    url: '/achievement/listAllObjectives',
    method: 'get',
    params
  })
}
// 保存修改目标数量
export function savebatchUpdateObjective(params) {
  return request({
    url: '/achievement/batchUpdateObjective',
    method: 'post',
    params
  })
}
// 获取业主组列表
export function getlistAreaObjectives(params) {
  return request({
    url: '/achievement/listAreaObjectives',
    method: 'get',
    params
  })
}
// 获取管家大区列表
export function getlistGroupObjectives(params) {
  return request({
    url: '/achievement/listGroupObjectives',
    method: 'get',
    params
  })
}