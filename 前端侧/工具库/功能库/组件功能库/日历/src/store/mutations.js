
import {
	INCREMENT,
	REDUCE
} from './types'

import getters from './getters'

const state={
	currentViewId:'',
	itemArr:[],
	personId:'',
	userId:'',
	readOnly:false,
	permissionObj:{}
};
const mutations={
	itemArrAdd(state,obj){
		var arr=state.itemArr;
		for(var i=0;i<arr.length;i++){
			if (arr[i].id===obj.id) {
				//已存在id，切换组件
				state.currentViewId=obj.id;
				return
			}
		}
		//不存在id,推入新组件。
		state.itemArr.push(obj);
		state.currentViewId=obj.id;
		if (!!obj.personId) {
			//有personId传过来，说明是(编辑或者查询页面)
			state.personId=obj.personId;
			if (obj.readOnly) {
				//查询页面
				state.readOnly=true;
			}else{
				//编辑页面
				state.readOnly=false;
			}
		}else{ 
			state.personId='';
		}
	},
	itemArrRemove(state,obj){
		var arr=state.itemArr; 
		if (!!obj.type && obj.type==="triggerRemove") {
			//内部跳转
			for(var i=0;i<arr.length;i++){
				if (arr[i].id===obj.id) {
					state.itemArr.splice(i,1);
					console.log(JSON.stringify(state.itemArr));
					return;
				}
			}
		}else{
			
			if (arr.length===1) {
				return
			}
			for(var i=0;i<arr.length;i++){
				if (arr[i].id===obj.id) {
					state.itemArr.splice(i,1);
						//tap标签切换
						
						if (state.currentViewId===obj.id) {
							//移除当前呈现的组件
							if (i==arr.length) {
							//最后一个移除
								state.currentViewId=state.itemArr[i-1].id
							}else{
								//不是最后一个移除
								state.currentViewId=state.itemArr[i].id
							}
						}else{
							//移除非呈现的组件,不切换组件

						}		
					return;
				}
			}

		}

		
	}
}
export default {
	state,
	mutations,
	getters
}