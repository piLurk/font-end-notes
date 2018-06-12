<template>
  <div class="item hosehold_appliances" v-if="!tabsIndex || isInit">
    <h3>{{parentItem.sortName}}配置物品</h3>
    <div class="tableBox pdlr35 pdtb15" style="width: auto;">
      <div style="position:relative;">
        <plan-edit-row v-model="goods[rowIndex[0]] && goods[rowIndex[0]][rowIndex[1]]" :sortName="parentItem.sortName" :sortOptions="level2UsedTreeMap[l2SortId] ? level2UsedTreeMap[l2SortId].children : []" :choosedSelect="choosedSelect" :position="choosedPosition" :isOperRow="false" :checkRepeat="checkRepeat" :providerId="providerIdMap[l2SortId]">
        </plan-edit-row>
        <div class="clearfix">
          <table class="modtable table-goods" style="width:120px; float:left;" border="0" cellpadding="0" cellspacing="0" v-if="type !== 1">
            <tr>
              <th>功能区间</th>
            </tr>
            <tr v-for="( item0, index0 ) in rooms" :key="item0">
              <td :style="{height: ~~goods[index0].length * 41 + 40 + 'px'}" style="border-right: 1px solid #f1f1f1;">{{ item0 }}</td>
            </tr>
          </table>
          <table class="modtable table-goods" :style="tableWidth" border="0" cellpadding="0" cellspacing="0">
            <tr>
              <th width="150" ref="sortSelect">物品分类</th>
              <th width="250" ref="goodsSelect">物品名称</th>
              <th width="100">单位</th>
              <th width="100">单价</th>
              <th width="150" v-if="type===2">计划开始日期</th>
              <th width="150" v-if="type===2">计划结束日期</th>
              <th width="120">数量{{type===3 ? '(窗帘宽度)':''}}</th>
              <th width="120" v-if="type===3">窗帘高度</th>
              <th width="200" ref="sourceSelect">费用出处</th>
              <th width="120" style="text-align: center;">操作</th>
            </tr>
            <template v-for="( item0, index0 ) in goods">
              <plan-row v-for="(item1,index1) in item0" :key="item1.functionType + item1.goodsId + item1.randomKey" :data="item1" :row-index="[index0, index1]" :type="type" v-on:del-row="delRow(index0, index1)" v-on:oper-row="operRow" v-on:validation-count-true="validationCount1('goods'+index0+'-'+index1)" v-on:validation-count-false="validationCount2('goods'+index0+'-'+index1)"></plan-row>
              <tr>
                <td colspan="20">
                  <el-button class="addBtn" type="success" @click="addRow(index0)">+ 添加物品{{ type !== 1 ? ('（'+rooms[index0])+'）' : '' }}</el-button>
                </td>
              </tr>
            </template>
          </table>
        </div>
      </div>
    </div>
    <template>
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
              <th width="150">物品分类</th>
              <th width="250">物品名称</th>
              <th width="200">所属物品</th>
              <th width="100">单位</th>
              <th width="100">单价</th>
              <th width="120">数量</th>
              <th width="150">费用出处</th>
            </tr>
            <template v-for="( item0, index0 ) in accessories">
              <plan-row2 v-for="(item2,index2) in item0" :key="item2.functionType + item2.goodsId" :data="item2" :row-index="[index0, index2]" v-on:validation-count-true="validationCount1('acc'+index0+'-'+index2)" v-on:validation-count-false="validationCount2('acc'+index0+'-'+index2)"></plan-row2>
            </template>
          </table>
        </div>
      </div>
    </template>
    <div class="t_r pdlr35 pdtb15">预估成本
      <strong class="mycolor f20">￥{{sum}}</strong>
    </div>
  </div>
</template>


<script type="text/javascript">
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapActions } = createNamespacedHelpers('newOrder')
// import uniq from 'lodash/uniq'
import debounce from 'lodash/debounce'

import {
  getStandardDetail,
  getConfPlanDetail,
  getGoodsAddition,
  getGoodsPriceDetail
} from '@/api/projectplan'
import { getSortGoods, getGoodsById } from '@/api/basicdatamgmt'
import { priceSource } from 'components/public/options.config'

const initCostSourceAndKey = function(key) {
  const _s = priceSource[0]
  return ele => {
    ele.key = key
    ele.priceSource = _s
  }
}

const createRow = functionType => ({
  endDate: null,
  goodsId: '',
  goodsName: '请选择',
  number: '',
  sortId: '',
  sortName: '请选择',
  functionType: functionType,
  key: 'disposition',
  startDate: null,
  height: null,
  startDate: null,
  endDate: null,
  priceSource: priceSource[0],
  randomKey: Math.random().toFixed(10),
  accessory: []
})

// 检查数据完整性
const isIntegrity = ele =>
  ele.sortId &&
  ele.goodsId &&
  ele.key &&
  !isNaN(ele.number) &&
  ele.number !== '' &&
  ele.number !== null &&
  ele.number !== undefined &&
  ele.functionType

const timeToString = date => {
  if (date) return new Date(date).getTime()
  else return date
}

import planTable from '@/mixins/planTable.js'
import PlanEditRow from 'components/plan/PlanEditRow.vue'
import PlanRow from 'components/plan/PlanRow.vue'
import PlanRow2 from 'components/plan/PlanRow2.vue'

export default {
  name: 'editPlanTable',
  props: ['parentItem', 'parentIndex', 'contractNumber', 'roomVos', 'tabsIndex', 'update'],
  components: {
    'plan-edit-row': PlanEditRow,
    'plan-row': PlanRow,
    'plan-row2': PlanRow2
  },
  data() {
    return {
      params: { oper: 'create', type: 0, id: '' },
      isInit: false,
      rowIndex: [-1, -1],
      rowData: {},
      choosedSelect: '',
      choosedPosition: {},
      modify: false,
      goods: [],
      rooms: [],
      validationMap: {},
      loadingInstance: null
    }
  },
  computed: {
    ...mapGetters({
      providerIdMap: 'providerIdMap',
      roomList: 'roomList'
    }),
    level2UsedTreeMap() {
      let _map = {}
      this.$store.getters.level2UsedTree.map(ele => {
        _map[ele.id] = ele
      })
      return _map
    },
    l2SortId() {
      return this.parentItem.pkId
    },
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
    },
    sum() {
      let sum = 0
      const mult = (a, b) => {
        const p = isNaN(b.unitPrice) ? 0 : b.unitPrice
        const n = isNaN(b.number) ? 0 : b.number
        return a + Math.round(p * n * 100) / 100
      }
      if (this.goods) {
        sum += this.goods.reduce((s, goods) => {
          return (
            s +
            goods.reduce((s, item) => {
              return mult(s, item) + item.accessory.reduce(mult, 0)
            }, 0)
          )
        }, 0)
      }
      return sum.toFixed(2)
    }
  },
  watch: {
    tabsIndex(val) {
      if (!this.isInit && val === this.parentIndex + 1) {
        this.loadingInstance = this.$loading({ target: '.table-content', text: '加载中...' })
        this.initPage()
      }
    },
    // 上传数据
    update(val) {
      if (val === this.parentIndex + 1) {
        if (!this.validate()) {
          this.$message.error('请处理无效数据')
          this.$emit('update:update', 'error')
        }
        return
      }
      if (val === true) {
        if (!this.validate()) {
          this.$message.error('请处理无效数据')
          return
        }
        let _f = Object.assign({}, this.parentItem, {
          deployParticularMap: {
            rooms: this.rooms,
            goods: this.goods.map(g => g.filter(isIntegrity))
          },
          sortId: this.l2SortId,
          modify: this.modify
        })
        _f = JSON.parse(JSON.stringify(_f))

        if (this.type === 2) {
          _f.deployParticularMap.goods.forEach(items => {
            items.forEach(ele => {
              ele.startDate = timeToString(ele.startDate)
              ele.endDate = timeToString(ele.endDate)
            })
          })
        }
        this.$emit('updateForm', _f)
      }
    },
    'parentItem.pkId': {
      handler: function(val) {
        this.initPage()
        console.log(this.roomVos)
      },
      immediate: true
    }
  },
  methods: {
    closeLoading() {
      setTimeout(() => {
        this.$nextTick(() => {
          this.isInit = true
          this.$nextTick(() => {
            this.loadingInstance && this.loadingInstance.close()
            this.loadingInstance = null
          })
        })
      }, 100)
    },
    validationCount1(key) {
      this.validationMap[key] = true
    },
    validationCount2(key) {
      this.validationMap[key] = false
    },

    // return true 校验通过
    validate() {
      return Object.entries(this.validationMap).every(([key, value]) => !value)
    },
    delRow(index0, index1) {
      this.choosedSelect = ''
      this.goods[index0].splice(index1, 1)
    },
    addRow(index0) {
      this.choosedSelect = ''
      this.goods[index0].push(createRow(this.rooms[index0]))
    },
    getTop(roomIndex, goodsIndex) {
      let i = roomIndex
      let t = 0
      const goods = this.goods
      while (i--) {
        t += goods[i].length + 1
      }
      return parseInt(t + goodsIndex)
    },
    operRow([targetName, item, roomIndex, goodsIndex]) {
      const _t = this.$refs[targetName]
      const position = {
        left: _t.offsetLeft + (this.type === 1 ? 0 : 120),
        width: _t.offsetWidth,
        top: 42 + 41 * this.getTop(roomIndex, goodsIndex)
      }
      this.$set(this, 'choosedPosition', position)

      this.rowData = item
      this.rowIndex = [roomIndex, goodsIndex]
      this.choosedSelect = ''
      this.$nextTick(function() {
        this.choosedSelect = targetName
      })
    },
    // 检查是否有重复物品
    checkRepeat(item) {
      if (item.goodsId == '' || (this.parentItem && this.parentItem.sortName === '家居')) {
        return
      }
      const c = this.goods[this.rowIndex[0]]
      const l = c.filter(e => e.goodsId === item.goodsId)
      if (l.length > 1) {
        this.$message.error('同一功能区间不能选择相同物品！')
        return true
      } else {
        return false
      }
    },
    // 补充方案初始化
    initAdditionalFn() {
      if (this.params.type === 1) {
        this.isRefreshTable = true
        this.$nextTick(function() {
          this.getGoodsOpt()
        })
      }
    },
    initPage() {
      this.params = { ...this.$route.params }
      this.choosedSelect = ''
      const _init = data => {
        if (!data) {
          if (this.type === 1) {
            data = {
              deployParticularMap: {
                goods: [[]],
                rooms: ['客厅01']
              }
            }
          } else {
            const rooms = this.roomVos.map(r => r.functionType)
            data = {
              deployParticularMap: {
                goods: Array.apply(null, Array(rooms.length)).map(_ => []),
                rooms,
              }
            }
          }
        }

        this.goods = data.deployParticularMap.goods
        this.rooms = data.deployParticularMap.rooms
        this.closeLoading()
      }

      // if (this.params.oper === 'create') {
      //   if (this.params.needStandard) {
      //     getStandardDetail(this.contractNumber, this.parentItem.pkId, _init)
      //   } else {
          _init()
        // }
      this.modify = true
    },
    clearSelect() {
      this.$set(this, 'choosedSelect', '')
    }
  },
  created() {
    // this.initPage()
  },
  activated() {
    if (
      this.$route.params.id === this.params.id &&
      this.$route.params.type === this.params.type &&
      this.$route.params.oper === this.params.oper
    ) {
      return
    }

    this.isInit = false
    this.initPage()
  },
  mounted() {
    window.vmtable || (window.vmtable = this)
    // console.log(this.$refs)
    window.addEventListener('resize', this.clearSelect)
  },
  destroyed() {
    window.removeEventListener('resize', this.clearSelect)
  }
}
</script>

<style scoped>
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

.table-goods .addBtn {
  background-color: #0fd38a;
  border-color: #1ac082;
  padding: 8px 30px;
}

.error-number-tip {
  display: none;
  color: #ff4949;
  font-size: 12px;
  line-height: 1;
  padding-top: 4px;
  position: absolute;
  top: 33px;
  left: 27px;
  z-index: 1;
}
.tableBox .modtable .error-row td {
  background-color: hsla(0, 87%, 69%, 0.1);
}
</style>
<style>
.error-number-item input,
.error-number-item input:hover,
.error-number-item input:focus {
  border-color: #ff4949;
}
.error-number-item .error-number-tip {
  display: block;
}
</style>

