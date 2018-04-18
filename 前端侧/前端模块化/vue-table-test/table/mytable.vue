<template>
  <div class="tableWrap">
    <table>
      <div
      v-if="showHeader"
      class="el-table__header-wrapper"
      ref="headerWrapper">
      <table-header
        ref="tableHeader"
        :labels="labels"
        :border="border"
        :default-sort="defaultSort"
      >
      </table-header>
    </div>
      <table-body
        :data="dataList"
        :props="props"
      >
      </table-body>
    </table>
  </div>
</template>

<script>


import MyTableBody from "./table-body"
import MyTableHeader from "./table-header"

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
    }
  },
  components: {
    MyTableBody,
    MyTableHeader
  },
  data() {
    return {
      labels:[],
      props:[],
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
  methods:{
    addHeader({label, prop}){
      if(this.labels.indexOf(label) !== -1) {
        this.labels.push(label)
        this.props.push(prop)
      }
    },

  }

}

</script>