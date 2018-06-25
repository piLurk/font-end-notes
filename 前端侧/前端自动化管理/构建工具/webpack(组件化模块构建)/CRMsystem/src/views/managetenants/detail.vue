<template>
  <div class="manageTenantsDetail">
      <div class="baseInfo infoBox">
          <div class="title">
              <h3>基础信息</h3>
          </div>
          <ul class="ulInfoBox clearfix">
              <li>
                  <p class="name">姓名：</p>
                  <div class="inpbox">
                      <span v-text="baseinfo.userName?baseinfo.userName:'--'"></span>
                  </div>
              </li>
              <li>
                  <p class="name">性别：</p>
                  <div class="inpbox">
                      <span v-show="baseinfo.userSex == 0">女</span>
                      <span v-show="baseinfo.userSex == 1">男</span>
                  </div>
              </li>
              <li>
                  <p class="name">手机号码：</p>
                  <div class="inpbox">
                      <span v-text="baseinfo.tel?baseinfo.tel:'--'"></span>
                  </div>
              </li>
              <li>
                  <p class="name"></p>
                  <div class="inpbox"></div>
              </li>
              <li>
                  <p class="name">年龄：</p>
                  <div class="inpbox">
                      <span v-text="baseinfo.age?baseinfo.age:'--'"></span>
                  </div>
              </li>
              <!-- <li>
                  <p class="name">民族：</p>
                  <div class="inpbox">
                      <span>汉族</span>
                  </div>
              </li> -->
          </ul>
      </div>
      <div class="authInfo infoBox">
          <div class="title">
              <h3>认证信息</h3>
          </div>
          <ul class="ulInfoBox clearfix">
              <li>
                  <p class="name">认证方式：</p>
                  <div class="inpbox">
                      <span v-show="baseinfo.authenticationMethod == 1">人脸识别</span>
                      <span v-show="baseinfo.authenticationMethod == 2">银行卡认证</span>
                  </div>
              </li>
              <li>
                  <p class="name">认证状态：</p>
                  <div class="inpbox">
                      <span v-text="baseinfo.status?baseinfo.status:'--'"></span>
                  </div>
              </li>
              <li>
                  <p class="name"></p>
                  <div class="inpbox"></div>
              </li>
              <li>
                  <p class="name"></p>
                  <div class="inpbox"></div>
              </li>
              <li>
                  <p class="name">证件类型：</p>
                  <div class="inpbox">
                      <span v-show="baseinfo.documentType == 1">身份证</span>
                  </div>
              </li>
              <li>
                  <p class="name">证件号码：</p>
                  <div class="inpbox">
                      <span v-text="baseinfo.idCard?baseinfo.idCard:'--'"></span>
                  </div>
              </li>
              <li>
                  <p class="name" style="width: 98px;">证件有效期：</p>
                  <div class="inpbox" style="margin: 0 18px 0 105px;">
                      <span v-text="baseinfo.validDate?baseinfo.validDate:'--'"></span>
                  </div>
              </li>
              <li>
                  <p class="name"></p>
                  <div class="inpbox"></div>
              </li>
              <li>
                  <p class="name">证件地址：</p>
                  <div class="inpbox" style="height: 30px;">
                      <el-tooltip class="item" effect="dark" :content="baseinfo.documentAddress" placement="top">
                        <span style="white-space:nowrap; text-overflow:ellipsis;overflow:hidden;display: inline-block;" v-text="baseinfo.documentAddress?baseinfo.documentAddress:'--'"></span>
                      </el-tooltip>
                  </div>
              </li>
              <li>
                  <p class="name">发证机关：</p>
                  <div class="inpbox">
                      <span v-text="baseinfo.issuingOrgan?baseinfo.issuingOrgan:'--'"></span>
                  </div>
              </li>
              <li>
                  <p class="name">证件照片：</p>
                  <div class="inpbox">
                      <span @click="dialogVisible = true" style="color: rgb(59, 160, 255);cursor: pointer;height: 30px;line-height: 30px;display: inline-block;">查看照片</span>
                  </div>
              </li>
              <li>
                  <p class="name"></p>
                  <div class="inpbox"></div>
              </li>
              <li>
                  <p class="name">银行卡号：</p>
                  <div class="inpbox">
                      <span v-text="baseinfo.cardNumber?baseinfo.cardNumber:'--'"></span>
                  </div>
              </li>
              <li>
                  <p class="name" style="width: 98px;">芝麻信用分：</p>
                  <div class="inpbox" style="margin: 0 18px 0 105px;">
                      <span v-text="baseinfo.zhima?baseinfo.zhima:'未授权'"></span>
                  </div>
              </li>
          </ul>
      </div>
      <div class="renterEducationInfo infoBox">
          <div class="title">
              <h3>学历信息</h3>
          </div>
          <ul class="ulInfoBox clearfix">
              <li>
                  <p class="name">学历：</p>
                  <div class="inpbox">
                      <span v-text="renterEducationInformation.education?renterEducationInformation.education:'--'"></span>
                      <!-- <span v-show="renterEducationInformation.education == 1">专科</span>
                      <span v-show="renterEducationInformation.education == 2">成人</span>
                      <span v-show="renterEducationInformation.education == 3">本科</span>
                      <span v-show="renterEducationInformation.education == 4">硕士研究生</span>
                      <span v-show="renterEducationInformation.education == 5">博士研究生</span> -->
                  </div>
              </li>
              <li>
                  <p class="name">入学年份：</p>
                  <div class="inpbox">
                      <span v-text="renterEducationInformation.enrollmentYear?renterEducationInformation.enrollmentYear:'--'"></span> 年
                  </div>
              </li>
              <li>
                  <p class="name">毕业年份：</p>
                  <div class="inpbox">
                      <span v-text="renterEducationInformation.graduationYear?renterEducationInformation.graduationYear:'--'"></span> 年
                  </div>
              </li>
              <li>
                  <p class="name"></p>
                  <div class="inpbox"></div>
              </li>
              <li>
                  <p class="name">就读学校：</p>
                  <div class="inpbox">
                      <span v-text="renterEducationInformation.school?renterEducationInformation.school:'--'"></span>
                  </div>
              </li>
              <li>
                  <p class="name">教育类型：</p>
                  <div class="inpbox">
                      <span v-text="renterEducationInformation.educationType?renterEducationInformation.educationType:'--'"></span>
                  </div>
              </li>
              <li>
                  <p class="name"></p>
                  <div class="inpbox"></div>
              </li>
              <li>
                  <p class="name"></p>
                  <div class="inpbox"></div>
              </li>
              <li>
                  <p class="name" style="width: 98px;">学历验证码：</p>
                  <div class="inpbox" style="margin: 0 18px 0 105px;">
                      <span v-text="renterEducationInformation.educationVerificationCode?renterEducationInformation.educationVerificationCode:'--'"></span>
                  </div>
              </li>
              <li>
                  <p class="name" style="width: 98px;">学籍验证码：</p>
                  <div class="inpbox" style="margin: 0 18px 0 105px;">
                      <span v-text="renterEducationInformation.schoolVerificationCode?renterEducationInformation.schoolVerificationCode:'--'"></span>
                  </div>
              </li>
              <li>
                  <p class="name"></p>
                  <div class="inpbox"></div>
              </li>
              <li>
                  <p class="name"></p>
                  <div class="inpbox"></div>
              </li>
              <li v-show="renterEducationInformation.examineStatus==0||renterEducationInformation.examineStatus==2||renterEducationInformation.examineStatus==3||renterEducationInformation.examineStatus==4">
                  <p class="name">审核状态：</p>
                  <div class="inpbox">
                      <span v-show="renterEducationInformation.examineStatus==0">没进流程</span>
                      <span v-show="renterEducationInformation.examineStatus==2">审核通过</span>
                      <span v-show="renterEducationInformation.examineStatus==3">审核驳回</span>
                      <span v-show="renterEducationInformation.examineStatus==4">不通过</span>
                  </div>
              </li>
              <li v-show="renterEducationInformation.examineStatus==3">
                  <p class="name">驳回原因：</p>
                  <div class="inpbox">
                      <span v-text="renterEducationInformation.reason?renterEducationInformation.reason:'--'"></span>
                  </div>
              </li>
              <li v-show="renterEducationInformation.examineStatus==2 && !baseinfo.couponNum &&permission.indexOf('crm_rentapprove')>-1">
                  <p class="name">手动发券：</p>
                  <div class="inpbox">
                      <button class="btn btn-primary" @click="sendCertificate">点击发券</button>
                  </div>
              </li>
              <li v-show="renterEducationInformation.examineStatus==2 && !!baseinfo.couponNum">
                  <p class="name">免押券号：</p>
                  <div class="inpbox">
                      <span>{{baseinfo.couponNum}}</span>
                  </div>
              </li>
              <li v-show="renterEducationInformation.examineStatus==2 && !!baseinfo.couponNum">
                  <p class="name">有效期：</p>
                  <div class="inpbox">
                      <span>{{baseinfo.couponStart}}--{{baseinfo.couponEnd}}</span>
                  </div>
              </li>
              <li v-show="renterEducationInformation.examineStatus==1&&!(permission.indexOf('crm_rentapprove')>-1)" style="width: 48%;">
                  <p class="name">审核状态：</p>
                  <div class="inpbox">
                      <span>待审核</span>
                  </div>
              </li>
              <li v-show="renterEducationInformation.examineStatus==1&&(permission.indexOf('crm_rentapprove')>-1)" style="width: 48%;">
                  <p class="name">审核状态：</p>
                  <div class="inpbox">
                      <el-radio-group v-model="radio2" style="height: 30px;line-height: 30px;">
                        <el-radio label="Y">审核通过</el-radio>
                        <el-radio label="N">审核驳回</el-radio>
                        <el-radio label="NY">不通过</el-radio>
                      </el-radio-group>
                  </div>
              </li>
              <li v-show="renterEducationInformation.examineStatus==1&&(permission.indexOf('crm_rentapprove')>-1)">
                  <p class="name"></p>
                  <div class="inpbox"></div>
              </li>
              <li v-show="renterEducationInformation.examineStatus==1&&(permission.indexOf('crm_rentapprove')>-1)">
                  <p class="name"></p>
                  <div class="inpbox"></div>
              </li>
              <!-- <li v-show="renterEducationInformation.examineStatus==1">
                  <p class="name">驳回原因：</p>
                  <div class="inpbox">
                      <el-form ref="evaluationForm" :model="evaluationForm" :rules="rules2">
                        <el-form-item label="" prop="evaluateContent" style="margin: 0;height: 30px">
                          <el-input  type="text" :maxlength= "150" :minlength="8" placeholder="请输入原因（8-150字）" v-model="evaluationForm.evaluateContent" style="height: 30px"></el-input>
                        </el-form-item>
                      </el-form>
                  </div>
              </li> -->
              <li v-if="renterEducationInformation.examineStatus==1&&radio2 == 'N'&&(permission.indexOf('crm_rentapprove')>-1)">
                  <p class="name">驳回原因：</p>
                  <div class="inpbox">
                      <el-form ref="evaluationForm" :model="evaluationForm" :rules="rules2">
                        <el-form-item label="" prop="evaluateContent" style="margin-top: 0;">
                          <el-input  type="text" :maxlength= "150" :minlength="8" placeholder="请输入原因（8-150字）" v-model="evaluationForm.evaluateContent"></el-input>
                        </el-form-item>
                      </el-form>
                  </div>
              </li>
              <li v-show="renterEducationInformation.examineStatus==1&&(permission.indexOf('crm_rentapprove')>-1)">
                  <button @click="submitReason('evaluationForm')" class="btn btn-primary" style="margin-left: 10px;">提 交</button>
              </li>
          </ul>
      </div>
      <div class="qualificationInfo infoBox">
          <div class="title">
              <h3>资质信息</h3>
          </div>
          <ul class="ulInfoBox clearfix">
              <li>
                  <p class="name">行业方向：</p>
                  <div class="inpbox">
                      <span v-text="baseinfo.industryname?baseinfo.industryname:'--'"></span>
                  </div>
              </li>
              <li>
                  <p class="name">公司名称：</p>
                  <div class="inpbox">
                      <span v-text="baseinfo.companyName?baseinfo.companyName:'--'"></span>
                  </div>
              </li>
              <li>
                  <p class="name">公司地址：</p>
                  <div class="inpbox">
                      <span v-text="baseinfo.companyAddress?baseinfo.companyAddress:'--'"></span>
                  </div>
              </li>
              <li>
                  <p class="name"></p>
                  <div class="inpbox"></div>
              </li>
              <li>
                  <p class="name" style="width: 98px;">紧急联系人：</p>
                  <div class="inpbox" style="margin: 0 18px 0 105px;">
                      <span v-text="baseinfo.emergencyContact?baseinfo.emergencyContact:'--'"></span>
                  </div>
              </li>
              <li>
                  <p class="name" style="width: 130px;">紧急联系人电话：</p>
                  <div class="inpbox" style="margin-left: 135px;">
                      <span v-text="baseinfo.contactTel?baseinfo.contactTel:'--'"></span>
                  </div>
              </li>
              <li>
                  <p class="name" style="width: 140px;">与紧急联系人关系：</p>
                  <div class="inpbox" style="margin-left: 145px;">
                      <span v-text="baseinfo.contactRelationship?baseinfo.contactRelationship:'--'"></span>
                  </div>
              </li>
              <li>
                  <p class="name"></p>
                  <div class="inpbox"></div>
              </li>
          </ul>
      </div>
      <div class="contractInfo infoBox" style="position: relative;">
          <div class="title">
              <h3>合同信息</h3>
          </div>
          <div class="tabChange">
              <span :class="{active:leaderBoard==1}" @click="leaderBoard=1">出房合同</span><i class="line"></i><span :class="{active:leaderBoard==2}" @click="leaderBoardTwo">解约协议</span>
          </div>
          <div class="leaderBoardBox1" v-show="leaderBoard==1">
              <div class="miniPages">
                  <my-pagination :total="contractsCount" :curr="pagination1.curr" :pageChange="pageGo1" :pageSize ="pagination1.pageSize"></my-pagination>
              </div>
              <table class="mateTable" :class="{longWidth : !sidebar.opened}">
                <tbody>
                  <tr class="trth">
                    <th width="3%">序号</th>
                    <th width="10%">出房合同号</th>
                    <th width="6%">合同类型</th>
                    <th width="6%">状态</th>
                    <th width="20%">房源地址</th>
                    <th width="4%">房间编号</th>
                    <th width="6%">参与活动</th>
                    <th width="6%">所属管家</th>
                    <th width="15%">合同起止日期</th>
                    <th width="10%">提交时间</th>
                  </tr>
                  <tr v-for="(item,i) in contractsList" :key="i">
                    <td>{{i+1}}</td>
                    <td>{{item.contractNumber}}</td>
                    <td><span v-show="item.extension_flag == 0">非续约合同</span><span v-show="item.extension_flag == 1">续约合同</span></td>
                    <td>{{item.status}}</td>
                    <td>{{item.houseAddr}}</td>
                    <td>{{item.bedroomNum}}</td>
                    <td>{{item.activity}}</td>
                    <td>{{item.belongSaler}}</td>
                    <td>{{item.contractStratTime}}-{{item.contractEndTime}}</td>
                    <td>{{item.gmtTime}}</td>
                  </tr>
                </tbody>
              </table>
              <!-- <div class="footPages">
                <el-pagination background v-on:current-change="pageGoRank1" layout="prev, pager, next" :page-size="paginationRank1.pageSize" :current-page="paginationRank1.curr" :total="rankType == 0?allAreaCount:allGroupCount" ></el-pagination>
              </div> -->
          </div>
          <div class="leaderBoardBox2" v-show="leaderBoard==2">
              <div class="miniPages">
                  <my-pagination :total="cancelcontractsCount" :curr="pagination2.curr" :pageChange="pageGo2" :pageSize ="pagination2.pageSize"></my-pagination>
              </div>
              <table class="mateTable" :class="{longWidth : !sidebar.opened}">
                <tbody>
                  <tr class="trth">
                    <th width="3%">序号</th>
                    <th width="10%">解约协议编号</th>
                    <th width="6%">解约类型</th>
                    <th width="6%">状态</th>
                    <th width="20%">房源地址</th>
                    <th width="4%">房间编号</th>
                    <th width="6%">所属管家</th>
                    <th width="6%">办理管家</th>
                    <th width="10%">解约时间</th>
                    <th width="10%">提交时间</th>
                  </tr>
                  <tr v-for="(item,i) in cancelcontractsList" :key="i">
                    <td>{{i+1}}</td>
                    <td>{{item.cancelContractNum}}</td>
                    <td>{{item.type}}</td>
                    <td>{{item.status}}</td>
                    <td>{{item.houseAddr}}</td>
                    <td>{{item.bedroomNum}}</td>
                    <td>{{item.belongSaler}}</td>
                    <td>{{item.cancelPeople}}</td>
                    <td>{{item.cancelTime}}</td>
                    <td>{{item.gmtTime}}</td>
                  </tr>
                </tbody>
              </table>
          </div>

      </div>
      <el-dialog :close-on-click-modal="false" :visible.sync="dialogVisible" width="50%" center :modal-append-to-body="false">
        <h3 slot="title" class="el-dialog__title" style="height: 46px;line-height: 46px;border: 0;">查看证件照片</h3>
        <div style="text-align: center;">
          <img :src="baseinfo.facade" alt="证件正面照" style="width: 45%;">
          <img :src="baseinfo.reverse" alt="证件反面照" style="width: 45%;">
        </div>
        
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import { sendcoupon } from '@/api/managetenants'
import { mapGetters, mapActions } from 'vuex'
import { getToken } from '@/utils/auth'
import { workflowComplete } from '@/api/managetenants'
export default {
    data(){
      var validateNumb = (rule,value,callback) => {
          if (!value) {
            return callback(new Error('原因不能为空')); 
          }else if(value.length<8){
            callback(new Error('请正确输入原因！'));
          }else if(value.length>150){
            callback(new Error('请正确输入原因！'));
          }else{
            callback()
          }
      };
      return{
        pagination1:{
          pageSize:6,
          curr:1,
        },
        pagination2:{
          pageSize:6,
          curr:1,
        },
        leaderBoard: 1,
        radio2: 'Y',
        rules2: {
          evaluateContent: [
              { validator: validateNumb, trigger: 'change' }
          ]
        },
        dialogVisible: false,
        evaluationForm:{
          evaluateContent: ''
        }
      }
    },
    computed:{
      ...mapGetters([
        'baseinfo',
        'renterEducationInformation',
        'contractsCount',
        'contractsList',
        'cancelcontractsCount',
        'cancelcontractsList',
        'sidebar',
        'permission'
      ])
    },
    methods:{
      ...mapActions({
        getBasic:'GetBasic',
        getContracts: 'GetContracts',
        getCancelContracts: 'GetCancelContracts'
      }),
      sendCertificate(){
        sendcoupon({
          "id": this.renterEducationInformation.id
        }).then(response => {
            // console.log(response)
          this.$message({
            type:'success',
            message: '免押券号为'+ response.data
          })
          this.getBasic({"pkId":this.$route.params.pkId});
          this.getContracts({"pkId":this.$route.params.pkId,"pageSize":this.pagination1.pageSize,"pageIndex":0});
        }).catch(err => {
          console.log(err)
        })
      },
      submitReason(evaluationForm){
        var token = getToken();
        if(this.renterEducationInformation.examineStatus==1&&this.radio2 == 'N'){
            this.$refs[evaluationForm].validate((valid) => {
                if (valid) {
                    var param ={};
                    param.id = this.renterEducationInformation.id;
                    param.operateDesc = this.evaluationForm.evaluateContent;
                    param.approveIs = this.radio2;
                    param.token = token;
                    workflowComplete(param).then(response => {
                        this.$message({
                           type: 'warning',
                           message: response.data
                        })
                        this.getBasic({"pkId":this.$route.params.pkId});
                        this.getContracts({"pkId":this.$route.params.pkId,"pageSize":this.pagination1.pageSize,"pageIndex":0});
                    }).catch(err => {
                    console.log(err)
                    });
                } else {
                    return false;
                }
            });
        }else{
            var param ={};
            param.id = this.renterEducationInformation.id;
            param.operateDesc = '';
            param.approveIs = this.radio2;
            param.token = token;
            workflowComplete(param).then(response => {
              this.$message({
                type: 'warning',
                message: response.data
              })
              this.getBasic({"pkId":this.$route.params.pkId});
              this.getContracts({"pkId":this.$route.params.pkId,"pageSize":this.pagination1.pageSize,"pageIndex":0});
            }).catch(err => {
                console.log(err)
            });
        }
        
      },
      leaderBoardTwo(){
        this.leaderBoard = 2;
        this.getCancelContracts({"pkId":this.$route.params.pkId,"pageSize":this.pagination2.pageSize,"pageIndex":this.pagination2.curr-1})
      },
      pageGo1(curr){
        if(this.pagination1.curr===curr){
          return;
        }
        this.pagination1.curr=curr;
        this.getContracts({"pkId":this.$route.params.pkId,"pageSize":this.pagination1.pageSize,"pageIndex":this.pagination1.curr-1});
      },
      pageGo2(curr){
        if(this.pagination2.curr===curr){
          return;
        }
        this.pagination2.curr=curr;
        this.getCancelContracts({"pkId":this.$route.params.pkId,"pageSize":this.pagination2.pageSize,"pageIndex":this.pagination2.curr-1})
      },
    },
    beforeMount:function(){
      this.getBasic({"pkId":this.$route.params.pkId});
      this.getContracts({"pkId":this.$route.params.pkId,"pageSize":this.pagination1.pageSize,"pageIndex":this.pagination1.curr-1});
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .manageTenantsDetail{
        background: #fff;
        height: 100%;
        .infoBox{
            background-color: #fff;
            .title{
                padding-top: 15px;
                padding-bottom: 12px;
                h3 {
                    border-left: 3px solid #3ba0ff;
                    padding-left: 15px;
                    font-size: 14px;
                    height: 26px;
                    line-height: 26px;
                    color: #333;
                }
            }
            .ulInfoBox{
                padding-left: 20px;
                li{
                    width: 24%;
                    padding-right: 1%;
                    float: left;
                    margin: 5px 0;
                    .name {
                        width: 90px;
                        padding: 0 0 0 10px;
                        color: #A3B2C6;
                        text-align: left;
                        float: left;
                        height: 30px;
                        line-height: 30px;
                        font-size: 14px;
                    }
                    .inpbox {
                        margin-left: 100px;
                        span {
                            height: 30px;
                            line-height: 30px;
                            width: 100%;
                            box-sizing: border-box;
                            -moz-box-sizing: border-box;
                            -webkit-box-sizing: border-box;
                        }
                    }
                }

            }
        } 
         
    }
    .leaderBoardBox2,.leaderBoardBox1{
      margin: 0 30px;
      padding-bottom: 30px;
    }
    .leaderBoardBox2 .mateTable,.leaderBoardBox1 .mateTable{
      // margin: 0 30px;
      border-collapse:collapse;
      width: 100%;
      // width: 1600px;
      // &.longWidth{
      //   width: 1730px;
      // }
      tbody{
        tr{
          &.trth{
            background-color: #F6F8F8;border-bottom: 2px solid #e2e5e5;
          }
          &:hover{
            >td{
              background-color: #f9fafc;
            }
          }
          td{
            text-align: center;
            background:#fff;vertical-align: middle;height:40px;
            color: #576578;word-break:break-all;max-width:200px; font-size: 14px; border-bottom: 1px solid #f1f1f1;
          }
          th{
            vertical-align: middle;height:40px;
            font-size: 14px; color: #a3b2c6; font-weight: 500;
            background-color: #F6F8F8;border-bottom: 2px solid #e2e5e5;
          }
        }
      }
    }
    .tabChange{
      padding: 0 30px;
      margin-bottom: 20px;
      position: absolute;
      height: 42.4px;
      line-height: 42.4px;
      .line{
        font-family: PingFangSC-Regular;
        font-size: 12px;
        background-color: #A3B2C6;
        display: inline-block;
        width: 1px;
        margin: 0 25px;
        height: 12px;
        vertical-align: middle;
      }
      span{
        height: 20px;
        line-height: 20px;
        vertical-align: middle;
        cursor: pointer;
        color: #D1D1D1;
        &.active{
          color: #576578;
        }
      }
    }
</style>
