import request from '@/utils/request'

//查看公告提醒数量
export function getRemindNum(params) {
  return request({
    url: '/workPlat/countTips',
    method: 'post',
    params
  })
}

//查询提醒列表
export function getRemindList(params) {
  return request({
    url: '/workPlat/listTips',
    method: 'post',
    params
  })
}

//标记为已读
export function readRemind(params) {
  return request({
    url: '/workPlat/readTip',
    method: 'post',
    params
  })
}

//全部标记为已读
export function readAllRemind(params) {
  return request({
    url: '/workPlat/readAllTip',
    method: 'post',
    params
  })
}

//获取当前可显示简报期数
export function getWeekCount(params) {
  return request({
    url: '/workPlat/getWeekCount',
    method: 'post',
    params
  })
}

//查看简报
export function seeWeekBrief(params) {
  return request({
    url: '/workPlat/report',
    method: 'post',
    params
  })
}

// 收出房业绩
export function getPerformance(params) {
  return request({
    url: '/achievement/viewAchievementAchieve',
    method: 'get',
    params
  })
}
//解约
export function getTermination(params) {
  return request({
    url: '/workPlat/listCancelType',
    method: 'get',
    params
  })
}
//解约详细数据
export function getTerminationData(params) {
  return request({
    url: '/workPlat/countCancel',
    method: 'get',
    params
  })
}
//排行榜大区排行总数
export function countAllAchievementRank(params) {
  return request({
    url: '/achievement/countAllAchievementRank',
    method: 'post',
    params
  })
}

//排行榜列表
export function listAllAchievementRank(params) {
  return request({
    url: '/achievement/listAllAchievementRank',
    method: 'post',
    params
  })
}

//收房单量排行榜总数
export function countGantherAchievementRank(params) {
  return request({
    url: '/achievement/countGantherAchievementRank',
    method: 'post',
    params
  })
}

//收房单量排行榜列表
export function listGatherAchievementRank(params) {
  return request({
    url: '/achievement/listGatherAchievementRank',
    method: 'post',
    params
  })
}

//出房单量排行榜总数
export function countRentAchievementRank(params) {
  return request({
    url: '/achievement/countRentAchievementRank',
    method: 'post',
    params
  })
}

//出房单量排行榜列表
export function listRentAchievementRank(params) {
  return request({
    url: '/achievement/listRentAchievementRank',
    method: 'post',
    params
  })
}

//跟进情况新增客户总数
export function countNewCustom(params) {
  return request({
    url: '/workPlat/countNewCustom',
    method: 'post',
    params
  })
}

//跟进情况新增客户列表
export function listNewCustom(params) {
  return request({
    url: '/workPlat/newCustom',
    method: 'post',
    params
  })
}

//出房完成情况
export function viewRentAchievement(params) {
  return request({
    url: '/achievement/viewRentAchievement',
    method: 'post',
    params
  })
}

//收房目标及完成情况
export function viewGanthAchievement(params) {
  return request({
    url: '/achievement/viewGanthAchievement',
    method: 'post',
    params
  })
}

//房间状态
export function viewHouseState(params) {
  return request({
    url: '/achievement/viewHouseState',
    method: 'post',
    params
  })
}