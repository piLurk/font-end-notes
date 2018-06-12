<template>
	<div id="informationDelivery">
    
		<div class="searchfilter col4">
			<ul class="clearfix">
				<li>
					<p class="name">订单编号：</p>
					<div class="inpbox"><input type="text" @keydown.enter="keydownSearch" v-model.trim="filterForm.orderNumber" placeholder="请输入" class="inp" /></div>
				</li>
				<li>
					<p class="name">合同编号：</p>
					<div class="inpbox"><input type="text" @keydown.enter="keydownSearch" v-model.trim="filterForm.contractNumber" placeholder="请输入" class="inp" /></div>
				</li>
				<li>
					<p class="name">房源编号：</p>
					<div class="inpbox"><input type="text" @keydown.enter="keydownSearch" v-model.trim="filterForm.baseNumber" placeholder="请输入" class="inp" /></div>
				</li>
				<li>
					<p class="name">订单类型：</p>
					<div class="inpbox">
						<el-select v-model="filterForm.orderType" placeholder="请选择">
							<el-option v-for="(item,i) in orderTypeOptions" :key="i" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</div>
				</li>
				<li>
					<p class="name">收房产品：</p>
					<div class="inpbox">
						<el-select v-model="filterForm.houseType" placeholder="请选择">
							<el-option v-for="(item,i) in houseTypeOptions" :key="i" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</div>
				</li>
				<li>
					<p class="name">订单配置：</p>
					<div class="inpbox"><input type="text" @keydown.enter="keydownSearch" v-model.trim="filterForm.orderDeploy" placeholder="请输入" class="inp" /></div>
				</li>
				<li>
					<p class="name">订单状态：</p>
					<div class="inpbox">
						<el-select v-model="filterForm.orderState" placeholder="请选择">
							<el-option v-for="(item,i) in orderStateOptions" :key="i" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</div>
				</li>
				<li class="btnbox singlerow">
					<input type="button" class="surebtn" @click="searchData" value="查询" />
					<input type="button" class="surebtn surereset" @click="reset" value="重置"/>
				</li>
			</ul>
		</div>

		<!--数据列表 begin-->
		<div class="dataBox">
			<div class="toolBar clearfix">
				<my-pagination :total="proTotal" :curr="pagination.curr" :pageChange="pageGo"></my-pagination>
			</div>
			<div class="tableBox">
				<table class="modtable tableLoading informationDeliveryLoading" width="100%" border="0" cellpadding="0" cellspacing="0">
					<tr>
						<th width="120">订单编号</th>
						<th width="100">订单状态</th>
						<th width="90">合同编号</th>
						<th width="220">物业地址</th>
						<th width="130">房源编号</th>
						<th width="70">收房产品</th>
						<th width="80">量房日期</th>
						<th width="80">竣工申请日期</th>
						<th width="70">相关房间</th>
						<th width="70">订单配置</th>
						<th width="110">操作</th>
					</tr>
          <tbody>
            <no-data :visible="proTotal"></no-data>
            <tr v-for="(item,index) in proGroup" :key="index" :class="{isInvalidOrder:item.orderState === -1}">
              <td>
                <a href="javascript:void(0)" @click="orderDetail(item.pkId)" class="bfc">{{item.orderNumber}}</a>
              </td>
              <td>{{item.orderStateName | blank}}</td>
              <td>{{item.contractNumber | blank}}</td>
              <td>{{item.orderAddress | blank}}</td>
              <td>{{item.baseNumber | blank}}</td>
              <td>{{item.houseTypeName | blank}}</td>
              <td>{{item.houseDate | toDate}}</td>
              <td>{{item.submitComplete | toDate}}</td>
              <td>{{item.relatedRoom | blank}}</td>
              <td>{{item.orderDeploy | blank}}</td>
              <td>
                <p class="typeControl">
                  <!-- 根据operate判断有无图片 -->
                  <template v-if="item.orderType ===1">
                      <template v-if="item.orderState===8 || item.orderState===9">
                        <a href="javascript:void(0)" @click="submit(item)" class="j-btn">
                          <i></i>提交竣工验收</a>
                      </template>
                  </template>
                  <template v-else>
                    <template v-if="item.operateState===0 && hasPermission('PZ_inputOrEditPic')">
                    <a href="javascript:void(0)" @click="operate('entry','录入图片',item)" class="l-btn">
                    <i></i>录入图片</a>
                    </template>
                    <template v-else>
                      <template v-if="item.orderState===8 || item.orderState===9">
                        <a v-if="hasPermission('PZ_inputOrEditPic')" href="javascript:void(0)" class="j-btn" @click="operate('edit','编辑图片',item)">
                          <i></i>编辑图片</a>
                        <a v-if="hasPermission('PZ_checkAccept')" href="javascript:void(0)" @click="submit(item)" class="j-btn">
                          <i></i>提交竣工验收</a>
                      </template>
                      <template v-else>
                        <a v-if="hasPermission('PZ_queryRoomPic')" href="javascript:void(0)" class="j-btn" @click="operate('readOnly','查看图片',item)">
                        <i></i>查看图片</a>
                      </template>
                    </template>
                  </template>
                  
                </p>
              </td>
            </tr>
          </tbody>
					
				</table>
			</div>
			<div class="footPages">
				<el-pagination v-show="proTotal > this.pagination.pageSize" @current-change="pageGo" :current-page="pagination.curr" layout="prev, pager, next" :total="proTotal"></el-pagination>
			</div>
		</div>

		<!--竣工超期原因 start-->
		<el-dialog :close-on-click-modal="false" :visible.sync="dialogFormVisible" size="small" top="20%" :before-close="handleClose">
			<h3 slot="title" class="el-dialog__title">竣工超期原因</h3>
			<p>竣工已超期{{'{'+form.day+'}'}}天，请录入超期原因</p>
			<el-form :model="form" ref="form" class="reasonForm">
				<div class="dataBox">
					<div class="tableBox">
						<ul class="modtable" width="100%" border="0" cellpadding="0" cellspacing="0">
							<li class="trlifirest">
								<div>
									<span>超期原因</span>
								</div>
								<div>超期天数</div>
								<div>原因描述</div>
								<div>操作</div>
							</li>
							<li class="trli" v-for="(item,index) in form.causeInfoList" :key="index">
								<div>
									<el-form-item :prop="'causeInfoList.'+index+'.exceedCause'" :rules="[{required: true, message: '请选择超期原因', trigger: 'change'}]" style="margin-top: 22px;text-align: left;margin-left: 10px;">
										<el-select v-model="item.exceedCause" placeholder="请选择" style="width: 90%;">
											<el-option v-for="(item,i) in exceedCauseList" :value="item.label" :label="item.label" :key="i"></el-option>
										</el-select>
									</el-form-item>
								</div>
								<div>
									<el-form-item :prop="'causeInfoList.'+index+'.exceedDay'" :rules="rules.checkNum" style="margin-top: 22px;">
										<el-input v-model.number="item.exceedDay" placeholder="请输入" style="width: 90%;"></el-input>
										<span style="position: absolute;left: 70%;">天</span>
									</el-form-item>
								</div>
								<div>
									<el-form-item :prop="'causeInfoList.'+index+'.exceedRemark'" :rules="[{ required: true, message: '请描述原因', trigger: 'blur' },{ max: 50, message: '请输入50个字符以内', trigger: 'blur' }]" style="margin-top: 22px;">
										<el-input v-model="item.exceedRemark" placeholder="请输入（50字以内）" style="width: 95%;"></el-input>
									</el-form-item>
								</div>
								<div>
									<p class="typeControl">
										<a href="javascript:void(0)" class="e-btn" @click="deleteReason(index)">
											<i></i>删除</a>
									</p>
								</div>
							</li>
						</ul>
					</div>
					<div class="wrapper" style="margin-top: 22px;margin-left: 10px;">
						<el-button type="primary" style="background: #13ce66;border-color:#13ce66;" @click="addTr">+ 新增一条超期原因</el-button>
					</div>
				</div>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="handleClose">取 消</el-button>
				<el-button type="primary" @click="addReason('form')">确 定</el-button>
			</div>
		</el-dialog>
		<!--竣工超期原因 end-->
    <el-dialog :close-on-click-modal="false" :visible.sync="dialogFormVisible_2" size="tiny" top="20%">
      <h3 slot="title" class="el-dialog__title">提交竣工验收</h3>
      <span>确认提交竣工验收？</span>
      <div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible_2=false">取 消</el-button>
				<el-button type="primary" @click="submitSure">确 定</el-button>
			</div>
    </el-dialog>
	</div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers("projectdelivery");

import {
  orderTypeOptions,
  houseTypeOptions,
  orderStateOptions,
  workOrderState,
  exceedCauseList,
  ALL
} from "../public/options.config";

import{
  getOutTime,
  saveOutReason,
  submitAcceptance,
} from "../../api/ordermgmt";
import debounce from 'lodash/debounce'
import permission from '@/mixins/permission.js'

const initOrderFilterForm = {
  orderNumber: "", //订单编码
  contractNumber: "", //合同编号
  baseNumber: "", //房源编号
  orderType: "", //订单类型
  houseType: "", //收房产品
  orderDeploy: "", //配置
  orderState: "" //订单状态
};
const reasonItem ={
    "exceedCause": "",
    "exceedDay": "",
    "exceedRemark": "",
    "exceedType": 2
}
export default {
  name: "informationDelivery",
  data() {
    var checkNum=(rule , value, cb) =>{
				if(!value){                                                                       `	`
					return cb(new Error('输入不能为空！'))
				}
				if(!/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/.test(value)){
					return cb(new Error('请输入大于0的数字值'))
				}else{
					cb();
				}
			};
    return {
      filterForm: { ...initOrderFilterForm },
      //订单类型选项
      orderTypeOptions: [ALL, ...orderTypeOptions],
      //收房产品选项
      houseTypeOptions: [ALL, ...houseTypeOptions],
      exceedCauseList:exceedCauseList,
      // 派工单状态
      workOrderState: [ALL, ...workOrderState],
      orderStateOptions: [ALL, ...orderStateOptions],
      updateId:'',
      pagination: {
        curr: 1, //当前索引
        pageSize: 10 //每页显示条数
      },
      rules:{
					checkNum:{validator:checkNum,trigger:'blur'},
			},
      dialogFormVisible: false,
      dialogFormVisible_2:false,
      form: {
        orderPkId:'',
        day:'',
        causeInfoList: []
      },
      formSend:{}
    };
  },
  computed: {
    ...mapGetters({
      proGroup: "orders2",
      proTotal: "ordersTotal2"
    })
  },
  methods: {
    ...mapActions({
      getOrders: "getOrders2"
    }),
    //获取数据(完成)
    getproGroupData(_isSearch) {
      this.getOrders({
        ...this.formSend,
        limit: this.pagination.pageSize,
        pageNum: this.pagination.curr,
        _isSearch
      });
    },
    //查询页面(完成)
    searchData:debounce(function(){
      this.pagination.curr=1;
      this.formSend = JSON.parse(JSON.stringify(this.filterForm));
      this.getproGroupData(true);
    },300),
    //重置查询条件(完成)
    reset:debounce(function(){
      this.pagination.curr=1;
      this.filterForm = { ...initOrderFilterForm };
      this.formSend = JSON.parse(JSON.stringify(this.filterForm));
      this.getproGroupData(); //重新查询一次所有数据
    },300),
    //分页请求数据
    pageGo(val) {
      if(this.pagination.curr === val){
        return
      }
      this.pagination.curr = val;
      this.getproGroupData();
    },
    pageChange(componentName, componentId, data) {
      this.$store.dispatch("itemArrAdd", {
        id: componentId,
        name: componentName,
        params: data
      });
    },
    operate(pageState, componentName, item) {
      this.pageChange(componentName, "informationDeliveryDetails", {
        ...item,
        pageState:pageState,
      });
    },
    submit(item){
      var orderId=item.pkId;
      this.form.orderPkId=item.pkId;
      getOutTime(
        orderId,
        providers => {
          if(providers.day>0){
            this.form.day=providers.day;
            this.showOutReason(providers.causeInfoList);
            
          }else{
            this.showSure();
          }
        },
        (message) => this.$message.error(message.indexOf('@') !== -1?message.split('@')[1]:"获取竣工超期失败！")
      )

    },
    submitSure(){
      
      submitAcceptance(
        this.form.orderPkId,
        providers => {
          this.$message.success('提交竣工验收成功！');
          this.getproGroupData();
          this.dialogFormVisible_2=false;
        },
        (message) => {
          this.$message.error(message.indexOf('@') !== -1?message.split('@')[1]:"提交竣工验收失败！")
          this.dialogFormVisible_2=false;
        }
      )
    },
    showOutReason(causeInfoList){
      this.form.causeInfoList=causeInfoList;
      this.dialogFormVisible=true;
    },
    showSure(){
      this.dialogFormVisible_2=true;
    },
		handleClose(){
      this.dialogFormVisible=false;
      this.form.causeInfoList=[];
      this.form.orderPkId='';
      this.form.day='';
		},
		addTr(){
			this.form.causeInfoList.push({...reasonItem});
    },
    deleteReason(index) {
      this.form.causeInfoList.splice(index, 1);
    },
    addReason(formName){
      this.$refs[formName].validate((valid) => {
          if(valid){
            var data=JSON.parse(JSON.stringify(this.form));
            data['listCauseInfo']=data['causeInfoList'];
            delete(data.day)
            delete(data.causeInfoList)
            saveOutReason(
              data,
              providers => {
                this.getproGroupData();
                this.$message.success('竣工超期原因录入成功！')
                this.handleClose();
              },
              (message) => {
                this.handleClose();
                this.$message.error(message.indexOf('@') !== -1?message.split('@')[1]:'竣工超期原因录入失败！')

                }
            )
          }
      })
    },
    keydownSearch(){
			this.searchData();
		},
    orderDetail(pkId){
			this.$store.dispatch("itemArrAdd", {
				name: "订单详情",
				id: 'orderDetail',
				params: {pkId:pkId}
			});
		},
  },
  mixins:[permission],
  activated(){
		var updateId=this.$route.params.updateId || 'updateTab';
		if(this.updateId!==updateId){
			this.getproGroupData();
			this.updateId=updateId;
		}
	},
};

</script>

<style scoped>
.searchfilterbox {
  background-color: #fff;
  padding: 15px;
  margin-bottom: 15px;
}
.searchfilterbox ul li {
  width: 22%;
  padding: 0 3% 0 0;
  float: left;
  margin: 5px 0;
}
.searchfilterbox ul li.timebox .flb {
  float: left;
  line-height: 33px;
  width: 2%;
  text-align: center;
}
.searchfilterbox ul li .name {
  width: 70px;
  padding-right: 10px;
  text-align: left;
  float: left;
  height: 33px;
  line-height: 33px;
  font-size: 14px;
}
.searchfilterbox ul li .inpbox {
  margin-left: 85px;
}
.searchfilterbox ul li .inpbox .inp {
  height: 33px;
  line-height: 33px;
  width: 100%;
  border-radius: 3px;
  box-sizing: border-box;
  -moz-box-sizing: border-box; /* Firefox */
  -webkit-box-sizing: border-box; /* Safari */
}
.searchfilterbox ul li .name.name5 {
  width: 80px;
}
.searchfilterbox ul li .inpbox.inpbox5 {
  margin-left: 100px;
}
#role {
  height: 100%;
}
.informationDeliveryContent {
  height: 100%;
  position: relative;
}
.informationDeliveryContent .inp-item {
  width: 25%;
  display: inline-block;
  margin-top: 0;
  padding: 15px 0;
}
.informationDeliveryContent .inp-item > button:nth-child(1) {
  margin-right: 15px;
}
.informationDeliveryContent .inp-item.multiple-sel {
  width: 30%;
  min-width: 360px;
}
.informationDeliveryContent .inp-item > p {
  float: left;
  width: 75px;
  line-height: 34px;
  padding-left: 15px;
  height: 34px;
}
.informationDeliveryContent .inp-item .inp-box {
  margin-left: 95px;
  margin-right: 35px;
}
.table-box {
  box-sizing: border-box;
  height: calc(100% - 68px);
}
.table-box .table-top {
  height: 35px;
  box-sizing: border-box;
}
.table-box .table-wrap {
  height: calc(100% - 35px);
  overflow-y: auto;
}
.table-box .table-top .toppage {
  position: relative;
  font-size: 12px;
  color: #999;
  right: 0px;
  top: 10px;
}
.table-box .table-top .toppage .pdlr5 i,
.table-box .table-top .toppage .pdlr5 a {
  color: #3ba0ff;
}
.table-box table {
}

.btn-wrap {
  padding-top: 15px;
  padding-right: 60px;
}
.pagination-box {
  padding-left: 25px;
  padding-top: 25px;
}
.tableBox li:hover {
  background: #f6f7f9;
}
.dataBox .tableBox .modtable .trlifirest {
  background: #f6f8f8;
  height: 40px;
  line-height: 40px;
  border-bottom: 2px solid rgba(226, 229, 229, 1);
}
.dataBox .tableBox .modtable .trlifirest div:nth-child(1) {
  text-align: left;
  display: inline-block;
  width: 25%;
}
.dataBox .tableBox .modtable .trlifirest div:nth-child(1) span {
  padding-left: 22px;
}
.dataBox .tableBox .modtable .trlifirest div:nth-child(2) {
  display: inline-block;
  width: 15%;
}
.dataBox .tableBox .modtable .trlifirest div:nth-child(3) {
  display: inline-block;
  width: 50%;
}
.dataBox .tableBox .modtable .trlifirest div:nth-child(4) {
  display: inline-block;
  width: 6%;
}
.dataBox .tableBox .modtable .trli {
  border-bottom: 1px solid rgba(241, 241, 241, 1);
}
.dataBox .tableBox .modtable .trli > div:nth-child(1) {
  display: inline-block;
  width: 25%;
}
.dataBox .tableBox .modtable .trli > div:nth-child(2) {
  display: inline-block;
  width: 15%;
}
.dataBox .tableBox .modtable .trli > div:nth-child(3) {
  display: inline-block;
  width: 50%;
}
.dataBox .tableBox .modtable .trli > div:nth-child(4) {
  display: inline-block;
  width: 6%;
}
</style>