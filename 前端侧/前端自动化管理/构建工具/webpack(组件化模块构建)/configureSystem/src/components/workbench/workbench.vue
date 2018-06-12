<template>
	<div id="workbench" class="workbench">
		<div class="overview-item clearfix">
      <h2 class="item-title">配置房源总览</h2>
      <h2 class="item-title item-title-2">配置进度总览</h2>
			<el-tabs v-model="activeName">
				<el-tab-pane label="新收订单" name="house" :class="{'active-pane': activeName === 'house'}">
          <div class="clearfix">
          	<div class="itew-wrap" v-for="(house, index) in newHouseData" :key="index">
						  <house-overview :color="house[0].color" :label="house[0].label" :value="house[0].value" :suffix="house[0].suffix"></house-overview>
						  <house-overview :color="house[1].color" :label="house[1].label" :value="house[1].value" :suffix="house[1].suffix"></house-overview>
					  </div>
          </div>
				
          <div  class="clearfix" style="padding-top:50px;">
            <div class="itew-wrap itew-wrap-l" v-for="(progress, index) in progressData"  :key="index">
              <progress-overview :icon="progress.icon" :color="progress.color" :label="progress.label" :value="progress.value"></progress-overview>
            </div>
          </div>
				</el-tab-pane>
				<el-tab-pane label="退租订单" name="progress" :class="{'active-pane': activeName === 'progress'}">
        <div class="clearfix">
          <div class="itew-wrap" v-for="(house, index) in backHouseData" :key="index">
            <house-overview :color="house[0].color" :label="house[0].label" :value="house[0].value" :suffix="house[0].suffix"></house-overview>
            <house-overview :color="house[1].color" :label="house[1].label" :value="house[1].value" :suffix="house[1].suffix"></house-overview>
          </div>
        </div>
        <div class="clearfix" style="padding-top:50px;">
          <div  class="itew-wrap itew-wrap-l" v-for="(progress, index) in backProgressData"  :key="index">
            <progress-overview  :icon="progress.icon" :color="progress.color" :label="progress.label" :value="progress.value"></progress-overview>
          </div>
        </div>
					
				</el-tab-pane>
			</el-tabs>
		</div>
	
		<div v-loading="orderLoading">
			<div class="searchfilter col4">
				<el-row :gutter="40">
					<el-col :span="6">
						<p class="name">订单类型：</p>
						<div class="inpbox">
							<el-select v-model="filterForm.orderType" placeholder="请选择">
								<el-option v-for="(item,i) in orderTypeOptions" :key="i" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</div>
					</el-col>
					<el-col :span="6">
						<p class="name">收房合同号：</p>
						<div class="inpbox"><input type="text" @keydown.enter="keydownSearch" v-model.trim="filterForm.contractNumber" placeholder="请输入" class="inp" /></div>
					</el-col>
					<el-col :span="6">
						<p class="name">房源编号：</p>
						<div class="inpbox"><input type="text" @keydown.enter="keydownSearch" v-model.trim="filterForm.baseNumber" placeholder="请输入" class="inp" /></div>
					</el-col>
					<el-col :span="6">
						<p class="name">收房产品：</p>
						<div class="inpbox">
							<el-select v-model.trim="filterForm.houseType" placeholder="请选择">
								<el-option v-for="item in houseTypeOptions" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</div>
					</el-col>
				</el-row>
				<el-row :gutter="40">
					<el-col :span="6">
						<p class="name">订单管家：</p>
						<div class="inpbox"><input type="text" @keydown.enter="keydownSearch" v-model.trim="filterForm.orderSteward" placeholder="请输入" class="inp" /></div>
					</el-col>
					<el-col :span="6">
						<p class="name">订单配置：</p>
						<div class="inpbox"><input type="text" @keydown.enter="keydownSearch" v-model.trim="filterForm.orderDeploy" placeholder="请输入" class="inp" /></div>
					</el-col>
					<el-col :span="12" class="label140">
						<p class="name">合同提交审核日期：</p>
						<div class="inpbox">
							<el-date-picker v-model="filterForm.date" type="daterange" placeholder="选择日期范围"> </el-date-picker>
						</div>
					</el-col>
				</el-row>
				<el-row :gutter="40">
					<el-col :span="12" class="label140">
						<p class="name">方案提交日期：</p>
						<div class="inpbox">
							<el-date-picker v-model="filterForm.submitDate" type="daterange" placeholder="选择日期范围"> </el-date-picker>
						</div>
					</el-col>
					<el-col :span="12" class="label140">
						<p class="name">提交竣工验收日期：</p>
						<div class="inpbox">
							<el-date-picker v-model="filterForm.submitCompleteDate" type="daterange" placeholder="选择日期范围"> </el-date-picker>
						</div>
					</el-col>
				</el-row>

				<div class="expand-wrap" :class="{ 'is-expand': isExpand }">
					<el-row :gutter="40">
						<el-col :span="12">
							<p class="name">量房日期：</p>
							<div class="inpbox">
								<el-date-picker v-model="filterForm.amountDate" type="daterange" placeholder="选择日期范围"> </el-date-picker>
							</div>
						</el-col>
						<el-col :span="12" class="label140">
							<p class="name">竣工验收日期：</p>
							<div class="inpbox">
								<el-date-picker v-model="filterForm.standardDate" type="daterange" placeholder="选择日期范围"> </el-date-picker>
							</div>
						</el-col>
					</el-row>
					<el-row :gutter="40">
						<el-col :span="6">
							<p class="name">配置状态：</p>
							<div class="inpbox">
								<el-select v-model="filterForm.deployState" placeholder="请选择">
									<el-option v-for="(item,i) in deployStateOptions" :key="i" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</div>
						</el-col>
						<el-col :span="6">
							<p class="name">订单状态：</p>
							<div class="inpbox">
								<el-select v-model="filterForm.orderState" placeholder="请选择">
									<el-option v-for="(item,i) in orderStateOptions" :key="i" :label="item.label" :value="item.value">
									</el-option>
								</el-select>
							</div>
						</el-col>
						<el-col :span="6" class="label140">
							<p class="name">订单配置组长：</p>
							<div class="inpbox"><input type="text" @keydown.enter="keydownSearch" v-model.trim="filterForm.orderNumber" placeholder="请输入" class="inp" /></div>
						</el-col>
					</el-row>
          <el-row :gutter="40">
            <el-col :span="6">
              <p class="name">下单时间：</p>
              <div class="inpbox">
							  <el-date-picker v-model="filterForm.orderDate" type="daterange" placeholder="选择日期范围"> </el-date-picker>
						  </div>
            </el-col>
          </el-row>
					<el-row :gutter="40">
						<el-col :span="24">
							<p class="name">超期天数：</p>
							<div class="inpbox">
								<el-checkbox-group v-model="filterForm.overdueDays" :true-label="1" :false-label="2">
									<el-checkbox v-for="opt in overdueDayOptions" :key="opt" :label="opt"></el-checkbox>
								</el-checkbox-group>
							</div>
						</el-col>
					</el-row>
				</div>
				<li class="btnbox singlerow" style="padding-left: 95px;">
					<el-button type="primary" @click="search">&nbsp;&nbsp;查 询&nbsp;&nbsp;</el-button>
					<el-button @click="reset">&nbsp;&nbsp;重 置&nbsp;&nbsp;</el-button>
					<el-button type="text" class="expand-button" :class="{ 'is-expand': isExpand }" @click="isExpand = !isExpand">{{ isExpand ? '收 起' : '展 开' }}</el-button>
				</li>
			</div>
			<div class="dataBox">
				<div class="toolBar clearfix">
					<my-pagination :total="totalNum" :curr="pagination.curr" :pageChange="pageGo"></my-pagination>
				</div>
				<order-table :data="tableData"></order-table>
				<div class="footPages">
					<el-pagination @current-change="pageGo" :current-page="pagination.curr" layout="prev, pager, next" :total="totalNum"></el-pagination>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
import HouseOverview from "./HouseOverview.vue";
import ProgressOverview from "./ProgressOverview.vue";
import filterSearch from "@/mixins/filterSearch.js";
import OrderTable from "./OrderTable.vue";

import {
  getHouseOverview,
  getProgressOverview,
  getOrdersOverview
} from "@/api/workbench.js";
import {
  orderTypeOptions,
  houseTypeOptions,
  orderStateOptions,
  deployStateOptions,
  overdueDayOptions,
  ALL
} from "../public/options.config";

import cloneDeep from "lodash/cloneDeep";

const dateRange2TimeStr = data => [
  data[0] ? data[0].getTime() : data[0],
  data[1] ? data[1].getTime() : data[1]
];

export default {
  name: "workbench",
  components: {
    "house-overview": HouseOverview,
    "progress-overview": ProgressOverview,
    "order-table": OrderTable
  },
  data() {
    return {
      activeName: "house",
      newHouseData: [
        [
          { color: "orange", label: "本月新收房源总量", value: null },
          { color: "green", label: "待配置总量", value: null }
        ],
        [
          { color: "blue", label: "本月配置完总量", value: null },
          { color: "yellow", label: "配置中总量", value: null }
        ],
        [
          { color: "yellow", label: "本月配置完超期数量", value: null },
          { color: "cyan", label: "配置中超期数量", value: null }
        ],
        [
          {
            color: "green",
            label: "本月配置完超期率",
            value: null,
            suffix: "%"
          },
          { color: "red", label: "配置中超期率", value: null, suffix: "%" }
        ],
        [
          { color: "red", label: "本月配置完超期<=2", value: null },
          { color: "blue", label: "配置中超期<=2", value: null }
        ],
        [
          { color: "cyan", label: "本月配置完超期(3-5)", value: null },
          { color: "orange", label: "配置中超期（3-5）", value: null }
        ],
        [
          { color: "purple", label: "本月配置完超期>=6", value: null },
          { color: "red", label: "配置中超期>=6", value: null }
        ]
      ],
      backHouseData: [
        [
          { color: "orange", label: "本月退租房源总量", value: null },
          { color: "green", label: "待配置总量", value: null }
        ],
        [
          { color: "blue", label: "本月配置完总量", value: null },
          { color: "yellow", label: "配置中总量", value: null }
        ],
        [
          { color: "yellow", label: "本月配置完超期数量", value: null },
          { color: "cyan", label: "配置中超期数量", value: null }
        ],
        [
          {
            color: "green",
            label: "本月配置完超期率",
            value: null,
            suffix: "%"
          },
          { color: "red", label: "配置中超期率", value: null, suffix: "%" }
        ],
        [
          { color: "red", label: "本月配置完超期<=2", value: null },
          { color: "blue", label: "配置中超期<=2", value: null }
        ],
        [
          { color: "cyan", label: "本月配置完超期(3-5)", value: null },
          { color: "orange", label: "配置中超期（3-5）", value: null }
        ],
        [
          { color: "purple", label: "本月配置完超期>=6", value: null },
          { color: "red", label: "配置中超期>=6", value: null }
        ]
      ],
      progressData: [
        { icon: "no1", color: "red", label: "待提交配置方案", value: null },
        { icon: "no3", color: "orange", label: "待派单", value: null },
        { icon: "no5", color: "blue", label: "待提交竣工", value: null },
        { icon: "no7", color: "cyan", label: "待竣工", value: null }
      ],
      backProgressData: [
        { icon: "no1", color: "red", label: "待提交配置方案", value: null },
        { icon: "no3", color: "orange", label: "待派单", value: null },
        { icon: "no5", color: "blue", label: "待提交竣工", value: null },
        { icon: "no7", color: "cyan", label: "待竣工", value: null }
      ],

      //订单类型
      orderTypeOptions: [ALL, ...orderTypeOptions],
      //收房产品
      houseTypeOptions: [ALL, ...houseTypeOptions],
      // 订单状态
      orderStateOptions: [ALL, ...orderStateOptions],
      // 配置状态
      deployStateOptions: [ALL, ...deployStateOptions],
      // 超期天数
      overdueDayOptions: overdueDayOptions,
      isExpand: false,
      filterForm: this.initFilterForm(),
      _filterForm: {},
      tableData: [],
      totalNum: 0,
      pagination: {
        curr: 1, //当前索引
        pageSize: 20 //每页显示条数
      },
      orderLoading: false
    };
  },
  methods: {
    initFilterForm() {
      return {
        orderNumber: "", // 订单编号
        orderType: "", // 订单类型
        orderState: "", // 订单状态
        contractNumber: "", // 收房合同号
        baseNumber: "", // 房源编号
        houseType: "", // 收房产品
        orderSteward: "", // 订单管家
        orderDeploy: "", // 订单配置
        orderData: [null, null], // 下单日期
        submitDate: [null, null], // 方案提交日期
        submitCompleteDate: [null, null], // 方案提交竣工日期
        standardDate: [null, null], // 竣工日期
        deployState: "", // 配置状态
        overdueDays: [], // 超期天数
        amountDate: [null, null], // 量房日期
        orderDate: [null, null] //下单日期
      };
    },
    formatForm() {
      let _f = cloneDeep(this.filterForm);
      _f.orderData = dateRange2TimeStr(_f.orderData);
      _f.submitDate = dateRange2TimeStr(_f.submitDate);
      _f.submitCompleteDate = dateRange2TimeStr(_f.submitCompleteDate);
      _f.standardDate = dateRange2TimeStr(_f.standardDate);
      _f.amountDate = dateRange2TimeStr(_f.amountDate);
      _f.orderDate = dateRange2TimeStr(_f.orderDate);
      _f.overdueDays = overdueDayOptions.map(
        opt => (_f.overdueDays.indexOf(opt) > -1 ? 1 : 0)
      );
      this._filterForm = _f;
    },
    getGroupData() {
      this.orderLoading = true;
      getOrdersOverview(
        {
          ...this._filterForm,
          limit: this.pagination.pageSize,
          pageNum: this.pagination.curr
        },
        data => {
          this.tableData = data.items;
          this.totalNum = data.totalNum;
        }
      ).finally(_ => (this.orderLoading = false));
    },

    requestError(message) {
      return () => {
        this.$message.error(`请求${message}失败`);
      };
    },
    initPage() {
      getHouseOverview(
        0,
        houses => {
          this.newHouseData.forEach((h, i) => {
            h[0].value = houses[i];
            h[1].value = houses[i + 7];
          });
          this.progressData.forEach((h, i) => {
             h.value = houses[i+14];
          });
        },
        this.requestError("新收配置房源总览")
      );
      setTimeout(() => {
        getHouseOverview(
          2,
          houses => {
            this.backHouseData.forEach((h, i) => {
              h[0].value = houses[i];
              h[1].value = houses[i + 7];
            });
            this.backProgressData.forEach((h, i) => {
             h.value = houses[i+14];
          });
          },
          this.requestError("退租配置房源总览")
        );
      });
    }
  },
  mixins: [filterSearch],
  activated() {
    this.initPage();
  }
};
</script>


<style scoped>

.workbench {
  min-width: 1510px;
  /* padding: 20px 10px 0 30px; */
}
.overview-item {
  padding-bottom: 20px;
  position: relative;
}
.overview-item h2 {
  font-size: 16px;
  font-weight: bold;
  color: #1c2b36;
  line-height: 30px;
}

.itew-wrap {
  float: left;
  min-width: 185px;
  width: calc((100% - 30px) / 7);
  border-radius: 4px;
  margin-right: 5px;
}
.itew-wrap:last-child {
  margin-right: 0;
}
.itew-wrap > .house-overview:first-child {
  margin-bottom: 1px;
  border-radius: 4px 4px 0 0;
}
.itew-wrap > .house-overview:last-child {
  border-radius: 0 0 4px 4px;
}
.itew-wrap-l {
  width: calc((100% - 15px) / 4);
}
.itew-wrap-l:nth-of-type(4) {
  margin-right: 0;
}
.expand-wrap {
  overflow: hidden;
  height: 0;
  transition: height 0.8s;
}
.expand-wrap.is-expand {
  height: 180px;
}
.expand-button {
  position: relative;
  color: #a3b2c6;
  padding-left: 30px;
}
.expand-button::before {
  position: absolute;
  content: "";
  left: 10px;
  top: 14px;
  width: 8px;
  height: 4px;
  border-top: 5px solid #a3b2c6;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  transition: transform 0.8s;
}
.expand-button.is-expand::before {
  transform: rotate(180deg);
}

</style>

<style>

.workbench .el-tabs__item.is-active {
  color: #576578;
}
.workbench .el-tabs__nav-scroll {
  padding-left: 10px;
}
.workbench .el-tabs__active-bar {
  background-color: #576578;
}

.workbench .el-tabs__content {
  position: relative;
  width: 100%;
  height: 250px;
  overflow: hidden;
  perspective: 1200px;
}
.overview-item .el-tab-pane {
  position: absolute;
  display: block !important;
  width: 100%;
  height: 250px;
  top: 40px;
  left: 0;
  transition: transform 0.6s;
  transform-origin: bottom;
  transform-style: preserve-3d;
  transform: rotateX(-180deg);
  backface-visibility: hidden;
}

.overview-item .el-tab-pane.active-pane {
  left: 0;
  transform: rotateX(-360deg);
  z-index: 1;
}
.item-title {
  position: absolute;
  left: 0;
  top: 55px;
}
.item-title-2 {
  top: 215px;
}
</style>
