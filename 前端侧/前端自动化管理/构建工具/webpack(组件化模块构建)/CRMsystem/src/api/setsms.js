import request from '@/utils/request'
//   ----------------------------------------------- 短信设置页面 -----------------------------------------------------
// 获取具体节日选项列表
export function getlistHoliday(params) {
  return request({
    url: '/holidayBlessing/listHoliday',
    method: 'get',
    params
  })
}
// 获取节日列表总数据条数
export function getCount(params) {
  return request({
    url: '/holidayBlessing/count',
    method: 'get',
    params
  })
}
// 获取节日列表总数据
export function getlistData(params) {
  return request({
    url: '/holidayBlessing/list',
    method: 'get',
    params
  })
}
// 删除节日
export function deleteHoliday(params) {
  return request({
    url: '/holidayBlessing/del',
    method: 'get',
    params
  })
}
// 保存节日
export function saveHoliday(params) {
  return request({
    url: '/holidayBlessing/add',
    method: 'get',
    params
  })
}
// 获取服务器时间
export function getServiceDate(params) {
  return request({
    url: '/holidayBlessing/getTime',
    method: 'get',
    params
  })
}
