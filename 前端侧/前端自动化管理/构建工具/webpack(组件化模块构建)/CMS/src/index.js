import Vue from 'vue';

// var fs = require('fs');
//var path = require('path');

// utils需要最早初始化
import utils from './utils'
Vue.use(utils)


import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App.vue'
import router from './router'
import store from './store'




// 路由权限--根据生成的路由。
import '@/router/permission'


Vue.use(Element);


new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})




