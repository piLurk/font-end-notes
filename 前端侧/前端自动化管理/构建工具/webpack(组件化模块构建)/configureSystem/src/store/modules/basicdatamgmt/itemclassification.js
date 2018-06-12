import * as api from '../../../api/basicdatamgmt'
import * as types from '../../mutation-types'

// initial state
const state = {
  tree: [],
}

// getters
const getters = {
  tree: state => state.tree.map(t0 => ({
    id: t0.pkId,
    sortName: t0.sortName,
    isUse: t0.isUse,
    children: t0.sortVoList.map(t1 => ({
      id: t1.pkId,
      sortName: t1.sortName,
      isUse: t1.isUse,
      children: t1.sortList.map(t2 => ({
        id: t2.pkId,
        sortName: t2.sortName,
        isUse: t2.isUse,
        pid: t2.pid,
        classifyNumber: t2.classifyNumber,
        classifyRank: t2.classifyRank
      }))
    }))
  })),
  usedTree: (state, getters) => {
    const t0 = JSON.parse(JSON.stringify(getters.tree))
    const t1 = t0.filter(t => t.isUse)
    t1.forEach(t => {
      t.children = t.children.filter(t => t.isUse)
      t.children.forEach(t => {
        t.children = t.children.filter(t => t.isUse)
      })
    })
    return t1
  },
  // 所有可用二级菜单及子菜单
  level2UsedTree: (state, getters) => {
    return getters.usedTree.reduce((a, b) => [...a, ...b.children], [])
  },
}


// actions
const actions = {
  getAllCategory({ commit }) {
    api.getAllCategory(tree => {
      commit(types.RECEIVE_ALL_CATEGORY, { tree })
    })
  },
  add3rdCategory({ commit, dispatch }, param) {
    api.add3rdCategory(param, result => {
      commit(types.NEW_MESSAGE, { message: '分类创建成功!', type: "success" })
      return dispatch('getAllCategory')
    }, message => {
      commit(types.NEW_MESSAGE, { message: '分类创建失败!', type: "error" })
    })
  },
  edit3rdCategory({ commit, dispatch }, param) {
    api.edit3rdCategory(param, result => {
      commit(types.NEW_MESSAGE, { message: '分类编辑成功!', type: "success" })
      return dispatch('getAllCategory')
    }, message => {
      commit(types.NEW_MESSAGE, { message: '分类编辑失败!', type: "error" })
    })
  },
  operCategory({ commit, dispatch }, { operType, id }) {
    const type = {
      open: '启用',
      stop: '停用'
    }
    api.operCategory(operType, id, data => {
      commit(types.NEW_MESSAGE, { message: `该分类已${type[operType]}!`, type: "success" })
      return dispatch('getAllCategory')
    }, message => {
      commit(types.NEW_MESSAGE, { message: `该分类${type[operType]}失败!`, type: "error" })
    })
  },
  deleteCategory({ commit, dispatch }, { id }) {
    api.deleteCategory(id, data => {
      commit(types.NEW_MESSAGE, { message: `该分类已删除!`, type: "success" })
      return dispatch('getAllCategory')
    }, message => {
      commit(types.NEW_MESSAGE, { message: `该分类删除失败!`, type: "error" })
    })
  },
}

// mutations
const mutations = {
  [types.RECEIVE_ALL_CATEGORY](state, { tree }) {
    state.tree = tree
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
