<template>
  <div id="supplier">
    <div class="searchfilter">
      <ul class="clearfix">
        <li>
          <p class="name">供应商编码：</p>
          <div class="inpbox"><input type="text" @keydown.enter="keydownSearch" v-model.trim="supplierNumber" placeholder="请输入" class="inp" /></div>
        </li>
        <li>
          <p class="name">供应商名称：</p>
          <div class="inpbox"><input type="text" @keydown.enter="keydownSearch" v-model.trim="supplierName" placeholder="请输入" class="inp" /></div>
        </li>
        <li class="btnbox">
          <input type="button" class="surebtn" value="查询" @click="searchData" />
          <input type="button" class="surebtn surereset" value="重置" @click="reset" />
        </li>
      </ul>
    </div>

    <!--数据列表 begin-->
    <div class="dataBox">
      <div>
        <input v-if="hasPermission('PZ_addSupplier')" type="button" class="addBtn" @click="addSupplier" value="+ 新增供应商" />
      </div>
      <div class="toolBar clearfix">
        <div class="miniTool">
          <input v-if="hasPermission('PZ_addOrModifySupplier')" type="button" class="minibtn" :class="{'grayminibtn' : !canOper}" @click="operSupplier('open')" :disabled="!canOper" value="启用" />
          <input v-if="hasPermission('PZ_addOrModifySupplier')" type="button" class="minibtn" :class="{'grayminibtn' : !canOper}" @click="operSupplier('stop')" :disabled="!canOper" value="停用" />
          <input v-if="hasPermission('PZ_addOrModifySupplier')" type="button" class="minibtn" :class="{'grayminibtn' : !canOper}" @click="operSupplier('none')" :disabled="!canOper" value="删除" />
          <p class="checknum">已选择
            <i v-text="checkModel.length"></i>条</p>
        </div>

        <my-pagination :total="total" :curr="pagination.curr" :pageChange="pageGo"></my-pagination>

      </div>
      <div class="tableBox">

        <table class="modtable tableLoading supplierLoading" width="100%" border="0" cellpadding="0" cellspacing="0">
          <tr>
            <th>
              <i class="checkall checkinp" :class="{checkedbox:checkedAll}" @click="checkallFun"></i>
            </th>
            <th>序号</th>
            <th>供应商编码</th>
            <th>供应商名称</th>
            <th>供应商类别</th>
            <th>派单电话</th>
            <th>派单邮件</th>
            <th>是否有效</th>
            <th>是否启用</th>
            <th>操作</th>
          </tr>
          <tbody>
            <no-data :visible="total"></no-data>
            <tr v-for="(item,index) in proGroup" :key="index">
              <td>
                <i class="checkinp" :data-id="item.pkId" @click="checkFun(item,$event)"></i>
              </td>
              <td>{{ frontNum + index + 1 }}</td>
              <td>
                <a class="bfc" @click="seeSupplier(item)" href="javascript:void(0)">{{item.proNumber}}</a>
              </td>
              <td>{{item.proName}}</td>
              <td>{{item.providerTypeName}}</td>
              <td>{{item.sendPhone | blank}}</td>
              <td>{{item.sendMail | blank}}</td>
              <td>
                <span>{{item.isState | ifOrNot}}</span>
              </td>
              <td>
                <span>{{item.isUse | ifOrNot}}</span>
              </td>
              <td>
                <p class="typeControl" v-if="hasPermission('PZ_addSupplier')">
                  <a  href="javascript:void(0)" class="e-btn" @click="editSupplier(item)">
                    <i></i>编辑</a>
                </p>
              </td>
            </tr>
          </tbody>
          
        </table>

      </div>
      <div class="footPages">
        <el-pagination @current-change="pageGo" :current-page="pagination.curr" layout="prev, pager, next" :total="total"></el-pagination>
      </div>
    </div>
    <!--数据列表 end-->

    <!--供应商 begin-->
    <el-dialog :close-on-click-modal="false" :visible.sync="dialogFormVisible" size="small" top="30%">
      <h3 slot="title" v-if="dialogState == 'add'" class="el-dialog__title">新增供应商
        <span class="tiptit">
          <i>*</i>为必填项</span>
      </h3>
      <h3 slot="title" v-if="dialogState == 'see'" class="el-dialog__title">供应商详情</h3>
      <h3 slot="title" v-if="dialogState == 'edit'" class="el-dialog__title">编辑供应商
        <span class="tiptit">
          <i>*</i>为必填项</span>
      </h3>

      <el-form :model="supplierForm" :rules="rules" ref="supplierForm" class="tworowForm">
        <el-form-item label="供应商名称:" prop="proName">
          <el-input v-if="dialogState !== 'see'" placeholder="请输入" v-model="supplierForm.proName" required="true" type="text"></el-input>
          <p v-else>{{supplierForm.proName}}</p>
        </el-form-item>

        <el-form-item label="供应商类别:" prop="classifyId">
          <el-select v-if="dialogState !== 'see'" v-model="supplierForm.classifyId" placeholder="请选择">
            <el-option v-for="item in proSortOptions" :key="item.id" :label="item.label" :value="item.id">
            </el-option>
          </el-select>
          <p v-else>{{supplierForm.proSortValue}}</p>
        </el-form-item>

        <el-form-item label="派单电话:">
          <el-input v-if="dialogState !== 'see'" placeholder="请输入" v-model="supplierForm.sendPhone" type="text"></el-input>
          <p v-else>{{supplierForm.sendPhone}}</p>
        </el-form-item>

        <el-form-item label="派单邮箱:" prop="sendMail">
          <el-input v-if="dialogState !== 'see'" placeholder="请输入" v-model="supplierForm.sendMail" type="text"></el-input>
          <p v-else>{{supplierForm.sendMail}}</p>
        </el-form-item>

        <el-form-item id="startDateValueItem" class="addStar" :class="{ 'is-error': !startDateValid }" label="合作开始日:">
          <el-date-picker v-if="dialogState !== 'see'" type="date" v-model="supplierForm.startDateValue" :editable="false" placeholder="请选择日期" :picker-options="pickerOptionStart" @blur="startDateValueChange">
          </el-date-picker>
          <p v-else>{{supplierForm.startDateValue | toDate}}</p>
          <div class="el-form-item__error errorTips">请选择合作开始日</div>
        </el-form-item>

        <el-form-item id="endDateValueItem" class="addStar" :class="{ 'is-error': !endDateValid }" label="合作结束日:">
          <el-date-picker v-if="dialogState !== 'see'" v-model="supplierForm.endDateValue" type="date" :editable="false" placeholder="请选择日期" :picker-options="pickerOptionEnd" @blur="endDateValueChange">
          </el-date-picker>
          <p v-else>{{supplierForm.endDateValue | toDate}}</p>
          <div class="el-form-item__error errorTips">请选择合作结束日</div>
        </el-form-item>

        <el-form-item label="是否启用:">
          <div v-if="dialogState !== 'see'" class="inpbox radio_inpbox">
            <el-radio class="radio" v-model="supplierForm.isUse" :label="1">是</el-radio>
            <el-radio class="radio" v-model="supplierForm.isUse" :label="0 ">否</el-radio>
          </div>
          <p v-else>{{supplierForm.isUse | ifOrNot}}</p>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ dialogState == 'see'?'关 闭':'取 消'}}</el-button>
        <el-button type="primary" v-if="dialogState == 'add'" @click="saveAddSupplier('supplierForm')">确 定</el-button>
        <el-button type="primary" v-if="dialogState == 'edit'" @click="saveEditSupplier('supplierForm')">确 定</el-button>
      </div>

    </el-dialog>
    <!--供应商 end-->

  </div>
</template>
<script type="text/javascript">
import { mapGetters, mapActions } from 'vuex'
import debounce from 'lodash/debounce'
import permission from '@/mixins/permission.js'

export default {
  name: 'supplier',
  data() {
    return {
      supplierNumber: '', //供应商编码
      supplierName: '', //供应商名称
      checkedAll: false, //全选初始状态
      checkModel: [], //存储选中的Id数组
      pagination: {
        curr: 1, //当前索引
        pageSize: 10 //每页显示条数
      },
      startDateValid: true,
      endDateValid: true,

      dialogFormVisible: false, //供应商编辑窗口初始隐藏
      dialogState: 'add', //弹窗入口  add为新增, edit为编辑, see为查看
      rules: {
        //效验规则
        proName: [
          { required: true, message: '请输入供应商名称', trigger: 'blur,change' }
        ],
        classifyId: [
          { required: true, message: '请选择供应商类别', trigger: 'blur,change' }
        ],
        sendMail: [
          { required: true, message: '请输入派单邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ]
      },
      pickerOptionEnd: {
        disabledDate: time => {
          let boardDateStart = this.supplierForm.startDateValue
          if (boardDateStart) {
            return time.getTime() < boardDateStart.getTime()
          }
        }
      },
      pickerOptionStart: {
        disabledDate: time => {
          let boardDateEnd = this.supplierForm.endDateValue
          if (boardDateEnd) {
            return time.getTime() > boardDateEnd.getTime()
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      proGroup: 'allProviders',
      supplierForm: 'opreProvider',
      proSortOptions: 'sortName',
      total: 'providerTotal'
    }),
    canOper: function() {
      return this.checkModel.length !== 0
    },
    frontNum: function() {
      return this.pagination.pageSize * (this.pagination.curr - 1)
    }
  },
  methods: {
    ...mapActions([
      'getAllProviders',
      'getProviderById',
      'getAllSortName',
      'editProvider',
      'addProvider',
      'batchOperProvider',
      'searchProviders'
    ]),
    getProviderParams() {
      return {
        items: {},
        limit: this.pagination.pageSize,
        pageNum: this.pagination.curr
      }
    },
    // 校验日期
    validateDate() {
      this.startDateValid = !!this.supplierForm.startDateValue
      this.endDateValid = !!this.supplierForm.endDateValue
      return this.startDateValid && this.endDateValid
    },
    // 清除日期校验
    clearDateValid() {
      this.startDateValid = true
      this.endDateValid = true
    },
    getForm() {
      return {
        items: {
          proNumber: this.supplierNumber,
          proName: this.supplierName
        },
        limit: this.pagination.pageSize,
        pageNum: this.pagination.curr
      }
    },
    //查询页面(完成)
    searchData:debounce(function(){
        this.searchProviders(this.getForm()) 
    },300),
    //重置查询条件(完成)
    reset: debounce(function() {
      this.supplierNumber = ''
      this.supplierName = ''
      this.getAllProviders(this.getProviderParams())
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
    clearCheckbox() {
      $('.modtable .checkinp').removeClass('checkedbox')
      this.checkModel = []
      this.checkedAll = false
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
    pageGo(pageNum) {
      
      if (this.pagination.curr === pageNum) {
        return
      }
      this.pagination.curr = pageNum
      this.getAllProviders(this.getProviderParams())
      this.clearCheckbox()
    },
    //获取开始时间(完成)
    startDateValueChange($val) {
      this.startDateValid = !!$val || $val.value
    },
    //获取结束时间(完成)
    endDateValueChange($val) {
      this.endDateValid = !!$val || $val.value
    },
    //新增供应商
    addSupplier() {
      this.dialogState = 'add'
      this.dialogFormVisible = true
      //新增供应商,初始清空数据
      for (let key in this.supplierForm) {
        this.supplierForm[key] = ''
      }
      this.clearDateValid()
      this.getAllSortName()
      try {
        this.$refs['supplierForm'].resetFields()
      } catch (error) {}
      this.supplierForm.isUse = 1 //默认启用
    },
    //查看供应商
    seeSupplier(item) {
      this.dialogState = 'see'
      this.dialogFormVisible = true
      this.clearDateValid()
      this.getProviderById({ id: item.pkId })
    },
    //编辑供应商
    editSupplier(item) {
      this.dialogState = 'edit'
      this.dialogFormVisible = true
      this.clearDateValid()
      //这里要通过供应商pkId重新请求数据
      // this.supplierForm= this.$store.supplier.opreProvider;
      this.getProviderById({ id: item.pkId })
      this.getAllSortName()
    },
    //批量操作供应商(完成)
    operSupplier(type) {
      if (type === 'none') {
        const hasUse = this.proGroup.some(ele => {
          return this.checkModel.indexOf(ele.pkId) > -1 && ele.isUse == 1
        })
        if (hasUse) {
          this.$message.warning('不能删除未停用供应商')
          return
        }
      }
      this.batchOperProvider({
        operType: type,
        providerIds: this.checkModel,
        param: this.getForm()
      })
      this.clearCheckbox()
    },

    //保存编辑供应商
    saveEditSupplier(formName) {
      this.$refs[formName].validate(valid => {
        valid = this.validateDate() && valid
        if (valid) {
          this.editProvider([this.supplierForm, this.getForm()])

          this.dialogFormVisible = false
        } else {
          return false
        }
      })
    },
    //保存新增供应商(完成)
    saveAddSupplier(formName) {
      this.$refs[formName].validate(valid => {
        valid = this.validateDate() && valid
        if (valid) {
          this.addProvider([this.supplierForm, this.getForm()])
          this.dialogFormVisible = false
        } else {
          return false
        }
      })
    },

    keydownSearch(){
			this.orderQuery();
		}
  },
  mixins:[permission],
  created() {
    //proGroup
    this.getAllProviders(this.getProviderParams())
  },
  mounted: function() {}
}
</script>


<style type="text/css" scoped>

</style>