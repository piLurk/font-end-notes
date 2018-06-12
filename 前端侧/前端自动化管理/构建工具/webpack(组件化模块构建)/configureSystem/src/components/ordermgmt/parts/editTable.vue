
<template>
  <div class="item hosehold_appliances">
    <h3>{{parentItem.sortName}}配置物品</h3>
    <div class="tableBox pdlr35 pdtb15" style="width: auto;">
      <table class="modtable" width="100%" border="0" cellpadding="0" cellspacing="0">
        <tr>
          <th width="150" v-if="parentItem.sortName!='宽带'">功能区间</th>
          <th width="150">物品分类</th>
          <th width="250">物品名称</th>
          <th width="100">单位</th>
          <th width="100">单价</th>
          <th width="150" v-if="parentItem.sortName=='保洁'">计划开始日期</th>
          <th width="150" v-if="parentItem.sortName=='保洁'">计划结束日期</th>
          <th width="120">数量{{parentItem.sortName=='家居' ? '(窗帘宽度)':''}}</th>
          <th width="120" v-if="parentItem.sortName=='家居'">窗帘高度</th>
          <th width="200">费用出处</th>
          <th width="150" style="text-align: center;">操作</th>
        </tr>
        <tr v-for="(item1,index1) in classifyDetail.disposition" :key="index1" :class="[{'error-row' : rowValidator(item1,index1,1)[0], 'split-row' : mergrRule1[index1]&&parentItem.sortName!='宽带'}, rowClass1[index1]]">
          <td v-if="mergrRule1[index1]&&parentItem.sortName!='宽带'" :rowspan="mergrRule1[index1]" class="function-type">{{item1.functionType}}</td>
          <td>
            <el-select filterable size="small" filterable v-model="item1.sortId" placeholder="请选择" @change="clearItem(item1)">
              <el-option v-for="sortOpt in [BLANK1, ...level2UsedTreeMap[l2SortId].children]" :key="sortOpt.id" :label="sortOpt.sortName" :value="sortOpt.id">
              </el-option>
            </el-select>
          </td>
          <td>
            <el-select filterable size="small" filterable v-model="item1.goodsId" placeholder="请选择" @change="getGoodsDetail(index1, item1, l2SortId)" @visible-change="getGoodsOptions(item1.sortId ,item1)" :loading="!goodsOptionsMapFlag[item1.sortId]">
              <el-option v-for="goodsOpt in goodsOptionsMap[item1.sortId]?[BLANK2, ...goodsOptionsMap[item1.sortId]]:[BLANK2]" :key="goodsOpt.pkId" :label="goodsOpt.goodsName" :value="goodsOpt.pkId">
              </el-option>
            </el-select>
          </td>
          <td>{{item1.unit | blank}}</td>
          <td>{{item1.unitPrice | blank}}</td>
          <td v-if="parentItem.sortName=='保洁'">
            <el-date-picker v-model="item1.startDate" type="date" :editable="false" placeholder="请选择日期">
            </el-date-picker>
          </td>
          <td v-if="parentItem.sortName=='保洁'">
            <el-date-picker v-model="item1.endDate" type="date" :editable="false" placeholder="请选择日期">
            </el-date-picker>
          </td>
          <td style="position: relative;" :class="{'error-number-item': rowValidator(item1,index1,1)[1]}">
            <el-input v-model.number="item1.number" :placeholder="item1.maxNumber?'最大数量 '+item1.maxNumber:'请输入'"></el-input>
            <div class="error-number-tip">{{rowValidator(item1,index1,1)[1]}}</div>
          </td>
          <td v-if="parentItem.sortName==='家居'">
            <el-input v-model="item1.height" placeholder="请输入高度"></el-input>
          </td>
          <td>
            <el-select filterable v-model="item1.priceSource" placeholder="请选择">
              <el-option v-for="(item, index) in costSourceOptions" :key="index" :value="item">
              </el-option>
            </el-select>
          </td>
          <td>
            <p class="typeControl">
              <a class="z-btn" v-if="mergrRule1[index1]" @click="addRow(index1, item1)">增加一行</a>
              <a class="z-btn" v-else @click="delRow(index1, item1)">删行</a>
            </p>
          </td>
        </tr>
      </table>
    </div>
    <h3 v-if="classifyDetail.accessory && classifyDetail.accessory.length>0">配件及组装费用合计</h3>
    <div class="tableBox pdlr35 pdtb15" style="width: auto;" v-if="classifyDetail.accessory && classifyDetail.accessory.length>0">
      <table class="modtable" width="100%" border="0" cellpadding="0" cellspacing="0">
        <tr>
          <th width="150" v-if="parentItem.sortName!='宽带'">功能区间</th>
          <th width="150">物品分类</th>
          <th width="250">物品名称</th>
          <th width="200">所属物品</th>
          <th width="100">单位</th>
          <th width="100">单价</th>
          <th width="120">数量</th>
          <th width="150">费用出处</th>
        </tr>
        <tr v-for="(item2,index2) in classifyDetail.accessory" :key="index2" :class="[{'error-row' : rowValidator(item2,index2,2)[0]}, rowClass2[index2]]">
          <td v-if="mergrRule2[index2]&&parentItem.sortName!='宽带'" :rowspan="mergrRule2[index2]" class="function-type">{{item2.functionType}}</td>
          <td>{{item2.sortName}}</td>
          <td>{{item2.goodsName}}</td>
          <td>{{item2.parentName}}</td>
          <td>{{item2.unit | blank}}</td>
          <td>{{item2.unitPrice | blank}}</td>
          <td style="position: relative;" :class="{'error-number-item': rowValidator(item2,index2,2)[1]}">
            <el-input v-model="item2.number" :placeholder="item2.maxNumber?'最大数量 '+item2.maxNumber:'请输入'"></el-input>
            <div class="error-number-tip">{{rowValidator(item2,index2,2)[1]}}</div>
          </td>
          <td>
            <el-select filterable v-model="item2.priceSource" placeholder="请选择">
              <el-option v-for="(item, index) in costSourceOptions" :key="index" :value="item">
              </el-option>
            </el-select>
          </td>
        </tr>
      </table>
    </div>
    <div class="t_r pdlr35 pdtb15">预估成本
      <strong class="mycolor f20">￥{{caclSum()}}</strong>
    </div>

  </div>
</template>


<script type="text/javascript">
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapActions } = createNamespacedHelpers('newOrder')
import uniq from 'lodash/uniq'
import sortBy from 'lodash/sortBy'

import {
  getStandardDetail,
  getConfPlanDetail,
  getGoodsAddition,
  getGoodsPriceDetail
} from '../../../api/projectplan'
import { getSortGoods, getGoodsById } from '../../../api/basicdatamgmt'
import { priceSource } from '../../public/options.config'

const initCostSourceAndKey = function(key) {
  const _s = priceSource[0]
  return ele => {
    ele.key = key
    ele.priceSource = _s
  }
}

const timeToString = date => {
  if (date) return new Date(date).getTime()
  else return date
}

// 检查数据完整性
const checkIntegrity = ele =>
  !ele.goodsId ||
  (ele.sortId &&
    ele.goodsId &&
    ele.key &&
    (ele.unitPrice || ele.unitPrice === 0) &&
    ele.unit &&
    !isNaN(ele.number) &&
    ele.number !== '' &&
    ele.number !== null &&
    ele.number !== undefined)


import planTable from '@/mixins/planTable.js'


export default {
  name: 'editTable',
  props: [
    'parentItem',
    'sortId',
    'parentIndex',
    'contractNumber',
    'tabsIndex',
    'update',
    'roomVos',
    'roomOptions'
  ],
  mixins: [planTable],
  computed: {
    ...mapGetters({
      providerIdMap: 'providerIdMap',
      roomList: 'roomList',
      tabList: 'tabList'
    }),
    l2SortId() {
      return this.parentItem.pkId
    },
  },
  watch: {
    tabsIndex(val) {
      if (!this.isInit && val === this.parentIndex + 1) {
        this.$nextTick(function() {
          this.getGoodsOpt()
        })
        this.isInit = true
      }
    },
    // 上传数据
    update(val) {
      if (val) {
        if (
          !(
            this.classifyDetail.disposition.every(checkIntegrity) &&
            this.classifyDetail.accessory.every(checkIntegrity)
          )
        ) {
          this.$message.error('请处理无效数据')
          return
        }
        let _f = Object.assign({}, this.parentItem, {
          deployDetailsMap: this.classifyDetail,
          sortId: this.l2SortId
        })
        _f = JSON.parse(JSON.stringify(_f))
        let i = 0,
          len = _f.deployDetailsMap.disposition.length
        for (; i < len; i++) {
          let ele = _f.deployDetailsMap.disposition[i]
          ele.startDate = timeToString(ele.startDate)
          ele.endDate = timeToString(ele.endDate)
        }
        this.$emit('updateForm', _f)
      }
    },
    sortId(val) {
      this.initPage(val)
    }
  },
  methods: {
    // 补充方案初始化
    initAdditionalFn() {
      this.isRefreshTable = true
      this.$nextTick(function() {
        this.getGoodsOpt()
      })
    },
    initPage() {
      if (this.parentItem.sortName === '宽带') {
        this.roomOptions[0].functionType = '客厅01'
        this.classifyDetail.disposition = JSON.parse(
          JSON.stringify(this.roomOptions)
        )
      } else {
        this.classifyDetail.disposition = JSON.parse(
          JSON.stringify(this.roomVos)
        )
      }
      this.initMergrRule1(this.classifyDetail.disposition)
    }
  },
  created() {
    this.initPage()
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
  background-color: hsla(0,87%,69%,.1);
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

