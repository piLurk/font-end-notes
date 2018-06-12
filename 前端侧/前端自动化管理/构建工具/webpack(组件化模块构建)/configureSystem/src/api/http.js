import axios from 'axios'
import config from 'config'

import store from '@/store'
import { getToken, TokenKey, removeToken } from '@/utils/auth'
import { Message } from 'element-ui'


function getHost() {
  return config.host
}


const _http = axios.create({
  baseURL: getHost(),
  params: {
    [TokenKey]: getToken()
  }
});


// request拦截器
_http.interceptors.request.use(config => {
  // config.headers[TokenKey] = getToken()
  return config
}, error => {
  console.log(error)
})

// respone拦截器
_http.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.code === 10001) {
      removeToken()
      location.href = config.logOut + '/logout'
      // store.dispatch('LogOut').then(() => {
      //   location.reload();
      // });

      return Promise.reject('error');
    } else if (res.code !== 200) {
      return Promise.reject(res.message || 'error')
    } else {
      return res;
    }
  },
  error => {
    if(error && error.response && error.response.status === 401) {
      removeToken()
      location.href = config.logOut + '/logout'
    }
    console.log('[error] ' + error)
    return Promise.reject(error)
  })

function sendMessage(mess) {
  Message({
    message: mess,
    type: 'warning',
    duration: 4 * 1000
  })
}

const http = {
  get(url, params, cb, errorCb) {
    if (arguments.length < 4) {
      [cb, errorCb] = [params, cb]
      params = {}
    }
    errorCb = errorCb || function () { }
    return _http.get(url, { params })
      .then(res => {
        if (res.code === 200) {
          cb(res.data)
        } else {
          console.log('[error] ' + res.message)
          errorCb(res.message)
        }
      })
      .catch(error => {
        if (typeof error === 'string' && error.indexOf('@') === 0) {
          sendMessage(error.slice(1))
        } else {
          errorCb(error)
        }
      })
  },
  post(url, params, cb, errorCb) {
    errorCb = errorCb || function () { }
    return _http.post(url, params)
      .then(res => {
        if (res.code === 200) {
          cb(res.data)
        } else {
          console.log('[error] ' + res.message)
          errorCb(res.message)
        }
      })
      .catch(error => {
        if (typeof error === 'string' && error.indexOf('@') === 0) {
          sendMessage(error.slice(1))
        } else {
          errorCb(error)
        }
      })
  },
  put(url, params, cb, errorCb) {
    errorCb = errorCb || function () { }
    return _http.put(url, params)
      .then(res => {
        if (res.code === 200) {
          cb(res.data)
        } else {
          console.log('[error] ' + res.message)
          errorCb(res.message)
        }
      })
      .catch(error => {
        if (typeof error === 'string' && error.indexOf('@') === 0) {
          sendMessage(error.slice(1))
        } else {
          errorCb(error)
        }
      })
  },
  delete(url, cb, errorCb) {
    errorCb = errorCb || function () { }
    return _http.delete(url)
      .then(res => {
        if (res.code === 200) {
          cb(res.data)
        } else {
          console.log('[error] ' + res.message)
          errorCb(res.message)
        }
      })
      .catch(error => {
        if (typeof error === 'string' && error.indexOf('@') === 0) {
          sendMessage(error.slice(1))
        } else {
          errorCb(error)
        }
      })
  }
}

export default http