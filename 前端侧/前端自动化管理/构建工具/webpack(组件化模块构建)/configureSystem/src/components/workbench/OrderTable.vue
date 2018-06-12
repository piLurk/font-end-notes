<template>
  <el-table :data="data" style="width: 100%">
    <el-table-column prop="orderNumber" label="订单编号" width="180"></el-table-column>
    <el-table-column prop="orderTypeName" label="订单类型" :formatter="blank" width="100"></el-table-column>
    <el-table-column prop="deployState" label="配置状态" :formatter="blank" width="100"></el-table-column>
    <el-table-column prop="orderStateName" label="订单状态" :formatter="blank" width="160"></el-table-column>
    <el-table-column prop="overdueSate" label="超期状态" :formatter="blank" width="100"></el-table-column>
    <el-table-column prop="periodDay" label="超期天数" :formatter="blank" width="100"></el-table-column>
    <el-table-column prop="decorationProvider" label="量房周期" :formatter="blank" width="100"></el-table-column>
    <el-table-column prop="contractNumber" label="收房合同号" :formatter="blank" width="170"></el-table-column>
    <el-table-column prop="orderAddress" label="物业地址" :formatter="blank" min-width="280"></el-table-column>
    <el-table-column prop="houseTypeName" label="收房产品" :formatter="blank" width="110"></el-table-column>
    <el-table-column prop="jrId" label="产品版本" :formatter="blank" width="130"></el-table-column>
     <el-table-column prop="orderTime" label="下单日期" :formatter="toDate" width="130"></el-table-column>
    <el-table-column prop="contractSubmitDate" label="合同提交日期" :formatter="toDate" width="130"></el-table-column>
    <el-table-column prop="contractDetermineDate" label="合同生效日期" :formatter="toDate" width="130"></el-table-column>
    <el-table-column prop="predictPeriod" label="预计周期" :formatter="blank" width="110"></el-table-column>
    <el-table-column prop="actualDate" label="实际工期" :formatter="blank" width="110"></el-table-column>
    <el-table-column prop="predictDate" label="预计竣工日期" :formatter="toDate" width="130"></el-table-column>
    <el-table-column prop="houseReserveDate" label="量房日期" :formatter="toDate" width="110"></el-table-column>

    <el-table-column label="方案提交日期" width="180">
      <template scope="scope">
        <span>{{ scope.row.submitDate | labelDate }}</span>
        <el-tooltip placement="top" v-if="scope.row.submitDate && scope.row.submitDate.length > 1">
          <div slot="content">
            <p v-for="(item, index) in scope.row.submitDate" :key="index">
              <span>{{item[0]}}</span>
              <span>{{item[1]}}</span>
            </p>
          </div>
          <i class="more-info"></i>
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column label="方案通过日期" width="180">
      <template scope="scope">
        <span>{{ scope.row.approveDate | labelDate }}</span>
        <el-tooltip placement="top" v-if="scope.row.submitDate && scope.row.submitDate.length > 1">
          <div slot="content">
            <p v-for="(item, index) in scope.row.approveDate" :key="index">
              <span>{{item[0]}}</span>
              <span>{{item[1]}}</span>
            </p>
          </div>
          <i class="more-info"></i>
        </el-tooltip>
      </template>
    </el-table-column>

    <el-table-column prop="decorateDate" label="标配装修派工日期" :formatter="toDate" width="150"></el-table-column>
    <el-table-column prop="address" label="提交竣工日期" :formatter="toDate" width="130"></el-table-column>
    <el-table-column prop="standardDate" label="确认竣工日期" :formatter="toDate" width="130"></el-table-column>
    <el-table-column prop="orderSteward" label="订单管家" :formatter="blank" width="100"></el-table-column>
    <el-table-column prop="orderDeploy" label="订单配置" :formatter="blank" width="100"></el-table-column>
  </el-table>
</template>


<script type="text/javascript">
import { dateFilter } from '@/utils/date.js'

export default {
  props: {
    data: { type: Array }
  },
  filters: {
    labelDate(val) {
      if (!val || !val[0]) {
        return '---'
      } else {
        return val[0][0] + '：' + val[0][1]
      }
    }
  },
  methods: {
    toDate(row, column, cellValue) {
      return dateFilter(cellValue)
    },
    blank(row, column, cellValue) {
      return cellValue === null || cellValue === '' ? '---' : cellValue
    },
  }
}
</script>

<style scoped>
.more-info {
  position: relative;
  line-height: 1;
  vertical-align: baseline;
  display: inline-block;
  float: right;
  width: 19px;
  height: 19px;
}
.more-info::before {
  position: absolute;
  content: '';
  display: block;
  width: 19px;
  height: 19px;
  top: 2px;
  background: url(/static/images/more.png) no-repeat center center;
}
</style>

