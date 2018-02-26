import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import actions from './actions'
import mutations from './mutations'

export default new Vuex.Store({
	//模块引用 用modules ，mutations包括 state和mutaions getters
	modules:{
		mutations
	},
	actions
})