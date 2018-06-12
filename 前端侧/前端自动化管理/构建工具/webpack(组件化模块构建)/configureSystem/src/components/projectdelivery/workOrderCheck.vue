<template>
	<div id="workOrderCheck">
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
					<p class="name">订单管家：</p>
					<div class="inpbox"><input type="text" @keydown.enter="keydownSearch" v-model.trim="filterForm.orderSteward" placeholder="请输入" class="inp" /></div>
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
				<table class="modtable tableLoading workOrderCheckLoading" width="100%" border="0" cellpadding="0" cellspacing="0">
					<tr>
						<th width="40"></th>
						<th width="120">订单编号</th>
						<th width="80">订单类型</th>
						<th width="80">订单状态</th>
						<th width="200" style="padding-right: 15px;">物业地址</th>
						<th width="90">合同编号</th>
						<th width="130">房源编号</th>
						<th width="80">收房产品</th>
						<th width="80">相关房间</th>
						<th width="80">订单管家</th>
						<th width="80">订单配置</th>
					</tr>
					<tbody>
						<no-data :visible="proTotal"></no-data>
						<tr v-if="proTotal">
							<td colspan="15" style="padding-left: 0;">
								<table v-for="(item,index) in proGroup" :key="index" class="fortable f12Table" :class="{'is-active' : activeId === item.pkId,isInvalidOrder:item.orderState === -1}" width="100%" border="0" cellpadding="0" cellspacing="0">
									<tr class="father">
										<td class="clickbtn" width="40">
											<img @click="showchildren(item.pkId, item)" v-show="activeId !== item.pkId" src="/static/images/uptable.png" />
											<img @click="showchildren(item.pkId, item)" v-show="activeId === item.pkId" src="/static/images/downtable.png" />
										</td>
										<td width="120">
											<a class="bfc" @click="orderDetail(item.pkId)" href="javascript:void(0)">{{item.orderNumber}}</a>
										</td>
										<td width="80">{{item.orderTypeName}}</td>
										<td width="80">{{item.orderStateName}}</td>
										<td width="200" style="padding-right: 15px;">{{item.orderAddress}}</td>
										<td width="90">{{item.contractNumber}}</td>
										<td width="130">{{item.baseNumber}}</td>
										<td width="80">{{item.houseTypeName}}</td>
										<td width="80">{{item.relatedRoom}}</td>
										<td width="80">{{item.orderSteward}}</td>
										<td width="80">{{item.orderDeploy}}</td>
									</tr>
									<tr class="children">
										<td colspan="15">
											<div class="subDiv">
												<table class="subTable" width="100%" border="0" cellpadding="0" cellspacing="0">
													<tr>
														<th width="40">&nbsp;&nbsp;</th>
														<th width="80">序号</th>
														<th width="320">派工单编号</th>
														<th>供应商名称</th>
														<th>供应商类别</th>
														<th>配置方案类型</th>
														<th>发送日期</th>
														<th>验收日期</th>
														<th width="100">操作</th>
													</tr>
													<tr v-if="!update && (planGroup[item.pkId] == null || planGroup[item.pkId].length == 0)">
														<td style="height: 80px;text-align: center;" colspan="9">该订单尚未生成派工单</td>
													</tr>
													<tr v-else v-for="(work,index) in planGroup[item.pkId]" :key="index">
														<td>&nbsp;&nbsp;</td>
														<td>{{index+1}}</td>
														<td>{{work.allotNumber}}</td>
														<td>{{work.providerName}}</td>
														<td>{{work.providerType}}</td>
														<td>{{work.deployType}}</td>
														<td>{{work.sendDate | toDate}}</td>
														<td>{{work.checkDate | toDate}}</td>
														<td>
															<p class="typeControl">
																<a v-if="(work.state === 2|| work.state === 3)&& hasPermission('PZ_supplyallot')" class="j-btn" @click="supplementary(work)">
																	<i></i>补派单</a>
																<a v-if="work.state === 3 && hasPermission('PZ_allotCheck')" class="l-btn" @click="operate('checkorder','view','派工单查看',work)">
																	<i></i>查看</a>
																<a v-if="work.state === 3 && [6,7,8,9].indexOf(item.orderState) > -1 && hasPermission('PZ_editAllot')" class="w-btn" @click="operate('checkorder','edit','派工单编辑',work)">
																	<i></i>编辑</a>
																<a v-if="work.state === 2 && hasPermission('PZ_saveAllot')" class="j-btn" @click="operate('checkorder','check','派工单验收',work)">
																	<i></i>验收</a>
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
				<el-pagination @current-change="pageGo" :current-page="pagination.curr" layout="prev, pager, next" :total="proTotal"></el-pagination>
			</div>
		</div>
		<!--数据列表 end-->

	</div>
</template>
<script type="text/javascript">
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("projectdelivery");
import { getWorkOrders, supplyallot } from "../../api/projectdelivery";
import {
  orderTypeOptions,
  houseTypeOptions,
  orderStateOptions,
  workOrderState,
  ALL
} from "../public/options.config";
import debounce from "lodash/debounce";
import permission from "@/mixins/permission.js";

const initOrderFilterForm = {
  orderNumber: "", //订单编码
  contractNumber: "", //合同编号
  baseNumber: "", //房源编号
  houseType: "", //收房产品
  orderType: "", //订单类型
  orderSteward: "", //订单管家
  orderDeploy: "", //行政专员
  orderState: "" //订单状态
};

export default {
  name: "workOrderCheck",
  data() {
    return {
      update: false, //重新渲染值
      filterForm: { ...initOrderFilterForm },
      //订单类型选项
      orderTypeOptions: [ALL, ...orderTypeOptions],
      //收房产品选项
      houseTypeOptions: [ALL, ...houseTypeOptions],
      // 派工单状态
      workOrderState: [ALL, ...workOrderState],
      orderStateOptions: [ALL, ...orderStateOptions],
      planGroup: {}, //施工计划数据数组
      pagination: {
        curr: 1, //当前索引
        pageSize: 10 //每页显示条数
      },
      formSend: {},
      activeId: ""
    };
  },
  computed: {
    ...mapGetters({
      proGroup: "orders1",
      proTotal: "ordersTotal1"
    })
  },
  methods: {
    ...mapActions({
      getOrders: "getOrders1"
    }),
    orderDetail(pkId) {
      this.$store.dispatch("itemArrAdd", {
        name: "订单详情",
        id: "orderDetail",
        params: { pkId: pkId }
      });
    },
    //获取数据(完成)
    getproGroupData(_isSearch) {
      this.getOrders({
        ...this.formSend,
        limit: this.pagination.pageSize,
        pageNum: this.pagination.curr,
        _isSearch
      });
    },
    //查询页面(完成)
    searchData: debounce(function() {
      this.pagination.curr = 1;
      this.formSend = JSON.parse(JSON.stringify(this.filterForm));
      this.getproGroupData(true);
    }, 300),
    //重置查询条件(完成)
    reset: debounce(function() {
      this.filterForm = { ...initOrderFilterForm };
      this.formSend = JSON.parse(JSON.stringify(this.filterForm));
      this.pagination.curr = 1;
      this.getproGroupData(); //重新查询一次所有数据
    }, 300),
    //点击父级，显示子集表格数据
    showchildren(pkId, item) {
      if (this.activeId === pkId) {
        this.activeId = "";
        return;
      } else {
        this.activeId = pkId;
      }

      // if (this.planGroup[pkId] && this.planGroup[pkId].length !== 0) return;

      this.update = true;
      this.getChildren(pkId);
    },
    getChildren(id) {
      getWorkOrders(id, data => {
        this.$set(this.planGroup, id, data);
      }).then(() => {
        this.update = false;
      });
    },
    //分页请求数据
    pageGo(val) {
      if (this.pagination.curr === val) {
        return;
      }
      this.activeId = "";
      this.pagination.curr = val;
      this.getproGroupData();
    },
    pageChange(componentName, componentId, data) {
      this.$store.dispatch("itemArrAdd", {
        id: componentId,
        name: componentName,
        params: data
      });
    },
    operate(id, operateType, name, item) {
      this.$store.commit("projectplan/plan/RECEIVE_ORDER_INFO", item);
      this.pageChange(name, id, {
        oper: operateType,
        id: item.pkId
      });
    },
    keydownSearch() {
      this.searchData();
    },
    //补派单
    supplementary(item) {
      let loading = this.$loading({ fullscreen: true, text: "提交中" });
      supplyallot(
        item.pkId,
        () => {
          loading.close();
          this.$message({
            message: "补派单成功",
            type: "success"
          });
        },
        () => {
          loading.close();
          this.$message.error("补派单失败");
        }
      );
    }
  },
  mixins: [permission],
  activated: function() {
    const updateId = this.$route.params.updateId || "updateTab";
    if (this.updateId !== updateId) {
      this.getproGroupData();
      this.activeId && this.getChildren(this.activeId);
      this.updateId = updateId;
    }
  }
};
</script>
