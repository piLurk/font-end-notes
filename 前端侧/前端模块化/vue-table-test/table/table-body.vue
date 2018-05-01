<template>
  
  <tbody>
    {{data}}
      <template v-for="(row, index) in data">
          <tr>
            <template v-for="(column, k) in columns">
              <td v-if="column.type === 'index'">{{index + 1}}</td>
              <td v-else-if="column.type === 'expand'" class="arrowTd">
                <i class="arrow"></i>
              </td>
              <td v-else-if="column.type === 'section'" class="section-td">
                <i 
                  :class= "{'section-checkbox':true, isSelected:isSelected(row)}"
                  @click="simpleSelectClick($event, row)"
                  ></i>
              </td>
              <td v-else>{{row[ column['property'] ]}}</td>
            </template>
          </tr>
          <tr v-if="isRowExpanded">
            <td colspan="columns.length" v-html="table.renderExpanded({row, index})">
            </td>
          </tr>
      </template>
  </tbody>
</template>

<script>
export default {
  name:'MyTableBody',
  data(){
    return {
      data:[]
    }
  },
  props: {
    store:{
      require:true
    },
    props:{
      type: Array,
      default: function() {
        return []
      }
    },
  },
  methods:{
    updataData(){
      this.data = [...this.store.states.data]
    },
    isSelected(row){
      return row['selected'];
    },
    simpleSelectClick(event, row) {
      this.store.commit('rowSelectedChanged', row);
      this.updataData()
    },
  },
  created(){
    this.data = this.store.states.data;
  },
  computed:{
    table() {
      return this.$parent;
    },
    columns(){
      return this.store.states.columns
    },
    isRowExpanded(){
      return this.store.states.isRowExpanded;
    }
  },
  mounted(){
    // setTimeout(() => {
    //   console.log('g')
    //   this.store.states.data = [];

    // },3000)
    
  }
}
</script>

