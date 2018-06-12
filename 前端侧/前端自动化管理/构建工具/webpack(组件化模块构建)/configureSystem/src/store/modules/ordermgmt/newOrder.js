import * as api from '../../../api/ordermgmt.js'
import * as types from '../../mutation-types'

// initial state
const state = {
    ordersPlanDetail: {
      propertyVo: {
        roomVos: [],
        providerVos: []
      },
      sortList: [],
      deployDetailsVos: [{}],
      exceedRemark:''
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
}

// actions
const actions = {
    getOrderDetail({ commit }, contractNumber) {
        return api.getNewOrderData(contractNumber, orders => {
          commit(types.RECEIVE_NEW_ORDERS_PLAN_DETAIL, orders);
          commit(types.UPDATE_NEW_ROOM_LIST, orders.propertyVo.roomVos);
        },
        (message) =>{
          commit(types.NEW_MESSAGE, { message:"合同信息获取失败!", type: "error" },{root:true})
        }
      )
    },
    getConfPlan({ commit }, params) {
      return api.getConfPlan(params.id, orders => {
        commit(types.RECEIVE_NEW_ORDERS_PLAN_DETAIL, orders)
        commit(types.UPDATE_NEW_ROOM_LIST, orders.propertyVo.roomVos)
      })
    },
    clearPlanDetail({ commit }){
      commit(types.CLEAR_NEW_PLAN_DETAIL)
    },
    updatePage({ commit }){
      commit(types.NEW_ORDER_INITPAGE)
    }
}

// mutations
const mutations = {
  [types.RECEIVE_NEW_ORDERS_PLAN_DETAIL](state, detail) {
    state.ordersPlanDetail=detail;
    state.ordersPlanDetail.exceedRemark=detail.exceedRemark;
  },
  [types.UPDATE_NEW_ROOM_LIST](state, roomsVos) {
    state.roomList = roomsVos.map(room => room.sectionType + room.bedroomNum);
  },
  [types.CLEAR_NEW_PLAN_DETAIL](state) {
    state.ordersPlanDetail = {
      propertyVo: {
        roomVos: [],
        providerVos: []
      },
      sortList: []
    }
  },
  [types.NEW_ORDER_INITPAGE](state){
    state.ordersPlanDetail = {
      propertyVo: {
        roomVos: [],
        providerVos: []
      },
      sortList: [],
      deployDetailsVos: [{}],
      exceedRemark:''
    }
  }
}

export default {
  namespaced:true,
  state,
  getters,
  actions,
  mutations
}