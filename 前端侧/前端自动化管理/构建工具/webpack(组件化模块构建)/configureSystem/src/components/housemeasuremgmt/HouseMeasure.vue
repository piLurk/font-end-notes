<template>
	<div class="addPages houseMeasure">
		<div class="info-part">
			<div class="info-part-inner">
				<h3>合同基本信息</h3>
				<ul class="clearfix">
					<li class="middle">
						<p class="name">收房合同号：</p><p class="content">{{houseMeasureData.orderInfo.contractNumber}}</p>
					</li>
					<li>
						<p class="name">房源编号：</p><p class="content">{{houseMeasureData.orderInfo.baseNumber}}</p>
					</li>
					<li>
						<p class="name">收房产品：</p><p class="content">{{houseMeasureData.orderInfo.houseTypeName}}</p>
					</li>
					<li>
						<p class="name">订单管家：</p><p class="content">{{houseMeasureData.orderInfo.orderSteward}}</p>	
					</li>
					<li>
						<p class="name">配置专员：</p><p class="content">{{houseMeasureData.orderInfo.orderDeploy}}</p>
					</li>
					<li class="address">
						<p class="name">物业地址：</p><p class="content">{{houseMeasureData.orderInfo.orderAddress}}</p>
					</li>
				</ul>
			</div>
		</div>
		<el-form :model="formSend" :inline="true" ref="formSend" label-position="left" >
			<div class="info-part">
				<div class="info-part-inner">
					<h3>配置周期规划</h3>
					<ul class="clearfix">
						<li>
							<el-form-item 
								prop="houseReserveDate"
								label="量房日期"
								:rules='[
									{type:"date", required: true, message: "请选择时间", trigger: "blur" },
								]'
							>
								<el-date-picker :picker-options="timeStart" :readonly="readonly"	v-model="formSend.houseReserveDate" type="date" placeholder="选择日期"></el-date-picker>
							</el-form-item>
						</li>
						<li>
							<el-form-item 
									prop="startDate" 
									label="开工日期"
									:rules="[
										{type:'date',required:true,message:'请输入开工日期',trigger:'blur'},
									]"
								>
									<el-date-picker :picker-options="timeEnd" :readonly="readonly"	v-model="formSend.startDate" type="date" placeholder="选择日期"></el-date-picker>
							</el-form-item>
						</li>
					</ul>
					<ul class="clearfix">
						<li>
							<p class="name">预计周期：</p><p class="content">{{expectCircle}}</p>
						</li>
						<li class="middle">
							<p class="name">预计竣工日期：</p><p class="content">{{jdDay}}</p>
						</li>
					</ul>
					<div v-if="measureOutDay>=1" class="tableBox">
						<h4><i class="icon warning"></i>量房已超期{{'{'+measureOutDay+'}天'}}，请录入超期原因</h4>
						<table class="modtable solutionTable">
							<thead>
								<tr>
									<th width="240">超期原因</th>
									<th>超期天数</th>
									<th>原因描述</th>
									<th>操作</th>
								</tr>
							</thead>
							<tbody>
								
								<tr v-for="(item , i) in formSend.measureCauseInfos" :key="i">
									<td>
										<el-form-item
											:prop="'measureCauseInfos.'+i+'.exceedCause'" 
											:rules="[
												{required:true,message:'请输入超期原因'},
											]"
										>
											<el-select :disabled="readonly" size="small" style="width: 150px" v-model="item.exceedCause" placeholder="请选择">
												<el-option v-for="item in exceedCauseList" :key="item.value" :label="item.name" :value="item.name">
												</el-option>
											</el-select>
										</el-form-item>
										
									</td>
									<td>
										<el-form-item 
											:prop="'measureCauseInfos.'+i+'.exceedDay'" 
											:rules="rules.checkNum"
										>	
											<el-input :readonly="readonly" v-model.trim="item.exceedDay" placeholder="请输入"></el-input>
										</el-form-item>
									</td>
									<td>
										<el-form-item 
											:prop="'measureCauseInfos.'+i+'.exceedRemark'" 
											:rules="[
												{required:true,message:'请输入超期原因描述'},
											]"
										>	
											<el-input :readonly="readonly" v-model.trim="item.exceedRemark" placeholder="请输入"></el-input>
										</el-form-item>
									</td>
									<td class="separateTd">
										<span v-if="!readonly"  class="editSpan remove"><a href="javascript:void(0)" @click="removeReason(0,i)"><i class="icon iconRemove"></i>删除</a></span>
									</td>
								</tr>
								<tr>
									<td class="addTd" colspan="4">
										<el-button :disabled="readonly" type="primary" @click="addReason(0)">+ 新增一条超期原因</el-button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div v-if="workOutDay>=2" class="tableBox">
						<h4><i class="icon warning"></i>开工已超期{{'{'+(measureOutDay-1)+'}天'}}，请录入超期原因</h4>
						<table class="modtable solutionTable">
							<thead>
								<tr>
									<th width="240">超期原因</th>
									<th>超期天数</th>
									<th>原因描述</th>
									<th>操作</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(item , i) in formSend.startCauseInfos" :key="i">
									<td>
										<el-form-item
											:prop="'startCauseInfos.'+i+'.exceedCause'"
											:rules="rules.needSel"
										>
											<el-select :disabled="readonly" size="small" style="width: 150px" v-model="item.exceedCause" placeholder="请选择">
												<el-option v-for="item in exceedCauseList" :key="item.value" :label="item.name" :value="item.name">
												</el-option>
											</el-select>
										</el-form-item>
										
									</td>
									<td>
										<el-form-item 
											:prop="'startCauseInfos.'+i+'.exceedDay'"
											:rules="rules.checkNum"
										>	
											<el-input :readonly="readonly" v-model.trim="item.exceedDay" placeholder="请输入"></el-input>
										</el-form-item>
									</td>
									<td>
										<el-form-item
											:prop="'startCauseInfos.'+i+'.exceedRemark'" 
											:rules="rules.needSel"
										>	
											<el-input :readonly="readonly" v-model.trim="item.exceedRemark" placeholder="请输入"></el-input>
										</el-form-item>
									</td>
									<td class="separateTd">
										<span v-if="!readonly"  class="editSpan remove"><a href="javascript:void(0)" @click="removeReason(1,i)"><i class="icon iconRemove"></i>删除</a></span>
									</td>
								</tr>
								<tr>
									<td class="addTd" colspan="4">
										<el-button :disabled="readonly" type="primary" @click="addReason(1)">+ 新增一条超期原因</el-button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div v-if="houseMeasureData.orderInfo.houseTypeName==='精装' && orderType !==2" class="info-part">
				<div class="info-part-inner">
					<h3>房屋类型判断</h3>
					<div class="tableBox">
						<table class="modtable supplierTable">
							<thead>
								<tr>
									<th>项目</th>
									<th>内容</th>
									<th>备注说明</th>
									<th>分数</th>
									<th>打分</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(item,k) in formSend.houseTypeJson" :key="k">
									<td>{{item.project}}</td>
									<td>{{item.content}}</td>
									<td>{{item.remark}}</td>
									<td>{{item.point}}</td>
									<td>
										
										<el-form-item
											:prop="'houseTypeJson.'+k+'.pointT'"
											:rules="[
												{required:true,message:'请打分',trigger:'change'},
											]">
											<el-radio-group :disabled="readonly" v-model="item.pointT">
												<el-radio  label="0">0</el-radio>
												<el-radio  label="1">1</el-radio>
											</el-radio-group>
										</el-form-item>
										
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div class="clearfix tatolBox">
					<div class="fr">
						<span class="instruction">说明：上述5项中，分数合计>=5，则一律为老旧房</span>
						<span>房屋类型：&nbsp;<i class="result_i">{{points<5?'精装':'毛坯'}}</i></span>
						<span class="all">总计分数：&nbsp;<i class="result_i">{{points}}</i></span>
					</div>
				</div>
			</div>
			<div class="btn-wrap">
				<button type="button" v-if="!readonly && (this.orderFlow >=4 || this.orderFlow===0)" @click="next('formSend')" class="btn btn-primary" v-text="orderType ===2?'保存':'保存并下一步'"></button>
			</div>
		</el-form>
	</div>
</template>
<script type="text/javascript">
import { createNamespacedHelpers } from 'vuex';
const { mapGetters, mapActions } = createNamespacedHelpers('measureAdd');
import {
  setHouseMeasure_1,
  setHouseMeasure_2
} from "../../api/housemeasuremgmt";
const exceedTypes=[{name:'量房超期',value:0,title:'量房'},{name:'开工超期',value:1,title:'开工'},{name:'竣工超期',value:2,title:'竣工'}]


let reasonsTemplate = {exceedCause:'',exceedDay:'',exceedRemark:'',exceedType:''};
	export default{
		name:'houseMeasure',
		props:['pkId','addPageId','readonly','orderFlow','orderType'],
		data(){
			var checkNum=(rule , value, cb) =>{
				
				if(value===''){                                                                       `	`
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
			return {
				pageId:'',
				validating:false,//是否触发过验证
				dataHandle:new DataHandle(),
				points:0,
				rules:{
					checkNum:{validator:checkNum,trigger:'blur'},
					needSel:{validator:needSel,trigger:'change'}
				},
				timeEnd: {
					disabledDate:(time) => {
						let boardDateStart = this.formSend.houseReserveDate;
						if (!!boardDateStart) {
							return time.getTime() < boardDateStart;
						}  	
					}
				},
				timeStart: {
					disabledDate:(time) => {
						let boardDateEnd = this.formSend.startDate;
						if (!!boardDateEnd) {
							return time.getTime() > boardDateEnd;
						}  	
					}
				},
				exceedCauseList:[{name:'物业原因',value:0},{name:'管家原因',value:1},{name:'遗留物品没搬走',value:2},{name:'供应商原因',value:3},{name:'系统原因',value:4},{name:'配置原因',value:5}],
			}
		},
		computed:{
			...mapGetters({
				houseMeasureData:'houseMeasureData',
				amountpkId:'amountpkId',
			}),
			formSend(){
				this.houseMeasureData.formSend.houseReserveDate = this.houseMeasureData.formSend.houseReserveDate || new Date(this.houseMeasureData.orderInfo.rentStartDate - 0 )
				return this.houseMeasureData.formSend
			},
			measureOutDay:function(){
				var mStart = this.dataHandle.getStamp(this.formSend.houseReserveDate);
				var rStart= this.houseMeasureData.orderInfo.rentStartDate;
				if(!!mStart && !!rStart){
					return Math.ceil((mStart - rStart)/1000/3600/24);
				}else{
					return 0
				}
			},
			workOutDay:function(){
				var mStart = this.dataHandle.getStamp(this.formSend.houseReserveDate);
				var wStart= this.dataHandle.getStamp(this.formSend.startDate);
				if(!!mStart && !!wStart){
					return Math.ceil((wStart - mStart)/1000/3600/24);
				}else{
					return 0
				}
			},
			expectCircle:function(){
				//退租预计周期为10天
				if(this.houseMeasureData.orderInfo.orderType === 2){
					return '10天'
				}
				return this.houseMeasureData.orderInfo.houseTypeName === '精装'?'10天':'21天'
			},
			jdDay:function(){
				
				if(this.expectCircle === undefined || !this.formSend.houseReserveDate){
					return '---'
				}
				var circle = this.expectCircle==='10天'?10:21;
				var stamp=new Date(this.formSend.houseReserveDate).getTime() + circle*24*3600*1000;
				return (new Date()).getStampDate(stamp);	
			}
		},
		watch:{
			formSend:{
				handler:function(){
					var points=0;
					if(this.formSend.houseTypeJson === undefined){
						this.points=points;
						return;
					}
					for(let i of this.formSend.houseTypeJson){
						if(i.pointT==='1'){
							points+=1;
						}
					}
					this.points=points;
				},
				deep:true,
			}
		},
		methods:{
			...mapActions([
				'getHouseMeasure'
			]),
			addReason(type){
				reasonsTemplate['exceedType']=type;
				type===0?
					this.formSend.measureCauseInfos.push({ ...reasonsTemplate }):
					this.formSend.startCauseInfos.push({ ...reasonsTemplate });
			},
			removeReason(type,i){
				if(type === 0){
					this.formSend.measureCauseInfos.splice(i,1);
				}else{
					this.formSend.startCauseInfos.splice(i,1);
				}
			},
			set_1(data,type){
				setHouseMeasure_1(
					data,
					providers => {
						this.$message({type:'success',message: "量房信息录入成功！"});
						this.getHouseMeasure(this.pkId);
						if(type === 'OUT'){
							this.$store.dispatch("itemArrRemove", {
								id: this.$route.name,
								to: {
									id: "houseMeasureQuery",
									name: "量房订单查询",
									params: {updateId:(new Date()).getTime()}
								}
							});
						}else{
							this.$emit('next','houseMsg');
						}
						
					},
					(message) => this.$message({ type: "error", message:"量房信息录入失败！" })
				);
			},
			set_2(data,type){
				data['pkId']=this.amountpkId;
				setHouseMeasure_2(
					data,
					providers => {
						this.$message({type:'success',message: "量房信息编辑成功！"});
						if(type === 'OUT'){
							this.$store.dispatch("itemArrRemove", {
								id: this.$route.name,
								to: {
									id: "houseMeasureQuery",
									name: "量房订单查询",
									params: {updateId:(new Date()).getTime()}
								}
							});
						}else{
							this.$emit('next','houseMsg');
						}
					},
					(message) => this.$message({ type: "error", message:"量房信息设置失败！" })
				);
			},
			next(formName){
				this.$refs[formName].validate((valid) => {
					
					if(valid){
						
						var character='';
						for(let i of this.formSend.houseTypeJson){
							character+=i['pointT'];
						}
						this.formSend.character=character;
						var data=JSON.parse(JSON.stringify(this.formSend));
						data['startDate']=this.dataHandle.getStamp(data['startDate']);
						data['houseReserveDate']=this.dataHandle.getStamp(data['houseReserveDate']);

						
						if(this.measureOutDay<1){
							//量房未超期
							data['measureCauseInfos']=[];
						}
						if(this.workOutDay<2){
							//开工未超期
							data['startCauseInfos']=[];
						}
						if(!data['measureCauseInfos']){
							data['measureCauseInfos']=[];
						}
						data['causeInfos']=data['measureCauseInfos'].concat(data['startCauseInfos']);
						delete data['measureCauseInfos']
						delete data['startCauseInfos']
						delete data['houseTypeJson'];

						if(this.houseMeasureData.orderInfo.houseTypeName==='精装' && this.points>=5){
							this.$message({type:'warning',message:'精装房评分大于等于5分，无法录入！'})
							return
						}
						data['orderId']=this.pkId;
						if(this.orderType === 2){
							//退租订单
							this.orderFlow<1?this.set_1(data,'OUT'):this.set_2(data,'OUT');
						}else{
							//非退租订单
							this.orderFlow<1?this.set_1(data,'NOOUT'):this.set_2(data,'NOOUT');
						}	
					}else{
						return false;
					}
				})
			}
		},
		activated(){
			if(this.pageId !==this.addPageId){
				this.pageId=this.addPageId;
				if(!!this.$refs['formSend']){
					this.$refs['formSend'].resetFields();
				}
				this.getHouseMeasure(this.pkId);
				
			}
		}
	}
</script>
<style type="text/css">
	/* 个人照片上传 */
	.avatar-uploader .el-upload {
	  border: 1px dashed #d9d9d9;
	  border-radius: 6px;
	  cursor: pointer;
	  position: relative;
	  overflow: hidden;
	}
	.avatar-uploader .el-upload:hover {
	  border-color: #20a0ff;
	}
	.avatar-uploader-icon {
	  font-size: 28px;
	  color: #8c939d;
	  width: 178px;
	  height: 178px;
	  line-height: 178px;
	  text-align: center;
	}
	.avatar {
	  width: 178px;
	  height: 178px;
	  display: block;
	}
	.info-part h3 .tip{
		font-size: 12px;
		color: #8391a5;
		margin-top: 7px;
		display: inline-block;
		font-weight: normal;
		padding-left: 20px;
	}
	li.nowAddress div.el-select{
		width:calc(50% - 25px);
		margin-right: 25px;
	}
	li.nowAddress .inp-box>input{
		width:50%;
	}
	/* 媒体查询 */
	@media screen and (max-width: 1454px) {
    	.addPages .info-part ul li{
    		width: 33.333%;
    	}
	}
</style>
<style scoped>
.addPages .info-part ul li.address  {
   width:50%;
}
.addPages .tableBox{
	padding:0 2%;
	box-sizing:border-box;
}
.addPages .tableBox td.addTd {
  text-align: left;
  padding-left:50px;
}
.addPages .tableBox h4{
	font-size:14px;
	color:#333;
	line-height:45px;
	height: 45px;
}
.addPages .tableBox table tr th:first-child{
	text-align:left;
	padding-left:20px;
}
.addPages .tableBox .icon{
	display: inline-block;
	width:18px;
	height: 18px;
	vertical-align:-2px;
	margin:0 3px;
}
.addPages .tableBox .icon.warning{
	background:url(/static/images/warning.png) no-repeat;
}
.houseMeasure .tatolBox{
	padding:25px 30px;
	color: #999;
}
.houseMeasure .tatolBox .result_i{
	font-size:24px;
	color:#d0021b;
}
.houseMeasure .tatolBox .instruction{
	padding-right:55px;
}
.houseMeasure .tatolBox .result_i{
	padding-right:30px;
}




</style>
