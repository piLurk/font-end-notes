<template>
  <div class="clue-container">
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <!--   --------------------------------- 全部线索 版块begin -----------------------------------------------   -->
      <el-tab-pane label="全部线索" name="allclue">
        <!--全部线索过滤器 begin-->
        <div class="filterBox clearfix">
          <div class="row clearfix">
            <div class="rowName">跟进状态</div>
            <div class="rowSpan">
              <span v-bind:class="{on:listStatOn == -1}" @click="setbespeakType('全部', -1, 'allclue')">全部</span>
              <span v-for="(item, index) in listStat" v-bind:class="{on:index==listStatOn}" @click="setbespeakType(item, index, 'allclue')">{{item.dicName}}</span>
            </div>
          </div>

          <div class="row clearfix">
            <div class="rowName">信息来源</div>
            <div class="rowSpan">
              <span v-bind:class="{on:listSourceOn == -1}" @click="setSource('全部',-1,'allclue')">全部</span>
              <span v-for="(item, index) in listSource" v-bind:class="{on:index==listSourceOn}" @click="setSource(item, index,'allclue')">{{item.dicName}}</span>
            </div>
          </div>

          <div class="row clearfix">
            <div class="rowName">创建时间</div>
            <div class="rowSpan">
              <span v-bind:class="{on:dateTypeOn == '4'}" @click="setdateType('4','allclue')">全部</span>
              <span v-bind:class="{on:dateTypeOn == '0'}" @click="setdateType('0','allclue')">本周</span>
              <span v-bind:class="{on:dateTypeOn == '1'}" @click="setdateType('1','allclue')">本月</span>
              <span v-bind:class="{on:dateTypeOn == '2'}" @click="setdateType('2','allclue')">今天</span>
              <span v-bind:class="{on:dateTypeOn == '3'}" @click="setdateType('3','allclue')">昨天</span>
            </div>
          </div>

          <div class="row clearfix">
            <div class="rowName">责任区域</div>
            <div class="rowSpan">
              <span v-bind:class="{on:premisesAreaIdOn == -1}" @click="clicklistGroupDeparement('全部',-1)">全部</span>
              <span v-for="(item, index) in listAreaDeparement" v-bind:class="{on:index==premisesAreaIdOn}" @click="clicklistGroupDeparement(item, index)">{{item.departmentName}}</span>
            </div>
            <div class="rowSpanSub">
              <span v-bind:class="{on:index == premisesTradingIdOn}" v-for="(item, index) in listGroupDeparement" @click="setPremisesTradingId(item, index)">{{item.departmentName}}</span>
            </div>
          </div>

        </div>
        <!--全部线索过滤器 end-->

        <!--全部线索数据 begin-->
        <div class="tableContent">

          <div class="miniPages">
            <my-pagination :total="countNum" :curr="pagination.curr" :pageChange="pageGo"></my-pagination>
          </div>

          <el-table :data="tableData" empty-text="暂无数据" header-row-class-name="headth" style="margin-top:20px;width:100%" v-loading.body="listLoading"
            element-loading-text="Loading" highlight-current-row>
            <el-table-column label="姓名" width="120">
              <template slot-scope="scope">
                <a @click="detail(scope.row.id)" href="javascript:void(0)" style="color: rgb(59, 160, 255);">{{scope.row.renterName}}</a>
                <!-- :to="{ name: 'ClueTenantsDetail', params: { userId: scope.row.housingId}}" -->
              </template>
            </el-table-column>
            <el-table-column prop="contactTel" label="联系方式" width="120">
            </el-table-column>
            <el-table-column prop="housingName" label="房源地址">
            </el-table-column>
            <el-table-column label="备注">
              <template slot-scope="scope">
                <el-tooltip effect="dark" placement="top-start">
                  <div slot="content" style="width:100%;">{{scope.row.demandDescribe}}</div>
                  <div style="white-space: nowrap;text-overflow: ellipsis;overflow: hidden;">{{scope.row.demandDescribe}}</div>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column prop="source" label="信息来源" width="140">
            </el-table-column>
            <el-table-column prop="gmtCreate" label="提交时间" width="170">
            </el-table-column>
            <el-table-column label="跟进状态" width="120">
              <template slot-scope="scope">
                <span v-if="scope.row.bespeakType == '1'">去电</span>
                <span v-else-if="scope.row.bespeakType == '2'">带看</span>
                <span v-else-if="scope.row.bespeakType == '3'">结束</span>
                <span v-else-if="scope.row.bespeakType == '4'">签约</span>
                <span v-else >未跟进</span>
              </template>
            </el-table-column>
            <el-table-column prop="userCreate" label="管家" width="120">
            </el-table-column>
            <el-table-column label="是否超时" width="80">
              <template slot-scope="scope">
                <span v-if="scope.row.remark == 2">是</span>
                <span v-else>否</span>
              </template>
            </el-table-column>
          </el-table>

          <div class="footPages t_r" v-if="countNum != 0">
            <el-pagination @current-change="pageGo" :current-page="pagination.curr" layout="prev, pager, next" :total="countNum"></el-pagination>
          </div>

        </div>
        <!--全部线索数据 end-->
      </el-tab-pane>
      <!--   --------------------------------- 全部线索 版块end -----------------------------------------------   -->

      <!--   --------------------------------- 我的线索 版块begin -----------------------------------------------   -->
      <el-tab-pane label="我的线索" v-if="myruleId" name="myclue">
        <!--我的线索过滤器 begin-->
        <div class="filterBox clearfix">
          <div class="row clearfix">
            <div class="rowName">跟进状态</div>
            <div class="rowSpan">
              <span v-bind:class="{on:listStatOn == -1}" @click="setbespeakType('全部', -1, 'myclue')">全部</span>
              <span v-for="(item, index) in listStat" v-bind:class="{on:index==listStatOn}" @click="setbespeakType(item, index, 'myclue')">{{item.dicName}}</span>
            </div>
          </div>

          <div class="row clearfix">
            <div class="rowName">信息来源</div>
            <div class="rowSpan">
              <span v-bind:class="{on:listSourceOn == -1}" @click="setSource('全部',-1,'myclue')">全部</span>
              <span v-for="(item, index) in listSource" v-bind:class="{on:index==listSourceOn}" @click="setSource(item, index,'myclue')">{{item.dicName}}</span>
            </div>
          </div>

          <div class="row clearfix">
            <div class="rowName">创建时间</div>
            <div class="rowSpan">
              <span v-bind:class="{on:dateTypeOn == '4'}" @click="setdateType('4','myclue')">全部</span>
              <span v-bind:class="{on:dateTypeOn == '0'}" @click="setdateType('0','myclue')">本周</span>
              <span v-bind:class="{on:dateTypeOn == '1'}" @click="setdateType('1','myclue')">本月</span>
              <span v-bind:class="{on:dateTypeOn == '2'}" @click="setdateType('2','myclue')">今天</span>
              <span v-bind:class="{on:dateTypeOn == '3'}" @click="setdateType('3','myclue')">昨天</span>
            </div>
          </div>

        </div>
        <!--我的线索过滤器 end-->

        <!--我的线索数据 begin-->
        <div class="tableContent">

          <div class="miniPages">
            <my-pagination :total="countNumMy" :curr="paginationMy.curr" :pageChange="pageGoMy"></my-pagination>
          </div>

          <el-table :data="tableData" empty-text="暂无数据" header-row-class-name="headth" style="margin-top:20px;width:100%" v-loading.body="listLoading"
            element-loading-text="Loading" highlight-current-row>
            <el-table-column prop="renterName" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="contactTel" label="联系方式" width="120">
            </el-table-column>
            <el-table-column prop="housingName" label="房源地址">
            </el-table-column>
            <el-table-column label="备注">
              <template slot-scope="scope">
                <el-tooltip effect="dark" placement="top-start">
                  <div slot="content" style="width:100%;">{{scope.row.demandDescribe}}</div>
                  <div style="white-space: nowrap;text-overflow: ellipsis;overflow: hidden;">{{scope.row.demandDescribe}}</div>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column prop="source" label="信息来源" width="180">
            </el-table-column>
            <el-table-column prop="gmtCreate" label="提交时间" width="180">
            </el-table-column>
            <el-table-column label="跟进状态" width="120">
              <template slot-scope="scope">
                <span v-if="scope.row.bespeakType == '1'">去电</span>
                <span v-else-if="scope.row.bespeakType == '2'">带看</span>
                <span v-else-if="scope.row.bespeakType == '3'">结束</span>
                <span v-else-if="scope.row.bespeakType == '4'">签约</span>
                <span v-else >未跟进</span>
              </template>
            </el-table-column>
            <el-table-column prop="userCreate" label="管家" width="120">
            </el-table-column>
            <el-table-column label="是否超时" width="80">
              <template slot-scope="scope">
                <span v-if="scope.row.remark == 2">是</span>
                <span v-else>否</span>
              </template>
            </el-table-column>
          </el-table>

          <div class="footPages t_r" v-if="countNumMy != 0">
            <el-pagination @current-change="pageGoMy" :current-page="paginationMy.curr" layout="prev, pager, next" :total="countNumMy"></el-pagination>
          </div>

        </div>
        <!--我的线索数据 end-->

      </el-tab-pane>
      <!--   --------------------------------- 我的线索 版块end -----------------------------------------------   -->

    </el-tabs>

  </div>
</template>

<script>
  import {
    getlistStat,
    getlistSource,
    getlistAreaDeparement,
    getlistGroupDeparement,
    getAllcount,
    getClueList,
    getcountMy,
    getMyClueList
  } from '@/api/clue'
  import {
    mapGetters
  } from 'vuex'

  export default {
    name: 'clue',
    data() {
      return {
        userId: null,
        myruleId: false, // 判断我的线索是否有权限显示出来
        activeName: 'allclue', // 初始栏目(全部线索)
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
        countNum: 0, // 默认数据(全部线索)总数为0
        paginationMy: {
          curr: 1, // 当前索引
          pageSize: 10 // 每页显示条数
        },
        countNumMy: 0, // 默认数据(我的线索)总数为0
        bespeakType: '', // 跟进状态
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
      // 获取总数(全部线索)
      filterForm() {
        return {
          userId: this.userId, // 当前用户id
          bespeakType: this.bespeakType, // 跟进状态
          source: this.source, // 信息来源
          areaDepartmentId: this.areaDepartmentId, // 区域id
          groupDepartmentId: this.groupDepartmentId, // 商圈id
          searchWord: this.searchWord, // 搜索关键字
          dateType: this.dateType // 日期类型(默认为全部)
        }
      },
      // 获取总数后请求数据参数数组(全部线索)
      searchForm() {
        return {
          userId: this.userId,
          bespeakType: this.bespeakType,
          source: this.source,
          areaDepartmentId: this.areaDepartmentId,
          groupDepartmentId: this.groupDepartmentId,
          searchWord: this.searchWord,
          dateType: this.dateType,
          pageIndex: this.pagination.curr - 1,
          pageSize: this.pagination.pageSize
        }
      },
      // 获取总数(我的线索)
      filterFormMy() {
        return {
          userId: this.userId, // 测试用177，正式上 this.userId
          source: this.source,
          bespeakType: this.bespeakType,
          searchWord: this.searchWord,
          dateType: this.dateType
        }
      },
      // 获取数据(我的线索)
      searchFormMy() {
        return {
          userId: this.userId,
          source: this.source,
          bespeakType: this.bespeakType,
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
      // 验证是否有权限展示'我的线索'
      this.checkshowmyclueFun()
      // 初始进来请求数据
      this.listStatFun()
      this.listSourceFun()
      this.listAreaDeparementFun()
      this.getAllcountFun()
      this.fetchData()
    },
    methods: {
      
      // 验证是否有权限展示'我的线索'
      checkshowmyclueFun() {
        for (var z = 0; z < this.$store.getters.roles.length; z++) {
          if (this.$store.getters.roles[z] == '5') {
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

        // 清空全部线索查询数据
        this.bespeakType = '' // 跟进状态
        this.source = '' // 数据来源
        this.areaDepartmentId = null // 区域Id
        this.groupDepartmentId = null // 商圈Id
        this.searchWord = '' // 搜索关键字
        this.dateType = '4' // 日期类型(默认为全部)

        if (tab.name === 'allclue') {
          // 清除选中状态
          this.listGroupDeparement = [] // 清空子业务组数据
          this.premisesAreaIdOn = -1 // 默认责任区域选中 "全部 "
          this.premisesTradingIdOn = null // 默认责任区域子业务组选中 为空
          // 清除页码
          this.pagination.curr = 1 // 当前索引
          this.pagination.pageSize = 10 // 每页显示条数
          this.countNum = 0 // 默认数据(全部线索)总数为0

          // 打包查询总数及表格数据
          this.getAllcountFun()
          this.fetchData()
        } else if (tab.name === 'myclue') {
          // 清除页码
          this.paginationMy.curr = 1 // 当前索引
          this.paginationMy.pageSize = 10 // 每页显示条数
          this.countNumMy = 0 // 默认数据(我的线索)总数为0

          // 打包查询(我的线索)总数及表格数据
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
      setbespeakType(item, index, fromTab) {
        this.listStatOn = index
        if (index === -1) {
          this.bespeakType = ''
        } else {
          this.bespeakType = item.dicCode
        }

        if (fromTab === 'allclue') {
          // 打包查询总数及表格数据
          this.getAllcountFun()
          this.fetchData()
        } else if (fromTab === 'myclue') {
          // 打包查询(我的线索)总数及表格数据
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
        if (fromTab === 'allclue') {
          // 打包查询总数及表格数据
          this.getAllcountFun()
          this.fetchData()
        } else if (fromTab === 'myclue') {
          // 打包查询(我的线索)总数及表格数据
          this.getcountMyFun()
          this.fetchMyData()
        }
      },
      // 设置创建时间(完成)
      setdateType(num, fromTab) {
        this.dateTypeOn = num
        this.dateType = num
        if (fromTab === 'allclue') {
          // 打包查询总数及表格数据
          this.getAllcountFun()
          this.fetchData()
        } else if (fromTab === 'myclue') {
          // 打包查询(我的线索)总数及表格数据
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
        getClueList(this.searchForm).then(response => {
          this.tableData = response.data.offcialRenterBespeaks
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
      // 获取数据总条数(我的线索)
      getcountMyFun() {
        getcountMy(this.filterFormMy).then(response => {
          this.countNumMy = response.data.count
        }).catch(err => {
          console.log(err)
        })
      },
      // 请求表格数据(我的线索)
      fetchMyData() {
        this.listLoading = true
        getMyClueList(this.searchFormMy).then(response => {
          this.tableData = response.data.offcialRenterBespeaks
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
      detail(id){
          this.$store.dispatch('itemArrAdd', {
          name: '租客线索详情',
          id: 'clueTenantsDetail',
          params: { id: id }
        })
      }
    }
  }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .clue-container {
    padding: 15px;
  }

  .filterBox {
    width: 100%;
    padding: 15px;
    border-bottom: 10px solid #f2f4f8;
    .row {
      width: 100%;
      line-height: 24px;
      font-size: 14px;
      color: #A3B2C6;
      padding: 5px 0;
      .rowName {
        width: 70px;
        float: left;
        margin: 5px 0;
      }
      .rowSpan {
        margin-left: 70px;
        span {
          // width: 100px;
          float: left;
          background-color: #f6f8f8;
          text-align: center;
          margin: 5px 0 5px 18px;
          cursor: pointer;
          padding: 0 15px;
        }
        span.on {
          background-color: #A3B2C6;
          color: #fff;
        }
      }
      .rowSpanSub {
        margin-left: 70px;
        clear: both;
        padding: 5px 0;
        height: 40px;
        span {
          // width: 100px;
          float: left;
          background-color: #f6f8f8;
          text-align: center;
          margin: 5px 0 5px 18px;
          cursor: pointer;
          padding: 0 15px;
        }
        span.on {
          background-color: #A3B2C6;
          color: #fff;
        }
      }
    }
  }

</style>
