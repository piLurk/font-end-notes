<template>
	<div id="houseMeasureQuery" class="component-box">
		<div class="houseMeasureQuery-content">
			<div class="form-box">
				<div class="inp-item">
					<p>订单编号：</p>
					<div class="inp-box">
						<input @keydown.enter="keydownSearch"  type="text" v-model.trim="form.orderNumber" placeholder="请输入">
					</div>
				</div><div class="inp-item">
					<p>订单状态：</p>
					<div class="inp-box">
						<el-select filterable v-model="form.orderState" placeholder="请选择">
						  <el-option v-for="(item,key) in queryOption.orderStateOptions" :label="item.label" :value="item.value" :key="key"></el-option>
						</el-select>
					</div>
				</div><div class="inp-item">
					<p>订单类型：</p>
					<div class="inp-box">
						<el-select filterable v-model="form.orderType" placeholder="请选择">
						  <el-option :disabled="item.label ==='租期订单'" v-for="(item,key) in queryOption.orderTypeOptions" :label="item.label" :value="item.value" :key="key"></el-option>
						</el-select>
					</div>
				</div><div class="inp-item">
					<p>房源编号：</p>
					<div class="inp-box">
						<input @keydown.enter="keydownSearch"  type="text" v-model.trim="form.baseNumber" placeholder="请输入">
					</div>
				</div><div class="inp-item">
					<p>收房产品：</p>
					<div class="inp-box">
						<el-select filterable v-model="form.houseType" placeholder="请选择">
						  <el-option v-for="(item,key) in queryOption.houseTypeOptions" :label="item.label" :value="item.value" :key="key"></el-option>
						</el-select>
					</div>
				</div><div class="inp-item">
					<p>合同编号：</p>
					<div class="inp-box">
						<input @keydown.enter="keydownSearch"  type="text" v-model.trim="form.contractNumber" placeholder="请输入">
					</div>
				</div><div class="inp-item">
					<p>订单管家：</p>
					<div class="inp-box">
						<input @keydown.enter="keydownSearch"  type="text" v-model.trim="form.orderSteward" placeholder="请输入">
					</div>
				</div><div class="inp-item">
					<p>订单配置：</p>
					<div class="inp-box">
						<input @keydown.enter="keydownSearch"  type="text" v-model.trim="form.orderDeploy" placeholder="请输入">
					</div>
				</div><div class="inp-item timeLong">
					<p>起租日期：</p>
					<div class="inp-box">
						<el-date-picker :picker-options="rentStartOptionStart" v-model="form.rentStartDate.start" type="date" placeholder="选择日期"></el-date-picker>
						-
						<el-date-picker :picker-options="rentStartOptionEnd" v-model="form.rentStartDate.end" type="date" placeholder="选择日期"></el-date-picker>
					</div>
				</div><div class="inp-item timeLong">
					<p>量房日期：</p>
					<div class="inp-box">
						<el-date-picker :picker-options="houseReserveOptionStart" v-model="form.houseReserveDate.start" type="date" placeholder="选择日期"></el-date-picker>
						-
						<el-date-picker :picker-options="houseReserveOptionEnd" v-model="form.houseReserveDate.end" type="date" placeholder="选择日期"></el-date-picker>
					</div>
				</div>
				<div class="top-btnwrap">
					<button @click="houseMeasureQuery" class="btn btn-primary">查询</button>
					<button @click="reset" class="btn btn-reset">重置</button>
					<a v-if="permissionObj['excel_out']" :href="host+'/employeeInfo/exportEmployee.json'" class="excel_out btn btn-success f_r">导出Excel</a>
				</div>
			</div>
			<div class="dataBox">
				<div class="toolBar clearfix">
					<my-pagination :total="totalNum" :curr="pagination.curr" :pageChange="pageGo"></my-pagination>
				</div>
				<div class="tableBox">
					<table class="modtable supplierTable measureQueryLoading tableLoading">
						<thead>
							<tr>
								<th>订单编号</th>
								<th>订单状态</th>
								<th>订单类型</th>
								<th>合同编号</th>
								<th>物业地址</th>
								<th>房源编号</th>
								<th>收房产品</th>
								<th>起租日期</th>
								<th>量房日期</th>
								<th>相关房间</th>
								<th>订单管家</th>
								<th>订单配置</th>
								<th width="80">操作</th>
							</tr>
						</thead>
						<tbody>
							<no-data :visible="totalNum"></no-data>
							<tr v-for="(item,i) in dataList" :key="i" :class="{isInvalidOrder:item.orderState === -1}">
								<td> <a class="bfc" @click="orderDetail(item.pkId)" href="javascript:void(0)">{{item.orderNumber}}</a></td>
								<td>{{item.orderStateName}}</td>
								<td>{{item.orderTypeName}}</td>
								<td>{{item.contractNumber}}</td>
								<td>{{item.orderAddress}}</td>
								<td>{{item.baseNumber}}</td>
								<td>{{item.houseTypeName}}</td>
								<td>{{item.rentStartDate | toDate}}</td>
								<td>{{item.houseReserveDate | toDate}}</td>
								<td>{{item.relatedRoom | blank}}</td>
								<td>{{item.orderSteward}}</td>
								<td>{{item.orderDeploy}}</td>
								<td class="separateTd">
									<span class="editSpan view" v-if="item.orderState>2 && item.orderFlow > 3 && hasPermission('PZ_viewMeasure')">
										<a href="javascript:void(0)" @click="houseMeasureAdd('houseMeasureAdd',item,'readOnly')"><i class="icon"></i>查看量房</a>
									</span>
									<template v-else>
										<span v-if="item.orderFlow===0 && item.orderState === 0 && hasPermission('PZ_inputMeasure')" class="editSpan entry"><a href="javascript:void(0)" @click="houseMeasureAdd('houseMeasureAdd',item,'entry')"><i class="icon"></i>录入量房</a></span>
										<span v-if="item.orderFlow !==0 && item.orderState >0 && hasPermission('PZ_editMeasure')" class="editSpan edit"><a href="javascript:void(0)" @click="houseMeasureAdd('houseMeasureAdd',item,'edit')"><i class="icon"></i>编辑量房</a></span>
									</template>
									
								</td>
							</tr>
						</tbody>
						
					</table>
					<div class="footPages">
						<el-pagination v-on:current-change="pageGo" v-show="totalNum>pagination.pageSize"  layout="prev, pager, next" :page-size="pagination.pageSize" :current-page="pagination.curr" :total="totalNum" ></el-pagination>
					</div>
				</div>
			</div>
		</div>
		
	</div>
</template>
<script>
// 每次都请求组织架构json和上级部门的数组————前端无数据权限。不选和选无上级部门都为无上级部门。
import { orderStateOptions , orderTypeOptions ,houseTypeOptions, ALL } from "../public/options.config";
import { createNamespacedHelpers } from 'vuex';
import debounce from 'lodash/debounce'
const { mapGetters, mapActions } = createNamespacedHelpers('measureQuery')

import permission from '@/mixins/permission.js'

  export default {
	  name:'houseMeasureQuery',
    data() {
      return {
				queryOption:{
						orderStateOptions:[ALL,...orderStateOptions],
						orderTypeOptions:[ALL,...orderTypeOptions],
						houseTypeOptions:[ALL,...houseTypeOptions],
					},
						rentStartOptionEnd: {
							disabledDate:(time) => {
								let boardDateStart = this.form.rentStartDate.start;
								if (!!boardDateStart) {
									return time.getTime()< boardDateStart;
								}  	
							}
				},
				rentStartOptionStart: {
					disabledDate:(time) => {
						let boardDateEnd = this.form.rentStartDate.end;
						if (!!boardDateEnd) {
							return time.getTime() > boardDateEnd;
						}  	
					}
				},
				houseReserveOptionEnd: {
					disabledDate:(time) => {
						let boardDateStart = this.form.houseReserveDate.start;
						if (!!boardDateStart) {
							return time.getTime() < boardDateStart;
						}  	
					}
				},
				houseReserveOptionStart: {
					disabledDate:(time) => {
						let boardDateEnd = this.form.houseReserveDate.end;
						if (!!boardDateEnd) {
							return time.getTime() > boardDateEnd;
						}  	
					}
				},
				promptShow:false,
				updateId:'',
				form:{
					orderNumber:'',
					orderState:'',
					orderType:'',
					baseNumber:'',
					houseType:'',
					contractNumber:'',
					orderSteward:'',
					orderDeploy:'',
					rentStartDate:{
						start:'',
						end:''	
					},
					houseReserveDate:{
						start:'',
						end:''
					}
				},
				formQuery:{
					orderNumber:'',
					orderState:'',
					orderTypeName:'',
					baseNumber:'',
					houseTypeName:'',
					contractNumber:'',
					orderSteward:'',
					orderDeploy:'',
					rentStartDate:{
						start:'',
						end:''	
					},
					houseReserveDate:{
						start:'',
						end:''
					}
				},
				pagination:{
					pageSize:10,
					curr:1,

				},
        permissionObj:{
        	edit_personInfo:false,  //编辑
        	personnel_change:false,  //人事变动
        	quit_person:false,  //离职
        	excel_out:false,  //导出表格
        	Extension_number:false, //录入分机号
        	oa_query_personInfos:false,//查看人员信息
        }
      };
		},
		computed:{
			...mapGetters({
				dataList:'dataList',
				totalNum:'totalNum',
			})
		},
		methods: {
			...mapActions({
				getMeasureList:'getMeasureList'
			}),
			orderDetail(pkId){
				this.$store.dispatch("itemArrAdd", {
					name: "订单详情",
					id: 'orderDetail',
					params: {pkId:pkId}
				});
			},
			paginationReq(){
				var data=JSON.parse(JSON.stringify(this.formQuery));
				data['limit']=this.pagination.pageSize;
				data['pageNum']=this.pagination.curr;
				var start_r=!!data.rentStartDate.start?new Date(data.rentStartDate.start).getTime():'';
				var end_r=!!data.rentStartDate.end?new Date(data.rentStartDate.end).getTime()+24*3600*1000:'';
				var start_m=!!data.houseReserveDate.start?new Date(data.houseReserveDate.start).getTime():'';
				var end_m=!!data.houseReserveDate.end?new Date(data.houseReserveDate.end).getTime()+24*3600*1000:'';
				
				data['rentDate']= start_r == '' && end_r == '' ? null : [start_r, end_r];
				data['amountDate']= start_m == '' && end_m == '' ? null : [start_m, end_m];
				delete data['rentStartDate'];
				delete data['houseReserveDate'];
				this.getMeasureList(data);
			},
			pageGo(curr){
				if(this.pagination.curr===curr){
					return;
				}
				this.pagination.curr=curr;
				this.paginationReq();
			},
			houseMeasureQuery:debounce(function(){
				this.pagination.curr=1;
				this.formQuery=JSON.parse(JSON.stringify(this.form));
				this.paginationReq();
			},300),
			reset:debounce(function(){
				for(let i in this.form){
					if(typeof this.form[i] ==='object'){
						for(let g in this.form[i]){
							this.form[i][g]=''
						}
						continue;
					}
					this.form[i]='';

				}
				this.pagination.curr=1;
				this.formQuery=JSON.parse(JSON.stringify(this.form));
				this.paginationReq();
			},300),
			houseMeasureAdd(componentName,item,pageState,title){
				var componentId=componentName+'_'+pageState+'_'+item.pkId;
				this.$store.dispatch("itemArrAdd", {
					name: "量房详情",
					id: componentName,
					params: { id: componentId ,pkId:item.pkId, pageState:pageState,orderType:item.orderType}
				});
			},
			keydownSearch(){
				this.houseMeasureQuery();
			}
		},
		mixins:[permission],
		activated(){
			var updateId=this.$route.params.updateId || 'updateTab';
			if(this.updateId!==updateId){
				this.paginationReq();
				this.updateId=updateId;
			}
		}
		};

</script>

<style scoped>
	#houseMeasureQuery .table-box{height:calc(100% - 220px);}
	#houseMeasureQuery{
		height: 100%;
	
	}
	.houseMeasureQuery-content{
		position: relative;
		overflow-y: auto;
	}
	.houseMeasureQuery-content .person-table{width: 100%;border-collapse: collapse;height: 100%;}
	.houseMeasureQuery-content .dotUl{top:7px;}
	.houseMeasureQuery-content .content-left{
		width: 173px;position: relative; background-color: #fff;padding: 25px 0 45px 25px;
		height: calc(100% - 45px);
		border-right: 2px solid #e3e7eb;
	}
	.houseMeasureQuery-content .control-line{
		width: 4px;
	    height: 100%;
	    background-color: #ecf0f3;
	    cursor: e-resize;
	}
	.houseMeasureQuery-content .form-box{
		margin-bottom: 15px;
		padding-top: 15px;
		background-color: #fff;
	}
	.houseMeasureQuery-content .inp-item {
		width: 25%;
		display: inline-block;
		margin-top: 0;
		padding-bottom:15px;
	}
	.houseMeasureQuery-content .inp-item.timeLong{
		width: 50%;
	}
	.inp-item.timeLong div.el-date-editor.el-input{
		width: 45%
	}
	.houseMeasureQuery-content .inp-item.multiple-sel{
		min-width: 360px;
	}

	.houseMeasureQuery-content .inp-item>p{
		float: left;
		width: 75px;
		line-height: 36px;
		padding-left: 15px;
		height: 36px;
		color: #576578;
	}
	.houseMeasureQuery-content .inp-item.middle>p{
		width: 85px;
	}
	.houseMeasureQuery-content .inp-item .inp-box{
		margin-left: 95px;
		margin-right: 15px;
	}
	.houseMeasureQuery-content .inp-item.middle .inp-box{
		margin-left: 105px;
	}
	.top-btnwrap{
		padding-left:95px;
		padding-bottom: 15px;

	}
	.top-btnwrap button:nth-child(1){
		margin-right: 15px;
	}
	.excel_out{margin-right: 15px;}
	.table-box .table-top{
		padding-bottom: 7px;
		height: 30px;
		box-sizing: border-box;
	}
	.table-box .table-top .toppage{
		position: relative;
		right: 0px;
		font-size: 12px;
		color: #999;
	}
	.table-box .table-top .toppage .pdlr5 i,.table-box .table-top .toppage .pdlr5 a{
		color: #3ba0ff;
	}
	.table-box table{
		
	}
	.table-wrap{
		padding-bottom: 35px;
	}
	.btn-wrap{
		padding-right: 60px;
		position: relative;
		bottom: -10px;
	}
	.pagination-box{
		padding-left: 25px;
		padding-top: 25px;
	}
	/*表格*/
.table-box{
    padding: 10px 20px 0;
    height: calc(100% - 10px);
    box-sizing: border-box;
    background-color: #fff;
}
.msg-table{
    width: 100%;
    text-align: left;
    border-collapse: collapse;
}
.msg-table tr>th.oparateTh{text-align: center;}
.msg-table tr>td:first-child,.msg-table tr>th:first-child{padding-left: 30px;}
.msg-table td a{
    color: #d1d1d1;
}
.msg-table td{
    border-bottom: 1px solid #f1f1f1;
    cursor:pointer;
    color:#576578;
}
.msg-table tr:hover td{
    background-color: #f9fafc;
}
.msg-table tr:hover td.oparateTd a:first-child{
    color: #f6732b;
}
.msg-table tr:hover td.oparateTd a:nth-child(2){
    color:#3ba0ff;
}
.msg-table td,th{   
    height: 40px;
    border-bottom: 1px solid #f1f1f1
}
.msg-table th{
    background-color: #f6f8f8;
    color:#a3b2c6;
    font-weight: normal;
}
.msg-table td.oparateTd{text-align: center;}
.msg-table td.oparateTd a{font-size: 12px;}
.msg-table td.oparateTd a:first-child{
    margin-right: 25px;
}
.msg-table td.oparateTd.alone a:first-child{
    margin-right: 0px;
}
	.msg-table{border-collapse:collapse;table-layout: fixed;}
	.msg-table td{
		cursor: auto;
		word-break: break-all;
	}
	.msg-table tr.active td{
		background-color: #3ba0ff;
		color: #fff;
	}
	.msg-table td.arrowTd{
		cursor: pointer;
		background-image:url(/static/images/uptable.png);
		background-position: center center;
		background-repeat: no-repeat;
	}
	.msg-table tr > td:first-child, .msg-table tr > th:first-child{padding: 0}
	.msg-table tr.originTr>td.arrowTd{
		width: 40px;
	}
	.msg-table tr.originTr.active td.arrowTd{
		background-image:url(/static/images/downtable.png);
	}
	.msg-table tr.originTr td.separateTd a{color:#d1d1d1;}
	.msg-table tr.originTr:hover td.separateTd .editSpan a{color:#3ba0ff; }
	.msg-table tr.originTr:hover td.separateTd .changeSpan a{color:#0fd38a; }
	.msg-table tr.originTr:hover td.separateTd .quitSpan a{color:#f6732b; }
	.msg-table tr.originTr:hover td.separateTd .numberSpan a{color:#3ba0ff;}
	.msg-table tr.originTr a{color:#3ba0ff;}
	.msg-table tr.originTr a:hover{text-decoration: underline;}
	.msg-table tr.originTr td.separateTd span:not(:last-child){
		margin-right: 8px;
	}
	.msg-table tr.originTr.active td a{color:#ffe84c !important;}
	.msg-table tr.originTr+tr{
		display: none;
	}
	.msg-table tr.originTr+tr>td{
		width: 100%;
		position: relative;
		top:-1px;
	}
	.msg-table tr.originTr+tr>td table{
		border-collapse: collapse;
		width: 100%;
	}
	.msg-table tr.originTr+tr>td table th{
		background-color: #ecf4ff;
		color: #a3b2c6;
	}
	.msg-table tr.originTr.active+tr{
		display:table-row;
	}

	.msg-table tr.originTr.active+tr>td{
		box-sizing: border-box;
	}
	.msg-table tr.originTr.active+tr>td .table-inner{
		border:2px solid #3ba0ff;
		border-top: 0;
		margin-bottom: 3px;
	}
	.msg-table tr.active td:last-child{
		display: table-cell;
	}

</style>
<style type="text/css">

</style>
