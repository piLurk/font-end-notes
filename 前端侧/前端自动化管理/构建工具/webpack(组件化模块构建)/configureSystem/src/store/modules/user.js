import { logout, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken, setCookie, UserKey, removeCookie } from '@/utils/auth'
import config from 'config'

const user = {
  state: {
    user: '',
    status: '',
    name: '',
    avatar: '',
    introduction: '',
    permissions: {},
  },

  mutations: {
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_PERMISSIONS: (state, permissions) => {
      var per = {};
      if(permissions !== null){
        permissions.forEach(element => {
          var p_str = element['permCode']
          per[p_str] = true
        });
      }
      state.permissions = per
    }
  },

  actions: {
    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return getUserInfo(getToken(), data => {
        commit('SET_NAME', data.userName)
        commit('SET_INTRODUCTION', data.position)
        commit('SET_PERMISSIONS', data.PermissionMo)
      }, error => {
        console.log(error)
      })
    },

    // 登出
    LogOut({ commit, state }) {
      // return logout(state.token, () => {
      commit('SET_NAME', '')
      commit('SET_INTRODUCTION', '')
      removeToken()
      location.href = config.logOut + '/logout'

      // }, error => {
      // })
    }

  }
}

export default user
