import debounce from 'lodash/debounce'




export default {
  methods: {
    //查询页面
    search: debounce(function () {
      this.pagination.curr = 1
      this.formatForm(this.filterForm)
      this.getGroupData()
    }, 500),
    //重置查询条件
    reset: debounce(function () {
      this.pagination.curr = 1
      this.filterForm = this.initFilterForm()
      this.formatForm(this.filterForm)
      this.getGroupData() //重新查询一次所有数据
    }, 500),
    pageGo(val, callback) {
      if (this.pagination.curr === val) {
        return
      }
      this.pagination.curr = val
      this.getGroupData()
    },
  }
}