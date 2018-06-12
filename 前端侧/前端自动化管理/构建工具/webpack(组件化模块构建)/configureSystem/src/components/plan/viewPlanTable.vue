<template>
  <div class="item hosehold_appliances">
    <h3>{{parentItem.sortName}}配置物品</h3>
    <div class="tableBox pdlr35 pdtb15" style="width: auto;">
      <!-- <table class="modtable" width="100%" border="0" cellpadding="0" cellspacing="0">
        <tr>
          <th width="200" v-if="type!==1">功能区间</th>
          <th width="200">物品分类</th>
          <th width="200">物品名称</th>
          <th width="150">单位</th>
          <th width="150">单价</th>
          <th width="150" v-if="type===2">计划开始日期</th>
          <th width="150" v-if="type===2">计划结束日期</th>
          <th width="120">数量{{type===3 ? '(窗帘宽度)':''}}</th>
          <th width="120" v-if="type===3">窗帘高度</th>
          <th width="150">费用出处</th>
        </tr>
        <tr v-for="(item1,index1) in classifyDetail.disposition" :key="index1">
          <td width="200" v-if="mergrRule1[index1] && type!==1" :rowspan="mergrRule1[index1]" class="function-type">{{item1.functionType}}</td>
          <td width="200">{{item1.sortName}}</td>
          <td width="200">{{item1.goodsName}}</td>
          <td width="100">{{item1.unit | blank}}</td>
          <td width="100">{{item1.unitPrice | blank}}</td>
          <td width="150" v-if="type===2">{{item1.startDate | toDate}}</td>
          <td width="150" v-if="type===2">{{item1.endDate | toDate}}</td>
          <td width="120">{{item1.number}}</td>
          <td width="120" v-if="type===3">{{item1.height}}</td>
          <td width="200">{{item1.priceSource}}</td>
        </tr>
      </table> -->

      <div class="clearfix">
        <table class="modtable table-goods" style="width:120px; float:left;" border="0" cellpadding="0" cellspacing="0" v-if="type !== 1">
          <tr>
            <th>功能区间</th>
          </tr>
          <tr v-for="( item0, index0 ) in rooms" v-if="goods[index0].length > 0" :key="item0" :class="{ 'split-row': index0 !== 0 }">
            <td :style="{height: ~~goods[index0].length * 41 - 1 + 'px'}" style="border-right: 1px solid #f1f1f1;">{{ item0 }}</td>
          </tr>
        </table>
        <table class="modtable table-goods" :style="tableWidth" border="0" cellpadding="0" cellspacing="0">
          <tr>
            <th width="200">物品分类</th>
            <th width="200">物品名称</th>
            <th width="150">单位</th>
            <th width="150">单价</th>
            <th width="150" v-if="type===2">计划开始日期</th>
            <th width="150" v-if="type===2">计划结束日期</th>
            <th width="120">数量{{type===3 ? '(窗帘宽度)':''}}</th>
            <th width="120" v-if="type===3">窗帘高度</th>
            <th width="150">费用出处</th>
          </tr>
          <template v-for="( item0, index0 ) in goods">
            <tr v-for="(item1,index1) in item0" :key="index0 + '-' + index1" :class="{ 'split-row': index1 === 0 && index0 !== 0 }">
              <td width="200">{{item1.sortName}}</td>
              <td width="200">{{item1.goodsName}}</td>
              <td width="100">{{item1.unit | blank}}</td>
              <td width="100">{{item1.unitPrice | blank}}</td>
              <td width="150" v-if="type===2">{{item1.startDate | toDate}}</td>
              <td width="150" v-if="type===2">{{item1.endDate | toDate}}</td>
              <td width="120">{{item1.number}}</td>
              <td width="120" v-if="type===3">{{item1.height}}</td>
              <td width="200">{{item1.priceSource}}</td>
            </tr>
          </template>
        </table>
      </div>
    </div>
    <!-- <h3 v-if="classifyDetail.accessory && classifyDetail.accessory.length>0">配件及组装费用合计</h3>
    <div class="tableBox pdlr35 pdtb15" style="width: auto;" v-if="classifyDetail.accessory && classifyDetail.accessory.length>0">
      <table class="modtable" width="100%" border="0" cellpadding="0" cellspacing="0">
        <tr>
          <th width="200" v-if="parentItem.sortName!='宽带'">功能区间</th>
          <th width="200">物品分类</th>
          <th width="200">物品名称</th>
          <th width="200">所属物品</th>
          <th width="150">单位</th>
          <th width="150">单价</th>
          <th width="120">数量</th>
          <th width="150">费用出处</th>
        </tr>
        <tr v-for="(item2,index2) in classifyDetail.accessory" :key="index2">
          <td width="200" v-if="mergrRule2[index2] && parentItem.sortName!='宽带'" :rowspan="mergrRule2[index2]" class="function-type">{{item2.functionType}}</td>
          <td width="200">{{item2.sortName}}</td>
          <td width="200">{{item2.goodsName}}</td>
          <td width="200">{{item2.parentName}}</td>
          <td width="150">{{item2.unit | blank}}</td>
          <td width="150">{{item2.unitPrice | blank}}</td>
          <td width="120">{{item2.number}}</td>
          <td width="150">{{item2.priceSource}}</td>
        </tr>
      </table>
    </div> -->
    <h3 v-if="showAcc">配件及组装费用合计</h3>
    <div v-if="showAcc" class="tableBox pdlr35 pdtb15" style="width: auto;">
      <div class="clearfix">
        <table class="modtable table-goods" style="width:120px; float:left;" border="0" cellpadding="0" cellspacing="0" v-if="type !== 1">
          <tr>
            <th>功能区间</th>
          </tr>
          <tr v-for="( item0, index0 ) in rooms" :key="item0" v-if="accessories[index0].length > 0">
            <td :style="{height: ~~accessories[index0].length * 41 - 1 + 'px'}" style="border-right: 1px solid #f1f1f1;">{{ item0 }}</td>
          </tr>
        </table>
        <table class="modtable table-goods" :style="tableWidth" width="100%" border="0" cellpadding="0" cellspacing="0">
          <tr>
            <th width="200">物品分类</th>
            <th width="200">物品名称</th>
            <th width="200">所属物品</th>
            <th width="150">单位</th>
            <th width="150">单价</th>
            <th width="120">数量</th>
            <th width="150">费用出处</th>
          </tr>
          <template v-for="( item0, index0 ) in accessories">
            <tr v-for="(item2,index2) in item0" :key="index0 + '-' + index2">
              <td width="200">{{item2.sortName}}</td>
              <td width="200">{{item2.goodsName}}</td>
              <td width="200">{{item2.parentName}}</td>
              <td width="150">{{item2.unit | blank}}</td>
              <td width="150">{{item2.unitPrice | blank}}</td>
              <td width="120">{{item2.number}}</td>
              <td width="150">{{item2.priceSource}}</td>
            </tr>
          </template>
        </table>
      </div>
    </div>
    <div class="t_r pdlr35 pdtb15">预估成本
      <strong class="mycolor f20">￥{{cost.toFixed(2)}}</strong>
    </div>
  </div>
</template>


<script type="text/javascript">
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('projectplan/createPlan')
import { getConfPlanDetail } from '../../api/projectplan'

export default {
  name: 'viewPlanTable',
  props: ['parentItem'],
  data() {
    return {
      params: {
        oper: 'create',
        type: 0,
        id: ''
      },
      goods: [],
      rooms: [],
      cost: 0
    }
  },
  computed: {
    ...mapGetters({
      roomList: 'roomList'
    }),
    type() {
      switch (this.parentItem.sortName) {
        case '宽带':
          return 1
        case '保洁':
          return 2
        case '家居':
          return 3
        default:
          return 0
      }
    },
    tableWidth() {
      let width
      if (this.type !== 1) {
        width = 'calc(100% - 120px)'
      } else {
        width = '100%'
      }
      return { width }
    },
    accessories() {
      return this.goods.map(items => items.reduce((result, item) => result.concat(item.accessory), []))
    },
    showAcc() {
      return this.accessories.some(acc => acc.length > 0)
    }
  },
  methods: {
    initPage() {
      this.params = { ...this.$route.params }
      getConfPlanDetail(this.parentItem.pkId, data => {
        this.goods = data.deployParticularMap.goods
        this.rooms = data.deployParticularMap.rooms
        this.cost = data.cost
      })
    }
  },
  created() {
    this.initPage()
  },
  activated() {
    if (
      this.$route.params.id === this.params.id &&
      this.$route.params.type === this.params.type &&
      this.$route.params.oper === this.params.oper
    ) {
      return
    }
    this.initPage()
  }
}
</script>

<style scoped>
table > tr > td.function-type {
  border-right: 1px solid #f1f1f1;
}
table.modtable > tr > td,
table.modtable > tr > th {
  text-align: center;
}

table > tr > td.function-type {
  border-right: 1px solid #f1f1f1;
}
.modtable .typeControl {
  text-align: center;
}

.table-room {
  box-sizing: border-box;
  width: 120px;
  float: left;
  padding-left: 10px;
  color: #576578;
  height: 100%;
  line-height: 100%;
}

.split-row td {
  border-top: 3px solid #eee;
}
</style>
