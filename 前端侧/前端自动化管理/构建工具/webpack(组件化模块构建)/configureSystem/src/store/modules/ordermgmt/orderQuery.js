import * as api from '../../../api/ordermgmt.js'
import * as types from '../../mutation-types'

// initial state
const state = {
    dataList:[],
    total:0,
}

// getters
const getters = {
    dataList: state => state.dataList,
    totalNum:state => state.total,
}

// actions
const actions = {
  getOrderList ({ commit},params={
    limit: 10,
    pageNum: 1
  }) {
    commit(types.SET_LOADING,{target:'orderQueryLoading',state:true},{root:true})
    api.getOrderList(params,providers => {
      commit(types.RECEIVE_ORDER_ORDERS, { providers })
    },
    (message) => {
      commit(types.NEW_MESSAGE, { message:"订单列表获取失败!", type: "error" },{root:true})
    }
    ).finally(() => {
      commit(types.SET_LOADING,{target:'orderQueryLoading',state:false},{root:true})
    })
  }
}

// mutations
const mutations = {
  [types.RECEIVE_ORDER_ORDERS] (state, { providers }) {
    state.total=providers.totalNum;
    state.dataList=providers.items;
  }
}

export default {
  namespaced:true,
  state,
  getters,
  actions,
  mutations
}
function formatProvider(p) {
  return {
    orderNumber: p.orderNumber,
    orderState: p.orderState,
    orderType: p.orderType,
    contractNumber: p.contractNumber,
    baseNumber: p.baseNumber,
    houseType:p.houseType,
    orderSteward:p.orderSteward,
    orderDeploy:p.orderDeploy,
    orderDate:[(''+p.orderDate.start).getTime(),(''+p.orderDate.end).getTime()],

  }
}
