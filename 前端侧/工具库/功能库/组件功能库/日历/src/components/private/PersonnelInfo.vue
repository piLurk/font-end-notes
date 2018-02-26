<template>
	<div id="job" class="component-box">
		<div class="job-content clearfix">
			<div class="table-box">	
				<table class="msg-table">
					<thead>
						<tr>
							<th>序号</th>
							<th>变动日期</th>
							<th>原部门</th>
							<th>原岗位</th>
							<th>原岗位等级</th>
							<th>变动类型</th>
							<th>离职原因</th>
							<th>变动说明</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(item,i) in tableData">
							<td>{{i+1}}</td>
							<td>{{item.officeStartDate}}</td>
							<td>{{item.department}}</td>
							<td>{{item.position}}</td>
							<td>{{item.positionLevel}}</td>
							<td>{{changeTypes[parseInt(item.changeType)-1]}}</td>
							<td>{{item.changeReason}}</td>
							<td>{{item.changeRemark}}</td>
						</tr>
					</tbody>
				</table>
			</div>
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
  	props:['personId'],
    data() {
      return {
        promptShow:false,
        sendSureBtn:true,
        promptShow:false,
        propmptMsg:{
        	tit:'',
          	type:'',  // warning  error 
        	content:''
        },
        changeTypes:['转正','晋升','调岗','降职','离职'],
        tableData: [],
        quitReasons:[{name:'家庭因素',value:1},{name:'身体因素',value:2},{name:'职业发展',value:3},{name:'薪资过低',value:4},{name:'发展空间',value:5},{name:'工作环境',value:6},{name:'劝退',value:7},{name:'辞退',value:8},{name:'其他',value:9}]

      };
    },
    methods: {
    	getNumber(value){
    		if (value==='0' || value===0) {
    			return 0;
    		}
    		return !!value?parseInt(value):'';
    	},
		geData(){
			//获取人事变更记录
			var that=this;
			var personId=this.personId;
			this.getAjax(this.host,'/employeeInfo/findUserInfoDetailById.json',{id:personId}).success(function (r) {
				if (r.code==0) {
					that.tableData=r.data.userRecordList;
				}else{
					that.$message.error(r.message);
				}
			}).error(function(e){
				//返回warn或者错误 tit和content
				that.$message.error('服务器错误')
			}) 
		}
    },

    mounted:function () {
    //真实情况
     this.geData();
    }
  };
    //获取
function getNumber(value){
	if (value==='0' || value===0) {
		return 0;
	}
	return !!value?parseInt(value):'';
}
</script>
<style scoped>
	.table-box .table-top{
		padding-bottom: 15px;
	}
	.table-box .table-top .toppage{
		position: relative;
		bottom: -10px;
		right: 25px;
		font-size: 12px;
		color: #999;
	}
	.table-box .table-top .toppage .pdlr5 i,.table-box .table-top .toppage .pdlr5 a{
		color: #3ba0ff;
	}
	.btn-wrap{
		padding-top: 15px;
		padding-right: 60px;
	}
	.pagination-box{
		padding-left: 25px;
		padding-top: 25px;
	}


</style>
