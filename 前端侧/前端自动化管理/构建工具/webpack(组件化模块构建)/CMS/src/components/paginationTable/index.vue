      
<template>
  <div class="table-wrap" v-loading="loading">
    <my-pagination :total="total" :page-size="pageSize" :curr="curr" :pageChange="pageGo"></my-pagination>
    <slot></slot>
    <div class="footPages">
      <el-pagination v-on:current-change="pageGo" v-show="total > pageSize"  layout="prev, pager, next" :page-size="pageSize" :current-page="curr" :total="total" ></el-pagination>
    </div>
  </div>
</template>

<script>
  import debounce from 'lodash/debounce'
  import MyPagination from './components/mypagination.vue'

  export default {
    props:{
      pageSize:{
        type: Number,
        default: 10
      },
      getData:{
        require: true,
        type: Function
      },
      formQuery: {
        require: true,
        type: Object
      }
    },
    components: { "my-pagination":  MyPagination },
    data() {
      return {
        total:0,
        curr:1,
        loading:false
      }
    },
    methods:{
      paginationReq() {
        this.loading = true;
        var formQuery = JSON.parse(JSON.stringify(this.formQuery))
        
        formQuery['pageSize'] = this.pageSize
        formQuery['pageIndex'] = this.curr
        var p = this.getData(formQuery).then( (res) => {
          this.total = res.data.total;
        } ).finally( () => {
          this.loading = false;
        })
      },
      pageGo(curr) {
        if (this.curr === curr) {
          return
        }
        this.curr = curr
        this.paginationReq()
      },
      orderQuery: debounce(function() {
        this.pagination.curr = 1
        this.formQuery = JSON.parse(JSON.stringify(this.form))
        this.paginationReq()
      }, 300),
      reset: debounce(function() {
        this.form = form();
        this.pagination.curr = 1
        this.formQuery = JSON.parse(JSON.stringify(this.form))
        this.paginationReq()
      }, 300),
    },
    watch:{
      formQuery: {
        immediate: true,
        deep: true,
        handler(newValue,oldValue) {
          this.paginationReq()
        }
      }
    }
  }
</script>