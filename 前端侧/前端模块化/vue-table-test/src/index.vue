<template>
  <div id="tablePage">
    <my-table
      :data="tableList">
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
      :data="tableList">
      <el-table-column
      label="序号"
      type="index"
      width="50">
      </el-table-column>
      <el-table-column
        prop="name"
        label="客户姓名"
      ></el-table-column>
      <el-table-column
        prop="year"
        label="年龄"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>

export default {
  data() {
    return {
      tableList:[{name:'tom',year:17,like:"women",want:'nobug'},{name:'jim',year:21,like:"sweet",want:'money'}]
    }
  },

}

</script>