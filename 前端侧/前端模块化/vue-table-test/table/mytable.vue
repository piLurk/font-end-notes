
<template>
  <div class="tableBox">
     {{store.states.columns}}
    <slot></slot>
    <table class="modtable">
      <template
      v-if="showHeader"
      class="el-table__header-wrapper"
      ref="headerWrapper">
      <my-table-header
        ref="tableHeader"
        :store="store"
        :labels="labels"
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
import MyTableBody from "./table-body.js"
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
      labels:[],
      props:[],
      store,
      showItems:[],
      defaultSort:[],
    }
  },
  computed:{
    dataList() {
      return this.data.filters((item) => {
        labels.indexOf()
      })
    }
  },
  watch: {
    data: {
      immediate: true,
      handler(value) {
        this.store.commit('setData', value)
      }
    }
  },
  methods:{
    addHeader({label, prop}){
      if(this.labels.indexOf(label) === -1) {
        this.labels.push(label)
        this.props.push(prop)
      }
    },
    updateScrollY() {
      this.layout.updateScrollY();
      this.layout.updateColumnsWidth();
    },
  },
  created() {
    this.tableId = 'el-table_' + tableIdSeed++;
  },
  mounted() {

    //更新列
    // this.store.updateColumns();
  }

}
</script>