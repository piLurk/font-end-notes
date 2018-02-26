<template>
	<div id="query" class="component-box">
		<div class="query-content">
			<table class="person-table">
				<tr>
					<td  class="content-left" valign="top" v-show="tdShow">
						<ul class="dotUl">
		                    <li></li>
		                    <li></li>
		                    <li></li>
	                  	</ul>
						<ul v-loading="treeLoading" id="treePerson" class="ztree"></ul>
					</td>
					<td class="control-line" valign="top"></td>
					<td class="content-right" valign="top">
						<div class="form-box">
							<div class="inp-item">
								<p>工号：</p>
								<div class="inp-box">
									<input @keydown.enter="keydownSearch"  type="text" v-model.trim="form.employeeId" placeholder="请输入">
								</div>
							</div><div class="inp-item">
								<p>人员姓名：</p>
								<div class="inp-box">
									<input @keydown.enter="keydownSearch" type="text" v-model.trim="form.realName" placeholder="请输入" >
								</div>
							</div><div class="inp-item">
								<p>人员类别：</p>
								<div class="inp-box">
									<el-select class="warning" v-model="form.delFlag" @change="typeChange($event)" placeholder="请选择">
									  <el-option v-for="(item,key) in delFlags"  :label="item.name" :value="item.value" :key="key"></el-option>
									</el-select>
								</div>
							</div><div class="inp-item">
								<p>部门：</p>
								<div class="inp-box">
									<el-select filterable class="warning" v-model="form.departmentId" placeholder="请选择">
									  <el-option v-for="(item,key) in department" :label="item.name" :value="item.id" :key="key"></el-option>
									</el-select>
								</div>
							</div><div class="inp-item timeLong">
								<p>入职时间：</p>
								<div class="inp-box">
									<el-date-picker :picker-options="pickerOptionStart" v-model="form.boardDateStart" type="date" placeholder="选择日期"></el-date-picker>
									至
									<el-date-picker :picker-options="pickerOptionEnd" v-model="form.boardDateEnd" type="date" placeholder="选择日期"></el-date-picker>
								</div>
							</div>
							<div class="top-btnwrap">
								<button @click="query" class="btn btn-primary">查询</button>
								<button @click="reset" class="btn btn-reset">重置</button>
								<a v-if="permissionObj['excel_out']" :href="host+'/employeeInfo/exportEmployee.json'" class="excel_out btn btn-success f_r">导出Excel</a>
							</div>
						</div>
						<div class="table-box">
							<div class="clearfix table-top">
								<div class="topagi-wrap">
									<div class="toppage f_r" id="toppage">
									  <span class="pdlr5">总记录：<i>{{pagination.total}}</i>条</span>
									  <span class="pdlr5">当前第<i>{{pagination.curr}}</i>页</span>
									  <span class="pdlr5">共<i>{{parseInt(pagination.total%pagination.pageSize===0?pagination.total/pagination.pageSize:(pagination.total/pagination.pageSize+1))}}</i>页</span>
									  <span v-show="pagination.curr!==1" class="pdlr5"><a href="#" @click="pageGo(1)">首页</a></span>
									  <span v-show="pagination.curr-1>=1" class="pdlr5"><a href="#" @click="pageGo(pagination.curr-1)">上一页</a></span>
									  <span v-show="pagination.curr+1<=parseInt((pagination.total%pagination.pageSize===0?pagination.total/pagination.pageSize:(pagination.total/pagination.pageSize+1)))" class="pdlr5"><a href="#" @click="pageGo(pagination.curr+1)">下一页</a></span>
									  <span v-show="pagination.curr!==parseInt(pagination.total/pagination.pageSize)+1" class="pdlr5"><a href="#" v-show="pagination.total>pagination.pageSize" @click="pageGo(parseInt(pagination.total%pagination.pageSize===0?pagination.total/pagination.pageSize:(pagination.total/pagination.pageSize+1)))">末页</a></span>
									</div>
								</div>
							</div>
							<div class="table-wrap" v-loading="tableLoading">

								<table class="msg-table">
									<thead>
										<tr>
											<th width="40"></th>
											<th width="120">工号</th>
											<th width="80">人员姓名</th>
											<th width="60">性别</th>
											<th>部门</th>
											<th>岗位</th>
											<th>手机号</th>
											<th>邮箱</th>
											<th>入职日期</th>
											<th>转正日期</th>
											<th width="70">人员类别</th>
											<th v-if="formQuery.delFlag===1">离职日期</th>
											<th width="155">操作</th>
										</tr>
									</thead>
									<tbody>
										<template v-for="(item,i) in tableData" >
											<tr class="originTr">
												<td @click="selectTr(item,$event)" class="arrowTd" ></td>
												<td> <a v-if="permissionObj['oa_query_personInfos']" @click="operate('add','readOnly','查看',item)" href="javascript:void(0)">{{item.employeeId}}</a>
													<i v-else>{{item.employeeId}}</i>
												</td>
												<td>{{item.realName}}</td>
												<td>{{item.sex}}</td>
												<td>{{item.department}}</td>
												<td v-text="!!item.position?item.position:''"></td>
												<td>{{item.telPhone}}</td>
												<td style="padding-right:10px;">{{item.userName+'@jiangroom.com'}}</td>
												<td>{{!!item.boardDate?item.boardDate:''}}</td>
												<td>{{!!item.positiveDate?item.positiveDate:''}}</td>
												<td v-text="item.delFlag==='0'?'在职':'离职'"></td>
												<td v-if="formQuery.delFlag===1">{{!!item.dimissionDate?item.dimissionDate:''}}</td>
												<td class="separateTd"><span class="editSpan" v-if="permissionObj['edit_personInfo'] && item.delFlag!=='1'"><a href="javascript:void(0)" @click="operate('add','edit','编辑',item)">编辑</a></span><span class="changeSpan" v-if="permissionObj['personnel_change'] && item.delFlag!=='1'"><a href="javascript:void(0)" @click="operate('personnelChange','personnelChange','人事变动',item)">人事变动</a></span><span class="quitSpan" v-if="permissionObj['quit_person'] && item.delFlag!=='1'"><a @click="operate('quit','quit','离职',item)" href="javascript:void(0)">离职</a></span><span class="numberSpan" v-if="permissionObj['Extension_number'] && item.delFlag!=='1'"><a @click="operate('extentionNumber','extentionNumber','录入分机号',item)" href="javascript:void(0)">录入分机号</a></span><span class="numberSpan" v-if="permissionObj['Extension_number'] && item.delFlag!=='0'"><a @click="operate('personBack','personBack','返聘',item)" href="javascript:void(0)">返聘</a></span></td>
											</tr>
											<tr>
												<td :colspan="formQuery.delFlag===1?13:12"><div class="table-inner">
													<table>
														<thead>
															<th width="40"></th>
															<th>序号</th>
															<th>变动日期</th>
															<th>原部门</th>
															<th>原岗位</th>
															<th>原岗位等级</th>
															<th>变动类型</th>
															<th>离职原因</th>
															<th>变动说明</th>
														</thead>
														<tbody>
															<tr v-for="(changeItem,k) in item.userRecordList">
																<td width="40"></td>
																<td>{{k+1}}</td>
																<td>{{changeItem.officeStartDate}}</td>
																<td>{{changeItem.department}}</td>
																<td>{{changeItem.position}}</td>
																<td>{{changeItem.positionLevel}}</td>
																<td>{{changeTypes[getNumber(changeItem.changeType)-1].name}}</td>
																<td>{{changeItem.changeReason}}</td>
																<td>{{changeItem.changeRemark}}</td>
															</tr>
														</tbody>
													</table>
													</div>
												</td>
											</tr>
										</template>	
									</tbody>
								</table>
								<div class="pagination-box clearfix">
									<el-pagination class="f_r" v-on:current-change="changeCurrent" v-show="paginationShow"  layout="prev, pager, next" :page-size="pagination.pageSize" :current-page="pagination.curr" :total="pagination.total" ></el-pagination>
								</div>
							</div>
						</div>
					</td>
				</tr>
			</table>
			
			
		</div>
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
      	changeTypes:[{name:"转正",value:1},{name:"晋升",value:2},{name:"调动",value:3},{name:"降职",value:4},{name:"离职",value:5},{name:"返聘",value:5},{name:"入职",value:5}],
      	quitReasons:[{name:'家庭因素',value:1},{name:'身体因素',value:2},{name:'职业发展',value:3},{name:'薪资过低',value:4},{name:'发展空间',value:5},{name:'工作环境',value:6},{name:'劝退',value:7},{name:'辞退',value:8},{name:'其他',value:9}],
      	pickerOptionEnd: {
	        disabledDate:(time) => {
	         	let boardDateStart = this.form.boardDateStart;
	         	if (!!boardDateStart) {
	         		return time.getTime() < boardDateStart;
	         	}  	
	        }
		},
		pickerOptionStart: {
	        disabledDate:(time) => {
	         	let boardDateEnd = this.form.boardDateEnd;
	         	if (!!boardDateEnd) {
	         		return time.getTime() > boardDateEnd;
	         	}  	
	        }
		},
        promptShow:false,
        disabledBtn:true,
        outComing:false,
        dialogVisible:false,
        changeReal:true,
        sendSureBtn:true,
        delFlags:[{name:'在职',value:0},{name:'离职',value:1}],
        dialogMsg:{
        	tit:'',
        	type:''
        },
        promptShow:false,
        propmptMsg:{
        	tit:'',
          	type:'',  // warning  error 
        	content:''
        },
        form:{
        	employeeId:'',
        	realName:'',
        	delFlag:0,
        	departmentId:'',
        	boardDateStart:'',
        	boardDateEnd:''
        },
        formQuery:{
        	employeeId:'',
        	realName:'',
        	delFlag:0,
        	departmentId:'',
        	boardDateStart:'',
        	boardDateEnd:''
        },
        department:[],
        tableData: [],
        pagination:{
        	total:0,
        	pageSize:10,
        	curr:1
        },
        paginationShow:false,
        tableLoading:true,
        treeLoading:true,
        tdShow:true,
        permissionObj:{
        	edit_personInfo:false,  //编辑
        	personnel_change:false,  //人事变动
        	quit_person:false,  //离职
        	excel_out:false,  //导出表格
        	Extension_number:false, //录入分机号
        	oa_query_personInfos:false,//查看人员信息
        }
      };
    },
    methods: {
    	getNumber(value){
    		if (value==='0' || value===0) {
    			return 0;
    		}
    		return !!value?parseInt(value):'';
    	},
    	sendReq(){
      		this.getData(this.dialogMsg.type);
      	},
      	typeChange($event){      		
      		if ($event===0) {
      			this.tdShow=true;
      		}else{
      			this.tdShow=false;
      		}
      	},
		getTree(){
			this.treeLoading=false;
			var that=this;
			this.getAjax(this.host,'/organ/getDeparts.json',{type:'user'}).success(function(r){
				if (r.code==0) {
				  that.tree=r.data.departs;
				  that.deType=r.data.departType;
				  that.department=r.data.departs;
				  that.treeLoading=false;
				  // 树配置
				  var setting = {
				    view: {
				      dblClickExpand: dblClickExpand,
				      showIcon:showIconForTree,
				      addDiyDom: addDiyDom
				    },
				    data: {
				      simpleData: {
				        enable: true
				      }
				    },
				    callback:{
				      beforeClick: zTreeBeforeClick,
				      onClick: zTreeOnClick
				    }
				  };
				  function addDiyDom(treeId, treeNode) {
				  	var aObj = $("#" + treeNode.tId + "_span");
				  	var editStr = "<span id='department_id_" +treeNode.id+ "' ><i style='font-size:12px;font-weight:normal;'>（"+treeNode.memberNum+"）</i></span>";
				  	aObj.append(editStr);
				  };
				  function zTreeBeforeClick(treeId,treeNode,clickFlag){
				   
				  }
				  function zTreeOnClick(event,treeId,treeNode){
				  	var departmentId=getNumber(treeNode.id);
				  	var form={
				  		employeeId:'',
				  		realName:'',
				  		delFlag:0,
				  		departmentId:departmentId,
				  		boardDateStart:'',
        				boardDateEnd:''
				  	}
				  	that.form=that.formQuery=form;
				  	that.paginationReq(that.pagination.pageSize,1);
				   
				  }
				  $.fn.zTree.init($("#treePerson"), setting, r.data.departs);
				}else{
				  that.$message.error(e.message);
				}
			}).error(function(e){
				that.$message.error('服务器错误！');
			})
		},
		paginationReq(size,curr){
			var that=this;
			this.tableLoading=true;
			this.pagination.curr=curr;
			//查询的分页请求
			var data=JSON.parse(JSON.stringify(this.formQuery));
			data['boardDateStart']=!!data['boardDateStart']?getDate(data['boardDateStart']):'';
			data['boardDateEnd']=!!data['boardDateEnd']?getDate(data['boardDateEnd']):'';
			data['pageIndex']=curr;
			data['pageSize']=size;
			this.getAjax(this.host,'/employeeInfo/queryUserInfos.json',data).success(function (r) {
				if (r.code===0) {
					that.tableLoading=false;
					$('#query .msg-table tr.originTr.active').removeClass('active');
					that.pagination.total=r.data.total;
					that.tableData=r.data.list;
					that.pagination.total>that.pagination.pageSize?that.paginationShow=true:that.paginationShow=false;
				}else{
					that.$message.error(r.message)
				}
			}).error(function(e){
				//返回warn或者错误 tit和content
				that.$message.error('服务器错误！')
			})
		},
		pageGo(curr){
			this.paginationReq(this.pagination.pageSize,curr);
		},
		query(){
			$('#query .msg-table tr.active').removeClass('active');
			this.changeReal=true;
			this.disabledBtn=true;
			this.formQuery=JSON.parse(JSON.stringify(this.form))
			this.paginationReq(this.pagination.pageSize,1);	
		},
		reset(){
			this.form.employeeId='';
			this.form.realName='';
			this.form.delFlag=0;
			this.form.departmentId=[];
			this.form.boardDateStart='',
        	this.form.boardDateEnd=''

		},
		changeCurrent(currentPage){
			this.paginationReq(this.pagination.pageSize,currentPage);
		},
		selectTr(item,$event){
			var $target=$($event.target).parents('tr.originTr');
			if ($target.hasClass('active')) {
				$target.removeClass('active');
			}else{
				$target.addClass('active').siblings().removeClass('active');
			}		
		},
		pageChange(componentName,currentViewId,personId,permission){
			var obj={component:componentName,id:currentViewId,personId:personId};
			if (!!permission && permission==='readOnly') {
				obj['readOnly']=true;
			}else{
				obj['readOnly']=false;
			}
			this.$store.dispatch('itemArrAdd',obj);		
		},
		operate(componentName,operateType,operateName,item){
			//id 应为操作tap id。不应该与employeeId、href等绑定。这里设为操作类型type+人员employeeId
			var currentViewId=operateType+item.id,realName=item.realName,personId=item.id;
			var $edit=$('<a style="visibility:hidden;height:0px;" class="J_menuItem" href="javascript:void(0)" data-href="'+currentViewId+'">'+realName+'--'+operateName+'<em class="i-rightarrow"></em></a>');
			$edit.prependTo($('body'));
			tap();
			$edit.trigger('click').remove();

			if (operateType==='readOnly') {
				//只读
				this.pageChange(componentName,currentViewId,personId,'readOnly');
			}else{
				this.pageChange(componentName,currentViewId,personId);
			}			
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
    	var dragTest=new Drag('#query .control-line','#query .content-left',{
    	  maxW:300,
    	  minW:120,
    	  speed:4
    	});
    //默认请求第一页
    	this.paginationReq(this.pagination.pageSize,1);

    //获取部门
    	this.getTree();
    }
  };
   function dblClickExpand(treeId, treeNode) {
    return treeNode.level > 0;
  }
  
  function showIconForTree(treeId, treeNode) {
      return !treeNode.isParent;
  }
//获取
function getNumber(value){
	if (value==='0' || value===0) {
		return 0;
	}
	return !!value?parseInt(value):'';
}
// 获取标准时间
function getDate(value){
  if (!!value) {
    return (new Date()).getBJDate(value);
  }else{
    return ''
  }
}
</script>

<style scoped>
	#query .table-box{height:calc(100% - 169px);}
	#query{
		height: 100%;
		
	}
	.query-content{
		height: 100%;
		position: relative;
		overflow-y: scroll;
	}
	.query-content .person-table{width: 100%;border-collapse: collapse;height: 100%;}
	.query-content .dotUl{top:7px;}
	.query-content .content-left{
		width: 173px;position: relative; background-color: #fff;padding: 25px 0 45px 25px;
		height: calc(100% - 45px);
		border-right: 2px solid #e3e7eb;
	}
	.query-content .control-line{
		width: 4px;
	    height: 100%;
	    background-color: #ecf0f3;
	    cursor: e-resize;
	}
	.query-content .form-box{
		margin-bottom: 4px;
		padding-top: 15px;
	}
	.query-content .inp-item {
		width: 25%;
		display: inline-block;
		margin-top: 0;
		padding-bottom:15px;
	}
	.query-content .inp-item.timeLong{
		width: 50%;
	}
	.inp-item.timeLong div.el-date-editor.el-input{
		width: 45%
	}
	.query-content .inp-item.multiple-sel{
		min-width: 360px;
	}

	.query-content .inp-item>p{
		float: left;
		width: 75px;
		line-height: 36px;
		padding-left: 15px;
		height: 36px;
		color: #576578;
	}
	.query-content .inp-item .inp-box{
		margin-left: 95px;
		margin-right: 15px;
	}
	.top-btnwrap{
		padding-left:95px;
		padding-bottom: 15px;

	}
	.top-btnwrap button:nth-child(1){
		margin-right: 15px;
	}
	.excel_out{margin-right: 15px;}
	.table-box .table-top{
		padding-bottom: 7px;
		height: 30px;
		box-sizing: border-box;
	}
	.table-box .table-top .toppage{
		position: relative;
		right: 0px;
		font-size: 12px;
		color: #999;
	}
	.table-box .table-top .toppage .pdlr5 i,.table-box .table-top .toppage .pdlr5 a{
		color: #3ba0ff;
	}
	.table-box table{
		
	}
	.table-wrap{
		padding-bottom: 35px;
	}
	.btn-wrap{
		padding-right: 60px;
		position: relative;
		bottom: -10px;
	}
	.pagination-box{
		padding-left: 25px;
		padding-top: 25px;
	}
	.msg-table{border-collapse:collapse;table-layout: fixed;}
	.msg-table td{
		cursor: auto;
		word-break: break-all;
	}
	.msg-table tr.active td{
		background-color: #3ba0ff;
		color: #fff;
	}
	.msg-table td.arrowTd{
		cursor: pointer;
		background-image:url(/src/assets/images/uptable.png);
		background-position: center center;
		background-repeat: no-repeat;
	}
	.msg-table tr > td:first-child, .msg-table tr > th:first-child{padding: 0}
	.msg-table tr.originTr>td.arrowTd{
		width: 40px;
	}
	.msg-table tr.originTr.active td.arrowTd{
		background-image:url(/src/assets/images/downtable.png);
	}
	.msg-table tr.originTr td.separateTd a{color:#d1d1d1;}
	.msg-table tr.originTr:hover td.separateTd .editSpan a{color:#3ba0ff; }
	.msg-table tr.originTr:hover td.separateTd .changeSpan a{color:#0fd38a; }
	.msg-table tr.originTr:hover td.separateTd .quitSpan a{color:#f6732b; }
	.msg-table tr.originTr:hover td.separateTd .numberSpan a{color:#3ba0ff;}
	.msg-table tr.originTr a{color:#3ba0ff;}
	.msg-table tr.originTr a:hover{text-decoration: underline;}
	.msg-table tr.originTr td.separateTd span:not(:last-child){
		margin-right: 8px;
	}
	.msg-table tr.originTr.active td a{color:#ffe84c !important;}
	.msg-table tr.originTr+tr{
		display: none;
	}
	.msg-table tr.originTr+tr>td{
		width: 100%;
		position: relative;
		top:-1px;
	}
	.msg-table tr.originTr+tr>td table{
		border-collapse: collapse;
		width: 100%;
	}
	.msg-table tr.originTr+tr>td table th{
		background-color: #ecf4ff;
		color: #a3b2c6;
	}
	.msg-table tr.originTr+tr>td table th:first-child,.msg-table tr.originTr+tr>td table th:first-child{
		
	}
	.msg-table tr.originTr.active+tr{
		display:table-row;
	}

	.msg-table tr.originTr.active+tr>td{
		box-sizing: border-box;
	}
	.msg-table tr.originTr.active+tr>td .table-inner{
		border:2px solid #3ba0ff;
		border-top: 0;
		margin-bottom: 3px;
	}
	.msg-table tr.active td:last-child{
		display: table-cell;
	}

</style>
<style type="text/css">
	/*ztree*/
	#query ul.ztree li a.level0:hover{
		background-color: #f6f8f8;
	}
	#query .ztree li a.level0{cursor: pointer;}
</style>
