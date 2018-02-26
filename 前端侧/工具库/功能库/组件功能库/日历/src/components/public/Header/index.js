import Vue from 'vue'
import HeaderComponent from './Header.vue'

const Header = {
	install:function (Vue) {
		Vue.component('OA-Header',HeaderComponent)
	}
};

export default Header;