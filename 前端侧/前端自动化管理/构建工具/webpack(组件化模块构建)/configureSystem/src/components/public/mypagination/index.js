import MyPagination from './MyPagination.vue'
import NoData from './NoData.vue'
export default {
  install: function (Vue) {
    Vue.component('my-pagination', MyPagination)
    Vue.component('no-data', NoData)
  }
}