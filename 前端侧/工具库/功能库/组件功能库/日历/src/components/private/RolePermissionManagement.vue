<template>
	<div id="RolePermission">
		<div class="form-box">
			<div class="inp-item">
				<p>角色编码：</p>
				<div class="inp-box">
					<input @keydown.enter="keydownSearch" type="text" v-model.trim="form.roleCode" placeholder="请输入">
				</div>
			</div><div class="inp-item">
				<p>角色名称：</p>
				<div class="inp-box">
					<input @keydown.enter="keydownSearch" type="text" v-model.trim="form.roleName" placeholder="请输入" >
				</div>
			</div><div class="inp-item">
				<button @click="query" class="btn btn-primary">查询</button>
				<button @click="reset" class="btn btn-reset">重置</button>
			</div>
		</div>
		<table class="content-wrap">
			<tr>
				<td class="content-left" valign="top">
					<h3>角色列表</h3>
					<div class="list-wrap">
						<ul class="tapUl">
							<li class="clearfix" v-show="(!!formQuery.roleCode?formQuery.roleCode===item.roleCode:true)&&(!!formQuery.roleName?formQuery.roleName===item.roleName:true)"  @click="activeChange(item,$event)"  v-for="(item,key) in roles">
								<p class="top"><span>{{item.roleName}}</span><span :title="item.roleCode">{{item.roleCode}}</span></p>
								<p class="bot" v-if="permissionObj['role_rename']"><span style="display:none;" @click.self="removeRole($event)"><i class="i-del"></i>删除</span><span @click="reNameRole($event)"><i class="i-change"></i>重命名</span></p>
							</li>
						</ul>
						<p v-if="permissionObj['role_add']" class="createP" v-show="createBtn"><a id="createRole" @click="createRole" href="javascript:void(0);"><span class="symbol"></span>创建角色</a></p>
						<div v-if="permissionObj['role_add']" v-show="createRoleArea">
							<div class="textAreaItem">
								<textarea id="roleCodeInp" class="RoleItem"  @blur="checkInp($event)" v-model="newRole.roleName" placeholder="请输入角色名称"></textarea>
							</div>
							<div class="textAreaItem">
								<textarea id="roleNameInp" class="RoleItem"  @blur="checkInp($event)" v-model="newRole.roleCode" placeholder="请输入角色编码"></textarea>
							</div>
							<button class="btn btn-primary btn-small" @click="createRoleSure">确定</button>
							<button class="btn btn-reset btn-small" @click="createRoleReset">取消</button>
						</div>
						
					</div>
				</td>
				<td class="content-right" valign="top">
					<div class="role-box clearfix">
						<div id="role-wrap" class="role-wrap">
			
						</div>
						<div class="btn-wrap">
							<button @click="makeSure" v-if="permissionObj['role_permission_set']" v-show="!!roleId" class="btn btn-primary">确定</button>
						</div>
						
					</div>
				</td>	
			</tr>
			
		</table>
		<!-- 重命名弹出层start-->
			<el-dialog title="重命名角色" :visible.sync="dialogVisible">
			  <div id="formDialogRo" class="dialog-form">
		          <div class="inp-item">
		            <p>角色编码：</p>
		            <div class="inp-box">
		              <input disabled type="text" v-model.trim="roleCode"  placeholder="请输入" >
		            </div>
		          </div><div class="inp-item roleName">
		              <p>角色名称</p>
		              <div class="inp-box">
		                <input  type="text" @blur="change('.roleName',$event.target.value)" v-model.trim="roleName"  placeholder="请输入" >
		                <p class="errorMsg"></p>
		              </div>
		              
		           </div>
			  </div>
			  <div slot="footer" class="dialog-footer">
		          <button class="btn btn-reset bold" @click="dialogVisible = false">取 消</button>
		          <button class="btn btn-primary bold" @click="changeRoleSure">确 认</button>
			  </div>
			</el-dialog>
		<!-- 重命名弹出层end-->
		<!-- remvoe start -->
			<el-dialog :visible.sync="promptShow" size="tiny" class="remove-dialog">
				<span>确认删除角色</span>
				<span slot="footer" class="dialog-footer">
		          <button class="btn btn-reset" @click="promptShow=false">取 消</button>
		          <button class="btn btn-primary" @click="removeRoleSure">确 定</button>
		        </span>
			</el-dialog>
		<!-- remvoe end -->
	</div>
</template>
<script type="text/javascript">
	export default {
    data() {
      return {
        promptShow:false,
        disabledBtn:true,
        dialogVisible:false,
        sendSureBtn:true,
        createRoleArea:false,
        createBtn:true,
        propmptMsg:{
        	tit:'',
          	type:'',  // warning  error 
        	content:''
        },
        form:{
        	roleCode:'',
        	roleName:'',
        },
        formQuery:{
        	roleCode:'',
        	roleName:''
        },
        newRole:{
        	roleCode:'',
        	roleName:''
        },
        roles:[],
        system:[],
        permissions:[],
        tableData: [],
        pagination:{
        	total:0,
        	pageSize:10,
        	curr:1
        },
        paginationShow:false,
        roleList:[{
        	code:'',
        	name:'',
        	permission:['001','012']
        },{
        	code:'',
        	name:'',
        	permission:['001','012']
        }],
        roleId:'',
        roleName:'',
        roleCode:'',
        permissionObj:{
        	role_rename:false,
			role_add:false,
			role_permission_set:false
        }
      };
    },
    methods: {
    	getRole(){
    		//获取所有角色
    		var that=this;
    		this.getAjax(this.host,'/function/findAllRoles.json').success(function(r){
    			if (r.code===0) {
    				that.roles=r.data;
    				var timeId=setTimeout(function(){
    					$('.tapUl li.active').removeClass('active');
    					$('#role-wrap .label-span').removeClass('selected');
    					clearTimeout(timeId);
    				},0)
    				
    			}else{
    				that.$message.error(r.message)
    			}
    		}).error(function(e){
    			that.$message.error('服务器错误！')
    		})
    	},
    	getAllPermission(systemCode){
    		//获取所有权限
    		var that=this;
    		this.getAjax(this.host,'/function/findTreePermises.json').success(function(r){
    			if (r.code==0) {
    				that.permissions=r.data;
    				//初始化表格
    				var allStr=initRoles(r.data);
    				$(allStr).appendTo('#role-wrap');
   				 					
    			}else{
    				that.$message.error(r.message);
    			}

    		}).error(function(e){
    				that.$message.error('服务器错误');
    		})
    	},
    	saveRoleChange(permiseId,roleId){
    		var data={
    			permiseId:permiseId.join(','),
    			roleId:roleId
    		}
    		var that=this;
    		this.getAjax(this.host,'/function/mergeRolePermissions.json',data).success(function(r){
    			if (r.code==0) {
    				that.$message('角色权限修改成功');
    			}else{
    				that.$message.error(r.message)
    			}
    		}).error(function(e){
    			that.$message.error('服务器错误')
    		})
    	},
    	removeRoleSure(){
    		//删除角色
    		var roleId=this.roleId;
    		this.getAjax(this.host,'',{roleId:roleId}).success(function(r){
    			if (r.code===0) {
    				that.$message('角色删除成功')
    			}else{
    				that.$message.error(r.message)
    			}
    		}).error(function(e){
    			that.$message.error('服务器错误');
    		})
			this.promptShow=false;	
		},
		changeRoleSure(){
			if (!!this.roleName===false) {
				$('#formDialogPe .roleName input').addClass('error').parents('.inp-box').find('.errorMsg').text('输入不能为空！');
				return
			}
			this.dialogVisible=false;
			//重命名角色
			var data={
				roleName:this.roleName,
				roleId:this.roleId
			}
			var that=this;
			this.getAjax(this.host,'/function/mergeRole.json',data).success(function(r){
				if (r.code===0) {
					that.$message('角色重命名成功！');
					that.getRole();
				}else{
					that.$message.error(r.message)
				}
			}).error(function(e){
				that.$message.error('服务器错误')
			})
		},
		createRoleSure(){
			if (!this.newRole.roleCode && this.newRole.roleCode!==0) {
				$('#roleCodeInp').addClass('error');
				return
			}
			if (!this.newRole.roleName) {
				$('#roleNameInp').addClass('error');
				return
			}
			this.createRoleArea=false;
			this.createBtn=true;
			var data=JSON.parse(JSON.stringify(this.newRole));
			this.newRole={
				roleCode:'',
        		roleName:''
			}
			var that=this;
			//新建角色
			this.getAjax(this.host,'/function/saveRole.json',data).success(function(r){
				if (r.code===0) {
					that.$message('角色创建成功！')
					that.getRole();
				}else{
					that.$message.error(r.message);
				}
			}).error(function(e){
				that.$message.error('服务器错误！');
			})
		},
    	removeRole($event){
    		//暂无删除角色功能。
    		// this.promptShow=true;		
    	},
    	reNameRole($event){
    		this.dialogVisible=true;
    	},
		makeSure(){
			//确定分配权限
			var permiseId=[];
			var roleId=this.roleId;
			$('#role-wrap').find('.label-span.selected').each(function(i,ele){
				if(!!$(ele).data('id')){
					permiseId.push($(ele).data('id'));
				}
			});
			this.saveRoleChange(permiseId,roleId);
		},
		query(){
			this.formQuery=JSON.parse(JSON.stringify(this.form))
		},
		reset(){
			this.form.roleCode='';
			this.form.roleName='';
		},
		activeChange(item,$event){
			var $target=$event.target.nodeName==='LI'?$($event.target) : $($event.target).parents('li');
			$target.addClass('active').siblings().removeClass('active');
			var permissionIds=item.permissionIds;
			$('#role-wrap').find('span.label-span').removeClass('selected');
			this.roleId=item.id;
			this.roleCode=item.roleCode;
			this.roleName=item.roleName;
			for(var i=0;i<permissionIds.length;i++){
				$('#role-wrap').find('span.label-span[data-id='+permissionIds[i]+']').addClass('selected');
			}
			var $part=$('#role-wrap .role-part');
			for(var k=0;k<$part.length;k++){
				var partIdsNum=$($part[k]).find('.label-span').length-1;
				var partIdSelectNum=$($part[k]).find('.label-span.selected').length;
				if (partIdsNum===partIdSelectNum) {
					$($part[k]).find('.label-span.all').addClass('selected');
				}
			}
		},
		createRole(){
			if(this.createRoleArea){return;}
			this.roleNameSend='';
			this.createRoleArea=true;
			this.createBtn=false;
		},
		createRoleReset(){
			this.createRoleArea=false;
			this.createBtn=true;
			this.roleNameSend='';
		},
		change(selector,value){
	        if (!!value || value===0) {
	          //有数据
	          $('#formDialogRo '+selector).find('input').removeClass('error').end().find('.errorMsg').text('');
	        }else{
	          $('#formDialogRo '+selector).find('input').addClass('error').end().find('.errorMsg').text('输入不能为空！');
	        }
      	},
      	checkInp($event){
      		if (!!$event.target.value || !!$event.target.value===0) {
      			//有值
      			$($event.target).removeClass('error');
      		}else{
      			//无值
      			$($event.target).addClass('error');
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
    beforeMount(){
    	//获取所有角色
	    this.getRole();
	    //获取所有权限
	    this.getAllPermission()
    },
    mounted:function () {
    	//时间委托监听选择
    	$('#role-wrap').delegate('.label-span','click',function(){
    		var $tablePart=$(this).parents('.role-part');
    		if ($(this).hasClass('selected')) {
    			if ($(this).hasClass('all')) {
    				//取消全选
    				$tablePart.find('.label-span').removeClass('selected');
    				return;
    			}
    			$(this).removeClass('selected');
    			$tablePart.find('.label-span.all').removeClass('selected');
    			//联动
    			if ($(this).hasClass('first-span')) {
    				//取消一级菜单
    				var trPartId=$(this).parent().parent().data('id');
    				$(this).parent().parent().find('.label-span').removeClass('selected');
    				$(this).parent().parent().siblings('[data-id='+trPartId+']').find('.label-span').removeClass('selected');
    			
    			}else{
    				//取消其他级别菜单
    				$(this).parent().nextAll().find('.label-span').removeClass('selected');
    			}

    		}else{
    			$tablePart.find('p.systemIn .label-span').addClass('selected');
    			if ($(this).hasClass('all')) {
    				
    				//全选
    				$tablePart.find('.label-span').addClass('selected');
    				return
    			}
    			$(this).addClass('selected');
    			//联动上级
    			
    				//当前tr有上级
    				$(this).parent().prevAll().find('.label-span').addClass('selected');
    				if (!$(this).parent().parent().hasClass('first-tr')) {
    					$(this).parent().parent().prevAll('.first-tr:first').find('td:first .label-span').addClass('selected');
    				}   	

    			//单个勾选至全选
    			if($tablePart.find('.label-span').length-1==$tablePart.find('.label-span.selected').length){
    				$tablePart.find('.label-span.all').addClass('selected');
    			}
    		}
    	})
    }
  };
  function initRoles(allArr){
  	var allStr='';
  	for(var i=0;i<allArr.length;i++){
  		var styleStr='';
  		if (i===0) {
  			styleStr="margin-top:0px;"
  		}
  		allStr+='<div class="role-part">\
					<h3 style='+styleStr+'>'+allArr[i].name+'</h3>\
					<p class="systemIn"><span class="label-span" data-id="'+allArr[i].id+'">系统入口权限<i class="i-radio"></i></span></p>\
					<table class="permissionTable">\
					'+initTable(allArr[i].childPermis,allArr[i])+'\
					</table>\
  				</div>'
  	}
  	return allStr;
  }
 //获取单个系统权限表格
  function initTable(tableArr,item){
  	var tableStr='<thead>\
					<th><span class="label-span all"><i class="i-radio"></i></span>一级菜单权限</th>\
					<th>二级菜单权限</th>\
					<th>操作权限</th>\
  				</thead>';
  	if (tableArr.length===0) {
  		//空数组，当前系统下无子权限
  		return tableStr
  	}
  	for(var i=0;i<tableArr.length;i++){
  		//循环一级权限
  		var trParts='';
  		if(tableArr[i].childPermis.length==0){
  			//只有一级权限
  			trParts='<tr class="first-tr"><td><span class="label-span first-span" data-id="'+tableArr[i].id+'"><i class="i-radio"></i>'+tableArr[i].name+'</span></td><td></td><td></td></tr>'
  		}else{
  			//2+3 2 3 循环二级或者三级
  			var senLevel=tableArr[i].childPermis
  			if (senLevel[0].permType==2) {
  				//有二级权限
  				var senTrs='';
  				for(var j=0;j<senLevel.length;j++){
  					var thridLevel='';
  					if (senLevel[j].childPermis.length==0) {
  						//有二级，无三级
  					}else{
  						//有二级，有三级
  						var thirdArr=senLevel[j].childPermis;
  						for(var m=0;m<thirdArr.length;m++){
  							thridLevel+='<span class="label-span" data-id="'+thirdArr[m].id+'"><i class="i-radio"></i>'+thirdArr[m].name+'</span>'
  						}
  					}
  					if (j==0) {

  						//第一行
  						trParts+='<tr data-id="trpart'+i+'" class="first-tr">\
							<td rowspan='+senLevel.length+'><span class="label-span first-span" data-id="'+tableArr[i].id+'"><i class="i-radio"></i>'+tableArr[i].name+'</span></td>\
							<td><span class="label-span" data-id="'+senLevel[j].id+'"><i class="i-radio"></i>'+senLevel[j].name+'</span></td>\
							<td>'+thridLevel+'</td>\
  							</tr>'
  					}else{
  						trParts+='<tr data-id="trpart'+i+'">\
							<td><span class="label-span" data-id="'+senLevel[j].id+'"><i class="i-radio"></i>'+senLevel[j].name+'</span></td>\
							<td>'+thridLevel+'</td>\
  						</tr>'
  					}
  				}
  			}else{
  				//有三级权限，无二级
  				var spanStr='';
  				for(var k=0;k<senLevel.length;k++){
  					spanStr+='<span class="label-span" data-id="'+senLevel[k].id+'"><i class="i-radio"></i>'+senLevel[k].name+'</span>';
  				}
  				trParts='<tr class="first-tr"><td><span class="label-span" data-id="'+tableArr[i].id+'"><i class="i-radio"></i>'+tableArr[i].name+'</span></td><td></td><td>'+spanStr+'</td></tr>'
  			}
  		}
  		tableStr+=trParts;
  	}
  	return tableStr;
  }
</script>
<style>
	
	#RolePermission .btn-wrap{
		text-align: center;
		padding: 35px 0;
	}
	#RolePermission{
		height: 100%;
		overflow-y: scroll;
	}
	#RolePermission .inp-item {
		display: inline-block;
		margin-top: 0;
		padding:15px 0;
		border-collapse: collapse;
	}
	#RolePermission .content-wrap{
		width: 100%;
		position: relative;
	}
	#RolePermission .content-left{
		width: 300px;
		background-color: #fff;
		margin-right: 4px;
		border-right: 4px solid #ecf0f3;
	}
	#RolePermission .content-left h3{
		padding-left: 30px;
		margin-bottom: 25px;
		border-left: 3px solid #3ca0ff;
		color: #1c2b36;
		font-size: 16px;
		margin:15px 0;
	}
	#RolePermission .content-right{
		background-color: #fff;
		padding-bottom: 35px;
	}
	#RolePermission .content-right h3{
		margin: 15px 0;
		border-left: 3px solid #3ba0ff;
		padding-left: 25px;
		font-size: 16px;
		margin-top: 35px;
	}
	#RolePermission .content-right .role-wrap{
		padding-top: 20px;
	}
	#RolePermission .content-right .role-wrap table{
		margin:0 15px;
		width: calc(100% - 30px);
		empty-cells: show;
		border-collapse: collapse;
		text-align: left;
	}
	#RolePermission .content-right .role-wrap table th{
		background-color: #f6f8f8;
		height: 34px;
		line-height: 34px;
		color: #576578;
		font-weight: normal;
	}
	#RolePermission .content-right .role-wrap table th:not(:first-child),#RolePermission .content-right .role-wrap table td:not(:first-child){
		text-align: left;
	}
	#RolePermission .content-right .role-wrap table tr[data-id]:not(.first-tr) td{
		text-align: left;
	}
	#RolePermission .content-right .system-ul li:last-child{
		border-right: 1px solid #cbd2d4;
	}
	#RolePermission .content-right .system-ul li.active{
		border-top: 3px solid #3ba0ff;
		background-color: #fff;
		position: relative;
		bottom: -1px;
	}
	#RolePermission .list-wrap{
		padding: 0 12px;
	}
	#RolePermission .tapUl{
		border-top: 1px solid #f2f4f8;
	}
	#RolePermission .tapUl li{
		padding: 0 20px 5px 20px;
		border-bottom: 1px solid #f2f4f8;
		cursor: pointer;
	}
	#RolePermission .tapUl li:hover{
		background-color: #f9fafc;
	}
	#RolePermission .tapUl li.active{
		background-color: #f9fafc;
	}

	#RolePermission .tapUl li p.top{
		line-height: 42px;
		clear: both;
	}
	#RolePermission .tapUl li p.top span:nth-child(1){
		font-size: 16px;
		color: #576578;
	}
	#RolePermission .tapUl li p.top span:nth-child(2){
		font-size: 14px;
		color:#a3b2c6;
	}
	#RolePermission .tapUl li p.bot{
		display: none;
		line-height: 24px;
		font-size: 12px;
		color: #d1d1d1;
		float: right;
	}

	#RolePermission .tapUl li p.bot span:nth-child(2){
		padding-left: 25px;
	}

	#RolePermission .tapUl li.active p.top span:nth-child(1){
		color: #3ba0ff;
	}
	#RolePermission .tapUl li p.top span:nth-child(2){
		float: right;
		width: 100px;
		text-overflow: ellipsis;
		overflow:hidden;
		text-align: right;
		display: inline-block;
	}

	#RolePermission .tapUl li i{
		display: inline-block;
		width: 10px;
		height: 10px;
		margin-right: 3px;

	}
	#RolePermission .tapUl li .i-del{
		background: url(/src/assets/images/remove2.png) 0 100%;
	}
	#RolePermission .tapUl li .i-change{
		background: url(/src/assets/images/remove2.png) 100% 100%;
	}
	#RolePermission .tapUl li p.bot span:nth-child(1):hover .i-del{
		background: url(/src/assets/images/remove2.png) 0 0;
	}
	#RolePermission .tapUl li p.bot span:nth-child(2):hover .i-change{
		background: url(/src/assets/images/remove2.png) 100% 0;
	}
	#RolePermission .tapUl li p.bot span:nth-child(1):hover {
		color:#f6732b;
	}
	
	#RolePermission .tapUl li p.bot span:nth-child(2):hover {
		color:#3ba0ff;
	}
	#RolePermission .tapUl li.active p.bot{
		display: block;
	}
	#RolePermission .createP{
		height: 52px;
		line-height: 52px;
		font-size: 14px;
		color:#3ba0ff;
		font-weight: bold;
		padding-left: 20px;
		border-bottom: 1px solid #f2f4f8;
	}
	#RolePermission .createP #createRole:hover{
		color: #339afa;
	}
	#RolePermission .createP #createRole:hover .symbol{
		background: url(/src/assets/images/add.png) no-repeat 0 100%;
	}

	#RolePermission #createRole .symbol{
		display: inline-block;
		width: 12px;
		height: 12px;
		background: url(/src/assets/images/add.png) no-repeat 0 0;
		padding-right: 8px;
	}
	#RolePermission .textAreaItem{
		position: relative;
	}
	#RolePermission .RoleItem{
		margin: 10px 0;
		padding-left: 20px;
		height: 16px;
		border:none;
		width: calc(100% - 50px);
	}
	#RolePermission .RoleItem.error::-webkit-input-placeholder  {	
		color: red;
	}
	#RolePermission .RoleItem.error:-moz-placeholder {	
		color: red;
	}
	#RolePermission .RoleItem.error::-moz-placeholder {	
		color: red;
	}
	#RolePermission .RoleItem.error:-ms-input-placeholder {	
		color: red;
	}
	#RolePermission .RoleItem:focus{
		border:none;
	}
	#RolePermission .table-box .table-top {
		position: relative;
	}
	#RolePermission .table-box .table-top .toppage{
		position: relative;
		top:-8px;
		right: 15px;	
	}
	#RolePermission .role-wrap td{
		border-right: 1px solid #f2f4f8;
		border-bottom: 1px solid #f2f4f8;
		padding: 8px 0;
		padding-left: 20px;
	}
	#RolePermission .role-wrap .systemIn{
		padding: 10px 15px;
		margin-right: 15px;
	}
	#RolePermission .role-wrap .systemIn .i-radio{
		margin-left: 10px;
	}
	#RolePermission .role-wrap th{
		position: relative;
		padding-left: 20px;
	}
	#RolePermission .role-wrap .label-span{
		cursor: pointer;
		color: #576578;
	}
	#RolePermission .role-wrap .label-span .i-radio{
		background-color: #fff;
	}
	#RolePermission .role-wrap .label-span:not(:last-child){
		margin-right: 16px;
	}
	#RolePermission .role-wrap .label-span .i-radio{
		display: inline-block;
		width: 15px;
		height: 15px;
		border:1px solid #dfe5e7;
		vertical-align: -3px;
		margin-right: 10px;
	}
	#RolePermission .role-wrap .label-span.selected .i-radio{
		border:1px solid #3ba0ff;
		background: url(/src/assets/images/right.png) no-repeat center center;

	}
</style>