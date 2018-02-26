import Vue from 'vue'
import SideBarComponent from './SideBar.vue'

const SideBar = {
	install:function (Vue) {
		Vue.component('SideBar',SideBarComponent)
	}
};

export default SideBar;