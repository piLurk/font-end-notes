<template>
    <div class="business-container">
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <!--   --------------------------------- 全部商机 版块begin -----------------------------------------------   -->
        <el-tab-pane label="全部商机" name="allbusiness">
          <!--全部商机过滤器 begin-->
          <div class="filterBox clearfix">
            <div class="row clearfix">
              <div class="rowName">跟进状态</div>
              <div class="rowSpan">
                <span v-bind:class="{on:listStatOn == -1}" @click="setMsgStat('全部', -1, 'allbusiness')" >全部</span>
                <span v-for="(item, index) in listStat" v-bind:class="{on:index==listStatOn}" @click="setMsgStat(item, index, 'allbusiness')">{{item.dicName}}</span>
              </div>
            </div>
  
            <div class="row clearfix">
              <div class="rowName">信息来源</div>
              <div class="rowSpan">
                <span v-bind:class="{on:listSourceOn == -1}" @click="setSource('全部',-1,'allbusiness')">全部</span>
                <span v-for="(item, index) in listSource" v-bind:class="{on:index==listSourceOn}" @click="setSource(item, index,'allbusiness')">{{item.dicName}}</span>
              </div>
            </div>
  
            <div class="row clearfix">
              <div class="rowName">创建时间</div>
              <div class="rowSpan">
                <span v-bind:class="{on:dateTypeOn == '4'}" @click="setdateType('4','allbusiness')">全部</span>
                <span v-bind:class="{on:dateTypeOn == '0'}" @click="setdateType('0','allbusiness')">本周</span>
                <span v-bind:class="{on:dateTypeOn == '1'}" @click="setdateType('1','allbusiness')">本月</span>
                <span v-bind:class="{on:dateTypeOn == '2'}" @click="setdateType('2','allbusiness')">今天</span>
                <span v-bind:class="{on:dateTypeOn == '3'}" @click="setdateType('3','allbusiness')">昨天</span>
              </div>
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
  
          </div>
          <!--全部商机过滤器 end-->
          
          <!--全部商机数据 begin-->
          <div class="tableContent">
  
          <div class="miniPages">
              <my-pagination :total="countNum" :curr="pagination.curr" :pageChange="pageGo"></my-pagination>
          </div>
          
          <el-table :data="tableData" empty-text="暂无数据" header-row-class-name="headth" style="margin-top:20px;width:100%" v-loading.body="listLoading" element-loading-text="Loading" highlight-current-row>
              <el-table-column prop="proprietorName" label="姓名" width="120">
              </el-table-column>
              <el-table-column prop="contactTel" label="联系方式" width="120">
              </el-table-column>
              <el-table-column prop="premisesName" label="房源地址">
              </el-table-column>
              <el-table-column label="备注">
                <template slot-scope="scope">
                    <el-tooltip effect="dark" placement="top-start">
                      <div slot="content" style="width:100%;">{{scope.row.housingDescribe}}</div>
                      <div style="white-space: nowrap;text-overflow: ellipsis;overflow: hidden;">{{scope.row.housingDescribe}}</div>
                    </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column prop="source" label="信息来源" width="140">
              </el-table-column>
              <el-table-column prop="gmtCreate" label="提交时间" width="170">
              </el-table-column>
              <el-table-column label="跟进状态" width="120">
                  <template slot-scope="scope">
                      <span v-if="scope.row.msgStat == 1">未跟进</span>
                      <span v-if="scope.row.msgStat == 2">去电</span>
                      <span v-if="scope.row.msgStat == 3">实勘</span>
                      <span v-if="scope.row.msgStat == 4">结束</span>
                      <span v-if="scope.row.msgStat == 5">签约</span>
                  </template>
              </el-table-column>
              <el-table-column prop="userCreate" label="管家" width="120">
              </el-table-column>
              <el-table-column label="是否超时" width="80" >
                  <template slot-scope="scope">
                      <span v-if="scope.row.remark == 2">是</span>
                      <span v-else>否</span>
                  </template>
              </el-table-column>
              <el-table-column label="本小区房源" width="100">
                  <template slot-scope="scope">
                      {{scope.row.houseCount}} 套
                  </template>
              </el-table-column>
          </el-table>
  
          <div class="footPages t_r" v-if="countNum != 0">
              <el-pagination @current-change="pageGo" :current-page="pagination.curr"  layout="prev, pager, next" :total="countNum"></el-pagination>
          </div>
  
          </div>
          <!--全部商机数据 end-->
        </el-tab-pane>
        <!--   --------------------------------- 全部商机 版块end -----------------------------------------------   -->
  
        <!--   --------------------------------- 我的商机 版块begin -----------------------------------------------   -->
        <el-tab-pane label="我的商机" v-if="myruleId" name="mybusiness">
          <!--我的商机过滤器 begin-->
          <div class="filterBox clearfix">
              <div class="row clearfix">
                <div class="rowName">跟进状态</div>
                <div class="rowSpan">
                  <span v-bind:class="{on:listStatOn == -1}" @click="setMsgStat('全部', -1, 'mybusiness')" >全部</span>
                  <span v-for="(item, index) in listStat" v-bind:class="{on:index==listStatOn}" @click="setMsgStat(item, index, 'mybusiness')">{{item.dicName}}</span>
                </div>
              </div>
    
              <div class="row clearfix">
                <div class="rowName">信息来源</div>
                <div class="rowSpan">
                  <span v-bind:class="{on:listSourceOn == -1}" @click="setSource('全部',-1,'mybusiness')">全部</span>
                  <span v-for="(item, index) in listSource" v-bind:class="{on:index==listSourceOn}" @click="setSource(item, index,'mybusiness')">{{item.dicName}}</span>
                </div>
              </div>
    
              <div class="row clearfix">
                <div class="rowName">创建时间</div>
                <div class="rowSpan">
                  <span v-bind:class="{on:dateTypeOn == '4'}" @click="setdateType('4','mybusiness')">全部</span>
                  <span v-bind:class="{on:dateTypeOn == '0'}" @click="setdateType('0','mybusiness')">本周</span>
                  <span v-bind:class="{on:dateTypeOn == '1'}" @click="setdateType('1','mybusiness')">本月</span>
                  <span v-bind:class="{on:dateTypeOn == '2'}" @click="setdateType('2','mybusiness')">今天</span>
                  <span v-bind:class="{on:dateTypeOn == '3'}" @click="setdateType('3','mybusiness')">昨天</span>
                </div>
              </div>
    
            </div>
            <!--我的商机过滤器 end-->
  
            <!--我的商机数据 begin-->
            <div class="tableContent">
              
              <div class="miniPages">
                  <my-pagination :total="countNumMy" :curr="paginationMy.curr" :pageChange="pageGoMy"></my-pagination>
              </div>
              
              <el-table :data="tableData" empty-text="暂无数据" header-row-class-name="headth" style="margin-top:20px;width:100%" v-loading.body="listLoading" element-loading-text="Loading" highlight-current-row>
                  <el-table-column prop="proprietorName" label="姓名" width="120">
                  </el-table-column>
                  <el-table-column prop="contactTel" label="联系方式" width="120">
                  </el-table-column>
                  <el-table-column prop="premisesName" label="房源地址">
                  </el-table-column>
                  <el-table-column label="备注">
                    <template slot-scope="scope">
                        <el-tooltip effect="dark" placement="top-start">
                          <div slot="content" style="width:100%;">{{scope.row.housingDescribe}}</div>
                          <div style="white-space: nowrap;text-overflow: ellipsis;overflow: hidden;">{{scope.row.housingDescribe}}</div>
                        </el-tooltip>
                    </template>
                  </el-table-column>
                  <el-table-column prop="source" label="信息来源" width="140">
                  </el-table-column>
                  <el-table-column prop="gmtCreate" label="提交时间" width="170">
                  </el-table-column>
                  <el-table-column label="跟进状态" width="120">
                      <template slot-scope="scope">
                          <span v-if="scope.row.msgStat == 1">未跟进</span>
                          <span v-if="scope.row.msgStat == 2">去电</span>
                          <span v-if="scope.row.msgStat == 3">实勘</span>
                          <span v-if="scope.row.msgStat == 4">结束</span>
                          <span v-if="scope.row.msgStat == 5">签约</span>
                      </template>
                  </el-table-column>
                  <el-table-column prop="userCreate" label="管家" width="120">
                  </el-table-column>
                  <el-table-column label="是否超时" width="80" >
                      <template slot-scope="scope">
                          <span v-if="scope.row.remark == 2">是</span>
                          <span v-else>否</span>
                      </template>
                  </el-table-column>
                  <el-table-column label="本小区房源" width="100">
                      <template slot-scope="scope">
                          {{scope.row.houseCount}} 套
                      </template>
                  </el-table-column>
              </el-table>
      
              <div class="footPages t_r" v-if="countNumMy != 0">
                  <el-pagination @current-change="pageGoMy" :current-page="paginationMy.curr"  layout="prev, pager, next" :total="countNumMy"></el-pagination>
              </div>
      
            </div>
            <!--我的商机数据 end-->
  
        </el-tab-pane>
        <!--   --------------------------------- 我的商机 版块end -----------------------------------------------   -->
  
      </el-tabs>
    </div>
  </template>
  
  <script>
  import { getlistStat, getlistSource, getlistAreaDeparement, getlistGroupDeparement, getAllcount, getBusinessList, getcountMy, getMyBusinessList } from '@/api/business'
  import { mapGetters } from 'vuex'
  
  export default {
    name: 'business',
    data() {
      return {
        userId: null, // 用户userId
        myruleId: false, // 判断我的商机是否有权限显示出来
        activeName: 'allbusiness', // 初始栏目(全部商机)
        listLoading: true, // 数据是否加载完成
        listStatOn: -1, // 默认跟进状态选中 "全部 "
        listSourceOn: -1, // 默认信息来源选中 "全部 "
        dateTypeOn: '4', // 默认创建时间选中 "全部 "
        premisesAreaIdOn: -1, // 默认责任区域选中 "全部 "
        premisesTradingIdOn: null, // 默认责任区域子业务组选中 为空
        tableData: [], // 表格数据
        listStat: [], // 跟进状态
        listSource: [], // 信息来源
        listAreaDeparement: [], // 责任区域大区
        listGroupDeparement: [], // 子业务组
        pagination: {
          curr: 1, // 当前索引
          pageSize: 10 // 每页显示条数
        },
        countNum: 0, // 默认数据(全部商机)总数为0
        paginationMy: {
          curr: 1, // 当前索引
          pageSize: 10 // 每页显示条数
        },
        countNumMy: 0, // 默认数据(我的商机)总数为0
        msgStat: '', // 跟进状态
        source: '', // 信息来源
        areaDepartmentId: null, // 区域id
        groupDepartmentId: null, // 商圈id
        searchWord: '', // 搜索关键字
        dateType: '4' // 日期类型(默认为全部)
      }
    },
    computed: {
      ...mapGetters([
        'name',
        'roles'
      ]),
      // 获取总数(全部商机)
      filterForm() {
        return {
          userId: this.userId, // 当前用户id
          msgStat: this.msgStat, // 跟进状态
          source: this.source, // 信息来源
          areaDepartmentId: this.areaDepartmentId, // 区域id
          groupDepartmentId: this.groupDepartmentId, // 商圈id
          searchWord: this.searchWord, // 搜索关键字
          dateType: this.dateType // 日期类型(默认为全部)
        }
      },
      // 获取总数后请求数据参数数组(全部商机)
      searchForm() {
        return {
          userId: this.userId,
          msgStat: this.msgStat,
          source: this.source,
          areaDepartmentId: this.areaDepartmentId,
          groupDepartmentId: this.groupDepartmentId,
          searchWord: this.searchWord,
          dateType: this.dateType,
          pageIndex: this.pagination.curr - 1,
          pageSize: this.pagination.pageSize
        }
      },
      // 获取总数(我的商机)
      filterFormMy() {
        return {
          userId: this.userId, // 测试用44，正式上 this.userId
          source: this.source,
          msgStat: this.msgStat,
          searchWord: this.searchWord,
          dateType: this.dateType
        }
      },
      // 获取数据(我的商机)
      searchFormMy() {
        return {
          userId: this.userId,
          source: this.source,
          msgStat: this.msgStat,
          searchWord: this.searchWord,
          dateType: this.dateType,
          pageIndex: this.paginationMy.curr - 1,
          pageSize: this.paginationMy.pageSize
        }
      }
    },
    created() {
      // 获取全局变量userId
      this.userId = this.$store.getters.userId

      // 验证是否有权限展示'我的商机'
      this.checkshowmybusinessFun()
      // 初始进来请求数据
      this.listStatFun()
      this.listSourceFun()
      this.listAreaDeparementFun()
      this.getAllcountFun()
      this.fetchData()
    },
    methods: {
      // 验证是否有权限展示'我的商机'
      checkshowmybusinessFun() {
        for (var z = 0; z < this.$store.getters.roles.length; z++) {
          if (this.$store.getters.roles[z] == '2' || this.$store.getters.roles[z] == '4') {
            this.myruleId = true
            break
          } else {
            this.myruleId = false
          }
        }
      },
      // 切换选项卡
      handleClick(tab, event, name) {
        // 清除选中状态
        this.listStatOn = -1 // 默认跟进状态选中 "全部 "
        this.listSourceOn = -1 // 默认信息来源选中 "全部 "
        this.dateTypeOn = '4' // 默认创建时间选中 "全部 "
  
        // 清空全部商机查询数据
        this.msgStat = '' // 跟进状态
        this.source = '' // 数据来源
        this.areaDepartmentId = null // 区域Id
        this.groupDepartmentId = null // 商圈Id
        this.searchWord = '' // 搜索关键字
        this.dateType = '4' // 日期类型(默认为全部)
  
        if (tab.name === 'allbusiness') {
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
        } else if (tab.name === 'mybusiness') {
          // 清除页码
          this.paginationMy.curr = 1 // 当前索引
          this.paginationMy.pageSize = 10 // 每页显示条数
          this.countNumMy = 0 // 默认数据(我的商机)总数为0
  
          // 打包查询(我的商机)总数及表格数据
          this.getcountMyFun()
          this.fetchMyData()
        }
      },
      // 获取跟进状态(完成)
      listStatFun() {
        getlistStat({
          userId: this.userId
        }).then(response => {
          this.listStat = response.data.stats
        }).catch(err => {
          console.log(err)
        })
      },
      // 获取信息来源(完成)
      listSourceFun() {
        getlistSource({
          userId: this.userId
        }).then(response => {
          this.listSource = response.data.sources
        }).catch(err => {
          console.log(err)
        })
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
        // 打包查询总数及表格数据
        this.getAllcountFun()
        this.fetchData()
      },
      // 设置区域内子业务组(完成)
      setPremisesTradingId(item, index) {
        this.premisesTradingIdOn = index
        this.groupDepartmentId = item.id
        // 打包查询总数及表格数据
        this.getAllcountFun()
        this.fetchData()
      },
      // 设置跟进状态(完成)
      setMsgStat(item, index, fromTab) {
        this.listStatOn = index
        if (index === -1) {
          this.msgStat = ''
        } else {
          this.msgStat = item.dicCode
        }
  
        if (fromTab === 'allbusiness') {
          // 打包查询总数及表格数据
          this.getAllcountFun()
          this.fetchData()
        } else if (fromTab === 'mybusiness') {
          // 打包查询(我的商机)总数及表格数据
          this.getcountMyFun()
          this.fetchMyData()
        }
      },
      // 设置信息来源(完成)
      setSource(item, index, fromTab) {
        this.listSourceOn = index
        if (index === -1) {
          this.source = ''
        } else {
          this.source = item.dicCode
        }
        if (fromTab === 'allbusiness') {
          // 打包查询总数及表格数据
          this.getAllcountFun()
          this.fetchData()
        } else if (fromTab === 'mybusiness') {
          // 打包查询(我的商机)总数及表格数据
          this.getcountMyFun()
          this.fetchMyData()
        }
      },
      // 设置创建时间(完成)
      setdateType(num, fromTab) {
        this.dateTypeOn = num
        this.dateType = num
        if (fromTab === 'allbusiness') {
          // 打包查询总数及表格数据
          this.getAllcountFun()
          this.fetchData()
        } else if (fromTab === 'mybusiness') {
          // 打包查询(我的商机)总数及表格数据
          this.getcountMyFun()
          this.fetchMyData()
        }
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
        getBusinessList(this.searchForm).then(response => {
          this.tableData = response.data.offcialProprietorBespeaks
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
        getMyBusinessList(this.searchFormMy).then(response => {
          this.tableData = response.data.offcialProprietorBespeaks
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
      }
    }
  }
  </script>
  
  <style rel="stylesheet/scss" lang="scss" scoped>
  .business-container {
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
    }
  }
  </style>
  