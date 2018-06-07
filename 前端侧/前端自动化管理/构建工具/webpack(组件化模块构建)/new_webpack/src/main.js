import Vue from 'vue';


// var fs = require('fs');
//var path = require('path');




import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App.vue'
import router from './router'
import store from './store'


import utils from './utils'
Vue.use(utils)


// 路由权限--根据生成的路由。
import '@/router/permission'




Vue.use(Element);
https://webpack.js.org/plugins/define-plugin/#usage


new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})




