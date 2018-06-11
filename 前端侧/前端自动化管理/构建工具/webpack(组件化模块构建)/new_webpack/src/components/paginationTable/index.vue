      
<template>
  <div class="table-wrap">
    <my-pagination :total="total" :page-size="pageSize" :curr="curr" @pageChange="pageGo"></my-pagination>
    <slot></slot>
  </div>
</template>

<script>
  import debounce from 'lodash/debounce'
  import MyPagination from './components/MyPagination.vue'

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
      initFormQueryFlag: {
        require: true,
        type: Boolean,
        default: true
      }
    },
    components: { "my-pagination":  MyPagination },
    data() {
      return {
        total:0,
        curr:1,
        formQuery:{

        }
      }
    },
    methods:{
      paginationReq() {
        var formQuery = JSON.parse(JSON.stringify(this.formQuery))
        formQuery['pageSize'] = this.pageSize
        formQuery['pageIndex'] = this.curr
        this.getData(formQuery).then( (res) => {
          console.log('res是', res)
        } )
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
      initFormQueryFlag: {
        immediate: true,
        handler(newValue,oldValue) {
          if(newValue) {
            this.paginationReq()
          } 
        }
      }
    }
  }
</script>