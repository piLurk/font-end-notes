
import Vue from 'vue'
import Vuex from 'vuex'

// 持久化设置
import app from './modules/app'

//全局getter
import getters from './getters'

// 前端报错日志收集
import errorLog from './modules/errorLog'

// 组件缓存与标签
import tagsView from './modules/tagsView'

// 权限管理
import permission from './modules/permission'

// 用户信息管理
import user from './modules/user'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    errorLog,
    user,
    tagsView,
    permission
  },
  getters
})

export default store