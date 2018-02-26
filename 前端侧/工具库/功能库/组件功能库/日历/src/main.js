//================入口文件

import Vue from 'vue'


// vuex配置
import store from './store/'

//全局变量配置
import util from './util'
Vue.use(util);

//交互
import Resource from 'vue-resource'
Vue.use(Resource);

import {Button,Radio,RadioGroup,Checkbox,CheckboxGroup,Input,Autocomplete,Select,Option,Cascader,
	DatePicker,Upload,Tag,Pagination,Message,MessageBox,Dialog,Menu,MenuItem,MenuItemGroup,Submenu,Tree,Form,FormItem,Loading} from 'element-ui'





// element ui 全局组件
Vue.use(Button);
Vue.use(Select);
Vue.use(Option);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Input);
Vue.use(Autocomplete);
Vue.use(Cascader);
Vue.use(DatePicker);

Vue.use(Upload);
Vue.use(Tag);
Vue.use(Pagination);

Vue.use(Dialog);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Submenu);
Vue.use(Tree);

Vue.use(Form);
Vue.use(FormItem);

Vue.use(Loading);

//message不使用use
Vue.prototype.$message=Message;

import App from './App.vue';
new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
