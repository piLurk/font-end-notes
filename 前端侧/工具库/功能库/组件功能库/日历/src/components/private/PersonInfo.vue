<template>
	<div :id="pageId" class="addPersonPages personInfo">
		<div class="info-part">
			<h3>基本信息</h3>
			<ul class="clearfix">
				<li>
					<p class="name"><i class="need">*</i>姓名：</p><div class="inp-box">
				         <input :readonly="readOnly" id="realName" need type="text" @blur="blur([{'fun':'need','params':[]},{'fun':'max','params':[30]}],$event)" placeholder="请输入" v-model.trim="personInfoForm.realName">
				         <div class="warning-info"></div> 
					</div>
					
				</li>
				<li>
					<p class="name"><i class="need">*</i>账号：</p><div class="inp-box">
						<input :readonly="readOnly" :disabled="userNameCan" id="userName" need type="text" @blur="blur([{'fun':'need','params':[]},{'fun':'userName','params':[]},{'fun':'max','params':[30]}],$event)" placeholder="请输入" v-model.trim="personInfoForm.userName">
						<div class="warning-info"></div>
					</div>
				</li>
				<li>
					<p class="name"><i class="need">*</i>邮箱：</p><div class="inp-box">
						<input :readonly="readOnly" :disabled="userNameCan" id="email" need type="text" @blur="blur([{'fun':'need','params':[]},{'fun':'email','params':[]}],$event)" placeholder="请输入" v-model.trim="personInfoForm.email">
						<div class="warning-info"></div>
					</div>
				</li>
				<li>
					<p class="name"><i class="need">*</i>手机号码：</p><div class="inp-box">
						<input :readonly="readOnly" id="mobile" need type="text" @blur="blur([{'fun':'need','params':[]},{'fun':'mobile','params':[]}],$event)" placeholder="请输入" v-model.trim="personInfoForm.telPhone">
						<div class="warning-info"></div>
					</div>
				</li>
				<li>
					<p class="name">民族：</p><div class="inp-box">
						<input :readonly="readOnly" type="text" @blur="blur([{'fun':'max','params':[10]}],$event)" placeholder="请输入" v-model.trim="personInfoForm.nation">
						<div class="warning-info"></div>
					</div>	
				</li>
				<li>
					<p class="name"><i class="need">*</i>身份证号：</p><div class="inp-box">
						<input :readonly="readOnly" need type="text" id="idCard" @blur="blur([{'fun':'need','params':[]},{'fun':'id','params':[]}],$event)" placeholder="请输入" v-model.trim="personInfoForm.idCard">
						<div class="warning-info"></div>
					</div>
					
				</li>
				<li>
					<p class="name"><i class="need">*</i>性别：</p><div class="inp-box">
						<el-select :readonly="readOnly" v-model.trim="idInfo.sex" placeholder="请选择" disabled>
							<el-option v-for="item in option4" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
					</div>
				</li>
				<li>
					<p class="name"><i class="need">*</i>出生日期：</p><div class="inp-box">
						<input :readonly="readOnly" disabled type="text" placeholder="请输入" v-model.trim="idInfo.birth">
						<div class="warning-info"></div>
					</div>
					
				</li>
				<li>
					<p class="name"><i class="need">*</i>年龄：</p><div class="inp-box">
						<input :readonly="readOnly" disabled  @blur="blur([{'fun':'need','params':[]}],$event)" type="text" placeholder="请输入" v-model.trim="idInfo.age">
						<div class="warning-info"></div>
					</div>
					
				</li>
				<li>
					<p class="name"><i class="need">*</i>生日：</p><div class="inp-box">
						<input :readonly="readOnly" disabled type="text" placeholder="请输入" v-model.trim="idInfo.birthday">
						<div class="warning-info"></div>
					</div>
					
				</li>
				<li>
					<p class="name">婚姻状况：</p><div class="inp-box">
						<el-select :readonly="readOnly" v-model.trim="personInfoForm.maritalStatus" placeholder="请选择">
							<el-option v-for="item in option1" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
					</div>
				</li>
				<li>
					<p class="name">政治面貌：</p><div class="inp-box">
						<el-select :readonly="readOnly" v-model.trim="personInfoForm.politicsStatus" placeholder="请选择">
							<el-option v-for="item in option2" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
					</div>
				</li>
			</ul>
		</div>
		<div class="info-part">
			<h3>户口相关信息</h3>
			<ul class="clearfix">
				<li>
					<p class="name">户口类型：</p><div class="inp-box">
						<el-select :readonly="readOnly" v-model.trim="personInfoForm.residenceType" placeholder="请选择">
							<el-option v-for="item in option3" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
					</div>
				</li>
				<li>
					<p class="name"><i class="need">*</i>籍贯：</p><div class="inp-box">
						<input :readonly="readOnly" need @blur="blur([{'fun':'need','params':[]}],$event)" type="text" placeholder="请输入" v-model.trim="personInfoForm.birthPlace">
						<div class="warning-info"></div>
					</div>
					
				</li>
				<li class="middle">
					<p class="name">身份证地址：</p><div class="inp-box">
						<input :readonly="readOnly" @blur="blur([{'fun':'max','params':[50]}],$event)" type="text" placeholder="请输入" v-model.trim="personInfoForm.residentAddr">
						<div class="warning-info"></div>
					</div>
					
				</li>
				<li class="nowAddress">
					<p class="name">现地址：</p><div class="inp-box">	
						<el-select :readonly="readOnly" filterable v-model.trim="personInfoForm.presentArea" placeholder="请选择">
							<el-option v-for="item in option7"  :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select><input :readonly="readOnly" @blur="blur([{'fun':'max','params':[50]}],$event)" type="text" placeholder="请输入" v-model.trim="personInfoForm.presentAddr">
						<div class="warning-info"></div>
					</div>
					
				</li>
			</ul>
		</div>
		<div class="info-part">
			<h3>紧急联系人信息</h3>
			<ul class="clearfix">
				<li class="long">
					<p class="name">紧急联系人姓名：</p><div class="inp-box">
						<input :readonly="readOnly" @blur="blur([{'fun':'max','params':[20]}],$event)" type="text" placeholder="请输入" v-model.trim="personInfoForm.contactName">
						<div class="warning-info"></div>
					</div>
					
				</li>
				<li class="long">
					<p class="name">紧急联系人手机号：</p><div class="inp-box">
						<input :readonly="readOnly" @blur="blur([{'fun':'mobile','params':[]}],$event)" type="text" placeholder="请输入" v-model.trim="personInfoForm.contactNumber">
						<div class="warning-info"></div>
					</div>
					
				</li>
				<li class="long">
					<p class="name">与紧急联系人关系：</p><div class="inp-box">
						<input :readonly="readOnly" @blur="blur([{'fun':'max','params':[10]}],$event)" type="text" placeholder="请输入" v-model.trim="personInfoForm.contactRelation">
						<div class="warning-info"></div>
					</div>
					
				</li>
			</ul>	
		</div>
		<div class="info-part">
			<h3>最高学历信息</h3>
			<ul class="clearfix">
				<li class="highestDegreeWarn">
					<p class="name"><i class="need">*</i>最高学历：</p><div class="inp-box">
						<el-select :readonly="readOnly" @change="removeError('.highestDegreeWarn')" v-model.trim="personInfoForm.highestDegree" placeholder="请选择">
							<el-option v-for="item in option5" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
						<div class="warning-info"></div>
					</div>
					
				</li>
				<li>
					<p class="name"><i class="need">*</i>毕业院校：</p><div class="inp-box">
						<input :readonly="readOnly" need @blur="blur([{'fun':'need','params':[]}],$event)" type="text" placeholder="请输入" v-model.trim="personInfoForm.graduateSchool">
						<div class="warning-info"></div>
					</div>
					
				</li>
				<li>
					<p class="name"><i class="need">*</i>专业：</p><div class="inp-box">
						<input :readonly="readOnly" need @blur="blur([{'fun':'need','params':[]}],$event)" type="text" placeholder="请输入" v-model.trim="personInfoForm.major">
						<div class="warning-info"></div>
					</div>
					
				</li>
				<li>
					<p class="name">学习形式：</p><div class="inp-box">
						<el-select :readonly="readOnly" v-model.trim="personInfoForm.studyMode" placeholder="请选择">
							<el-option v-for="item in option6" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
						<div class="warning-info"></div>
					</div>
				</li>
				<li>
					<p class="name">毕业日期：</p><div class="inp-box">
						<el-date-picker :readonly="readOnly"	v-model="personInfoForm.graduateDate" type="month" placeholder="选择日期"></el-date-picker>
						<div class="warning-info"></div>
					</div>
					
				</li>
			</ul>	
		</div>
		<div class="info-part">
			<h3>职业资格及其他</h3>
			<ul class="clearfix">
				<li class="long strip">
					<p class="name">职业资格及其他：</p><div class="inp-box">
						<input :readonly="readOnly"  @blur="blur([{'fun':'max','params':[50]}],$event)" type="text" placeholder="请输入" v-model.trim="personInfoForm.professionalInfo">
					</div>
					<div class="warning-info"></div>
				</li>
			</ul>	
		</div>
		<div class="btn-wrap">
			<button v-if="!readOnly" @click="next('workInfo')" class="btn btn-primary" v-text="isAddPage?'保存并下一步':'保存'"></button>
		</div>
		

	</div>
</template>
<script type="text/javascript">
var test;
	export default{
		props:['addpersonId','personId','isAddPage','currentViewId','readOnly'],
		data(){
			return {
				pageId:'',
				option1:[{value:0,label:'未婚'},{value:1,label:'已婚'}],
				option2:[{value:1,label:'群众'},{value:2,label:'共青团员'},{value:3,label:'共产党员'}],
				option3:[{value:1,label:'城镇户口'},{value:2,label:'农村户口'}],
				option4:[{value:0,label:'女'},{value:1,label:'男'}],
				option5:[{value:1,label:'大专以下'},{value:2,label:'大专'},{value:3,label:'本科'},{value:4,label:'硕士'},{value:5,label:'博士'}],
				option6:[{value:1,label:'全日制'},{value:2,label:'成教'},{value:3,label:'自考'},{value:4,label:'函授'}],
				option7:[{value:1,label:'江岸区'},{value:2,label:'江汉区'},{value:3,label:'硚口区'},{value:4,label:'汉阳区'},{value:5,label:'武昌区'},{value:6,label:'青山区'},{value:7,label:'洪山区'},{value:8,label:'蔡甸区'},{value:9,label:'江夏区'},{value:10,label:'黄陂区'},{value:11,label:'新洲区'},{value:12,label:'东西湖区'},{value:13,label:'汉南区'},{value:14,label:'其他'}],
				personInfoForm:{
					// employeeId:'',
					realName:'',
					userName:'',
					email:'',
					telPhone:'',
					nation:'',
					idCard:'',
					maritalStatus:'',
					politicsStatus:'',
					residenceType:'',
					birthPlace:'',
					residentAddr:'',
					presentArea:'',
					presentAddr:'',
					contactName:'',
					contactNumber:'',
					contactRelation:'',
					highestDegree:'',
					graduateSchool:'',
					major:'',
					studyMode:'',
					graduateDate:'',
					professionalInfo:''
				},
				canSubmitAlone:true,
				activeWrong:false,
				idInfo:{
					sex:'',
					birth:'',
					age:'',
					birthday:''
				},
				idCardNum:'',
				userNameOld:'',
				mobileOld:'',
				userNameCan:false,
				employeeIdCan:false,
				imageUrl:''
			}
			
		},
		methods:{
			handleAvatarSuccess(res, file) {
		        this.imageUrl = URL.createObjectURL(file.raw);
		    },
			getPersonInfo(personId){
				var that=this;
				this.getAjax(this.host,'/employeeInfo/findUserInfoDetailById.json',{id:personId}).success(function(r){
		            if (r.code==0) {
		            //适配
		              that.personInfoForm.userName=getValue(r.data.userName);//用户名
		              that.personInfoForm.email=that.personInfoForm.userName+'@jiangroom.com'; //邮箱

		              that.userNameOld=getValue(r.data.userName);//老的用户名 
		              if (!!r.data.userInfo) {
		              	// that.personInfoForm.employeeId=getValue(r.data.userInfo.employeeId);//工号
		              	that.personInfoForm.realName=getValue(r.data.userInfo.realName);//姓名
		              	that.personInfoForm.idCard=getValue(r.data.userInfo.idCard);//身份证

		              	that.idCardNum=getValue(r.data.userInfo.idCard);
		              	that.personInfoForm.telPhone=getValue(r.data.userInfo.telPhone);
		              	that.mobileOld=getValue(r.data.userInfo.telPhone);//老的手机号

		              }
		              if (!!r.data.userInfoDetail) {
		              	  that.personInfoForm.nation=getValue(r.data.userInfoDetail.nation);//民族
			              that.personInfoForm.maritalStatus=getNumber(r.data.userInfoDetail.maritalStatus);//婚姻
			              that.personInfoForm.politicsStatus=getNumber(r.data.userInfoDetail.politicsStatus);//政治
			              that.personInfoForm.residenceType=getNumber(r.data.userInfoDetail.residenceType);//户口类型
			              
			              that.personInfoForm.birthPlace=getValue(r.data.userInfoDetail.birthPlace);//籍贯
			              that.personInfoForm.residentAddr=getValue(r.data.userInfoDetail.residentAddr);//身份证地址
			              that.personInfoForm.presentArea=getNumber(r.data.userInfoDetail.presentArea); //现地址区
			              that.personInfoForm.presentAddr=getValue(r.data.userInfoDetail.presentAddr); //现地址
			              that.personInfoForm.contactName=getValue(r.data.userInfoDetail.contactName); //紧急联系人
			              that.personInfoForm.contactNumber=getValue(r.data.userInfoDetail.contactNumber); //电话号码

			              that.personInfoForm.contactRelation=getValue(r.data.userInfoDetail.contactRelation);//关系
			              that.personInfoForm.highestDegree=getNumber(r.data.userInfoDetail.highestDegree); //最高学历
			              that.personInfoForm.graduateSchool=getValue(r.data.userInfoDetail.graduateSchool);
			              that.personInfoForm.major=getValue(r.data.userInfoDetail.major);
			              that.personInfoForm.studyMode=getNumber(r.data.userInfoDetail.studyMode); //学习形式
			              that.personInfoForm.graduateDate=getValue(r.data.userInfoDetail.graduateDate);
			              that.personInfoForm.professionalInfo=getValue(r.data.userInfoDetail.professionalInfo); //职业资格
		              }	              
		            }else{
		            	that.$message.error(r.message);
		            }   
		        }).error(function(e){
		          //返回warn或者错误 tit和content
		          that.$message.error('服务器错误')
		        })
			},
			savePersonInfo(str){
				var data=JSON.parse(JSON.stringify(this.personInfoForm)),that=this;

				data['graduateDate']=getMonth(data['graduateDate']);
				if (!this.isAddPage) {
					//编辑页
					data['id']=this.personId;
				}else{
					//新增页
					if (!!this.addpersonId) {
						//新增人员信息再次保存
						data['id']=this.addpersonId;
					}
				}			
				this.getAjax(this.host,'/employeeInfo/saveUser.json',data).success(function(r){
					if (r.code==0) {
						if (that.isAddPage) {
							//新增页
							that.userNameOld=data['userName'];
							that.mobileOld=data['telPhone'];
							that.addpersonId=r.data;
							that.userNameCan=true;
							that.employeeIdCan=true;
							that.$emit('next',str,r.data);
						}else{
							//编辑页
							that.$message('保存成功')
							return
						}
						
					}else{	
						that.$message.error(r.message)
					}
				}).error(function(e){
					
					that.$message.error("服务器错误！");
				})
			},
			employeeIdTest(employeeId,target){
				var $msgBox=$(target).parents('li').find('.warning-info');
				//验证是否存在当前employeeId
				this.getAjax(this.host,'/employeeInfo/validEmployeeId.json',{employeeId:employeeId}).success(function(r){
					if(r.code==0){
						$(target).removeClass('error');
						$msgBox.text('');
					}else{
						$(target).addClass('error');
						$msgBox.text(r.message);
					}
				}).error(function(e){
					that.$message.error('服务器错误！')
				})
			},
			userNameTest(userName,target){
				var $msgBox=$(target).parents('li').find('.warning-info');
				var that=this;
				//验证是否存在当前userna
				this.getAjax(this.host,'/employeeInfo/getByUsername',{username:userName}).success(function(r){
					if(r.code==0){
						$(target).removeClass('error');
						$msgBox.text('');
						that.personInfoForm.email=userName+'@jiangroom.com'
					}else if(r.code===-500){
						$(target).addClass('error');
						$msgBox.text(r.message);
					}
				}).error(function(e){
					that.$message.error('服务器错误！')
				})
			},
			getUserName(realName,target){
				var that=this;
				var $msgBox=$(target).parents('li').find('.warning-info');
				this.getAjax(this.host,'/employeeInfo/toPinyin.json',{realName:realName}).success(function(r){
					if(r.code==0){
						$(target).removeClass('error');
						$msgBox.text('');
						that.personInfoForm.userName=r.message;
						var $preTarget=$(target).parents('li').next().find('input');
						that.userNameTest(r.message,$preTarget[0]);
					}else if(r.code===-500){
						$(target).addClass('error');
						$msgBox.text(r.message);
					}
				}).error(function(e){
					that.$message.error('服务器错误！')
				})

			},
			mobileTest(mobileOld,target){
				var $msgBox=$(target).parents('li').find('.warning-info');
				//验证是否存在当前mobile
				this.getAjax(this.host,'/employeeInfo/validTelphone.json',{telphone:mobileOld}).success(function(r){
					if(r.code==0){
						$(target).removeClass('error');
						$msgBox.text('');
					}else if(r.code===-500){
						$(target).addClass('error');
						$msgBox.text(r.message);
					}
				}).error(function(e){
					that.$message.error('服务器错误！')
				})
			},
			blur(testArr,$event){
				if (this.readOnly) {
					//只读，不验证
					return
				}
				// 输入验证
				var target=$event.target;
				var $msgBox=$(target).parents('li').find('.warning-info');
				var testObj=new GetTest.child(target.value);
				for(var i=0;i<testArr.length;i++){
					testObj[testArr[i].fun](...testArr[i].params);
				}
				for(var k in testObj.testErrorObj){
					if (testObj.testErrorObj[k]) {
						// 填写错误处理
						var errText=testObj.testErrorObj[k].msg;
						$msgBox.text(errText);
						$(target).addClass('error');
						return;
					}
				}
				$(target).removeClass('error');
				$msgBox.text('');
				//身份证自动带出性别等信息
				if(target.id==='idCard' ){
					this.idCardNum=target.value;
				}
				//是否存在当前工号
				// if (target.id==='employeeId') {
				// 	this.employeeIdTest(target.value,target);
				// }
				//是否存在当前用户名
				if (target.id==='userName' && this.userNameOld!==target.value) {
					this.userNameTest(target.value,target);
				}
				//根据用户名字生成拼音
				if (target.id==="realName") {
					if (this.isAddPage) {
						//编辑页
						this.getUserName(target.value,target);
					}
				}
				//是否存在当前手机号
				if(target.id==='mobile' && this.mobileOld!==target.value){
					this.mobileTest(target.value,target);
				}
			},
			removeError(str){
				$(str).find('.warning-info').text('').end().find('input').removeClass('error');
			},
			next(str){

				test.submit();
				var arr=test.testErrorArr;
				if (arr.length!==0 ) {
					$(arr[0]).addClass('error');
					$(arr[0]).parents('.inp-box').siblings('.warning-info').text(arr[0].need.msg);
				}
				var errorObj=$('#'+this.pageId+' .error');
				if (errorObj.length!==0) {
					errorObj[0].focus();
					$(errorObj[0]).parents('li').find('.warning-info');
				}else{
					if(this.personInfoForm.highestDegree===''){
						$('#'+this.pageId+' .highestDegreeWarn').find('input').addClass('error').parents('.inp-box').find('.warning-info').text('输入不能为空！');
					}else{
						this.savePersonInfo(str);
					}
					
				}
			}
		},
		watch:{
			idCardNum:function(nowId,preId){
				if (!!nowId) {
					var birth=nowId.substr(6, 4) + '/' + Number(nowId.substr(10, 2)) + '/' + Number(nowId.substr(12, 2))
					var timeNow=parseInt(new Date().getFullYear());
					var age=timeNow-parseInt(new Date(birth).getFullYear());
					var sex=nowId.substr(16,1)%2? 1:0;
					var birthday=birth;
					this.idInfo.sex=sex;
					this.idInfo.birth=birth;
					this.idInfo.age=age;
					this.idInfo.birthday=birthday;
				}
			}
		},
		created:function(){
			this.pageId='personInfo'+this.currentViewId;
		},
		mounted:function () {
			var that=this;
			test=new GetTest({
				wrap:'#'+that.pageId
			});
			var personId=this.personId;
			if (this.isAddPage) {
				//新增页面
			}else{
				//编辑页面
				this.getPersonInfo(this.personId);
				this.userNameCan=true;
				this.employeeIdCan=true;
			}

    	}
		
	}

//获取value
function getNumber(value){
	if (value==="null") {
		expression
	}
	return !!value?parseInt(value):'';
}
function getNumber(value){
	return !!value?parseInt(value):'';
}
function getMonth(value){
  if (!!value) {
    return (new Date()).getBJMonth(value);
  }else{
    return ''
  }
}
function getValue(value){
	return !!value?value:'';
}
//转换为需要的数组
function getAttachArr(arr){
	if (!!arr && Object.prototype.toString.apply(arr) === '[object Array]' && arr.length!==0) {
		var myArr=[];
		arr.forEach(function(item,i){
			var obj={};
			obj['name']=item.attachName;
			obj['url']=item.attachUrl;
			obj['id']=item.id;
			myArr.push(obj);
		});
		return myArr;
	}else{
		return[];
	}
}

function checkType(arr,type) {
		for(var i=0 ;i<arr.length;i++){
			if (arr[i]==type) {
				return true;
			}
		}
		return false;
	}
</script>

<style type="text/css">
	.addPersonPages .info-part{
		background: #fff;
	}
	.addPersonPages .info-part:not(:first-child){
		margin-top: 30px;
	}
	.addPersonPages .info-part h3{
		border-left: 3px solid #4db3ff;
		padding-left: 21px;
		margin:8px 0;
	}
	.addPersonPages .info-part ul li{
		position: relative;
		width: 25%;
		box-sizing: border-box;
		float: left;
		padding:0 2% 0 2%;
		margin: 10px 0;
		line-height: 34px;
	}
	.addPersonPages .info-part ul li p.name{
		width: 85px;
		float: left;
		color:#576578;
	}
	.addPersonPages .info-part ul li p.name .need{
		color: red;
	}
	.addPersonPages .info-part ul li .inp-box{
		margin-left:85px; 
	}
	.addPersonPages .info-part ul li.long .inp-box{
		margin-left:135px;
		position: relative;
	}
	

	.addPersonPages .info-part ul li.strip{
		width: 100%;
	}
	.addPersonPages .info-part ul li.long p.name{
		width: 135px;
	}
	.addPersonPages .info-part ul li.middle .inp-box{
		margin-left: 90px;
		position: relative;
	}
	.addPersonPages .info-part ul li.middle p.name{
		width: 90px;
	}
	.addPersonPages .info-part ul li .warning-info{
		position: absolute;
		bottom: -27px;
		color: red;
		font-size: 12px;
	}
	.addPersonPages .btn-wrap{
		text-align: center;
		margin-top: 25px;
		margin-bottom: 45px;
	}
	.addPersonPages .inp-box input.error{
		border-color: red;
		box-shadow: 0 0 3px 0 rgba(255,0,0,0.8);
	}
	.addPersonPages .inp-box input.error:hover{
		border-color: red;
	}

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
    	.addPersonPages .info-part ul li{
    		width: 33.333%;
    	}
	}
</style>
