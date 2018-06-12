<template>
	<div id="schedulePlan">

		<div class="searchfilter col4">
			<ul class="clearfix">
				<li>
					<p class="name">收房产品：</p>
					<div class="inpbox">
						<el-select v-model="myFilterForm.housesState" placeholder="请选择">
							<el-option v-for="item in houseTypeOptions" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</div>
				</li>
				<li>
					<p class="name">工期类型：</p>
					<div class="inpbox">
						<el-select v-model="myFilterForm.ruleType" placeholder="请选择">
							<el-option v-for="item in ruleTypeOptions" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</div>
				</li>
				<li>
					<p class="name">装修项目：</p>
					<div class="inpbox"><input type="text" @keydown.enter="keydownSearch" v-model.trim="myFilterForm.goodsName" placeholder="请输入" class="inp" /></div>
				</li>
				<li class="btnbox">
					<input type="button" class="surebtn" @click="searchData" value="查询" />
					<input type="button" class="surebtn surereset" @click="reset" value="重置" />
				</li>
			</ul>
		</div>

		<!--数据列表 begin-->
		<div class="dataBox">
			<div>
				<input v-if="hasPermission('PZ_createOrModifyRule')" type="button" class="addBtn" @click="addSchedule" value="+ 添加工期规则" />
			</div>
			<div class="toolBar clearfix">
				<my-pagination :total="providerTotal" :curr="pagination.curr" :pageChange="pageGo"></my-pagination>
			</div>
			<div class="tableBox">
				<table class="modtable tableLoading schedulePlanLoading" width="100%" border="0" cellpadding="0" cellspacing="0">
					<tr>
						<th>序号</th>
						<th>收房产品</th>
						<th>工期类型</th>
						<th>装修项目</th>
						<th>触发规则</th>
						<th>装修+进场天数</th>
						<th width="200">操作</th>
					</tr>
					<tbody>
						<no-data :visible="providerTotal"></no-data>
						<tr v-for="(item,index) in GroupData">
							<td>{{frontNum+index+1}}</td>
							<td>{{item.housesState}}</td>
							<td>{{item.ruleType}}</td>
							<td>{{item.goodsName}}</td>
							<td>{{item.goodsNum}}</td>
							<td>{{item.day}}</td>
							<td width="200">
								<p class="typeControl">
									<a v-if="hasPermission('PZ_createOrModifyRule')" href="javascript:void(0)" class="e-btn mgr" :data-pkId="item.pkId" @click="editSchedule(item)">
										<i></i>编辑</a>
									<a v-if="hasPermission('PZ_deleteRule')" href="javascript:void(0)" class="d-btn" :data-pkId="item.pkId" @click="deleteScheduleForm(item)">
										<i></i>删除</a>
								</p>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="footPages">
				<el-pagination @current-change="pageGo" :current-page="pagination.curr" layout="prev, pager, next" :total="providerTotal"></el-pagination>
			</div>
		</div>
		<!--数据列表 end-->

		<!--工期规则 begin-->
		<el-dialog :close-on-click-modal="false" :visible.sync="dialogFormVisible" size="small" top="30%">
			<h3 slot="title" v-if="dialogState == 'add'" class="el-dialog__title">添加工期规则
				<span class="tiptit">
					<i>*</i>为必填项</span>
			</h3>
			<h3 slot="title" v-if="dialogState == 'edit'" class="el-dialog__title">编辑工期规则
				<span class="tiptit">
					<i>*</i>为必填项</span>
			</h3>

			<el-form :model="scheduleForm" :rules="rules" ref="scheduleForm" class="tworowForm">
				<el-form-item label="收房产品：" prop="housesState">
					<el-select v-model="scheduleForm.housesState" placeholder="请选择">
						<el-option v-for="item in houseTypeOptions" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="工期类型：" prop="ruleType">
					<el-select v-model="scheduleForm.ruleType" placeholder="请选择">
						<el-option v-for="item in ruleTypeOptions" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="装修项目：" prop="goodsName">
					<el-select v-model="scheduleForm.goodsName" filterable placeholder="请选择">
						<el-option v-for="item in goodsNameOptions" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="触发规则：" prop="goodsNum" :rules="rules.checkNum">
					<el-input placeholder="请输入" v-model.number="scheduleForm.goodsNum" type="goodsNum"></el-input>
				</el-form-item>

				<el-form-item label="装修+进场天数：" prop="day" :rules="rules.checkNum" label-width="128px">
					<el-input placeholder="请输入" v-model.number="scheduleForm.day" type="day"></el-input>
				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" v-if="dialogState == 'add'" @click="saveScheduleForm('scheduleForm')">确 定</el-button>
				<el-button type="primary" v-if="dialogState == 'edit'" @click="saveEditScheduleForm('scheduleForm')">确 定</el-button>
			</div>

		</el-dialog>
		<!--工期规则 end-->

	</div>
</template>
<script>
import {
  getSchedulePlanData,
  saveSchedulePlan,
  getGoodsName,
  getidforSchedulePlan,
  saveEditSchedulePlan,
  deleteSchedulePlan
} from '../../api/mgmtcenter'
import permission from '@/mixins/permission.js'

const initmyFilterForm = {
  housesState: '', //收房产品
  ruleType: '', //工期类型
  goodsName: '' //装修项目
}
import debounce from 'lodash/debounce'
export default {
  name: 'schedulePlan',
  data() {
    var checkNum = (rule, value, cb) => {
      if (value != 0 && !value) {
        return cb(new Error('输入不能为空！'))
      }
      if (!/^\d+$/.test(value)) {
        return cb(new Error('请输入大于等于0的正整数'))
      } else {
        cb()
      }
    }
    return {
      myFilterForm: { ...initmyFilterForm },
      formSend: JSON.parse(JSON.stringify(initmyFilterForm)),
      houseTypeOptions: [
        //收房产品选项
        { value: '', label: '全部' },
        { value: '精装', label: '精装' },
        { value: '老旧', label: '老旧' },
        { value: '毛坯', label: '毛坯' }
      ],
      ruleTypeOptions: [
        //工期类型选项
        {
          value: '',
          label: '全部'
        },
        {
          value: 'A',
          label: 'A类'
        },
        {
          value: 'B',
          label: 'B类'
        },
        {
          value: 'C1',
          label: 'C1类'
        },
        {
          value: 'C2',
          label: 'C2类'
        },
        {
          value: 'D',
          label: 'D类'
        }
      ],
      goodsNameOptions: [], //装修项目选项
      pagination: {
        curr: 1, //当前索引
        pageSize: 10 //每页显示条数
      },
      providerTotal: 0, //数据总数
      GroupData: [], //存储所有的工期规划管理数据
      dialogFormVisible: false, //工期规则窗口初始隐藏
      dialogState: 'add', //弹窗入口  add为新增, edit为编辑
      rules: {
        //效验规则
        housesState: [
          { required: true, message: '请选择收房产品', trigger: 'blur,change' }
        ],
        ruleType: [
          { required: true, message: '请选择工期类型', trigger: 'blur,change' }
        ],
        goodsName: [
          { required: true, message: '请选择装修项目', trigger: 'blur,change' }
        ],
        goodsNum: [
          { required: true, message: '请输入触发规则' },
          { type: 'number', message: '触发规则必须为数字' }
        ],
        day: [
          { required: true, message: '请输入天数' },
          { type: 'number', message: '装修+进场天数必须为数字' }
        ],
        checkNum: { validator: checkNum }
      },
      scheduleForm: {
        //弹窗form内数据
        housesState: '',
        ruleType: '',
        goodsName: '',
        goodsNum: null,
        day: null
      },
      mypkId: '' //默认pkId
    }
  },
  computed: {
    totalPage() {
      return Math.ceil(this.totalNum / this.pagination.pageSize)
    },
    frontNum() {
      return this.pagination.pageSize * (this.pagination.curr - 1)
    }
  },
  methods: {
    //获取数据(完成)
    getproGroupData(isSearch) {
      this.$store.commit('SET_LOADING', {target:"schedulePlanLoading",state:true}, { root: true })
      getSchedulePlanData(
        {
          items: this.formSend,
          limit: this.pagination.pageSize,
          pageNum: this.pagination.curr,
          isSearch
        },
        providers => {
          this.GroupData = providers.items
          this.providerTotal = providers.totalNum
        },
        () => this.$message({ type: 'error', message: '获取工期规则失败！' })
      ).finally(() => {
        this.$store.commit('SET_LOADING', {target:"schedulePlanLoading",state:false}, { root: true })
      })
    },
    //获取装修项目options数据列表
    getGoodsname() {
      getGoodsName(
        providers => {
          for (var x = 0; x < providers.length; x++) {
            this.goodsNameOptions.push({
              value: providers[x].goodsName,
              label: providers[x].goodsName
            })
          }
        },
        () => this.$message({ type: 'error', message: '获取装修项目失败！' })
      )
    },
    //查询数据(完成)
    searchData: debounce(function() {
      this.pagination.curr = 1
      this.formSend = JSON.parse(JSON.stringify(this.myFilterForm))
      this.getproGroupData() //查询数据
    }, 300),
    //重置查询条件(完成)
    reset: debounce(function() {
      this.myFilterForm = { ...initmyFilterForm }
      this.pagination.curr = 1
      this.formSend = JSON.parse(JSON.stringify(this.myFilterForm))
      this.getproGroupData() //重新查询一次所有数据
    }, 300),
    //分页请求数据
    pageGo(val) {
      if (this.pagination.curr === val) {
        return
      }
      this.pagination.curr = val
      this.getproGroupData()
    },
    //添加工期规则
    addSchedule() {
      this.dialogState = 'add'
      this.dialogFormVisible = true
      for (let key in this.scheduleForm) {
        this.scheduleForm[key] = ''
      }
      try {
        this.$refs['scheduleForm'].resetFields()
      } catch (error) {}
    },
    //保存新增工期规则
    saveScheduleForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //保存数据
          saveSchedulePlan(
            {
              ...this.scheduleForm
            },
            providers => {
              this.$message({ type: 'success', message: '保存工期规则成功！' })
            },
            () => this.$message({ type: 'error', message: '保存工期规则失败！' })
          )
          this.getproGroupData() //保存后重新查询下总数据列表
          this.dialogFormVisible = false
        } else {
          return false
        }
      })
    },
    //辑查看工期规则
    editSchedule(myid) {
      this.mypkId = myid.pkId
      this.dialogState = 'edit'
      this.dialogFormVisible = true
      getidforSchedulePlan(
        myid.pkId,
        providers => {
          this.scheduleForm.housesState = providers.housesState
          this.scheduleForm.ruleType = providers.ruleType
          this.scheduleForm.goodsName = providers.goodsName
          this.scheduleForm.goodsNum = providers.goodsNum
          this.scheduleForm.day = providers.day
        },
        () => this.$message({ type: 'error', message: '编辑工期规则失败！' })
      )
    },
    //保存编辑工期规则
    saveEditScheduleForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //保存数据
          saveEditSchedulePlan(
            {
              ...this.scheduleForm,
              pkId: this.mypkId
            },
            providers => {
              this.$message({ type: 'success', message: '保存工期规则成功！' })
              this.mypkId = '' //清空pkId
              this.getproGroupData() //保存后重新查询下总数据列表
            },
            () => this.$message({ type: 'error', message: '保存工期规则失败！' })
          )
          this.dialogFormVisible = false
        } else {
          return false
        }
      })
    },
    //删除工期规则
    deleteScheduleForm(myid) {
      this.mypkId = myid.pkId
      this.$confirm('此操作将永久删除该工期规则, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteSchedulePlan(
            myid.pkId,
            providers => {
              this.$message({ type: 'success', message: '删除工期规则成功！' })
              this.mypkId = '' //清空pkId
              this.getproGroupData()
            },
            () => this.$message({ type: 'error', message: '删除工期规则失败！' })
          )
        })
        .catch(() => {
          this.mypkId = '' //清空pkId
        })
    },
    keydownSearch() {
      this.searchData()
    }
  },
  mixins:[permission],
  beforeMount: function() {
    this.getproGroupData(true)
    this.getGoodsname()
  },
  mounted: function() {}
}
</script>
<style type="text/css">

</style>
