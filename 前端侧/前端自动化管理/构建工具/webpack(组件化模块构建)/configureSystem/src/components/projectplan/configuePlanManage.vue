<template>
	<div id="configuePlanManage">
		<div class="searchfilter col4">
			<ul class="clearfix">
				<li>
					<p class="name">订单编码：</p>
					<div class="inpbox"><input type="text" @keydown.enter="keydownSearch" v-model.trim="orderFilterForm.orderNumber" placeholder="请输入" class="inp" /></div>
				</li>
				<li>
					<p class="name">合同编号：</p>
					<div class="inpbox"><input type="text" @keydown.enter="keydownSearch" v-model.trim="orderFilterForm.contractNumber" placeholder="请输入" class="inp" /></div>
				</li>
				<li>
					<p class="name">房源编号：</p>
					<div class="inpbox"><input type="text" @keydown.enter="keydownSearch" v-model.trim="orderFilterForm.baseNumber" placeholder="请输入" class="inp" /></div>
				</li>
				<li>
					<p class="name">订单类型：</p>
					<div class="inpbox">
						<el-select v-model="orderFilterForm.orderType" placeholder="请选择">
							<el-option v-for="(item,i) in orderTypeOptions" :key="i" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</div>
				</li>
				<li>
					<p class="name">收房产品：</p>
					<div class="inpbox">
						<el-select v-model="orderFilterForm.houseType" placeholder="请选择">
							<el-option v-for="(item,i) in houseTypeOptions" :key="i" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</div>
				</li>
				<li>
					<p class="name">订单管家：</p>
					<div class="inpbox">
						<input @keydown.enter="keydownSearch" type="text" v-model.trim="orderFilterForm.orderSteward" placeholder="请输入">
					</div>
				</li>
				<li>
					<p class="name">订单配置：</p>
					<div class="inpbox">
						<input @keydown.enter="keydownSearch" type="text" v-model.trim="orderFilterForm.orderDeploy" placeholder="请输入">
					</div>
				</li>
				<li>
					<p class="name">产品版本：</p>
					<div class="inpbox">
						<el-select v-model="orderFilterForm.productType" disabled placeholder="请选择">
							<el-option v-for="(item,i) in productThemeOptions" :key="i" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</div>
				</li>
				<li>
					<p class="name">物业地址：</p>
					<div class="inpbox"><input type="text" @keydown.enter="keydownSearch" v-model.trim="orderFilterForm.orderAddress" placeholder="请输入" class="inp" /></div>
				</li>
				<li>
					<p class="name">订单状态：</p>
					<div class="inpbox">
						<el-select v-model="orderFilterForm.orderState" placeholder="请选择">
							<el-option v-for="(item,i) in orderStateOptions" :key="i" :label="item.label" :value="item.value">
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
				<my-pagination :total="planOrdersTotal" :curr="pagination.curr" :pageChange="pageGo"></my-pagination>
			</div>
			<div class="tableBox">
				<table class="tableLoading configuePlanManageLoading modtable" width="100%" border="0" cellpadding="0" cellspacing="0">
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
						<th width="80">所属管家</th>
						<th width="80">量房日期</th>
						<th width="70">相关房间</th>
						<th width="80">所属配置</th>
						<th width="100">操作</th>
					</tr>
					<tbody>
						<no-data :visible="planOrdersTotal"></no-data>
						<tr v-if="planOrdersTotal">
							<td colspan="15">
								<table v-for="(item,index) in proGroup" :key="index" :class="{fortable:true,f12Table:true, 'is-active' : activeId === item.pkId,isInvalidOrder:item.orderState === -1}" width="100%" border="0" cellpadding="0" cellspacing="0">
									<tr class="father">
										<td class="clickbtn" width="40">
											<img @click="showchildren(item.pkId)" v-show="activeId !== item.pkId" src="/static/images/uptable.png" />
											<img @click="showchildren(item.pkId)" v-show="activeId === item.pkId" src="/static/images/downtable.png" />
										</td>
										<td width="120">
											<a class="bfc" @click="orderDetail(item.pkId)" href="javascript:void(0)">{{item.orderNumber}}</a>
										</td>
										<td width="70">{{item.orderTypeName}}</td>
										<td width="100">{{item.orderStateName}}</td>
										<td width="90">{{item.predictPeriod | blank}}</td>
										<td width="70">{{item.actualDay | blank}}</td>
										<td width="150" style="padding-right: 15px;">{{item.orderAddress}}</td>
										<td width="90">{{item.contractNumber}}</td>
										<td width="130">{{item.baseNumber}}</td>
										<td width="80">{{item.houseTypeName}}</td>
										<td width="80">{{item.orderSteward}}</td>
										<td width="80">{{item.houseReserveDate | toDate}}</td>
										<td width="70">{{item.relatedRoom | blank}}</td>
										<td width="80">{{item.orderDeploy}}</td>
										<td width="100">
											<p class="typeControl" v-if="hasPermission('PZ_commitConfigure')">
												<a href="javascript:void(0)" v-if="item.orderType != 1 && item.orderState < 11" class="s-btn" @click="operate('createPlan','create','生成配置方案',item)">
													<i></i>生成配置方案</a>
											</p>
										</td>
									</tr>
									<tr class="children">
										<td colspan="15">
											<div class="subDiv">
												<table class="subTable" width="100%" border="0" cellpadding="0" cellspacing="0">
													<tr>
														<th width="80">序号</th>
														<th width="250">配置方案编号</th>
														<th>配置类型</th>
														<th>审批状态</th>
														<th>提交时间</th>
														<th>当前审批人</th>
														<th>最后审批时间</th>
														<th width="200">操作</th>
													</tr>
													<tr v-if="!update && (planGroup[item.pkId] == null || planGroup[item.pkId].length == 0)">
														<td style="height: 80px; text-align: center;" colspan="9">该订单尚未生成配置方案</td>
													</tr>
													<tr v-else v-for="(supp,index) in planGroup[item.pkId]" :key="index">
														<td>{{index+1}}</td>
														<td>
															<a style="color: #3ba0ff;" href="javascript:void(0)" @click="operate('createPlan','view','查看配置方案',supp)">
																{{supp.deployNumber}}</a>
														</td>
														<td>{{supp.deployTypeName}}</td>
														<td>{{supp.approveState}}</td>
														<td>{{supp.submitTime | toTime}}</td>
														<td>{{supp.approveMan && supp.approveMan.split(',')[0] | blank}}</td>
														<td>{{supp.endTime | toTime}}</td>
														<td>
															<p class="typeControl" v-if="supp.state == 0 || supp.state == 2">
																<a class="e-btn mgr" v-if="hasPermission('PZ_eidtConfigure')"  @click="operate('createPlan','edit','编辑配置方案',supp)">
																	<i></i>编辑</a>
																<a v-if="supp.deployType == 0 && hasPermission('PZ_commitConfigureBtn')" class="j-btn mgr" @click="operPlan(item.pkId, supp.pkId, 0)">
																	<i></i>提交</a>
																<a v-if="supp.deployType != 0 && hasPermission('PZ_commitCheckConfigure')" class="j-btn mgr" @click="operPlan(item.pkId, supp.pkId, 1)">
																	<i></i>提交审核</a>
																<a class="z-btn" v-if="hasPermission('PZ_cancelConfigure')" @click="operPlan(item.pkId, supp.pkId, 2)">
																	<i></i>作废</a>
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
				<el-pagination @current-change="pageGo" :current-page="pagination.curr" layout="prev, pager, next" :total="planOrdersTotal"></el-pagination>
			</div>
		</div>
		<!--数据列表 end-->

	</div>
</template>
<script type="text/javascript">
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapActions } = createNamespacedHelpers(
  'projectplan/configuePlanManage'
)
import { getOrdersPlan, operOrdersPlan } from '../../api/projectplan'

import {
  orderTypeOptions,
  houseTypeOptions,
  orderStateOptions,
  ALL
} from '../public/options.config'
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
  name: 'configuePlanManage',
  data() {
    return {
      update: false, //重新渲染值
      orderFilterForm: { ...initOrderFilterForm },
      //订单类型选项
      orderTypeOptions: [ALL, ...orderTypeOptions],
      //收房产品选项
      houseTypeOptions: [ALL, ...houseTypeOptions],
      productThemeOptions: [
        //产品版本选项
        {
          value: 'jr1',
          label: '江寓产品V1.0'
        }
      ],
      formSend: {},

      orderStateOptions: [ALL, ...orderStateOptions],
      planGroup: {}, //配置方案数据数组
      pagination: {
        curr: 1, //当前索引
        pageSize: 10 //每页显示条数
      },
      activeId: ''
    }
  },
  computed: {
    ...mapGetters({
      proGroup: 'planOrders',
      planOrdersTotal: 'planOrdersTotal'
    })
  },
  methods: {
    ...mapActions({
      getPlanOrders: 'getPlanOrders'
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
      this.getPlanOrders({
        ...this.formSend,
        limit: this.pagination.pageSize,
        pageNum: this.pagination.curr,
        isSearch
      })
    },
    //查询页面(完成)
    searchData: debounce(function() {
      this.formSend = JSON.parse(JSON.stringify(this.orderFilterForm))
      this.pagination.curr = 1
      this.getproGroupData(true)
    }, 300),
    //重置查询条件(完成)
    reset: debounce(function() {
      this.orderFilterForm = { ...initOrderFilterForm }
      this.formSend = JSON.parse(JSON.stringify(this.orderFilterForm))
      this.pagination.curr = 1
      this.getproGroupData() //重新查询一次所有数据
    }, 300),
    //点击父级，显示子集表格数据
    showchildren(id) {
      if (this.activeId === id) {
        this.activeId = ''
        return
      } else {
        this.activeId = id
      }

      // if (this.planGroup[id] && this.planGroup[id].length !== 0) return;

      this.update = true
      this.getChildren(id)
    },
    getChildren(id) {
      getOrdersPlan(id, data => {
        this.$set(this.planGroup, id, data)
      }).then(() => {
        this.update = false
      })
    },
    operPlan(orderId, planId, type) {
      if (type === 3) {
      }
      const mess = {
        0: ['提交方案', '确定提交标准配置方案？'],
        1: ['提交方案', '确定提交审批补充配置方案？'],
        2: ['作废方案', '确定作废该方案？']
      }
      this.$confirm(mess[type][1], mess[type][0], {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          operOrdersPlan(
            type === 0 ? 1 : type,
            planId,
            () => {
              this.$message.success('操作成功！')
							this.getChildren(orderId)
							if(type === 2) this.getproGroupData()
            },
            e => this.$message.error('操作失败！')
          )
        })
        .catch(() => {})
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
    operate(componentId, operateType, componentName, item) {
      let type, needStandard
      if (operateType === 'create') {
        type = item.orderStateName === '待生成配置方案' ? 0 : 1
      } else {
        type = item.deployTypeName.indexOf('标准') > -1 ? 0 : 1
      }
      if (item.orderState === 2 && item.orderType === 0) {
        needStandard = true
      }
      this.pageChange(componentName, componentId, {
        oper: operateType,
        type,
        id: item.pkId,
        needStandard
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