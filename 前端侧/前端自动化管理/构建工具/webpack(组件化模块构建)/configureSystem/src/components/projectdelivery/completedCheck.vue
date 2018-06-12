<template>
	<div id="completedCheck">
		<div class="searchfilter col4">
			<ul class="clearfix">
				<li>
					<p class="name">订单编号：</p>
					<div class="inpbox"><input type="text" @keydown.enter="keydownSearch" v-model.trim="filterForm.orderNumber" placeholder="请输入" class="inp" /></div>
				</li>
				<li>
					<p class="name">合同编号：</p>
					<div class="inpbox"><input type="text" @keydown.enter="keydownSearch" v-model.trim="filterForm.contractNumber" placeholder="请输入" class="inp" /></div>
				</li>
				<li>
					<p class="name">房源编号：</p>
					<div class="inpbox"><input type="text" @keydown.enter="keydownSearch" v-model.trim="filterForm.baseNumber" placeholder="请输入" class="inp" /></div>
				</li>
				<li>
					<p class="name">订单类型：</p>
					<div class="inpbox">
						<el-select v-model="filterForm.orderType" placeholder="请选择">
							<el-option v-for="(item,i) in orderTypeOptions" :key="i" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</div>
				</li>
				<li>
					<p class="name">收房产品：</p>
					<div class="inpbox">
						<el-select v-model="filterForm.houseType" placeholder="请选择">
							<el-option v-for="(item,i) in houseTypeOptions" :key="i" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</div>
				</li>
				<li>
					<p class="name">订单配置：</p>
					<div class="inpbox"><input type="text" @keydown.enter="keydownSearch" v-model.trim="filterForm.orderDeploy" placeholder="请输入" class="inp" /></div>
				</li>
				<li>
					<p class="name">订单状态：</p>
					<div class="inpbox">
						<el-select v-model="filterForm.orderState" placeholder="请选择">
							<el-option v-for="(item,i) in orderStateOptions" :key="i" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</div>
				</li>
				<li class="label140" style="width:48%;">
					<p class="name">提交竣工验收日期：</p>
					<div class="inpbox">
						<el-date-picker v-model="filterForm.submitComplete" type="daterange" placeholder="选择日期范围"></el-date-picker>
					</div>
				</li>
				<li class="label140" style="width:48%;">
					<p class="name">竣工验收日期：</p>
					<div class="inpbox">
						<el-date-picker v-model="filterForm.standardDate" type="daterange" placeholder="选择日期范围"></el-date-picker>
					</div>
				</li>
				<li class="btnbox singlerow">
					<input type="button" class="surebtn" @click="searchData" value="查询" />
					<input type="button" class="surebtn surereset" @click="reset" value="重置" />
				</li>
			</ul>
		</div>

		<!--数据列表 begin-->
		<div class="dataBox">
			<div class="toolBar clearfix">
				<my-pagination :total="proTotal" :curr="pagination.curr" :pageChange="pageGo"></my-pagination>
			</div>
			<div class="tableBox">
				<table class="modtable tableLoading completedCheckLoading" width="100%" border="0" cellpadding="0" cellspacing="0">
					<tr>
						<th width="160">订单编号</th>
						<th width="70">订单类型</th>
						<th width="100">订单状态</th>
						<th width="100">合同编号</th>
						<th width="300">物业地址</th>
						<th width="150">房源编号</th>
						<th width="100">收房产品</th>
						<th width="100">量房日期</th>
						<th width="120">竣工申请日期</th>
						<th width="120">实际竣工日期</th>
						<th width="100">相关房间</th>
						<th width="100">订单配置</th>
						<th width="60">操作</th>
					</tr>
					<tbody>
						<no-data :visible="proTotal"></no-data>
						<tr v-for="(item,index) in proGroup" :key="item.pkId" :class="{isInvalidOrder:item.orderState === -1}">
							<td>
								<a @click="orderDetail(item.pkId)" href="javascript:void(0)" class="bfc">{{item.orderNumber}}</a>
							</td>
							<td>{{item.orderTypeName}}</td>
							<td>{{item.orderStateName}}</td>
							<td>{{item.contractNumber}}</td>
							<td>{{item.orderAddress}}</td>
							<td>{{item.baseNumber}}</td>
							<td>{{item.houseTypeName}}</td>
							<td>{{item.houseDate | toDate}}</td>
							<td>{{item.submitComplete | toDate}}</td>
							<td>{{item.standardDate | toDate}}</td>
							<td>{{item.relatedRoom}}</td>
							<td>{{item.orderDeploy}}</td>
							<td>
								<p class="typeControl">
									<a v-if="(item.orderState === 9 || item.orderState === 10) && hasPermission('PZ_operate')" class="j-btn" @click="operate('completedCheckDetail','check','竣工验收',item)">
										<i></i>验收</a>
									<a v-if="item.orderState > 10 && hasPermission('PZ_queryCompletionByOrder')" class="l-btn" @click="operate('completedCheckDetail','view','竣工验收查看',item)">
										<i></i>查看</a>
								</p>
							</td>
						</tr>
					</tbody>

				</table>
			</div>
			<div class="footPages">
				<el-pagination @current-change="pageGo" :current-page="pagination.curr" layout="prev, pager, next" :total="proTotal"></el-pagination>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapActions } = createNamespacedHelpers('projectdelivery')
import debounce from 'lodash/debounce'
import { orderTypeOptions, houseTypeOptions, orderStateOptions, workOrderState, ALL } from '../public/options.config'
import permission from '@/mixins/permission.js'

const initOrderFilterForm = () => ({
  orderNumber: '', //订单编码
  contractNumber: '', //合同编号
  baseNumber: '', //房源编号
  orderType: '', //订单类型
  houseType: '', //收房产品
  orderDeploy: '', //配置
	orderState: '', //订单状态
	submitComplete: ['', ''], // 提交竣工日期
	standardDate: ['', ''] // 竣工验收日期
})

const date2TimeStr = date => date ? (new Date(date).getTime() + '') : ''

export default {
  name: 'completedCheck',
  data() {
    return {
      filterForm: initOrderFilterForm(),
      //订单类型选项
      orderTypeOptions: [ALL, ...orderTypeOptions],
      //收房产品选项
      houseTypeOptions: [ALL, ...houseTypeOptions],
      // 派工单状态
      workOrderState: [ALL, ...workOrderState],
      orderStateOptions: [ALL, ...orderStateOptions],
      pagination: {
        curr: 1, //当前索引
        pageSize: 10 //每页显示条数
      },
      formSend: {}
    }
  },
  computed: {
    ...mapGetters({
      proGroup: 'orders3',
      proTotal: 'ordersTotal3'
    })
  },
  methods: {
    ...mapActions({
      getOrders: 'getOrders3'
    }),
    orderDetail(pkId) {
      this.$store.dispatch('itemArrAdd', {
        name: '订单详情',
        id: 'orderDetail',
        params: { pkId: pkId }
      })
    },
    //获取数据(完成)
    getproGroupData(_isSearch) {
      this.getOrders({
        ...this.formSend,
        limit: this.pagination.pageSize,
        pageNum: this.pagination.curr,
        _isSearch
      })
    },
    //查询页面(完成)
    searchData: debounce(function() {
      this.pagination.curr = 1
			this.formSend = JSON.parse(JSON.stringify(this.filterForm))
			this.formSend.submitComplete = this.filterForm.submitComplete.map(date2TimeStr)
			this.formSend.standardDate = this.filterForm.standardDate.map(date2TimeStr)
      this.getproGroupData(true)
    }, 300),
    //重置查询条件(完成)
    reset: debounce(function() {
      this.filterForm = initOrderFilterForm()
      this.pagination.curr = 1
      this.formSend = JSON.parse(JSON.stringify(this.filterForm))
      this.getproGroupData() //重新查询一次所有数据
    }, 300),
    //分页请求数据
    pageGo(val) {
      this.pagination.curr = val
      this.getproGroupData()
    },
    pageChange(componentName, componentId, data) {
      this.$store.dispatch('itemArrAdd', {
        id: componentId,
        name: componentName,
        params: data
      })
    },
    // 'completedCheckDetail','view','竣工验收查看',item
    operate(componentId, oper, componentName, item) {
      this.pageChange(componentName, componentId, {
        oper,
        id: item.pkId
      })
    },
    keydownSearch() {
      this.searchData()
    }
  },
	mixins:[permission],
  activated: function() {
    const updateId = this.$route.params.updateId || 'updateTab'
    if (this.updateId !== updateId) {
      this.getproGroupData()
      this.updateId = updateId
    }
  }
}
</script>


<style type="text/css" scoped>

</style>