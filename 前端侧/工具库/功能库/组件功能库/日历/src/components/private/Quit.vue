<template>
	<div :id="pageId" class="demotionPage">
		<div class="operate-content">
			<h3>离职确认信息</h3>
			<div class="msg-wrap">
				<ul class="content-ul">
					<li><p>人员编码：</p><div class="inp-box">{{form.employeeId}}</div></li><li><p>人员姓名：</p><div class="inp-box">{{form.realName}}</div></li><li><p>部门：</p><div class="inp-box">{{form.departmentName}}</div></li><li><p>岗位：</p><div class="inp-box">{{form.position}}</div></li><li><p>岗位等级：</p><div class="inp-box">{{form.positionGrade}}</div></li><li><p>入职日期：</p><div class="inp-box">{{form.boardDate}}</div></li><li class="long"><p>在岗时间(月)：</p><div class="inp-box">{{jobMonths}}</div></li><li class="long"><p>在岗生效日期：</p><div class="inp-box">{{form.guardDate}}</div></li><li><p>司龄(月)：</p><div class="inp-box">{{companyMonths}}</div></li><li><p><i class="need">*</i>离职日期：</p><div class="inp-box dimissionDate"><el-date-picker @change="change('.dimissionDate',$event)" :picker-options="pickerOptions0" v-model="formSend.dimissionDate" type="date" placeholder="选择日期"></el-date-picker><p class="errorMsg"></p></div></li><li><p><i class="need">*</i>离职原因：</p><div class="inp-box dimissionType">
					<el-select @change="change('.dimissionType',$event)" v-model="formSend.dimissionType" placeholder="请选择">
                    <el-option v-for="(item,key) in quitReasons" :label="item.name" :value="item.value" :key="key"></el-option>
                </el-select><p class="errorMsg"></p></div></li>
				</ul>
				<p class="p-textarea">
					<span class="tit">离职说明：</span>
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
				positionGrades:[{name:'实习生',value:1},{name:'普通',value:2},{name:'高级',value:3},{name:'资深',value:4}],
				quitReasons:[{name:'家庭因素',value:1},{name:'身体因素',value:2},{name:'职业发展',value:3},{name:'薪资过低',value:4},{name:'发展空间',value:5},{name:'工作环境',value:6},{name:'劝退',value:7},{name:'辞退',value:8},{name:'其他',value:9}],
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
				formSend:{
					dimissionDate:'',
					dimissionType:1,
					remark:''
				},
				manId:''
			}
		},
		methods:{
			getData(personId){
				var that=this;
				this.getAjax(this.host,'/employeeInfo/findUserInfoDetailById.json',{id:personId}).success(function(r){
					if (r.code==0) {
					 that.form.departmentName=getValue(r.data.departmentName); //部门名字
		              if (!!r.data.userInfo) {
		              	that.form.employeeId=getValue(r.data.userInfo.employeeId); //人员编码
		              	that.form.realName=getValue(r.data.userInfo.realName);//姓名
		              	that.form.position=getValue(r.data.userInfo.position); //岗位名字              	
		              }
		              if (!!r.data.userInfoDetail) {
		              	that.form.boardDate=getValue(r.data.userInfoDetail.boardDate);
		              	that.form.guardDate=getValue(r.data.userInfoDetail.guardDate);
		              	var positionGradeValue=getValue(r.data.userInfoDetail.positionGrade);
		              	if(positionGradeValue==='---'){
		              		that.form.positionGrade='---';
		              	}else{
		              		that.form.positionGrade=that.positionGrades[getNumber(positionGradeValue)-1].name;
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
				data['dimissionDate']=getDate(data['dimissionDate']);
				data['id']=this.manId;
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
				this.getAjax(this.host,'/employeeInfo/dimission.json',data).success(function(r){
					if (r.code===0) {
						that.$message('离职成功！');
						that.reset()
					}else{
						that.$message.error(r.message);
					}
				}).error(function(e){
					that.$message.error('服务器错误')
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
			//获取离职信息
			this.getData(personId);
			
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
function getValue(value){
	return !!value?value:'---'
}
function getNumber(value){
	return !!value?parseInt(value):'';
}
function getDate(value){
  if (!!value) {
    return (new Date()).getBJDate(value);
  }else{
    return ''
  }
}
</script>
<style type="text/css" scoped>
.need{color:red;}
	.demotionPage{height: 100%;background-color: #fff;overflow-y: scroll;}


.inp-box{position: relative;}
.inp-box .errorMsg{position: absolute;top:27px;color: red;}

.operate-content .msg-wrap.edit .content-ul li{padding:10px 0;padding-right: 3%; }
.p-textarea{margin-top: 13px;}
span.el-cascader .el-input, span.el-cascader .el-input__inner.error{border-color:red;}
</style>