import * as api from '../../../api/projectplan'
import * as types from '../../mutation-types'

// initial state
const state = {
  workOrders: [],
  workOrdersTotal: 0,
}

// getters
const getters = {
  workOrders: state => state.workOrders,
  workOrdersTotal: state => state.workOrdersTotal,
}

// actions
const actions = {
  getOrdersByWork({ commit }, params) {
    commit(types.SET_LOADING,{target:'workOrderManageLoading',state:true},{root:true})
    const isSearch = params.isSearch
    delete params.isSearch
    return api.getOrdersByWork(params, oders => {
      commit(types.RECEIVE_WORK_ORDER, oders)
      if (oders.totalNum === 0 && isSearch) {
        commit(types.NEW_MESSAGE, { message: '未查到订单信息', type: 'warning' }, { root: true })
      }
    }, () => {
      commit(types.NEW_MESSAGE, { message: '查询失败', type: 'error' }, { root: true })
    }).finally(
      () => {
        commit(types.SET_LOADING,{target:'workOrderManageLoading',state:false},{root:true})
      }
    )
  },

}

// mutations
const mutations = {
  [types.RECEIVE_WORK_ORDER](state, { items, totalNum }) {
    state.workOrders = items
    state.workOrdersTotal = totalNum
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}