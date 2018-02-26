<template>
  <div id="permission">
    <div class="table-wrap">
      <table class="table-content">
      <tr>
        <td class="content-left" valign="top">
          <div class="btn-wrap clearfix">
            <button v-if="permissionObj['permission_add']" class="f-r btn btn-skyBlue bold" @click="addPermission" type="primary"><span class="symbol">+&nbsp;&nbsp;</span>创建权限</button>
            <ul class="dotUl">
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
          <ul id="treeDemoDm" class="ztree"></ul>      
        </td><td class="control-line" valign="top"></td><td class="content-right" valign="top">
          <table class="msg-table">
            <thead>
              <tr>
                <th>权限编码</th>
                <th>权限名称</th>
                <th>权限类型</th>
                <th>URL</th>
                <th class="oparateTh">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-show="formShow" >
                <td>{{form.permCode}}</td>
                <td>{{form.name}}</td>
                <td>{{permTypeName}}</td>
                <td>{{form.urlStr}}</td>
                <td width="150" class="oparateTd"><a v-if="permissionObj['permission_delete']" @click="removeDepartment" href="javascript:void(0)"><i class="i-del"></i>删除</a><a v-if="permissionObj['permission_edit']" @click="changeDepartment" href="javascript:void(0)"><i class="i-edit"></i>编辑</a></td>
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
        <div id="formDialogPe" class="dialog-form">
          <div class="inp-item permCode">
            <p>权限编码：</p>
            <div class="inp-box">
              <input type="text" v-model.trim="formSend.permCode" @blur="change('.permCode',$event.target.value)" placeholder="请输入" >
              <p class="errorMsg"></p>
            </div>
          </div><div class="inp-item permName">
              <p>权限名称：</p>
              <div class="inp-box">
                <input type="text" v-model.trim="formSend.permName" @blur="change('.permName',$event.target.value)" placeholder="请输入" >
                <p class="errorMsg"></p>
              </div>
            </div><div class="inp-item parentId">
            <p>上级权限：</p>
            <div class="inp-box">
              <el-select filterable v-model="formSend.parentId" @change="change('.parentId',$event)" placeholder="请选择">
                  <el-option v-for="(item,key) in tree" v-if="item.permType!=='3'" :disabled="reqType==='CHANGE'?(item.pId===form.id || item.id===form.id):false" :label="item.name" :value="item.id" :key="key"></el-option>
              </el-select>
              <p class="errorMsg"></p>
            </div>
          </div><div class="inp-item url">
            <p>URL：</p>
            <div class="inp-box">
              <input type="text" v-model.trim="formSend.url"  placeholder="请输入" >
              <p class="errorMsg"></p>
            </div>
          </div><div class="inp-item permType">
            <p>权限类型：</p>
            <div class="inp-box">
              <el-select v-model="formSend.permType" @change="change('.permType',$event)" placeholder="请选择">
                  <el-option v-for="(item,key) in permTypes" :label="item.name" :value="item.id" :key="key"></el-option>
              </el-select>
              <p class="errorMsg"></p>
            </div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <button class="btn btn-reset bold" @click="dialogVisible = false">取 消</button>
          <button class="btn btn-primary bold" @click="addOrChange">确 认</button>
        </div>
      </el-dialog>
    <!-- 增删改弹出层end-->

    <!-- remvoe start -->
      <el-dialog :visible.sync="promptShow" size="tiny" class="remove-dialog">
        <span v-text="propmptMsg.content"></span>
        <span slot="footer" class="dialog-footer">
          <button class="btn btn-reset" @click="promptShow=false">取 消</button>
          <button class="btn btn-primary" @click="removeSure">确 定</button>
        </span>
      </el-dialog>
    <!-- remvoe end -->
    
  </div>
</template>

<script>


  export default {
    data() {
      return {
        permTypes:[{name:'系统入口',id:0},{name:'一级菜单',id:1},{name:'二级菜单',id:2},{name:'功能权限',id:3}],
        tree: [],
        deType:[],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        reqType:'',
        dialogVisible:false,
        sendSureBtn:true,
        promptShow:false,
        tableHaveData:true,
        dialogMsg:{
          type:''
        },
        propmptMsg:{
          content:'',
          type:''
        },
        form:{        
        },
        formShow:false,
        formSend:{
          permCode:'',
          permName:'',
          parentId:'',  
          url:'',
          permType:''
        },
        permTypeName:'',
        permissionObj:{
          permission_add:false,
          permission_delete:false,
          permission_edit:false
        }
      }
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
      getPermissions(){
        //获取权限信息
        var that=this;
        this.getAjax(this.host,'/function/findAllPermises.json').success(function(r){
            if (r.code==0) {
              that.tree=r.data;
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
                if (!!that.form.permType) {
                  that.form.permType=parseInt(that.form.permType);
                  that.permTypeName=that.permTypes[that.form.permType].name;
                }
                
                that.tableHaveData=false;
              }
              $.fn.zTree.init($("#treeDemoDm"), setting, r.data);
            }else{
              that.$message.error(r.message);
            }
            
        }).error(function(e){
          that.$message.error('服务器错误')
        })
      },
      savePermission(){
        // 新增权限信息
        var data=JSON.parse(JSON.stringify(this.formSend));
        var that=this;
        if (data['parentId']===0) {
          data['parentId']='';
        }
        this.getAjax(this.host,'/function/savePermission.json',data).success(function(r){
            if (r.code==0) {
              that.$message('权限保存成功！')
              that.getPermissions();
            }else{
              that.$message.error(r.message)
            }
            
        }).error(function(e){
          //返回warn或者错误 tit和content
          that.$message.error('服务器错误')
        })
      },
      updatePermission(){
        //编辑权限信息
        var that=this;
        var data=JSON.parse(JSON.stringify(this.formSend));
        data['id']=this.form.id;
        this.getAjax(this.host,"/function/updatePermission.json",data).success(function(r){
            if (r.code==0) {
              that.$message('权限编辑成功！')
              that.getPermissions(); 
            }else{
              that.$message.error(r.message)
            }
        }).error(function(e){
          //返回warn或者错误 tit和content
          that.$message.error('服务器错误')
        })
      },
      deletePermission(){
        //删除权限
        var id=this.form.id;
        var that=this;
        this.getAjax(this.host,'/function/deletePermission.json',{id:id}).success(function(r){
            if (r.code==0) {
              that.form={};
              that.$message('权限删除成功！')
              that.getPermissions(); 
            }else{
              that.$message.error(r.message);
            }
        }).error(function(e){
          //返回warn或者错误 tit和content
          that.$message.error('服务器错误')     
        })
      },
      addOrChange(){
        var formSend=this.formSend;
        var flag=false;
        for(var i in formSend){
          if (i==='url') {
            continue;
          }
          if(!!formSend[i]===false && formSend[i]!==0){
            flag=true; 
            $('#formDialogPe').find('.'+i+' input').addClass('error').parents('.inp-box').find('.errorMsg').text('输入不能为空！');
            break;
          }
        }
        if (flag) {
          return
        }
        if (this.reqType=='ADD') {
          //add
          this.savePermission();
        }else if (this.reqType=='CHANGE') {
          this.updatePermission();
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
            this.formSend.permName=this.form.name;
            this.formSend.permCode=this.form.permCode;
            this.formSend.parentId=this.form.parentId;
            this.formSend.url=this.form.urlStr;
            this.formSend.permType=this.form.permType; 
          }else{
            this.formSend={
              permCode:'',
              permName:'',
              parentId:'',
              url:'',
              permType:''
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
        this.deletePermission();
      },
      addPermission(){
        this.reqType="ADD";
        this.dialog('创建权限');
      },
      changeDepartment(){

        this.reqType="CHANGE";
        this.dialog("创建权限")
      },
      removeDepartment(){
        this.reqType='REMOVE';
        this.dialog("删除部门")
      },
      change(selector,value){
        if (!!value || value===0) {
          //有数据
          $('#formDialogPe '+selector).find('input').removeClass('error').end().find('.errorMsg').text('');
        }else{
          $('#formDialogPe '+selector).find('input').addClass('error').end().find('.errorMsg').text('输入不能为空！');
        }
      },
      removeAllError(){
        $('#formDialogPe input.error').removeClass('error').parents('.inp-box').find('.errorMsg').text('');
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
      var dragTest=new Drag('#permission .control-line','#permission .content-left',{
        maxW:500,
        minW:300,
        speed:4
      });
      //请求树数据
      this.getPermissions();
      var $wrap=$('#permission .table-wrap');
      var $tree=$('#treeDemoDm');
      var wrapHeight=$wrap.height()-104;
      $tree.css('height',wrapHeight+'px');
      $(window).resize(function(){
        wrapHeight=$wrap.height()-104;
        $tree.css('height',wrapHeight+'px');
      })
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

</script>

<style scoped>
.ztree li a#treeDemo_1_a span.node_name{color: #8894a4;}
  #permission{
    height: 100%;
  }
  .table-wrap{
    height: 100%;
  }
  .table-content{
    height: 100%;
    width: 100%;
    position: relative;
    border-collapse: collapse;
  }
  .table-content>tr{
    height: 100%;
  }
  .table-content .content-left{
    width: 300px;
    height: 100%;
    margin-bottom: 20px;
    box-sizing: border-box;
    overflow: hidden;
    background-color: #fff;
    padding: 0 0 45px 0;
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
    padding-top: 15px;
    border-bottom: 1px solid #f6f8f8;
    padding-bottom: 15px;
    padding-left: 30px;
    text-align: center;
  }
  
  #treeDemoDm{
    padding: 40px 0 0 30px;
    overflow-y: scroll;
  }
  .table-content .content-right{
    box-sizing: border-box;
    padding: 25px 20px 0;
    height: 100%;
    background-color: #fff;
    position: relative;
  }
  .content-right .btn-wrap{
    height: 55px;
    padding-right: 60px;
  }
  
  .warning{
    color: red;
  }
  .msg-table{

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
  .ztree li a.level0{
    height: 25px;
    font-weight: bold;
    color: #8894a4;
    margin-bottom: 6px;
  }
  .ztree li a.level0 span.node_name{
    font-size: 16px;
    position: relative;
    left: -8px;
  }
  .ztree li span.ico_docu+span{
    position: relative;
    left: -16px;
  }
  .ztree li span.ico_docu
  .ztree li a.treeDemo_2_a .treeDemo_2_span{
    color: #8894a4;
    font-weight: bold;
  }
</style>