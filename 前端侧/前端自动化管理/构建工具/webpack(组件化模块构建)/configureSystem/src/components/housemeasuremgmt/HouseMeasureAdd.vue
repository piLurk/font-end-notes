<template >
	<div id="houseMeasureMsg">
		<div v-if="orderType !== 2" class="steps" :class="{showPersonnel:showPersonnel}">
			<ul>
				<li class="cur" data-href="houseMeasure"><a href="javascript:void(0)" @click="pageChange('houseMeasure',$event)" ><p class="numbox"><span class="num">1</span></p><br/>量房</a></li><li :class="{cur:orderFlow>=1}" data-href="houseMsg"><a @click="pageChange('houseMsg',$event)" href="javascript:void(0)"><p class="numbox"><span class="num">2</span></p><br/>房屋信息</a></li><li	:class="{cur:orderFlow>=2}"  data-href="housePorperty"><a href="javascript:void(0)" @click="pageChange('housePorperty',$event)"><p class="numbox"><span class="num">3</span></p><br/>物业交割</a></li><li :class="{cur:orderFlow>=3,last:true}"><a href="javascript:void(0)" @click="pageChange('housePic',$event)"><p class="numbox"><span class="num">4</span></p><br/>量房照片</a></li>
			</ul>

		</div>
		<div class="white-line"></div><div :class="{'msg-content':true,myscroll:orderType!==2}">
			<!-- 动态组件start -->
			<keep-alive>
				<component v-bind:is="currentView" :orderType="orderType" :pkId="pkId" :addPageId="addPageId" :readonly="readonly" :orderFlow="orderFlow" @next="nextPage"></component>
			</keep-alive>
			<!-- 动态组件end -->
			
		</div>
	</div>
</template>
<script type="text/javascript">
import { createNamespacedHelpers } from 'vuex';
const { mapGetters, mapActions } = createNamespacedHelpers('measureAdd')
import houseMeasure from './HouseMeasure.vue' //量房
import houseMsg from './HouseMsg.vue'		//房屋信息
import housePorperty from './HouseProperty.vue'	//物业交割
import housePic from './HousePic.vue' //量房照片
	export default{
		name:'houseMeasureAdd',
		data(){
			return{
				currentView:'houseMeasure',
				updateId:'',
				showPersonnel:true,
				addpersonId:'',//保存后，获取一个新建用户的id,
				personId:'',
				pkId:'',
				readonly:'',
				addPageId:'',
				orderType:''
			}
		},
		computed:{
			...mapGetters([
				'orderFlow'
			])
		},
		methods:{
			...mapActions([
				'getHouseMeasure'
			]),
			pageChange(componentName,$event){
				var $target=$($event.target);
				if ($target.parents('li').hasClass('cur')) {
					this.currentView=componentName;
					$target.parents('li').addClass('cur');
				}
				
			},
			nextPage(componentName,addpersonId){
				this.currentView=componentName;
			},
		},
		watch:{
			addPageId:function(now,pre){
				if(this.updateId !== now){
						this.updateId=now;
						this.currentView = 'houseMeasure';
				}
			},
			$route:function(){
				var params=this.$route.params;
				if(!!params.id){
					this.pkId=params.pkId
					this.orderType=params.orderType
					this.readonly=params.pageState === 'readOnly'
					this.addPageId=params.id
				}
			}
		},
		beforeMount(){
			var params=this.$route.params;
			this.pkId=params.pkId
			this.orderType=params.orderType
			this.readonly=params.pageState === 'readOnly'
			this.addPageId=params.id
		},
		components:{
			houseMeasure:houseMeasure,
			houseMsg:houseMsg,
			housePorperty:housePorperty,
			housePic:housePic
		}
	}
</script>

<style scoped>
#houseMeasureMsg{height:calc(100% - 7px);}
.white-line{height: 20px;width: 100%;background-color: #fff;}
.msg-content{overflow-y: auto;box-sizing: border-box;background-color: #fff;min-height: calc(100% - 13px)}
.msg-content.myscroll{height: calc(100% - 155px);min-height: calc(100% - 155px);}
.steps {background-color: #fff;padding-bottom: 20px; position:relative; width: 100%; height: 120px; margin-bottom: 15px; display: inline-block;box-sizing: border-box;}
.steps ul{ width:100%;text-align: center; }
.steps ul li {display: inline-block; width:170px; margin-top: 25px; position: relative;z-index:3;}
.steps ul li{background:url(/static/images/step_01.png) -108px 15px no-repeat;}
.steps ul li.cur{background:url(/static/images/step_02.png) -108px 15px no-repeat;}
.steps ul li:first-child { margin-top: 25px; position: relative;z-index:3;background:url(/static/images/step_01.png) 71px 15px no-repeat;}
.steps ul li.last{background:url(/static/images/step_01.png) -288px 15px no-repeat;}
.steps ul li.last.cur{background:url(/static/images/step_02.png) -288px 15px no-repeat;}
.steps ul li.cur:last-child{background:url(/static/images/step_02.png) -288px 15px no-repeat;}
.steps ul li .numbox { display: inline-block; width: 36px; height: 36px; padding:8px; }
.steps ul li .num { width: 36px; height: 36px; line-height: 36px; text-align: center; display: inline-block; color: #fff;border-radius: 50%;}
.steps ul li a{color: #dedede;}
.steps .line { width: 30%; height: 1px;line-height: 1px; overflow: hidden; background-color: #d1d1d1; z-index: 1; position: absolute; top: 50px; left: 35%;}

.steps ul li.cur a{color: #333;}
.steps ul li.cur .num{  }

.steps.showPersonnel .line{width:50%;left: 26%; }
.btn-wrap{position: absolute;top:50%;transform: translateY(-50%);right:5%;z-index: 100;}
</style>