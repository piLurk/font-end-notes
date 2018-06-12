<template>
	<div id="orderQuery" class="component-box">
		<div class="orderQuery-content">
			<div class="form-box">
				<div class="inp-item">
					<p>订单编号：</p>
					<div class="inp-box">
						<input @keydown.enter="keydownSearch" type="text" v-model.trim="form.orderNumber" placeholder="请输入">
					</div>
				</div><div class="inp-item">
					<p>订单状态：</p>
					<div class="inp-box">
						<el-select filterable v-model="form.orderState" @change="typeChange($event)" placeholder="请选择">
							<el-option v-for="(item,key) in orderStates" :label="item.label" :value="item.value" :key="key"></el-option>
						</el-select>
					</div>
				</div><div class="inp-item">
					<p>订单类型：</p>
					<div class="inp-box">
						<el-select v-model="form.orderType" @change="typeChange($event)" placeholder="请选择">
							<el-option v-for="(item,key) in orderTypes" :label="item.label" :value="item.value" :key="key"></el-option>
						</el-select>
					</div>
				</div><div class="inp-item middle">
					<p>合同编号：</p>
					<div class="inp-box">
						<input @keydown.enter="keydownSearch" type="text" v-model.trim="form.contractNumber" placeholder="请输入">
					</div>
				</div><div class="inp-item">
					<p>房源编号：</p>
					<div class="inp-box">
						<input @keydown.enter="keydownSearch" type="text" v-model.trim="form.baseNumber" placeholder="请输入">
					</div>
				</div><div class="inp-item">
					<p>收房产品：</p>
					<div class="inp-box">
						<el-select v-model="form.houseType" placeholder="请选择">
							<el-option v-for="(item,key) in houseTypes" :label="item.label" :value="item.value" :key="key"></el-option>
						</el-select>
					</div>
				</div><div class="inp-item">
					<p>订单管家：</p>
					<div class="inp-box">
						<input @keydown.enter="keydownSearch" type="text" v-model.trim="form.orderSteward" placeholder="请输入">
					</div>
				</div><div class="inp-item">
					<p>订单配置：</p>
					<div class="inp-box">
						<input @keydown.enter="keydownSearch" type="text" v-model.trim="form.orderDeploy" placeholder="请输入">
					</div>
				</div><div class="inp-item timeLong">
					<p>下单日期：</p>
					<div class="inp-box">
						<el-date-picker :picker-options="timeStart" v-model="form.orderDate.start" type="date" placeholder="选择日期"></el-date-picker>
						-
						<el-date-picker :picker-options="timeEnd" v-model="form.orderDate.end" type="date" placeholder="选择日期"></el-date-picker>
					</div>
				</div>
				<div class="top-btnwrap">
					<button @click="orderQuery" class="btn btn-primary">查询</button>
					<button @click="reset" class="btn btn-reset">重置</button>
					<a v-if="permissionObj['excel_out']" :href="host+'/employeeInfo/exportEmployee.json'" class="excel_out btn btn-success f_r">导出Excel</a>
				</div>
			</div>
			<div class="dataBox">
        <p><button v-if="hasPermission('PZ_addOrder')" @click="addOrder" class="btn btn-primary">补单</button></p>
				<div class="toolBar clearfix">
					<my-pagination :total="totalNum" :curr="pagination.curr" :pageChange="pageGo"></my-pagination>
				</div>
				<div class="tableBox">
					<table class="modtable supplierTable orderQueryLoading">
						<thead>
							<tr>
								<th>订单编号</th>
								<th>订单状态</th>
								<th>订单类型</th>
								<th>合同编号</th>
								<th>物业地址</th>
								<th>房源编号</th>
								<th>收房产品</th>
								<th>下单时间</th>
								<th>合同生效日</th>
								<th>相关房间</th>
								<th>订单管家</th>
								<th>订单配置</th>
							</tr>
						</thead>
						<tbody>
							<no-data :visible="totalNum"></no-data>
							<tr v-for="(item,k) in dataList" :key="k" :class="{isInvalidOrder:item.orderState === -1}"> 
								<td>
									<a class="bfc" @click="orderDetail(item.pkId)" href="javascript:void(0)">{{item.orderNumber}}</a>
								</td>
								<td>{{item.orderStateName | blank}}</td>
								<td>{{item.orderTypeName | blank}}</td>
								<td>{{item.contractNumber | blank}}</td>
								<td>{{item.orderAddress}}</td>
								<td>{{item.baseNumber | blank}}</td>
								<td>{{item.houseTypeName | blank}}</td>
								<td>{{item.orderTime | toDate}}</td>
								<td>{{item.contractDate | toDate}}</td>
								<td>{{item.relatedRoom | blank}}</td>
								<td>{{item.orderSteward | blank}}</td>
								<td>{{item.orderDeploy | blank}}</td>
							</tr>
						</tbody>
					</table>
					<div class="footPages">
						<el-pagination v-on:current-change="changeCurrent" v-show="totalNum>pagination.pageSize" layout="prev, pager, next" :page-size="pagination.pageSize" :current-page="pagination.curr" :total="totalNum"></el-pagination>
					</div>
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
// 每次都请求组织架构json和上级部门的数组————前端无数据权限。不选和选无上级部门都为无上级部门。

import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapActions } = createNamespacedHelpers('orderQuery')
import { orderStateOptions , orderTypeOptions ,houseTypeOptions, ALL } from "../public/options.config";
import debounce from 'lodash/debounce'
import permission from '@/mixins/permission.js'

const form= () =>
  (
    {
      orderNumber: '',
      orderState: '',
      orderType: '',
      contractNumber: '',
      baseNumber: '',
      houseType: '',
      orderSteward: '', //订单管家
      orderDeploy: '', //订单配置
      orderDate: {
        start: '',
        end: ''
      }
    }
  )
  
export default {
  name: 'orderQuery',
  data() {
    return {
      updateId: '',
      orderStates: [ALL,...orderStateOptions],
      orderTypes: [ALL,...orderTypeOptions],
      houseTypes: [ALL,...houseTypeOptions],
      timeEnd: {
        disabledDate: time => {
          let boardDateStart = this.form.orderDate.start
          if (!!boardDateStart) {
            return time.getTime() < boardDateStart
          }
        }
      },
      timeStart: {
        disabledDate: time => {
          let boardDateEnd = this.form.orderDate.end
          if (!!boardDateEnd) {
            return time.getTime() > boardDateEnd
          }
        }
      },
      dataHandle: new DataHandle(),
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
      form: form(),
      formQuery: {
        orderNumber: '',
        orderState: '',
        orderType: '',
        contractNumber: '',
        baseNumber: '',
        houseType: '',
        orderSteward: '', //订单管家
        orderDeploy: '', //订单配置
        orderDate: {
          start: '',
          end: ''
        }
      },
      department: [],
      tableData: [],
      pagination: {
        pageSize: 10,
        curr: 1
      },
      paginationShow: false,
      treeLoading: true,
      tdShow: true,
      permissionObj: {
        edit_personInfo: false, //编辑
        personnel_change: false, //人事变动
        quit_person: false, //离职
        excel_out: false, //导出表格
        Extension_number: false, //录入分机号
        oa_query_personInfos: false //查看人员信息
      }
    }
  },
  methods: {
    ...mapActions(['getOrderList']),
    getNumber(value) {
      if (value === '0' || value === 0) {
        return 0
      }
      return !!value ? parseInt(value) : ''
    },
    sendReq() {
      this.getData(this.dialogMsg.type)
    },
    typeChange($event) {
      if ($event === 0) {
        this.tdShow = true
      } else {
        this.tdShow = false
      }
    },
    paginationReq() {
      var formQuery = JSON.parse(JSON.stringify(this.formQuery))
      formQuery['limit'] = this.pagination.pageSize
      formQuery['pageNum'] = this.pagination.curr
      var start = !!formQuery.orderDate.start?new Date(formQuery.orderDate.start).getTime():'';
      var end =!!formQuery.orderDate.end?new Date(formQuery.orderDate.end).getTime()+24*3600*1000:'';
      formQuery['orderDate'] = [start, end]
      formQuery = this.dataHandle.getNeedJson(formQuery)
      if (formQuery.orderDate[0] === '') {
        delete formQuery.orderDate
      }
      this.getOrderList(formQuery)
    },
    pageGo(curr) {
      if (this.pagination.curr === curr) {
        return
      }
      this.pagination.curr = curr
      this.paginationReq()
    },
    orderQuery: debounce(function() {
      this.pagination.curr = 1
      this.formQuery = JSON.parse(JSON.stringify(this.form))
      this.paginationReq()
    }, 300),
    reset: debounce(function() {
      this.form = form();
      this.pagination.curr = 1
      this.formQuery = JSON.parse(JSON.stringify(this.form))
      this.paginationReq()
    }, 300),
    changeCurrent(currentPage) {
      this.pagination.curr = currentPage
      this.paginationReq()
    },
    pageChange(componentName, currentViewId, orderId, permission) {},
    orderDetail(pkId) {
      this.$store.dispatch('itemArrAdd', {
        name: '订单详情',
        id: 'orderDetail',
        params: { pkId: pkId }
      })
    },
    addOrder(){
      this.$store.dispatch('itemArrAdd', {
        name: '补单',
        id: 'addOrder',
        params: {}
      })
    },
    keydownSearch() {
      this.orderQuery()
    }
  },
  computed: {
    ...mapGetters({
      dataList: 'dataList',
      totalNum: 'totalNum'
    })
  },
  mixins:[permission],
  activated() {
    var updateId = this.$route.params.updateId || 'updateTab'
    if (this.updateId !== updateId) {
      this.paginationReq()
      this.updateId = updateId
    }
  },
  beforeMount: function() {}
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
.table-box .table-top {
  padding-bottom: 7px;
  height: 30px;
  box-sizing: border-box;
}
.table-box .table-top .toppage {
  position: relative;
  right: 0px;
  font-size: 12px;
  color: #999;
}
.table-box .table-top .toppage .pdlr5 i,
.table-box .table-top .toppage .pdlr5 a {
  color: #3ba0ff;
}
.btn-wrap {
  padding-right: 60px;
  position: relative;
  bottom: -10px;
}
.pagination-box {
  padding-left: 25px;
  padding-top: 25px;
}
/*表格*/
.table-box {
  padding: 10px 20px 0;
  height: calc(100% - 10px);
  box-sizing: border-box;
  background-color: #fff;
}
</style>
