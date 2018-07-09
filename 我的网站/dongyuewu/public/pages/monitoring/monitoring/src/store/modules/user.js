import { logout, getUserId, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken, getHost } from '@/utils/auth'

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    userId: '',
    jobName: '',
    setting: {
      articlePlatform: []
    },
    permissions: []
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
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
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_USERID: (state, userId) => {
      state.userId = userId
    },
    SET_JOBNAME: (state, jobName) => {
      state.jobName = jobName
    },
    SET_PERMISSION: (state, permission) => {
      state.permissions = permission
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password).then(response => {
          const data = response.data
          commit('SET_TOKEN', data.token)
          setToken(response.data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state, dispatch }) {
      return new Promise((resolve, reject) => {
        getUserId({
          params: { token: getToken() },
          cb(userId) {
            if(!userId) {
              dispatch("sendMessage", {
                type:'error',
                message: '用户id获取失败！'
              }, {root: true})
            }else {
              commit('SET_USERID', userId)
              getUserInfo({
                params: { userId },
                cb(data) {
                  if (!data) {
                    reject('error')
                  }
                  if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
                    commit('SET_ROLES', data.roles)
                  } else {
                    reject('getInfo: roles must be a non-null array !')
                  }
                  
                  commit('SET_NAME', data.realName)
                  commit('SET_AVATAR', data.avatar)
                  commit('SET_INTRODUCTION', data.introduction)
                  commit('SET_JOBNAME', data.position)
                  commit('SET_PERMISSION', data.permission)
                  resolve(data)
                },
                errorCb(error) {
                  reject(error)
                }
              })
            }
            


          },
          errorCb(message) {
            // 获取userid失败，从新登陆
            dispatch('FedLogOut');
            
            // dispatch("sendMessage", {
            //   type:'error',
            //   message: message || '用户id获取失败！'
            // }, {root: true})
            
          }
        })
        
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
        location.href = getHost() + '/ajaxLogout'
      })
    },

    // 动态修改权限
    ChangeRoles({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          resolve()
        })
      })
    }
  }
}

export default user
