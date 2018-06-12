import * as api from '../../../api/projectplan'
import * as types from '../../mutation-types'

// initial state
const state = {
  planOrders: [],
  planOrdersTotal: 0,
  ordersPlanDetail: {
    propertyVo: { providerVos: [] }
  }
}

// getters
const getters = {
  planOrders: state => state.planOrders,
  planOrdersTotal: state => state.planOrdersTotal,
  ordersPlanDetail: state => state.ordersPlanDetail,
  roomList: state => state.roomList,
  providerIdMap: state => {
    const _map = {}
    state.ordersPlanDetail.propertyVo.providerVos.forEach(element => {
      _map[element.classifyId] = element.pkId
    });
    return _map
  },
  tabList: state => state.ordersPlanDetail.sortList || state.ordersPlanDetail.deployDetailsVos
}

// actions
const actions = {
  getPlanOrders({ commit }, params) {
    commit(types.SET_LOADING,{target:'configuePlanManageLoading',state:true},{root:true})
    const isSearch = params.isSearch
    delete params.isSearch
    api.getOrders(params, oders => {
      commit(types.RECEIVE_STANDARD_SOLUTION, oders)
      if (oders.totalNum === 0 && isSearch) {
        commit(types.NEW_MESSAGE, { message: '未查到订单信息', type: 'warning' }, { root: true })
      }
    }, () => {
      commit(types.NEW_MESSAGE, { message: '查询失败', type: 'error' }, { root: true })
    }).finally(
      () =>{
        commit(types.SET_LOADING,{target:'configuePlanManageLoading',state:false},{root:true})
      }
    )
      
    
  },

}

// mutations
const mutations = {
  [types.RECEIVE_STANDARD_SOLUTION](state, { items, totalNum }) {
    state.planOrders = items
    state.planOrdersTotal = totalNum
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}