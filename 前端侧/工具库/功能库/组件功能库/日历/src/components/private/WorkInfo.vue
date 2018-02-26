<template>
	<div :id="pageId" class="addPersonPages">
		<div class="info-part">
			<h3>部门岗位信息</h3>
			<ul class="clearfix">
				<li class="departmentId">
					<p class="name"><i class="need">*</i>部门:</p><div class="inp-box">
				           <el-cascader :readonly="readOnly" change-on-select :options="departoptions" v-model="formSend.departmentId" @change="handleChange"></el-cascader>
				           <div class="warning-info"></div>
					</div>
					
				</li>
				<li class="positionId">
					<p class="name"><i class="need">*</i>岗位:</p><div class="inp-box">
						<el-select :readonly="readOnly" @change="change('.positionId',$event)" :disabled="jobDiabled" v-model.trim="formSend.positionId" placeholder="请选择">
							<el-option  v-for="item in jobs" :key="item.value" :label="item.positionName" :value="item.id"></el-option>
						</el-select>
						<div class="warning-info"></div>
					</div>
					
				</li>
				<li class="positionGrade">
					<p class="name"><i class="need">*</i>岗位等级:</p><div class="inp-box">
						<el-select :readonly="readOnly" @change="change('.positionGrade',$event)" v-model.trim="formSend.positionGrade" placeholder="请选择">
							<el-option  v-for="item in positionGrades" :key="item.value" :label="item.name" :value="item.value"></el-option>
						</el-select>
						<div class="warning-info"></div>
					</div>
					
				</li>
				<li class="parentId">
					<p class="name"><i class="need">*</i>上司:</p><div class="inp-box">
						<el-select filterable :readonly="readOnly" @change="change('.parentId',$event)" :disabled="bossDisabled" v-model.trim="formSend.parentId" placeholder="请选择">
							<el-option  v-for="item in bosses" :key="item.id" :label="item.realName" :value="item.id"></el-option>
						</el-select>
						<div class="warning-info"></div>
					</div>
					
					
				</li>
				<li v-if="!isAddPage">
					<p class="name">分机号:</p><div class="inp-box">
						<input :readonly="readOnly" v-model.trim="tel" type="text" placeholder="请输入">
					</div>
					<div class="warning-info"></div>
				</li>
			</ul>
		</div>
		<div class="info-part">
			<h3>在职信息</h3>
			<ul class="clearfix">
				<li class="boardDate">
					<p class="name"><i class="need">*</i>入职日期:</p><div class="inp-box">
						<el-date-picker :readonly="readOnly" :picker-options="pickerOptions"  @change="getJobDate($event)" v-model="formSend.boardDate" type="date" placeholder="选择日期"></el-date-picker>
						<div class="warning-info"></div>
					</div>
				</li>
				<li class="long guardDate">
					<p class="name">在岗生效日期:</p><div class="inp-box">
						<el-date-picker disabled="disabled" :readonly="readOnly" :picker-options="pickerOptions"  @change="getCompanyDate($event)" v-model="formSend.guardDate" type="date" placeholder="选择日期"></el-date-picker>
						<div class="warning-info"></div>
					</div>
					
				</li>
				<li class="middle">
					<p class="name"><i class="need">*</i>司龄（月）:</p><div class="inp-box">
						<input :readonly="readOnly" v-model.trim="companyDate"  disabled type="text" placeholder="请输入">
					</div>
				</li>
				<li class="long">
					<p class="name"><i class="need">*</i>在岗时间（月）:</p><div class="inp-box">
						<input :readonly="readOnly" v-model.trim="jobDate"  disabled type="text" placeholder="请输入">
					</div>
				</li>
				<li>
					<p class="name">转正日期:</p><div class="inp-box">
						<el-date-picker :readonly="readOnly"  v-model="positiveDate" type="date" placeholder="选择日期"></el-date-picker>
					</div>
				</li>
				
			</ul>
		</div>
		<div class="info-part">
			<h3>履历信息</h3>
			<ul class="clearfix">
				<li class="long">
					<p class="name">首次参加工作日期:</p><div class="inp-box">
						<el-date-picker :readonly="readOnly" :picker-options="pickerOptions"	v-model="formSend.firstWorkDate"  type="date" placeholder="选择日期"></el-date-picker>
						<div class="warning-info"></div>
					</div>
					
				</li>
				<li class="middle">
					<p class="name">原工作单位:</p><div class="inp-box">
						<input :readonly="readOnly" type="text" placeholder="请输入" v-model.trim="formSend.originalUnitName">
						<div class="warning-info"></div>
					</div>
					
				</li>
				<li class="long">
					<p class="name">原工作开始日期:</p><div class="inp-box">
						<el-date-picker :readonly="readOnly" :picker-options="pickerOptions"	v-model="formSend.originalStartDate" type="date" placeholder="选择日期"></el-date-picker>
						<div class="warning-info"></div>
					</div>
					
				</li>
				<li class="long">
					<p class="name">原工作结束日期:</p><div class="inp-box">
						<el-date-picker :readonly="readOnly" :picker-options="pickerOptions"	v-model="formSend.originalEndDate" type="date" placeholder="选择日期"></el-date-picker>
						<div class="warning-info"></div>
					</div>
				</li>
				<li class="long">
					<p class="name">原工作单位职务:</p><div class="inp-box">
						<input :readonly="readOnly" type="text" placeholder="请输入" v-model.trim="formSend.originalPosition">
						<div class="warning-info"></div>
					</div>
					
				</li>
			</ul>	
		</div>
		<div class="info-part">
			<h3>合同信息</h3>
			<ul class="clearfix">
				<li>
					<p class="name">合同期止:</p><div class="inp-box">
						<el-date-picker :readonly="readOnly"	v-model="formSend.contractAbortDate" type="date" placeholder="选择日期"></el-date-picker>
					</div>
				</li>
				<li>
					<p class="name">续签期止:</p><div class="inp-box">
						<el-date-picker :readonly="readOnly"	v-model="formSend.contractRenewDate" type="date" placeholder="选择日期"></el-date-picker>
					</div>
				</li>
			</ul>	
		</div>
		<div class="btn-wrap">
			<button v-if="!readOnly" @click="next('attachmentInfo')" class="btn btn-primary" v-text="isAddPage?'保存并下一步':'保存'"></button>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		props:['isAddPage','addpersonId','personId','currentViewId','readOnly'],
		data(){
			return {
				 pickerOptions:{
		          disabledDate(time) {
		            return time.getTime() >= Date.now() - 8.64e7+3600*1000*24;
		          }
		        },
		        pageId:"",
		        companyDate:'',
		        jobDate:'',
				formSend:{
					id:'',          //ID
					departmentId:[],//部门ID
					positionId:'',//岗位ID
					parentId:'',//上司ID
					boardDate:'',//入职日期
					guardDate:'',//在岗生效时间
					firstWorkDate:'',//首次工作日期
					originalUnitName:'',//原工作单位名称
					originalStartDate:'',//原单位工作开始日期
					originalEndDate:'',//原工作结束日期
					originalPosition:'',//原单位职务
					contractAbortDate:'',//合同终止日期
					contractRenewDate:'',//合同续签中止日期
					positionGrade:''//岗位等级
				},
				tel:'',//分机号
				positiveDate:'',//转正时间
				option0:[{value:0,label:'女'},{value:1,label:'男'}],
				option1:[{value:false,label:'未婚'},{value:true,label:'已婚'}],
				option2:[{value:0,label:'共青团员'},{value:1,label:'共产党员'},{value:2,label:'群众'}],
				option3:[{value:0,label:'城市户口'},{value:1,label:'农村户口'}],
				positionGrades:[{name:'实习生',value:1},{name:'普通',value:2},{name:'高级',value:3},{name:'资深',value:4}],
				bossArr:[{}],
				bosses:[],
				jobs:[],
				jobDiabled:true,
				bossDisabled:true,
				departoptions:[],
				departoptionId:'',
				pickerOptions0: {
		          disabledDate(time) {
		            return time.getTime() < Date.now() - 8.64e7;
		          }
		        },
				canSubmitAlone:true,
				activeWrong:false
			}	
		},
		methods:{
			getCompanyDate($event){
				this.change('.guardDate',$event);
				var months=getMonth($event);
				this.jobDate=months;
			},
			getJobDate($event){

				if (this.isAddPage) {
					this.formSend.guardDate=$event;
				}

				this.change('.boardDate',$event);
				var months=getMonth($event);
				this.companyDate=months;
			},
			getWorkInfo(personId){
				//编辑时候，获取页面信息。
				var that=this;
				this.getAjax(this.host,'/employeeInfo/findUserInfoDetailById.json',{id:personId}).success(function(r){
		            if (r.code==0) {
		            //适配
			          that.formSend.departmentId=getAttachArr(r.data.departmentIds);//部门id
			          if (!!r.data.departmentIds && !!r.data.departmentIds.length!==0) {
			          		//数组第一个为一级部门
			          		that.getAllBoss(r.data.departmentIds[r.data.departmentIds.length-1]);
							var arrDepart=that.departoptions;
							//数组最后一个为末级部门
							that.departoptionId=r.data.departmentIds[0];
							for(var i=0;i<arrDepart.length;i++){
								if (arrDepart[i].value==that.departoptionId) {
									that.jobs=arrDepart[i].positionList;
									break;
								}
							}	
			          }
		              if (!!r.data.userInfo) {
		              	that.formSend.positionId=getNumber(r.data.userInfo.positionId);//岗位ID
		              	that.formSend.parentId=getValue(r.data.userInfo.parentId); //上司id
		              	that.tel=getValue(r.data.userInfo.tel); //分机号
		              	
		              }
		              if (!!r.data.userInfoDetail) {
		              	  that.formSend.boardDate=getValue(r.data.userInfoDetail.boardDate);//入职日期
			              that.formSend.guardDate=getValue(r.data.userInfoDetail.guardDate);//在岗生效时间
			              that.formSend.firstWorkDate=getValue(r.data.userInfoDetail.firstWorkDate);//首次工作日期
			              that.formSend.originalUnitName=getValue(r.data.userInfoDetail.originalUnitName);//原工作单位名称
			              that.formSend.originalStartDate=getValue(r.data.userInfoDetail.originalStartDate);//原单位工作开始日期
			              that.formSend.originalEndDate=getValue(r.data.userInfoDetail.originalEndDate);//原工作结束日期
			              that.formSend.originalPosition=getValue(r.data.userInfoDetail.originalPosition); //原单位职务
			              that.formSend.contractAbortDate=getValue(r.data.userInfoDetail.contractAbortDate);//合同终止日期
			              that.formSend.contractRenewDate=getValue(r.data.userInfoDetail.contractRenewDate);//合同续签中止日期
			              that.formSend.positionGrade=getNumber(r.data.userInfoDetail.positionGrade);  //岗位等级
			              that.positiveDate=getValue(r.data.userInfoDetail.positiveDate); //转正日期
	              		}         
		            }else{
		            	that.$message.error(r.message);
		            }       
		        }).error(function(e){
		          that.$message.error('服务器错误')
		        })
			},
			getDeparts(){
				//获取部门信息
				var that=this;
				this.getAjax(this.host,'/organ/queryDepartmentListVo.json').success(function(r){
					if (r.code==0) {

						that.departoptions=r.data;
						//初始化数据请求成功后请求展示数据。	
						var personId=that.personId;
						if (that.isAddPage) {
							//新增页面
							
						}else{
							//编辑页面	
							that.getWorkInfo(that.personId);
							that.bossDisabled=false;
							that.jobDiabled=false;
						}
					}else{
						that.$message.error(r.message)
					}
				}).error(function(e){
					that.$message.error('服务器错误')
				})
			},
			saveWorkInfo(str){
				//保存工作信息

				var data=JSON.parse(JSON.stringify(this.formSend)),that=this;
				if (!this.isAddPage) {
					//编辑页
					data['id']=this.personId;
					data['tel']=this.tel;
					data['positiveDate']=getDate(this.positiveDate);
				}else{
					//新增页
					data['positiveDate']=getDate(this.positiveDate);
					if (!!this.addpersonId) {
						//新增人员信息再次保存
						data['id']=this.addpersonId;

					}
				}
				var departmentId=data['departmentId'][data['departmentId'].length-1];
				data['departmentId']=departmentId;
				data['boardDate']=getDate(data['boardDate']);
				data['guardDate']=getDate(data['guardDate']);
				data['firstWorkDate']=getDate(data['firstWorkDate']);
				data['originalStartDate']=getDate(data['originalStartDate']);
				data['originalEndDate']=getDate(data['originalEndDate']);
				data['contractAbortDate']=getDate(data['contractAbortDate']);
				data['contractRenewDate']=getDate(data['contractRenewDate']);
				this.getAjax(this.host,'/employeeInfo/saveWorkInfo.json',data).success(function(r){

					if (r.code==0) {
						if (that.isAddPage) {
							//新增页
							that.$emit('next',str);
						}else{
							//编辑页
							that.$message('保存成功');
							return
						}
						
					}else{
						that.$message.error(r.message);
					}
				}).error(function(e){
					that.$message.error("服务器错误！");
				})
			},
			getAllBoss(id){
				//根据部门id获取所有员工
				var that=this;
				this.getAjax(this.host,'/employeeInfo/queryUserInfoByDepartmentId.json',{departmentId:id}).success(function(r){
					if (r.code==0) {
						that.bosses=r.data;
					}else{
						that.$message.error(r.message)
					}
				}).error(function(e){
					that.$message.error('服务器错误')
				})
			},
			next(str){
				if (this.readOnly) {
					//只读
					return
				}
				var formSend=this.formSend;
		        for(var i in formSend){
		          if (i==="id") {
		          	continue;
		          }
		          if (i==="guardDate") {
		          	continue;
		          }
		          if (Object.prototype.toString.apply(formSend[i]) === '[object Array]' && formSend[i].length===0) {
		          	$('#'+this.pageId).find('.'+i+' input').addClass('error').parents('.inp-box').find('.warning-info').text('输入不能为空！');
			            break;
		          }else{
		          	if(!!formSend[i]===false && formSend[i]!==0){

			            $('#'+this.pageId).find('.'+i+' input').addClass('error').parents('.inp-box').find('.warning-info').text('输入不能为空！');
			            break;
		          	}
		          }
		          
		        }
				var errorObj=$('#'+this.pageId+' .error');
				if (errorObj.length!==0) {
					errorObj[0].focus();
				}else{
					this.saveWorkInfo(str);
				}
			},
			handleChange(arr){
				this.change('.departmentId',arr[0]);
				this.getAllBoss(arr[arr.length-1]);
				this.formSend.parentId='';
				this.jobDiabled=false;
				this.bossDisabled=false;
				if (this.departoptionId==arr[0]) {
					return
				}
				var arrDepart=this.departoptions;
				this.departoptionId=arr[0];
				for(var i=0;i<arrDepart.length;i++){
					if (arrDepart[i].value==this.departoptionId) {
						this.jobs=arrDepart[i].positionList;
						this.formSend.positionId=''					
						return
					}
				}
			},
			change(selector,value){
		        if (!!value || value===0) {
		          //有数据
		          $('#'+this.pageId+' '+selector).find('input').removeClass('error').end().find('.warning-info').text('');
		        }else{
		          $('#'+this.pageId+' '+selector).find('input').addClass('error').end().find('.warning-info').text('输入不能为空！');
		        }
		     }
		},
		created:function(){
			this.pageId='personInfo'+this.currentViewId;
		},
		mounted:function () {
			this.pageId='workInfo'+this.$store.state.mutations.currentViewId;
  			//获取部门树形结构数据
  			this.getDeparts();
    	}
		
	}

//获取月数 
function getMonth(preDate){
	var nowYears=new Date().getFullYear();
	var nowMonth=new Date().getMonth()+1;
	var preYears=new Date(preDate).getFullYear();
	var preMonth=new Date(preDate).getMonth()+1;
	return (nowYears-preYears)*12+nowMonth-preMonth;
}
//获取
function getNumber(value){
	return !!value?parseInt(value):'';
}
//获取value
function getValue(value){
	return !!value?value:'';
}
function getDate(value){
  if (!!value) {
    return (new Date()).getBJDate(value);
  }else{
    return ''
  }
}

//转换为需要的数组
function getAttachArr(arr){
	if (!!arr && Object.prototype.toString.apply(arr) === '[object Array]') {
		return arr;
	}else{
		return[];
	}
}
</script>


<style type="text/css">
	.inp-box input.error{
		border-color: red;
		box-shadow: 0 0 3px 0 rgba(255,0,0,0.8);
	}
	.inp-box input.error:hover{
		border-color: red;
	}
</style>
