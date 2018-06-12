import * as api from '../../../api/projectplan'
import * as types from '../../mutation-types'

// initial state
const state = {
  orderInfo: {},
}

// getters
const getters = {
  orderInfo: state => state.orderInfo,
  // workOrdersTotal: state => state.workOrdersTotal,
}

// actions
const actions = {
  putOrderInfo({ commit }, orderInfo) {
    commit(types.RECEIVE_ORDER_INFO, orderInfo)
  },

}

// mutations
const mutations = {
  [types.RECEIVE_ORDER_INFO](state, orderInfo) {
    state.orderInfo = orderInfo
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}