
import * as types from '../mutation-types'

const state = {
	message: {},
	loading:{},
}

const getters = {
	message: (state) => {
		return state.message;
	},
	loading:(state) => {
		return state.loading;
	}
}

const mutations = {
	[types.NEW_MESSAGE](state, obj) {
    state.message = obj
	},
	[types.SET_LOADING](state,obj){
		state.loading=obj;
	}
}
export default {
	state,
	getters,
	mutations,
}