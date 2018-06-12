import * as api from '../../../api/basicdatamgmt'
import * as types from '../../mutation-types'

// initial state
const state = {
  area: [],
  selectAreaId: '',
  allHouses: [],
  housesTotal: 0,
  matchSupplier: [],
  matchSupplierFilter: {},
}

const format = ele => ({
  label: ele.dataName,
  value: ele.id
})

// getters
const getters = {
  parentAreas: state => state.area.map(format),
  childAreas: state => {
    const areaId = state.selectAreaId
    for (let i = 0, l = state.area.length; i < l; i++) {
      if (state.area[i].id === areaId) {
        if (!(state.area[i].children && state.area[i].children.length !== 0)) return []
        return state.area[i].children.map(format)
      }
    }
    return []
  },
  allHouses: state => {
    return state.allHouses ? state.allHouses.map(ele => ({
      buildingId: ele.houseId,
      cityName: ele.premisesAreaName,
      tradingArea: ele.tradingName,
      buildingName: ele.premisesName,
      providerVos: ele.providerVos
    })) : []
  },
  housesTotal: state => state.housesTotal,
  matchSupplier: state => {
    let result = state.matchSupplier;
    const { type, name } = state.matchSupplierFilter;
    if (type && type !== '0') {
      result = result.filter(ele => ele.classifyId === type)
    }
    if (name) {
      result = result.filter(ele => ele.proName.indexOf(name) !== -1)
    }
    return result
  },
}

// actions
const actions = {
  getParentArea({ commit, state }) {
    if (state.area.length === 0) {
      return api.getArea({ dataType: 0, parentId: 0 }, area => {
        commit(types.RECEIVE_PARENT_AREA, area)
      })
    }
  },
  getChildArea({ commit }, id) {
    return api.getArea({ dataType: 1, parentId: id }, area => {
      commit(types.RECEIVE_CHILD_AREA, area)
    })
  },
  selectParentArea({ commit, getters, dispatch }, id) {
    commit(types.SELECT_PARENT_AREA, id)
    if (getters.childAreas.length === 0) {
      return dispatch('getChildArea', id)
    }
  },
  getHouses({ commit }, params) {
    commit(types.SET_LOADING,{target:"matchsupplierLoading",state:true},{root:true})
    return api.getHouses(params, houses => {
      commit(types.RECEIVE_ALL_HOUSES, houses)
    }).finally(
      () =>{
        commit(types.SET_LOADING,{target:"matchsupplierLoading",state:false},{root:true});
      }
    )
  },
  getHousesPrividers({ commit }, id) {
    return api.getHousesPrividers(id, houses => {
      commit(types.RECEIVE_ALL_HOUSES, houses)
    })
  },
  getAddProviders({ commit }) {
    return api.getProviders({ limit: 100, pageNum: 1 }, providers => {
      commit(types.RECEIVE_MATCH_PROVIDERS, providers)
    })
  },
}

// mutations
const mutations = {
  [types.RECEIVE_PARENT_AREA](state, parentArea) {
    state.area = parentArea || []
  },
  [types.RECEIVE_CHILD_AREA](state, childArea) {
    const areaId = childArea[0].areaId
    for (let i = 0, l = state.area.length; i < l; i++) {
      if (state.area[i].id === areaId) {
        state.area.splice(i, 1, { ...state.area[i], children: childArea })
        return
      }
    }
  },
  [types.SELECT_PARENT_AREA](state, parentId) {
    state.selectAreaId = parentId
  },
  [types.RECEIVE_ALL_HOUSES](state, { items, totalNum }) {
    state.allHouses = items
    state.housesTotal = totalNum
  },
  [types.RECEIVE_MATCH_PROVIDERS](state, { items }) {
    state.matchSupplier = items.filter(ele => ele.isUse === 1 && ele.isState === 1)
  },
  [types.SET_MATCH_PROVIDERS_FILTER](state, filter) {
    state.matchSupplierFilter = filter
  },

}

export default {
  state,
  getters,
  actions,
  mutations
}
