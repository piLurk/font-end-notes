import Vue from 'vue'
import App from './index.vue';
import mytable from '../table/table.js'

Vue.use(mytable)

new Vue({
  el:'#app',
  render: h => h(App)
})