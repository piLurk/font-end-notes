<template>
  <div class="mgtb15">
    <ul class="col4ul mgb15 clearfix">
      <li>
        <p class="name">宽带类型：</p>
        <div class="inpbox">{{bandwidthInfo.typeName}}</div>
      </li>
      <li>
        <p class="name">宽带名称：</p>
        <div class="inpbox">{{bandwidthInfo.name}}</div>
      </li>
      <li>
        <p class="name">宽带供应商：</p>
        <div class="inpbox">{{bandwidthInfo.supplierName}}</div>
      </li>
      <li class="longli">
        <p class="name">宽带是否如期安装：</p>
        <div class="inpbox">{{bandwidthInfo.isInstall | ifOrNot}}</div>
      </li>
    </ul>
    <ul class="col4ul mgb15 clearfix">
      <li id="startDateValueItem">
        <p class="name">宽带起始日：</p>
        <div class="inpbox">{{bandwidthInfo.startDate | toDate}}</div>
      </li>
      <li id="endDateValueItem">
        <p class="name">宽带截止日：</p>
        <div class="inpbox"> {{bandwidthInfo.endDate | toDate}}</div>
      </li>
      <li>
        <p class="name">宽带大小：</p>
        <div class="inpbox">{{bandwidthInfo.bandwidthSize}}</div>
      </li>
      <li>
        <p class="name">费用状态：</p>
        <div class="inpbox">{{bandwidthInfo.isType}}</div>
      </li>
      <li>
        <p class="name">宽带账号：</p>
        <div class="inpbox">{{bandwidthInfo.bandwidthAccount}}</div>
      </li>
      <li>
        <p class="name">宽带密码：</p>
        <div class="inpbox">{{bandwidthInfo.bandwidthPwd}}</div>
      </li>
      <li>
        <p class="name">路由器账号：</p>
        <div class="inpbox">{{bandwidthInfo.routerAccount}}</div>
      </li>
      <li>
        <p class="name">路由器密码：</p>
        <div class="inpbox">{{bandwidthInfo.routerPwd}}</div>
      </li>
    </ul>
    <ul class="col4ul mgb15 clearfix">
      <li>
        <p class="name">宽带初装费：</p>
        <div class="inpbox hasunit">{{bandwidthInfo.initialPrice}} 元</div>
      </li>
      <li>
        <p class="name">宽带费用：</p>
        <div class="inpbox hasunit">{{bandwidthInfo.bandwidthPrice}} 元</div>
      </li>
      <li>
        <p class="name">押金：</p>
        <div class="inpbox hasunit">{{bandwidthInfo.pledge}} 元</div>
      </li>
      <li>
        <p class="name">费用合计：</p>
        <div class="inpbox hasunit">{{bandwidthInfo.allPrice}} 元</div>
      </li>
    </ul>
    <ul class="col4ul mgb15 clearfix">
      <li class="longli">
        <p class="name">供应商服务电话：</p>
        <div class="inpbox">{{bandwidthInfo.supplierPhone}}</div>
      </li>
      <li>
        <p class="name">座机号码：</p>
        <div class="inpbox">{{bandwidthInfo.telephone}}</div>
      </li>
    </ul>
    <ul class="col4ul mgb15 clearfix">
      <li>
        <p class="name">开户人姓名：</p>
        <div class="inpbox">{{bandwidthInfo.accountHolder | blank}}</div>
      </li>
    </ul>
    <div class="clearfix">
      <h4 class="id-card-title">身份证相片</h4>

      <div class="id-card">
        <img :src="imgUrl[0]" alt="" @click="showImg('身份证正面照片' ,imgUrl[0])">
        <p style="text-align:center;">身份证
          <strong style="color:red;">正面</strong>照片</p>
      </div>
      <div class="id-card">
        <img :src="imgUrl[1]" alt="" @click="showImg('身份证反面照片' ,imgUrl[1])">
        <p style="text-align:center;">身份证
          <strong style="color:red;">反面</strong>照片</p>
      </div>
      <el-dialog :title="showImgTitle" :visible="showImgVisible" :before-close="handleClose">
        <img width="100%" :src="showImgUrl" :alt="showImgTitle">
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose">关 闭</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>


<script type="text/javascript">
export default {
  name:'bandwidthForm',
  props: ['bandwidthInfo'],
  data() {
    return {
      showImgVisible: false,
      showImgUrl: '',
      showImgTitle: ''
    }
  },
  computed: {
    imgUrl() {
      const urls = this.bandwidthInfo.propertyId
      return urls ? urls.split(';') : ['', '']
    }
  },
  methods: {
    showImg(title, url) {
      this.showImgVisible = true
      this.showImgTitle = title
      this.showImgUrl = url
    },
    handleClose() {
      this.showImgVisible = false
    }
  }
}
</script>

<style scoped>
.id-card-title{
  padding: 20px;
}
.id-card {
  float: left;
  margin-right: 20px;
  width: 400px;
  max-height: 400px;
  text-align: center;
}
.id-card img {
  cursor: pointer;
  height: 200px;
}
</style>
