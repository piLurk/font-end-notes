import Vue from 'vue'
import Jrtable from './jrtable.vue'
import JrTableColumn from './table-column'

const plugin = {
  install(Vue, options) {
    Vue.component(JrTable.name, JrTable)
    Vue.component(JrTableColumn.name, JrTableColumn)
  }
}