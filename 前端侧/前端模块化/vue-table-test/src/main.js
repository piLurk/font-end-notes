import Vue from 'vue'
import App from './index.vue';
import jrtable from '../table'

import '../table/lib/css/base.css'
Vue.use(jrtable)



new Vue({
  el:'#app',
  render: h => h(App)
})