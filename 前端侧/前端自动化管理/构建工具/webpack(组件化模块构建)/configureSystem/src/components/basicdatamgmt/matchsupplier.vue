<template>
  <div id="matchsupplier">
    <div class="searchfilter col4">
      <ul class="clearfix">
        <li>
          <p class="name">城区：</p>
          <div class="inpbox">
            <el-select v-model.trim="citySideName" filterable @change="citySideNameChange" placeholder="请选择">
              <el-option v-for="item in citySideNameOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </li>
        <li>
          <p class="name">商圈：</p>
          <div class="inpbox">
            <el-select v-model.trim="tradingArea" filterable placeholder="请选择">
              <el-option v-for="item in tradingAreaOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </li>
        <li>
          <p class="name">楼盘名称：</p>
          <div class="inpbox"><input type="text" @keydown.enter="keydownSearch" v-model.trim="buildingName" placeholder="请输入" class="inp" /></div>
        </li>
        <li class="btnbox">
          <input type="button" class="surebtn" @click="searchData" value="查询" />
          <input type="button" class="surebtn surereset" @click="reset" value="重置" />
        </li>
      </ul>
    </div>

    <!--数据列表 begin-->
    <div class="dataBox">
      <div class="toolBar clearfix">
        <div class="miniPages">
          <my-pagination :total="housesTotal" :curr="pagination.curr" :pageChange="pageGo"></my-pagination>
        </div>
      </div>
      <div class="tableBox">
        <table class="modtable tableLoading matchsupplierLoading" width="100%" border="0" cellpadding="0" cellspacing="0">
          <tr>
            <th width="80"></th>
            <th width="15%">城区</th>
            <th width="15%">商圈</th>
            <th>楼盘名称</th>
            <th width="200">操作</th>
          </tr>
          <no-data :visible="housesTotal"></no-data>
          <tr v-if="housesTotal">
            <td colspan="5">
              <table v-for="(item,index) in proGroup" :key="index" class="fortable" width="100%" border="0" cellpadding="0" cellspacing="0" :class="{ 'is-active' : activeId === item.buildingId }">
                <tr class="father">
                  <td class="clickbtn" width="80">
                    <img @click="showchildren(item)" v-show="activeId !== item.buildingId" src="/static/images/uptable.png" />
                    <img @click="showchildren(item)" v-show="activeId === item.buildingId" src="/static/images/downtable.png" />
                  </td>
                  <td width="15%">{{item.cityName}}</td>
                  <td width="15%">{{item.tradingArea}}</td>
                  <td>{{item.buildingName}}</td>
                  <td width="200">
                    <p class="typeControl">
                      <a v-if="hasPermission('PZ_addOrModifyAreaSupplier')" href="javascript:void(0)" class="a-btn mgr" @click="addSupplier(item)">
                        <i></i>添加</a>
                      <a v-if="hasPermission('PZ_addOrModifyAreaSupplier')" href="javascript:void(0)" class="c-btn" @click="copySupplier(item)">
                        <i></i>复制</a>
                    </p>
                  </td>
                </tr>
                <tr class="children">
                  <td colspan="5">
                    <div class="subDiv">
                      <table class="subTable" width="100%" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                          <th width="80">&nbsp;&nbsp;</th>
                          <th width="15%">序号</th>
                          <th width="15%">供应商类型</th>
                          <th>供应商编码</th>
                          <th>供应商名称</th>
                          <th width="200">操作</th>
                        </tr>
                        <tr v-if="item.providerVos.length===0">
                          <td colspan="20" style="line-height:50px;">没有数据</td>
                        </tr>
                        <tr v-for="(supp,index2) in item.providerVos" :key="index2">
                          <td>&nbsp;&nbsp;</td>
                          <td>{{index2+1}}</td>
                          <td>{{supp.providerTypeName}}</td>
                          <td>{{supp.proNumber}}</td>
                          <td>{{supp.proName}}</td>
                          <td>
                            <p class="typeControl">
                              <a v-if="hasPermission('PZ_addOrModifyAreaSupplier')" href="javascript:void(0)" class="d-btn mgr" @click="deleteSupplier(supp,item)">
                                <i></i>删除</a>
                              <a v-if="hasPermission('PZ_addOrModifyAreaSupplier')" href="javascript:void(0)" class="r-btn" @click="changeSupplier(supp,item)">
                                <i></i>更换</a>
                            </p>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </div>
      <div class="footPages">
        <el-pagination @current-change="pageGo" :current-page="pagination.curr" layout="prev, pager, next" :total="housesTotal"></el-pagination>
      </div>
    </div>
    <!--数据列表 end-->

    <!--添加供应商 begin-->
    <el-dialog :close-on-click-modal="false" :visible.sync="dialogFormVisible" size="small" top="15%" @open="beforeOpen" @close="beforeClose">
      <h3 slot="title" class="el-dialog__title">{{isChangeSupplier ? '更换' : '添加'}}供应商</h3>
      <el-form>
        <!--检索表头 begin-->
        <div class="searchfilter">
          <ul class="clearfix">
            <li>
              <p class="name">供应商类别：</p>
              <div class="inpbox">
                <el-select v-model.trim="addProSortValue" filterable :disabled="isChangeSupplier" @change="supplierChange" placeholder="请选择">
                  <el-option v-for="item in [{label: '全部', id: ''}, ...proSortOptions]" :key="item.id" :label="item.label" :value="item.id">
                  </el-option>
                </el-select>
              </div>
            </li>
            <li>
              <p class="name">供应商名称：</p>
              <div class="inpbox"><input type="text" v-model.trim="addSupplierName" placeholder="请输入" class="inp" /></div>
            </li>
            <li class="btnbox">
              <input type="button" class="surebtn" value="查询" @click="searchSupplierData" />
              <input type="button" class="surebtn surereset" value="重置" @click="resetSupplier" />
            </li>
          </ul>
        </div>
        <!--检索表头 end-->

        <!--表数据 begin-->
        <div class="tableBox">
          <table class="modtable supplierTable" width="100%" border="0" cellpadding="0" cellspacing="0">
            <tr>
              <th>
                <i class="checkall checkinp" :class="{checkedbox:checkedAll}" @click="checkallFun"></i>
              </th>
              <th>序号</th>
              <th>供应商编码</th>
              <th>供应商名称</th>
              <th>供应商类别</th>
            </tr>
            <tr v-for="(item,index) in allSupplierGroup" :key="index">
              <td>
                <i class="checkinp" :data-id="item.proNumber" @click="checkFun(item,$event)"></i>
              </td>
              <td>{{index+1}}</td>
              <td>
                <a class="bfc" href="javascript:void(0)">{{item.proNumber}}</a>
              </td>
              <td>{{item.proName}}</td>
              <td>{{item.providerTypeName}}</td>
            </tr>
          </table>
        </div>
        <!--表数据 end-->

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="!isChangeSupplier" type="primary" @click="saveSupplier">确 定</el-button>
        <el-button v-if="isChangeSupplier" type="primary" @click="saveChangeSupplier">确 定</el-button>
      </div>
    </el-dialog>
    <!--添加供应商 end-->

    <!--复制供应商 begin-->
    <el-dialog :close-on-click-modal="false" :visible.sync="dialogCopyFormVisible" top="15%" class="copySupplier" :before-close="copyBeforeClose">
      <h3 slot="title" class="el-dialog__title">复制供应商</h3>
      <el-form v-loading="copyLoading" element-loading-text="加载数据中">
        <!--检索表头 begin-->
        <div class="searchfilter col4">
          <ul class="clearfix">
            <li class="small">
              <p class="name">城区：</p>
              <div class="inpbox">
                <el-select v-model.trim="copyCitySideName" filterable @change="citySideNameChange" placeholder="请选择">
                  <el-option v-for="item in [PLEASE_SELECT, ...citySideNameOptions]" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </li>
            <li class="small">
              <p class="name">商圈：</p>
              <div class="inpbox">
                <el-select v-model.trim="copyTradingArea" filterable placeholder="请选择">
                  <el-option v-for="item in [PLEASE_SELECT, ...tradingAreaOptions]" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </li>
            <li>
              <p class="name">楼盘名称：</p>
              <div class="inpbox"><input type="text" v-model.trim="copyBuildingName" placeholder="请输入" class="inp" /></div>
            </li>
            <li class="btnbox">
              <el-button type="success" @click="batchSaveBuild">复制到{{copyKey ? ' ' + copyKey : '城区或商圈'}}</el-button>
            </li>
            <li class="btnbox" style="width:100%;">
              <el-button type="primary" @click="searchBuilidData">查询</el-button>
              <el-button type="success" @click="saveBuild">复制到勾选楼盘</el-button>
            </li>
          </ul>
        </div>
        <!--检索表头 end-->

        <!--表数据 begin-->
        <div class="tableBox">
          <table class="modtable buildTable" width="100%" border="0" cellpadding="0" cellspacing="0">
            <tr>
              <th width="80">
                <i class="checkall checkinp" :class="{checkedbox:checkedBuildAll}" @click="checkallBuildFun"></i>
              </th>
              <th>序号</th>
              <th>城区</th>
              <th>商圈</th>
              <th>楼盘名称</th>
            </tr>
            <tbody>
              <tr v-for="(item,index) in allBuildingGroup" :key="index">
                <td>
                  <i class="checkinp" :data-id="item.buildingId" @click="checkBuildFun(item,$event)"></i>
                </td>
                <td>{{index+1}}</td>
                <td>{{item.cityName}}</td>
                <td>{{item.tradingArea}}</td>
                <td>{{item.buildingName}}</td>
              </tr>
            </tbody>

          </table>
        </div>
        <!--表数据 end-->

      </el-form>
    </el-dialog>
    <!--复制供应商 end-->

  </div>
</template>
<script type="text/javascript">
import { mapGetters, mapActions } from 'vuex'
import debounce from 'lodash/debounce'
import {
  getHousesPrividers,
  delHousesPrividers,
  addHousesPrividers,
  changeHousesPrividers,
  copyHousesPrividers,
  batchCopyHousesPrividers,
  getHouses
} from '../../api/basicdatamgmt'
import permission from '@/mixins/permission.js'

function getLabel(key, options) {
  if (key == '') {
    return ''
  }
  for (let i = 0, len = options.length; i < len; i++) {
    if (options[i].value === key) {
      return options[i].label
    }
  }
  return ''
}

export default {
  name: 'matchsupplier',
  data() {
    return {
      formSend: {},
      activeId: '',
      citySideName: '', //城区
      tradingArea: '', //商圈
      buildingName: '', //楼盘名称
      dialogFormVisible: false, //添加弹窗窗初始隐藏
      dialogCopyFormVisible: false, //复制弹窗初始隐藏
      operHouses: null,
      operHouses2: null,
      operSupplier: null,
      PLEASE_SELECT: { value: '', label: '请选择' },
      //所有的供应商数组
      allBuildingGroup: [],
      supplierForBuildingId: '', //供应商对应的楼盘Id
      pagination: {
        curr: 1, //当前索引
        pageSize: 10 //每页显示条数
      },
      checkedAll: false, //供应商全选初始状态
      checkedBuildAll: false, //楼盘全选初始状态
      checkModel: [], //存储供应商选中的Id数组
      checkBuildModel: [], //存储楼盘选中的Id数组

      addProSortValue: '', //新增供应商类别
      addSupplierName: '', //新增供应商名称
      copyCitySideName: '', //城区
      copyTradingArea: '', //商圈
      copyBuildingName: '', //楼盘名称

      isChangeSupplier: false,
      _classifyIdMap: {},
      copyLoading: false
    }
  },
  computed: {
    ...mapGetters({
      citySideNameOptions: 'parentAreas',
      tradingAreaOptions: 'childAreas',
      proGroup: 'allHouses',
      housesTotal: 'housesTotal',
      _proSortOptions: 'sortName', //供应商类别选项
      _allSupplierGroup: 'matchSupplier'
    }),
    copyKey() {
      const city = getLabel(this.copyCitySideName, this.citySideNameOptions)
      const area = getLabel(this.copyTradingArea, this.tradingAreaOptions)
      return city + (area ? ' - ' + area : '')
    },
    proSortOptions() {
      if (this.operHouses) {
        this._classifyIdMap = {}
        this.operHouses.providerVos.forEach(
          ele => (this._classifyIdMap[ele.classifyId] = true)
        )
        return this._proSortOptions.filter(
          ele => !(ele.id in this._classifyIdMap)
        )
      }
      if (this.operSupplier) {
        // this.addProSortValue = this.operSupplier.classifyId;
        return this._proSortOptions
      }
      return []
    },
    allSupplierGroup() {
      let filterResult = []
      if (this.operHouses) {
        filterResult = this._allSupplierGroup.filter(
          ele => !(ele.classifyId in this._classifyIdMap)
        )
      }
      if (this.operSupplier) {
        filterResult = this._allSupplierGroup.filter(
          ele => ele.pkId !== this.operSupplier.pkId
        )
      }
      if (this.addProSortValue) {
        filterResult = filterResult.filter(
          ele => ele.classifyId === this.addProSortValue
        )
      }
      return filterResult
    },
    housesFilter() {
      return {
        items: {
          premisesAreaId: this.citySideName,
          tradingId: this.tradingArea,
          premisesName: this.buildingName
        },
        limit: this.pagination.pageSize,
        pageNum: this.pagination.curr
      }
    },
    copyHousesFilter() {
      return {
        items: {
          premisesAreaId: this.copyCitySideName,
          tradingId: this.copyTradingArea,
          premisesName: this.copyBuildingName
        },
        limit: 9999,
        pageNum: 1
      }
    },
    totalPage() {
      return Math.ceil(this.housesTotal / this.pagination.pageSize)
    }
  },
  methods: {
    ...mapActions([
      'getParentArea',
      'selectParentArea',
      'getHouses',
      'getAddProviders'
    ]),
    supplierChange(val) {
      this.clearSelect()
    },
    citySideNameChange(val) {
      if(val === '') return
      this.selectParentArea(val)
      this.copyTradingArea = ''
      this.tradingArea = ''
    },
    //查询页面
    searchData: debounce(function() {
      this.pagination.curr = 1
      this.formSend = JSON.parse(JSON.stringify(this.housesFilter))
      this.getHouses(this.formSend)
    }, 300),
    //重置查询条件
    reset: debounce(function() {
      this.citySideName = ''
      this.tradingArea = ''
      this.buildingName = ''
      this.pagination.curr = 1
      this.formSend = JSON.parse(JSON.stringify(this.housesFilter))
      this.getHouses(this.formSend)
    }, 300),
    //点击父级，显示子集表格数据
    showchildren(item) {
      if (this.activeId === item.buildingId) {
        this.activeId = ''
      } else {
        this.activeId = item.buildingId
      }
    },
    //分页请求数据
    pageGo(val) {
      if (this.pagination.curr === val) {
        return
      }
      this.activeId = ''
      this.pagination.curr = val
      this.getHouses(this.housesFilter)
    },
    //查询供应商页面
    searchSupplierData() {
      this.$store.commit('SET_MATCH_PROVIDERS_FILTER', {
        type: this.addProSortValue,
        name: this.addSupplierName
      })
    },
    // 清空勾选
    clearSelect() {
      $('.supplierTable .checkinp').removeClass('checkedbox')
      this.checkModel = []
      this.checkedAll = false
    },
    //重置供应商查询条件
    resetSupplier() {
      if (!this.isChangeSupplier) {
        this.addProSortValue = ''
      }
      this.addSupplierName = ''
      // 清空vuex过滤条件
      this.searchSupplierData()
      this.clearSelect()
    },
    beforeClose() {
      setTimeout(() => {
        this.operSupplier = null
        this.operHouses = null
        this.operHouses2 = null
        this.isChangeSupplier = false
        this.resetSupplier()
      }, 100)
    },
    copyBeforeClose() {
      this.dialogCopyFormVisible = false
      setTimeout(() => {
        this.copyCitySideName = ''
        this.copyTradingArea = ''
        this.copyBuildingName = ''
        this.allBuildingGroup = []
        this.checkedBuildAll = false
        $('.buildTable .checkinp').removeClass('checkedbox')
        this.checkBuildModel = []
      }, 100)
    },
    //查询楼盘信息
    searchBuilidData() {
      if (this.copyCitySideName == '') {
        return this.$message.warning('请选择城区')
      } else if (this.copyTradingArea == '') {
        return this.$message.warning('请选择商圈')
      }
      this.checkedBuildAll = false
      $('.buildTable .checkinp').removeClass('checkedbox')
      this.checkBuildModel = []
      this.copyLoading = true
      getHouses(this.copyHousesFilter, data => {
        if (data.totalNum == 0) {
          this.allBuildingGroup = []
          this.$message.info('当前条件没有楼盘')
          return
        }
        this.allBuildingGroup = data.items.map(ele => ({
          cityName: ele.premisesAreaName, //城区名称
          tradingArea: ele.tradingName, //商圈名称
          buildingName: ele.premisesName, //楼盘名称
          buildingId: ele.houseId //楼盘Id
        }))
      }).finally(() => (this.copyLoading = false))
    },
    //单选供应商请求
    checkFun(item, $event) {
      var allNum = $('.supplierTable .checkinp').not('.checkall').length //所有的个数
      var checkNum //选中的个数
      if ($($event.target).hasClass('checkedbox')) {
        $($event.target).removeClass('checkedbox')
        for (var x = 0; x < this.checkModel.length; x++) {
          if (this.checkModel[x].pkId == item.pkId) {
            this.checkModel.splice(x, 1)
          }
        }
        checkNum = $('.supplierTable .checkinp.checkedbox').not('.checkall')
          .length
        this.checkedAll = false
      } else {
        $($event.target).addClass('checkedbox')
        this.checkModel.push(item)
        checkNum = $('.supplierTable .checkinp.checkedbox').not('.checkall')
          .length
        if (allNum == checkNum) {
          this.checkedAll = true
        }
      }
    },
    //全选供应商函数
    checkallFun() {
      this.checkedAll = !this.checkedAll
      if (this.checkedAll) {
        $('.supplierTable .checkinp').addClass('checkedbox')
        this.checkModel = [] //先清空数据
        for (var i = 0; i < this.allSupplierGroup.length; i++) {
          this.checkModel.push(this.allSupplierGroup[i])
        }
      } else {
        $('.supplierTable .checkinp').removeClass('checkedbox')
        this.checkModel = []
      }
    },
    //删除供应商
    deleteSupplier(supp, item) {
      this.$confirm('此操作将删除该供应商，是否继续？', '删除供应商', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delHousesPrividers(
            item.buildingId,
            supp.pkId,
            () => {
              this.$message({ type: 'success', message: '操作成功' })
              this.getHouses(this.housesFilter)
            },
            () => this.$message({ type: 'error', message: '操作失败' })
          )
        })
        .catch(() => {})
    },
    // 更换供应商
    changeSupplier(supp, item) {
      this.operSupplier = supp
      this.operHouses2 = item
      this.isChangeSupplier = true
      this.dialogFormVisible = true
      this.addProSortValue = this.operSupplier.classifyId
      this.searchSupplierData()
    },
    saveChangeSupplier() {
      if (this.checkModel.length === 0) {
        return this.$message({ message: '请选择一个供应商', type: 'warning' })
      } else if (this.checkModel.length > 1) {
        return this.$message({ message: '只能选择一个供应商', type: 'warning' })
      }
      this.dialogFormVisible = false
      changeHousesPrividers(
        this.operHouses2.buildingId,
        this.operSupplier.pkId,
        this.checkModel[0].pkId,
        () => {
          this.$message({ type: 'success', message: '操作成功' })

          this.getHouses(this.housesFilter)
        },
        () => this.$message({ type: 'error', message: '操作失败' })
      )
    },
    beforeOpen() {
      if (!this._proSortOptions || this._proSortOptions.length === 0) {
        this.$store.dispatch('getAllSortName')
      }
      this.getAddProviders()
    },

    //添加供应商
    addSupplier(item) {
      this.operHouses = item
      this.dialogFormVisible = true
    },
    //确定勾选的供应商
    saveSupplier() {
      let _map = {}
      for (let i = 0, l = this.checkModel.length; i < l; i++) {
        if (_map[this.checkModel[i].classifyId]) {
          return this.$message({ message: '一种供应商类别只能选择一个供应商', type: 'warning' })
        } else {
          _map[this.checkModel[i].classifyId] = true
        }
      }
      const ids = this.checkModel.map(ele => ele.pkId)
      addHousesPrividers(
        this.operHouses.buildingId,
        ids,
        () => {
          this.$message({ type: 'success', message: '添加成功' })
          this.getHouses(this.housesFilter)
        },
        () => this.$message({ type: 'error', message: '添加失败' })
      )
      this.dialogFormVisible = false
    },
    //复制供应商
    copySupplier(item) {
      this.operHouses = item
      this.dialogCopyFormVisible = true
    },
    //单选楼盘请求
    checkBuildFun(item, $event) {
      var allBuildNum = $('.buildTable .checkinp').not('.checkall').length //所有的个数
      var checkBuildNum //选中的个数

      if ($($event.target).hasClass('checkedbox')) {
        $($event.target).removeClass('checkedbox')
        for (var x = 0; x < this.checkBuildModel.length; x++) {
          if (this.checkBuildModel[x] == item.buildingId) {
            this.checkBuildModel.splice(x, 1)
          }
        }
        checkBuildNum = $('.buildTable .checkinp.checkedbox').not('.checkall')
          .length
        this.checkedBuildAll = false
      } else {
        $($event.target).addClass('checkedbox')
        this.checkBuildModel.push(item.buildingId)
        checkBuildNum = $('.buildTable .checkinp.checkedbox').not('.checkall')
          .length
        if (allBuildNum == checkBuildNum) {
          this.checkedBuildAll = true
        }
      }
    },
    //全选楼盘函数
    checkallBuildFun() {
      this.checkedBuildAll = !this.checkedBuildAll
      if (this.checkedBuildAll) {
        $('.buildTable .checkinp').addClass('checkedbox')
        this.checkBuildModel = [] //先清空数据
        for (var i = 0; i < this.allBuildingGroup.length; i++) {
          this.checkBuildModel.push(this.allBuildingGroup[i].buildingId)
        }
      } else {
        $('.buildTable .checkinp').removeClass('checkedbox')
        this.checkBuildModel = []
      }
    },
    //确定勾选的楼盘
    saveBuild() {
      if (this.copyCitySideName == '') {
        return this.$message.warning('请选择城区')
      } else if (this.copyTradingArea == '') {
        return this.$message.warning('请选择商圈')
      } else if (this.checkBuildModel.length === 0) {
        return this.$message.warning('请至少选择一个楼盘')
      }
      copyHousesPrividers(
        this.operHouses.buildingId,
        this.checkBuildModel,
        () => {
          this.$message({ type: 'success', message: '复制成功' })
          this.getHouses(this.housesFilter)
        },
        () => this.$message({ type: 'error', message: '复制失败' })
      )
      this.copyBeforeClose()
    },
    batchSaveBuild() {
      if (!this.copyCitySideName) {
        this.$message.warning('请选择一个城区或商圈')
        return
      }
      let copyLoading = this.$loading({ fullscreen: true, text: '复制中' })
      batchCopyHousesPrividers(
        {
          housesId: this.operHouses.buildingId,
          premisesAreaId: this.copyCitySideName,
          tradingId: this.copyTradingArea
        },
        () => {
          this.$message({ type: 'success', message: '复制成功' })
          this.getHouses(this.housesFilter)
        },
        () => this.$message({ type: 'error', message: '复制失败' })
      ).finally(_ => {
        copyLoading.close()
        this.copyBeforeClose()
      })
    },
    keydownSearch() {
      this.searchData()
    }
  },
  mixins:[permission],
  created() {
    this.getParentArea()
    this.getHouses(this.housesFilter)
  }
}
</script>


<style type="text/css" scoped>
.copySupplier ul li.btnbox {
  min-width: 0;
}
</style>