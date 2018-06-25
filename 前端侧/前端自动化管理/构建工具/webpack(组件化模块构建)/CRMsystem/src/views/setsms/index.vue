<template>
  <div class="setsms-container">
    <div class="smsBox">
      <div><el-button class="greenBtn" @click="showDialog" >增加节日祝福</el-button></div>
      <!--节日祝福列表数据 begin-->
      <el-table :data="tableData" class="modtable" empty-text="暂无数据" header-row-class-name="headth" style="margin-top:20px;width:100%" v-loading.body="listLoading"
        element-loading-text="Loading" highlight-current-row>
        <el-table-column prop="holidayName" label="节日"></el-table-column>
        <el-table-column prop="holidayDate" label="发送日期"></el-table-column>
        <el-table-column label="发送状态">
          <template slot-scope="scope">
            <span v-if="scope.row.sendFlag == false">未发送</span>
            <span v-else>已发送</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
          <p v-if="scope.row.sendFlag == false" class="typeControl">
            <a href="javascript:void(0)" class="e-btn" @click="deleteHoliday(scope.row.id)" >
            <i></i>删除</a>
          </p>
          </template>
        </el-table-column>
      </el-table>
      <!--节日祝福列表数据 end-->

      <div class="footPages t_r" v-if="countNum != 0">
        <el-pagination @current-change="pageGo" :current-page="pagination.curr" layout="prev, pager, next" :total="countNum"></el-pagination>
      </div>
    </div>

    <!-- 增加节日祝福 begin -->
    <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :modal="true" width="30%" :append-to-body="true" :modal-append-to-body="true" :visible.sync="dialogFormVisible">
      <h3 slot="title" class="el-dialog__title">新增节日祝福</h3>
      <el-form :model="addHolidayForm" :rules="rules" ref="addHolidayForm" label-width="100px" class="onerowForm" >
          
        <el-form-item label="选择节日：" prop="sendContent" >
          <el-select v-model="addHolidayForm.sendContent" @change="changeValue" placeholder="请选择">
            <el-option v-for="item in holidayNameTypeOptions" :key="item.dicCode" :label="item.dicName" :value="item.dicCode">
            </el-option>
          </el-select>
        </el-form-item>
        
        <el-form-item label="选择日期：" prop="holidayDate" >
          <el-date-picker
            v-model="addHolidayForm.holidayDate" :picker-options="checkOptionStart"
            type="date" value-format='yyyy-MM-dd'
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveNewholiday('addHolidayForm')">保 存</el-button>
      </div>

    </el-dialog>
    <!-- 增加节日祝福 end -->

  </div>
</template>

<script>
import {
  getlistHoliday,
  getCount,
  getlistData,
  deleteHoliday,
  saveHoliday,
  getServiceDate
} from '@/api/setsms'
import { mapGetters } from 'vuex'

export default {
  name: 'setsms',
  data() {
    return {
      userId: null, // 用户userId
      listLoading: false, // 数据是否加载完成
      serviceDate: '', // 服务器时间
      checkOptionStart: {
        disabledDate: (time) => {
          let boardDateEnd = this.serviceDate
          if (!!boardDateEnd) {
            return time.getTime() < boardDateEnd
          }
        }
      },
      tableData: [], // 节日列表数据
      rules: {
        // 效验规则
        sendContent: [{ required: true, message: '请选择节日', trigger: 'blur,change' }],
        holidayDate: [{ required: true, message: '请选择日期', trigger: 'blur,change' }]
      },
      dialogFormVisible: false, // 新增节日祝福弹窗
      pagination: {
        curr: 1, // 当前索引
        pageSize: 10 // 每页显示条数
      },
      countNum: 0, // 默认数据(全部节假日列表)总数为0
      addHolidayForm: {
        holidayName: '',
        holidayDate: '',
        sendContent: ''
      },
      holidayNameTypeOptions: [] // 节假日选项列表
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ]),
    // 新增节假日数据
    filterForm() {
      return {
        userId: this.userId, // 当前用户id
        holidayName: this.addHolidayForm.holidayName,
        holidayDate: this.addHolidayForm.holidayDate,
        sendContent: this.addHolidayForm.sendContent
      }
    }
  },
  created() {
    // 获取全局变量userId
    this.userId = this.$store.getters.userId
    this.getCountFun()
    this.getlistDataFun()
    this.getlistHolidayFun()
    this.getServiceDateFun()
  },
  methods: {
    // 获取服务器时间
    getServiceDateFun() {
      getServiceDate({}).then(response => {
        this.serviceDate = response.data
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取节日列表的总数据条数
    getCountFun() {
      getCount({
        userId: this.userId
      }).then(response => {
        this.countNum = response.data.count
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取节日列表总数据
    getlistDataFun() {
      getlistData({
        userId: this.userId,
        pageIndex: this.pagination.curr - 1,
        pageSize: this.pagination.pageSize
      }).then(response => {
        this.tableData = response.data.crmProprietorBlessings
      }).catch(err => {
        console.log(err)
      })
    },
    // 删除节日
    deleteHoliday(myid) {
      this.$confirm('此操作将删除该节日, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteHoliday({
          userId: this.userId,
          id: myid
        }).then(response => {
          this.$message({ type: 'success', message: '删除成功', duration: 2000 })
          this.getCountFun()
          this.getlistDataFun()
        }).catch(err => {
          console.log(err)
        })
      }).catch(() => { })
    },
    // 获取节日选项列表
    getlistHolidayFun() {
      getlistHoliday({
        userId: this.userId
      }).then(response => {
        this.holidayNameTypeOptions = response.data.holidays
      }).catch(err => {
        console.log(err)
      })
    },
    // 监听新增节日祝福时，选择器值的变化
    changeValue(val) {
      this.addHolidayForm.holidayName = this.holidayNameTypeOptions[val].dicName
    },
    // 展示新增节日祝福弹窗
    showDialog() {
      this.dialogFormVisible = true
      this.addHolidayForm.holidayName = ''
      this.addHolidayForm.holidayDate = ''
      this.addHolidayForm.sendContent = ''
    },
    // 保存新增节日祝福
    saveNewholiday(formName) {
      console.log(this.filterForm)
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.dialogFormVisible = false
          saveHoliday(this.filterForm).then(response => {
            this.$message({ type: 'success', message: response.message })
            // 保存成功后重新查询总数据
            this.getCountFun()
            this.getlistDataFun()
          }).catch(err => {
            console.log(err)
          })
        } else {
          return false
        }
      })
    },
    // 分页请求数据
    pageGo(val) {
      if (val === this.pagination.curr) {
        return
      }
      this.pagination.curr = val
      this.getlistDataFun()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.setsms-container {
  padding: 15px;
}
.smsBox {padding: 25px;width: 100%;background-color: #fff}
</style>
