
export default {
	itemArrAdd:({
		commit
	},obj) => {
		commit('itemArrAdd',obj);
	},
	itemArrRemove:({
		commit
	},id) => {
		commit('itemArrRemove',id);
	}
}