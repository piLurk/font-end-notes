import axios from 'axios'
import { Message } from 'element-ui'



// create an axios instance
const _request = axios.create({
  baseURL: BROWSER_CONFIG.BASE_API, // api的base_url
  timeout: 10000, // request timeout
  responseType: 'json'

})


function sendErrorMessage(errorMsg) {
  Message({
    message: errorMsg,
    type: 'warning',
    duration: 4 * 1000
  })
}
const request = function ({ method, url, params, data, cb = function() { }, errorCb = sendErrorMessage }) {
  // if(!this instanceof request) {
  //   return new request(arguments);
  // }
  return _request({
    method,
    params,
    data,
    url
  }).then((response) => {
    var res = response.data;
    
    if (res.code === 0) {
      cb(res.data)
      return res
    } else {
      var message = res.message;
      if (typeof message === 'string' && message.indexOf('@') === 0) {
        sendErrorMessage(message.slice(1));
      } else {
        errorCb(message)
      }
      
    }
  }).catch(error => {
    console.log(error)
    errorCb('服务器错误！')
  })
}
export default request
