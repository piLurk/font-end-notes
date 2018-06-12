import * as api from '../../../api/projectdelivery'
import * as types from '../../mutation-types'
// import { getOrders1, g } from '../../../api/projectdelivery';

// initial state
const state = {
  orders1: [],
  ordersTotal1: 0,
  orders2: [],
  ordersTotal2: 0,
  orders3: [],
  ordersTotal3: 0,
}

// getters
const getters = {
  orders1: state => state.orders1,
  ordersTotal1: state => state.ordersTotal1,
  orders2: state => state.orders2,
  ordersTotal2: state => state.ordersTotal2,
  orders3: state => state.orders3,
  ordersTotal3: state => state.ordersTotal3,
}

// actions
const actions = {
  getOrders({ commit }, params) {
    let target;
    switch(params['_number']){
      case 1:
        target = "workOrderCheckLoading"
        break;
      case 2:
        target = "informationDeliveryLoading"
        break;
      case 3:
      target = "completedCheckLoading"
        break;
    }
    commit(types.SET_LOADING,{target:target,state:true},{root:true})
    const { _number, _isSearch } = params
    return api['getOrders' + _number](params, oders => {
      commit(types.RECEIVE_DELIVERY_ORDER, { oders, _number })
      if (oders.totalNum === 0 && _isSearch) {
        commit(types.NEW_MESSAGE, { message: '未查到订单信息', type: 'warning' }, { root: true })
      }
    }, () => {
      commit(types.NEW_MESSAGE, { message: '查询失败', type: 'error' }, { root: true })
    }).finally(
      () => {
        commit(types.SET_LOADING,{target:target,state:false},{root:true})
      }
    )
  },
  getOrders1({ commit, dispatch }, params) {
    dispatch('getOrders', { ...params, _number: 1 });
  },
  getOrders2({ commit, dispatch }, params) {
    dispatch('getOrders', { ...params, _number: 2 });
  },
  getOrders3({ commit, dispatch }, params) {
    dispatch('getOrders', { ...params, _number: 3 });
  }
}

// mutations
const mutations = {
  [types.RECEIVE_DELIVERY_ORDER](state, { oders, _number }) {
    state['orders' + _number] = oders.items
    state['ordersTotal' + _number] = oders.totalNum
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}