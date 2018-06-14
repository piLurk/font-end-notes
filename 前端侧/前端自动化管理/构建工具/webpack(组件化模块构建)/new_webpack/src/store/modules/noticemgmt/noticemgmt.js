
import { getAllDepartments } from '@/api/noticemgmt'

const noticemgmt = {
  namespaced: true,
  state: {
    departments:[]
  },
  getters: {
    departments( state ) {
      return state.departments
    }
  },
  mutations: {
    
  },
  actions: {
    getAllDepartments({ state, dispatch }, params) {
      console.log(params)
      getAllDepartments({
        params:params,
        cb(departments) {
          state.departments = departments;
        },
        errorCb() {
          dispatch("sendMessage", {
            type:'error',
            message: '部门获取失败！'
          }, {root: true})
        }
      })
    }
  }

} 
export default noticemgmt