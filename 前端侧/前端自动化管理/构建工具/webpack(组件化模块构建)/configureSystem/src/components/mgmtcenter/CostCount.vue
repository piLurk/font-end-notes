<template>
	<div id="orderQuery" class="component-box">
		<div class="orderQuery-content">
        <div class="form-box">
          <div class="inp-item">
            <p>订单类型：</p>
            <div class="inp-box">
              <el-select v-model="form.orderType" placeholder="请选择">
                <el-option v-for="(item,key) in orderTypes"  :label="item.label" :value="item.value" :key="key"></el-option>
              </el-select>
            </div>
          </div><div class="inp-item">
            <p>合同编号：</p>
            <div class="inp-box">
						  <input @keydown.enter="keydownSearch" type="text" v-model.trim="form.contractNumber" placeholder="请输入">
					  </div>
          </div><div class="inp-item">
            <p>房源编号：</p>
            <div class="inp-box">
              <input @keydown.enter="keydownSearch" type="text" v-model.trim="form.baseNumber" placeholder="请输入">
            </div>
          </div><div class="inp-item timeLong titLong">
            <p>竣工验收日期：</p>
            <div class="inp-box">
              <el-date-picker :picker-options="timeStart" v-model="form.standardDate.start" type="date" placeholder="选择日期"></el-date-picker>
              -
              <el-date-picker :picker-options="timeEnd" v-model="form.standardDate.end" type="date" placeholder="选择日期"></el-date-picker>
            </div>
          </div>
          <div class="top-btnwrap">
            <button @click="orderQuery" class="btn btn-primary">查询</button>
            <button v-if="false" @click="reset" class="btn btn-reset">重置</button>
            <a :disabled="totalNum === 0" :href="uploadExcelUrl" class="excel_out btn btn-success f_r">导出Excel</a>
          </div>
        </div>
        <div class="dataBox tableLoading costCountLoading">
          <div class="toolBar clearfix">
            <my-pagination :total="totalNum" :curr="pagination.curr" :pageChange="pageGo"></my-pagination>
          </div>
          <div class="tableBox">
            <table v-if="formQuery.orderType === 0" class="modtable supplierTable">
              <thead>
                <tr>
                  <th>收房产品</th>
                  <th class="short">打分</th>
                  <th class="long1">房源编号</th>
                  <th class="long">收房合同号</th>
                  <th class="long1">物业地址</th>
                  <th>收房管家</th>
                  <th>收房区经</th>
                  <th>收房总监</th>
                  <th class="long">新收配置组长</th>
                  <th class="long">新收配置专员</th>
                  <th>副总</th>
                  <th class="long">优化后房间数</th>
                  <th class="long">房源建筑面积</th>
                  <th>起租日期</th>
                  <th>量房日期</th>
                  <th>竣工验收</th>
                  <th>家电费用</th>
                  <th>家具费用</th>
                  <th>家居费用</th>
                  <th>门锁费用</th>
                  <th>宽带费用</th>
                  <th>保洁费用</th>
                  <th>装修费用</th>
                  <th>总成本</th>
                  <th>配置成本</th>
                  <th>家电供应商</th>
                  <th>家具供应商</th>
                  <th>家居供应商</th>
                  <th>门锁供应商</th>
                  <th>宽带供应商</th>
                  <th>保洁供应商</th>
                  <th>装修供应商</th>
                  <th>量房周期</th>
                  <th>配置周期</th>
                  <th>标准工期</th>
                  <th>超期天数</th>
                  <th>补充工期</th>
                  <th>标准周期差</th>
                  <th>补业绩天数</th>
                  <th>家电延期</th>
                  <th>家具延期</th>
                  <th>家居延期</th>
                  <th>门锁延期</th>
                  <th>宽带延期</th>
                  <th>保洁延期</th>
                  <th>装修延期</th>
                  <th class="long">物业超期天数</th>
                  <th>管家原因</th>
                  <th class="long">遗留物品没搬走</th>
                  <th class="long">配置专员原因</th>
                  <th>系统原因</th>
                  <th>供应商原因</th>
                </tr>
              </thead>
              <tbody>
                <no-data :visible="totalNum"></no-data>
                <tr v-for="(item,k) in dataList" :key="k" :class="{isInvalidOrder:item.orderState === -1}"> 
                  <td>{{item.houseTypeName | blank}}</td>
                  <td>{{item.score | blank}}</td>
                  <td>{{item.propertyNumber | blank}}</td>   
                  <td>{{item.contractNumber | blank}}</td>
                  <td>{{item.address | blank}}</td>
                  <td>{{item.groupSteward | blank}}</td>
                  <td>{{item.groupArea | blank}}</td>
                  <td>{{item.groupMajordomo | blank}}</td>
                  <td>{{item.groupGroup | blank}}</td>
                  <td>{{item.groupAttache | blank}}</td>
                  <td>{{item.deputyGeneral | blank}}</td>
                  <td>{{item.roomNum | blank}}</td>
                  <td>{{item.buildArea | blank}}</td>
                  <td>{{item.rentStartDate | blank}}</td>
                  <td>{{item.houseReserveDate | blank}}</td>
                  <td>{{item.completeDate | blank}}</td>
                  <td>{{item.elecEquipmentCost | blank}}</td>
                  <td>{{item.furnitureCost | blank}}</td>
                  <td>{{item.furnishingCost | blank}}</td>
                  <td>{{item.lockCost | blank}}</td>
                  <td>{{item.bandWidthCost | blank}}</td>
                  <td>{{item.cleanCost | blank}}</td>
                  <td>{{item.decorationCost | blank}}</td>
                  <td>{{item.totalCost | blank}}</td>
                  <td>{{item.configCost | blank}}</td>
                  <td>{{item.elecEquipmentProvider | blank}}</td>
                  <td>{{item.furnitureProvider | blank}}</td>
                  <td>{{item.furnishingProvider | blank}}</td>
                  <td>{{item.lockProvider | blank}}</td>
                  <td>{{item.bandWidthProvider | blank}}</td>
                  <td>{{item.cleanProvider | blank}}</td>
                  <td>{{item.decorationProvider | blank}}</td>
                  <td>{{item.reservePeriod | blank}}</td>
                  <td>{{item.configPeriod | blank}}</td>
                  <td>{{item.standardWorkPeriod | blank}}</td>
                  <td>{{item.exceedDay | blank}}</td>
                  <td>{{item.supplementPeriod | blank}}</td>
                  <td>{{item.standardDeviation | blank}}</td>
                  <td>{{item.supplementDay | blank}}</td>
                  <td>{{item.elecEquipmentDelay | blank}}</td>
                  <td>{{item.furnitureDelay | blank}}</td>
                  <td>{{item.furnishingDelay | blank}}</td>
                  <td>{{item.lockDelay | blank}}</td>
                  <td>{{item.bandWidthDelay | blank}}</td>
                  <td>{{item.cleanDelay | blank}}</td>
                  <td>{{item.decorationDelay | blank}}</td>
                  <td>{{item.propertyDay | blank}}</td>
                  <td>{{item.stewardDay | blank}}</td>
                  <td>{{item.goodsDay | blank}}</td>
                  <td>{{item.groupAttacheDay | blank}}</td>
                  <td>{{item.systemDay | blank}}</td>
                  <td>{{item.providerDay | blank}}</td>                 
                </tr>
              </tbody>
            </table>
            <table v-else-if="formQuery.orderType === 1" class="modtable supplierTable">
              <thead>
                <tr>
                  <th class="long1">订单编号</th>
                  <th class="long1">房源编号</th>
                  <th class="long">收房合同号</th>
                  <th class="long1">物业地址</th>
                  <th>所属管家</th>
                  <th>所属区经</th>
                  <th>所属总监</th>
                  <th class="long">所属配置组长</th>
                  <th class="long">所属配置专员</th>
                  <th class="long">方案提交日期</th>
                  <th class="long">竣工验收日期</th>
                  <th>供应商类型</th>
                  <th>供应商名称</th>
                  <th>总成本</th>
                </tr>
              </thead>
              <tbody>
                <no-data :visible="totalNum"></no-data>
                <tr v-for="(item,k) in dataList" :key="k" :class="{isInvalidOrder:item.orderState === -1}"> 
                  <td>{{item.orderNumber | blank}}</td>
                  <td>{{item.propertyNumber | blank}}</td>   
                  <td>{{item.contractNumber | blank}}</td>
                  <td>{{item.address | blank}}</td>
                  <td>{{item.groupSteward | blank}}</td>
                  <td>{{item.groupArea | blank}}</td>
                  <td>{{item.groupMajordomo | blank}}</td>
                  <td>{{item.groupGroup | blank}}</td>
                  <td>{{item.groupAttache | blank}}</td>
                  <td>{{item.submitDate | blank}}</td>
                  <td>{{item.completeDate | blank}}</td>
                  <td>{{item.providerType | blank}}</td>
                  <td>{{item.providerName | blank}}</td>
                  <td>{{item.totalCost | blank}}</td>               
                </tr>
              </tbody>
            </table>
            <table v-else="formQuery.orderType === 2" class="modtable supplierTable">
              <thead>
                <tr>
                  <th class="long1">订单编号</th>
                  <th class="long">解约协议号</th>
                  <th class="long1">房源编号</th>
                  <th class="long">收房合同号</th>
                  <th class="long1">物业地址</th>
                  <th>所属管家</th>
                  <th>所属区经</th>
                  <th>所属总监</th>
                  <th class="long">所属配置组长</th>
                  <th class="long">所属配置专员</th>
                  <th>解约日期</th>
                  <th class="long">解约提交日期</th>
                  <th>量房日期</th>
                  <th>竣工验收</th>
                  <th>家电费用</th>
                  <th>家具费用</th>
                  <th>家居费用</th>
                  <th>门锁费用</th>
                  <th>宽带费用</th>
                  <th>保洁费用</th>
                  <th>装修费用</th>
                  <th>总成本</th>
                  <th>家电供应商</th>
                  <th>家具供应商</th>
                  <th>家居供应商</th>
                  <th>门锁供应商</th>
                  <th>宽带供应商</th>
                  <th>保洁供应商</th>
                  <th>装修供应商</th>
                </tr>
              </thead>
              <tbody>
                <no-data :visible="totalNum"></no-data>
                <tr v-for="(item,k) in dataList" :key="k" :class="{isInvalidOrder:item.orderState === -1}"> 
                  <td>{{item.orderNumber | blank}}</td>
                  <td>{{item.cancelNumber | blank}}</td>
                  <td>{{item.propertyNumber | blank}}</td>   
                  <td>{{item.contractNumber | blank}}</td>
                  <td>{{item.address | blank}}</td>
                  <td>{{item.groupSteward | blank}}</td>
                  <td>{{item.groupArea | blank}}</td>
                  <td>{{item.groupMajordomo | blank}}</td>
                  <td>{{item.groupGroup | blank}}</td>
                  <td>{{item.groupAttache | blank}}</td>
                  <td>{{item.cancelDate | blank}}</td>
                  <td>{{item.cancelSubmitDate | blank}}</td>
                  <td>{{item.houseReserveDate | blank}}</td>
                  <td>{{item.completeDate | blank}}</td>
                  <td>{{item.elecEquipmentCost | blank}}</td>
                  <td>{{item.furnitureCost | blank}}</td>
                  <td>{{item.furnishingCost | blank}}</td>
                  <td>{{item.lockCost | blank}}</td>
                  <td>{{item.bandWidthCost | blank}}</td>
                  <td>{{item.cleanCost | blank}}</td>
                  <td>{{item.decorationCost | blank}}</td>
                  <td>{{item.totalCost | blank}}</td>
                  <td>{{item.elecEquipmentProvider | blank}}</td>
                  <td>{{item.furnitureProvider | blank}}</td>
                  <td>{{item.furnishingProvider | blank}}</td>
                  <td>{{item.lockProvider | blank}}</td>
                  <td>{{item.bandWidthProvider | blank}}</td>
                  <td>{{item.cleanProvider | blank}}</td>
                  <td>{{item.decorationProvider | blank}}</td>          
                </tr>
              </tbody>
            </table>
          </div>
          <div class="footPages">
              <el-pagination v-on:current-change="changeCurrent" v-show="totalNum>pagination.pageSize" layout="prev, pager, next" :page-size="pagination.pageSize" :current-page="pagination.curr" :total="totalNum"></el-pagination>
            </div>
        </div>
		</div>
		<el-dialog :close-on-click-modal="false" :title="propmptMsg.tit" :visible.sync="promptShow" size="tiny">
			<span v-text="propmptMsg.content"></span>
			<span slot="footer" class="dialog-footer">
				<el-button type="primary" @click="promptShow = false">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>
<script>

import {
  getCostCountList
} from "../../api/mgmtcenter";
import { orderTypeOptions, ALL } from "../public/options.config";
import debounce from 'lodash/debounce'
const formInit= () =>
  (
    {
      orderType: 0,
      contractNumber:'',
      baseNumber:'',
      standardDate: {
        start: '',
        end: ''
      }
    }
  )
  
export default {
  name: 'costCount',
  data() {
    return {
      updateId: '',
      orderTypes: [...orderTypeOptions],
      totalNum:0,
      dataList:[],
      timeEnd: {
        disabledDate: time => {
          let boardDateStart = this.form.standardDate.start
          if (!!boardDateStart) {
            return time.getTime() < boardDateStart
          }
        }
      },
      timeStart: {
        disabledDate: time => {
          let boardDateEnd = this.form.standardDate.end
          if (!!boardDateEnd) {
            return time.getTime() > boardDateEnd
          }
        }
      },
      promptShow: false,
      disabledBtn: true,
      outComing: false,
      dialogVisible: false,
      changeReal: true,
      sendSureBtn: true,
      dialogMsg: {
        tit: '',
        type: ''
      },
      promptShow: false,
      propmptMsg: {
        tit: '',
        type: '', // warning  error
        content: ''
      },
      form: formInit(),
      formQuery: formInit(),
      tableData: [],
      pagination: {
        pageSize: 10,
        curr: 1
      },
      paginationShow: false
    }
  },
  methods: {
    paginationReq() {
      this.$store.commit('SET_LOADING',{target:"costCountLoading",state:true},{root:true});
      var formQuery = JSON.parse(JSON.stringify(this.formQuery))
      var start = !!formQuery.standardDate.start?new Date(formQuery.standardDate.start).getTime():'';
      var end =!!formQuery.standardDate.end?new Date(formQuery.standardDate.end).getTime()+24*3600*1000:'';
      formQuery['standardDate'] = [start, end]
      if (formQuery.standardDate[0] === '') {
        delete formQuery.standardDate
      }
      getCostCountList(
				{
					...formQuery,
					limit:this.pagination.pageSize,
					pageNum:this.pagination.curr
				},
				providers => {
					this.totalNum=providers.totalNum;
					this.dataList=providers.items;
				},
				(message) => {
					this.$message({ type: "error", message:"订单列表获取失败！" })
				}
			).finally(
				() => {
					this.$store.commit('SET_LOADING',{target:"costCountLoading",state:false},{root:true});
				}
			)
    },
    pageGo(curr) {
      if (this.pagination.curr === curr) {
        return
      }
      this.pagination.curr = curr
      this.paginationReq()
    },
    orderQuery: debounce(function() {
      if(this.form.standardDate.start && this.form.standardDate.end){
        this.pagination.curr = 1
        this.formQuery = JSON.parse(JSON.stringify(this.form))
        this.paginationReq()
      }else{
        this.standardDateIsNull()
      }
      
    }, 300),
    reset: debounce(function() {
      this.form = form();
      this.pagination.curr = 1
      this.formQuery = JSON.parse(JSON.stringify(this.form))
      this.paginationReq()
    }, 300),
    standardDateIsNull(){
      this.$message.error('竣工日期的开始和结束日期都不能为空！')
    },
    changeCurrent(currentPage) {
      this.pagination.curr = currentPage
      this.paginationReq()
    },
    keydownSearch() {
      this.orderQuery()
    }
  },
  computed: {
    uploadExcelUrl(){
      var formQuery = JSON.parse(JSON.stringify(this.formQuery))
      var start = !!formQuery.standardDate.start?new Date(formQuery.standardDate.start).getTime():'';
      var end =!!formQuery.standardDate.end?new Date(formQuery.standardDate.end).getTime()+24*3600*1000:'';

      return this.host+'/excel/'+formQuery.orderType +
        '?beginTime='+ start +
        '&endTime=' + end +
        '&contractNumber=' + formQuery.contractNumber +
        '&baseNumber=' + formQuery.baseNumber +
        '&access_token='+this.token
    } 
  },
  activated() {
    // var updateId = this.$route.params.updateId || 'updateTab'
    // if (this.updateId !== updateId) {
    //   if(this.form.standardDate.start && this.form.standardDate.end){
    //     this.paginationReq()
    //   }else{
    //     this.standardDateIsNull()
    //   }
    //   this.updateId = updateId
    // }
  }
}
</script>

<style scoped>
#orderQuery .table-box {
  height: calc(100% - 169px);
}
#orderQuery {
  height: 100%;
}
.orderQuery-content {
  position: relative;
  background-color: #fff;
}
.orderQuery-content .person-table {
  width: 100%;
  border-collapse: collapse;
  height: 100%;
}
.orderQuery-content .dotUl {
  top: 7px;
}
.orderQuery-content .form-box {
  border-bottom: 15px solid #f2f4f8;
  padding-top: 15px;
  background-color: #fff;
}
.orderQuery-content .inp-item {
  width: 25%;
  display: inline-block;
  margin-top: 0;
  padding-bottom: 15px;
}
.orderQuery-content .inp-item.timeLong {
  width: 50%;
}
.inp-item.timeLong div.el-date-editor.el-input {
  width: 45%;
}
.orderQuery-content .inp-item.multiple-sel {
  min-width: 360px;
}

.orderQuery-content .inp-item > p {
  float: left;
  width: 75px;
  line-height: 36px;
  padding-left: 15px;
  height: 36px;
  color: #576578;
}
.orderQuery-content .inp-item.titLong > p{
  width:110px;
}
.orderQuery-content .inp-item.middle > p {
  width: 85px;
}
.orderQuery-content .inp-item .inp-box {
  margin-left: 95px;
  margin-right: 15px;
}
.orderQuery-content .inp-item.middle .inp-box {
  margin-left: 105px;
}
.top-btnwrap {
  padding-left: 95px;
  padding-bottom: 15px;
}
.top-btnwrap button:nth-child(1) {
  margin-right: 15px;
}
.excel_out {
  margin-right: 15px;
}
.btn.btn-success[disabled='disabled']{
  color: #bfcbd9;
  cursor: not-allowed;
  background-image: none;
  background-color: #eef1f6;
  border-color: #d1dbe5;
}
.orderQuery-content .tableBox{
  overflow:auto;
}
.orderQuery-content .tableBox th{
  min-width:90px;
  box-sizing: border-box;
}
.orderQuery-content .tableBox th.short{
  min-width:55px;
}
.orderQuery-content .tableBox th.long{
  min-width:105px;
}
.orderQuery-content .tableBox th.long1{
  min-width:155px;
}
.orderQuery-content .tableBox .modtable{
  width:auto;
}
.orderQuery-content .tableBox .modtable td{
  padding-right:5px;
}



</style>
