import Vue from 'vue'
import Mytable from './mytable.vue'
import MyTableColumn from './table-column'

const plugin = {
  install(Vue, options) {
    Vue.component(MyTable.name, MyTable)
    Vue.component(MyTableColumn.name, MyTableColumn)
  }
}