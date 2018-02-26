<template>
	<div id="extentionNumber">
		<div class="operate-content">
			<h3>录入分机号</h3>
			<div class="msg-wrap">
				<ul class="content-ul">
					<li><p>人员编码：</p><div class="inp-box">{{form.employeeId}}</div></li><li><p>人员姓名：</p><div class="inp-box">{{form.realName}}</div></li><li><p>部门：</p><div class="inp-box">{{form.departmentName}}</div></li><li><p>岗位：</p><div class="inp-box">{{form.position}}</div></li><li>
						<p class="tit">分机号：</p>
						<div class="inp-box">
							<input type="text"  placeholder="请输入" v-model.trim="formSend.tel">
						</div>
					</li>
				</ul>
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
				form:{
					employeeId:'',
					realName:'',
					departmentName:'',
					position:''
				},
				formSend:{
					tel:''
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
		              	that.formSend.tel=!!r.data.userInfo.tel?r.data.userInfo.tel:'' //分机号		              	
		              }

					}else{
						that.$message.error(r.message);
					}
				}).error(function(e){
					that.$message.error('服务器错误');
				})

			},
			makeSure(){
				var data=JSON.parse(JSON.stringify(this.formSend));
				var that=this;

				data['id']=this.manId;
				this.getAjax(this.host,'/employeeInfo/extensionNumber.json',data).success(function(r){
					if (r.code===0) {
						that.$message('分机号录入成功！');
						that.reset()
					}else{
						that.$message.error(r.message);
					}
				}).error(function(e){
					that.$message.error('服务器错误')
				});
				
			},
			reset(){
				this.$store.dispatch('itemArrAdd',{component:'query',id:'query'})
            	this.$store.state.mutations.currentViewId='query';
				var $target=$('#side-menu').find('a.J_menuItem[data-href="query"]');
				$target.trigger('click');

			}
		},
		mounted:function() {
			var personId=this.$store.state.mutations.personId;
			this.manId=personId;
			//录入分机号
			this.getData(personId);
			
		}
	}
	function getValue(value){
	return !!value?value:'---'
	}
</script>
<style type="text/css" scoped>
	#extentionNumber{height: 100%;background-color: #fff;overflow-y: scroll;}
</style>