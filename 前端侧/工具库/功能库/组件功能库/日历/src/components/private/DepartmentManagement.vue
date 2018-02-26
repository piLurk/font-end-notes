<template>
	<div id="department">
    <div class="table-wrap">
          <table class="table-content">
            <tr>
              <td v-loading="treeLoading" class="content-left" valign="top">
                <div class="btn-wrap clearfix">
                  <button v-if="permissionObj['department_add']" class="f-r btn btn-skyBlue bold" @click="addDepartment" type="primary"><span class="symbol">+&nbsp;&nbsp;</span>新增部门</button>
                  <ul class="dotUl">
                    <li></li>
                    <li></li>
                    <li></li>
                  </ul>
                </div>
                <ul  id="treeDemo" class="ztree"></ul>      
              </td><td class="control-line" valign="top"></td><td class="content-right" valign="top">

                <table class="msg-table">
                  <thead>
                    <tr>
                      <th>部门编码</th>
                      <th>部门名称</th>
                      <th>成立时间</th>
                      <th>上级部门</th>
                      <th>部门类型</th>
                      <th class="oparateTh">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-show="formShow" >
                      <td>{{form.code}}</td>
                      <td>{{form.name}}</td>
                      <td>{{form.time}}</td>
                      <td>{{form.father}}<span v-show="!form.father">---</span></td>
                      <td>{{form.typeName}}</td>
                      <td width="150" class="oparateTd"><a v-if="permissionObj['department_delete']" @click="removeDepartment" href="javascript:void(0)"><i class="i-del"></i>删除</a><a v-if="permissionObj['department_edit']" @click="changeDepartment" href="javascript:void(0)"><i class="i-edit"></i>编辑</a></td>
                    </tr>
                  </tbody>
                </table>
                <div class="table-nodata" v-show="tableHaveData">
                  <img src="/src/assets/images/tableload.png"/>
                  <p>暂无数据！</p>
                </div>
              </td>
            </tr>
            
          </table>
    </div>
		
		<!-- 增加弹出层start-->
			<el-dialog :title="dialogMsg.tit" :visible.sync="dialogVisible">
			  <div id="formDialogDe" class="dialog-form">
          <div class="inp-item departmentName">
            <p>部门名称：</p>
            <div class="inp-box">
              <input type="text" v-model.trim="formSend.departmentName" @blur="change('.departmentName',$event.target.value)" placeholder="请输入" >
              <p class="errorMsg"></p>
            </div>

          </div><div class="inp-item departmentType">
              <p>部门类型：</p>
              <div class="inp-box">
                <el-select v-model="formSend.departmentType" @change="change('.departmentType',$event)" placeholder="请选择">
                    <el-option v-for="(item,key) in deType" :label="item.dicName" :value="item.dicCode" :key="key"></el-option>
                </el-select>
                <p class="errorMsg"></p>
              </div>
            </div><div class="inp-item foundedTime">
			  		<p>成立时间：</p>
			  		<div class="inp-box">
              <el-date-picker v-model="formSend.foundedTime" @change="change('.foundedTime',$event)" type="date" placeholder="请选择"></el-date-picker>
              <p class="errorMsg"></p>
			  		</div>
			  	</div><div class="inp-item parentId">
			  		<p>上级部门：</p>
			  		<div class="inp-box">
			  			<el-select filterable v-model="formSend.parentId" @change="change('.parentId',$event)" placeholder="请选择">
			  	  			<el-option v-for="(item,key) in tree" :label="item.name" v-if="item.departmentLevel!=='3'" :disabled="reqType==='CHANGE'?(item.pId===form.id || item.id===form.id):false" :value="item.id" :key="key"></el-option>
			  			</el-select>
              <p class="errorMsg"></p>
			  		</div>
			  	</div>
			  </div>
			  <div slot="footer" class="dialog-footer">
          <button class="btn btn-primary bold" @click="addOrChange">确 认</button>
          <button class="btn btn-reset bold" @click="reset">取 消</button>   
			  </div>
			</el-dialog>
		<!-- 增删改弹出层end-->

		<!-- remvoe start -->
			<el-dialog :visible.sync="promptShow" size="tiny" class="remove-dialog">
				<span v-text="propmptMsg.content"></span>
				<span slot="footer" class="dialog-footer">
          <button class="btn btn-primary" @click="removeSure">确 定</button>
          <button class="btn btn-reset" @click="promptShow=false">取 消</button>  
        </span>
			</el-dialog>
		<!-- remvoe end -->
		
	</div>
</template>

<script>
  export default {
    data() {
      return {
        tree: [],
        deType:[],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        dialogVisible:false,
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
        }
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
      getDeparts(){
        //获取所有部门信息和部门类型
        var that=this;
        this.getAjax(this.host,'/organ/getDeparts.json').success(function(r){
            if (r.code==0) {
              that.tree=r.data.departs;
              that.deType=r.data.departType;
              that.treeLoading=false;
              // 树配置
              var setting = {
                view: {
                  dblClickExpand: dblClickExpand,
                  showIcon:showIconForTree
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
              function zTreeBeforeClick(treeId,treeNode,clickFlag){
                if(treeNode.pId===null){
                  return false;
                }else{
                  return true;
                }
              }
              function zTreeOnClick(event,treeId,treeNode){
                that.form=treeNode;
                that.tableHaveData=false;
              }
              $.fn.zTree.init($("#treeDemo"), setting, r.data.departs);
            }else{
              that.$message.error(e.message);
            }
            
        }).error(function(e){
          //返回warn或者错误 tit和content
          that.$message.error('服务器错误！')
        })
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
      var that=this;    
      var dragTest=new Drag('#department .control-line','#department .content-left',{
        maxW:300,
        minW:220,
        speed:4
      });
      //请求树数据
      
    	this.getDeparts();

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
  .table-wrap{
    overflow-y: scroll;
    height: 100%;
  }
	input[disabled]{
		background-color: #eef1f6;
		color: #bbb;
		cursor: not-allowed;
	}
	#department{
    height: 100%;
  }
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
	}
  .table-content .control-line{
    width: 4px;
    height: 100%;
    background-color:#ecf0f3;
    cursor: e-resize;
  }
  .table-content .content-left .btn-wrap{
    position: relative;
    top:0;
    border-bottom: 1px solid #f6f8f8;
    padding-bottom: 15px;
    padding-left: 30px;
  }
  
  #treeDemo{
    padding: 40px 0 0 30px;
  }
	.table-content .content-right{
    position: relative;
    box-sizing: border-box;
    padding: 25px 20px 0;
    height: 100%;
    background-color: #fff;
	}
	.content-right .btn-wrap{
		height: 55px;
		padding-right: 60px;
	}
	
	.warning{
		color: red;
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
<style type="text/css">
  button.el-button{
    line-height: 10px;
    padding:10px 20px;
  }


</style>