import Vue from 'vue'
import App from './index.vue';

import jrtable from '../table'
Vue.use(jrtable)



new Vue({
  el:'#app',
  render: h => h(App)
})