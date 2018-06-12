<template>
	<div id="approvalConfigurationDetail" class="content-right">
		<div class="approvalBtn">
			<div style="height: 20px;background: #f2f4f8;"></div>
			<el-button class="reject" type="primary" @click="reject">驳 回</el-button>
		    <el-button class="pass" type="primary" @click="pass">通 过</el-button>
		</div>
		<div class="item create">
			<div style="height: 1px;background: rgba(242,244,248,1);"></div>
			<div class="create_content">
				<div class="item">
					<h3>合同基本信息</h3>
					<ul class="item_ul clearfix">
						<li>
							<span class="tit">房源编号：</span>
							<span class="content">WH02957002030202</span>
						</li>
						<li>
							<span class="tit">收房产品：</span>
							<span class="content">毛坯</span>
						</li>
						<li>
							<span class="tit">产品版本：</span>
							<span class="content">江寓合租V1.0</span>
						</li>
						<li>
							<span class="tit">物业地址：</span>
							<span class="content">南湖山庄二期-14-3单元-202南湖山庄二期-14-3单元-202</span>
						</li>
					</ul>
				</div>
				<div class="item">
					<h3>配置相关信息</h3>
					<ul class="item_ul clearfix">
						<li>
							<span class="tit">配置类型：</span>
							<span class="content">租期配置</span>
						</li>
						<li>
							<span class="tit">宽带是否首次安装：</span>
							<span class="content">是</span>
						</li>
						<li>
							<span class="tit">宽带是否集中办理：</span>
							<span class="content">是</span>
						</li>
						<li>
							<span class="tit">是否有燃气：</span>
							<span class="content">是</span>
						</li>
						<li>
							<span class="tit">物业地址：</span>
							<span class="content">装修工期3天+补充工期0天+空检周期0天+信息流转时间1天+空气质量治理周期0天+法定节假日停工天数0天 = 4天</span>
						</li>
					</ul>
					<!--表数据 begin-->
					<div class="tableBox">
						<table class="modtable supplierTable" width="100%" border="0" cellpadding="0" cellspacing="0">
							<thead>
								<tr>
									<th>功能区间</th>
									<th>装修风格</th>
									<th>使用面积</th>
									<th>是否有暖气</th>
									<th>是否能装空调</th>
									<th>朝向</th>
									<th>是否有独卫</th>
									<th>独卫面积</th>
									<th>阳台类型</th>
									<th>阳台面积</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>卧室01</td>
									<td>可可</td>
									<td>15 m²</td>
									<td>是</td>
									<td>是</td>
									<td>南</td>
									<td>是</td>
									<td>8 m²</td>
									<td>开放式</td>
									<td>15 m²</td>
								</tr>
								<tr>
									<td>卧室01</td>
									<td>可可</td>
									<td>15 m²</td>
									<td>是</td>
									<td>是</td>
									<td>南</td>
									<td>是</td>
									<td>-</td>
									<td>-</td>
									<td>-</td>
								</tr>
								<tr>
									<td>卧室01</td>
									<td>可可</td>
									<td>15 m²</td>
									<td>是</td>
									<td>是</td>
									<td>南</td>
									<td>是</td>
									<td>-</td>
									<td>-</td>
									<td>-</td>
								</tr>
							</tbody>
						</table>
					</div>
					<!--表数据 end-->
				</div>
				<div class="item">
					<h3>供应商选择</h3>
					<ul class="item_ul clearfix">
						<li>
							<span class="tit">房源编号：</span>
							<span class="content">WH02957002030202</span>
						</li>
						<li>
							<span class="tit">收房产品：</span>
							<span class="content">毛坯</span>
						</li>
						<li>
							<span class="tit">产品版本：</span>
							<span class="content">江寓合租V1.0</span>
						</li>
						<li>
							<span class="tit">物业地址：</span>
							<span class="content">南湖山庄二期-14-3单元-202南湖山庄二期-14-3单元-202</span>
						</li>
					</ul>
				</div>
				<div class="item">
					<h3>下单原因</h3>
					<ul class="item_ul clearfix">
						<li class="reason">
							<span class="tit">理由原因：</span>
							<span>因为爱情</span>
						</li>
					</ul>
				</div>
				<div class="item">
					<h3>超标备注</h3>
					<ul class="item_ul clearfix">
						<li class="reason">
							<span class="tit">备注说明：</span>
							<span>因为爱情</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="item hosehold_appliances">
            <h3>家电配置物品</h3>
			<!--表数据 begin-->
			<div class="tableBox">
				<table class="modtable supplierTable" width="100%" border="0" cellpadding="0" cellspacing="0">
					<thead>
						<tr>
							<th>房间名</th>
							<th>物品名</th>
							<th>属性1</th>
							<th>属性2</th>
						</tr>
					</thead>
					<tbody>
						<template v-for="(item,key) in testArr">
							<tr>
								<td class="multi_td" :rowspan="item.list.length">{{item.name}}</td>
								<td>{{item.list[0].a}}</td>
								<td>{{item.list[0].b}}</td>
								<td>{{item.list[0].c}}</td>
							</tr>
							<tr v-for="(part,i) in item.list" v-if="i!==0" :key="i">
			
								<td>{{part.a}}</td>
								<td>{{part.b}}</td>
								<td>{{part.c}}</td>
							</tr>
						</template>
					</tbody>
			
				</table>
			</div>
			<!--表数据 end-->
			<h3>配件及组装费用合计</h3>
			<!--表数据 begin-->
			<div class="tableBox">
				<table class="modtable supplierTable" width="100%" border="0" cellpadding="0" cellspacing="0">
					<thead>
						<tr>
							<th>房间名</th>
							<th>物品名</th>
							<th>属性1</th>
							<th>属性2</th>
						</tr>
					</thead>
					<tbody>
						<template v-for="(item,key) in testArr">
							<tr>
								<td class="multi_td" :rowspan="item.list.length">{{item.name}}</td>
								<td>{{item.list[0].a}}</td>
								<td>{{item.list[0].b}}</td>
								<td>{{item.list[0].c}}</td>
							</tr>
							<tr v-for="(part,i) in item.list" v-if="i!==0" :key="i">
			
								<td>{{part.a}}</td>
								<td>{{part.b}}</td>
								<td>{{part.c}}</td>
							</tr>
						</template>
					</tbody>
			
				</table>
			</div>
			<!--表数据 end-->
		</div>
		<el-dialog :close-on-click-modal="false" :visible.sync="dialogVisibleReject" size="tiny" top="25%" :before-close="handleClose" title='提示'>
			<div style="margin-bottom: 20px;margin-top: 25px;text-align: center;">
				<img src="/static/images/tips.png" alt="" />
				<span style="font-size: 18px;font-weight: 600;vertical-align: middle;">确定驳回配置方案？</span>
				<textarea name="" rows="" cols="" style="margin: 20px auto 0 auto;width: 80%;height: 120px;" placeholder="请输入驳回理由" v-model="RejectReason"></textarea>
			</div>
			<div slot="footer" class="dialog-footer">
		    	<el-button @click="handleCloseReject">取 消</el-button>
		    	<el-button type="primary" @click="sureReject" >提 交</el-button>
		  	</div>
		</el-dialog>
		<el-dialog :close-on-click-modal="false" :visible.sync="dialogVisiblePass" size="tiny" top="25%" :before-close="handleClose" title='提示'>
			<div style="margin-bottom: 20px;margin-top: 25px;text-align: center;">
				<img src="/static/images/tips.png" alt="" />
				<span style="font-size: 18px;font-weight: 600;vertical-align: middle;">确定通过配置方案？</span>
			</div>
			<div slot="footer" class="dialog-footer">
		    	<el-button @click="handleClosePass">取 消</el-button>
		    	<el-button type="primary" @click="surePass" >确 认</el-button>
		  	</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name:'approvalConfigurationDetail',
    data() {
      return {
        tapName:'create',
        testArr:[],
        deType:[],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        dialogVisibleReject:false,
        dialogVisiblePass:false,
        sendSureBtn:true,
        promptShow:false,
        tableHaveData:true,
        treeLoading:true,
        reqType:'', // REMOVE  ADD  Error 
        dialogMsg:{
        	type:''
        },

        propmptMsg:{
        	content:''
        },
        form:{       	
        },
        formShow:false,
        formSend:{
          departmentName:'',
          departmentType:'',
          foundedTime:'',
          parentId:''
        },
        permissionObj:{
          department_add:false,
          department_edit:false,
          department_delete:false
        },
        RejectReason:''
      };
    },
    watch:{
        form:function(){
          var flag=false;
          for(var i in this.form){
            flag=true;
          }
          if (flag) {
            this.formShow=true;
          }else{
            this.formShow=false;
          }
        }
    },
    methods: {
    	changeTap($event){
    		if ($event.target.nodeName==='LI') {
    			this.tapName=$($event.target).data('tapname');
    		}
    	},
    	orderQuery(){

    	},
      getDeparts(){
        //获取所有部门信息和部门类型
        var that=this;
      },
      saveDepart(){
        // 新增部门信息
        var data=JSON.parse(JSON.stringify(this.formSend));
        var that=this;
        data['foundedTime']=getDate(data['foundedTime']);
        this.getAjax(this.host,'/organ/saveDepart.json',data).success(function(r){
            if (r.code==0) {
              that.$message('部门创建成功！')
              that.getDeparts();
            }else{
              that.$message.error(r.message);
            }
            
        }).error(function(e){
          //返回warn或者错误 tit和content
          that.$message.error('服务器错误！');
        })
      },
      mergeDepart(){
        //编辑部门信息
        var that=this;
        var data=JSON.parse(JSON.stringify(this.formSend));
        data['foundedTime']=getDate(data['foundedTime']);
        data['id']=this.form.id;
        this.getAjax(this.host,'/organ/mergeDepart.json',data).success(function(r){
            if (r.code==0) {
              that.$message('部门编辑成功！')
              that.getDeparts(); 
            }else{
              that.$message.error(r.message);
            }
        }).error(function(e){
          //返回warn或者错误 tit和content
          that.$message.error('服务器错误');
        })
      },
      deleteDepart(){
        //删除部门
        var departId=this.form.id;
        var that=this;
        var url='/organ/deleteDepart/';
        url+=departId+'.json';
        this.getAjax(this.host,url).success(function(r){
            if (r.code==0) {
              that.form={};
              that.$message('部门删除成功！')
              that.getDeparts(); 
            }else{
              that.$message.error(r.message);
            }
        }).error(function(e){
          //返回warn或者错误 tit和content
            that.$message.error('服务器错误');
        })
      },
      addOrChange(){
        var formSend=this.formSend;
        var flag=false;
        for(var i in formSend){
          if(!!formSend[i]===false && formSend[i]!==0){
            flag=true; 
            $('#formDialogDe').find('.'+i+' input').addClass('error').parents('.inp-box').find('.errorMsg').text('输入不能为空！');
            break;
          }
        }
        if (flag) {
          return
        }
        if (this.reqType=='ADD') {
          //add
          this.saveDepart();
        }else if (this.reqType=='CHANGE') {
          this.mergeDepart();
        }
        this.dialogVisible=false;
      },
      dialog(tit){
        if (this.reqType==="REMOVE") {
          this.propmptMsg.content="确定删除该部门？"
          this.promptShow=true;
        }else{
          this.dialogMsg.tit=tit;
          if (this.reqType==='CHANGE') {
            this.formSend.departmentName=this.form.name;
            this.formSend.foundedTime=this.form.time;
            this.formSend.departmentType=this.form.type;
            this.formSend.parentId=this.form.pId;
            
          }else{       
            this.formSend={
              departmentName:'',
              departmentType:'',
              foundedTime:'',
              parentId:''

            };
          }
          var that=this;
          var timeId=setTimeout(function(){
            that.removeAllError();
            that.dialogVisible=true;
            setTimeout(timeId);
          },0)   
        }
      	
      },
      removeSure(){  
        this.promptShow=false;
        this.deleteDepart();
      },
      addDepartment(){
        this.reqType="ADD";
      	this.dialog("新增部门");
      },
      changeDepartment(){

        this.reqType="CHANGE";
      	this.dialog("修改部门")
      },
      removeDepartment(){
        this.reqType='REMOVE';
      	this.dialog("删除部门")
      },
      reset(){
        this.dialogVisible=false;
      },
      change(selector,value){
        if (!!value || value===0) {
          //有数据
          $('#formDialogDe '+selector).find('input').removeClass('error').end().find('.errorMsg').text('');
        }else{
          $('#formDialogDe '+selector).find('input').addClass('error').end().find('.errorMsg').text('输入不能为空！');
        }
      },
      removeAllError(){
        $('#formDialogDe input.error').removeClass('error').parents('.inp-box').find('.errorMsg').text('');
      },
	  reject(item){
		this.dialogVisibleReject = true;
	  },
	  pass(item){
	  	this.dialogVisiblePass = true;
	  },
	  handleCloseReject(){
	  	this.dialogVisibleReject = false;
	  	this.RejectReason = '';
	  },
	  sureReject(item){
	  	this.dialogVisibleReject = false;
	  	this.$message({
	        type: 'success',
	        message: '已驳回!'
	    });
	  },
	  handleClosePass(){
	  	this.dialogVisiblePass = false;
	  },
	  surePass(){
	  	this.dialogVisiblePass = false;
	  	this.$message({
	        type: 'success',
	        message: '审批通过!'
	    });
	  }
    },
    created:function(){
      // var permissions=this.$store.state.mutations.permissionObj;
      // for(var i in this.permissionObj){
      //   if (permissions[i]) {
      //       this.permissionObj[i]=true;
      //   }
      // }
    },
    mounted:function () {
    	this.testArr=[
    		{name:'测试1',
    		list:[
    			{a:1,b:2,c:3},
    			{a:2,b:2,c:2},
    			{a:1,b:2,c:3}
    		]
    	},{name:'测试2',
    		list:[
    			{a:8,b:2,c:3},
    			{a:2,b:2,c:2},
    			{a:1,b:2,c:3}
    		]
    	},{name:'测试3',
    		list:[
    			{a:11,b:2,c:3},
    			{a:2,b:2,c:2},
    			{a:1,b:2,c:3}
    		]
    	},{name:'测试4',
    		list:[
    			{a:22,b:2,c:3},
    			{a:2,b:2,c:2},
    			{a:1,b:2,c:3}
    		]
    	}
    	]
      	var that=this;    
      	var dragTest=new Drag('#newOrder .control-line','#newOrder .content-left',{
        	maxW:300,
        	minW:220,
        	speed:4
      	});
		$(".approvalBtn").width($("#approvalConfigurationDetail").width());
    },
    updated:function(){
    	
    }
  };
  //工具方法

  function triggerClick(obj){

	  //IE
	  if(document.all) {
	  	obj.click();
	  }else {
	    // 其它浏览器
	  	var e = document.createEvent("MouseEvents");
	  	e.initEvent("click", true, true);　　　　　　　　　　　　　　//这里的click可以换成你想触发的行为
	      obj.dispatchEvent(e);　　　//这里的clickME可以换成你想触发行为的DOM结点
	  }    
  }

  function dblClickExpand(treeId, treeNode) {
    return treeNode.level > 0;
  }
  
  function showIconForTree(treeId, treeNode) {
      return !treeNode.isParent;
  }
 function getDate(value){
    if (!!value) {
      return (new Date()).getBJDate(value);
    }else{
      return ''
    }
 }
</script>

<style scoped>
	/*.dotUl{
		position: absolute;
		top: 7px;
		right: 4px;
	}
	.dotUl li{
		width: 3px;
		height: 3px;
		margin-bottom: 5px;
		background-color: #cdd5dd;
	}
	input[disabled]{
		background-color: #eef1f6;
		color: #bbb;
		cursor: not-allowed;
	}*/
	.tableBox .modtable tr:hover td{
		background-color: #fff;
	}
	#approvalConfigurationDetail{
	    height: 100%;
	}
	/*.table-wrap{height: 100%;}
	.table-content{
		height: 100%;
		width: 100%;
		position: relative;
		border-collapse: collapse;
	}
	.table-content .content-left{
		width: 220px;
		height: 100%;
		margin-bottom: 20px;
		box-sizing: border-box;
		background-color: #fff;
		padding: 15px 0 45px 0;
		padding-bottom: 45px;
		border-right: 1px solid #e3e7eb;
		position: relative;
	}
	.table-content .control-line{
	    width: 4px;
	    height: 100%;
	    background-color:#ecf0f3;
	    cursor: e-resize;
	}*/
	.content-right{
	    position: relative;
	    box-sizing: border-box;
	    height: 100%;
	    background-color: #fff;
	}
	.content-right>.item{
		/*padding-bottom: 20px;*/
	}
	.content-right .form-box{
		padding-top: 20px;
		padding-bottom: 5px;
		padding-left: 20px;
		border-bottom: 1px solid #F2F4F8;
		background-color: #fff;
	}
	.content-right .inp-item {
		width: 25%;
		display: inline-block;
		margin-top: 0;
		padding-bottom:15px;
	}
	.content-right .inp-item.timeLong{
		width: 50%;
	}
	.content-right .inp-item.timeLong{
		width: 50%;
	}
	.inp-item.timeLong div.el-date-editor.el-input{
		width: 45%
	}
	.content-right .inp-item.multiple-sel{
		min-width: 360px;
	}
	
	.content-right .inp-item>p{
		float: left;
		width: 75px;
		line-height: 36px;
		padding-left: 15px;
		height: 36px;
		color: #576578;
	}
	.content-right .inp-item.middle>p{
		width: 85px;
	}
	.content-right .inp-item .inp-box{
		margin-left: 95px;
		margin-right: 15px;
	}
	.content-right .inp-item.middle .inp-box{
		margin-left: 105px;
	}
	
	.content-left .tap_ul{
		padding: 20px 10px 25px 20px;
	
	}
	.content-left .tap_ul li{
		line-height: 65px;
		cursor: pointer;
		height: 65px;
		padding-left: 30px;
		font-size: 16px;
		border-bottom: 1px solid #F2F4F8;
	}
	.content-left .tap_ul li.active{
		color:#3BA0FF;
	}
	
	.content-right .item h3{
		border-left: 3px solid #3ba0ff;
		color: #1C2B36;
		padding: 5px 0;
		padding-left: 0px;
		padding-left: 30px;
		height: 22px;
		line-height: 22px;
		margin-bottom: 10px;
		margin-top:20px;
		font-size: 16px;
	}
	/* create_content*/
	
	.create_content .item{
	
	}
	
	.create_content .item .item_ul li{
		height: 40px;
		line-height: 40px;
		min-width: 300px;
		float: left;
	}
	.create_content .item .item_ul li .tit{
		color: #A3B2C6;
		padding-left: 35px;
	}
	.create_content .item .item_ul li .content{
		display: inline-block;
		color: #151515;
	}
	.create_content .item .item_ul li.reason{
		width:100%;
		/*margin-bottom: 35px;*/
	}
	.create_content .item .item_ul li.reason input{
		display: inline-block;
		width: calc(100% - 145px);
	
	}
	.create_content  .btn_wrap{
		text-align: center;
	}
	.tableBox{
		padding: 25px 35px;
		width:calc(100% - 70px);
	}
	.tableBox .modtable td.multi_td{
		border-right: 1px solid #f1f1f1;
	}
	.tableBox .modtable tr td:first-child, .tableBox .modtable tr th:first-child{
		text-align: left;
	}
	.tableBox .modtable tr th,.tableBox .modtable tr td{
		padding-left: 30px;
	}
	/*hosehold_appliances */
	.hosehold_appliances .tableBox {
		padding-top: 10px;
	}
	.approvalBtn{
		padding: 0 0 30px 0;position: fixed;width: inherit;background: #FFF;top: 53px;height: 53px;
	}
	.approvalBtn .reject{
		background: rgba(233,94,47,1);border-color:rgba(233,94,47,1);position: absolute;right: 170px;top: 35px;padding: 9px 25px;
	}
	.approvalBtn .pass{
		background: #13ce66;border-color:#13ce66;position: absolute;right: 50px;top: 35px;padding: 9px 25px;
	}
	.item.create{
		padding-top: 63px;border-top: 1px solid rgba(242,244,248,1);
	}
</style>