<template>
  <div id="smsVerification" class="smsVerification">
      <span class="smsTex">请输入验证短信：</span>
      <el-input class="smsInput" @keyup.enter.native="sendvCode" placeholder="请输入验证短信" v-model="input10"></el-input>
      <el-button class="smsButton" type="primary" @click="sendvCode">确 定</el-button>
      <el-button class="sendSms" type="primary" @click="setTime" :disabled="isSend">{{buttonText}}</el-button>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
    data() {
      return {
        input10: '',
        buttonText: '发送验证短信',
        isSend: false
      }
    },
    computed:{
        ...mapGetters([
            'userId',
            'vaildUserNum',
            'msgId',
            'vaildVcodeNum'
        ])
    },
    methods:{
        ...mapActions({
            vaildUser:'VaildUser',
            sendVcode:'SendVcode',
            vaildVcode:'VaildVcode'
        }),
        sendvCode(){
            var data ={};
            data['userId'] = this.userId;
            data['msgId'] = this.msgId;
            data['vCode'] = this.input10;
            this.vaildVcode(data).then(() => {
                if(this.vaildVcodeNum == 0){
                    location.href = process.env.BASE_API
                    // this.$router.go('/clue');
                }else{
                    this.$message('短信验证码错误，请重新输入！');
                }
            });
        },
        setTime(){
            var data ={};
            data['userId'] = this.userId;
            this.isSend = true;
            var countDown = 300;
            function setCountDown(obj){
                if(countDown == 0){
                    obj.isSend = false;
                    obj.buttonText = '发送验证短信';
                    return;
                }else{
                    obj.buttonText = "重新发送(" + countDown + ")";
                    countDown--;
                }
                setTimeout(function () {
                    setCountDown(obj)
                }, 1000)
            } 
            this.sendVcode(data).then(() => {
                setCountDown(this);
            });
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .smsVerification{
        width: 600px;margin: 0 auto;padding-top: 200px;
        .smsTex{
            vertical-align: middle;
        }
        .smsInput{
            display: inline-block;width: 200px;vertical-align: middle;
        }
        .smsButton{
            vertical-align: middle;margin-left: 10px;
        }
        .sendSms{
            vertical-align: middle;
        }
    }
</style>
