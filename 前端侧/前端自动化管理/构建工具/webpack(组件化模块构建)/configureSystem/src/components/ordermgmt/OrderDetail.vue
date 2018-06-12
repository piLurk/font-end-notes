<template>
	<div class="personnelChange">
		<div class="orderDetail-part">	
			<h3>订单信息</h3>
			<div class="msg-wrap">
				<ul class="content-ul">
					<li><p>订单编号：</p><div class="inp-box">{{form.orderMsg.orderNumber | blank}}</div></li><li><p>订单状态：</p><div class="inp-box">{{form.orderMsg.orderStateName | blank}}</div></li><li><p>订单类型：</p><div class="inp-box">{{form.orderMsg.orderTypeName | blank}}</div></li></br><li class="long"><p>订单预估总额：</p><div class="inp-box">{{form.orderMsg.predictPrice | blank | ￥}}</div></li><li class="long"><p>订单实际总额：</p><div class="inp-box">{{form.orderMsg.standardPrice | blank | ￥}}</div></li></br><li class="long"><p>预计配置周期：</p><div class="inp-box">{{form.orderMsg.predictPeriod | blank | toDay}}</div></li><li class="long"><p>标准配置周期：</p><div class="inp-box">{{form.orderMsg.standardPeriod | blank | toDay}}</div></li><li><p>实际工期：</p><div class="inp-box">{{form.orderMsg.orderPeriod | blank | toDay}}</div></li></br><li class="long"><p>预计竣工日期：</p><div class="inp-box">{{form.orderMsg.predictDate | toDate | blank}}</div></li><li class="long"><p>实际竣工日期：</p><div class="inp-box">{{form.orderMsg.standardDate | toDate | blank}}</div></li>							
				</ul>
			</div>
			
		</div>
		<div class="orderDetail-part">
			<h3>订单状态</h3>
			<div class="msg-wrap t_c edit">
				<div class="container">
					<ul class="project_list clearfix">
						<li :class="getClass(1,'project_start')">
							<a href="#">
								<p>
									<span class="num">1</span>
									<br/>
									<i class="tit">项目启动</i>
								</p>
							</a>
						</li>
						<li :class="getClass(2,'project_plan')">
							<a href="#">
								<p>
									<span class="num">2</span>
									<br/>
									<i class="tit">项目计划</i>
								</p>
							</a>
						</li>
						<li :class="getClass(3,'project_do')">
							<a href="#">
								<p>
									<span class="num">3</span>
									<br/>
									<i class="tit">项目实施</i>
								</p>
							</a>
						</li>
						<li :class="getClass(4,'project_give')">
							<a href="#">
								<p>
									<span class="num">4</span>
									<br/>
									<i class="tit">项目交付</i>
								</p>
							</a>
						</li>
						<li :class="getClass(5,'project_com')">
							<a href="#">
								<p>
									<span class="num">5</span>
									<br/>
									<i class="tit">订单完成</i>
									
								</p>
							</a>
						</li>
					</ul>
					<div class="process_wrap">
						<ul class="process_list">
							<li v-for="(item,i) in comments" :key="i">
								<span class="date"><div class="dot_wrap">
									<div v-if="i===0" class="dot_inner"><i class="dot"></i></div>
									<i v-else class="dot"></i>
									</div>{{item.day}}</span>
								<ul class="time_list">
									<li v-for="(tItem,index) in item.children" :key="index">
										<span class="time">{{tItem.time}}</span>
										<span class="operate">{{!!tItem.content?tItem.people+tItem.content:''}}</span>
									</li>
								</ul>
							</li>
						</ul>
					</div>
				</div>
				
				
			</div>
		</div>
		<div class="orderDetail-part">
			<h3>其他信息</h3>
			<div class="msg-wrap edit other_msg">
				<div class="item">
					<h4>收房合同信息</h4>
					<ul>
						<li>
							<span  class="tit">收房合同号：</span>
							<span  class="content">{{form.otherMsg.contractNumber | blank}}</span>
						</li>
						<li>
							<span  class="tit">合同生效日期：</span>
							<span  class="content">{{form.otherMsg.contractDate | toDate | blank}}</span>
						</li>
						<li>
							<span  class="tit">收房产品：</span>
							<span  class="content">{{form.orderMsg.houseTypeName | blank }}</span>
						</li>
						<li>
							<span  class="tit">产品版本：</span>
							<span  class="content">{{form.otherMsg.productRelease | blank}}</span>
						</li>
						<li>
							<span  class="tit">量房日期：</span>
							<span  class="content">{{form.otherMsg.reserveDate | toDate | blank}}</span>
						</li>
						<li>
							<span  class="tit">年维修基金：</span>
							<span  class="content">{{form.otherMsg.maintenanceFunds | blank | ￥}}</span>
						</li>
					</ul>
				</div>
				<div class="item"> 
					<h4>房源信息</h4>
					<ul>
						<li>
							<span  class="tit">房源编号：</span>
							<span  class="content">{{form.otherMsg.housingNumber | blank}}</span>
						</li>
						<li>
							<span  class="tit">物业地址：</span>
							<span  class="content">{{form.otherMsg.propertyAddress | blank}}</span>
						</li>
						<li>
							<span  class="tit">优化前户型：</span>
							<span  class="content">{{form.otherMsg.optimizeOld | blank}}</span>
						</li>
						<li>
							<span  class="tit">优化后户型：</span>
							<span  class="content">{{form.otherMsg.optimizeNew | blank}}</span>
						</li>
						<li>
							<span  class="tit">建筑面积：</span>
							<span  class="content">{{form.otherMsg.buildArea | blank | sMeter}}</span>
						</li>
					</ul>
				</div>
				<div class="item">
					<h4>人员信息</h4>
					<ul>
						<li>
							<p class="part_start">
								<span  class="tit">收房管家：</span>
								<span  class="content">{{form.otherMsg.steward | blank}}</span>
							</p>
							<p>
								<span  class="tit">收房配置专员：</span>
								<span  class="content">{{form.otherMsg.deployAttache | blank}}</span>
							</p>
						</li>
						<li>
							<p class="part_start">
								<span  class="tit">收房区经：</span>
								<span  class="content">{{form.otherMsg.area | blank}}</span>
							</p>
							<p>
								<span  class="tit">收房配置组长：</span>
								<span  class="content">{{form.otherMsg.deployGroup | blank}}</span>
							</p>
						</li>
						<li>
							<p class="part_start">
								<span  class="tit">收房总监：</span>
								<span  class="content">{{form.otherMsg.majordomo | blank}}</span>
							</p>
							<p>
								<span  class="tit">所属配置专员：</span>
								<span  class="content">{{form.otherMsg.groupAttache | blank}}</span>
							</p>
						</li>
						<li>
							<p class="part_start">
								<span  class="tit">直销管家：</span>
								<span  class="content">{{form.otherMsg.directSteward | blank}}</span>
							</p>
							<p>
								<span  class="tit">所属配置组长：</span>
								<span  class="content">{{form.otherMsg.groupGroup | blank}}</span>
							</p>
						</li>
						<li>
							<p class="part_start">
								<span  class="tit">所属管家：</span>
								<span  class="content">{{form.otherMsg.groupSteward | blank}}</span>
							</p>
							<p>
								<span  class="tit">退租配置专员：</span>
								<span  class="content">{{form.otherMsg.quitAttache | blank}}</span>
							</p>
						</li>
						<li>
							<p class="part_start">
								<span  class="tit">所属区经：</span>
								<span  class="content">{{form.otherMsg.groupArea | blank}}</span>
							</p>
							<p>
								<span  class="tit">退租配置组长：</span>
								<span  class="content">{{form.otherMsg.quitGroup | blank}}</span>
							</p>
						</li>
						<li>
							<p class="part_start">
								<span  class="tit">所属总监：</span>
								<span  class="content">{{form.otherMsg.groupMajordomo | blank}}</span>
							</p>

						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
import { createNamespacedHelpers } from 'vuex';
const { mapGetters, mapActions } = createNamespacedHelpers('orderDetail')
	export default{
		name:'orderDetail',
		data(){
			return{
				orderId:'',

			}
		},
		methods:{
			...mapActions([
				'getOrderDetail',
			]),
			getClass:function(i,pClass){
				var obj={};
				obj[pClass]=true;
				var l=this.form.orderMsg.orderProcess - i;
				if(l>=0){
					obj['complete']=true;
				}else if(l === -1){
					obj['start']=true;
				}
				return obj;
			}
		},
		computed:{
			...mapGetters({
				form: "form"
			}),
			comments(){
				var cArr=[];
				if(!this.form.comments){
					return cArr;
				}
				var cArr=JSON.parse(JSON.stringify(this.form.comments))
				cArr=cArr.map((ele) => {
					ele.date=ele.date-0;
					ele.day =new Date(ele.date).getBJDate();
					ele.time=new Date(ele.date).getBJHourMi();
					return ele;
				}).sort(function(a,b){
					return b.date - a.date;
				}).reduce(function(a,c,i){
					if(a.length ===0){
						c['children']=[{time:c.time,content:c.content,people:c.people}];
						a.push(c);
					}else{
						var t=a[a.length-1].day;
						if(t===c.day){
							a[a.length-1].children.push({time:c.time,content:c.content,people:c.people})
						}else{
							c['children']=[{time:c.time,content:c.content,people:c.people}];
							a.push(c);
						}
					}
					return a;
				},[])
				return cArr;
			}
		},
		activated(){
			var orderId=this.$route.params.pkId;
			if(orderId !== this.orderId){
				this.getOrderDetail(orderId);
				this.orderId=orderId;
			}
		},
		beforeMount:function(){
		},
		mounted:function() {
			
				
		}
	}
</script>
<style type="text/css" scoped>
.t_c{text-align: center;}
.container{display: inline-block;text-align:left;width: 85%;}
.need{color:red;}
.personnelChange{height: 100%;overflow-y: scroll;}
.inp-box{position: relative;}
.inp-box .errorMsg{position: absolute;top:27px;color: red;}

.orderDetail-part .msg-wrap.edit .content-ul li{padding:10px 0;padding-right: 3%; }
.p-textarea{margin-top: 10px;}

span.el-cascader .el-input__inner.error{border-color: red;}

.orderDetail-part{
    padding-top: 25px;
    padding-bottom: 15px;
    background-color: #fff;
}
.orderDetail-part:not(:last-child){
	margin-bottom: 15px;
}
.orderDetail-part h3{
    border-left: 3px solid #3ba0ff;
    color: #1C2B36;
    padding: 5px 0;
    padding-left: 30px;
    height: 26px;
    line-height: 26px;
    margin-bottom: 10px;
    font-size: 16px;
}
.orderDetail-part .msg-wrap{
    padding: 0 20px;
}
.orderDetail-part .msg-wrap .content-ul li{
    width: 25%;
    display: inline-block;
    box-sizing: border-box;
    padding: 6px 0;
    padding-right: 3%;
}
.orderDetail-part .msg-wrap .content-ul li>p{
    float: left;
    display: inline-block;
    line-height: 36px;
    width: 85px;
    color: #A3B2C6;
}
.orderDetail-part .msg-wrap .content-ul li .inp-box{
    width: 100%;
    padding-left: 85px;
    box-sizing: border-box;
    line-height: 36px;
    color: #1C2B36;
}
.orderDetail-part .msg-wrap .content-ul li.long>p{
     width: 120px;
}
.orderDetail-part .msg-wrap .content-ul li.long .inp-box{
    padding-left: 125px; 
}
.orderDetail-part .msg-wrap .content-ul li.middle>p{
     width: 100px;
}
.orderDetail-part .msg-wrap .content-ul li.middle .inp-box{
    padding-left: 105px;  
}
.orderDetail-part .msg-wrap .content-ul li .select-wrap{
    
}
.orderDetail-part .msg-wrap .content-ul li .el-cascader__label span:nth-child(1){
    color: #a3b2c6;
    padding-right: 0;
}
.orderDetail-part .msg-wrap .content-ul li span:nth-child(1)
.orderDetail-part .msg-wrap .p-textarea{
    margin-top: 25px;
}
.orderDetail-part .msg-wrap .p-textarea span.tit{
    display:inline-block;
    height: 60px;
    vertical-align: top;
    color: #576578;
    margin-right: 10px;
}
.orderDetail-part .msg-wrap .p-textarea textarea{
    height: 60px;
    display: inline-block;
    background-color: #fff;
    border-radius: 3px;
    width:calc(97% - 85px);
    box-sizing: border-box;
}
.orderDetail-part .btn-wrap{
    text-align: center;
    padding-bottom: 35px;
}
.orderDetail-part .btn-wrap button{
    margin-top: 50px;
}
.orderDetail-part .btn-wrap button:not(first-child){
    margin-right: 15px;
}

/* project_list */
.orderDetail-part .project_list{
	width: 100%;
	position: relative;
}
.orderDetail-part .project_list li{
	float: left;
	width: 22%;
	position: relative;
	text-align: center;
}
.orderDetail-part .project_list li:after{
	content: '';
	display: inline-block;
	position: absolute;
	height: 1px;
	width: 100%;
	top:42px;
	left: 0;
	background-color:#dfdfdf;
	z-index: 1;
}
.orderDetail-part .project_list li.complete:after{
	background-color: #333;
}
.orderDetail-part .project_list li.start:after{
	background-color: #A3B2C6;
}
.orderDetail-part .project_list li:first-child{
	text-align:left;
	width: 17%;
}
.orderDetail-part .project_list li:last-child{
	text-align:right;
	width: 17%;
}
.orderDetail-part .project_list li.complete:first-child:after{
	width: calc(100% - 59px);
	left: 59px;
}
.orderDetail-part .project_list li:first-child:after{
	width: calc(100% - 37px);
	left: 37px;
}

.orderDetail-part .project_list li:last-child:after{
	width:calc(100% - 37px);
	left: 0;
}
.orderDetail-part .project_list li.complete:last-child:after{
	width:calc(100% - 59px);
	left: 0;
}


.orderDetail-part .project_list li>a{
	text-align: center;
	display: inline-block;
	padding-top: 30px;
	color: #dfdfdf;
	cursor: auto;
}
.orderDetail-part .project_list li>a .tit{
	font-size: 18px;
	font-weight: bold;
}

.orderDetail-part .project_list li>a .num{
	display: inline-block;
	z-index: 100;
	position: relative;
	width: 22px;
	height: 22px;
	color: #fff;
	background-color: #dfdfdf;
	border-radius: 50%;
}
.orderDetail-part .project_list li.complete>a{
	color: #333;
}

.orderDetail-part .project_list li.complete>a .time{
	color: #A3B2C6;
	font-size: 12px;
}
.orderDetail-part .project_list li.complete>a .num{
	background-color:#333;
}
.orderDetail-part .project_list li.start>a{
	color: #A3B2C6;
}
.orderDetail-part .project_list li.start>a .num{
	background-color: #A3B2C6;
}

/* project图标*/
	/*项目启动*/
.orderDetail-part .project_list li.project_start>a{
	background:url(/static/images/project_start_1.png) top center no-repeat;
}
.orderDetail-part .project_list li.project_start.start>a{
	background-image: url(/static/images/project_start_2.png);
}
.orderDetail-part .project_list li.project_start.complete>a{
	background-image: url(/static/images/project_start_3.png);
}
	/*项目计划*/
.orderDetail-part .project_list li.project_plan>a{
	background:url(/static/images/project_plan_1.png) top center no-repeat;
}
.orderDetail-part .project_list li.project_plan.start>a{
	background-image: url(/static/images/project_plan_2.png);
}
.orderDetail-part .project_list li.project_plan.complete>a{
	background-image: url(/static/images/project_plan_3.png);
}

	/*项目实施*/
.orderDetail-part .project_list li.project_do>a{
	background:url(/static/images/project_do_1.png) top center no-repeat;
}
.orderDetail-part .project_list li.project_do.start>a{
	background-image: url(/static/images/project_do_2.png);
}
.orderDetail-part .project_list li.project_do.complete>a{
	background-image: url(/static/images/project_do_3.png);
}

	/*项目交付*/
.orderDetail-part .project_list li.project_give>a{
	background:url(/static/images/project_give_1.png) top center no-repeat;
}
.orderDetail-part .project_list li.project_give.start>a{
	background-image: url(/static/images/project_give_2.png);
}
.orderDetail-part .project_list li.project_give.complete>a{
	background-image: url(/static/images/project_give_3.png);
}

	/*项目完成*/
.orderDetail-part .project_list li.project_com>a{
	background:url(/static/images/project_com_1.png) top center no-repeat;
}
.orderDetail-part .project_list li.project_com.start>a{
	background-image: url(/static/images/project_com_2.png);
}
.orderDetail-part .project_list li.project_com.complete>a{
	background-image: url(/static/images/project_com_3.png);
}

/* process_wrap */
.orderDetail-part .process_wrap{
	background-color: #F7F7F7;
	padding-top: 15px;
	padding-left: 35px;
	margin-top: 15px;
	position: relative;
	height: 200px;
	overflow-y: auto;

}
.orderDetail-part .process_wrap .process_list{
	font-size: 12px;
	color:#A3B2C6;
	line-height: 25px;
	position: relative;
}
.orderDetail-part .process_wrap .process_list:before{
	content: '';
	position: absolute;
	height: calc(100% - 25px);
	width: 1px;
	border-left: 1px solid #d8d8d8;
	left:23px;
	top:20px;
}
.orderDetail-part .process_wrap .process_list span{
	padding-left: 20px;
}
.orderDetail-part .process_wrap .process_list>li{
	position: relative;
	padding-left: 120px;
}
.orderDetail-part .process_wrap .process_list>li .dot_wrap{
	display: inline-block;
	padding:4px 0;
	line-height: 0;
	background-color: #f7f7f7;
	margin-right: 26px;
	position: relative; 
}
.orderDetail-part .process_wrap .process_list>li:first-child .dot_wrap{
	margin-right: 12px;
	position: relative;
	top:-2px;
}
.orderDetail-part .process_wrap .process_list>li .dot_wrap .dot_inner{
	display: inline-block;
	position: relative;
	left:-6px;
	line-height: 0;
	padding: 4px;
	border-radius: 50%;
	background-color: rgb(211,233,255);
	vertical-align: -4px;
}
.orderDetail-part .process_wrap .process_list>li .dot{
	display: inline-block;
	width: 7px;
	height: 7px;
	border-radius: 50%;
	background-color:#A3B2C6;
	vertical-align:1px;
}
.orderDetail-part .process_wrap .process_list>li:first-child .dot{
	width: 12px;
	height: 12px;
	background-color:#3BA0FF;
}

.orderDetail-part .process_wrap .process_list>li>span.date{
	position: absolute;
	left:0;
	width: 100px;
}

.orderDetail-part .process_wrap .process_list>li:first-child .date{
	color:#3BA0FF;
}
.orderDetail-part .process_wrap .process_list>li:first-child .time_list>li:first-child .time{
	color:#3BA0FF;
}


/*其他信息*/
.orderDetail-part  .other_msg .item{
	display: inline-block;
	vertical-align: top;
}
.orderDetail-part  .other_msg .item:not(:first-child){
	padding-left: 150px;
}
.orderDetail-part  .other_msg .item>h4{
	font-weight: normal;
	color:#3BA0FF;
	height: 50px;
	line-height: 50px;
}
.orderDetail-part  .other_msg .item li{
	height: 50px;
	line-height: 50px;
}
.orderDetail-part  .other_msg .item li .tit{
	color: #A3B2C6;
	margin-right: 6px;
}
.orderDetail-part  .other_msg .item li .content{
	color: #151515;
}
.orderDetail-part  .other_msg .item li p{
	display: inline-block;
}
.orderDetail-part  .other_msg .item li p.part_start{
	margin-right: 100px;
}
</style>