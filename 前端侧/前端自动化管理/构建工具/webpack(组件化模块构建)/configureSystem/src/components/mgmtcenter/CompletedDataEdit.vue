<template>
  <div id="checkorder">
    <div class="modbox">
      <div class="title">派工单信息</div>
      <ul class="col3ul mgb15 clearfix limit">
        <li>
          <p class="name">配置方案类型：</p>
          <div class="inpbox">{{baseInfo.deployType}}</div>
        </li>
        <li>
          <p class="name">收房合同号：</p>
          <div class="inpbox">{{baseInfo.contractNumber}}</div>
        </li>
        <li style="width: ">
          <p class="name">派工单号：</p>
          <div class="inpbox">{{baseInfo.allotNumber}}</div>
        </li>
        <li>
          <p class="name">订单管家：</p>
          <div class="inpbox">{{baseInfo.groupSteward}}</div>
        </li>
        <li>
          <p class="name">配置专员：</p>
          <div class="inpbox">{{baseInfo.groupAttache}}</div>
        </li>
        <li>
          <p class="name">物业地址：</p>
          <div class="inpbox">{{baseInfo.propertyAddress}}</div>
        </li>
      </ul>
      <div class="title">供应商及派单时间信息</div>
      <ul class="col3ul mgb15 clearfix limit">
        <li>
          <p class="name">供应商类型：</p>
          <div class="inpbox">{{baseInfo.providerType}}</div>
        </li>
        <li>
          <p class="name">供应商名称：</p>
          <div class="inpbox">{{baseInfo.providerName}}</div>
        </li>
        <li style="height:33px;"></li>
        <li>
          <p class="name">派单时间：</p>
          <div class="inpbox">{{baseInfo.sendDate | toTime}}</div>
        </li>
        <li>
          <p class="name">指定到达时间：</p>
          <div class="inpbox">{{baseInfo.allotDate | toTime00}}</div>
        </li>
        <li>
          <el-form :inline="true" :model="baseInfo" ref="actualTime" :rules="rules0" label-width="120px" label-position="left" size="medium" v-if="params.oper==='check' || params.oper==='edit'">
            <el-form-item label="实际到达时间：" prop="actualDate">
              <el-date-picker v-model="baseInfo.actualDate" type="datetime" format="yyyy-MM-dd HH:mm" :default-value="defaultDate" :editable="false" placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
          </el-form>
          <div v-else>
            <p class="name">实际到达时间：</p>
            <div class="inpbox">{{baseInfo.actualDate | toTime00}}</div>
          </div>
        </li>
      </ul>
      <div class="title">派工单明细</div>
      <div v-if="providerType != '家居' && providerType != '宽带'" class="tableBox mgtb15">
        <table class="modtable" width="100%" border="0" cellpadding="0" cellspacing="0">
          <tr>
            <th width="200">功能区间</th>
            <th width="200">物品分类</th>
            <th width="200">物品名称</th>
            <th width="150">单位</th>
            <th width="150">单价</th>
            <th width="150">派工数量</th>
            <th width="150" style="padding:0 15px;">实际数量</th>
            <th width="150">费用出处</th>
            <th width="150">操作</th>
          </tr>
          <tr v-for="(secondItem,secindex) in baseInfo.particularsVos" :key="secindex" :class="rowClass[secindex]">
            <td width="200" v-if="mergrRule[secindex]" :rowspan="mergrRule[secindex]" class="function-type">{{secondItem.functionType}}</td>
            <td width="200" v-if="secondItem.sortCanSelected">
              <el-select filterable size="small" v-model="secondItem.sortId" placeholder="请选择" @change="clearItem(secondItem)">
              <el-option v-for="sortOpt in [BLANK1, ...level2UsedTreeMap[l2SortId].children]" :key="sortOpt.id" :label="sortOpt.sortName" :value="sortOpt.id">
              </el-option>
            </el-select>
            </td>
            <td width="200" v-else>{{secondItem.sortName}}</td>
            <td width="200" v-if="secondItem.goodsCanSelected">
              <el-select filterable size="small" v-model="secondItem.goodsId" placeholder="请选择" @change="getGoodsDetail(secondItem.goodsId, secondItem)" @visible-change="getGoodsOptions(secondItem.sortId ,secondItem)">
              <el-option v-for="goodsOpt in goodsOptionsMap[secondItem.sortId]?[BLANK2, ...goodsOptionsMap[secondItem.sortId]]:[BLANK2]" :key="goodsOpt.pkId" :label="goodsOpt.goodsName" :value="goodsOpt.pkId">
              </el-option>
            </el-select>
            </td>
            <td v-else>{{secondItem.goodsName}}</td>
            <td width="150">{{secondItem.unit | blank}}</td>
            <td width="150">{{secondItem.unitPrice | blank}}</td>
            <td width="150">{{secondItem.number| blank}}</td>
            <td width="150" style="position: relative;" :class="{'error-number-item': rowValidator(secondItem,secindex,1)[1]}">
            <el-input v-model.number="secondItem.actualNum" placeholder="请输入"></el-input>
            <div class="error-number-tip">{{rowValidator(secondItem,secindex,1)[1]}}</div>
          </td>
            <td width="150" >
               <el-select filterable v-model="secondItem.priceSource" placeholder="请选择">
              <el-option v-for="(item, index) in costSourceOptions" :key="index" :value="item">
              </el-option>
               </el-select>
            </td>
            <td width="150" > 
              <p class="typeControl">
                <a class="z-btn" v-if="!secondItem.canbeDeleted && mergrRule[secindex]" @click="addRow(mergrRule[secindex],secindex, secondItem)">增加一行</a>
              <a class="z-btn" v-if="secondItem.canbeDeleted" @click="delRow(secindex, secondItem)">删行</a>
              </p>
            </td>
          </tr>
        </table>
      </div>

      <div v-if="providerType == '家居'" class="tableBox mgtb15">
        <table class="modtable" width="100%" border="0" cellpadding="0" cellspacing="0">
          <tr>
            <th width="200">功能区间</th>
            <th width="200">物品分类</th>
            <th width="200">物品名称</th>
            <th width="150">单位</th>
            <th width="150">单价</th>
            <th width="150">派工数量</th>
            <th width="150" style="padding:0 15px;">实际数量</th>
            <th width="150">预计高度</th>
            <th width="150" style="padding:0 15px;">实际高度</th>
            <th width="150">费用出处</th>
            <th width="150">操作</th>
          </tr>
          <tr v-for="(secondItem,secindex) in baseInfo.particularsVos" :key="secindex">
            <td width="200" v-if="mergrRule[secindex]" :rowspan="mergrRule[secindex]" class="function-type">{{secondItem.functionType}}</td>
            <td width="200" v-if="secondItem.sortCanSelected">
              <el-select filterable size="small" v-model="secondItem.sortId" placeholder="请选择" @change="clearItem(secondItem)">
              <el-option v-for="sortOpt in [BLANK1, ...level2UsedTreeMap[l2SortId].children]" :key="sortOpt.id" :label="sortOpt.sortName" :value="sortOpt.id">
              </el-option>
            </el-select>
            </td>
            <td width="200" v-else>{{secondItem.sortName}}</td>
            <td width="200" v-if="secondItem.goodsCanSelected">
              <el-select filterable size="small" v-model="secondItem.goodsId" placeholder="请选择" @change="getGoodsDetail(secondItem.goodsId, secondItem, l2SortId)" @visible-change="getGoodsOptions(secondItem.sortId ,secondItem)">
              <el-option v-for="goodsOpt in goodsOptionsMap[secondItem.sortId]?[BLANK2, ...goodsOptionsMap[secondItem.sortId]]:[BLANK2]" :key="goodsOpt.pkId" :label="goodsOpt.goodsName" :value="goodsOpt.pkId">
              </el-option>
            </el-select>
            </td>
            <td v-else>{{secondItem.goodsName}}</td>
            <td width="150">{{secondItem.unit| blank}}</td>
            <td width="150">{{secondItem.unitPrice| blank}}</td>
            <td width="150">{{secondItem.number| blank}}</td>
            <td width="150" style="position: relative;" :class="{'error-number-item': rowValidator(secondItem,secindex,1)[1]}">
            <el-input v-model.number="secondItem.actualNum" placeholder="请输入"></el-input>
            <div class="error-number-tip">{{rowValidator(secondItem,secindex,1)[1]}}</div>
          </td>
           
            <td width="150">{{secondItem.height}}</td>
            <td width="150" v-if="params.oper==='check' || params.oper==='edit'" style="padding:0 15px;"><input type="text" v-model.trim="secondItem.actualHeight" placeholder="请输入" class="inp" :class="{'error-inp': secondItem.actualHeight===''}" /></td>
            <td width="150" v-else>{{secondItem.actualHeight}}</td>
            <td width="150" >
               <el-select filterable v-model="secondItem.priceSource" placeholder="请选择">
              <el-option v-for="(item, index) in costSourceOptions" :key="index" :value="item">
              </el-option>
               </el-select>
            </td>
            <td width="150" > 
              <p class="typeControl">
                <a class="z-btn" v-if="!secondItem.canbeDeleted && mergrRule[secindex]" @click="addRow(mergrRule[secindex],secindex, secondItem)">增加一行</a>
                <a class="z-btn" v-if="secondItem.canbeDeleted" @click="delRow(secindex, secondItem)">删行</a>
              </p>
            </td>
          </tr>
        </table>
      </div>

      <div v-if="providerType == '宽带'" class="mgtb15">
        <div v-if="params.oper==='check' || params.oper==='edit'">
          <el-form :inline="true" :model="bandwidthInfo" ref="bandwidthInfo" :rules="rules1" class="item" label-width="110px" label-position="left" size="medium">
            <el-form-item label="宽带类型：" prop="bandwidthType">
              <el-select v-model="bandwidthInfo.bandwidthType" placeholder="请输入" @change="bandwidthTypeChange">
                <el-option v-for="item in bandwidthTypeOpt" :key="item.id" :label="item.sortName" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="宽带名称：" prop="bandwidthName">
              <el-select v-model="bandwidthInfo.bandwidthName" placeholder="请输入" @change="bandwidthNameChange">
                <el-option v-for="item in bandwidthNameOpt" :key="item.pkId" :label="item.goodsName" :value="item.pkId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="宽带供应商：" prop="bandwidthSupplier">
              <el-select v-model="bandwidthInfo.bandwidthSupplier" placeholder="请输入">
                <el-option v-for="item in bandwidthSupplierOpt" :key="item.proId" :label="item.proName" :value="item.proId">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="宽带是否如期安装：" label-width="150px" class="long-label" prop="isInstall">
              <el-select v-model="bandwidthInfo.isInstall" placeholder="请输入">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </el-form-item>

            <div class="hr"></div>
            <el-form-item label="费用状态：" prop="isType">
              <el-select v-model="bandwidthInfo.isType" @change="calcEndDate" placeholder="请输入">
                <el-option value="包年"></el-option>
                <el-option value="包半年"></el-option>
                <el-option value="包月"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="宽带起始日：" prop="startDate">
              <el-date-picker v-model="bandwidthInfo.startDate" @change="calcEndDate" type="date" :editable="false" :clearable="false" placeholder="请选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="宽带截止日：" prop="endDate">
              <el-date-picker v-model="bandwidthInfo.endDate" type="date" :editable="false" :clearable="false" placeholder="请选择日期" :disabled="true">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="宽带大小：" prop="bandwidthSize">
              <el-select v-model="bandwidthInfo.bandwidthSize" placeholder="请输入">
                <el-option value="100M"></el-option>
                <el-option value="50M"></el-option>
                <el-option value="30M"></el-option>
                <el-option value="20M"></el-option>
                <el-option value="10M"></el-option>
                <el-option value="5M"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="宽带账号：" prop="bandwidthAccount">
              <el-input v-model.trim="bandwidthInfo.bandwidthAccount" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="宽带密码：" prop="bandwidthPwd">
              <el-input v-model.trim="bandwidthInfo.bandwidthPwd" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="路由器账号：" prop="routerAccount">
              <el-input v-model.trim="bandwidthInfo.routerAccount" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="路由器密码：" prop="routerPwd">
              <el-input v-model.trim="bandwidthInfo.routerPwd" placeholder="请输入"></el-input>
            </el-form-item>

            <div class="hr"></div>
            <el-form-item label="宽带初装费：" prop="initialPrice">
              <el-input placeholder="请输入" v-model.number="bandwidthInfo.initialPrice" class="yuan">
              </el-input>
            </el-form-item>
            <el-form-item label="宽带费用：" prop="bandwidthPrice">
              <el-input placeholder="请输入" v-model.number="bandwidthInfo.bandwidthPrice" class="yuan">
              </el-input>
            </el-form-item>
            <el-form-item label="押金：" prop="pledge">
              <el-input placeholder="请输入" v-model.number="bandwidthInfo.pledge" class="yuan">
              </el-input>
            </el-form-item>
            <el-form-item label="费用合计：">
              <el-input placeholder="请输入" v-model.number="allPrice" class="yuan" disabled>
              </el-input>
            </el-form-item>

            <div class="hr"></div>
            <el-form-item label="供应商服务电话：" label-width="150px" class="long-label" prop="supplierPhone">
              <el-input v-model.trim="bandwidthInfo.supplierPhone" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="座机号码：" prop="telephone">
              <el-input v-model.trim="bandwidthInfo.telephone" placeholder="请输入"></el-input>
            </el-form-item>
            <div class="hr"></div>
            <el-form-item label="开户人姓名：">
              <el-input v-model.trim="bandwidthInfo.accountHolder" placeholder="请输入"></el-input>
            </el-form-item>
            <div class="clearfix">
              <p style="font-size: 14px;color:#48576a;padding:10px 0;">请上传身份证相片</p>
              <div style="float:left;margin-right:20px;">
                <el-upload :action="host+'/pic/upload?access_token='+token" :data="{photoType:4,photoSource:40,index:1}" list-type="picture-card" :on-success="handleUploadSuccess1" :on-error="handleUploadError" :show-file-list="false">
                  <img v-if="dialogImageUrl1" width="100%" :src="dialogImageUrl1" alt="">
                  <i v-else class="el-icon-plus"></i>
                </el-upload>
                <p style="text-align:center;">身份证
                  <strong style="color:red;">正面</strong>照片</p>
              </div>
              <div style="float:left;margin-right:20px;">
                <el-upload :action="host+'/pic/upload?access_token='+token" :data="{photoType:4,photoSource:41,index:1}" list-type="picture-card" :on-success="handleUploadSuccess2" :on-error="handleUploadError" :show-file-list="false">
                  <img v-if="dialogImageUrl2" width="100%" :src="dialogImageUrl2" alt="">
                  <i v-else class="el-icon-plus"></i>
                </el-upload>
                <p style="text-align:center;">身份证
                  <strong style="color:red;">反面</strong>照片</p>
              </div>
            </div>
          </el-form>
        </div>
        <bandwidth-form v-else :bandwidth-info="bandwidthInfo"></bandwidth-form>
      </div>

      <div class="title mgt15">供应商服务评价</div>
      <el-form :inline="true" :model="commentInfo" ref="commentInfo" :rules="rules2" class="item" label-width="70px" label-position="left" size="medium" v-if="params.oper==='check' || params.oper==='edit'">
        <el-form-item label="时效：" prop="date">
          <el-input v-model.number="commentInfo.date" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="质量：" prop="serviceQuality">
          <el-input v-model.number="commentInfo.serviceQuality" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="服务：" prop="content">
          <el-input v-model.number="commentInfo.content" placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
      <ul class="col4ul mgb15 clearfix" style="border-bottom:0;" v-else>
        <li>
          <p class="name">时效：</p>
          <div class="inpbox">{{commentInfo.date}}</div>
        </li>
        <li>
          <p class="name">质量：</p>
          <div class="inpbox">{{commentInfo.serviceQuality}}</div>
        </li>
        <li>
          <p class="name">服务：</p>
          <div class="inpbox">{{commentInfo.content}}</div>
        </li>
      </ul>
      <div class="title mgt15">超期信息:</div>
      <el-form v-if="params.oper==='check' || params.oper==='edit'" :model="baseInfo" ref="exceedInfo" :rules="rules3" class="item" label-width="100px" label-position="left" size="medium">
        <el-form-item label="超期天数：" prop="exceedDay">
          <el-input v-model.number="baseInfo.exceedDay" placeholder="请输入" class="days"></el-input>
        </el-form-item>
        <el-form-item label="超期原因：" prop="exceedContent" class="long-inp">
          <el-input type="textarea" v-model="baseInfo.exceedContent" :maxlength="500" width="700px"></el-input>
        </el-form-item>
      </el-form>
      <ul class="col3ul mgb15 clearfix" v-else>
        <li class="singlerow">
          <p class="name">超期天数：</p>
          <div class="inpbox">{{baseInfo.exceedDay}} 天</div>
        </li>
        <li class="singlerow">
          <p class="name">超期原因：</p>
          <p class="textbox" style="line-height:33px;margin-left: 110px;">{{baseInfo.exceedContent | blank}}</p>
        </li>
      </ul>

      <div class="btnbar">
        <input type="button" value="确认"  class="sureDbtn" @click="accept">
      </div>
    </div>

  </div>
</template>
<script type="text/javascript">
import { createNamespacedHelpers } from "vuex";
import uniq from "lodash/uniq";
import {
  getCheckOrders,
  getCheckedOrders,
  checkOrders,
  editOrders
} from "@/api/projectdelivery";
import { priceSource } from "@/components/public/options.config";

import { getSortGoods, getGoodsPrice, getGoodsById } from "@/api/basicdatamgmt";
import { getGoodsPriceDetail } from "@/api/projectplan";
import BandwidthForm from "../projectdelivery/bandwidthForm.vue";

const req = { required: true, message: "请输入", trigger: "blur,change" },
  dateReq = {
    type: "date",
    required: true,
    message: "请选择日期",
    trigger: "change"
  },
  len30 = { max: 30, message: "长度在 30 个字符以内", trigger: "blur" },
  len20 = { max: 20, message: "长度在 20 个字符以内", trigger: "blur" },
  numReq = { required: true, message: "请输入" },
  num = { type: "number", message: "请输入数字值" },
  num10000 = {
    type: "number",
    min: 0,
    max: 10000,
    message: "费用必须在 0-10000 之间"
  },
  num10 = {
    type: "number",
    min: 0,
    max: 10,
    message: "评价必须在 0-10 之间"
  };

const toNumber = n => (isNaN(n) ? 0 : Number(n));

const initBandwidthInfo = {
  isInstall: "1",
  bandwidthType: "",
  bandwidthName: "",
  bandwidthSupplier: "",
  startDate: "",
  endDate: "",
  bandwidthSize: "100M",
  isType: "",
  bandwidthAccount: "",
  bandwidthPwd: "",
  routerAccount: "",
  routerPwd: "",
  initialPrice: 0,
  bandwidthPrice: "",
  pledge: 0,
  allPrice: "",
  supplierPhone: "",
  telephone: "",
  accountHolder: ""
};
const initCommentInfo = {
  date: null,
  serviceQuality: null,
  content: null
};
const deleteMin = 1000 * 60 * 60;

const createRow = functionType => ({
  userCreate: "",
  gmtCreate: "",
  pkId: "",
  detailsId: "",
  functionType: functionType,
  sortId: "",
  goodsId: "",
  number: "",
  priceSource: "管家单倍业绩",
  height: null,
  startDate: null,
  endDate: null,
  actualNum: 1.0,
  key: "disposition",
  actualHeight: null,
  pid: null,
  price: "",
  sortName: "",
  goodsName: "",
  unit: "",
  unitPrice: "",
  maxNumber: "",
  parentName: null,
  canbeDeleted: true,
  sortCanSelected: true,
  goodsCanSelected: true
});
// 检查数据完整性
const checkIntegrity = ele =>
  ele.goodsId ||
  (ele.sortId &&
    ele.goodsId &&
    ele.key &&
    (ele.unitPrice || ele.unitPrice === 0) &&
    ele.unit &&
    !isNaN(ele.actualNum) &&
    ele.actualNum !== "" &&
    ele.actualNum !== null &&
    ele.actualNum !== undefined);

const numValidator = ele => {
  if (isNaN(ele.actualNum)) {
    return "请输入数字";
  } else {
    return "";
  }
};

const rowValidator = ele => {
  const _numValid = numValidator(ele);
  const _rowValid = _numValid || !checkIntegrity(ele);
  return [_rowValid, _numValid];
};
export default {
  name: "completedDataEdit",
  components: {
    "bandwidth-form": BandwidthForm
  },
  data() {
    return {
      params: {
        oper: "",
        id: ""
      },
      baseInfo: {
        actualDate: "" //实际到达时间
      },
      bandwidthInfo: { ...initBandwidthInfo },
      roomList: [],
      commentInfo: { ...initCommentInfo },
      rules0: {
        actualDate: [dateReq]
      },
      rules1: {
        bandwidthType: [req],
        isInstall: [req],
        bandwidthName: [req],
        bandwidthSupplier: [req],
        startDate: [dateReq],
        endDate: [dateReq],
        bandwidthSize: [req],
        isType: [req],
        bandwidthAccount: [req, len30],
        // bandwidthAccount: [
        //   { required: true, message: "请输入", trigger: "blur,change" }
        // ],
        bandwidthPwd: [req, len30],
        routerAccount: [req, len30],
        routerPwd: [req, len30],
        initialPrice: [numReq, num, num10000],
        bandwidthPrice: [numReq, num, num10000],
        pledge: [numReq, num, num10000],
        allPrice: [req],
        supplierPhone: [req, len20],
        telephone: [req, len20],
        accountHolder: [req, len20]
      },
      rules2: {
        date: [numReq, num, num10],
        serviceQuality: [numReq, num, num10],
        content: [numReq, num, num10]
      },
      rules3: {
        exceedDay: [numReq, num],
        exceedContent: [
          { max: 500, message: "长度在 500 个字符以内", trigger: "blur" }
        ]
      },
      // sendTime: {
      //   actualDate: '' //实际到达时间
      // },
      defaultDate: parseInt(new Date().getTime() / deleteMin) * deleteMin,
      dialogImageUrl1: "", //相片地址
      dialogImageUrl2: "", //相片地址
      bandwidthNameOpt: [],
      bandwidthSupplierOpt: [],
      costSourceOptions: priceSource,
      BLANK1: { sortName: "请选择", id: "" },
      BLANK2: { goodsName: "请选择", pkId: "" },
      goodsDetailMap: {},
      goodsOptionsMap: {},
      goodsOptionsMapFlag: {},
      isOperRow: false,
      validateRow1: [],
      validateRow2: [],
      providerId: "",
      l2SortId: ""
    };
  },
  computed: {
    usedTree() {
      this.$store.getters.usedTree;
    },
    level2UsedTreeMap() {
      let _map = {};
      this.$store.getters.level2UsedTree.map(ele => {
        _map[ele.id] = ele;
      });
      return _map;
    },
    bandwidthTypeOpt() {
      const level1 = this.$store.getters.usedTree;
      for (let i = 0, len1 = level1.length; i < len1; i++) {
        if (level1[i].sortName === "服务") {
          const level2 = level1[i].children;
          for (let j = 0, len1 = level1.length; j < len1; j++) {
            if (level2[j].sortName === "宽带") {
              return level2[j].children;
            }
          }
        }
      }
      return [];
    },
    providerType() {
      return this.baseInfo.providerType;
    },
    allPrice() {
      return (
        toNumber(this.bandwidthInfo.initialPrice) +
        toNumber(this.bandwidthInfo.bandwidthPrice) +
        toNumber(this.bandwidthInfo.pledge)
      );
    },
    // 合并规则
    mergrRule() {
      const roomList = this.roomList;
      let _map = roomList.map(e => -1);
      let result = [];
      this.baseInfo.particularsVos &&
        this.baseInfo.particularsVos.map((d, index) => {
          let i = roomList.indexOf(d.functionType);
          if (_map[i] === -1) {
            _map[i] = index;
            result[index] = 1;
          } else {
            result[_map[i]]++;
            result[index] = 0;
          }
        });
      return result;
    },
    rowClass() {
      const splitClass = "split-class";
      let flag = 1;

      return this.mergrRule.map(ele => {
        if (ele !== 0) {
          flag = flag === 0 ? 1 : 0;
        }
        return splitClass + flag;
      });
    }
  },
  methods: {
    bandwidthTypeChange(typeId) {
      this.bandwidthInfo.bandwidthName = "";
      this.bandwidthInfo.bandwidthSupplier = "";
      this.bandwidthNameOpt = [];
      this.bandwidthSupplierOpt = [];
      getSortGoods(
        {
          items: {
            classifyId: typeId,
            maxNumber: 3
          },
          limit: 999,
          pageNum: 1
        },
        data => {
          this.bandwidthNameOpt = data.items;
        }
      );
    },
    // {params.state}/goods?id=${params.id}&limit=${params.pageSize}&pageNum=${params.curr
    bandwidthNameChange(nameId) {
      this.bandwidthInfo.bandwidthSupplier = "";
      this.bandwidthSupplierOpt = [];
      getGoodsPrice(
        {
          state: "open",
          id: nameId,
          pageSize: 999,
          curr: 1
        },
        data => {
          this.bandwidthSupplierOpt = data.items;
        }
      );
    },
    calcEndDate() {
      if (!(this.bandwidthInfo.startDate && this.bandwidthInfo.isType)) {
        this.bandwidthInfo.endDate = null;
        return;
      }
      let monthAdd = 0;
      switch (this.bandwidthInfo.isType) {
        case "包年":
          monthAdd = 12;
          break;
        case "包半年":
          monthAdd = 6;
          break;
        case "包月":
          monthAdd = 1;
          break;
        default:
          monthAdd = 0;
          break;
      }
      const _startDate = new Date(this.bandwidthInfo.startDate);
      const oldMonth = _startDate.getMonth();
      let result =
        _startDate.setMonth(oldMonth + monthAdd) - 24 * 60 * 60 * 1000;
      this.bandwidthInfo.endDate = new Date(result);
    },
    getRoomList(detailList) {
      let _roomList = detailList.map(e => e.functionType);
      return uniq(_roomList, true);
    },
    sortList(obj, key) {
      const _list = this.getRoomList(obj[key]);
      this.roomList = _list;

      const fn = (a, b) =>
        _list.indexOf(a.functionType) - _list.indexOf(b.functionType);
      let c = JSON.parse(JSON.stringify(obj[key]));
      c.sort(fn);

      obj[key] = c;
    },
    //初始化
    getInfo(pkId) {
      if (this.params.oper === "check") {
        this.getCheckOrdersInfo(pkId);
      } else {
        this.getCheckedOrdersInfo(pkId);
      }
    },
    getCheckOrdersInfo(pkId) {
      getCheckOrders(pkId, data => {
        this.sortList(data, "particularsVos");
        data.particularsVos.forEach(ele => {
          ele.actualNum = ele.number;
          ele.actualHeight = ele.height;
        });
        this.baseInfo = data;
        this.baseInfo.actualDate = parseInt(this.baseInfo.actualDate) || null;
        this.clearFields();
      });
    },
    getCheckedOrdersInfo(pkId) {
      getCheckedOrders(pkId, data => {
        this.sortList(data, "particularsVos");
        this.providerId = data.providerId;
        this.l2SortId = data.sortId;
        const timeStamp = parseInt(data.actualDate);
        data.actualDate = timeStamp ? new Date(timeStamp) : new Date();
        this.baseInfo = data;
        ["content", "date", "serviceQuality"].forEach(_key => {
          data.commentInfo[_key] = parseInt(data.commentInfo[_key]);
        });
        this.commentInfo = data.commentInfo;

        data.bandwidthVo.startDate = new Date(data.bandwidthVo.startDate * 1);
        data.bandwidthVo.endDate = new Date(data.bandwidthVo.endDate * 1);
        this.bandwidthInfo = data.bandwidthVo;
        this.clearFields();
        if (this.params.oper === "edit") {
          this.bandwidthInfo.isInstall = data.bandwidthVo.isInstall + "";
          this.loadBandwidthOptions(
            data.bandwidthVo.bandwidthType,
            data.bandwidthVo.bandwidthName
          );
        }
      });
    },
    loadBandwidthOptions(typeId, nameId) {
      getSortGoods(
        {
          items: {
            classifyId: typeId,
            maxNumber: 3
          },
          limit: 999,
          pageNum: 1
        },
        data => {
          this.bandwidthNameOpt = data.items;
        }
      );
      getGoodsPrice(
        {
          state: "open",
          id: nameId,
          pageSize: 999,
          curr: 1
        },
        data => {
          this.bandwidthSupplierOpt = data.items;
        }
      );
    },
    handleUploadError() {
      this.$message.error("图片上传失败");
    },
    handleUploadSuccess1(res, file) {
      if (res.code != 200) {
        this.handleUploadError();
      } else {
        this.dialogImageUrl1 = res.data.url;
      }
    },
    handleUploadSuccess2(res, file) {
      if (res.code != 200) {
        this.handleUploadError();
      } else {
        this.dialogImageUrl2 = res.data.url;
      }
    },
    validateForm(formName, cb) {
      if (formName === "mainInfo") {
        const err = document.querySelector(".tableBox .error-inp");
        if (err) {
          this.$message.error("请完成表单");
          return false;
        } else {
          typeof cb === "function" && cb();
        }
        return;
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          typeof cb === "function" && cb();
        } else {
          this.$message.error("请完成表单");
          return false;
        }
      });
    },
    validate(cb) {
      const mainInfo =
        this.providerType == "宽带" ? "bandwidthInfo" : "mainInfo";
      this.validateForm("actualTime", () => {
        this.validateForm(mainInfo, () => {
          this.validateForm("commentInfo", () => {
            this.validateForm("exceedInfo", () => {
              if (this.baseInfo.exceedDay > 0) {
                if (!this.baseInfo.exceedContent) {
                  return this.$message.warning("请输入超期原因");
                }
              }
              typeof cb === "function" && cb();
            });
          });
        });
      });
    },
    getFormData() {
      this.baseInfo.particularsVos = this.baseInfo.particularsVos.filter(
        checkIntegrity
      );
      let d = Object.assign(
        {},
        this.baseInfo,
        this.exceedInfo,
        { commentInfo: this.commentInfo },
        { actualDate: this.baseInfo.actualDate.getTime() + "" }
      );
      if (this.providerType === "宽带") {
        d = Object.assign({}, d, { bandwidthVo: { ...this.bandwidthInfo } });
        d.bandwidthVo = Object.assign({}, d.bandwidthVo, {
          allPrice: this.allPrice,
          startDate: this.bandwidthInfo.startDate.getTime() + "",
          endDate: this.bandwidthInfo.endDate.getTime() + "",
          propertyId: this.dialogImageUrl1 + ";" + this.dialogImageUrl2
        });
      }
      return d;
    },
    accept() {
      let loading;
      this.validate(() => {
        var _msg = ["确认保存?", "保存成功", "保存失败", "已取消"];
        this.$confirm(_msg[0], "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
              loading=this.$loading({ fullscreen: true, text: '提交中' });
            editOrders(
              this.getFormData(),
              () => {
                loading.close();
                this.$message.success(_msg[1]);
                this.$store.dispatch("itemArrRemove", {
                  id: this.$route.name,
                  to: {
                    id: "completedDataManage",
                    name: "竣工数据管理",
                    params: { updateId: new Date().getTime() }
                  }
                });
              },
              () => this.$message.error(_msg[2])
            )
            .finally(_ => loading && loading.close())
          })
          .catch(e => {
            this.$message.info(_msg[3]);
          });
      });
    },
    clearFields() {
      this.$refs["actualTime"] && this.$refs["actualTime"].resetFields();
      this.$refs["bandwidthInfo"] && this.$refs["bandwidthInfo"].resetFields();
      this.$refs["commentInfo"] && this.$refs["commentInfo"].resetFields();
      this.$refs["exceedInfo"] && this.$refs["exceedInfo"].resetFields();
    },
    initPage() {
      this.params = { oper: "", id: "" };
      this.baseInfo = {};
      this.bandwidthInfo = { ...initBandwidthInfo };
      this.roomList = [];
      this.commentInfo = { ...initCommentInfo };
      this.clearFields();
    },
    delRow(index, { functionType, goodsId }) {
      this.baseInfo.particularsVos.splice(index, 1);
    },
    addRow(lenght, index, { functionType, goodsId }) {
      this.isOperRow = true;
      const newRow = createRow(functionType);
      const insertIndex = index + lenght;
      this.baseInfo.particularsVos.splice(insertIndex, 0, newRow);
      this.$nextTick(function() {
        this.isOperRow = false;
      });
    },
    getGoodsOptions(classifyId, item) {
      // 没有Id（置空）
      if (!classifyId) return;
      if (!this.goodsOptionsMapFlag[classifyId]) {
        return getSortGoods(
          {
            items: {
              classifyId: classifyId,
              maxNumber: 3
            },
            limit: 999,
            pageNum: 1
          },
          data => {
            const opt = data.items
              ? data.items.filter(
                  e =>
                    e.goodsIsUse === 1 && e.isExpired === 0 && e.proType === 0
                )
              : [];
            this.$set(this.goodsOptionsMapFlag, classifyId, true);
            this.$set(this.goodsOptionsMap, classifyId, opt);
          }
        );
      }
    },
    clearItem(item) {
      // 物品分类改变时清空物品信息
      this.$set(item, "goodsId", "");
      this.$set(item, "unit", "");
      this.$set(item, "unitPrice", "");
    },
    // 检查是否有重复物品
    checkRepeat(item) {
      if (item.goodsId == "") {
        return;
      }
      const c = this.baseInfo.particularsVos;
      const l = c.filter(
        e => e.functionType === item.functionType && e.goodsId === item.goodsId
      );
      if (l.length > 1) {
        this.$message.error("同一功能区间不能选择相同物品！");
        return true;
      } else {
        return false;
      }
    },
    getGoodsDetail(index, item) {
      this.$set(item, "unit", "");
      this.$set(item, "unitPrice", "");

      if (this.checkRepeat(item)) {
        return (item.goodsId = "");
      }
      const goodsId = item.goodsId;
      if (!goodsId) {
        return;
      }

      const goodDetailsObj = this.goodsOptionsMap[item.sortId].find(
        item => item.pkId === goodsId
      );
      this.$set(item, "unit", goodDetailsObj.goodsUnit);

      if (!this.goodsDetailMap[goodsId]) {
        this.$set(this.goodsDetailMap, goodsId, {});
        getGoodsPriceDetail(goodsId, this.providerId, data => {
          item.unitPrice = data.cost;
          if (!data.cost && data.cost !== 0) {
            this.$message.warning("该物品没有价格");
          }
          this.$set(this.goodsDetailMap[goodsId], "unitPrice", data.cost);
        });
      } else {
        const data = this.goodsDetailMap[goodsId];
        item.unitPrice = data.unitPrice;
      }
    },
    rowValidator(row, index, type) {
      const v = rowValidator(row);
      this.$nextTick(function() {
        this["validateRow" + type][index] = v;
      });
      return v;
    }
  },
  created() {
    this.$store.dispatch("getAllCategory");
  },
  activated() {
    const { id, oper } = this.$route.params;
    if (this.params.id === id && this.params.oper === oper) {
      return;
    }

    this.initPage();
    this.params = { ...this.$route.params };
    this.getInfo(id);
  }
};
</script>


<style scoped>
.modbox > ul {
  padding-bottom: 15px;
}
.modbox > ul.limit > li:nth-child(3n + 1),
.modbox > ul.limit > li:nth-child(3n + 2) {
  max-width: 400px;
}

.modbox ul.short li .name {
  width: 40px;
}
.modbox ul.short li > div {
  margin-left: 50px;
}
.item {
  padding: 15px;
}
.item .hr {
  height: 1px;
  width: 100%;
  background-color: #f1f1f1;
  margin-top: 10px;
  margin-bottom: 32px;
}
.item .el-form-item {
  width: 340px;
}

.item .el-form-item > div {
  width: 202px;
}
.yuan:after {
  position: absolute;
  top: 0;
  right: 10px;
  content: "元";
}
.days:after {
  position: absolute;
  top: 0;
  right: 10px;
  content: "天";
}
table > tr > td.function-type {
  border-right: 1px solid #f1f1f1;
}
.modbox ul.col3ul li .name {
  width: 100px;
}

.modtable .typeControl {
  text-align: center;
}
.error-number-tip {
  display: none;
  color: #ff4949;
  font-size: 12px;
  line-height: 1;
  padding-top: 4px;
  position: absolute;
  top: 33px;
  left: 27px;
  z-index: 1;
}
.error-number-item input,
.error-number-item input:hover,
.error-number-item input:focus {
  border-color: #ff4949;
}
.error-number-item .error-number-tip {
  display: block;
}
</style>
