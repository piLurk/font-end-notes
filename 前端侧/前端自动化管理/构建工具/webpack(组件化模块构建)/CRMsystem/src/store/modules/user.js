import { getInfo, getUserId, vaildUser, sendVcode, vaildVcode } from '@/api/login'
import { getToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    userId: null,
    position: '',
    permission: [],
    vaildUserNum: 500,
    msgId: 0,
    vaildVcodeNum: 500
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_USERID: (state, userId) => {
      state.userId = userId
    },
    SET_POSITION: (state, position) => {
      state.position = position
    },
    SET_PERMISSION: (state, permission) => {
      state.permission = permission.filter(p => p)
    },
    SET_VAILDUSER: (state, providers) => {
      state.vaildUserNum = providers
    },
    SET_SENDVCODE: (state, providers) => {
      state.msgId = providers
    },
    SET_VAILDVCODE: (state, providers) => {
      state.vaildVcodeNum = providers
    }
  },

  actions: {
    // 获取用户id并 继续获取用户信息，权限
    GetUserId({ commit, dispatch, state }) {
      return new Promise((resolve, reject) => {
        getUserId(state.token).then(response => {
          const data = response.data
          // console.log(data)
          commit('SET_USERID', data)
          // dispatch('GetInfo')
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.userId).then(response => {
          const data = response.data
          commit('SET_ROLES', data.role)
          commit('SET_NAME', data.realName)
          commit('SET_POSITION', data.position)
          commit('SET_AVATAR', data.avatar)
          commit('SET_PERMISSION', data.permission)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        // ajaxLogout().then(response => {
        location.href = process.env.BASE_API + '/ajaxLogout?token=' + state.token
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('SET_NAME', '')
        commit('SET_POSITION', '')
        commit('SET_AVATAR', '')
        commit('SET_PERMISSION', [])
        removeToken()
        // location.href = process.env.BASE_API + '/logout'
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 验证用户是否可以使用
    VaildUser({ commit, state }, param) {
      return new Promise((resolve, reject) => {
        vaildUser(param).then(res => {
          const data = res.data
          // console.log(data)
          commit('SET_VAILDUSER', data)
          resolve(data)
        })
      })
    },

    // 发送短信验证码
    SendVcode({ commit, state }, param) {
      return new Promise((resolve, reject) => {
        sendVcode(param).then(res => {
          const data = res.data
          // console.log(data.msgId)
          commit('SET_SENDVCODE', data.msgId)
          resolve()
        })
      })
    },

    // 验证短信验证码
    VaildVcode({ commit, state }, param) {
      return new Promise((resolve, reject) => {
        vaildVcode(param).then(res => {
          const data = res.code
          // console.log(data)
          commit('SET_VAILDVCODE', data)
          resolve()
        })
      })
    }
  }
}

export default user
