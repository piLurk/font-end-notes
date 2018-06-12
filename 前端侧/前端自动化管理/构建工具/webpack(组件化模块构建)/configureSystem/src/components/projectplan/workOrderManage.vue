<template>
	<div id="configuePlanManage">
		<div class="searchfilter col4">
			<ul class="clearfix">
				<li>
					<p class="name">订单编码：</p>
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
							<el-option v-for="item in orderTypeOptions" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</div>
				</li>
				<li>
					<p class="name">收房产品：</p>
					<div class="inpbox">
						<el-select v-model="filterForm.houseType" placeholder="请选择">
							<el-option v-for="item in houseTypeOptions" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</div>
				</li>
				<li>
					<p class="name">订单管家：</p>
					<div class="inpbox">
						<input @keydown.enter="keydownSearch" type="text" v-model.trim="filterForm.orderSteward" placeholder="请输入">
					</div>
				</li>
				<li>
					<p class="name">订单配置：</p>
					<div class="inpbox">
						<input @keydown.enter="keydownSearch" type="text" v-model.trim="filterForm.orderDeploy" placeholder="请输入">
					</div>
				</li>
				<li>
					<p class="name">产品版本：</p>
					<div class="inpbox">
						<el-select v-model="filterForm.productType" disabled placeholder="请选择">
							<el-option v-for="item in productThemeOptions" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</div>
				</li>
				<li>
					<p class="name">物业地址：</p>
					<div class="inpbox"><input type="text" @keydown.enter="keydownSearch" v-model.trim="filterForm.orderAddress" placeholder="请输入" class="inp" /></div>
				</li>
				<li>
					<p class="name">订单状态：</p>
					<div class="inpbox">
						<el-select v-model="filterForm.orderState" placeholder="请选择">
							<el-option v-for="item in orderStateOptions" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
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
				<my-pagination :total="workOrdersTotal" :curr="pagination.curr" :pageChange="pageGo"></my-pagination>
			</div>
			<div class="tableBox">
				<table class="modtable tableLoading workOrderManageLoading" width="100%" border="0" cellpadding="0" cellspacing="0">
					<tr>
						<th width="40"></th>
						<th width="120">订单编号</th>
						<th width="70">订单类型</th>
						<th width="100">订单状态</th>
						<th width="90">预计配置周期</th>
						<th width="70">实际工期</th>
						<th width="150" style="padding-right: 15px;">物业地址</th>
						<th width="90">合同编号</th>
						<th width="130">房源编号</th>
						<th width="80">房屋产品</th>
						<th width="200">配置方案编号</th>
						<th width="100">配置方案类型</th>
						<th width="100">操作</th>
					</tr>
					<tbody>
						<no-data :visible="workOrdersTotal"></no-data>
						<tr v-if="workOrdersTotal">
							<td colspan="15">
								<table v-for="(item,index) in proGroup" :key="index" class="fortable f12Table" :class="{'is-active' : activeId === item.deployId,isInvalidOrder:item.orderState === -1}" width="100%" border="0" cellpadding="0" cellspacing="0">
									<tr class="father">
										<td class="clickbtn" width="40">
											<img @click="showchildren(item.deployId, item)" v-show="activeId !== item.deployId" src="/static/images/uptable.png" />
											<img @click="showchildren(item.deployId, item)" v-show="activeId === item.deployId" src="/static/images/downtable.png" />
										</td>
										<td width="120">
											<a class="bfc" @click="orderDetail(item.pkId)" href="javascript:void(0)">{{item.orderNumber}}</a>
										</td>
										<td width="70">{{item.orderTypeName}}</td>
										<td width="100">{{item.orderStateName}}</td>
										<td width="90">{{item.predictPeriod || '---'}}</td>
										<td width="70">{{item.orderPeriod}}</td>
										<td width="150" style="padding-right: 15px;">{{item.orderAddress}}</td>
										<td width="90">{{item.contractNumber}}</td>
										<td width="130">{{item.baseNumber}}</td>
										<td width="80">{{item.houseTypeName}}</td>
										<td width="200">
											<a class="bfc" @click="viewConfPlan(item.deployId, item.deployTypeName)">{{item.deployNumber}}</a>
										</td>
										<td width="100">{{item.deployTypeName}}</td>
										<td width="100">
											<p class="typeControl">
												<a v-if="item.deployState==3 && hasPermission('PZ_getOrdersAllot')" class="l-btn" @click="goPlan('view','查看施工计划', item)">
													<i></i>查看施工计划</a>
												<a v-if="item.deployState!==-1 && item.deployState!==3 && hasPermission('PZ_createSort')" class="w-btn" @click="goPlan('create','制定施工计划', item)">
													<i></i>制定施工计划</a>
											</p>
										</td>
									</tr>
									<tr class="children">
										<td colspan="15">
											<div class="subDiv">
												<table class="subTable" width="100%" border="0" cellpadding="0" cellspacing="0">
													<tr>
														<th width="40">&nbsp;&nbsp;</th>
														<th width="80">序号</th>
														<th width="320">派工单编号</th>
														<th>供应商类别</th>
														<th>供应商名称</th>
														<th>指定到达时间</th>
														<th>发送时间</th>
														<th>发送结果</th>
														<th width="250">操作</th>
													</tr>
													<tr v-if="!update && (planGroup[item.deployId] == null || planGroup[item.deployId].length == 0)">
														<td style="height: 80px; text-align: center;" colspan="9">该订单尚未生成施工计划</td>
													</tr>
													<tr v-else v-for="(work,index) in planGroup[item.deployId]" :key="index">
														<td>&nbsp;&nbsp;</td>
														<td>{{index+1}}</td>
														<td>
															<a v-if="hasPermission('PZ_getOrdersAllot')" style="color: #3ba0ff;" href="javascript:void(0)" @click="goPlan('view','查看施工计划',item,work)">
																{{work.allotNumber}}</a>
														</td>
														<td>{{work.providerType}}</td>
														<td>{{work.providerName}}</td>
														<td>{{work.allotDate | toTime00}}</td>
														<td>{{work.sendDate | toTime}}</td>
														<td>{{workOrderState[work.state]}}</td>
														<td>
															<!-- TODO: 自动派单已注释 -->
															<p class="typeControl" v-if="(work.state < 2 || work.state === 4)">
																<a v-if="hasPermission('PZ_cancelSort')" class="e-btn mgr" @click="goPlan('edit','修改施工计划', item, work)">
																	<i></i>修改施工计划</a>
																<a v-if="hasPermission('PZ_sendOrderBtn')" class="j-btn mgr" @click="operWorkOrder(work, work.pkId, item.deployId, 'open')">
																	<i></i>派单</a>
																<!-- <a v-if="work.state === 1" class="j-btn mgr" @click="operWorkOrder(work, work.pkId, item.deployId, 'stop')">
																	<i></i>取消派单</a> -->
															</p>
														</td>
													</tr>
												</table>
											</div>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</tbody>

				</table>
			</div>
			<div class="footPages">
				<el-pagination @current-change="pageGo" :current-page="pagination.curr" layout="prev, pager, next" :total="workOrdersTotal"></el-pagination>
			</div>
		</div>
		<!--数据列表 end-->

	</div>
</template>
<script type="text/javascript">
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapActions } = createNamespacedHelpers('projectplan/workOrderManage')
import { getWorkOrders, operOrdersState } from '../../api/projectplan'
import { orderTypeOptions, houseTypeOptions, orderStateOptions, workOrderState, ALL } from '../public/options.config'
import debounce from 'lodash/debounce'
import permission from '@/mixins/permission.js'

const initOrderFilterForm = {
  orderNumber: '', //订单编码
  contractNumber: '', //合同编号
  baseNumber: '', //房源编号
  houseType: '', //收房产品
  orderType: '', //订单类型
  productType: 'jr1',
  orderAddress: '', //物业地址
  orderState: '', //订单状态
	orderSteward:'', //订单管家
	orderDeploy:'', //订单配置
}

export default {
  name: 'workOrderManage',
  data() {
    return {
      update: false, //重新渲染值
      filterForm: { ...initOrderFilterForm },
      //订单类型选项
      orderTypeOptions: [ALL, ...orderTypeOptions],
      //收房产品选项
      houseTypeOptions: [ALL, ...houseTypeOptions],
      productThemeOptions: [
        //产品版本选项
        { value: 'jr1', label: '江寓产品V1.0' }
      ],
      // 派工单状态
      workOrderState: { ...workOrderState },
      orderStateOptions: [ALL, ...orderStateOptions],
      planGroup: {}, //施工计划数据数组
      pagination: {
        curr: 1, //当前索引
        pageSize: 10 //每页显示条数
      },
      formSend: {},
      activeId: ''
    }
  },
  computed: {
    ...mapGetters({
      proGroup: 'workOrders',
      workOrdersTotal: 'workOrdersTotal'
    })
  },
  methods: {
    ...mapActions({
      getOrdersByWork: 'getOrdersByWork'
    }),
    orderDetail(pkId) {
      this.$store.dispatch('itemArrAdd', {
        name: '订单详情',
        id: 'orderDetail',
        params: { pkId: pkId }
      })
    },
    //获取数据(完成)
    getproGroupData(isSearch) {
      this.getOrdersByWork({
        ...this.formSend,
        limit: this.pagination.pageSize,
        pageNum: this.pagination.curr,
        isSearch
      })
    },
    //查询页面(完成)
    searchData: debounce(function() {
      this.pagination.curr = 1
      this.formSend = JSON.parse(JSON.stringify(this.filterForm))
      this.getproGroupData(true)
    }, 300),
    //重置查询条件(完成)
    reset: debounce(function() {
      this.filterForm = { ...initOrderFilterForm }
      this.formSend = JSON.parse(JSON.stringify(this.filterForm))
      this.getproGroupData() //重新查询一次所有数据
    }, 300),
    //点击父级，显示子集表格数据
    showchildren(id, item) {
      if (this.activeId === id) {
        this.activeId = ''
        return
      } else {
        this.activeId = id
      }
      const deployId = item.deployId
      // if (this.planGroup[deployId] && this.planGroup[deployId].length !== 0)
      //   return;

      this.update = true
      this.getChildren(item.deployId)
    },
    getChildren(deployId) {
      getWorkOrders(deployId, data => {
        this.$set(this.planGroup, deployId, data)
      }).then(() => {
        this.update = false
      })
    },
    viewConfPlan(id, name) {
      const type = name.indexOf('标准') > -1 ? 0 : 1
      this.$store.dispatch('itemArrAdd', {
        id: 'createPlan',
        name: '配置方案详情',
        params: {
          oper: 'view',
          type,
          id: id
        }
      })
    },
    operWorkOrder(work, planId, deployId, type) {
      work.state = 9
      operOrdersState(
        type,
        planId,
        () => {
          work.state = 3
          this.$message.success('操作成功')
          this.getChildren(deployId)
        },
        e => this.$message.error('操作失败')
      ).finally(() => {
        if (work.state === 9) {
          work.state = 4
        }
      })
    },
    //分页请求数据
    pageGo(val) {
      if (this.pagination.curr === val) {
        return
      }
      this.activeId = ''
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
    goPlan(operateType, componentName, item, work) {
      this.$store.commit('projectplan/plan/RECEIVE_ORDER_INFO', item)
      this.pageChange(componentName, 'plan', {
        oper: operateType,
        id: item.pkId,
        workOrdersId: work ? work.pkId : ''
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
      this.activeId && this.getChildren(this.activeId)
      this.updateId = updateId
    }
  }
}
</script>


<style type="text/css" scoped>

</style>