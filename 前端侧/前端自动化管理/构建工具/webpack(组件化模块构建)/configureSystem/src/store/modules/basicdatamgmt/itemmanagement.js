import * as api from '../../../api/basicdatamgmt'
import * as types from '../../mutation-types'

// initial state
const state = {
  goods: [],
  goodsTotal: 0,
  operGoods: {},
  treeSelected: {}
}

// getters
const getters = {
  allGoods: state => state.goods.map(g => ({
    id: g.pkId,
    proNumber: g.goodsNumber,
    proName: g.goodsName,
    status: g.goodsIsUse,
    nature: g.natureName,
    proUnit: g.goodsUnit,
    isRepair: g.isMaintain,
    proNatureValue: g.proType
  })),
  goodsTotal: state => state.goodsTotal,
  operGoods: ({ operGoods }) => ({
    pkId: operGoods.pkId,
    proNumber: operGoods.goodsNumber,
    proName: operGoods.goodsName,
    status: '' + operGoods.goodsIsUse,
    nature: operGoods.natureName,
    proUnit: operGoods.goodsUnit,
    isRepair: operGoods.isMaintain,
    proNatureValue: '' + operGoods.proType,
    upperLimit: operGoods.maxNumber,
    firstCategory: operGoods.sortOne,
    secondCategory: operGoods.sortTwo,
    thirdCategory: operGoods.classifyId,
    apportioned: operGoods.isApportion,
    apportionedYear: operGoods.apportionDeadline,
    applyto: '江寓合租V1.0',
    startDateValue: new Date(1 * operGoods.startDate),
    endDateValue: new Date(1 * operGoods.endDate)
  }),
  treeSelected: state => state.treeSelected,
}

// actions
const actions = {
  getAllGoods({ commit }, params) {
    commit(types.SET_LOADING,{target:"itemmanagementLoading",state:true},{root:true})
    return api.getSortGoods(params, goods => {
      commit(types.RECEIVE_ALL_GOODS, { goods: goods.items, total: goods.totalNum })
    }).finally(
      () => {
        commit(types.SET_LOADING,{target:"itemmanagementLoading",state:false},{root:true})
      }
    )
  },
  addGoods({ commit }, params) {
    return api.addGoods(params, goods => {
      commit(types.NEW_MESSAGE, { message: '新增物品成功!', type: "success" })
    }, () => {
      commit(types.NEW_MESSAGE, { message: '新增物品失败!', type: "error" })
    })
  },
  editGoods({ commit }, params) {
    return api.editGoods(params, goods => {
      commit(types.NEW_MESSAGE, { message: '编辑物品成功!', type: "success" })
    }, () => {
      commit(types.NEW_MESSAGE, { message: '编辑物品失败!', type: "error" })
    })
  },
  getGoodsById({ commit }, params) {
    return api.getGoodsById(params, goods => {
      commit(types.RECEIVE_OPER_GOODS, { goods })
    }, () => {
      commit(types.NEW_MESSAGE, { message: '查询物品信息失败!', type: "error" })
    })
  },
}

// mutations
const mutations = {
  [types.RECEIVE_ALL_GOODS](state, { goods, total }) {
    state.goods = goods || []
    state.goodsTotal = total
  },
  [types.RECEIVE_OPER_GOODS](state, { goods }) {
    state.operGoods = goods || {}
  },
  [types.SET_SELECT_TREE](state, treeSelected) {
    state.treeSelected = treeSelected
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
