<template>
  <div class="item hosehold_appliances">
    <h3>{{parentItem.sortName}}配置物品</h3>
    <div class="tableBox pdlr35 pdtb15" style="width: auto;">
      <table class="modtable" v-if="parentItem.sortName!='宽带'" width="100%" border="0" cellpadding="0" cellspacing="0">
        <tr>
          <th width="200">功能区间</th>
          <th width="200">物品分类</th>
          <th width="200">物品名称</th>
          <th width="150">单位</th>
          <th width="150">单价</th>
          <th width="150" v-if="parentItem.sortName=='保洁'">计划开始日期</th>
          <th width="150" v-if="parentItem.sortName=='保洁'">计划结束日期</th>
          <th width="120">数量{{parentItem.sortName=='家居' ? '(窗帘宽度)':''}}</th>
          <th width="120" v-if="parentItem.sortName=='家居'">窗帘高度</th>
          <th width="150">费用出处</th>
        </tr>
        <tr v-for="(item1,index1) in goodsList" :key="index1">
          <td width="200" v-if="mergrRule1[index1] && parentItem.sortName!='宽带'" :rowspan="mergrRule1[index1]" class="function-type">{{item1.functionType}}</td>
          <td width="200">{{item1.sortName}}</td>
          <td width="200">{{item1.goodsName}}</td>
          <td width="100">{{item1.unit | blank}}</td>
          <td width="100">{{item1.unitPrice | blank}}</td>
          <td width="150" v-if="parentItem.sortName=='保洁'">{{item1.startDate | toDate}}</td>
          <td width="150" v-if="parentItem.sortName=='保洁'">{{item1.endDate | toDate}}</td>
          <td width="120">{{item1.actualNum}}</td>
          <td width="120" v-if="parentItem.sortName==='家居'">{{item1.actualHeight}}</td>
          <td width="200">{{item1.priceSource}}</td>
        </tr>
      </table>
      <div v-else class="modbox">
        <bandwidth-form :bandwidth-info="bandwidthInfo"></bandwidth-form>
      </div>
    </div>
    <div class="t_r pdlr35 pdtb15">成本
      <strong class="mycolor f20">￥{{cost.toFixed(2)}}</strong>
    </div>
  </div>
</template>


<script type="text/javascript">
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('projectplan/createPlan')
import { getCompletedDetail } from '@/api/projectdelivery'
import BandwidthForm from '@/components/projectdelivery/bandwidthForm.vue'

export default {
  name: 'viewPlanTable1',
  props: ['parentItem', 'roomList'],
  components: {
    'bandwidth-form': BandwidthForm
  },
  data() {
    return {
      params: {
        oper: 'create',
        type: 0,
        id: ''
      },
      goodsList: [],
      bandwidthInfo: {},
      cost: 0
    }
  },
  computed: {
    mergrRule1() {
      return this.setMergrRule(this.goodsList)
    }
  },
  methods: {
    // 设置合并规则
    setMergrRule(dataList) {
      const roomList = this.roomList
      let _map = roomList.map(e => -1)
      let result = []
      dataList.map((d, index) => {
        let i = roomList.indexOf(d.functionType)
        if (_map[i] === -1) {
          _map[i] = index
          result[index] = 1
        } else {
          result[_map[i]]++
          result[index] = 0
        }
      })
      return result
    },
    sortClassifyDetail(obj, key) {
      const _list = this.roomList
      const fn = (a, b) => _list.indexOf(a.functionType) - _list.indexOf(b.functionType)
      let c = JSON.parse(JSON.stringify(obj[key]))
      c.sort(fn)
      obj[key] = c
    },
    initPage() {
      this.params = { ...this.$route.params }
      const ids = this.parentItem.pkId || this.parentItem.detailsIdList
      getCompletedDetail(ids, data => {
        this.sortClassifyDetail(data, 'particularsVoList')

        this.$set(this, 'goodsList', data.particularsVoList)
        if (this.parentItem.sortName == '宽带') {
          this.$set(this, 'bandwidthInfo', data.bandwidthVo)
        }
        this.$set(this, 'cost', data.cost)
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
</style>
