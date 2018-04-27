<template>
  <div id="tablePage">
    <my-table
      :data="tableList"
      @selection-change="handleSelectionChangeMy">
      <my-table-column
        type="expand">
        <template slot-scope="props">
          <my-table :data="props.row.items">
            <my-table-column
              label="商品 ID"
              prop="id">
            </my-table-column>
            <my-table-column
              label="商品名称"
              prop="product">
            </my-table-column>
            <my-table-column
              label="描述"
              prop="desc">
            </my-table-column>
          </my-table>
        </template>
      </my-table-column>

      <my-table-column
        type="section">
      
      </my-table-column>
      <my-table-column
        type="index"
        label="序号"
        ></my-table-column>
      <my-table-column
        prop="name"
        label="客户姓名"
      ></my-table-column>
      <my-table-column
        prop="year"
        label="年龄"
      ></my-table-column>
    </my-table>

    </hr>

  <el-table
    ref="multipleTable"
    :data="tableData3"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
        type="expand">
        <template slot-scope="props">
          <el-table :data="props.row.items">
            <el-table-column
              label="商品 ID"
              prop="id">
            </el-table-column>
            <el-table-column
              label="商品名称"
              prop="product">
            </el-table-column>
            <el-table-column
              label="描述"
              prop="desc">
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="日期"
      width="120">
      <template slot-scope="scope">{{ scope.row.date }}</template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      show-overflow-tooltip>
    </el-table-column>
  </el-table>
  <div style="margin-top: 20px">
    <el-button @click="toggleSelection([tableData3[1], tableData3[2]])">切换第二、第三行的选中状态</el-button>
    <el-button @click="toggleSelection()">取消选择</el-button>
  </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      tableList:[
            {name:'tom',year:17,like:"women",want:'nobug', 
                items:[{id:"wch10254522", product:'水果1', desc:'这是水果'},{id:"wch10254522", product:'水果', desc:'这是水果'}] },
            {name:'jim',year:21,like:"sweet",want:'money', 
                items:[{id:"wch10254522", product:'水果2', desc:'这是水果'},{id:"wch10254522", product:'水果', desc:'这是水果'}]}
      ],
      tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          items:[{id:"wch10254522", product:'水果2', desc:'这是水果'},{id:"wch10254522", product:'水果', desc:'这是水果'}]
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          items:[{id:"wch10254522", product:'水果2', desc:'这是水果'},{id:"wch10254522", product:'水果', desc:'这是水果'}]
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          items:[{id:"wch10254522", product:'水果2', desc:'这是水果'},{id:"wch10254522", product:'水果', desc:'这是水果'}]
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          items:[{id:"wch10254522", product:'水果2', desc:'这是水果'},{id:"wch10254522", product:'水果', desc:'这是水果'}]
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          items:[{id:"wch10254522", product:'水果2', desc:'这是水果'},{id:"wch10254522", product:'水果', desc:'这是水果'}]
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          items:[{id:"wch10254522", product:'水果2', desc:'这是水果'},{id:"wch10254522", product:'水果', desc:'这是水果'}]
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          items:[{id:"wch10254522", product:'水果2', desc:'这是水果'},{id:"wch10254522", product:'水果', desc:'这是水果'}]
        }],
      multipleSelection: []
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
    handleSelectionChangeMy(val){
      
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
}

</script>