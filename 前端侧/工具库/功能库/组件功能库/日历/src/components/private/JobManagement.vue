<template>
	<div id="job" class="component-box">
		<div class="job-content clearfix">
			<div class="form-box">
				<div class="inp-item">
					<p>岗位编码：</p>
					<div class="inp-box">
						<input @keydown.enter="keydownSearch"  type="text" v-model.trim="form.positionCode" placeholder="请输入">
					</div>
				</div><div class="inp-item">
					<p>岗位名称：</p>
					<div class="inp-box">
						<input @keydown.enter="keydownSearch" type="text" v-model.trim="form.positionName" placeholder="请输入" >
					</div>
				</div><div class="inp-item">
					<p>所属部门：</p>
					<div class="inp-box">
						<el-select filterable class="warning" v-model="form.departmentId" placeholder="请选择">
						  <el-option v-for="(item,key) in department" :label="item.name" :value="item.id" :key="key"></el-option>
						</el-select>
					</div>
				</div><div class="inp-item">
					<button @click="query" class="btn btn-primary">查询</button>
					<button @click="reset" class="btn btn-reset">重置</button>
				</div>
				
			</div>
			<div class="table-box">
				<div class="clearfix table-top">
					<div class="f_l">
						<button v-if="permissionObj['job_add']" @click="addJob" class="btn btn-skyBlue bold"><span class="symbol">+&nbsp;&nbsp;</span>创建岗位</button>	
					</div>
					
					<div class="toppage f_r" id="toppage">
						  <span class="pdlr5">总记录：<i>{{pagination.total}}</i>条</span>
						  <span class="pdlr5" v-show="pagination.total!==0">当前第<i>{{pagination.curr}}</i>页</span>
						  <span class="pdlr5">共<i>{{parseInt(pagination.total%pagination.pageSize===0?pagination.total/pagination.pageSize:(pagination.total/pagination.pageSize+1))}}</i>页</span>
						  <span v-show="pagination.curr!==1" class="pdlr5"><a href="#" @click="pageGo(1)">首页</a></span>
						  <span v-show="pagination.curr-1>=1" class="pdlr5"><a href="#" @click="pageGo(pagination.curr-1)">上一页</a></span>
						  <span v-show="pagination.curr+1<=parseInt((pagination.total%pagination.pageSize===0?pagination.total/pagination.pageSize:(pagination.total/pagination.pageSize+1)))" class="pdlr5"><a href="#" @click="pageGo(pagination.curr+1)">下一页</a></span>
						  <span v-show="pagination.curr!==parseInt(pagination.total/pagination.pageSize)+1" class="pdlr5"><a href="#" v-show="pagination.total>pagination.pageSize" @click="pageGo(parseInt(pagination.total%pagination.pageSize===0?pagination.total/pagination.pageSize:(pagination.total/pagination.pageSize+1)))">末页</a></span>
					</div>	
				</div>
				<div class="table-wrap" v-loading="tableLoading">
					<table class="msg-table">
						<thead>
							<tr>
								<th>序号</th>
								<th>岗位编码</th>
								<th>岗位名称</th>
								<th>所属部门</th>
								<th width="280">默认角色</th>
								<th class="oparateTh">操作</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item,i) in tableData">
								<td>{{i+1}}</td>
								<td>{{item.positionCode}}</td>
								<td>{{item.positionName}}</td>
								<td>{{item.departmentName}}</td>
								<td class="roleTd"><span v-for="(roleItem,k) in item.roleList">{{roleItem.roleName+(k===item.roleList.length-1?'':'，')}}</span></td>
								<td width="150" class="oparateTd"><a v-if="permissionObj['job_delete']" @click="removeJob(item.id,$event)" href="javascript:void(0)"><i class="i-del"></i>删除</a><a v-if="permissionObj['job_edit']" @click="changeJob(item)" href="javascript:void(0)"><i class="i-edit"></i>编辑</a></td>
							</tr>	
						</tbody>
					</table>
					<div class="pagination-box clearfix">
						<el-pagination class="f_r" v-on:current-change="changeCurrent" v-show="paginationShow"  layout="prev, pager, next" :page-size="pagination.pageSize" :current-page="pagination.curr" :total="pagination.total" ></el-pagination>
					</div>
				</div>
				
				

			</div>
		</div>
		<!-- 增改弹出层start-->
			<el-dialog :title="dialogMsg.tit" :visible.sync="dialogVisible">
			  <div id="formDialogJo" class="dialog-form">
			  	<div class="inp-item positionName">
			  		<p>岗位名称：</p>
			  		<div class="inp-box">
			  			<input   type="text" v-model.trim="formSend.positionName" @blur="change('.positionName',$event.target.value)" placeholder="请输入">
			  			<p class="errorMsg"></p>
			  		</div>
			  	</div><div class="inp-item departmentId">
					<p>所属部门：</p>
					<div class="inp-box">
						<el-select filterable v-model="formSend.departmentId" @change="change('.departmentId',$event)" placeholder="请选择">
						  <el-option v-for="(item,key) in department" v-if="item.pId===0&&item.id!==0" :label="item.name" :value="item.id" :key="key"></el-option>
						</el-select>
						<p class="errorMsg"></p>
					</div>
				</div><div class="inp-item multiple-sel defaultRoleIds">
					<p>默认角色：</p>
					<div class="inp-box">
						<el-select v-model="formSend.defaultRoleIds" @change="change('.defaultRoleIds',$event)" multiple placeholder="请选择">
						  <el-option v-for="(item,key) in role" :label="item.roleName" :value="item.id" :key="key"></el-option>
						</el-select>
						<p class="errorMsg"></p>
					</div>
				</div>
			  </div>
			  <div slot="footer" class="dialog-footer">
			  	<button @click="dialogVisible = false" class="btn btn-reset">取 消</button>
			  	<button @click="createOrChange" class="btn btn-primary">确 定</button>   
			  </div>
			</el-dialog>

		<!-- 增改弹出层end-->
		<!-- 删除start -->
		<el-dialog :visible.sync="promptShow" size="tiny" class="remove-dialog">
				<span v-text="propmptMsg.content"></span>
				<span slot="footer" class="dialog-footer">
          		<button class="btn btn-primary" @click="removeJobReq">确 定</button>
          		<button class="btn btn-reset" @click="promptShow=false">取 消</button>  
       			 </span>
		</el-dialog>
		<!-- 删除end -->
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
        dialogMsg:{
        	tit:'',
        	type:''
        },
        promptShow:false,
        propmptMsg:{
        	content:''
        },
        form:{
        	positionCode:'',
        	positionName:'',
        	departmentId:''
        },
        formQuery:{
        	positionCode:'',
        	positionName:'',
        	departmentId:''
        },
        formSend:{
        	positionName:'',
        	departmentId:'',      
        	defaultRoleIds:[]	
        },
        department:[],
        role:[],
        tableData: [],
        jobMsg:{
        	jobId:'',
        	jobTr:null
        },
        pagination:{
        	total:0,
        	pageSize:10,
        	curr:1
        },
        paginationShow:false,
        tableLoading:true,
        permissionObj:{
          	job_add:false,
			job_delete:false,
			job_edit:false
        }
      };
    },
    methods: { 	
		getDepartment(){
			//获取部门

			var that=this;
			this.getAjax(this.host,'/organ/getDeparts.json').success(function(r){
				if (r.code==0) {
					that.department=r.data.departs;
					that.paginationReq(that.pagination.pageSize,1);
				}else{
					that.$message.error(r.message)
				}
			    
			}).error(function(e){
			  //返回warn或者错误 tit和content
			 	that.$message.error('服务器错误');
			})
		},
		getAllRoles(){
			//获取所有角色
			var that=this;
			this.getAjax(this.host,'/function/findAllRoles.json').success(function(r){
				if (r.code==0) {
					that.role=r.data;
				}else{
					that.$message.error('获取角色数据失败')
				}
			    
			}).error(function(e){
			  //返回warn或者错误 tit和content
			 	that.$message.error('服务器错误');
			})
		},
		createOrChange(){
			var flag=false;
			var formSend=this.formSend;
	        for(var i in formSend){
	           if (i==='defaultRoleIds') {
	           	break;
	           }
	          if (Object.prototype.toString.apply(formSend[i]) === '[object Array]' && formSend[i].length===0) {
	            flag=true;
	            $('#formDialogJo ').find('.'+i+' input').addClass('error').parents('.inp-box').find('.errorMsg').text('输入不能为空！');
	            break;
	          }else if(!!formSend[i]===false && formSend[i]!==0){
	            flag=true; 
	            $('#formDialogJo ').find('.'+i+' input').addClass('error').parents('.inp-box').find('.errorMsg').text('输入不能为空！');
	            break;
	          }
	        }
	        if (flag) {
	          return
	        }
			//创建或修改岗位
			this.dialogVisible=false;
			this.tableLoading=true;
			var that=this,url;
			var data=JSON.parse(JSON.stringify(this.formSend));
			var departmentId=data.defaultRoleIds.join(',');
			data.defaultRoleIds=departmentId;
			var type;
			if (this.dialogMsg.type=="ADD") {
				url='/organ/savePosition.json';
				type="ADD"
			}else if (this.dialogMsg.type=="CHANGE") {
				url='/organ/mergePosition.json';
				type="CHANGE";
			}
			this.getAjax(this.host,url,data).success(function(r){
				if (r.code==0) {
					//岗位创建成功
					if (type==="ADD") {
						that.$message("岗位创建成功");
					}else{
						that.$message("岗位修改成功");
					}
					
					that.paginationReq(that.pagination.pageSize,1);
				}else{
					that.tableLoading=false;
					that.$message.error(r.message);
				}
			}).error(function(e){
				that.tableLoading=false;
				that.$message.error('服务器错误！')
			})
		},
		paginationReq(size,curr){
			return;
			this.pagination.curr=curr;
			//查询的分页请求
			var that=this;	
			var data=JSON.parse(JSON.stringify(this.formQuery));
			data['pageNum']=curr;
			data['limit']=size; 
			this.getAjax(this.host,'/organ/queryPosition.json',data).success(function (r) {
				that.tableLoading=false;
				if (r.code==0) {
					that.tableLoading=false;
					that.pagination.total=r.data.total;
					that.tableData=r.data.list;
					that.pagination.total>that.pagination.pageSize?that.paginationShow=true:that.paginationShow=false;
				}else{
					that.$message.error('请求成功，但数据未正常返回')
				}
				
			}).error(function(e){
				//返回warn或者错误 tit和content
				that.tableLoading=false;
				that.$message.error('服务器错误！');
			}) 
		},
		removeJobReq(){
			//删除岗位
			this.promptShow=false;
			var url='/organ/deletePosition/',that=this;
			url+=(this.jobMsg.jobId+'.json');
			this.getAjax(this.host,url).success(function(r){
				if (r.code==0) {
					that.$message('岗位删除成功！');
					that.paginationReq(that.pagination.pageSize,1)
				}else{
					that.$message.error(r.message);
				}
			    
			}).error(function(e){
			 	that.$message.error('服务器请求失败');
			})

		},
		pageGo(curr){
			this.paginationReq(this.pagination.total,curr);
		},
		addJob(){
			//置空formSend
			this.formSend={
	        	positionName:'',
	        	departmentId:'',      
	        	defaultRoleIds:[]	
        	}
        	var that=this;
	        var timeId=setTimeout(function(){
	            that.removeAllError();
	            that.dialogMsg.tit='创建岗位';
				that.dialogMsg.type="ADD";
				that.dialogVisible=true;
	            setTimeout(timeId);
	        },0)
			
		},
		changeJob(item){
			//获取formSend
			this.formSend.positionName=item.positionName;
			this.formSend.departmentId=item.departmentId;
			var roleItemArr=item.roleList,roleArr=[];
			for(var i=0;i<roleItemArr.length;i++){
				roleArr.push(roleItemArr[i].id)
			}
			this.formSend.defaultRoleIds=roleArr;
			this.formSend['id']=item.id;
			
			var that=this;
	        var timeId=setTimeout(function(){
	            that.removeAllError();
	            that.dialogMsg.tit='修改岗位';
				that.dialogMsg.type="CHANGE";
				that.dialogVisible=true;
	            setTimeout(timeId);
	        },0)
			
		},
		removeJob(jobId,$event){
			this.jobMsg.jobId=jobId;
			this.jobMsg.jobTr=$($event.target).parents('tr');
			this.propmptMsg.content="确定删除该岗位？"
	        this.promptShow=true;
		},
		excelOut(){
			//导出excel

		},
		inputChange($event){
		},
		query(){
			//仅有点击查询时，formSend才会刷新
			this.formQuery=JSON.parse(JSON.stringify(this.form))
			this.paginationReq(this.pagination.pageSize,1);	
		},
		reset(){
			this.form.positionCode='';
			this.form.positionName='';
			this.form.departmentId='';
		},
		change(selector,value){

	        if (!!value || value===0) {
	          //有数据
	          $('#formDialogJo '+selector).find('input').removeClass('error').end().find('.errorMsg').text('');
	        }else{
	          $('#formDialogJo '+selector).find('input').addClass('error').end().find('.errorMsg').text('输入不能为空！');
	        }
	      },
	    removeAllError(){
	        $('#formDialogJo input.error').removeClass('error').parents('.inp-box').find('.errorMsg').text('');
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
    	//获取所有部门
    	this.getDepartment();
    	//获取所有权限
    	this.getAllRoles();
    }
  };
</script>
<style>
	
	#job{
		height: 100%;
	}
	.job-content{
		height: 100%;
		position: relative;
	}
	.job-content .inp-item {
		width: 25%;
		display: inline-block;
		margin-top: 0;
		padding:15px 0;
	}
	.job-content .inp-item .inp-item button:nth-child(1){
		margin-right: 15px;
	}
	.job-content .inp-item.multiple-sel{
		width: 30%;
		min-width: 360px;
	}

	.job-content .inp-item>p{
		float: left;
		width: 75px;
		line-height: 34px;
		padding-left: 15px;
		height: 34px;
		color: #576578;
	}
	.job-content .inp-item .inp-box{
		margin-left: 95px;
		margin-right: 20px;
	}
	.job-content td.roleTd span:not(:first-child){
		padding-left: 8px;
	}
	.table-box .table-top{
		position: relative;
		padding-bottom: 15px;
		box-sizing: border-box;
		height: 50px;
	}
	.table-box .table-top .toppage{
		position: relative;
		top: 25px;
		right: 0px;
		font-size: 12px;
		color: #999;
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
	.job-content .table-box{
		height:calc(100% - 68px);
	}
	.job-content .table-wrap{
		height:calc(100% - 50px);
		overflow-y: scroll;
	}
	.pagination-box{
		padding-left: 25px;
		padding-top: 25px;
	}
	.msg-table td i {
    display: inline-block;
    margin-right: 4px;
    width:10px;
    height: 10px;
    vertical-align: baseline;
  }
  .msg-table td i.i-del{
    background: url(/src/assets/images/remove2.png) 0 100%;
  }
  .msg-table td i.i-edit{
    background: url(/src/assets/images/remove2.png) 100% 100%;
  }

  .msg-table tr:hover td i.i-del{
    background: url(/src/assets/images/remove2.png) 0 0;
  }
  .msg-table tr:hover td i.i-edit{
    background: url(/src/assets/images/remove2.png) 100% 0;
  }

</style>
