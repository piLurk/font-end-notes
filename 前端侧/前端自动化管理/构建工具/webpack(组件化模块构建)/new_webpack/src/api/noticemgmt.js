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

// 获取所有部门
export function getAllDepartments(options) {
  return request({
    url:'/notice/toNoticeAdd',
    method:'get',
    ...options
  })
} 


// 上传文件
export function noticeUploadFile(options) {
  return request({
    url:'/notice/uploadFile',
    method:'post',
    ...options
  })
} 

// 新增公告保存
export function addNotice(options) {
  return request({
    url:'/notice/addNotice',
    method:'post',
    ...options
  })
}
// 公告发布
export function publishNotice(options) {
  return request({
    url:'/notice/publishNotice',
    method:'post',
    ...options
  })
}

// 删除文件
export function deleteFile(options) {
  return request({
    url:'/notice/deleteAttach',
    method:'post',
    ...options
  })
}


// 获取公告详情
export function getNoticeDetail(options) {
  return request({
    url:'/notice/findNoticeById',
    method:'get',
    ...options
  })
}
//编辑公告保存
export function editNotice(options) {
  return request({
    url:'/notice/editNotice',
    method:'post',
    ...options
  })
}
