<template>
	<div id="approvalConfiguration">
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
							<el-option v-for="item in orderTypeOptions" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</div>
				</li>
				<li>
					<p class="name">收房产品：</p>
					<div class="inpbox">
						<el-select v-model="orderFilterForm.houseType" placeholder="请选择">
							<el-option v-for="item in houseTypeOptions" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</div>
				</li>
				<li>
					<p class="name">产品版本：</p>
					<div class="inpbox">
						<el-select v-model="orderFilterForm.productType" disabled placeholder="请选择">
							<el-option v-for="item in productThemeOptions" :key="item.value" :label="item.label" :value="item.value">
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
				<my-pagination :total="providerTotal" :curr="pagination.curr" :pageChange="pageGo"></my-pagination>
			</div>
			<div class="tableBox">
				<table class="modtable tableLoading approvalConfigurationLoading" width="100%" border="0" cellpadding="0" cellspacing="0">
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
						<th width="80">所属配置</th>
					</tr>
					<tbody>
						<no-data :visible="providerTotal"></no-data>
						<tr v-if="providerTotal">
							<td colspan="13">
								<table v-for="(item,index) in proGroup" :key="index" class="fortable" width="100%" border="0" cellpadding="0" cellspacing="0" :class="{ 'is-active' : activeId === item.pkId,isInvalidOrder:item.orderState === -1 }">
									<tr class="father">
										<td class="clickbtn" width="40">
											<img @click="showchildren(item)" v-show="activeId !== item.pkId" src="/static/images/uptable.png" />
											<img @click="showchildren(item)" v-show="activeId === item.pkId" src="/static/images/downtable.png" />
										</td>
										<td width="120">
											<a class="bfc" @click="orderDetail(item.pkId)" href="javascript:void(0)">{{item.orderNumber}}</a>
										</td>
										<td width="70">{{item.orderTypeName}}</td>
										<td width="100">{{item.orderStateName}}</td>
										<td width="90">{{item.predictPeriod}}</td>
										<td width="70">{{item.actualDay}}</td>
										<td width="150" style="padding-right: 15px;">{{item.orderAddress}}</td>
										<td width="90">{{item.contractNumber}}</td>
										<td width="130">{{item.baseNumber}}</td>
										<td width="80">{{item.houseTypeName}}</td>
										<td width="80">{{item.orderSteward}}</td>
										<td width="80">{{item.orderDeploy}}</td>
									</tr>
									<tr class="children">
										<td colspan="13">
											<div class="subDiv">
												<table class="subTable" width="100%" border="0" cellpadding="0" cellspacing="0">
													<tr>
														<th width="60">&nbsp;&nbsp;</th>
														<th width="15%">配置方案编号</th>
														<th width="15%">配置类型</th>
														<th>提交时间</th>
														<th>当前审批人</th>
														<th>最后审批时间</th>
														<th width="200">操作</th>
													</tr>
													<tr v-if="!update && (subproGroup == null || subproGroup.length == 0)">
														<td style="height: 80px;" colspan="7">暂无数据</td>
													</tr>
													<tr v-for="(supp,index2) in subproGroup" :key="index2">
														<td width="60">{{index2+1}}</td>
														<td width="15%">
															<a style="color: #3ba0ff;" href="javascript:void(0)" @click="operate('createPlan','view','查看配置方案',supp)">{{supp.deployNumber}}</a>
														</td>
														<td width="15%">{{supp.deployTypeName}}</td>
														<td>{{supp.submitTime | toTime}}</td>
														<td>{{supp.approveMan && supp.approveMan.split(',')[0]}}</td>
														<td>{{supp.endTime | toTime}}</td>
														<td>
															<p class="typeControl" v-if="supp.state !=0 ">
																<a v-if="hasPermission('PZ_queryApproval')" href="javascript:void(0)" @click="viewApprovalRecord(supp)" class="l-btn mgr">
																	<i></i>查看审批记录</a>
																<a v-if="supp.state < 3 && hasPermission('PZ_Approval')" href="javascript:void(0)" @click="approveMyplan('approvePlan','审批配置方案',supp)" class="j-btn">
																	<i></i>审批</a>
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
				<el-pagination @current-change="pageGo" :current-page="pagination.curr" layout="prev, pager, next" :total="providerTotal"></el-pagination>
			</div>
		</div>
		<!--数据列表 end-->

		<!--查看审批记录 begin-->
		<el-dialog :visible.sync="dialogFormVisible" size="small" top="30%">
			<h3 slot="title" class="el-dialog__title">审批记录</h3>
			<div>
				<div class="tableBox">
					<table class="modtable" width="100%" border="0" cellpadding="0" cellspacing="0">
						<tr>
							<th width="15%" style="text-align: left;padding-left: 5px;">岗位</th>
							<th width="15%">人员</th>
							<th width="20%">审批时间</th>
							<th width="20%">状态</th>
							<th>备注</th>
						</tr>
						<tr v-for="(record, index) in approveRecord" :key="index">
							<td style="text-align: left;padding-left: 5px;">{{record.station}}</td>
							<td>{{record.userName}}</td>
							<td>{{record.timers}}</td>
							<td>{{record.operate}}</td>
							<td>{{record.comment | blank}}</td>
						</tr>
					</table>
				</div>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="closeRecord">取 消</el-button>
			</div>
		</el-dialog>
		<!--查看审批记录 end-->

	</div>
</template>
<script type="text/javascript">
import {
  getAllData,
  getSubproGroup,
  getApproveRecord
} from "../../api/mgmtcenter";
import debounce from 'lodash/debounce'
import {
  orderTypeOptions,
  houseTypeOptions,
  orderStateOptions,
  ALL
} from "../public/options.config";
import permission from '@/mixins/permission.js'

const initOrderFilterForm = {
  orderNumber: "", //订单编码
  contractNumber: "", //合同编号
  baseNumber: "", //房源编号
  orderType: "", //订单类型
  houseType: "", //收房产品
  productType: "jr1",
  orderAddress: "", //物业地址
  orderState: "" //订单状态
};

export default {
	name:"approvalConfiguration",
  data() {
    return {
      update: false, //重新渲染值
      orderFilterForm: { ...initOrderFilterForm },
			formSend:JSON.parse(JSON.stringify(initOrderFilterForm)),
      orderTypeOptions: [ALL, ...orderTypeOptions], //订单类型选项
      houseTypeOptions: [ALL, ...houseTypeOptions], //收房产品选项
      productThemeOptions: [
        //产品版本选项
        {
          value: "jr1",
          label: "江寓产品V1.0"
        }
      ],
      orderStateOptions: [ALL, ...orderStateOptions],
      planGroup: {}, //配置方案数据数组
      pagination: {
        curr: 1, //当前索引
        pageSize: 10 //每页显示条数
      },
      providerTotal: 0, //数据总数
      activeId: "",
      proGroup: [], //父级数据
      subproGroup: [], //子级数据
      dialogFormVisible: false, //查看审批记录窗口初始隐藏
			approveRecord: [],
			updateId: ''
    };
  },
  computed: {
    totalPage() {
      return Math.ceil(this.totalNum / this.pagination.pageSize);
    },
    frontNum() {
      return this.pagination.pageSize * (this.pagination.curr - 1);
    },
		permissions(){
      return this.$store.getters.permissions
    }
  },
  methods: {
    //获取数据
    getproGroupData(isSearch) {
			this.$store.commit('SET_LOADING',{target:"approvalConfigurationLoading",state:true},{root:true})
      getAllData(
        {
          ...this.formSend,
          limit: this.pagination.pageSize,
          pageNum: this.pagination.curr,
          isSearch
        },
        providers => {
          this.proGroup = providers.items;
          this.providerTotal = providers.totalNum;
        },
        () => this.$message({ type: "error", message: "获取数据失败！" })
      ).finally(
				() => {
					this.$store.commit('SET_LOADING',{target:"approvalConfigurationLoading",state:false},{root:true})
				}
			)
    },
		orderDetail(pkId){
			this.$store.dispatch("itemArrAdd", {
				name: "订单详情",
				id: 'orderDetail',
				params: {pkId:pkId}
			});
		},
    //查询页面(完成)
    searchData:debounce(function(){
			this.pagination.curr=1;
			this.formSend=JSON.parse(JSON.stringify(this.orderFilterForm));
			this.getproGroupData(true);
		},300),
    //重置查询条件(完成)
    reset:debounce(function(){
			this.orderFilterForm = { ...initOrderFilterForm };
			this.pagination.curr=1;
			this.formSend=JSON.parse(JSON.stringify(this.orderFilterForm));
      this.getproGroupData(); //重新查询一次所有数据
		},300),
    //分页请求数据
    pageGo(val) {
      if (this.pagination.curr === val) {
        return;
			}
			this.activeId = ''
      this.pagination.curr = val;
      this.getproGroupData();
    },
    //点击父级，显示子集表格数据
    showchildren(item) {
      if (this.activeId === item.pkId) {
        this.activeId = "";
      } else {
        this.activeId = item.pkId;
      }
      this.update = true;
      this.getChildren(item.pkId);
    },
    //获取子集数据
    getChildren(id) {
      getSubproGroup(
        id,
        data => {
          this.subproGroup = data;
          this.update = false;
        },
        () => this.$message({ type: "error", message: "获取数据失败！" })
      );
		},
    pageChange(componentName, componentId, data) {
      this.$store.dispatch("itemArrAdd", {
        id: componentId,
        name: componentName,
        params: data
      });
    },
    //查看具体配置方案编号
    operate(componentId, operateType, componentName, item) {
      let type;
      if (operateType === "create") {
        type = item.orderStateName === "待生成配置方案" ? 0 : 1;
      } else {
        type = item.deployTypeName.indexOf("标准") > -1 ? 0 : 1;
      }
      this.pageChange(componentName, componentId, {
        oper: operateType,
        type,
        id: item.pkId
      });
    },
    //查看审批记录
    viewApprovalRecord(supp) {
      this.dialogFormVisible = true;
      getApproveRecord(
        supp.pkId,
        data => (this.approveRecord = data),
        () => {
          this.$message.error("查询失败");
        }
      );
		},
		closeRecord(){
			this.dialogFormVisible = false;
			this.approveRecord = [];
		},
    //审批操作按钮
    approveMyplan(componentId, componentName, item) {
      this.pageChange(componentName, componentId, {
        id: item.pkId
      });
		},
		keydownSearch(){
			this.searchData();
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
};
</script>


<style type="text/css" scoped>

</style>