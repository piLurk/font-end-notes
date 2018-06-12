<template>
	<div id="replenishProject">
		<div class="searchfilter col4">
			<ul class="clearfix">
				<li>
					<p class="name">订单编码：</p>
					<div class="inpbox"><input type="text" @keydown.enter="keydownSearch" v-model.trim="form.orderNumber" placeholder="请输入" class="inp" /></div>
				</li>
				<li>
					<p class="name">合同编号：</p>
					<div class="inpbox"><input type="text" @keydown.enter="keydownSearch" v-model.trim="form.contractNumber" placeholder="请输入" class="inp" /></div>
				</li>
				<li>
					<p class="name">房源编号：</p>
					<div class="inpbox"><input type="text" @keydown.enter="keydownSearch" v-model.trim="form.baseNumber" placeholder="请输入" class="inp" /></div>
				</li>
				<li>
					<p class="name">订单类型：</p>
					<div class="inpbox">
						<el-select v-model="form.orderType" placeholder="请选择">
							<el-option
								v-for="(item,i) in queryOption.orderTypeOptions"
								:key="i"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</div>
				</li>
				<li>
					<p class="name">收房产品：</p>
					<div class="inpbox">
						<el-select v-model="form.houseType" placeholder="请选择">
							<el-option
								v-for="(item,i) in queryOption.houseTypeOptions"
								:key="i"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</div>
				</li>
				<li>
					<p class="name">产品版本：</p>
					<div class="inpbox">
						<el-select v-model="productTheme" disabled placeholder="请选择">
							<el-option
								v-for="(item,i) in productThemeOptions"
								:key="i"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
					</div>
				</li>
				<li>
					<p class="name">物业地址：</p>
					<div class="inpbox"><input type="text" @keydown.enter="keydownSearch" v-model.trim="form.orderAddress" placeholder="请输入" class="inp" /></div>
				</li>
				<li>
					<p class="name">订单状态：</p>
					<div class="inpbox">
						<el-select v-model="form.orderState" placeholder="请选择">
							<el-option
								v-for="(item,i) in queryOption.orderStateOptions"
								:key="i"
								:label="item.label"
								:value="item.value">
							</el-option>
						</el-select>
	        </div>
					</li>
					<li class="btnbox singlerow">
							<input type="button" class="surebtn" @click="orderQuery" value="查询" />
							<input type="button" class="surebtn surereset" @click="reset" value="重置" />
					</li>
			</ul>
		</div>
		<!--数据列表 begin-->
		<div class="dataBox">
			<div class="addBox">
				<div class="left_part">
					<el-button v-if="hasPermission('PZ_createSup')" :disabled="!(halfCheck || allCheck)" @click="addPeriod" type="primary">批量补充工期</el-button>
					<span class="tip">已选择<i>{{selectNum}}</i>条</span>	
				</div>
						
			</div>
			<div class="toolBar clearfix">
				<my-pagination :total="totalNum" :curr="pagination.curr" :pageChange="pageGo"></my-pagination>
			</div>
			<div class="tableBox">
				<table class="modtable tableLoading replenishProjectLoading">
					<thead>
						<tr>
							<th width="40"><i :class="{checkinp:true,halfcheckbox:halfCheck,checkedbox:allCheck,}" @click="selectAll"></i></th>
							<th width="40"></th>
							<th>订单编号</th>
							<th>订单类型</th>
							<th>订单状态</th>
							<th>预计配置周期</th>
							<th>实际工期</th>
							<th>超期天数</th>
							<th>物业地址</th>
							<th>合同编号</th>
							<th>房源编号</th>
							<th>收房产品</th>
							<th >操作</th>
						</tr>
					</thead>
					<tbody>
						<no-data :visible="totalNum"></no-data>
						<template class="modtable" v-for="(item,i) in dataList">
								<tr :class="{father:true,'active':item.open,isInvalidOrder:item.orderState === -1}">
									<td><i :class="{checkinp:true,checkedbox:item.checked}" @click="checkFun(item)"></i></td>
									<td class="arrowTd" @click="toggle(item);"></td>
									<td><a class="bfc" @click="orderDetail(item.pkId)" href="javascript:void(0)">{{item.orderNumber}}</a></td>
									<td>{{item.orderTypeName | blank}}</td>
									<td>{{item.orderStateName | blank}}</td>
									<td>{{item.predictPeriod | blank}}</td>
									<td>{{item.actualDay | blank}}</td>
									<td>{{item.exceedDay | blank}}</td>
									<td>{{item.orderAddress | blank}}</td>
									<td>{{item.contractNumber | blank}}</td>
									<td>{{item.baseNumber | blank}}</td>
									<td>{{item.houseTypeName | blank}}</td>
									<td>
										<p v-if="hasPermission('PZ_createSup')" class="typeControl">
											<a href="javascript:void(0)" @click="addSingle(item)" class="s-btn"><i></i>补充工期</a>
										</p>
									</td>
								</tr>
								<tr v-show="item.open">
									<td colspan="13">
										<div class="subDiv">
											<table class="modtable" width="100%" border="0" cellpadding="0" cellspacing="0" >
												<tr>
													<th width="60">&nbsp;&nbsp;</th>
													<th width="80">序号</th>
													<th>补充工期天数</th>
													<th>补充原因</th>
													<th>补充者</th>
													<th>补充日期</th>
												</tr>
												<tr v-for="(supp,index) in item.reasonList" :key="index">
													<td>&nbsp;&nbsp;</td>
													<td>{{index+1}}</td>
													<td>{{supp.periodDay}}</td>
													<td>{{supp.periodReason}}</td>
													<td>{{supp.periodUser}}</td>
													<td>{{supp.periodTimer | toDate | blank}}</td>
												</tr>
												<tr v-if="item.reasonList.length === 0">
													<td style="height: 80px; text-align: center;" colspan="9">该订单尚未添加补充工期！</td>
												</tr>
											</table>
										</div>
									</td>
								</tr>
		                </template>
					</tbody>	
                </table>
			</div>
			<div class="footPages">
				<el-pagination v-on:current-change="pageGo" v-show="totalNum>pagination.pageSize"  layout="prev, pager, next" :page-size="pagination.pageSize" :current-page="pagination.curr" :total="totalNum" ></el-pagination>
			</div>
		</div>
		<!--数据列表 end-->
		

		<!--补充工期 begin-->
		<el-dialog :close-on-click-modal="false" :visible.sync="dialogFormVisible" size="small" top="30%">
		  	<h3 slot="title" class="el-dialog__title">补充工期</h3>
			<div class="tableBox">
				<el-form :model="{reasonList:reasonList}"   ref="reasonList" class="errorRightForm">
					<table class="modtable" width="100%" border="0" cellpadding="0" cellspacing="0" >
					    <tr>
					    	<th width="40">&nbsp;&nbsp;</th>
							<th>补充原因</th>
							<th>补充工期天数</th>
							<th>操作</th>
						</tr>
						<tr v-for="(item,index) in reasonList" :key="index">
							<td width="40">&nbsp;&nbsp;</td>
							<td>
								<el-form-item :prop="'reasonList['+index+'].periodReason'" :rules='rules.needSel' style="width: 50%;margin: 0"
								>
									<el-select v-model="item.periodReason" placeholder="请选择">
									    <el-option
									      v-for="(item,i) in queryOption.outTimeType"
									      :key="i"
									      :label="item.label"
									      :value="item.label">
									    </el-option>
									</el-select>
								</el-form-item>
							</td>
							<td>
								<el-form-item :prop="'reasonList['+index+'].periodDay'" :rules="rules.checkNum" style="width: 50%;margin: 0" 
			                    >
			                        <el-input v-model.trim="item.periodDay"></el-input>
			                    </el-form-item>
							</td>
							<td>
								<p v-if="index != 0" class="typeControl">
	                       			<a @click="deleteItem(index)" href="javascript:void(0)" class="d-btn" ><i></i>删除</a>
	                       		</p>
							</td>
						</tr>
						<tr>
							<td width="40">&nbsp;&nbsp;</td>
							<td colspan="3">
								<input @click="addItem" type="button" value="+ 增加一项"  class="addgreenBtn">
							</td>
						</tr>
					</table>
				</el-form>
			</div>
		  	<div slot="footer" class="dialog-footer">
		    	<el-button @click="dialogFormVisible = false">取 消</el-button>
		    	<el-button type="primary"  @click="saveOutReason('reasonList')" >确 定</el-button>
		  	</div>

		</el-dialog>
		<!--补充工期 end-->
		
	</div>
</template>
<script type="text/javascript">

import {
  getRelenishList,
  getRelenishReasonList,
  saveRelenishReason
} from "../../api/mgmtcenter";
import debounce from 'lodash/debounce'
import {
	outTimeType,
	orderTypeOptions,
	houseTypeOptions,
	orderStateOptions,
	ALL
} from '../public/options.config'
import permission from '@/mixins/permission.js'

const reasonObj={
	periodReason:'',
	periodDay:''
}
const form ={
	orderNumber:'',
	contractNumber:'',
	baseNumber:'',
	orderType:'',
	orderState:'',
	houseType:'',
	orderAddress:'',
}
export default {
	name:'replenishProject',
	data(){
			var checkNum=(rule , value, cb) =>{
				if(!value){                                                                       `	`
					return cb(new Error('输入不能为空！'))
				}
				if(!/^[+]{0,1}(\d+)$/.test(value)){
					return cb(new Error('请输入正整数！'))
				}else{
					cb();
				}
			};
			var needSel=(rule,value,cb) =>{
				if(value===null || value ===''){
					return cb(new Error('请选择'))
				}else{
					cb();
				}
			}
		return{
			queryOption:{
			  outTimeType:outTimeType,
			  orderTypeOptions:[ALL,...orderTypeOptions],
			  houseTypeOptions:[ALL,...houseTypeOptions],
			  orderStateOptions:[ALL,...orderStateOptions]
			  },
			rules:{
				checkNum:{validator:checkNum,trigger:'blur'},
				needSel:{validator:needSel,trigger:'change'}
			},
			form:{...form},
			formSend:{},
			dataList:[],
			checkList:[],
	        productTheme:'jr1',//产品版本
			productThemeOptions: [//产品版本选项
				{
		          	value: 'jr1',
		          	label: '江寓产品V1.0'
		        }
	        ],
	        pagination:{
	        	total:null,//数据总条数
	        	curr:1,//当前索引
	        	pageSize:10//每页显示条数
			},
			totalNum:0,
	        dialogFormVisible: false,//补充工期窗口初始隐藏
			dialogState:'', //弹窗入口  singleDo单个补充,allDo批量补充
			orderId:'',//单个补充的orderid
			reasonList:[{
				...reasonObj
			}],
				
		    
		}
	},
	methods:{
		toggle(item){
			item.open=!item.open;
			if(item.open){
				//打开
				if(item.reasonList.length===0){
					getRelenishReasonList(
						item.pkId,
						providers => {
							item.reasonList=providers;
						},
						() => this.$message({ type: "error", message: "超期原因列表获取置失败！" })
					)
					
				}
				
			}
		},
		checkFun(item){
			item.checked=!item.checked;
		},
		selectAll(){
			if(this.allCheck || this.halfCheck){
				//全选或者部分选
				for(let i of this.dataList){
					i['checked']=false;
				}
			}else{
				for(let i of this.dataList){
					i['checked']=true;
				}
			}
		},
		addPeriod(){
			this.dialogState='allDo';
			if(this.halfCheck || this.allCheck){
				if(!!this.$refs['reasonList']){
					this.$refs['reasonList'].resetFields();
				}
				this.dialogFormVisible=true;
				this.reasonList=[{...reasonObj}];
			}
		},
		addSingle(item){
			if(!!this.$refs['reasonList']){
				this.$refs['reasonList'].resetFields();
			}
			this.dialogState='singleDo';
			this.orderId=item.pkId;
			this.dialogFormVisible=true;
			this.reasonList=[{...reasonObj}];
		},
		deleteItem(i){
			this.reasonList.splice(i,1);
		},
		addItem(){
			this.reasonList.push(reasonObj);
		},
		saveOutReason(formName){
			this.$refs[formName].validate((valid) =>{
				if(valid){
					if(this.dialogState === 'singleDo'){
						var data;
						for(let i of this.reasonList){
							i['orderId']=this.orderId;
							i['periodUser']=this.name;
						}
						data=this.reasonList;
						this.dialogFormVisible=false;
						saveRelenishReason(
							data,
							providers => {
								this.$message({ type: "success", message: "补充工期添加成功！" });
								this.paginationReq();
							},
							() => this.$message({ type: "error", message: "补充工期添加失败！" })
						)
					}else{
						var dataArr=[];
						for(let i of this.dataList){
							if(i.checked){
								var orderId=i.pkId;
								for(let k of this.reasonList){
									k['orderId']=orderId;
									k['periodUser']=this.name;
								}
								dataArr=dataArr.concat(JSON.parse(JSON.stringify(this.reasonList)));
							}
						}
						this.dialogFormVisible=false;
						saveRelenishReason(
							dataArr,
							providers => {
								this.$message({ type: "success", message: "补充工期批量添加成功！" });
								this.paginationReq();
							},
							() => this.$message({ type: "error", message: "补充工期批量添加失败！" })
						)

					}
				}
			})
			
		},
		paginationReq(){
			var that=this;
			this.$store.commit('SET_LOADING',{target:"replenishProjectLoading",state:true},{root:true});
			getRelenishList(
				{
					...this.formSend,
					limit:this.pagination.pageSize,
					pageNum:this.pagination.curr
				},
				providers => {
					this.totalNum=providers.totalNum;
					if(providers.items === null){
						return
					}
					for(let i of providers.items){
						i['open']=false;
						i['reasonList']=[];
						i['checked']=false;
					}
					this.dataList=providers.items;
					
				},
				() => {
					this.$message({ type: "error", message: "订单列表获取失败！" })
				}
			).finally(
				() => {
					this.$store.commit('SET_LOADING',{target:"replenishProjectLoading",state:false},{root:true});
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
			this.formSend=JSON.parse(JSON.stringify(this.form));
			this.paginationReq();
		},300),
		reset:debounce(function(){
			this.form={...form}
			this.formSend=JSON.parse(JSON.stringify(this.form));
			this.pagination.curr=1;
			this.paginationReq();
		},300),
		pageChange(componentName,currentViewId,personId,permission){
			var obj={component:componentName,id:currentViewId,personId:personId};
			if (!!permission && permission==='readOnly') {
				obj['readOnly']=true;
			}else{
				obj['readOnly']=false;
			}
			this.$store.dispatch('itemArrAdd',obj);		
		},
		keydownSearch(){
			this.orderQuery();
		},
		orderDetail(pkId){
			this.$store.dispatch("itemArrAdd", {
				name: "订单详情",
				id: 'orderDetail',
				params: {pkId:pkId}
			});
		},
		
	},
	computed: {
		halfCheck(){
			if(this.selectNum === this.dataList.length || this.selectNum === 0){
				return false;
			}else{
				return true;
			}
		},
		selectNum(){
			var checkNum=0;
			for(let i of this.dataList){
				if(i.checked === true){
					checkNum++;
				}
			}
			return checkNum;
		},
		allCheck(){
			if(this.selectNum === this.dataList.length && this.selectNum!==0){
				return true
			}else{
				return false
			}
		},
		name(){
			return this.$store.getters.name
		}
	},
	mixins:[permission],
	beforeMount(){
		this.paginationReq();
	},
	mounted:function(){
		
	}
}
</script>


<style type="text/css" scoped>
	.dataBox .addBox{
		position: relative;
	}
	.dataBox .addBox .left_part{
		position:absolute;
		top:0px;
	}
	.dataBox .addBox .left_part .tip{
		padding-left: 25px;
		color: #999;
	}
	.dataBox .addBox .left_part .tip i{
		color: #3ba0ff;
		padding: 0 3px;
	}
	.modtable tr.active td{
		background-color: #3ba0ff;
		color: #fff;
	}

	.modtable tr > td:first-child, .modtable tr > th:first-child{padding: 0}
	.modtable tr.father>td.arrowTd{
		width: 40px;
	}
	.modtable tr.father td.separateTd a{color:#d1d1d1;}
	.modtable tr.father:hover td.separateTd .editSpan a{color:#3ba0ff; }
	.modtable tr.father:hover td.separateTd .changeSpan a{color:#0fd38a; }
	.modtable tr.father:hover td.separateTd .quitSpan a{color:#f6732b; }
	.modtable tr.father:hover td.separateTd .numberSpan a{color:#3ba0ff;}

	.modtable tr.father td.separateTd span:not(:last-child){
		margin-right: 8px;
	}

	.modtable tr.father+tr{
		display: none;
	}
	.modtable tr.father+tr>td{
		width: 100%;
		position: relative;
		top:-1px;
	}
	.modtable tr.father+tr>td table{
		border-collapse: collapse;
		width: 100%;
	}
	.modtable tr.father+tr>td table th{
		background-color: #ecf4ff;
		color: #a3b2c6;
	}
	.modtable tr.father.active+tr{
		display:table-row;
	}

	.modtable tr.father.active+tr>td{
		box-sizing: border-box;
	}
	.modtable tr.father.active+tr>td .table-inner{
		border:2px solid #3ba0ff;
		border-top: 0;
		margin-bottom: 3px;
	}
	.modtable tr.active td:last-child{
		display: table-cell;
	}
</style>