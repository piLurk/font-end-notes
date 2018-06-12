<template>
  <div id="solution">
    <div class="searchfilter">
      <ul class="clearfix">
        <li>
          <p class="name">方案编码：</p>
          <div class="inpbox"><input type="text" @keydown.enter="keydownSearch" v-model.trim="solutionNumber" placeholder="请输入" class="inp" /></div>
        </li>
        <li>
          <p class="name">方案名称：</p>
          <div class="inpbox"><input type="text" @keydown.enter="keydownSearch" v-model.trim="solutionName" placeholder="请输入" class="inp" /></div>
        </li>
        <li>
          <p class="name">收房产品：</p>
          <div class="inpbox">
            <el-select v-model.trim="houseType" placeholder="请选择">
              <el-option v-for="item in houseTypeOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </li>
        <li>
          <p class="name">功能区间：</p>
          <div class="inpbox">
            <el-select v-model.trim="roomType" placeholder="请选择">
              <el-option v-for="item in roomTypeOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </li>
        <li>
          <p class="name">装修风格：</p>
          <div class="inpbox">
            <el-select v-model.trim="fitmentStyle" placeholder="请选择">
              <el-option v-for="item in fitmentStyleOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </li>
        <li>
          <p class="name">产品版本：</p>
          <div class="inpbox">
            <el-select v-model.trim="productTheme" disabled placeholder="请选择">
              <el-option v-for="item in productThemeOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
        </li>
        <li>
          <p class="name">是否启用：</p>
          <div class="inpbox radio_inpbox">
            <el-select v-model.trim="isStateRadio" placeholder="请选择">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </div>
        </li>

        <li class="btnbox singlerow">
          <input type="button" class="surebtn" value="查询" @click="searchData" />
          <input type="button" class="surebtn surereset" value="重置" @click="reset" />
        </li>
      </ul>
    </div>

    <!--数据列表 begin-->
    <div class="dataBox">
      <div>
        <input v-if="hasPermission('PZ_addSolution')" type="button" class="addBtn" @click="addSolution" value="+ 新增标配方案" />
      </div>
      <div class="toolBar clearfix">
        <div class="miniTool" v-if="checkModel.length == 0">
          <input type="button" class="minibtn grayminibtn" value="启用" />
          <input type="button" class="minibtn grayminibtn" value="停用" />
          <input type="button" class="minibtn grayminibtn" value="删除" />
          <p class="checknum">已选择
            <i v-text="checkModel.length"></i>条</p>
        </div>
        <div class="miniTool" v-else>
          <input v-if="hasPermission('PZ_addOrModifySolution')" type="button" class="minibtn" @click="operSolution('open')" value="启用" />
          <input v-if="hasPermission('PZ_addOrModifySolution')" type="button" class="minibtn" @click="operSolution('stop')" value="停用" />
          <input v-if="hasPermission('PZ_addOrModifySolution')" type="button" class="minibtn" @click="deleteSolution" value="删除" />
          <p class="checknum">已选择
            <i v-text="checkModel.length"></i>条</p>
        </div>

        <div class="miniPages">
          <my-pagination :total="proGroupTotal" :curr="pagination.curr" :pageChange="pageGo"></my-pagination>
        </div>
      </div>
      <div class="tableBox">
        <table class="modtable tableLoading solutionLoading" width="100%" border="0" cellpadding="0" cellspacing="0">
          <tr>
            <th>
              <i class="checkall checkinp" :class="{checkedbox:checkedAll}" @click="checkallFun"></i>
            </th>
            <th>序号</th>
            <th>标配方案编码</th>
            <th>标配方案名称</th>
            <th>是否启用</th>
            <th>收房产品</th>
            <th>功能区间</th>
            <th>装修风格</th>
            <th>产品版本</th>
            <th>操作</th>
          </tr>
          <tbody>
            <no-data :visible="proGroupTotal"></no-data>
            <tr v-for="(item,index) in proGroup" :key="index">
              <td>
                <i class="checkinp" :data-id="item.pkId" @click="checkFun(item,$event)"></i>
              </td>
              <td>{{index+1}}</td>
              <td>
                <a class="bfc" href="javascript:void(0)" @click="seeSolution(item.pkId)">{{item.standardNumber}}</a>
              </td>
              <td>{{item.standardName}}</td>
              <td>{{item.isUse | ifOrNot}}</td>
              <td>{{item.houseType}}</td>
              <td>{{item.functionType}}</td>
              <td>{{item.houseStyle | blank}}</td>
              <td>
                <span v-if="item.jrId == 'jr1'">江寓V1.0</span>
                <span v-if="item.jrId == 'jr2'">江寓V1.1</span>
              </td>
              <td>
                <p class="typeControl">
                  <a v-if="hasPermission('PZ_addOrModifySolution')" href="javascript:void(0)" class="e-btn" @click="editSolution(item.pkId)">
                    <i></i>编辑</a>
                </p>
              </td>
            </tr>
          </tbody>

        </table>
      </div>
      <div class="footPages">
        <el-pagination @current-change="pageGo" :current-page="pagination.curr" layout="prev, pager, next" :total="proGroupTotal"></el-pagination>
      </div>
    </div>
    <!--数据列表 end-->

    <!--供应商 begin-->
    <el-dialog :close-on-click-modal="false" :visible.sync="dialogFormVisible" size="large" top="15%" @open="beforeOpen" @close="beforeClose('solutionForm')">
      <h3 slot="title" v-if="dialogState == 'add'" class="el-dialog__title">新增标配方案</h3>
      <h3 slot="title" v-if="dialogState == 'see'" class="el-dialog__title">标配方案详情</h3>
      <h3 slot="title" v-if="dialogState == 'edit'" class="el-dialog__title">编辑标配方案</h3>

      <!--主体数据 begin-->
      <el-form :model="solutionForm" :rules="rules" ref="solutionForm" class="threerowForm clearfix">
        <el-form-item label="方案名称:" prop="solutionName">
          <p class="inptxt" v-if="dialogState == 'see'" v-text="solutionForm.solutionName"></p>
          <el-input v-else placeholder="请输入" v-model="solutionForm.solutionName" required="true" type="text"></el-input>
        </el-form-item>

        <el-form-item label="收房产品:" prop="houseType">
          <p class="inptxt" v-if="dialogState == 'see'" v-text="solutionForm.houseType"></p>
          <el-select v-else v-model="solutionForm.houseType" placeholder="请选择">
            <el-option v-for="item in houseTypeOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="功能区间:" prop="roomType">
          <p class="inptxt" v-if="dialogState == 'see'" v-text="solutionForm.roomType"></p>
          <el-select v-else v-model="solutionForm.roomType" placeholder="请选择">
            <el-option v-for="item in roomTypeOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="装修风格:" prop="fitmentStyle" v-if="solutionForm.roomType==='卧室'">
          <p class="inptxt" v-if="dialogState == 'see'" v-text="solutionForm.fitmentStyle"></p>
          <el-select v-else v-model="solutionForm.fitmentStyle" placeholder="请选择">
            <el-option v-for="item in fitmentStyleOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="产品版本:">
          <p class="inptxt" v-if="dialogState == 'see'">江寓产品V1.0</p>
          <el-select v-else v-model="solutionForm.productTheme" disabled placeholder="请选择">
            <el-option v-for="item in productThemeOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否启用:" v-if="dialogState == 'see'">
          <p class="inptxt" v-if="solutionForm.isStateRadio == 1">是</p>
          <p class="inptxt" v-if="solutionForm.isStateRadio == 0">否</p>
        </el-form-item>

        <el-form-item label="是否启用:" v-else>
          <div class="inpbox radio_inpbox">
            <el-radio class="radio" v-model="solutionForm.isStateRadio" :label="1">是</el-radio>
            <el-radio class="radio" v-model="solutionForm.isStateRadio" :label="0">否</el-radio>
          </div>
        </el-form-item>

      </el-form>
      <!--主体数据 end-->

      <!--动态选项卡 begin-->
      <div class="detailTab clearfix">
        <!--选项头 begin-->
        <div class="tabBar">
          <ul>
            <li v-for="(tabItem, index) in level2UsedTree" :key="index" :class="{'active':showarea == index}" @click="changeTabcount(index)">
              <a href="javascript:void(0)">{{tabItem.sortName}}</a>
            </li>
          </ul>
        </div>
        <!--选项头 end-->

        <!--选项主体 begin-->
        <div v-if="dialogState == 'see'">
          <div class="tabCount" v-for="(tabItem, index) in level2UsedTree" :key="index" v-show="showarea === index" :data-id="tabItem.id">
            <div class="tableBox">
              <table class="modtable solutionTable" width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <th>序号</th>
                  <th>物品分类</th>
                  <th>物品名称</th>
                  <th>数量</th>
                </tr>
                <tr v-for="(items, subIndex) in itemsList[index]" :key="subIndex">
                  <td>{{subIndex + 1}}</td>
                  <td>{{items.sortName}}</td>
                  <td>{{items.goodName}}</td>
                  <td>{{items.number}}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="tabCount" v-for="(tabItem, index) in level2UsedTree" :key="index" v-show="showarea === index" :data-id="tabItem.id">
            <div class="tableBox">
              <table class="modtable solutionTable" width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <th width="300">序号</th>
                  <th width="300">物品分类</th>
                  <th width="400">物品名称</th>
                  <th width="400">数量</th>
                  <th width="150">操作</th>
                </tr>
                <tr v-for="(items, subIndex) in itemsList[index]" :key="subIndex">
                  <td>{{subIndex + 1}}</td>
                  <td>
                    <el-select filterable size="small" style="width: 150px" v-model="items.classifyId" placeholder="请选择" @change="getGoodsOptions(items.classifyId, items)">
                      <el-option v-for="item in tabItem.children" :key="item.id" :label="item.sortName" :value="item.id">
                      </el-option>
                    </el-select>
                  </td>
                  <td>
                    <el-select filterable size="small" filterable style="width: 150px" v-model="items.goodsId" placeholder="请选择" @change="checkGoodsRepeat(items, itemsList[index], goodsOptionsMap[items.classifyId])">
                      <el-option v-for="goods in goodsOptionsMap[items.classifyId]" :key="goods.pkId" :label="goods.goodsName" :value="goods.pkId">
                      </el-option>
                    </el-select>
                  </td>
                  <td style="position:relative;min-width:200px">
                    <el-input-number v-model="items.number" :controls="false" :min="0" :max="items.maxNumber"></el-input-number>
                    <p v-if="items.goodsId && items.maxNumber" class="error-number-p">最大数量为 {{items.maxNumber}}</p>
                  </td>
                  <td>
                    <p class="typeControl">
                      <a href="javascript:void(0)" class="d-btn" @click="deleteGoods(index, subIndex)">
                        <i></i>删除</a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="button" class="addgreenBtn" @click="addNewrow(index)" value="+ 添加物品" />
                  </td>
                  <td colspan="4"></td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <!--选项主体 end-->
      </div>
      <!--动态选项卡 end-->

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" v-if="dialogState == 'see'" @click="beforeClose">确 定</el-button>
        <el-button type="primary" v-else @click="saveSolution('solutionForm', dialogState)">确 定</el-button>
      </div>

    </el-dialog>
    <!--供应商 end-->

  </div>
</template>
<script type="text/javascript">
import { mapGetters, mapActions } from 'vuex'
import * as typeConfig from './solution.config'
import axios from 'axios'
import debounce from 'lodash/debounce'
import {
  operSolution,
  getSortGoods,
  addSolution,
  editSolution,
  getSolutionById,
  getSolutionL2Goods
} from '../../api/basicdatamgmt'
import permission from '@/mixins/permission.js'

const goodsTemplate = { classifyId: '', goodsId: '', number: 1 }
const initSolutionForm = {
  pkId: '',
  solutionName: '', //方案名称
  solutionNumber: '', //方案编码
  houseType: '', //收房产品
  roomType: '', //功能区间
  fitmentStyle: '', //装修风格
  productTheme: 'jr1', //产品版本
  isStateRadio: 1 //默认启用
}

export default {
  name: 'solution',
  data() {
    return {
      SELECT_ALL: { value: '', label: '全部' },
      formSend: {},
      solutionNumber: '', //方案编码
      solutionName: '', //方案名称
      houseType: '', //收房产品
      houseTypeOptions: typeConfig.houseType,
      roomType: '', //功能区间
      roomTypeOptions: typeConfig.roomType,
      fitmentStyle: '', //装修风格
      fitmentStyleOptions: typeConfig.style,
      productTheme: 'jr1', //产品版本
      productThemeOptions: [
        //产品版本选项
        { value: 'jr1', label: '江寓产品V1.0' }
      ],
      isStateRadio: '', //是否启用
      checkedAll: false, //全选初始状态
      checkModel: [], //存储选中的Id数组
      pagination: {
        curr: 1, //当前索引
        pageSize: 10 //每页显示条数
      },
      dialogFormVisible: false, //供应商编辑窗口初始隐藏
      dialogState: 'add', //弹窗入口  add为新增, edit为编辑, see为查看
      solutionForm: initSolutionForm,
      rules: {
        //效验规则
        solutionName: [
          { required: true, message: '请输入方案名称', trigger: 'blur,change' }
        ],
        houseType: [{ required: true, message: '请选择收房产品', trigger: 'change' }],
        roomType: [{ required: true, message: '请选择功能区间', trigger: 'change' }],
        fitmentStyle: [
          { required: true, message: '请选择装修风格', trigger: 'change' }
        ]
      },
      showarea: 0, //初始选项卡显示第一个选项
      // 方案下所有物品，二维数组
      itemsList: [],
      goodsOptionsMap: {}, // 三级分类下的物品缓存
      editUpdate: false // 是否是刚打开窗口，不需要清空联动数据
    }
  },
  computed: {
    ...mapGetters({
      proGroup: 'standardSolutions', // 标配方案列表数组
      proGroupTotal: 'standardSolutionsTotal',
      level2UsedTree: 'level2UsedTree' // 所有可用二级菜单及其子菜单
    }),
    totalPage() {
      return Math.ceil(this.proGroupTotal / this.pagination.pageSize)
    }
  },
  methods: {
    ...mapActions({
      _getSolution: 'getStandardSolutions',
      getAllCategory: 'getAllCategory'
    }),
    setFormSend() {
      this.formSend = {
        standardNumber: this.solutionNumber,
        standardName: this.solutionName,
        houseType: this.houseType,
        isUse: this.isStateRadio,
        houseStyle: this.fitmentStyle,
        functionType: this.roomType,
        jrId: this.productTheme
      }
    },
    getSolution(isSearch) {
      this._getSolution({
        pageNum: this.pagination.curr,
        limit: this.pagination.pageSize,
        items: this.formSend,
        isSearch
      })
      this.clearCheckBox()
    },
    //查询页面(完成)
    searchData: debounce(function() {
      this.setFormSend()
      this.pagination.curr = 1
      this.getSolution(true)
    }, 300),
    //重置查询条件(完成)
    reset: debounce(function() {
      this.solutionNumber = ''
      this.solutionName = ''
      this.houseType = ''
      this.roomType = ''
      this.fitmentStyle = ''
      this.productTheme = 'jr1'
      this.isStateRadio = ''
      this.setFormSend()
      this.getSolution()
    }, 300),
    //单选请求(完成)
    checkFun(item, $event) {
      var allNum = $('.modtable .checkinp').not('.checkall').length //所有的个数
      var checkNum //选中的个数
      if ($($event.target).hasClass('checkedbox')) {
        $($event.target).removeClass('checkedbox')
        for (var x = 0; x < this.checkModel.length; x++) {
          if (this.checkModel[x] == item.pkId) {
            this.checkModel.splice(x, 1)
          }
        }
        checkNum = $('.modtable .checkinp.checkedbox').not('.checkall').length
        this.checkedAll = false
      } else {
        $($event.target).addClass('checkedbox')
        this.checkModel.push(item.pkId)
        checkNum = $('.modtable .checkinp.checkedbox').not('.checkall').length
        if (allNum == checkNum) {
          this.checkedAll = true
        }
      }
    },
    //全选函数(完成)
    checkallFun() {
      this.checkedAll = !this.checkedAll
      if (this.checkedAll) {
        $('.modtable .checkinp').addClass('checkedbox')
        this.checkModel = [] //先清空数据
        for (var i = 0; i < this.proGroup.length; i++) {
          this.checkModel.push(this.proGroup[i].pkId)
        }
      } else {
        $('.modtable .checkinp').removeClass('checkedbox')
        this.checkModel = []
      }
    },
    //分页请求数据
    pageGo(val) {
      this.pagination.curr = val
      this.getSolution()
    },
    // 停用/启用/删除标配方案
    operSolution(type) {
      const mess = {
        none: '删除',
        open: '启用',
        stop: '停用'
      }
      operSolution(
        type,
        this.checkModel,
        () => {
          this.$message({ message: `标配方案${mess[type]}成功!`, type: 'success' })
          this.getSolution()
        },
        () => {
          this.$message({ message: `标配方案${mess[type]}失败!`, type: 'error' })
        }
      )
    },
    clearCheckBox() {
      $('.modtable .checkinp').removeClass('checkedbox') //清空所有勾选
      this.checkModel = [] //清空已勾选pkid数组
    },
    //删除标配方案
    deleteSolution() {
      for (let i = 0, l = this.proGroup.length; i < l; i++) {
        const index = this.checkModel.indexOf(this.proGroup[i].pkId)
        if (index === -1) continue
        if (this.proGroup[i].isUse === 1) {
          return this.$message.error('不能删除使用中的方案！')
        }
      }

      this.$confirm('此操作将删除标配方案，是否继续？', '删除标配方案', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.operSolution('none')
        })
        .catch(() => {})
    },
    // 获取编辑/查看数据
    getSolutionDetail(id, type) {
      getSolutionById(id, data => {
        this.solutionForm = {
          pkId: data.pkId,
          solutionName: data.standardName, //方案名称
          solutionNumber: data.standardNumber, //方案编码
          houseType: data.houseType, //收房产品
          roomType: data.functionType, //功能区间
          fitmentStyle: data.houseStyle, //装修风格
          productTheme: data.jrId, //产品版本
          isStateRadio: data.isUse //默认启用
        }
      })
      const length = this.level2UsedTree.length
      this.level2UsedTree.forEach((ele, index) => {
        getSolutionL2Goods(id, ele.id, data => {
          if (type === 'edit') {
            axios
              .all(data.map(e => this.getGoodsOptions(e.classifyId)))
              .finally(() => {
                if (index === length - 1) {
                  this.editUpdate = false
                }
                this.itemsList.splice(index, 1, [
                  ...data,
                  ...this.itemsList[index]
                ])
              })
          } else {
            this.itemsList.splice(index, 1, [...data, ...this.itemsList[index]])
          }
        })
      })
    },

    // 查看
    seeSolution(id) {
      this.itemsList = this.level2UsedTree.map(() => [])
      this.getSolutionDetail(id, 'see')
      this.dialogState = 'see'
      this.dialogFormVisible = true
    },
    //新增标配方案()
    addSolution() {
      this.itemsList = this.level2UsedTree.map(() => [])
      this.dialogState = 'add'
      this.dialogFormVisible = true
    },
    editSolution(id) {
      this.itemsList = this.level2UsedTree.map(() => [])
      this.getSolutionDetail(id, 'edit')
      this.dialogState = 'edit'
      this.dialogFormVisible = true
    },
    getGoodsOptions(classifyId, items) {
      if (items && !this.editUpdate) {
        items.number = 1
        items.goodsId = ''
      }

      // if (!this.goodsOptionsMap[classifyId]) {
      return getSortGoods(
        {
          items: { classifyId: classifyId, maxNumber: 3 },
          limit: 999,
          pageNum: 1
        },
        data => {
          this.$set(
            this.goodsOptionsMap,
            classifyId,
            data.items
              ? data.items.filter(
                  e =>
                    e.goodsIsUse === 1 && e.isExpired === 0 && e.proType === 0
                )
              : []
          )
        }
      )
      // }
    },
    checkGoodsRepeat(operItem, items, options) {
      try {
        operItem.maxNumber = options.filter(
          ele => ele.pkId === operItem.goodsId
        )[0].maxNumber
      } catch (error) {}
      if (items.filter(ele => ele.goodsId === operItem.goodsId).length > 1) {
        this.$message.error('不能选择重复物品！')
        this.$set(operItem, 'goodsId', '')
      }
    },
    numberValid(items) {
      this.$nextTick(function() {
        if (items.number > items.maxNumber) {
          this.$set(items, 'errorNumber', true)
          this.$set(items, 'number', items.maxNumber)
          setTimeout(() => {
            items.errorNumber = false
          }, 2000)
        }
      })
    },
    //新增标配方案(添加物品新增一行)
    addNewrow(num) {
      this.itemsList[num].push({ ...goodsTemplate })
    },
    //删除物品
    deleteGoods(index, subIndex) {
      this.itemsList[index].splice(subIndex, 1)
    },
    //切换选项卡事件
    changeTabcount(index) {
      this.showarea = index
    },

    getSolutionForm() {
      return {
        pkId: this.solutionForm.pkId,
        standardName: this.solutionForm.solutionName,
        houseType: this.solutionForm.houseType,
        houseStyle: this.solutionForm.fitmentStyle,
        jrId: this.solutionForm.productTheme,
        isUse: this.solutionForm.isStateRadio,
        functionType: this.solutionForm.roomType,
        standardGoodsList: this.itemsList
          .reduce((a, b) => [...a, ...b], [])
          .filter(
            ele => ele.classifyId != '' && ele.goodsId != '' && ele.number != 0
          )
        // .map(ele => ({
        //   number: ele.number,
        //   classifyId: ele.classifyId,
        //   goodsId: ele.goodsId
        // }))
      }
    },
    // 保存提交标配方案
    saveSolution(formName, type) {
      const typeMap = {
        add: {
          mess: '新增',
          fn: addSolution
        },
        edit: {
          mess: '编辑',
          fn: editSolution
        }
      }

      this.$refs[formName].validate(valid => {
        if (valid) {
          typeMap[type].fn(
            this.getSolutionForm(),
            () => {
              this.getSolution()
              this.$message.success(`${typeMap[type].mess}标配方案完成!`)
              this.dialogFormVisible = false
            },
            () => this.$message.error(`${typeMap[type].mess}标配方案失败!`)
          )
        } else {
          return false
        }
      })
    },
    beforeOpen() {
      if (this.dialogState === 'edit') this.editUpdate = true
    },
    beforeClose(formName) {
      this.editUpdate = false
      this.dialogFormVisible = false
      this.$refs[formName].resetFields()
      this.showarea = 0
      this.solutionForm = initSolutionForm
      this.itemsList = []
    },
    keydownSearch() {
      this.searchData()
    }
  },
  created() {
    this.getSolution()
  },
  mixins:[permission],
  mounted() {
    if (!this.level2UsedTree || this.level2UsedTree.length === 0) {
      this.getAllCategory()
    }
  }
}
</script>


<style scoped>
p.error-number-p {
  position: absolute;
  top: 9px;
  left: 75px;
  color: #d1d1d1;
  -moz-user-select: none;
  -khtml-user-select: none;
  user-select: none;
}
</style>