<template>
  <div>
    <div class="page-part page-filters">
      <el-row :gutter="30">
        <el-form label-position="left" label-width="90px">
          <slot name="filters" :filters="filterForm"></slot>
        </el-form>
      </el-row>
      <el-row style="padding-top: 10px;">
        <el-button :style="{ 'margin-left': 90 + 5 + 'px', 'width': '100px' }" type="primary" @click="search">查询</el-button>
        <el-button style="width:100px;" @click="reset">重置</el-button>
      </el-row>
    </div>
    <div class="page-part page-table">
      <div class="toolBar topBar clearfix">
        <my-pagination :total="total" :curr="pagination.curr" :pageChange="pageGo"></my-pagination>
      </div>
      <slot name="table" class="tableBox"></slot>
      <div class="toolBar bottomBar clearfix">
        <el-pagination :total="total" :current-page="pagination.curr" @current-change="pageGo" layout="prev, pager, next"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
export default {
  name: 'ListPage',
  props: {
    total: {
      type: Number,
      required: true
    },
    pagination: {
      type: Object,
      default: function() {
        return {
          curr: 1,
          pageSize: 10
        }
      }
    },
    initFilterForm: {
      type: Function
    },
    fetchList: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      _filterForm: {},
      filterForm: this.initFilterForm()
    }
  },
  methods: {
    getList(isSearch) {
      this.fetchList({
        ...this._filterForm,
        limit: this.pagination.pageSize,
        pageNum: this.pagination.curr,
        isSearch
      })
    },
    //查询页面(完成)
    search: debounce(function() {
      this._filterForm = JSON.parse(JSON.stringify(this.filterForm))
      this.pagination.curr = 1
      this.getList(true)
    }, 300),
    //重置查询条件(完成)
    reset: debounce(function() {
      this._filterForm = this.filterForm = this.initFilterForm()
      this.pagination.curr = 1
      this.getList()
    }, 300),
    //分页请求数据
    pageGo(val) {
      if (this.pagination.curr === val) {
        return
      }
      this.activeId = ''
      this.pagination.curr = val
      this.getList()
    }
  },
  // mounted() {
  //   this.getList()
  // }
}
</script>

<style scoped>
.page-part {
  padding: 20px;
  background: #fff;
}
.page-part:not(:first-child) {
  margin-top: 20px;
}
.toolBar > div {
  float: right;
}
.topBar {
  padding: 15px 0;
}
.bottomBar {
  padding-top: 20px;
}
</style>
