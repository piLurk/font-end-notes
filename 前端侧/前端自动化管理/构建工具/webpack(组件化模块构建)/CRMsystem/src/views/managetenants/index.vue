<template>
    <div class="managetenants-container">
        <!--租客过滤器 begin-->
        <div class="filterBox clearfix">
            <div class="row clearfix">
                <ul class="clearfix">
                    <li><p class="name">租客姓名：</p><div class="input_box"><input @keydown.enter="keydownSearch" v-model="form.rentUserName" placeholder="请输入" type="text"></div></li>
                    <li><p class="name">租客手机：</p><div class="input_box"><input @keydown.enter="keydownSearch" v-model="form.rentUserTel" placeholder="请输入" type="text"></div></li>
                    <li><p class="name">合同编号：</p><div class="input_box"><input @keydown.enter="keydownSearch" v-model="form.rentContractNum" placeholder="请输入" type="text"></div></li>
                    <li>
                        <p class="name" style="width: 108px;">学历认证审核：</p>
                        <div class="input_box" style="margin: 0 18px 0 108px;">
                            <el-select filterable v-model="form.educationAuth" placeholder="请选择">
						        <el-option v-for="(item,key) in queryOption.educationAuthOptions" :label="item.label" :value="item.value" :key="key"></el-option>
						    </el-select>
                        </div>
                    </li>
                    <li>
                        <p class="name" style="width: 108px;">选择时间类型：</p>
                        <div class="input_box" style="margin: 0 18px 0 108px;">
                            <el-select filterable v-model="form.timeType" placeholder="请选择">
						        <el-option v-for="(item,key) in queryOption.timeTypeOptions" :label="item.label" :value="item.value" :key="key"></el-option>
						    </el-select>
                        </div>
                    </li>
                    <li style="width: 50%;">
                        <p class="name">选择日期：</p>
                        <div class="input_box">
                            <el-date-picker :picker-options="chooseOptionStart" v-model="form.startTime" type="date" placeholder="选择日期" style="width: 45%;"></el-date-picker>
						    至
						    <el-date-picker :picker-options="chooseOptionEnd" v-model="form.endTime" type="date" placeholder="选择日期" style="width: 45%;"></el-date-picker>
                        </div>    
                    </li>
                </ul>
            </div>
            <div class="row clearfix">
                <div class="rowName">所在区域</div>
                <div class="rowSpan">
                    <span v-bind:class="{on:premisesAreaIdOn == -1}" @click="clicklistGroupDeparement('全部',-1)">全部</span>
                    <span v-bind:class="{on:index == premisesAreaIdOn}" v-for="(item,index) in listAreaDeparement" @click="clicklistGroupDeparement(item, index)" :key='index'>{{item.departmentName}}</span>
                </div>
                <div class="rowSpanSub">
                    <span v-bind:class="{on:index == premisesTradingIdOn}" v-for="(item,index) in listGroupDeparement" @click="setPremisesTradingId(item, index)" :key='index'>{{item.departmentName}}</span>
                </div>
            </div>
            <div style="padding-left:88px;">
                <el-button type="primary" @click="evaluationQuery" >查 询</el-button>
                <el-button @click="reset">重 置</el-button>
            </div>
        </div>
        <!--租客过滤器 end-->

        <!--租客数据 begin-->
        <div class="tableContent">
            <div class="miniPages">
                <my-pagination :total="total" :curr="pagination.curr" :pageChange="pageGo" :pageSize ="pagination.pageSize"></my-pagination>
            </div>
            <table class="mateTable">
                <tbody>
                  <tr class="trth">
                    <th width="6%">序号</th>
                    <th width="6%">姓名</th>
                    <th width="10%">手机号</th>
                    <th width="20%">房源地址</th>
                    <th width="15%">合同编号</th>
                    <th width="6%">所属管家</th>
                    <th width="15%">提交学历时间</th>
                    <th width="20%">租房时间/解约时间</th>
                  </tr>
                  <tr v-for="(item,i) in dataList" :key="i">
                    <td>{{i+1}}</td>
                    <td @click="detail(item.id)"><a href="javascript:void(0)" style="color: rgb(59, 160, 255);">{{item.rentUserName}}</a></td>
                    <td>{{item.rentUserTel}}</td>
                    <td>{{item.houseName}}</td>
                    <td>{{item.lastContractNo}}</td>
                    <td>{{item.belongSaler}}</td>
                    <td>{{item.gmtCreate}}</td>
                    <td>{{item.signDate}}/{{item.breakDate}}</td>
                  </tr>
                </tbody>
            </table>
            <div class="footPages t_r" v-if="total != 0">
                <el-pagination @current-change="pageGo" v-show="total>pagination.pageSize" layout="prev, pager, next" :page-size="pagination.pageSize" :current-page="pagination.curr" :total="total"></el-pagination>
            </div>
        </div>
        <!--租客数据 end-->
    </div>
</template>

<script>
import { getlistAreaDeparement, getlistGroupDeparement } from '@/api/managetenants'
import { mapGetters, mapActions } from 'vuex';
import debounce from 'lodash/debounce';
import { dateFilter } from '@/utils/date';
const timeTypeOptions = [
  { value: 0, label: '所有' },
  { value: 1, label: '学历提交时间' },
  { value: 2, label: '租房时间' },
  { value: 3, label: '解约时间' }
];
const educationAuthOptions = [
  { value: 5, label: '所有' },
  { value: 0, label: '没进流程' },
  { value: 1, label: '待审核' },
  { value: 2, label: '审核通过' },
  { value: 3, label: '审核驳回' },
  { value: 4, label: '不通过' }
]
export default {
    name: 'managetenants',
    data(){
        return{
            queryOption:{
                timeTypeOptions: timeTypeOptions,
                educationAuthOptions: educationAuthOptions
            },
            chooseOptionEnd: {
                disabledDate:(time) => {
                    let boardDateStart = this.form.startTime;
                    if (!!boardDateStart) {
                        return time.getTime()< boardDateStart;
                    }  	
                }
            },
            chooseOptionStart: {
                disabledDate:(time) => {
                    let boardDateEnd = this.form.entTime;
                    if (!!boardDateEnd) {
                        return time.getTime() > boardDateEnd;
                    }  	
                }
            },
            form:{
                rentUserName: '',
                rentUserTel: '',
                rentContractNum: '',
                educationAuth: '',
                timeType: '',
                startTime: '',
                endTime: '',
                areaDepartmentId: '',// 区域id
                groupDepartmentId: '',// 商圈id
            },
            formQuery:{
                rentUserName: '',
                rentUserTel: '',
                rentContractNum: '',
                educationAuth: '',
                timeType: '',
                startTime: '',
                entTime: '',
                areaDepartmentId: '',// 区域id
                groupDepartmentId: '',// 商圈id
            },
            listAreaDeparement: [], // 责任区域大区
            listGroupDeparement: [], // 子业务组
            premisesAreaIdOn: -1, // 默认责任区域选中 "全部 "
            premisesTradingIdOn: null, // 默认责任区域子业务组选中 为空
            userId: null,
            pagination:{
                pageSize:20,
                curr:1,
            },
        }
    },
    computed: {
        ...mapGetters({
            dataList:'allRenterInfo',
            total: 'renterInfoCount',
            sidebar: 'sidebar'
        })
    },
    created() {
        // 获取全局变量userId
        this.userId = this.$store.getters.userId;

        // 初始进来请求数据
        this.listAreaDeparementFun();
        this.getRenterinfoList();
    },
    methods: {
        ...mapActions({
            getRenterinfoList:'GetRenterinfo'
		}),
        // 获取责任大区(完成)
        listAreaDeparementFun() {
            getlistAreaDeparement({
                userId: this.userId
            }).then(response => {
                this.listAreaDeparement = response.data.departments
            }).catch(err => {
                console.log(err)
            })
        },
        // 点击大区获取业务组并设置选中状态(完成)
        clicklistGroupDeparement(item, index) {
            this.premisesAreaIdOn = index // 选中当前大区
            this.premisesTradingIdOn = null // 清空子业务组选中项
            if (index === -1) {
                this.listGroupDeparement = [] // 清空子业务组数据
                this.premisesTradingIdOn = null // 清空子业务组选中项
                this.form.areaDepartmentId = null
            } else {
                this.form.areaDepartmentId = item.id
                getlistGroupDeparement({
                    userId: this.userId,
                    parentId: item.id
                }).then(response => {
                    this.listGroupDeparement = response.data.departments
                }).catch(err => {
                    console.log(err)
                })
            }
            this.form.groupDepartmentId = null // 子业务组永恒为空
        },
        // 设置区域内子业务组(完成)
        setPremisesTradingId(item, index) {
            this.premisesTradingIdOn = index
            this.form.groupDepartmentId = item.id
        },
        keydownSearch(){
			this.evaluationQuery();
        },
        paginationReq(){
            var data=JSON.parse(JSON.stringify(this.formQuery));
            data['pageSize']=this.pagination.pageSize;
            data['pageIndex'] = this.pagination.curr-1;
            data['startTime'] = dateFilter(this.form.startTime);
            data['entTime'] = dateFilter(this.form.entTime);
            this.getRenterinfoList(data);
        },
        pageGo(curr){
            if(this.pagination.curr===curr){
                return;
            }
            this.pagination.curr=curr;
            this.paginationReq();
        },
        evaluationQuery: debounce(function(){
            this.pagination.curr=1;
            this.formQuery=JSON.parse(JSON.stringify(this.form));
            this.paginationReq();
        },300),
        reset: debounce(function(){
            for(let i in this.form){
                if(typeof this.form[i] ==='object'){
                    this.form[i] ='';
                    for(let g in this.form[i]){
                        this.form[i][g]=''
                    }
                    continue;
                }
                this.form[i]='';

            }
            this.pagination.curr=1;
            this.formQuery=JSON.parse(JSON.stringify(this.form));
            this.paginationReq();
        },300),
        detail(pkId){
          this.$store.dispatch('itemArrAdd', {
            name: '租客详情',
            id: 'manageTenantsDetail',
            params: { pkId: pkId }
          })
      }
    },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.managetenants-container {
//   padding: 15px;
}
.filterBox {
    width: 100%;
    padding: 15px;
    border-bottom: 10px solid #f2f4f8;
    background: #fff;
    .row {
      width:100%;
      line-height:24px;
      font-size: 14px;
      color: #A3B2C6;
      padding:5px 0;
      .rowName {width: 70px;float: left;margin: 5px 0;}
      .rowSpan {
        margin-left: 70px;
        span { width: 100px; float:left; background-color: #f6f8f8;text-align: center;margin: 5px 0 5px 18px;cursor: pointer;}
        span.on {background-color: #A3B2C6;color: #fff;}
      }
      .rowSpanSub {
        margin-left: 70px;
        clear: both;
        padding:5px 0;
        height: 40px;
        span { width: 100px; float: left;background-color: #f6f8f8;text-align: center;margin: 5px 0 5px 18px;cursor: pointer;}
        span.on {background-color: #A3B2C6;color: #fff;}
      }
      ul {
        width: 100%;
        li {
          width:25%;float: left;padding: 15px 0;
          .name {width: 88px;float: left;line-height: 30px;}
          .input_box {margin: 0 18px 0 88px;}
        }
      }

    }
}
.tableContent{
    background-color:#fff;
}
.tableContent .mateTable{
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
</style>

