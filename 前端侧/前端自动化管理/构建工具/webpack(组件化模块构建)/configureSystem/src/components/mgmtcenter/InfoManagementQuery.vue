<template>
	<div id="orderQuery" class="component-box">
		<div class="orderQuery-content">
			<div class="form-box">
				<div class="inp-item">
					<p>订单编号：</p>
					<div class="inp-box">
						<input @keydown.enter="keydownSearch"  type="text" v-model.trim="form.orderNumber" placeholder="请输入">
					</div>
				</div><div class="inp-item middle">
					<p>合同编号：</p>
					<div class="inp-box">
						<input @keydown.enter="keydownSearch" type="text" v-model.trim="form.contractNumber" placeholder="请输入" >
					</div>
				</div><div class="inp-item">
					<p>房源编号：</p>
					<div class="inp-box">
						<input @keydown.enter="keydownSearch" type="text" v-model.trim="form.baseNumber" placeholder="请输入" >
					</div>
				</div><div class="inp-item">
					<p>订单类型：</p>
					<div class="inp-box">
						<el-select filterable v-model="form.orderType" placeholder="请选择">
						  <el-option :disabled="item.label ==='租期订单' || item.label === '退租订单'" v-for="(item,key) in queryOption.orderTypeOptions" :label="item.label" :value="item.value" :key="key"></el-option>
						</el-select>
					</div>
				</div><div class="inp-item">
					<p>收房产品：</p>
					<div class="inp-box">
						<el-select filterable v-model="form.houseType" placeholder="请选择">
						  <el-option v-for="(item,key) in queryOption.houseTypeOptions" :label="item.label" :value="item.value" :key="key"></el-option>
						</el-select>
					</div>
				</div><div class="inp-item middle">
					<p>订单配置：</p>
					<div class="inp-box">
						<input @keydown.enter="keydownSearch" type="text" v-model.trim="form.orderDeploy" placeholder="请输入" >
					</div>
				</div><div class="inp-item">
					<p>订单状态：</p>
					<div class="inp-box">
						<el-select filterable v-model="form.orderState" placeholder="请选择">
						  <el-option v-for="(item,key) in queryOption.orderStateOptions" :label="item.label" :value="item.value" :key="key"></el-option>
						</el-select>
					</div>
				</div>
				<div class="top-btnwrap">
					<button @click="orderQuery" class="btn btn-primary">查询</button>
					<button @click="reset" class="btn btn-reset">重置</button>
					<a v-if="permissionObj['excel_out']" :href="host+'/employeeInfo/exportEmployee.json'" class="excel_out btn btn-success f_r">导出Excel</a>
				</div>
			</div>
			<div class="dataBox">
				<div class="toolBar clearfix">
					<my-pagination :total="totalNum" :curr="pagination.curr" :pageChange="pageGo"></my-pagination>
				</div>
				<div class="tableBox">
					<table class="modtable tableLoading infoManagementQueryLoading">
						<thead>
							<tr>
								<th>订单编号</th>
								<th>订单类型</th>
								<th>订单状态</th>
								<th>合同编号</th>
								<th>物业地址</th>
								<th>房源编号</th>
								<th>收房产品</th>
								<th v-show="false">量房日期</th>
								<th v-show="false">竣工申请日期</th>
								<th width="70">相关房间</th>
								<th>订单配置</th>
								<th width="155">操作</th>
							</tr>
						</thead>
						<tbody>
							<no-data :visible="totalNum"></no-data>
							<tr v-for="(item,i) in dataList" :key="i" :class="{isInvalidOrder:item.orderState === -1}">
								<td><a class="bfc" @click="orderDetail(item.pkId)" href="javascript:void(0)">{{item.orderNumber}}</a></td>
								<td>{{item.orderTypeName | blank}}</td>
								<td>{{item.orderStateName | blank}}</td>
								<td>{{item.contractNumber | blank}}</td>
								<td>{{item.orderAddress | blank}}</td>
								<td>{{item.baseNumber | blank}}</td>
								<td>{{item.houseTypeName | blank}}</td>
								<td v-show="false">{{item.houseDate | toDate}}</td>
								<td v-show="false">{{item.predictDate | toDate}}</td>
								<td>{{item.relatedRoom | blank}}</td>
								<td>{{item.orderDeploy | blank}}</td>
								<td class="separateTd">
									<span class="editSpan edit">
										<a v-if="hasPermission('PZ_modifyHouse')" href="javascript:void(0)" @click="pageChange('infoManagementEditor',item,'edit')"><i class="icon"></i>信息变更</a>
									</span>
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
		<el-dialog :close-on-click-modal="false" :title="propmptMsg.tit" :visible.sync="promptShow" size="tiny">
			<span v-text="propmptMsg.content"></span>
			<span slot="footer" class="dialog-footer"><el-button type="primary" @click="promptShow = false">确 定</el-button></span>
		</el-dialog>
	</div>
</template>
<script>
import { orderTypeOptions , houseTypeOptions, ALL  } from "../public/options.config";
const orderStateOptions = [
  { value: 11, label: '已竣工' },
  { value: 12, label: '订单完成' }
]
import {
  getHouseInfoList
} from "../../api/mgmtcenter";
import debounce from 'lodash/debounce'
import permission from '@/mixins/permission.js'

const form ={
	orderNumber:'',
	contractNumber:'',
	baseNumber:'',
	orderType:'',
	houseType:'',
	orderDeploy:'',
	orderState:''
}
  export default {
	  name:"infoManagementQuery",
    data() {
      return {
				queryOption:{
						orderStateOptions:[ALL,...orderStateOptions],
						orderTypeOptions:[ALL,...orderTypeOptions],
						houseTypeOptions:[ALL,...houseTypeOptions]
				},
				pickerOptionEnd: {
					disabledDate:(time) => {
						let boardDateStart = this.form.boardDateStart;
						if (!!boardDateStart) {
							return time.getTime() < boardDateStart;
						}  	
					}
				},
				pickerOptionStart: {
					disabledDate:(time) => {
						let boardDateEnd = this.form.boardDateEnd;
						if (!!boardDateEnd) {
							return time.getTime() > boardDateEnd;
						}  	
					}
				},
				promptShow:false,
				disabledBtn:true,
				outComing:false,
				dialogVisible:false,
				dialogMsg:{
					tit:'',
					type:''
				},
				promptShow:false,
				propmptMsg:{
					tit:'',
						type:'',  // warning  error 
					content:''
				},
				dataList:[],
				form:{...form},
				formQuery:{},
				updateId:'',
						department:[],
						tableData: [],
						pagination:{
							total:0,
							pageSize:10,
							curr:1
				},
				totalNum:0,
				paginationShow:false,
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
    methods: {
			orderDetail(pkId){
				this.$store.dispatch("itemArrAdd", {
					name: "订单详情",
					id: 'orderDetail',
					params: {pkId:pkId}
				});
			},
			paginationReq(){
				var that=this;
				this.$store.commit('SET_LOADING',{target:"infoManagementQueryLoading",state:true},{root:true});
				getHouseInfoList(
					{
						...this.formQuery,
						limit:this.pagination.pageSize,
						pageNum:this.pagination.curr
					},
					providers => {
						this.totalNum=providers.totalNum;
						this.dataList=providers.items;
					},
					(message) => {

						this.$message({ type: "error", message:"订单列表获取失败！" })
					}
				).finally(
					() => {
						this.$store.commit('SET_LOADING',{target:"infoManagementQueryLoading",state:false},{root:true});
					}
				)
			},
			pageGo(curr){
				if(this.pagination.curr === curr){
					return
				}
				this.pagination.curr=curr;
				this.paginationReq();
			},
			orderQuery:debounce(function(){
				this.pagination.curr=1;
				this.formQuery=JSON.parse(JSON.stringify(this.form));
				this.paginationReq();
			},300),
			reset:debounce(function(){
				this.form={...form}
				this.pagination.curr=1;
				this.formQuery=JSON.parse(JSON.stringify(this.form));
				this.paginationReq();
			},300),
			pageChange(componentName,item,pageState){
				var componentId=componentName+'_'+item.pkId;
				this.$store.dispatch("itemArrAdd", {
					name: "房屋信息变更",
					id: componentName,
					params: { 
						id: componentId ,
						state:pageState ,
            pkId:item.pkId, 
            pageState:pageState,
            orderTypeName:item.orderTypeName,
            orderType:item.orderType,
            orderNumber: item.orderNumber,
            contractNumber: item.contractNumber, 
            baseNumber: item.baseNumber, 
            orderAddress: item.orderAddress
          }
				});
			},
			keydownSearch(){
				this.orderQuery();
			}
		},
		activated(){
			var updateId=this.$route.params.updateId || 'updateTab';
			if(this.updateId!==updateId){
				this.paginationReq();
				this.updateId=updateId;
				}
		},
		mixins:[permission]

  };
</script>

<style scoped>
	#orderQuery .table-box{height:calc(100% - 169px);}
	#orderQuery{
		height: 100%;
		
	}
	.orderQuery-content{
		height: 100%;
		position: relative;
		overflow-y: auto;
	}
	.orderQuery-content .person-table{width: 100%;border-collapse: collapse;height: 100%;}
	.orderQuery-content .dotUl{top:7px;}
	.orderQuery-content .content-left{
		width: 173px;position: relative; background-color: #fff;padding: 25px 0 45px 25px;
		height: calc(100% - 45px);
		border-right: 2px solid #e3e7eb;
	}
	.orderQuery-content .control-line{
		width: 4px;
	    height: 100%;
	    background-color: #ecf0f3;
	    cursor: e-resize;
	}
	.orderQuery-content .form-box{
		margin-bottom: 15px;
		padding-top: 15px;
		background-color: #fff;
	}
	.orderQuery-content .inp-item {
		width: 25%;
		display: inline-block;
		margin-top: 0;
		padding-bottom: 15px;
	}
	.orderQuery-content .inp-item.timeLong{
		width: 50%;
	}
	.inp-item.timeLong div.el-date-editor.el-input{
		width: 45%
	}
	.orderQuery-content .inp-item.multiple-sel{
		min-width: 360px;
	}

	.orderQuery-content .inp-item>p{
		float: left;
		width: 75px;
		line-height: 36px;
		padding-left: 15px;
		height: 36px;
		color: #576578;
	}
	.orderQuery-content .inp-item.middle>p{
		width: 85px;
	}
	.orderQuery-content .inp-item .inp-box{
		margin-left: 95px;
		margin-right: 15px;
	}
	.orderQuery-content .inp-item.middle .inp-box{
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
	.msg-table tr.originTr+tr>td table th:first-child,.msg-table tr.originTr+tr>td table th:first-child{
		
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

