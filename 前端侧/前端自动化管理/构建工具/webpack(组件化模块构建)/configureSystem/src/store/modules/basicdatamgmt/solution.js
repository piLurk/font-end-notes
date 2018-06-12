import * as api from '../../../api/basicdatamgmt'
import * as types from '../../mutation-types'

// initial state
const state = {
  standardSolutions: [],
  standardSolutionsTotal: 0,
}

// getters
const getters = {
  standardSolutions: state => state.standardSolutions,
  standardSolutionsTotal: state => state.standardSolutionsTotal,
}

// actions
const actions = {
  getStandardSolutions({ commit }, params) {
    commit(types.SET_LOADING,{target:"solutionLoading",state:true},{root:true})
    const isSearch = params.isSearch
    delete params.isSearch

    return api.getSolution(params, solutions => {
      commit(types.RECEIVE_STANDARD_SOLUTION, solutions)
      if (solutions.totalNum === 0 && isSearch) {
        commit(types.NEW_MESSAGE, { message: '未查到标配方案信息', type: 'warning' })
      }
    }, () => {
      commit(types.NEW_MESSAGE, { message: '查询失败', type: 'error' })
    }).finally(
      () =>{
        commit(types.SET_LOADING,{target:"solutionLoading",state:false},{root:true})
      }
    )
  },

}

// mutations
const mutations = {
  [types.RECEIVE_STANDARD_SOLUTION](state, { items, totalNum }) {
    state.standardSolutions = items
    state.standardSolutionsTotal = totalNum
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}