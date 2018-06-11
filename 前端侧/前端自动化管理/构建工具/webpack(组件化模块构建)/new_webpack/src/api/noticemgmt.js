import request from './request'

// ---- 公告设置

// 公告列表
export function getAllNotice(options) {
  return request({
    url:'/notice/selectNoticeByKeyWords',
    method:'post',
    ...options
  })
} 
