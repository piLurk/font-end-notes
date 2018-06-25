
const state = {
	message: {}
}

const getters = {
	message: (state) => {
		return state.message;
	}
}

const mutations = {
	NEW_MESSAGE: (state, obj) => {
    	state.message = obj
	}
}
export default {
	state,
	getters,
	mutations,
}