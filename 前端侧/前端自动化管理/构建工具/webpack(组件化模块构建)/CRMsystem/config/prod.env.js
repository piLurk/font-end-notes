'use strict'

const config = ( () => {
  var _config ={}
  _config.NODE_ENV = '"production"'
  switch (process.env.NODE_ENV) {
    case 'production':
    _config.BASE_API = '"http://hcrm.jiangroom.com"'
    break;
  case 'local':
    _config.BASE_API = '"http://192.168.1.88:8066"'
    break;
  case 'ali':
    _config.BASE_API = '"http://thcrm.jiangroom.com"'
    break;
  case 'pretest':
    _config.BASE_API = '"http://hcrm.jyroom.com"'
    break;
  default:
    _config.BASE_API = '"http://192.168.1.88:8066"'
  }
  return _config;
} )()
module.exports = {
  NODE_ENV: config.NODE_ENV,
  BASE_API: config.BASE_API
}
