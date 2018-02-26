<template>
	<div :id="pageId" class="personnelChange">
		<div class="operate-content">
			<h3>变动前信息</h3>
			<div class="msg-wrap">
				<ul class="content-ul">
					<li><p>人员编码：</p><div class="inp-box">{{form.employeeId}}</div></li><li><p>人员姓名：</p><div class="inp-box">{{form.realName}}</div></li><li><p>部门：</p><div class="inp-box">{{form.departmentName}}</div></li><li><p>岗位：</p><div class="inp-box">{{form.position}}</div></li><li><p>岗位等级：</p><div class="inp-box">{{form.positionGrade}}</div></li><li><p>入职日期：</p><div class="inp-box">{{form.boardDate}}</div></li><li class="long"><p>在岗生效日期：</p><div class="inp-box">{{form.guardDate}}</div></li><li><p>司龄(月)：</p><div class="inp-box">{{companyMonths}}</div></li><li class="long"><p>在岗时间(月)：</p><div class="inp-box">{{jobMonths}}</div></li>							
				</ul>
			</div>
			<h3>变动类型</h3>
			<div class="msg-wrap edit">
				<ul class="content-ul">
					<li>
						<p class="tit"><i class="need">*</i>变动类型：</p>
						<div class="inp-box changeType">
							<el-select class="warning" v-model="formSend.changeType" @change="change('.changeType',$event)" placeholder="请选择">
						  		<el-option :disabled="item.value==1&&positive" v-for="(item,key) in changeTypes" :label="item.name" :value="item.value" :key="key"></el-option>
							</el-select>
							<p class="errorMsg"></p>
						</div>
					</li>
				</ul>
			</div>
			<h3>变动后信息</h3>
			<div class="msg-wrap edit">
				<ul class="content-ul">
					<li>
						<p class="tit"><i class="need">*</i>部门：</p>
						<div class="inp-box departmentId">
							<el-cascader change-on-select :options="departoptions" v-model="departmentIds" @change="handleChange"></el-cascader>
							<p class="errorMsg"></p>
						</div>
					</li><li>
						<p class="tit"><i class="need">*</i>岗位：</p>
						<div class="inp-box positionId">
							<el-select class="warning" @change="change('.positionId',$event)" v-model="formSend.positionId" placeholder="请选择">
						  <el-option v-for="(item,key) in jobs" :label="item.positionName" :value="item.id" :key="key"></el-option>
							</el-select>
							<p class="errorMsg"></p>
						</div>
					</li><li>
						<p class="tit"><i class="need">*</i>岗位等级：</p>
						<div class="inp-box positionGrade">
							<el-select v-model="formSend.positionGrade" @change="change('.positionGrade',$event)" placeholder="请选择">
                    			<el-option v-for="(item,key) in positionGrades" :label="item.name" :value="item.value" :key="key"></el-option>
                			</el-select>
                			<p class="errorMsg"></p>
						</div>
					</li><li>
						<p class="tit"><i class="need">*</i>上司：</p>
						<div class="inp-box parentId">
							<el-select filterable class="warning" @change="change('.parentId',$event)" v-model="formSend.parentId" placeholder="请选择">
						  <el-option v-for="(item,key) in bosses" :label="item.realName" :value="item.id" :key="key"></el-option>
							</el-select>
							<p class="errorMsg"></p>
						</div>
					</li><li><p><i class="need">*</i>生效日期：</p><div class="inp-box guardDate"><el-date-picker :picker-options="pickerOptions0" v-model="formSend.guardDate" type="date" placeholder="选择日期" @change="change('.guardDate',$event)"></el-date-picker>
					<p class="errorMsg"></p>
					</div>
						
					</li>		
				</ul>
				<p class="p-textarea">
					<span class="tit">变动说明：</span>
					<textarea v-model="formSend.remark" placeholder="请输入"></textarea>
				</p>
			</div>

			<div class="btn-wrap">
				<button @click="makeSure" class="btn btn-primary">确认</button>
				<button @click="reset" class="btn btn-reset">取消</button>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return{
				pageId:'',
				jobs:[],
				departoptions:[],
				bosses:[],
				positionGrades:[{name:'实习生',value:1},{name:'普通',value:2},{name:'高级',value:3},{name:'资深',value:4}],
				changeTypes:[{name:"转正",value:1},{name:"晋升",value:2},{name:"调动",value:3},{name:"降职",value:4}],
				pickerOptions0: {
			        disabledDate(time) {
			          return time.getTime() > Date.now() - 8.64e7 + 3600*1000*24;
			        }
				},
				form:{
					employeeId:'',//人员编码
					realName:'',//人员姓名
					departmentName:'',//部门名字
					position:'',//岗位名字
					positionGrade:'',//岗位等级
					boardDate:'',//入职日期
					guardDate:'',//在岗生效日期
				},
				companyMonths:'---',
				jobMonths:'---',
				departmentIds:[],
				formSend:{
					changeType:'',
					departmentId:'',
					positionId:'',
					positionGrade:'',
					parentId:'',
					guardDate:'',
					remark:''
				},
				manId:'',
				positive:''
			}
		},
		methods:{
			getData(personId){
				var that=this;
				this.getAjax(this.host,'/employeeInfo/findUserInfoDetailById.json',{id:personId}).success(function(r){
					if (r.code==0) {	
					  that.form.departmentName=getValue(r.data.departmentName); //部门名字
					  that.departmentIds=getAttachArr(r.data.departmentIds); //部门id
					  that.positive=r.data.positive;
					  if (!!r.data.departmentIds && !!r.data.departmentIds.length!==0) {
					  	//倒序部门id
					  		that.getAllBoss(r.data.departmentIds[r.data.departmentIds.length-1]);
					  	  	var arrDepart=that.departoptions;
					  	  	that.departoptionId=r.data.departmentIds[0];
					  		for(var i=0;i<arrDepart.length;i++){
					  			if (arrDepart[i].value==that.departoptionId) {
					  				that.jobs=arrDepart[i].positionList;
					  				break;
					  			}
					  		}
					  }
					  
		              if (!!r.data.userInfo) {
		              	that.form.employeeId=getValue(r.data.userInfo.employeeId); //人员编码
		              	that.form.realName=getValue(r.data.userInfo.realName);//姓名
		              	
		              	that.form.position=getValue(r.data.userInfo.position); //岗位名字 	

		              	that.formSend.positionId=getNumber(r.data.userInfo.positionId);//岗位id         	  	
		             	that.formSend.departmentId=getNumber(r.data.userInfo.departmentId);//部门id   
		             	that.formSend.parentId=getNumber(r.data.userInfo.parentId);//上司
		              }
		              if (!!r.data.userInfoDetail) {
		              	that.form.boardDate=getValue(r.data.userInfoDetail.boardDate);
		              	that.form.guardDate=getValue(r.data.userInfoDetail.guardDate);
		              	var positionGradeValue=getNumber(r.data.userInfoDetail.positionGrade);
		              	if(positionGradeValue===''){
		              		that.form.positionGrade='---';
		              		that.formSend.positionGrade='';
		              	}else{
		              		that.form.positionGrade=that.positionGrades[getNumber(positionGradeValue)-1].name;
		              		that.formSend.positionGrade=getNumber(positionGradeValue);
		              	}
		              	//获取司龄和在岗时间
		              	that.companyMonths=r.data.userInfoDetail.boardDate?getMonth(that.form.boardDate):that.companyMonths;
		              	that.jobMonths=r.data.userInfoDetail.guardDate?getMonth(that.form.guardDate):that.jobMonths;

		     
		              }

					}else{
						that.$message.error(r.message);
					}
				}).error(function(e){
					that.$message.error('服务器错误');
				})

			},
			getDeparts(personId){
				//获取部门及岗位信息
				var that=this;
				this.getAjax(this.host,'/organ/queryDepartmentListVo.json').success(function(r){
					if (r.code==0) {
						that.departoptions=r.data;
						that.getData(personId);
					}else{
						that.$message.error(r.message)
					}
				}).error(function(e){
					that.$message.error('服务器错误')
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
					that.$message.error('服务器错误');
				})
			},
			handleChange(arr){
				this.change('.departmentId',arr[0]);
				this.getAllBoss(arr[arr.length-1]);
				this.formSend.parentId=''
				if (this.departoptionId==arr[0]) {
					return
				}

				var arrDepart=this.departoptions;
				this.departoptionId=arr[0];
				for(var i=0;i<arrDepart.length;i++){
					if (arrDepart[i].value==this.departoptionId) {
						this.jobs=arrDepart[i].positionList;
						this.formSend.positionId='';
						return
					}
				}	
			},
			change(selector,value){
		        if (!!value || value===0) {
		          //有数据
		          $('#'+this.pageId+' '+selector).find('input').removeClass('error').end().find('.errorMsg').text('');
		        }else{
		          $('#'+this.pageId+' '+selector).find('input').addClass('error').end().find('.errorMsg').text('输入不能为空！');
		        }
		     },
			makeSure(){
				var data=JSON.parse(JSON.stringify(this.formSend));
				var that=this;
				data['id']=this.manId;
				data['guardDate']=getDate(data['guardDate']);
				data['departmentId']=this.departmentIds[this.departmentIds.length-1]
				var flag=false;
				for(var i in data){
				  if(!!data[i]===false && data[i]!==0){
				  	if (i==='remark' || i==='id') {
				  		continue;
				  	}
				    flag=true; 
				    $('#'+this.pageId).find('.'+i+' input').addClass('error').parents('.inp-box').find('.errorMsg').text('输入不能为空！');
				    break;
				  }
				}
				if (flag) {
				  return
				}
				this.getAjax(this.host,'/employeeInfo/changePersonal.json',data).success(function(r){
					if (r.code===0) {
						that.$message('人事变更成功！');
						that.reset()
					}else{
						that.$message.error(r.message);
					}
				}).error(function(e){
					that.$message.error('服务器错误');
				});
			},
			reset(){
				this.$store.dispatch('itemArrAdd',{component:'query',id:'query'});
				this.$store.state.mutations.currentViewId='query';
				var $target=$('#side-menu').find('a.J_menuItem[data-href="query"]');
				$target.trigger('click');
				var dataId=this.pageId;
				var $close=$('.page-tabs-content a[data-id='+dataId+'] .fa-times-circle');
				$close.trigger('click');
			}
		},
		created:function(){
			this.pageId=this.$store.state.mutations.currentViewId;
		},
		mounted:function() {
			var personId=this.$store.state.mutations.personId;
			this.manId=personId;
			//获取部门结构
			this.getDeparts(personId);		
		}
	}
function getMonth(preDate){
var nowYears=new Date().getFullYear();
var nowMonth=new Date().getMonth()+1;
var preYears=new Date(preDate).getFullYear();
var preMonth=new Date(preDate).getMonth()+1;
return (nowYears-preYears)*12+nowMonth-preMonth;
}
function getValue(value){
	return !!value?value:'---'
}
function getNumber(value){
	if (value==='0' || value ===0) {
		return 0
	}
	return !!value?parseInt(value):'';
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
<style type="text/css" scoped>
.need{color:red;}
.personnelChange{height: 100%;background-color: #fff;overflow-y: scroll;}
.inp-box{position: relative;}
.inp-box .errorMsg{position: absolute;top:27px;color: red;}

.operate-content .msg-wrap.edit .content-ul li{padding:10px 0;padding-right: 3%; }
.p-textarea{margin-top: 10px;}

</style>
<style type="text/css">
span.el-cascader .el-input__inner.error{border-color: red;}

</style>