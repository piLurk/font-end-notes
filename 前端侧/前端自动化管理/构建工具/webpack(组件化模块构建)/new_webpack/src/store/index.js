
import Vue from 'vue'
import Vuex from 'vuex'

// 持久化设置
import app from './modules/app'

//全局getter
import getters from './getters'

// 前端报错日志收集
import errorLog from './modules/errorLog'

import user from './modules/user'
Vue.use(Vuex)


const store = new Vuex.Store({
  modules: {
    app,
    errorLog,
    user
  },
  getters
})

export default store