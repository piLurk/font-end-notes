import * as api from '../../../api/basicdatamgmt'
import * as types from '../../mutation-types'

// initial state
const state = {
  all: [],
  total: 0,
  sortName: [],
  opreProvider: {
    pkId: '',
    proName: '',
    proNumber: '',
    classifyId: '',
    proSortValue: '',
    sendPhone: '',
    sendMail: '',
    startDateValue: '',
    endDateValue: '',
    isUse: ''
  }
}

// getters
const getters = {
  allProviders: state => state.all,
  opreProvider: state => state.opreProvider,
  sortName: state => state.sortName.filter(ele => ele.isUse == 1).map(ele => ({
    label: ele.sortName,
    id: ele.pkId
  })),
  providerTotal: state => state.total,
}

// actions
const actions = {
  getAllProviders({ commit }, params = {
    items: {},
    limit: 10,
    pageNum: 1
  }) {
    commit(types.SET_LOADING,{target:"supplierLoading",state:true},{root:true})
    return api.getProviders(params, providers => {
      commit(types.RECEIVE_PROVIDERS, { providers })
    }).finally(
      () =>{
        commit(types.SET_LOADING,{target:"supplierLoading",state:false},{root:true})
      }
    )
  },
  getProviderById({ commit }, { id }) {
    return api.getProviderByPkId(id, provider => {
      commit(types.UPDATE_PROVIDER, { id, provider })
    })
  },
  getAllSortName({ commit }) {
    return api.getSortName(sortName => {
      commit(types.RECEIVE_SORTNAME, { sortName })
    })
  },
  editProvider({ commit, dispatch }, param) {
    return api.editProvider(formatProvider(param[0]), data => {
      commit(types.NEW_MESSAGE, { message: "编辑供应商信息完成!", type: "success" })
      return dispatch('getAllProviders', param[1])
    }, message => {
      commit(types.NEW_MESSAGE, { message: "编辑供应商信息失败!", type: "error" })
    })
  },
  addProvider({ commit, dispatch }, param) {
    let _param = formatProvider(param[0]);
    delete _param.pkId
    return api.addProvider(_param, data => {
      commit(types.NEW_MESSAGE, { message: "新增供应商信息完成!", type: "success" })
      return dispatch('getAllProviders', param[1])
    }, message => {
      commit(types.NEW_MESSAGE, { message: "新增供应商信息失败!", type: "error" })
    })
  },
  batchOperProvider({ commit, dispatch }, { operType, providerIds, param }) {
    const type = {
      none: '删除',
      open: '启用',
      stop: '停用'
    }
    api.operProvider(operType, providerIds, data => {
      commit(types.NEW_MESSAGE, { message: `${type[operType]}供应商完成!`, type: "success" })
      return dispatch('getAllProviders', param)
    }, message => {
      commit(types.NEW_MESSAGE, { message: `${type[operType]}供应商失败!`, type: "error" })
    })
  },
  searchProviders({ commit }, param) {
    commit(types.SET_LOADING,{target:"supplierLoading",state:true},{root:true})
    api.searchProviders(param, providers => {
      commit(types.RECEIVE_PROVIDERS, { providers })
    }, message => {
      commit(types.NEW_MESSAGE, { message: '未查到供应商信息!', type: "warning" })
    }).finally(
      () =>{
        commit(types.SET_LOADING,{target:"supplierLoading",state:false},{root:true})
      }
    )
  }
}

// mutations
const mutations = {
  [types.RECEIVE_PROVIDERS](state, { providers }) {
    state.all = providers.items
    state.total = providers.totalNum
  },
  [types.UPDATE_PROVIDER](state, { id, provider }) {
    state.opreProvider = {
      pkId: provider.pkId,
      proName: provider.proName,
      proNumber: provider.proNumber,
      classifyId: provider.classifyId,
      proSortValue: provider.providerTypeName,
      sendPhone: provider.sendPhone,
      sendMail: provider.sendMail,
      startDateValue: new Date(parseInt(provider.startDate)),
      endDateValue: new Date(parseInt(provider.endDate)),
      isUse: provider.isUse,
    };
    state.all = state.all.map(p => {
      if (p.pkId === id) {
        return provider;
      } else {
        return p
      }
    })
  },
  [types.RECEIVE_SORTNAME](state, { sortName }) {
    state.sortName = sortName
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}


function formatProvider(p) {
  return {
    pkId: p.pkId,
    proName: p.proName,
    isUse: p.isUse,
    sendPhone: p.sendPhone,
    sendMail: p.sendMail,
    startDate: '' + p.startDateValue.getTime(),
    endDate: '' + p.endDateValue.getTime(),
    classifyId: p.classifyId,
  }
}