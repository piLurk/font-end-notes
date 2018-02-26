<template>
  <div id="app">
    <div id="wrapper" >
      <!--左侧导航 begin-->
        <div class="navbar-static-side">
            <div class="logo"></div>
            <div class="system-user">
                <div class="imgbox"><img src="/src/assets/images/system-user.png"></div>
                <div class="name">{{realName}}</div>
                <div class="job">{{position}}</div>
            </div>
            <ul class="nav" id="side-menu">
                <li class="secondli" v-show="permissionObj['organization']">
                    <a href="javascript:void(0)">
                        <i class="fa i-organization"></i>
                        <em class="i-liarrow"></em>
                        <span class="nav-label">组织架构</span>
                    </a>
                    <ul class="nav nav-second-level">
                        <li v-show="permissionObj['department_manage']">
                            <a id="a1" class="J_menuItem active" @click="pageChange('department')" href="javascript:void(0)" data-href="department">部门管理
                            <em class="i-rightarrow"></em>
                            </a>
                        </li>
                        <li v-show="permissionObj['position_manage']">
                            <a id="a2" class="J_menuItem" @click="pageChange('job')" href="javascript:void(0)" data-href="job">岗位管理
                            <em class="i-rightarrow"></em>
                            </a>
                        </li>
                    </ul>
                </li>
                 <li v-show="permissionObj['permission_fun']" class="secondli">
                    <a href="javascript:void(0)">
                        <i class="fa i-permission"></i>
                        <em class="i-liarrow"></em>
                        <span class="nav-label">权限功能</span>
                    </a>
                    <ul class="nav nav-second-level">
                        <li v-show="permissionObj['permission_manage']"><a id="a3" class="J_menuItem" @click="pageChange('permission')" href="javascript:void(0)" data-href="permission">权限管理
                        <em class="i-rightarrow"></em>
                        </a></li>
                        <li v-show="permissionObj['role_permission']"><a id="a4" class="J_menuItem" @click="pageChange('rolePermission')" href="javascript:void(0)" data-href="rolePermission">角色权限
                        <em class="i-rightarrow"></em>
                        </a></li>
                        <li v-show="permissionObj['user_role_manage']"><a id="a5" class="J_menuItem" @click="pageChange('role')" href="javascript:void(0)" data-href="role">用户角色管理
                        <em class="i-rightarrow"></em>
                        </a></li>
                    </ul>
                </li>
                <li v-show="permissionObj['oa_personInfo']"  class="secondli">
                    <a href="javascript:void(0)">
                        <i class="fa i-info"></i>
                        <em class="i-liarrow"></em>
                        <span class="nav-label">人员信息</span>
                    </a>
                    <ul class="nav nav-second-level">
                        <li v-show="permissionObj['oa_addPerson']" ><a id="a6" class="J_menuItem" @click="pageChange('add')" href="javascript:void(0)" data-href="add">新增人员信息
                        <em class="i-rightarrow"></em>
                        </a></li>
                        <li v-show="permissionObj['oa_queryPerson']"><a id="a7" class="J_menuItem" @click="pageChange('query')" href="javascript:void(0)" data-href="query">查询人员信息
                        <em class="i-rightarrow"></em>
                        </a></li>
                    </ul>
                </li>
            </ul>
            <p class="edition"><span class="editionWords">版本号：</span><a href="javascript:void(0)">V1.2</a></p>
            <div class="switchBar" id="switchBar" data-val="bigval"><i id="i-switch"></i><p>点击收起</p></div>
        </div>
        <!--左侧导航 end-->
        <!--右侧内容区域 begin-->
        <div id="page-wrapper">
            <div class="row content-tabs" @click="tabChange($event)">
               <div class="systemName"><h2>江寓OA系统</h2></div>
                 <button class="roll-nav roll-left J_tabLeft"><i class="fa i-prev"></i></button>
                 <nav class="page-tabs J_menuTabs">
                     <div class="page-tabs-content">
                         <a href="javascript:;" class="active J_menuTab" data-id=""><i class="fa fa-times-circle"></i></a>
                     </div>
                 </nav>
                 <button class="roll-nav roll-right J_tabRight"><i class="fa i-next"></i></button>
                 <div class="outlogin"><a :href="host+'/ajaxLogout'+tokenStr">退出登录</a></div>
            </div>
          <!--核心框架 begin-->
        <div id="mainbox" class="row J_mainContent">
            <div id="oa-content" v-show="permissionObj['oa']">
                <div :permission="{}" :is="item.component" v-for="(item,key) in itemArr" v-show="currentViewId===item.id"></div>
            </div>
        </div>
          <!--核心框架 end-->
        <!-- 下侧版权信息start -->
            <p class="copyright">
                COPYRIGHT © 2017 jiangroom.com (武汉吉家江寓房产管理服务有限公司). 版权所有 鄂ICP备17
            </p>
        <!-- 下侧版权信息start -->
        </div>
        <!--右侧内容区域 end-->
    </div>

    
  </div>
</template>

<script>


import department from './components/private/DepartmentManagement.vue'
import job from './components/private/JobManagement.vue'
import permission from './components/private/PermissionManagement.vue'
import rolePermission from './components/private/RolePermissionManagement.vue'
import role from './components/private/RoleManagement.vue'
import add from './components/private/NewPersonInfoManagement.vue'
import query from './components/private/QueryPersonInfoManagement.vue'
import personnelChange from './components/private/PersonnelChange.vue'
import extentionNumber from './components/private/ExtentionNumber.vue'
import quit from './components/private/Quit.vue'
import personBack from './components/private/PersonBack.vue'

export default{
    data(){
        return{
           showPage:false,
           hasPermissionFun:false,
           realName:'',
           position:'',
           tokenStr:'',
           permissionObj:{
                oa:false,
                organization:false,
                department_manage:false,
                position_manage:false,
                permission_fun:false,
                permission_manage:false,
                user_role_manage:false,
                role_permission:false,    
                oa_personInfo:false,
                oa_addPerson:false,
                oa_queryPerson:false
           }
        }
    },
    computed:{
        currentViewId(){
            return this.$store.getters.currentViewId;
        },
        itemArr(){
            return this.$store.getters.itemArr;
        }
    },
    methods:{
        pageChange(componentName){
            this.$store.dispatch('itemArrAdd',{component:componentName,id:componentName,needSave:false})
            this.$store.state.mutations.currentViewId=componentName;
        },
        tabChange($event){
            var $target=$($event.target);
            //点击切换
            if ($target.hasClass('J_menuTab')) {
              var componentId=$target.data('id');
              this.$store.state.mutations.currentViewId=componentId;
            }

        },
        getUser(userId){
            var that=this;
            $.ajax({
                url:that.host+'/function/getRolesAndPermissionsById.json',
                type:'get',
                dataType:'JSON',
                xhrFields:{
                  withCredentials:true
                },
                crossDomain:true,
                async: false,
                data :{userId:userId}
            }).success(function(r){
                    if (r.code===0) {
                        var permissions=r.data.permission;
                        var permissionObj={};
                        for(var k=0;k<permissions.length;k++){
                            permissionObj[permissions[k]]=true;
                        }                      
                        that.$store.state.mutations.permissionObj=permissionObj;
                        var permissions=permissionObj;
                        for(var i in that.permissionObj){
                            if (permissions[i]) {
                                that.permissionObj[i]=true;
                            }
                        }
                        if (!that.permissionObj['oa']) {
                            that.$message.error('您的访问未被授权！')
                        }else{
                            that.showPage=true;
                        }
                        that.realName=r.data.realName;
                        that.position=r.data.position;
                    }else{
                        that.$message.error('您的访问未被授权！');
                    }  
            }).error(function(e){
                that.$message.error('服务器错误！');
            })
        }
    },
    components:{
        department:department,
        job:job,
        permission:permission,
        rolePermission:rolePermission,
        role:role,
        add:add,
        query:query,
        personnelChange:personnelChange,
        extentionNumber:extentionNumber,
        quit:quit,
        personBack:personBack
    },
    created:function(){
        var search=location.search;
        var tokenStr=search.split('token=')[1];
        if (!tokenStr) {
            //没有token，重定向
            location.href=this.host;
        }else{
            //有token,请求人员信息和权限
            var that=this;
            this.tokenStr="?token="+tokenStr;
            $.ajax({
                url:that.host+'/employeeInfo/validToken',
                type:'get',
                dataType:'JSON',
                xhrFields:{
                  withCredentials:true
                },
                crossDomain:true,
                async: false,
                data :{token:tokenStr}
            }).success(function(r){
                if (r.code===0) {
                    var userId=r.data;

                    that.$store.state.mutations.userId=userId;
                    that.getUser(userId);
                }else{
                    //错误，从新登陆。
                    location.href=that.host;
                }

            }).error(function(e){
                //服务器错误，从新登陆。
                that.$message.error('服务器错误！')
            })
        }
    },
    mounted:function(){    
        var that=this; 
        //默认呈现页面
        if(this.permissionObj.department_manage){
            //有部门管理
            this.pageChange('department');
            var $obj=$('.J_menuItem[data-href=department]').parents('ul.nav-second-level');
            $('.J_menuItem[data-href=department]').addClass('active').parents('ul.nav-second-level').siblings('a').addClass('defaultOpen');
            $('.page-tabs-content>a').text('部门管理').append('<i class="fa fa-times-circle"></i>').attr('data-id','department');
        }else if(this.permissionObj.permission_manage){
            //无部门管理，展现权限管理
            this.pageChange('permission');
            $('.J_menuItem[data-href=permission]').addClass('active').parents('ul.nav-second-level').siblings('a').addClass('defaultOpen');
            $('.page-tabs-content>a').text('权限管理').append('<i class="fa fa-times-circle"></i>').attr('data-id','permission');
        }else{
            //无部门管理;权限管理，展现查询人员信息
            this.pageChange('query');
            $('.J_menuItem[data-href=query]').addClass('active').parents('ul.nav-second-level').siblings('a').addClass('defaultOpen');
            $('.page-tabs-content>a').text('查询人员信息').append('<i class="fa fa-times-circle"></i>').attr('data-id','query');
        }
        //点击tap关闭切换
        $('.J_menuTabs').delegate('.fa-times-circle','click',function(e){
            var componentId;
            if (e.isTrigger) {
                //页面内调用（trigger调用）;
                componentId=$(e.target).parent().data('id');
                //不存在只有一个组件实例的情况
                that.$store.dispatch('itemArrRemove',{id:componentId,type:'triggerRemove'});
            }else{
                //直接点击×调用
                componentId=$(this).parent().data('id');
                var arr=that.itemArr;
                if (arr.length===1) {
                    return
                }
                that.$store.dispatch('itemArrRemove',{id:componentId});
            }
        })
    }
}

</script>

<style>
/*公共css*/
#app{
    height: 100%;
}
#oa-content{
    position: relative;
    height: 100%;
    box-sizing: border-box;
    padding: 15px 15px 0 15px;
}
div.el-dialog__body{
    padding: 20px;
}
.inp-item {
    width: 33%;
    margin-top: 25px;
    display: inline-block;
}
.inp-item>p{
    float: left;
    width: 75px;
    line-height: 34px;
    padding-left: 15px;
    color: #576578;
    height: 34px;
}
.inp-item .inp-box{
    margin-left: 95px;
    margin-right: 35px;
    position: relative;
}
.inp-item .inp-box .errorMsg{
    position: absolute;
    top: 100%;
    color: red;
}
.inp-item>button:first-child{margin-right: 15px;}
.dialog-form .inp-item{
    width: 50%;
}
.component-box .el-table th{
    text-align: center;
    }
.component-box .el-table td{
    text-align: center;
}
/*element select*/
div.el-select {
    width: 100%;
}
/*表格*/
.table-box{
    padding: 10px 20px 0;
    height: calc(100% - 10px);
    box-sizing: border-box;
    background-color: #fff;
}
.msg-table{
    width: 100%;
    text-align: left;
    border-collapse: collapse;
}
.msg-table tr>th.oparateTh{text-align: center;}
.msg-table tr>td:first-child,.msg-table tr>th:first-child{padding-left: 30px;}
.msg-table td a{
    color: #d1d1d1;
}
.msg-table td{
    border-bottom: 1px solid #f1f1f1;
    cursor:pointer;
    color:#576578;
}
.msg-table tr:hover td{
    background-color: #f9fafc;
}
.msg-table tr:hover td.oparateTd a:first-child{
    color: #f6732b;
}
.msg-table tr:hover td.oparateTd a:nth-child(2){
    color:#3ba0ff;
}
.msg-table td,th{   
    height: 40px;
    border-bottom: 1px solid #f1f1f1
}
.msg-table th{
    background-color: #f6f8f8;
    color:#a3b2c6;
    font-weight: normal;
}
.msg-table td.oparateTd{text-align: center;}
.msg-table td.oparateTd a{font-size: 12px;}
.msg-table td.oparateTd a:first-child{
    margin-right: 25px;
}
.msg-table td.oparateTd.alone a:first-child{
    margin-right: 0px;
}
/*表单错误提示*/
.wrong input{
    border-color:red;
}
/*树结构*/
.ztree li span.button.switch.level0 {visibility:hidden; width:1px;}
.ztree li ul.level0 {padding:0; background:none;}
.ztree li a.level0.curSelectedNode{
    background-color: #fff;
    border: none;
    opacity: 1;
}
/*必填项*/
span.need{
    position: relative;
    color:#ff4e00;
    top: 2px;
}
/*按钮*/
button.el-button span.symbol{
    font-size: 18px;
}
/* 点 */
.dotUl{
    position: absolute;
    top:7px;
    right: 4px;
}
.dotUl li{
    width: 3px;
    height: 3px;
    margin-bottom: 5px;
    background-color: #cdd5dd;
}
/*一条form*/
.form-box{
    padding-left: 10px;
    background-color: #fff;
    margin-bottom: 4px;
}
/* 版权信息 */
.copyright{
    text-align: center;
    color: #b2b6be;
    line-height: 40px;
    height: 40px;
    font-size: 12px;
}
/*查询页面的人员操作*/
.operate-content{
    padding-top: 30px;
}
.operate-content h3{
    border-left: 3px solid #3ba0ff;
    padding: 5px 0;
    padding-left: 30px;
    height: 26px;
    line-height: 26px;
    margin-bottom: 10px;
}
.operate-content .msg-wrap{
    padding: 0 20px;
}
.operate-content .msg-wrap .content-ul li{
    width: 25%;
    display: inline-block;
    box-sizing: border-box;
    padding: 6px 0;
    padding-right: 3%;
}
.operate-content .msg-wrap .content-ul li>p{
    float: left;
    display: inline-block;
    line-height: 36px;
    width: 85px;
    color: #576578;
}
.operate-content .msg-wrap .content-ul li .inp-box{
    width: 100%;
    padding-left: 85px;
    box-sizing: border-box;
    line-height: 36px;
}
.operate-content .msg-wrap .content-ul li.long>p{
     width: 120px;
}
.operate-content .msg-wrap .content-ul li.long .inp-box{
    padding-left: 125px; 
}
.operate-content .msg-wrap .content-ul li.middle>p{
     width: 100px;
}
.operate-content .msg-wrap .content-ul li.middle .inp-box{
    padding-left: 105px;  
}
.operate-content .msg-wrap .content-ul li .select-wrap{
    
}
.operate-content .msg-wrap .content-ul li .el-cascader__label span:nth-child(1){
    color: #a3b2c6;
    padding-right: 0;
}
.operate-content .msg-wrap .content-ul li span:nth-child(1)
.operate-content .msg-wrap .p-textarea{
    margin-top: 25px;
}
.operate-content .msg-wrap .p-textarea span.tit{
    display:inline-block;
    height: 60px;
    vertical-align: top;
    color: #576578;
    margin-right: 10px;
}
.operate-content .msg-wrap .p-textarea textarea{
    height: 60px;
    display: inline-block;
    background-color: #fff;
    border-radius: 3px;
    width:calc(97% - 85px);
    box-sizing: border-box;
}
.operate-content .btn-wrap{
    text-align: center;
    padding-bottom: 35px;
}
.operate-content .btn-wrap button{
    margin-top: 50px;
}
.operate-content .btn-wrap button:not(first-child){
    margin-right: 15px;
}
/* dialog */
div.el-dialog__header{
    padding: 0;
    background:#f7f7f7; 
    
}
div.el-dialog__header .el-dialog__title{
    display: inline-block;
    border-left: 3px solid #3ca0ff;
    padding: 0 25px;
    line-height: 25px;
    margin: 10px 0;
    color: #1c2b36;

}
div.el-dialog__header .el-dialog__headerbtn{
    display: inline-block;
    padding: 0 15px;
    line-height: 25px;
    margin: 10px 0;
}
div.el-dialog__footer{
    text-align: center;
    padding: 10px 20px 15px;
}

/* element select */
i.el-icon-caret-top::before{
    font-size: 8px;
    position: relative;
    top: -3px;
}
.el-select input.el-input__inner{
    border-radius: 2px;
    border-color: #dfe5e7;
}
.error .el-select input.el-input__inner{
    border-color: red;
    box-shadow: 0 0 3px 0 rgba(255,0,0,0.8);
}
span.el-cascader .el-input, span.el-cascader .el-input__inner{
    border-radius: 2px;
    border-color: #dfe5e7;
}
i.el-icon-caret-top::before{
    font-size: 6px;
    color: #363b42;
}
i.el-icon-caret-bottom::before{
    font-size: 6px;
    position: relative;
    top: -2px;
    color: #363b42;
}
div.el-select:hover .el-input .el-input__inner{
    border-color: #3ba0ff
}
div.el-select:hover .el-input.is-disabled .el-input__inner{
    border-color: transparent;
}
.el-select .el-input.is-disabled .el-input__icon{
    cursor: not-allowed;
}
div.el-input.is-disabled .el-input__inner{
    color:#333;
}
span.el-cascader{
    width: 100%;
}
.el-select input.el-input__inner.error{border-color:red;}
.el-select input.el-input__inner.error:hover,.el-select input.el-input__inner.error:focus{border-color: red;}
/* element dialog */
div.el-dialog__footer{
    padding: 40px 20px 45px;
}
.dialog-footer button:first-child{
    margin-right: 20px;
}
div.el-dialog__body{
    color: #576578;
}
.remove-dialog div.el-dialog__header{
    background-color: transparent;
}
.remove-dialog .el-dialog__body{
    text-align: center;
    color: #1c2b36;
    font-size: 16px;
}
.remove-dialog .el-dialog__body{
    padding: 30px 20px;
}
div.el-dialog{
    top: 50% !important;
    transform: translateX(-50%) translateY(-50%);
}
/* element date */
i.el-icon-date::before{
    content: '';
    background-image: url(/src/assets/images/date.png);
    display: inline-block;
    width: 14px;
    height: 14px;
    position: relative;
    top: 2px;

}
div.el-date-editor.el-input{width: 100%;}

/* element loading */
div.el-loading-mask{
    background-color: rgba(255,255,255,0.6);
}
/* table no-data */
.table-nodata{
    position: relative;
    text-align: center;
    padding-top: 35px;

}
.table-nodata p{
    margin-top: 35px;
    padding-left: 25px;
    color:#8894a4;
    font-size: 16px;
}
/* element upload */
a.el-upload-list__item-name{
    text-align: center;
    overflow: show;
    text-overflow: 

}

/* 媒体查询 */
@media screen and (max-width: 1350px) {
    .operate-content .msg-wrap .content-ul li{
        width: 33.333%;
    }
}
</style>
