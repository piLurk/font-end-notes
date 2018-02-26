<template>
	<div id="role" class="component-box">
		<div class="role-content clearfix">
			<div class="form-box">
				<div class="inp-item">
					<p>工号：</p>
					<div class="inp-box">
						<input  type="text" @keydown.enter="keydownSearch" v-model.trim="form.employeeId" placeholder="请输入">
					</div>
				</div><div class="inp-item">
					<p>人员姓名：</p>
					<div class="inp-box">
						<input  type="text" @keydown.enter="keydownSearch" v-model.trim="form.realName" placeholder="请输入">
					</div>
				</div><div class="inp-item">
					<p>账号：</p>
					<div class="inp-box">
						<input type="text" @keydown.enter="keydownSearch" v-model.trim="form.userName" placeholder="请输入" >
					</div>
				</div><div class="inp-item">
					<p>角色名称：</p>
					<div class="inp-box">
						<el-select filterable class="warning" v-model.trim="form.roleId" placeholder="请选择">
							<el-option v-for="(item,key) in roles" :label="item.roleName" :value="item.id" :key="key"></el-option>
						</el-select>
					</div>
				</div>
				<div class="top-btnwrap">
					<button @click="query" class="btn btn-primary">查询</button>
					<button @click="reset" class="btn btn-reset">重置</button>				
				</div>
				
			</div>
			<div class="table-box">
				<div class="clearfix table-top">
					<div class="toppage f_r" id="toppage">
					  <span class="pdlr5">总记录：<i>{{pagination.total}}</i>条</span>
					  <span class="pdlr5">当前第<i>{{pagination.curr}}</i>页</span>
					  <span class="pdlr5" v-show="pagination.total!==0">共<i>{{parseInt(pagination.total%pagination.pageSize===0?pagination.total/pagination.pageSize:(pagination.total/pagination.pageSize+1))}}</i>页</span>
					  <span v-show="pagination.curr!==1" class="pdlr5"><a href="#" @click="pageGo(1)">首页</a></span>
					  <span v-show="pagination.curr-1>=1" class="pdlr5"><a href="#" @click="pageGo(pagination.curr-1)">上一页</a></span>
					  <span v-show="pagination.curr+1<=parseInt((pagination.total%pagination.pageSize===0?pagination.total/pagination.pageSize:(pagination.total/pagination.pageSize+1)))" class="pdlr5"><a href="#" @click="pageGo(pagination.curr+1)">下一页</a></span>
					  <span v-show="pagination.curr!==parseInt(pagination.total/pagination.pageSize)+1" class="pdlr5"><a href="#" v-show="pagination.total>pagination.pageSize" @click="pageGo(parseInt(pagination.total%pagination.pageSize===0?pagination.total/pagination.pageSize:(pagination.total/pagination.pageSize+1)))">末页</a></span>
					</div>
				</div>
				<div class="table-wrap">
					<table class="msg-table">
						<thead>
							<tr>
								<th>序号</th>
								<th>工号</th>
								<th>人员姓名</th>
								<th>账号</th>
								<th width="280">角色名称</th>
								<th class="oparateTh">操作</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item,i) in tableData">
								<td>{{i+1}}</td>
								<td>{{item.employeeId}}</td>
								<td>{{item.realName}}</td>
								<td>{{item.userName}}</td>
								<td class="roleSpan"><span v-for="(itemRole,i) in item.roleList" v-text="itemRole.roleName+(i+1!==item.roleList.length?'，':'')"></span></td>
								<td width="150" class="oparateTd alone"><a v-if="permissionObj['user_role_change']" @click="changerole(item)" href="javascript:void(0)"><i class="i-change"></i>修改角色</a></td>
							</tr>	
						</tbody>
					</table>
					<div class="pagination-box clearfix">
						<el-pagination class="f_r" v-on:current-change="changeCurrent" v-show="paginationShow"  layout="prev, pager, next" :page-size="pagination.pageSize" :current-page="pagination.curr" :total="pagination.total" ></el-pagination>
					</div>
				</div>

				

			</div>
		</div>

		<!-- 修改角色弹出层start-->
			<el-dialog id="changeRoleDialog" title="修改角色" :visible.sync="dialogVisible">
				<div class="dialog-content">
					<p><span class="name">人员姓名：{{formChange.realName}}</span></p>
					<p><span class="name">角色修改：</span><span @click.stop="selectAll" id="allRoles" class="label"><i class="i-radio"></i>全部角色</span></p>
					<ul class="per_ul clearfix">
						<li v-for="(item,i) in roles">
							<span @click="selectAlone" class="label" :data-id="item.id"><i class="i-radio"></i>{{item.roleName}}</span>
						</li>
					</ul>
				</div>
				<div slot="footer" class="dialog-footer">
					<button @click="dialogVisible=false" class="btn btn-reset">取消</button>
					<button @click="sendReq" class="btn btn-primary">确 定</button>
				</div>
			</el-dialog>

		<!-- 修改角色弹出层end-->
		<el-dialog :title="propmptMsg.tit" :visible.sync="promptShow" size="tiny">
			<span v-text="propmptMsg.content"></span>
			<span slot="footer" class="dialog-footer"><el-button type="primary" @click="promptShow = false">确 定</el-button></span>
		</el-dialog>
	</div>
</template>
<script>
// 每次都请求组织架构json和上级部门的数组————前端无数据权限。不选和选无上级部门都为无上级部门。


  export default {
    data() {
      return {
        promptShow:false,
        disabledBtn:true,
        dialogVisible:false,
        sendSureBtn:true,
        promptShow:false,
        propmptMsg:{
        	tit:'',
          	type:'',  // warning  error 
        	content:''
        },
        form:{
        	employeeId:'',
        	userName:'',
        	realName:'',
        	roleId:''
        },
        formQuery:{
        	employeeId:'',
        	userName:'',
        	realName:'',
        	roleId:''
        },
        formChange:{},
        roles:[],
        department:[],
        tableData: [],
        pagination:{
        	total:0,
        	pageSize:10,
        	curr:1
        },
        paginationShow:false,
        permissionObj:{
        	user_role_change:false,
        }
      };
    },
    methods: {
    	sendReq(){
      		//修改角色
      		var userId=this.formChange.userId,that=this;
      		var roleId=[];
      		var $obj=$('#changeRoleDialog').find('.label.selected').not('#allRoles');
      		for(var i=0;i<$obj.length;i++){
      			roleId.push($($obj[i]).data('id'))
      		}
      		var data={userId:userId,roleId:roleId.join(',')};
      		this.dialogVisible=false;
      		this.getAjax(this.host,'/function/mergeUserRoles.json',data).success(function(r){
      			if (r.code==0) {
      				// 修改成功，刷新分页
      				that.$message('角色修改成功！')
      				that.paginationReq(that.pagination.pageSize,that.pagination.curr);

      			}else{
      				that.$message.error(r.message)
      			}
      		}).error(function(e){
      			that.$message.error('服务器错误')
      		})
      		

      	},
		getAllRoles(){
			//获取所有角色
			var that=this;
			this.getAjax(this.host,'/function/findAllRoles.json').success(function(r){
			    if (r.code==0) {
			    	that.roles=r.data;
			    	that.paginationReq(that.pagination.pageSize,1);
			    }else{
			    	that.$message.error(r.message)
			    }
			}).error(function(e){
			  //返回warn或者错误 tit和content
			  that.$message.error('服务器错误')
			})
		},
		paginationReq(size,curr){
			this.pagination.curr=curr;
			//查询的分页请求
			var data=JSON.parse(JSON.stringify(this.formQuery));
			data['pageIndex']=curr;
			data['pageSize']=size;
			var that=this;			
			this.getAjax(this.host,'/function/queryUserInfoAndRole.json',data).success(function (r) {
				if (r.code==0) {
					that.pagination.total=r.data.total;
					that.tableData=r.data.list;
					that.pagination.total>that.pagination.pageSize?that.paginationShow=true:that.paginationShow=false;
				}else{
					that.$message.error(r.message);
				}
				
			}).error(function(e){
				//返回warn或者错误 tit和content
				that.$message.error('服务器错误')
			}) 
		},
		selectAll($event){
			var $target;
			if ($event.target.id=="allRoles") {
				$target=$($event.target)
			}else{
				$target=$($event.target).parent();
			}
			if ($target.hasClass('selected')) {
				$target.removeClass('selected').parents('.dialog-content').find('.per_ul .label').removeClass('selected');
			}else{
				$target.addClass('selected').parents('.dialog-content').find('.per_ul .label').addClass('selected');
			}		
		},
		selectAlone($event){
			var $target;
			if ($($event.target).hasClass('label')) {
				$target=$($event.target)
			}else{
				$target=$($event.target).parent();
			}
			if ($target.hasClass('selected')) {
				$('#allRoles').removeClass('selected');
				$target.removeClass('selected');
			}else{
				$target.addClass('selected');
				var $label=$target.parents('.dialog-content').find('.per_ul .label');
				if ($label.filter('.selected').length==$label.length) {
					//全选
					$('#allRoles').addClass('selected');
				}
				
			}	
		},
		pageGo(curr){
			this.paginationReq(this.pagination.total,curr);
		},
		changerole(item){
			this.formChange=item;	
			this.dialogVisible=true;
			var roleList=getArr(item.roleList);
			//先清空所有勾选权限
			$('#changeRoleDialog').find('.label').removeClass('selected');
			//是否是拥有所有权限
			if (roleList.length===this.roles){
				$('#allRoles').addClass('selected');
			}
			//勾选(将队列延迟进行，等待data-id数据渲染完毕)
			var timeId=setTimeout(function(){
				for (var i = 0; i < roleList.length; i++) {
					$('#changeRoleDialog').find('.label[data-id='+roleList[i].id+']').addClass('selected');
				}
				clearTimeout(timeId);
			},0)
			
		}, 
		inputChange($event){

		},
		query(){
			this.formQuery=JSON.parse(JSON.stringify(this.form))
			this.paginationReq(this.pagination.pageSize,1);	
		},
		reset(){
			this.form.employeeId='';
			this.form.realName='';
			this.form.userName='';
			this.form.roleId='';
		},
		changeCurrent(currentPage){
			this.paginationReq(this.pagination.pageSize,currentPage);
		},
		keydownSearch(){
			this.query();
		}
    },

    created:function(){
    	var permissions=this.$store.state.mutations.permissionObj;
        for(var i in this.permissionObj){
        	if (permissions[i]) {
        		this.permissionObj[i]=true;
        	}
        }
    },
    mounted:function () {
    	//获取所有权限
    	this.getAllRoles();

    	
    }

  };
//获取数组
 function getArr(arr){
	if (!!arr && Object.prototype.toString.apply(arr) === '[object Array]') {
		return arr;
	}else{
		return[];
	}
}
</script>
<style scoped>
	
	#role{
		height: 100%;
	}
	.role-content{
		height: 100%;
		position: relative;
	}
	.role-content .inp-item {
		width: 25%;
		display: inline-block;
		margin-top: 0;
		padding:15px 0;
	}
	.role-content .top-btnwrap{
		padding-left: 95px;
		padding-bottom: 15px;
	}
	.top-btnwrap button:nth-child(1){
		margin-right: 15px;
	}
	.role-content .inp-item>button:nth-child(1){
		margin-right: 15px;
	}
	.role-content .inp-item.multiple-sel{
		width: 30%;
		min-width: 360px;
	}
	.role-content .inp-item>p{
		float: left;
		width: 75px;
		line-height: 34px;
		padding-left: 15px;
		height: 34px;
	}
	.role-content .inp-item .inp-box{
		margin-left: 95px;
		margin-right: 35px;
	}
	.table-box {
		box-sizing: border-box;
		height: calc(100% - 68px);
	}
	.table-box .table-top{
		height: 35px;
		box-sizing: border-box;
	}
	.table-box .table-wrap{
		height: calc(100% - 35px);
		overflow-y: scroll;
	}
	.table-box .table-top .toppage{
		position: relative;
		font-size: 12px;
		color: #999;
		right: 0px;
		top: 10px;
	}
	.table-box .table-top .toppage .pdlr5 i,.table-box .table-top .toppage .pdlr5 a{
		color: #3ba0ff;
	}
	.table-box table{
		
	}
	
	.btn-wrap{
		padding-top: 15px;
		padding-right: 60px;
	}
	.pagination-box{
		padding-left: 25px;
		padding-top: 25px;
	}
	.dialog-content{
		padding: 0 15px;

	}
	.dialog-content>p{
		line-height: 45px;
		height: 45px;
	}
	.dialog-content span.name{
		padding-right: 10px;
	}
	.dialog-content span.label{
		cursor: pointer;
	}
	.dialog-content span.label i.i-radio{
		display: inline-block;
		width: 16px;
		height: 16px;
		border:1px solid #dfe5e7;
		vertical-align: middle;
		margin-right: 6px;
	}
	.dialog-content span.label.selected{color: #3ba0ff;}
	.dialog-content span.label.selected i.i-radio{
		border-color: #3ba0ff;
		background: url(/src/assets/images/right.png) no-repeat center center;
	}
	.dialog-content .per_ul li{
		float: left;
	}
	.dialog-content .per_ul li{
		width: 120px;
		margin:4px 5px;
	}
	#role .msg-table tr:hover td.oparateTd a{
		color:#3ba0ff;
	}
	#role .msg-table tr td.oparateTd a .i-change{
		background:url(/src/assets/images/remove2.png) 100% 100% no-repeat;
	}
	#role .msg-table tr:hover td.oparateTd a .i-change{
		background:url(/src/assets/images/remove2.png) 100% 0 no-repeat;
	}


</style>
