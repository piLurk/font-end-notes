<template>
  <div class="ownermanage-container">
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
          <!--   --------------------------------- 全部业主 版块begin -----------------------------------------------   -->
          <el-tab-pane label="全部业主" name="allowner">
            <!--全部业主过滤器 begin-->
            <div class="filterBox clearfix">
              <div class="row clearfix">
                <ul class="clearfix">
                  <li><p class="name">业主姓名：</p><div class="input_box"><el-input v-model="personName" placeholder="请输入"></el-input></div></li>
                  <li><p class="name">业主手机：</p><div class="input_box"><el-input v-model="mobile" placeholder="请输入"></el-input></div></li>
                  <li><p class="name">合同编号：</p><div class="input_box"><el-input v-model="contractNo" placeholder="请输入"></el-input></div></li>
                  <li><p class="name">房源编号：</p><div class="input_box"><el-input v-model="houseNo" placeholder="请输入"></el-input></div></li>
                </ul>
              </div>
    
              <div class="row clearfix">
                <div class="rowName">责任区域</div>
                <div class="rowSpan">
                  <span v-bind:class="{on:premisesAreaIdOn == -1}" @click="clicklistGroupDeparement('全部',-1)">全部</span>
                  <span v-for="(item, index) in listAreaDeparement" v-bind:class="{on:index==premisesAreaIdOn}" 
                  @click="clicklistGroupDeparement(item, index)">{{item.departmentName}}</span>
                </div>
                <div class="rowSpanSub">
                  <span v-bind:class="{on:index == premisesTradingIdOn}" v-for="(item, index) in listGroupDeparement" @click="setPremisesTradingId(item, index)" >{{item.departmentName}}</span>
                </div>
              </div>
              
              <div style="padding-left:88px;">
                  <el-button type="primary" @click="searchAllFun" >查 询</el-button>
              </div>
            </div>
            <!--全部业主过滤器 end-->
            
            <!--全部业主数据 begin-->
            <div class="tableContent">
    
            <div class="miniPages">
                <my-pagination :total="countNum" :curr="pagination.curr" :pageChange="pageGo"></my-pagination>
            </div>
            
            <el-table :data="tableData" empty-text="暂无数据" header-row-class-name="headth" style="margin-top:20px;width:100%" v-loading.body="listLoading" element-loading-text="Loading" highlight-current-row>
                <el-table-column prop="contractNo" label="合同编号" >
                </el-table-column>
                <el-table-column prop="houseNo" label="房源编号" >
                </el-table-column>
                <el-table-column prop="personName" label="业主姓名" >
                </el-table-column>
                <el-table-column prop="mobile" label="业主手机" >
                </el-table-column>
                <el-table-column prop="rentStartDate" label="代理起始日" >
                </el-table-column>
                <el-table-column prop="rentEndDate" label="代理截止日" >
                </el-table-column>
                <el-table-column prop="houseName" label="物业地址" width="300" >
                </el-table-column>
            </el-table>
    
            <div class="footPages t_r" v-if="countNum != 0">
                <el-pagination @current-change="pageGo" :current-page="pagination.curr"  layout="prev, pager, next" :total="countNum"></el-pagination>
            </div>
    
            </div>
            <!--全部业主数据 end-->
          </el-tab-pane>
          <!--   --------------------------------- 全部业主 版块end -----------------------------------------------   -->

          <!--   --------------------------------- 我的业主 版块begin -----------------------------------------------   -->
          <el-tab-pane label="我的业主" v-if="myruleId" name="myowner">
              <!--全部业主过滤器 begin-->
            <div class="filterBox clearfix">
                <div class="row clearfix">
                  <ul class="clearfix">
                    <li><p class="name">业主姓名：</p><div class="input_box"><el-input v-model="personName" placeholder="请输入"></el-input></div></li>
                    <li><p class="name">业主手机：</p><div class="input_box"><el-input v-model="mobile" placeholder="请输入"></el-input></div></li>
                    <li><p class="name">合同编号：</p><div class="input_box"><el-input v-model="contractNo" placeholder="请输入"></el-input></div></li>
                    <li><p class="name">房源编号：</p><div class="input_box"><el-input v-model="houseNo" placeholder="请输入"></el-input></div></li>
                  </ul>
                </div>
                
                <div style="padding-left:88px;padding-top:10px;">
                    <el-button type="primary" @click="searchMyFun" >查 询</el-button>
                </div>
              </div>
              <!--全部业主过滤器 end-->
              
              <!--全部业主数据 begin-->
              <div class="tableContent">
      
              <div class="miniPages">
                  <my-pagination :total="countNumMy" :curr="paginationMy.curr" :pageChange="pageGoMy"></my-pagination>
              </div>
              
              <el-table :data="tableData" empty-text="暂无数据" header-row-class-name="headth" style="margin-top:20px;width:100%" v-loading.body="listLoading" element-loading-text="Loading" highlight-current-row>
                  <el-table-column prop="contractNo" label="合同编号" >
                  </el-table-column>
                  <el-table-column prop="houseNo" label="房源编号" >
                  </el-table-column>
                  <el-table-column prop="personName" label="业主姓名" >
                  </el-table-column>
                  <el-table-column prop="mobile" label="业主手机" >
                  </el-table-column>
                  <el-table-column prop="rentStartDate" label="代理起始日" >
                  </el-table-column>
                  <el-table-column prop="rentEndDate" label="代理截止日" >
                  </el-table-column>
                  <el-table-column prop="houseName" label="物业地址" width="300">
                  </el-table-column>
              </el-table>
      
              <div class="footPages t_r" v-if="countNumMy != 0">
                  <el-pagination @current-change="pageGoMy" :current-page="paginationMy.curr"  layout="prev, pager, next" :total="countNumMy"></el-pagination>
              </div>
      
              </div>
              <!--全部业主数据 end-->
          </el-tab-pane>
      </el-tabs>
  </div>
</template>

<script>
import { getlistAreaDeparement, getlistGroupDeparement, getAllcount, getOwnerList, getcountMy, getMyOwnerList } from '@/api/ownermanage'
import { mapGetters } from 'vuex'

export default {
  name: 'ownermanage',
  data() {
    return {
      userId: null, // 用户userId
      myruleId: false, // 判断我的业主是否有权限显示出来
      activeName: 'allowner', // 初始栏目(全部业主)
      listLoading: true, // 数据是否加载完成
      premisesAreaIdOn: -1, // 默认责任区域选中 "全部 "
      premisesTradingIdOn: null, // 默认责任区域子业务组选中 为空
      tableData: [], // 表格数据
      listAreaDeparement: [], // 责任区域大区
      listGroupDeparement: [], // 子业务组
      pagination: {
        curr: 1, // 当前索引
        pageSize: 10 // 每页显示条数
      },
      countNum: 0, // 默认数据(全部业主)总数为0
      paginationMy: {
        curr: 1, // 当前索引
        pageSize: 10 // 每页显示条数
      },
      countNumMy: 0, // 默认数据(我的业主)总数为0
      personName: '', // 业主姓名
      mobile: '', // 业主手机
      contractNo: '', // 合同编号
      houseNo: '', // 房源编号
      areaDepartmentId: null, // 区域id
      groupDepartmentId: null // 商圈id
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ]),
    // 获取总数(全部业主)
    filterForm() {
      return {
        userId: this.userId,
        personName: this.personName,
        mobile: this.mobile,
        contractNo: this.contractNo,
        houseNo: this.houseNo,
        areaDepartmentId: this.areaDepartmentId,
        groupDepartmentId: this.groupDepartmentId
      }
    },
    // 获取总数后请求数据参数数组(全部业主)
    searchForm() {
      return {
        userId: this.userId,
        personName: this.personName,
        mobile: this.mobile,
        contractNo: this.contractNo,
        houseNo: this.houseNo,
        areaDepartmentId: this.areaDepartmentId,
        groupDepartmentId: this.groupDepartmentId,
        pageIndex: this.pagination.curr - 1,
        pageSize: this.pagination.pageSize
      }
    },
    // 获取总数(我的业主)
    filterFormMy() {
      return {
        userId: this.userId, // 测试用226，正式上 this.userId
        personName: this.personName,
        mobile: this.mobile,
        contractNo: this.contractNo,
        houseNo: this.houseNo
      }
    },
    // 获取数据(我的业主)
    searchFormMy() {
      return {
        userId: this.userId,
        personName: this.personName,
        mobile: this.mobile,
        contractNo: this.contractNo,
        houseNo: this.houseNo,
        pageIndex: this.paginationMy.curr - 1,
        pageSize: this.paginationMy.pageSize
      }
    }
  },
  created() {
    // 获取全局变量userId
    this.userId = this.$store.getters.userId
    // 验证是否有权限展示'我的业主'
    this.checkshowmyownerFun()

    // 初始进来请求数据
    this.listAreaDeparementFun()
    this.getAllcountFun()
    this.fetchData()
  },
  methods: {
    // 验证是否有权限展示'我的业主'
    checkshowmyownerFun() {
      for (var z = 0; z < this.$store.getters.roles.length; z++) {
        if (this.$store.getters.roles[z] == '4') {
          this.myruleId = true
          break
        } else {
          this.myruleId = false
        }
      }
    },
    // 切换选项卡
    handleClick(tab, event, name) {
      this.personName = '' // 业主姓名
      this.mobile = '' // 业主手机
      this.contractNo = '' // 合同编号
      this.houseNo = '' // 房源编号
      this.areaDepartmentId = null // 区域id
      this.groupDepartmentId = null // 商圈id
      if (tab.name === 'allowner') {
        // 清除选中状态
        this.listGroupDeparement = [] // 清空子业务组数据
        this.premisesAreaIdOn = -1 // 默认责任区域选中 "全部 "
        this.premisesTradingIdOn = null // 默认责任区域子业务组选中 为空
        // 清除页码
        this.pagination.curr = 1 // 当前索引
        this.pagination.pageSize = 10 // 每页显示条数
        this.countNum = 0 // 默认数据(全部商机)总数为0
        // 打包查询总数及表格数据
        this.getAllcountFun()
        this.fetchData()
      } else if (tab.name === 'myowner') {
        // 清除页码
        this.paginationMy.curr = 1 // 当前索引
        this.paginationMy.pageSize = 10 // 每页显示条数
        this.countNumMy = 0 // 默认数据(我的商机)总数为0

        // 打包查询(我的业主)总数及表格数据
        this.getcountMyFun()
        this.fetchMyData()
      }
    },
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
    // 点击获取子业务组并设置选中状态(完成)
    clicklistGroupDeparement(item, index) {
      this.premisesAreaIdOn = index // 选中当前大区
      this.premisesTradingIdOn = null // 清空子业务组选中项
      if (index === -1) {
        this.listGroupDeparement = [] // 清空子业务组数据
        this.premisesTradingIdOn = null // 清空子业务组选中项
        this.areaDepartmentId = null
      } else {
        this.areaDepartmentId = item.id
        getlistGroupDeparement({
          userId: this.userId,
          parentId: item.id
        }).then(response => {
          this.listGroupDeparement = response.data.departments
        }).catch(err => {
          console.log(err)
        })
      }
      this.groupDepartmentId = null // 子业务组永恒为空
    },
    // 设置区域内子业务组(完成)
    setPremisesTradingId(item, index) {
      this.premisesTradingIdOn = index
      this.groupDepartmentId = item.id
    },
    // 获取数据总条数(完成)
    getAllcountFun() {
      getAllcount(this.filterForm).then(response => {
        this.countNum = response.data.count
      }).catch(err => {
        console.log(err)
      })
    },
    // 请求表格数据(完成)
    fetchData() {
      this.listLoading = true
      getOwnerList(this.searchForm).then(response => {
        this.tableData = response.data.proprietors
        this.listLoading = false
      }).catch(err => {
        console.log(err)
      })
    },
    // 分页请求数据
    pageGo(val) {
      if (val === this.pagination.curr) {
        return
      }
      this.pagination.curr = val
      this.fetchData()
    },
    // 点击查询全部业主
    searchAllFun() {
      this.getAllcountFun()
      this.fetchData()
    },
    // 获取数据总条数(我的商机)
    getcountMyFun() {
      getcountMy(this.filterFormMy).then(response => {
        this.countNumMy = response.data.count
      }).catch(err => {
        console.log(err)
      })
    },
    // 请求表格数据(我的商机)
    fetchMyData() {
      this.listLoading = true
      getMyOwnerList(this.searchFormMy).then(response => {
        this.tableData = response.data.proprietors
        this.listLoading = false
      }).catch(err => {
        console.log(err)
      })
    },
    pageGoMy(val) {
      if (val === this.paginationMy.curr) {
        return
      }
      this.paginationMy.curr = val
      this.fetchMyData()
    },
    // 点击查询我的业主
    searchMyFun() {
      this.getcountMyFun()
      this.fetchMyData()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.ownermanage-container {
  padding: 15px;
}
.filterBox {
    width: 100%;
    padding: 15px;
    border-bottom: 10px solid #f2f4f8;
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
          width:25%;float: left;
          .name {width: 88px;float: left;line-height: 30px;}
          .input_box {margin: 0 18px 0 88px;}
        }
      }

    }
}
</style>