import Vue from 'vue';
import VueRouter from 'vue-router';

// var fs = require('fs');
//var path = require('path');




import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App.vue'
import routes from './router'
// import store from './store'


// 或去路由
// var routeFilePath = path.resolve('./views');


Vue.use(Element);
Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes
});

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  // store
})




