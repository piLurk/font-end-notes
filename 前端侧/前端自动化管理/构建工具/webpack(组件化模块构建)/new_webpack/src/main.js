import Vue from 'vue';
import VueRouter from 'vue-router';




// github.com/necolas/normalize.css   CSS resets
import 'normalize.css/normalize.css'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App.vue'
import routes from './router'
// import store from './store'


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




