
import JrTable from './jrtable.vue'
import JrTableColumn from './table-column'
export default {
  install(Vue, options) {
    Vue.component(JrTable.name, JrTable)
    Vue.component(JrTableColumn.name, JrTableColumn)
  }
}