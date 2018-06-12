
import * as types from '../mutation-types'

const state = {
	currentItem: {},
	itemArr: [],
}

const getters = {
	itemArr: (state) => {
		return state.itemArr;
	},
	currentItem: (state) => {
		return state.currentItem;
	}
}

const actions = {
	itemArrAdd: ({ commit }, obj) => {
		commit(types.ADD_MENU, obj);
	},
	itemArrRemove: ({ commit }, obj) => {
		commit(types.REMOVE_MENU, obj);
		if (obj.to) {
			commit(types.ADD_MENU, obj.to)
		}
	}
}

const mutations = {
	[types.ADD_MENU](state, obj) {
		const arr = state.itemArr
		let prevItemIndex
		for (var i = 0; i < arr.length; i++) {
			if (arr[i].id === state.currentItem.id) {
				prevItemIndex = i
			}
			if (arr[i].id === obj.id) {
				//已存在id，切换组件
				state.currentItem = obj
				state.itemArr.splice(i, 1, obj)
				return
			}
		}
		//不存在id,推入新组件。

		state.itemArr.splice(prevItemIndex + 1, 0, obj);
		state.currentItem = obj;
	},
	[types.REMOVE_MENU](state, { id }) {
		let arr = state.itemArr;
		if (arr.length === 1) {
			return;
		}
		for (let i = 0; i < arr.length; i++) {
			if (arr[i].id === id) {
				if (state.currentItem.id === id) {
					//移除当前呈现的组件
					if (i === 0) {
						state.currentItem = state.itemArr[1]
					} else {
						state.currentItem = state.itemArr[i - 1]
					}
				}
				state.itemArr.splice(i, 1);
				return;
			}
		}
	},
	[types.SWITCH_MENU](state, id) {
		const arr = state.itemArr;
		for (var i = 0; i < arr.length; i++) {
			if (arr[i].id === id) {
				state.currentItem = arr[i];
				return
			}
		}
	}
}
export default {
	state,
	getters,
	actions,
	mutations,
}