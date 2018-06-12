<template>
  <div id="itemmanagement">
    <table class="table-content">
      <tr>
        <td class="content-left" valign="top" style="position: relative;">
          <div class="btn-wrap clearfix">
            <div style="margin-left: 30px;">
              <input v-if="hasPermission('PZ_addThing')" type="button" class="addBtn" @click="addItem" value="+ 新增物品" />
            </div>
            <ul class="dotUl">
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
          <el-tree :data="tree" ref="tree" :props="defaultProps" node-key="id" :highlight-current="true" :indent="20" :expand-on-click-node="false" @node-click="treeClick">
          </el-tree>
        </td>
        <td class="control-line" valign="top"></td>
        <td class="content-right" valign="top">
          <div class="searchfilter">
            <ul class="clearfix">
              <li>
                <p class="name">物品编码：</p>
                <div class="inpbox"><input @keydown.enter="keydownSearch" v-model.trim="filterForm.itemNumber" type="text" placeholder="请输入" class="inp" /></div>
              </li>
              <li>
                <p class="name">物品名称：</p>
                <div class="inpbox"><input @keydown.enter="keydownSearch" v-model.trim="filterForm.itemName" type="text" placeholder="请输入" class="inp" /></div>
              </li>
              <li>
                <p class="name">状态：</p>
                <div class="inpbox">
                  <el-select v-model="filterForm.itemIsUse" placeholder="请选择">
                    <el-option label="所有状态" value=""></el-option>
                    <el-option label="使用中" value="1"></el-option>
                    <el-option label="已停用" value="0"></el-option>
                  </el-select>
                </div>
              </li>
              <li>
                <p class="name">物品性质：</p>
                <div class="inpbox">
                  <el-select v-model="filterForm.proType" placeholder="请选择">
                    <el-option label="物品" value="0"></el-option>
                    <el-option label="配件" value="1"></el-option>
                    <el-option label="组装费" value="2"></el-option>
                  </el-select>
                </div>
              </li>
              <li>
                <p class="name">是否维修：</p>
                <div class="inpbox">
                  <el-select v-model.trim="filterForm.isMaintain" placeholder="请选择">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                  </el-select>
                </div>
              </li>
              <li>
                <p class="name"></p>
                <div class="inpbox"></div>
              </li>
              <li class="btnbox" style="width:100%;">
                <p class="name"></p>
                <div class="inpbox">
                  <input id="searchBtn" type="button" @click="search" class="surebtn" value="查询" style="margin-left: 0px;" />
                  <input id="resetBtn" type="button" @click="resetSearch" class="surebtn surereset" value="重置" />
                </div>
              </li>
            </ul>
          </div>
          <!--数据列表 begin-->
          <div class="dataBox">
            <div class="toolBar clearfix">
              <div class="miniTool" v-if="checkModel.length == 0">
                <input type="button" class="minibtn grayminibtn" value="启用" />
                <input type="button" class="minibtn grayminibtn" value="停用" />
                <input type="button" class="minibtn grayminibtn" value="删除" />
                <p class="checknum">已选择
                  <i v-text="checkModel.length"></i>条</p>
              </div>
              <div class="miniTool" v-else>
                <input v-if="hasPermission('PZ_addOrModifyThing')" type="button" class="minibtn" @click="operItem('open')" value="启用" />
                <input v-if="hasPermission('PZ_addOrModifyThing')" type="button" class="minibtn" @click="operItem('stop')" value="停用" />
                <input v-if="hasPermission('PZ_addOrModifyThing')" type="button" class="minibtn" @click="operItem('none')" value="删除" />
                <p class="checknum">已选择
                  <i v-text="checkModel.length"></i>条</p>
              </div>

              <div class="miniPages">
                <my-pagination :total="total" :curr="pagination.curr" :pageChange="pageGo"></my-pagination>
              </div>
            </div>
            <div class="tableBox">
              <table class="modtable tableLoading itemmanagementLoading" width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <th>
                    <i class="checkall checkinp" :class="{checkedbox:checkedAll}" @click="checkallFun"></i>
                  </th>
                  <th>物品编码</th>
                  <th>物品名称</th>
                  <th>状态</th>
                  <th>性质</th>
                  <th>单位</th>
                  <th>是否维修</th>
                  <th>操作</th>
                </tr>
                <no-data :visible="total"></no-data>
                <tr v-for="(item,index) in proGroup" :key="index">
                  <td>
                    <i class="checkinp" :data-id="item.proNumber" @click="checkFun(item,$event)"></i>
                  </td>
                  <!--<td>{{index+1}}</td>-->
                  <td>
                    <a class="bfc" @click="seeItem(item)" href="javascript:void(0)">{{item.proNumber}}</a>
                  </td>
                  <td>{{item.proName}}</td>
                  <td>{{item.status ? '使用中':'已停用'}}</td>
                  <td>{{item.nature}}</td>
                  <td>{{item.proUnit}}</td>
                  <td>
                    <span>{{item.isRepair === 0 ? "否":"是"}}</span>
                  </td>
                  <!--<td><span v-if="item.isState == 0">否</span><span v-if="item.isState == 1">是</span></td>-->
                  <td>
                    <p class="typeControl">

                      <a v-if="hasPermission('PZ_addOrModifyThing')" href="javascript:void(0)" class="d-btn" @click="operItem('none', [item.id])">
                        <i></i>删除</a>
                      <a v-if="hasPermission('PZ_addOrModifyThing')" href="javascript:void(0)" class="e-btn" @click="editItem(item)">
                        <i></i>编辑</a>
                      <a v-if="item.status === 1 && hasPermission('PZ_addOrModifyThing')" href="javascript:void(0)" class="t-btn" @click="operItem('stop', [item.id])">
                        <i></i>停用</a>
                      <a v-if="item.status === 0 && hasPermission('PZ_addOrModifyThing')" href="javascript:void(0)" class="q-btn" @click="operItem('open', [item.id])">
                        <i></i>启用</a>
                    </p>
                  </td>
                </tr>
              </table>
            </div>
            <div class="footPages">
              <el-pagination @current-change="pageGo" layout="prev, pager, next" :total="total" :current-page="pagination.curr"></el-pagination>
            </div>
          </div>
          <!--数据列表 end-->
        </td>
      </tr>
    </table>
    <!--新增物品 begin-->
    <el-dialog :close-on-click-modal="false" :visible.sync="dialogFormVisible" size="small" top="18%" :before-close="itemCancel">
      <h3 slot="title" v-if="dialogState == 'add'" class="el-dialog__title">添加物品
        <span class="tiptit">
          <i>*</i>为必填项</span>
      </h3>
      <h3 slot="title" v-if="dialogState == 'edit'" class="el-dialog__title">编辑物品
        <span class="tiptit">
          <i>*</i>为必填项</span>
      </h3>
      <el-form :model="itemForm" ref="itemForm" class="tworowForm" :rules="rules">
        <el-form-item label="物品名称：" prop="proName">
          <el-input v-model="itemForm.proName"></el-input>
        </el-form-item>
        <el-form-item label="物品性质：" prop="proNatureValue" required>
          <el-select v-model="itemForm.proNatureValue" :disabled="dialogState == 'edit'" placeholder="请选择">
            <el-option label="物品" value="0"></el-option>
            <el-option label="配件" value="1"></el-option>
            <el-option label="组装费" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="实际数量上限：" prop="upperLimit" class="content120">
          <el-input v-model.number="itemForm.upperLimit"></el-input>
        </el-form-item>
        <el-form-item label="一级分类：" prop="firstCategory">
          <el-select v-model="itemForm.firstCategory" :disabled="dialogState == 'edit'" placeholder="请选择" @visible-change="editFlag = false">
            <el-option v-for="item in pro1stOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类：" prop="secondCategory">
          <el-select v-model="itemForm.secondCategory" filterable :disabled="dialogState == 'edit'" placeholder="请选择" @visible-change="editFlag = false">
            <el-option v-for="item in pro2ndOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="三级分类：" prop="thirdCategory">
          <el-select v-model="itemForm.thirdCategory" filterable :disabled="dialogState == 'edit'" placeholder="请选择" @visible-change="editFlag = false">
            <el-option v-for="item in pro3rdOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单位：" prop="proUnit">
          <el-input v-model="itemForm.proUnit" :maxlength="5"></el-input>
        </el-form-item>
        <el-form-item label="是否维修：" prop="isRepair">
          <el-select v-model="itemForm.isRepair" placeholder="请选择">
            <el-option label="是" :value="1"></el-option>
            <el-option label="否" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否分摊：" prop="apportioned">
          <el-select v-model="itemForm.apportioned" placeholder="请选择" @change="itemForm.apportioned==0&&(itemForm.apportionedYear='')">
            <el-option label="是" :value="1"></el-option>
            <el-option label="否" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分摊年限：" prop="apportionedYear" v-if="itemForm.apportioned=='1'">
          <el-input-number v-model="itemForm.apportionedYear" :min="1" :controls="false"></el-input-number>
        </el-form-item>
        <el-form-item label=" " class="visibilhide" v-else>
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="适用性：" prop="applyto" class="versionNum">
          <el-input v-model="itemForm.applyto" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label=" " class="visibilhide">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="生效时间：" prop="startDateValue">
          <el-date-picker v-model="itemForm.startDateValue" type="date" :editable="false" placeholder="请选择日期" :picker-options="pickerOptionStart">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="失效时间：" prop="endDateValue">
          <el-date-picker v-model="itemForm.endDateValue" type="date" :editable="false" placeholder="请选择日期" :picker-options="pickerOptionEnd">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="itemCancel">取 消</el-button>

        <el-button type="primary" v-if="dialogState === 'add'" @click="saveAdd">确 定</el-button>
        <el-button type="primary" v-if="dialogState === 'edit'" @click="saveEditItem">确 定</el-button>
      </div>
    </el-dialog>
    <!--新增物品 end-->

  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { operGoodsByIds } from '../../api/basicdatamgmt'
import debounce from 'lodash/debounce'
import permission from '@/mixins/permission.js'

const initForm = {
  proName: '', //物品名称
  proNatureValue: '', //物品性质
  upperLimit: '', //实际数量上限
  firstCategory: '',
  secondCategory: '',
  thirdCategory: '',
  proUnit: '', //单位
  apportioned: '', //分摊
  apportionedYear: '', //分摊年限
  isRepair: '', //维修
  applyto: '江寓合租V1.0', //适用性
  startDateValue: '', //合作开始日期
  endDateValue: '', //合作结束日期
  formSend: {}
}

export default {
  name: 'itemmanagement',
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'sortName'
      },
      // treeSelected: {},
      filterForm: {
        itemNumber: '',
        itemName: '',
        itemIsUse: '',
        proType: '',
        isMaintain: ''
      },
      formSend: {},
      checkedAll: false, //全选初始状态
      checkModel: [], //存储选中的Id数组
      pagination: {
        curr: 1, //当前索引
        pageSize: 10 //每页显示条数
      },
      dialogFormVisible: false, //物品编辑窗口初始隐藏
      dialogState: 'add', //弹窗入口  add为新增, edit为编辑, see为查看
      _secCategory: {},
      editFlag: false,
      itemForm: Object.assign({}, initForm),
      rules: {
        proName: [
          { required: true, message: '请输入物品名称', trigger: 'blur' },
          { max: 30, message: '长度小于 30 个字符', trigger: 'blur,change' }
        ],
        proNatureValue: [
          { required: true, message: '请选择物品性质', trigger: 'change' }
        ],
        upperLimit: [
          { required: true, message: '请输入物品上限数量' },
          { type: 'number', message: '请输入数字值' },
          { type: 'number', min: 0, message: '上限数量必须大于 0' }
        ],
        firstCategory: [
          { required: true, message: '请选择一级分类', trigger: 'change' }
        ],
        secondCategory: [
          { required: true, message: '请选择二级分类', trigger: 'change' }
        ],
        thirdCategory: [
          { required: true, message: '请选择三级分类', trigger: 'change' }
        ],
        proUnit: [
          { required: true, message: '请输入单位', trigger: 'blur' },
          { max: 5, message: '单位长度不能大于 5', trigger: 'blur,change' }
        ],
        applyto: [{ required: true, message: '请输入单位', trigger: 'blur' }],
        startDateValue: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        endDateValue: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ]
      },
      pickerOptionEnd: {
        disabledDate: time => {
          let boardDateStart = this.itemForm.startDateValue
          if (boardDateStart) {
            return time.getTime() < boardDateStart.getTime()
          }
        }
      },
      pickerOptionStart: {
        disabledDate: time => {
          let boardDateEnd = this.itemForm.endDateValue
          if (boardDateEnd) {
            return time.getTime() > boardDateEnd.getTime()
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      tree: 'usedTree',
      proGroup: 'allGoods',
      total: 'goodsTotal',
      operGoods: 'operGoods',
      treeSelected: 'treeSelected'
    }),
    pageTotal() {
      return Math.ceil(this.total / this.pagination.pageSize)
    },
    // 分类联动
    pro1stOptions() {
      return this.tree.map(t => ({
        value: t.id,
        label: t.sortName
      }))
    },
    pro2ndOptions() {
      if (!this.editFlag) {
        this.itemForm.secondCategory = ''
      }
      const r = this.tree.filter(t => t.id === this.itemForm.firstCategory)
      return r.length > 0
        ? r[0].children.map(t => ({
            value: t.id,
            label: t.sortName
          }))
        : []
    },
    pro3rdOptions() {
      if (!this.editFlag) {
        this.itemForm.thirdCategory = ''
      }
      const r = this.tree.filter(t => t.id === this.itemForm.firstCategory)
      if (!(r.length > 0 && r[0].children.length > 0)) return []
      const r1 = r[0].children.filter(
        t => t.id === this.itemForm.secondCategory
      )
      return r1.length > 0
        ? r1[0].children.map(t => ({
            value: t.id,
            label: t.sortName
          }))
        : []
    }
  },
  methods: {
    ...mapActions([
      'getAllCategory',
      'getAllGoods',
      'addGoods',
      'editGoods',
      'getGoodsById'
    ]),

    getItems(noFilter) {
      let _items = {
        classifyId: this.treeSelected.id,
        maxNumber: this.treeSelected.level
      }
      // if (noFilter !== true) {
      Object.assign(_items, {
        goodsNumber:
          this.formSend.itemNumber && this.formSend.itemNumber.toUpperCase(),
        goodsName: this.formSend.itemName,
        goodsIsUse: this.formSend.itemIsUse,
        proType: this.formSend.proType,
        isMaintain: this.formSend.isMaintain
      })
      // }
      return this.getAllGoods({
        items: _items,
        limit: this.pagination.pageSize,
        pageNum: this.pagination.curr
      })
    },
    getItemSubmitParams() {
      return {
        pkId: this.itemForm.pkId,
        goodsName: this.itemForm.proName,
        proType: this.itemForm.proNatureValue,
        maxNumber: this.itemForm.upperLimit,
        sortOne: this.itemForm.firstCategory,
        sortTwo: this.itemForm.secondCategory,
        classifyId: this.itemForm.thirdCategory,
        goodsUnit: this.itemForm.proUnit,
        isApportion: this.itemForm.apportioned,
        apportionDeadline: this.itemForm.apportionedYear,
        isMaintain: this.itemForm.isRepair,
        jrId: this.itemForm.applyto,
        startDate: '' + this.itemForm.startDateValue.getTime(),
        endDate: '' + this.itemForm.endDateValue.getTime()
      }
    },
    treeClick(data, node) {
      this.pagination.curr = 1
      this.$store.commit(
        'SET_SELECT_TREE',
        Object.assign({}, data, { level: node.level })
      )
      // this.treeSelected = Object.assign({}, data, { level: node.level });
      this.getItems()
      this.checkedAll = true
      this.checkallFun()
    },
    //获取物品数据
    search: debounce(function() {
      this.pagination.curr = 1
      this.formSend = JSON.parse(JSON.stringify(this.filterForm))
      this.getItems()
    }, 300),
    resetSearch: debounce(function() {
      this.pagination.curr = 1
      this.filterForm = {
        itemNumber: '',
        itemName: '',
        itemIsUse: '',
        proType: '',
        isMaintain: ''
      }
      this.formSend = JSON.parse(JSON.stringify(this.filterForm))
      this.getItems()
    }, 300),
    //单选请求
    checkFun(item, $event) {
      var allNum = $('.modtable .checkinp').not('.checkall').length //所有的个数
      var checkNum //选中的个数
      if ($($event.target).hasClass('checkedbox')) {
        $($event.target).removeClass('checkedbox')
        for (var x = 0; x < this.checkModel.length; x++) {
          if (this.checkModel[x] == item.id) {
            this.checkModel.splice(x, 1)
          }
        }
        checkNum = $('.modtable .checkinp.checkedbox').not('.checkall').length
        this.checkedAll = false
      } else {
        $($event.target).addClass('checkedbox')
        this.checkModel.push(item.id)
        checkNum = $('.modtable .checkinp.checkedbox').not('.checkall').length
        if (allNum == checkNum) {
          this.checkedAll = true
        }
      }
    },
    //全选函数
    checkallFun() {
      this.checkedAll = !this.checkedAll
      if (this.checkedAll) {
        $('.modtable .checkinp').addClass('checkedbox')
        this.checkModel = [] //先清空数据
        for (var i = 0; i < this.proGroup.length; i++) {
          this.checkModel.push(this.proGroup[i].id)
        }
      } else {
        $('.modtable .checkinp').removeClass('checkedbox')
        this.checkModel = []
      }
    },
    //分页请求数据
    pageGo(val) {
      if (this.pagination.curr === val) {
        return
      }
      this.checkedAll = false
      $('.modtable .checkinp').removeClass('checkedbox')
      this.checkModel = []
      this.pagination.curr = val
      this.getItems()
    },

    // 关闭物品窗口
    itemCancel() {
      this.dialogFormVisible = false
      this.$refs['itemForm'].resetFields()
      this.itemForm = Object.assign({}, initForm)
      this.editFlag = false
    },
    //新增物品
    addItem() {
      this.dialogState = 'add'
      this.dialogFormVisible = true
    },
    //编辑物品
    editItem(item) {
      this.dialogState = 'edit'
      this.dialogFormVisible = true
      this.editFlag = true
      this.getGoodsById(item.id).then(() => {
        this.itemForm = Object.assign({}, this.operGoods)
      })
    },
    // 启用/停用/删除 物品
    operItem(type, ids = this.checkModel) {
      const typeInfo = {
        open: '启用',
        stop: '停用',
        none: '删除'
      }
      operGoodsByIds(
        type,
        ids,
        () => {
          this.$message({ message: `${typeInfo[type]}物品成功`, type: 'success' })
          this.getItems()
        },
        () => this.$message({ message: `${typeInfo[type]}物品失败`, type: 'error' })
      )
    },

    //保存新增物品
    saveAdd() {
      this.$refs['itemForm'].validate(valid => {
        if (valid) {
          this.addGoods(this.getItemSubmitParams()).then(() => this.getItems())
          this.itemCancel()
        } else {
          return false
        }
      })
    },
    //保存编辑物品
    saveEditItem() {
      this.$refs['itemForm'].validate(valid => {
        if (valid) {
          this.editGoods(this.getItemSubmitParams()).then(() => this.getItems())
          this.itemCancel()
        } else {
          return false
        }
      })
    },
    seeItem(item) {
      this.$store.dispatch('itemArrAdd', {
        name: '物品详情',
        id: 'itemdetails',
        params: { id: item.id, type: item.proNatureValue }
      })
    },
    keydownSearch() {
      this.search()
    }
  },
  mixins:[permission],
  created() {
    this.getAllCategory()
  }
}
</script>

<style>
.el-tree {
  border: 0;
  padding-left: 0;
  width: 100%;
}

input[disabled] {
  background-color: #eef1f6;
  color: #bbb;
  cursor: not-allowed;
}
#itemmanagement {
  height: 100%;
}

#itemmanagement button.el-button {
  line-height: 10px;
  padding: 10px 20px;
}
</style>

<style scoped>
.table-content {
  height: 100%;
  width: 100%;
  position: relative;
  border-collapse: collapse;
}

.table-content .content-left {
  width: 220px;
  height: 100%;
  margin-bottom: 20px;
  box-sizing: border-box;
  background-color: #fff;
  padding: 15px 0 45px 0;
  padding-bottom: 45px;
  border-right: 1px solid #e3e7eb;
}

.table-content .control-line {
  width: 4px;
  height: 100%;
  background-color: #ecf0f3;
  cursor: e-resize;
}

.table-content .content-left .btn-wrap {
  position: relative;
  top: 0;
  border-bottom: 1px solid #f6f8f8;
  padding-bottom: 15px;
  margin-bottom: 10px;
}

#treeDemo1 {
  padding-left: 10px;
  padding-top: 10px;
}

.table-content .content-right {
  box-sizing: border-box;
  padding: 0px 5px 0;
  height: 100%;
  background-color: #f2f4f8;
}

.content-right .btn-wrap {
  height: 55px;
  padding-right: 60px;
}

.warning {
  color: red;
}
/* 点 */

.dotUl {
  position: absolute;
  top: -7px;
  right: 4px;
}

.dotUl li {
  width: 3px;
  height: 3px;
  margin-bottom: 5px;
  background-color: #cdd5dd;
}
.msg-table td i {
  display: inline-block;
  margin-right: 4px;
  width: 10px;
  height: 10px;
  vertical-align: baseline;
}
.msg-table td i.i-del {
  background: url(/static/images/remove2.png) 0 100%;
}
.msg-table td i.i-edit {
  background: url(/static/images/remove2.png) 100% 100%;
}

.msg-table tr:hover td i.i-del {
  background: url(/static/images/remove2.png) 0 0;
}
.msg-table tr:hover td i.i-edit {
  background: url(/static/images/remove2.png) 100% 0;
}
</style>
<style scoped>
.tworowForm .content120 .el-form-item__content {
  margin-left: 125px;
}
.tworowForm .versionNum .el-form-item__content input {
  color: #000;
}
.tworowForm .visibilhide {
  visibility: hidden;
}
.dialog-footer {
  padding: 30px 20px 50px;
}
.tworowForm {
  padding-left: 20px;
}
.modtable tr th:last-child {
  width: 180px;
}
.modtable .typeControl a:nth-child(2) {
  padding: 0 15px;
}
</style>