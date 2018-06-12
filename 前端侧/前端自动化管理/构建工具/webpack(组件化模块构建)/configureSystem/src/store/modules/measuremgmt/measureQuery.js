import * as api from '../../../api/housemeasuremgmt'
import * as types from '../../mutation-types'

// initial state
const state = {
    dataList:[],
    totalNum:0,
}

// getters
const getters = {
    dataList: state => state.dataList,
    totalNum:state => state.totalNum
}

// actions
const actions = {
    getMeasureList ({ commit },params={
    limit: 10,
    pageNum: 1
  }) {
    commit('SET_LOADING',{target:'measureQueryLoading',state:true},{root:true})
    api.getMeasureList(params,providers => {
      commit(types.RECEIVE_MEASURE_ORDERS, { providers })
    },
    (message) =>{
      commit(types.NEW_MESSAGE, { message:"量房订单列表获取失败!", type: "error" },{root:true})
    }
    ).finally(() =>{
      commit('SET_LOADING',{target:'measureQueryLoading',state:false},{root:true})
    })
  }
}

// mutations
const mutations = {
  [types.RECEIVE_MEASURE_ORDERS] (state, { providers }) {
    state.dataList=providers.items;
    state.totalNum=providers.totalNum;
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
