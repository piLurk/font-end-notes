import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import user from './modules/user'
import getters from './getters'
import evaluation from './modules/evaluation'
import workbench from './modules/workbench'
import message from './modules/message'
import menu from './modules/menu'
import managetenants from './modules/managetenants'
import clue from './modules/clue'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    permission,
    tagsView,
    user,
    evaluation,
    workbench,
    message,
    menu,
    managetenants,
    clue
  },
  getters
})

export default store
