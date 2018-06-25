<template>
    <div class="clueDetail">
        <div class="clueInfo infoBox">
            <div class="title">
	          	  <h3>线索信息</h3>
            </div>
            <ul class="ulInfoBox clearfix">
                <li>
                    <p class="name">姓名：</p>
                    <div class="inpbox">
                        <span v-text="offcialRenterBespeakVO.renterName?offcialRenterBespeakVO.renterName:'--'"></span>
                    </div>
                </li>
                <li>
                    <p class="name">性别：</p>
                    <div class="inpbox">
                        <span v-show="offcialRenterBespeakVO.gender == 1">男</span>
                        <span v-show="offcialRenterBespeakVO.gender == 0">女</span>
                    </div>
                </li>
                <li>
                    <p class="name">手机号码：</p>
                    <div class="inpbox">
                        <span v-text="offcialRenterBespeakVO.contactTel?offcialRenterBespeakVO.contactTel:'--'"></span>
                    </div>
                </li>
                <li>
                    <p class="name"></p>
                    <div class="inpbox"></div>
                </li>
                <li>
                    <p class="name">客户类型：</p>
                    <div class="inpbox">
                        <span v-text="offcialRenterBespeakVO.customerType?offcialRenterBespeakVO.customerType:'--'"></span>
                    </div>
                </li>
                <li>
                    <p class="name">入住人数：</p>
                    <div class="inpbox">
                        <span v-text="offcialRenterBespeakVO.residentsNum?offcialRenterBespeakVO.residentsNum:'--'"></span>
                    </div>
                </li>
                <li>
                    <p class="name">区域商圈：</p>
                    <div class="inpbox">
                        <span v-text="offcialRenterBespeakVO.premisesTradingName?offcialRenterBespeakVO.premisesTradingName:'--'"></span>
                    </div>
                </li>
                <li>
                    <p class="name"></p>
                    <div class="inpbox"></div>
                </li>
                <li>
                    <p class="name">租房预算：</p>
                    <div class="inpbox">
                        <span v-text="renterEducationInformation1.budget?renterEducationInformation1.budget:'--'"></span>
                    </div>
                </li>
                <li>
                    <p class="name">入住时间：</p>
                    <div class="inpbox">
                        <span>--</span>
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
                    <p class="name">意向楼盘：</p>
                    <div class="inpbox">
                        <span v-text="offcialRenterBespeakVO.premisesName?offcialRenterBespeakVO.premisesName:'--'"></span>
                    </div>
                </li>
                <li>
                    <p class="name">信息来源：</p>
                    <div class="inpbox">
                        <span v-text="offcialRenterBespeakVO.source?offcialRenterBespeakVO.source:'--'"></span>
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
                    <p class="name">备注描述：</p>
                    <div class="inpbox">
                        <span v-text="offcialRenterBespeakVO.demandDescribe?offcialRenterBespeakVO.demandDescribe:'--'"></span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="educationInfo infoBox" style="margin-top: 20px;">
            <div class="title">
	          	  <h3>学历信息</h3>
            </div>
            <ul class="ulInfoBox clearfix">
                <li>
                    <p class="name">学历：</p>
                    <div class="inpbox">
                        <span v-show="renterEducationInformation1.education == 0">--</span>
                        <span v-show="renterEducationInformation1.education == 1">专科</span>
                        <span v-show="renterEducationInformation1.education == 2">成人</span>
                        <span v-show="renterEducationInformation1.education == 3">本科</span>
                        <span v-show="renterEducationInformation1.education == 4">硕士研究生</span>
                        <span v-show="renterEducationInformation1.education == 5">博士研究生</span>
                    </div>
                </li>
                <li>
                    <p class="name">入学年份：</p>
                    <div class="inpbox">
                        <span v-text="renterEducationInformation1.enrollmentYear?renterEducationInformation1.enrollmentYear:'--'"></span> 年
                    </div>
                </li>
                <li>
                    <p class="name">毕业年份：</p>
                    <div class="inpbox">
                        <span v-text="renterEducationInformation1.graduationYear?renterEducationInformation1.graduationYear:'--'"></span> 年
                    </div>
                </li>
                <li>
                    <p class="name"></p>
                    <div class="inpbox"></div>
                </li>
                <li>
                    <p class="name">就读学校：</p>
                    <div class="inpbox">
                        <span v-text="renterEducationInformation1.school?renterEducationInformation1.school:'--'"></span>
                    </div>
                </li>
                <li>
                    <p class="name">教育类型：</p>
                    <div class="inpbox">
                        <span v-text="renterEducationInformation1.educationType?renterEducationInformation1.educationType:'--'"></span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="fallowInfo infoBox" style="margin-top: 20px;">
            <div class="title">
	          	  <h3>跟进记录</h3>
            </div>
            <ul class="ulInfoBox clearfix">
                <li>
                    <p class="name">跟进状态：</p>
                    <div class="inpbox">
                        <span v-show ="offcialRenterBespeakVO.bespeakType == 0">未跟进</span>
                        <span v-show ="offcialRenterBespeakVO.bespeakType == 1">去电</span>
                        <span v-show ="offcialRenterBespeakVO.bespeakType == 2">带看</span>
                        <span v-show ="offcialRenterBespeakVO.bespeakType == 3">结束</span>
                        <span v-show ="offcialRenterBespeakVO.bespeakType == 4">签约</span>
                    </div>
                </li>
                <li>
                    <p class="name">管家：</p>
                    <div class="inpbox">
                        <span v-text="offcialRenterBespeakVO.userModified?offcialRenterBespeakVO.userModified:'--'"></span>
                    </div>
                </li>
                <li>
                    <p class="name">是否超时：</p>
                    <div class="inpbox">
                        <span v-show="offcialRenterBespeakVO.remark == 0">未超时</span>
                        <span v-show="offcialRenterBespeakVO.remark == 1">即将超时</span>
                        <span v-show="offcialRenterBespeakVO.remark == 2">已超时</span>
                    </div>
                </li>
                <li>
                    <p class="name"></p>
                    <div class="inpbox"></div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    data() {
        return{
            // offcialRenterBespeakVO: {
            //     renterName: '卡韩'
            // },
            // renterEducationInformation1: {
            //     education: 1
            // },
            // renterName: '卡韩'
        }
    },
    computed: {
      ...mapGetters([
        'offcialRenterBespeakVO',
        'renterEducationInformation1'
      ])
    },
    methods: {
        ...mapActions({
        renterBespeak:'RenterBespeak'
      }),
    },
    beforeMount:function() {
        this.renterBespeak({
            "id": this.$route.params.id
        })
    }
  
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .clueDetail{
        background: #fff;
        height: 100%;
        .infoBox{
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

</style>

