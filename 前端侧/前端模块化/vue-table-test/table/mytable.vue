
<template>
  <div class="tableBox">
    <slot></slot>
    <table class="modtable">
      <template
      v-if="showHeader"
      class="el-table__header-wrapper"
      ref="headerWrapper">
      <my-table-header
        ref="tableHeader"
        :store="store"
        :border="border"
        :default-sort="defaultSort"
      >
      </my-table-header>
    </template>
      <my-table-body
        :store="store"
      >
      </my-table-body>
    </table>
  </div>
</template>

<script>
import MyTableBody from "./table-body.vue"
import MyTableHeader from "./table-header"


import TableStore from './table-store';

// 表id 
  let tableIdSeed = 1;
export default {
  name:'MyTable',

  props:{
    data:{
      type:Array,
      default: function() {
        return []
      }
    },

    showHeader: {
      type: Boolean,
      default: true
    },
    border: {
      type: Boolean,
      default: true
    },
    defaultExpandAll: {
      type: Boolean,
      default: false
    },
    selectOnIndeterminate: {
      type: Boolean,
      default: true
    }
  },
  components: {
    MyTableBody,
    MyTableHeader
  },
  data() {
    const store = new TableStore(this, {
      // 是否默认打开展开
      defaultExpandAll: this.defaultExpandAll,
      // 点击表头多选框，全选。
      selectOnIndeterminate: this.selectOnIndeterminate
    });
    
    return {
      props:[],
      store,
      showItems:[],
      defaultSort:[],
    }
  },
  
  watch: {
    data: {
      immediate: true,
      handler(value) {
        console.log('data set')
        this.store.commit('setData', value)
      }
    },
    'store.states.isRowSelection': {
      immediate: true,
      handler(value) {
        this.store.commit('toggleSelectPorp', value)
      }
    }

  },
  methods:{
    updateScrollY() {
      this.layout.updateScrollY();
      this.layout.updateColumnsWidth();
    },
  },
  computed:{

  },
  created() {
    this.tableId = 'el-table_' + tableIdSeed++;
  },
  mounted() {
    // 最后父组件mounted触发
    //更新列
    // this.store.updateColumns();
  }

}
</script>

<style>
  .section-td{
    width:40px;
  }
  .section-td .section-checkbox{
    position:relative;
    display:inline-block;
    width:14px;
    height:14px;
    border:1px solid #efefef;
    cursor:pointer;
    
  }
  .section-td .section-checkbox.isSelected{
    background-color:#409EFF;
  }
  .section-td .section-checkbox::after{
    box-sizing: content-box;
    content: "";
    border: 1px solid #fff;
    border-left: 0;
    border-top: 0;
    height: 8px;
    left: 5px;
    position: absolute;
    top: 1px;
    transform: rotate(45deg);
    width: 3px;
    -webkit-transform-origin: center;
    transform-origin: center;
  }
  
</style>