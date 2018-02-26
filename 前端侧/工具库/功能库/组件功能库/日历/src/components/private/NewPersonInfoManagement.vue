<template >
	<div id="personMsg">
		<div class="steps" :class="{showPersonnel:showPersonnel}">
			<ul>
				<li class="cur" data-href="personInfo"><a href="javascript:void(0)" @click="pageChange('personInfo',$event)" ><p class="numbox"><span class="num">1</span></p><br/>个人信息</a></li><li :class="{cur:showPersonnel}" data-href="workInfo"><a @click="pageChange('workInfo',$event)" href="javascript:void(0)"><p class="numbox"><span class="num">2</span></p><br/>工作信息</a></li><li :class="{cur:showPersonnel,last:!showPersonnel}"  data-href="attachmentInfo"><a href="javascript:void(0)" @click="pageChange('attachmentInfo',$event)"><p class="numbox"><span class="num">3</span></p><br/>附件信息</a></li><li :class="{cur:showPersonnel}" v-show="showPersonnel" data-href="personnel"><a href="javascript:void(0)" @click="pageChange('personnel',$event)"><p class="numbox"><span class="num">4</span></p><br/>人事变更记录</a></li>
			</ul>
			<div style="display:none;" class="btn-wrap">
				<a :href="host+'/employeeInfo/exportEmployee.json'" class="excel_out btn btn-success f_r">导出个人履历</a>
			</div>
		</div>
		<div class="white-line"></div><div class="msg-content">
			<!-- 动态组件start -->
			<keep-alive>
				<component :isAddPage="isAddPage" :addpersonId="addpersonId" :currentViewId="currentViewId" :personId="personId" :readOnly="readOnly" v-bind:is="currentView" @next="nextPage"></component>
			</keep-alive>
			<!-- 动态组件end -->
			
		</div>
	</div>
</template>
<script type="text/javascript">
import PersonInfo from './PersonInfo.vue'
import WorkInfo from './WorkInfo.vue'
import AttachmentInfo from './Attachment.vue'
import PersonnelInfo from './PersonnelInfo.vue'
	export default{
		data(){
			return{
				currentView:'personInfo',
				showPersonnel:true,
				addpersonId:'',//保存后，获取一个新建用户的id,
				personId:'',
				currentViewId:'',
				readOnly:''
			}
		},
		computed:{
			isAddPage:function(){
				return this.$store.getters.currentViewId==='add'
			}
		},
		methods:{
			pageChange(componentName,$event){
				var $target=$($event.target);
				if ($target.parents('li').hasClass('cur')) {
					this.currentView=componentName;
					$target.parents('li').addClass('cur');
				}else{
					//不是激活状态，无法从step点击进入
					
				}
				
			},
			nextPage(componentName,addpersonId){
				if (!!addpersonId) {
					this.addpersonId=addpersonId;
				}
				this.currentView=componentName;
				$('.steps').find('li[data-href='+componentName+']').addClass('cur');
			},
			getPensonMsg(){
				//请求人员信息
			}
		},
		components:{
			personInfo:PersonInfo,
			workInfo:WorkInfo,
			attachmentInfo:AttachmentInfo,
			personnel:PersonnelInfo
		},
		beforeMount:function(){
			this.currentViewId=this.$store.state.mutations.currentViewId;
			this.readOnly=this.$store.state.mutations.readOnly;
			var personId=this.$store.getters.getPersonId;
			if (!this.isAddPage) {
				//查询
					//获取人员id
				var personId=this.$store.getters.getPersonId;
				this.personId=personId;
				this.showPersonnel=true;
			}else{
				//新增
				this.personId='';
				this.showPersonnel=false;
			}
		},
		mounted:function(){
			

		}
	}
</script>

<style scoped>
#personMsg{height:100%;}
.white-line{background-color: #fff;height: 20px;width: 100%;}
.msg-content{background-color: #fff;overflow-y: scroll;box-sizing: border-box;height: calc(100% - 140px);}
.steps {background-color: #fff;padding-bottom: 20px; position:relative; width: 100%; height: 120px; margin-bottom: 8px; display: inline-block;box-sizing: border-box;}
.steps ul{ width:100%;text-align: center; }
.steps ul li {display: inline-block; width:170px; margin-top: 25px; position: relative;z-index:3;}
.steps ul li{background:url(/src/assets/images/step_01.png) -108px 15px no-repeat;}
.steps ul li.cur{background:url(/src/assets/images/step_02.png) -108px 15px no-repeat;}
.steps ul li:first-child { margin-top: 25px; position: relative;z-index:3;background:url(/src/assets/images/step_01.png) 71px 15px no-repeat;}
.steps ul li.last{background:url(/src/assets/images/step_01.png) -288px 15px no-repeat;}
.steps ul li.last.cur{background:url(/src/assets/images/step_02.png) -288px 15px no-repeat;}
.steps ul li.cur:last-child{background:url(/src/assets/images/step_02.png) -288px 15px no-repeat;}
.steps ul li .numbox { display: inline-block; width: 36px; height: 36px; padding:8px; }
.steps ul li .num { width: 36px; height: 36px; line-height: 36px; text-align: center; display: inline-block; color: #fff;border-radius: 50%;}
.steps ul li a{color: #dedede;}
.steps .line { width: 30%; height: 1px;line-height: 1px; overflow: hidden; background-color: #d1d1d1; z-index: 1; position: absolute; top: 50px; left: 35%;}

.steps ul li.cur a{color: #333;}
.steps ul li.cur .num{  }

.steps.showPersonnel .line{width:50%;left: 26%; }
.btn-wrap{position: absolute;top:50%;transform: translateY(-50%);right:5%;z-index: 100;}
</style>