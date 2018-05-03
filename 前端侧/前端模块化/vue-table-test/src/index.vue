<template>
  <div id="tablePage">
    <jr-table
      :data="tableList"
      @selection-change="handleSelectionChangejr">
      <jr-table-column
        type="section">
      </jr-table-column>
      <jr-table-column
        type="expand">
        <template slot-scope="props">
          <jr-table :data="props.row.items">
            <jr-table-column
              label="商品 ID"
              prop="id">
            </jr-table-column>
            <jr-table-column
              label="商品名称"
              prop="product">
            </jr-table-column>
            <jr-table-column
              label="描述"
              prop="desc">
            </jr-table-column>
          </jr-table>
        </template>
      </jr-table-column>
      <jr-table-column
        type="index"
        label="序号"
        ></jr-table-column>
      <jr-table-column
        prop="name"
        label="客户姓名"
      ></jr-table-column>
      <jr-table-column
        prop="year"
        label="年龄"
      ></jr-table-column>
    </jr-table>

  </div>
</template>

<script>

export default {
  data() {
    return {
      tableList:[]
    }
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChangejr(val){
      console.log(val)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  },
  mounted(){
    var arr = [
      {name:'tom',year:17,like:"women",want:'nobug', 
                items:[{id:"wch10254522", product:'水果1', desc:'这是水果'},{id:"wch10254522", product:'水果', desc:'这是水果'}] },
            {name:'jim',year:21,like:"sweet",want:'money', 
                items:[{id:"wch10254522", product:'水果2', desc:'这是水果'},{id:"wch10254522", product:'水果', desc:'这是水果'}]}
    ];
    setTimeout(() => {
      
      arr.map((item) => {
        this.tableList.push(item)
      })

      // this.tableList = arr;
    }, 3000)
  }
}

</script>