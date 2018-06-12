import * as api from '../../../api/projectplan'
import * as types from '../../mutation-types'

// initial state
const state = {
  ordersPlanDetail: {
    propertyVo: {
      roomVos: [],
      providerVos: []
    },
    sortList: [],
    deployDetailsVos: [{}]
  },
  standardDetail: {},
  roomList: [],
  providerIdMap: {}
}

// getters
const getters = {
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
  getOrdersPlanDetail({ commit }, params) {
    return api.getOrdersPlanDetail(params.id, orders => {
      commit(types.RECEIVE_ORDERS_PLAN_DETAIL, orders)
      commit(types.UPDATE_ROOM_LIST, orders.propertyVo.roomVos)
    })
  },
  getConfPlan({ commit }, params) {
    return api.getConfPlan(params.id, orders => {
      commit(types.RECEIVE_ORDERS_PLAN_DETAIL, orders)
      commit(types.UPDATE_ROOM_LIST, orders.propertyVo.roomVos)
    })
  },
  clearPlanDetail({ commit }){
    commit(types.CLEAR_PLAN_DETAIL)
  }
}

// mutations
const mutations = {
  [types.RECEIVE_ORDERS_PLAN_DETAIL](state, detail) {
    state.ordersPlanDetail = detail
  },
  [types.UPDATE_ROOM_LIST](state, roomsVos) {
    state.roomList = roomsVos.map(room => room.sectionType + room.bedroomNum)
  },
  [types.CLEAR_PLAN_DETAIL](state) {
    state.ordersPlanDetail = {
      propertyVo: {
        roomVos: [],
        providerVos: []
      },
      sortList: []
    }
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}