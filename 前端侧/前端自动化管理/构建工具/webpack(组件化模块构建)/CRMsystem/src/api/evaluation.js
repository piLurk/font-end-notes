import request from '@/utils/request'

// 获取所有评价
export function getEvaluation(params) {
  return request({
    url: '/evaluate/queryEvaluates.json',
    method: 'post',
    params
  })
}

export function getEvaluateLabel() {
  return request({
    url: '/evaluate/getEvaluateLabel.json',
    method: 'post'
  })
}

export function mergeEvaluate(params) {
  return request({
    url: '/evaluate/mergeEvaluate.json',
    method: 'post',
    params
  })
}

export function saveEvaluate(params) {
  return request({
    url: '/evaluate/saveEvaluate.json',
    method: 'post',
    params
  })
}

export function exportEvaluate(params) {
  return request({
    url: '/evaluate/exportEvaluate',
    method: 'post',
    params
  })
}