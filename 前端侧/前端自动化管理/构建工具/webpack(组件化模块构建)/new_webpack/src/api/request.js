import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken, removeToken } from '@/utils/auth'



// create an axios instance
console.log();
const _request = axios.create({
  baseURL: BROWSER_CONFIG.BASE_API, // api的base_url
  timeout: 5000, // request timeout
  responseType: 'json'

})

// request interceptor
_request.interceptors.request.use(config => {
  // Do something before request is sent
  if (store.getters.token) {
    config.headers['token'] = getToken() // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone interceptor
_request.interceptors.response.use(
  response => {
    // 拦截过期请求
    let res = response.data;
    if (res.code === 10001) {
      removeToken();
      location.href = config.logOut + '/logout';
      return Promise.reject('error')
    } else if (res.code !== 200) {
      return Promise.reject(res.message || error)
    } else {
      return res
    }
  },
  /**
  * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
  * 如通过xmlrequestrequest 状态码标识 逻辑可写在下面error中
  */
  //  const res = response.data;
  //     if (res.code !== 20000) {
  //       Message({
  //         message: res.message,
  //         type: 'error',
  //         duration: 5 * 1000
  //       });
  //       // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
  //       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
  //         MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
  //           confirmButtonText: '重新登录',
  //           cancelButtonText: '取消',
  //           type: 'warning'
  //         }).then(() => {
  //           store.dispatch('FedLogOut').then(() => {
  //             location.reload();// 为了重新实例化vue-router对象 避免bug
  //           });
  //         })
  //       }
  //       return Promise.reject('error');
  //     } else {
  //       return response.data;
  //     }
  error => {
    console.log('err' + error)// for debug

    // token无权限，前端登出
    if (error && error.response && error.response.status === 401) {
      removeToken()
      location.href = config.logOut + '/logout'
    }

    return Promise.reject(error)
  })

function sendErrorMessage(errorMsg) {
  Message({
    message: errorMsg,
    type: 'warning',
    duration: 4 * 1000
  })
}
const request = function ({ method, url, params, cb = function() { }, errorCb = sendErrorMessage }) {
  // if(!this instanceof request) {
  //   return new request(arguments);
  // }
  _request['jid'] = '11000';
  return _request({
    method,
    params,
    url
  }).then((res) => {
    console.log(res,'gogg')
    if (res.code === 200) {
      cb(res.data)
    } else {
      console.log('[error] ' + res.message)
      errorCb(res.message)
    }
  }).catch(error => {
    console.log(error)
    if (typeof error === 'string' && error.indexOf('@') === 0) {
      sendErrorMessage(error.slice(1));
    } else {
      errorCb(error)
    }
  })
}
export default request
