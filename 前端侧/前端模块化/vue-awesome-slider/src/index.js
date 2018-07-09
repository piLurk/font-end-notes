import Vue from 'vue';



// utils需要最早初始化
import utils from './utils'
Vue.use(utils)

import store from './store'

import slider from 'vue-awesome-swiper'
Vue.use(slider)

import App from './App.vue'


new Vue({
  el: '#app',
  render: h => h(App),
  store
})




