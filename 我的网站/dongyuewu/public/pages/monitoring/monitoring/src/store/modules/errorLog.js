
import { sendLogs } from '@/api/errorLog'


const errorLog = {
  state: {
    userAgent:navigator.userAgent,
    requestEndTime: '',
    cacheWarninLogs:[],
    cacheErrorLogs: []
  },
  mutations: {
    ADD_WARNING_LOG: (state, log) => {
      state.cacheWarninLogs.push(log)
    },
    ADD_ERROR_LOG: (state, log) => {
      state.cacheErrorLogs.push(log)
    },
    CLEAR_LOG: (state) => {
      state.cacheWarninLogs = [];
      state.cacheErrorLogs = [];
    },
    DATE_RESET: (state) => {
      state.requestEndTime = Date.now()
    }
  },
  getters: {
    cacheWarninLogs: state => state.cacheErrorLogs,
    cacheErrorLogs: state => state.cacheErrorLogs
  },
  actions: {
    sendLog({ commit, state, getters }, {type, log}) {
      let now = performance.now();
      if(type === 'warning') {
        commit('ADD_WARNING_LOG', log)
      } else if(type === 'error') {
        commit('ADD_ERROR_LOG', log)
      }
      if( !(state.requestEndTime && now - state.requestEndTime < 1000) ) {
        let data = {
          userAgent:state.userAgent,
          timestamp: Date.now(),
          logs:[
            {type:'warning', list:state.cacheWarninLogs},
            {type:'error', list:state.cacheErrorLogs}
          ]
        };
        sendLogs({
          data
        }).then( () => {
          commit('DATE_RESET')
          commit('CLEAR_LOG')

        })
      }
      
    },
    sendLastLog({ commit, state }) {
      sendLogs({
        data: {
          userAgent:state.userAgent,
          timestamp: Date.now(),
          logs:[
            {type:'warning', list:state.cacheWarninLogs},
            {type:'error', list:state.cacheErrorLogs}
          ]
        }
      }).then(() => {
        commit('CLEAR_LOG')
      })
      

    }
  }
}

export default errorLog
