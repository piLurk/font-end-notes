<template>
	<div id="oa-slideBar">
		<el-menu :default-active="sideBarDefault" router class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
		  <el-submenu index="1">
		    <template slot="title"><i class="el-icon-message"></i>组织架构管理</template>
			<el-menu-item index="departmentManagement">部门管理</el-menu-item>
		  	<el-menu-item index="jobManagement">岗位管理</el-menu-item>
		  </el-submenu>
		  <el-submenu index="2">
		    <template slot="title"><i class="el-icon-message"></i>权限管理</template>
			<el-menu-item index="userManagement">用户管理</el-menu-item>
		  	<el-menu-item index="roleManagement">角色管理</el-menu-item>
		  	<el-menu-item index="permissionManagement">权限分配</el-menu-item>
		  </el-submenu>
		  <el-submenu index="3">
		    <template slot="title"><i class="el-icon-message"></i>人员信息管理</template>
			<el-menu-item index="newPersonInfoManagement">新增人员信息</el-menu-item>
		  	<el-menu-item index="queryPersonInfoManagement">查询人员信息</el-menu-item>
		  </el-submenu>
		</el-menu>
	</div>
</template>

<script type="text/javascript">
import {mapGetters,mapActions} from 'vuex'

	export default {
		data(){
			return {
				sideBarDefault:'departmentManagement'
			}
		},
		computed:{
			
		},
		methods: {
		      handleOpen(key, keyPath) {
		        console.log(key, keyPath);
		      },
		      handleClose(key, keyPath) {
		        console.log(key, keyPath);
		      }
		},
		beforeMount:function(){

		},
		mounted:function(){

		    // 编译后获取档案路径
		    var currPath=window.sessionStorage.getItem('currPath')
		    if (!!currPath) {
		    	this.sideBarDefault=currPath;
		    	console.log(this.sideBarDefault);
		    }
		    

		},
		watch:{
            $route(to,from){
                window.sessionStorage.setItem('currPath',to.path.replace('/',''));
            }
        }
		
	}
</script>
<style scoped>
	#oa-slideBar{
		background-color: #fff;
		height: 100%;
	}
	#oa-header .el-menu{
		background-color: #fff ;
	}
	
</style>