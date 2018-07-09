import request from './request'


export function sendLogs(options) {
  return request({
    url: '/sendLogs',
    method: 'post',
    ...options
  })
}

