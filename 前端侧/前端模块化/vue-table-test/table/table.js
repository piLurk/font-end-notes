import Vue from 'vue'
import mytable from './mytable.vue'

const plugin = {
  install(Vue, options) {
    Vue.component('mytable', mytable)
  }
}