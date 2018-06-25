<template>
  <div class="menu-wrapper">
    <template v-for="item in routes">
      <el-submenu v-if="item.path == '/quicklyadd' && !item.hidden&&item.children&&item.children.length>1&&permission.indexOf(item.meta.permission)>-1" :index="item.name||item.path" :key="item.name">
        <template slot="title">
          <em v-if="item.meta&&item.meta.icon" :class="'icon-logo '+item.meta.icon"></em>
          <span v-if="item.meta&&item.meta.title">{{item.meta.title}}</span>
        </template>

        <template v-if="!child.hidden" v-for="child in item.children">
          <sidebar-item class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.path"></sidebar-item>

          <el-menu-item :index="item.path+'/'+child.path" @click="itemClickFun(child.name)">
            <em v-if="child.meta&&child.meta.icon" :class="'icon-add '+child.meta.icon"></em>
            <span v-if="child.meta&&child.meta.title">{{child.meta.title}}</span>
          </el-menu-item>

        </template>
      </el-submenu>

      <!-- 只有一个子页面 -->
      <!-- <router-link v-if="item.path != '/quicklyadd' && !item.hidden&&item.children&&item.children.length===1&&permission.indexOf(item.meta.permission)>-1" :to="item.path+'/'+item.children[0].path" :key="item.children[0].name"> -->
      <a v-if="item.path != '/quicklyadd' && !item.hidden&&item.children&&item.children.length===1&&permission.indexOf(item.meta.permission)>-1" :key="item.children[0].name"  @click="pageChange(item.children[0].id, item.children[0].meta.title)">
        <el-menu-item :index="item.path+'/'+item.children[0].path" class='submenu-title-noDropdown'>
          <em v-if="item.children[0].meta&&item.children[0].meta.icon" :class="'icon-logo '+item.children[0].meta.icon"></em>
          <!-- <svg-icon v-if="item.children[0].meta&&item.children[0].meta.icon" :icon-class="item.children[0].meta.icon"></svg-icon> -->
          <span v-if="item.children[0].meta&&item.children[0].meta.title">{{item.children[0].meta.title}}</span>
        </el-menu-item>
      </a>

      <!-- 多个子页面 -->
      <el-submenu v-if="item.path != '/quicklyadd' && !item.hidden&&item.children&&item.children.length>1&&permission.indexOf(item.meta.permission)>-1" :index="item.name||item.path" :key="item.name">
        <template slot="title">
          <em v-if="item.meta&&item.meta.icon" :class="'icon-logo '+item.meta.icon"></em>
          <!-- <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon> -->
          <span v-if="item.meta&&item.meta.title">{{item.meta.title}}</span>
        </template>

        <template v-if="!child.hidden&&permission.indexOf(item.meta.permission)>-1" v-for="child in item.children">
          <sidebar-item class="nest-menu" v-if="child.children&&child.children.length>0&&permission.indexOf(item.meta.permission)>-1" :routes="[child]" :key="child.path"></sidebar-item>

          <!-- <router-link v-else :to="item.path+'/'+child.path" :key="child.name"> -->
          <a v-else :key="child.name" @click="pageChange(child.id, child.meta.title)">
            <el-menu-item :index="item.path+'/'+child.path">
              <em v-if="child.meta&&child.meta.icon" :class="'icon-add '+child.meta.icon"></em>
              <!-- <svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></svg-icon> -->
              <span v-if="child.meta&&child.meta.title">{{child.meta.title}}</span>
            </el-menu-item>
          </a>
        </template>
      </el-submenu>

    </template>

    <!-- 新增线索begin -->
    <el-dialog :close-on-click-modal="false" :modal="true" :append-to-body="true" :modal-append-to-body="true" :visible.sync="dialogFormVisible">
      <h3 slot="title" class="el-dialog__title">新增线索
        <span class="tiptit">
          <i>*</i>为必填项</span>
      </h3>

      <el-form :model="addClueForm" :rules="rules" ref="addClueForm" label-width="100px" class="tworowForm">
        <el-form-item label="姓名：" prop="renterName">
          <el-input placeholder="请输入" v-model="addClueForm.renterName" type="text"></el-input>
        </el-form-item>

        <el-form-item label="手机号码：" prop="contactTel">
          <el-input placeholder="请输入" v-model="addClueForm.contactTel" type="number"></el-input>
        </el-form-item>

        <el-form-item label="性别：" class="fullrow" prop="gender">
          <el-radio-group v-model="addClueForm.gender">
            <el-radio label="1">男</el-radio>
            <el-radio label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="客户类别：" prop="customerType">
          <el-select v-model="addClueForm.customerType" placeholder="请选择">
            <el-option v-for="item in customerTypeOptions" :key="item.dicCode" :label="item.dicName" :value="item.dicCode">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="入住人数：" prop="residentsNum">
          <el-select v-model="addClueForm.residentsNum" placeholder="请选择">
            <el-option v-for="item in residentsNumOptions" :key="item.id" :label="item.label" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="区域商圈：" class="fullrow" prop="valGroup" :rules="rules.checkPremisesId">
          <el-cascader placeholder="请选择区域商圈" v-model="addClueForm.valGroup" :options="areaOptions" @active-item-change="handleItemChange"
            @change="ItemChange" :props="props"></el-cascader>
        </el-form-item>

        <el-form-item label="意向楼盘：" class="fullrow my-select-btnrow">
          <el-button type="primary" @click="seachBuild('addClueForm')" >搜 索</el-button>
          <el-select v-model="addClueForm.roomName" ref="clueFloorSelect" filterable :filter-method="testSearch" @change="clueSelectChange(addClueForm.roomName)" no-match-text="无匹配数据" no-data-text="没有数据" placeholder="请先选择(区域商圈)，再输入'关键词'搜索">
            <el-option v-for="item in roomNameOptions" :key="item.pkId" :label="item.bedroomName" :value="item.bedroomName">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="备注描述：" class="fullrow" style="margin-top:14px;">
          <el-input type="textarea" resize="none" :rows="4" placeholder="请输入内容(50字以内)" :maxlength="50" v-model="addClueForm.demandDescribe"></el-input>
        </el-form-item>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveAddClue('addClueForm')">确 认</el-button>
      </div>

    </el-dialog>
    <!-- 新增线索end -->


    <!--新增商机begin-->
    <el-dialog :close-on-click-modal="false" :modal="true" :append-to-body="true" :modal-append-to-body="true" :visible.sync="dialogBusinessVisible" >
        <h3 slot="title" class="el-dialog__title">新增商机
          <span class="tiptit">
            <i>*</i>为必填项</span>
        </h3>
  
        <el-form :model="addBusinessForm" :rules="businessrules" ref="addBusinessForm" label-width="100px" class="tworowForm">
          <el-form-item label="姓名：" prop="proprietorName">
            <el-input placeholder="请输入" v-model="addBusinessForm.proprietorName" type="text"></el-input>
          </el-form-item>

          <el-form-item label="手机号码：" prop="contactTel">
            <el-input placeholder="请输入" v-model="addBusinessForm.contactTel" type="number"></el-input>
          </el-form-item>
  
          <el-form-item label="性别：" class="fullrow" prop="gender">
            <el-radio-group v-model="addBusinessForm.gender">
              <el-radio label="1">男</el-radio>
              <el-radio label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="客户类别：" prop="customerType">
            <el-select v-model="addBusinessForm.customerType" placeholder="请选择">
              <el-option v-for="item in customerBusinessTypeOptions" :key="item.dicCode" :label="item.dicName" :value="item.dicCode">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="区域商圈：" class="fullrow" prop="valGroup" :rules="businessrules.checkPremisesId">
            <el-cascader placeholder="请选择区域商圈" v-model="addBusinessForm.valGroup" :options="areabusinessOptions" @active-item-change="handlebusinessItemChange"
              @change="ItembusinessChange" :props="businessprops"></el-cascader>
          </el-form-item>
  
          <el-form-item label="委托楼宇：" class="fullrow my-select-btnrow">
            <el-button type="primary" @click="seachBusinessBuild('addBusinessForm')" >搜 索</el-button>
            <el-select v-model="addBusinessForm.premisesName" ref="businessFloorSelect" filterable :filter-method="testBusinessSearch" @change="businessSelectChange(addBusinessForm.premisesName)" no-match-text="无匹配数据" no-data-text="没有数据" placeholder="请先选择(区域商圈)，再输入'关键词'搜索">
              <el-option v-for="item in premisesNameOptions" :key="item.id" :label="item.premisesName" :value="item.premisesName">
              </el-option>
            </el-select>
          </el-form-item>
  
          <el-form-item label="备注描述：" class="fullrow" style="margin-top:14px;">
            <el-input type="textarea" resize="none" :rows="4" placeholder="请输入内容(50字以内)" :maxlength="50" v-model="addBusinessForm.housingDescribe"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogBusinessVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveAddBusiness('addBusinessForm')">确 认</el-button>
        </div>
    </el-dialog>
    <!--新增商机end-->


  </div>
</template>

<script>
import { getAreaOptions, getCustomerTypeOptions, getsearchHouseResourcesListOptions, saveAddNewclue } from '@/api/clue'
import { getAreaBusinessOptions, getCustomerBusinessTypeOptions, getsearchlistPremiseOptions, saveAddNewbusiness } from '@/api/business'
import { mapGetters } from 'vuex'

export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    }
  },
  data() {
    // 效验区域、商圈ID是否为空
    var checkPremisesId = (rule, value, cb) => {
      if (value.length === 0) {
        return cb(new Error('请选择区域商圈！'))
      } else {
        cb()
      }
    }
    // 效验手机号码
    var checkPhoneNumber = (rule, value, cb) => {
      var reg = 11 && /^((13|14|15|17|18|19)[0-9]{1}\d{8})$/ // 手机号正则验证
      if (!reg.test(value)) {
        return cb(new Error('输入正确的手机号码'))
      } else {
        cb()
      }
    }
    return {
      userId: null, // 用户userId
      dialogFormVisible: false, // 新增线索窗口初始隐藏
      dialogBusinessVisible: false, // 新增商机窗口初始隐藏
      rules: {
        // 效验规则
        renterName: [{
          required: true,
          message: '请输入姓名',
          trigger: 'blur,change'
        }],
        contactTel: [{
          validator: checkPhoneNumber,
          required: true,
          trigger: 'blur,change'
        }],
        gender: [{
          required: true,
          message: '请选择性别',
          trigger: 'blur,change'
        }],
        customerType: [{
          required: true,
          message: '请选择客户类别',
          trigger: 'blur,change'
        }],
        residentsNum: [{
          required: true,
          message: '请选择入住人数',
          trigger: 'blur,change'
        }],
        checkPremisesId: { validator: checkPremisesId, required: true, trigger: 'blur，change' }
      },
      businessrules: {
        // 商机效验规则
        proprietorName: [{
          required: true,
          message: '请输入姓名',
          trigger: 'blur,change'
        }],
        contactTel: [{
          validator: checkPhoneNumber,
          required: true,
          trigger: 'blur,change'
        }],
        gender: [{
          required: true,
          message: '请选择性别',
          trigger: 'blur,change'
        }],
        customerType: [{
          required: true,
          message: '请选择客户类别',
          trigger: 'blur,change'
        }],
        checkPremisesId: { validator: checkPremisesId, required: true, trigger: 'blur，change' }
      },
      addClueForm: {
        roomId: null, // 楼盘Id
        roomName: '', // 楼盘名称
        renterName: '', // 姓名
        contactTel: '', // 手机号码
        demandDescribe: '', // 备注描述
        premisesAreaId: null, // 区域Id
        premisesTradingId: null, // 商圈Id
        valGroup: [], // 数组
        gender: '', // 性别
        customerType: '', // 客户类别
        residentsNum: null // 入住人数
      },
      addBusinessForm: {
        proprietorName: '', // 业主姓名
        contactTel: '', // 手机号码
        gender: '', // 性别
        premisesId: null, // 楼盘Id
        premisesName: '', // 楼盘名称
        housingDescribe: '', // 备注描述
        premisesAreaId: null, // 区域Id
        premisesTradingId: null, // 商圈Id
        areaName:'',
        valGroup: [], // 数组
        customerType: '' // 客户类别
      },
      customerTypeOptions: [], // 客户类别选项
      customerBusinessTypeOptions: [], // 商机客户类别选项
      residentsNumOptions: [ // 入住人数
        {
          id: '1',
          label: 1
        },
        {
          id: '2',
          label: 2
        },
        {
          id: '3',
          label: 3
        },
        {
          id: '4',
          label: 4
        },
        {
          id: '5',
          label: 5
        },
        {
          id: '6',
          label: 6
        },
        {
          id: '7',
          label: 7
        },
        {
          id: '8',
          label: 8
        },
        {
          id: '9',
          label: 9
        },
        {
          id: '10',
          label: 10
        }
      ],
      areaOptions: [], // 新增线索默认大区
      areaOptionsIndex: [],
      props: {
        value: 'id',
        children: 'Group'
      },
      roomNameOptions: [],
      areabusinessOptions: [], // 新增线索默认大区
      areabusinessOptionsIndex: [],
      businessprops: {
        value: 'id',
        children: 'Group'
      },
      premisesNameOptions: []
    }
  },
  computed: {
    // 新增线索(新增线索Form)
    addclueFormPara() {
      return {
        userId: this.userId,
        roomId: this.addClueForm.roomId,
        premisesName: this.addClueForm.roomName,
        renterName: this.addClueForm.renterName,
        contactTel: this.addClueForm.contactTel,
        demandDescribe: this.addClueForm.demandDescribe,
        premisesAreaId: this.addClueForm.premisesAreaId,
        premisesTradingId: this.addClueForm.premisesTradingId,
        gender: this.addClueForm.gender,
        customerType: this.addClueForm.customerType,
        residentsNum: this.addClueForm.residentsNum
      }
    },
    // 新增商机(新增商机Form)
    addbusinessFormPara() {
      return {
        userId: this.userId,
        premisesId: this.addBusinessForm.premisesId,
        premisesName: this.addBusinessForm.premisesName,
        proprietorName: this.addBusinessForm.proprietorName,
        contactTel: this.addBusinessForm.contactTel,
        housingDescribe: this.addBusinessForm.housingDescribe,
        premisesAreaId: this.addBusinessForm.premisesAreaId,
        areaName:this.addBusinessForm.areaName,
        premisesTradingId: this.addBusinessForm.premisesTradingId,
        gender: this.addBusinessForm.gender,
        customerType: this.addBusinessForm.customerType
      }
    },
    permission() {
      return this.$store.getters.permission
    },
    roles() {
      return this.$store.getters.roles
    }
  },
  created() {
    // 获取全局变量userId
    this.userId = this.$store.getters.userId

    // 新增线索初始执行方法
    this.getAreaOptionsFun()
    this.getCustomerTypeOptionsFun()

    // 新增商机初始执行方法
    this.getAreaBusinessOptionsFun()
    this.getCustomerBusinessTypeOptionsFun()
  },
  methods: {
    // 点击执行的事件
    itemClickFun(name) {
      if (name === 'addclue') {
        this.showClueDialog()
      } else if (name === 'addbusiness') {
        this.showBusinessDialog()
      }
    },
    // 点击新增Class
    addClassFun() {
      this.selected = !this.selected
    },
    // 点击展示新增线索弹窗
    showClueDialog() {
      this.dialogFormVisible = true
      // 需清空原始输入数据
      this.addClueForm.renterName = '' // 姓名
      this.addClueForm.contactTel = '' // 手机号码
      this.addClueForm.demandDescribe = '' // 备注描述
      this.addClueForm.premisesAreaId = null // 区域Id
      this.addClueForm.premisesTradingId = null // 商圈Id
      this.addClueForm.roomName = '' // 楼盘名称
      this.addClueForm.valGroup = [] // 数组
      this.addClueForm.gender = '' // 性别
      this.addClueForm.customerType = '' // 客户类别
      this.addClueForm.residentsNum = null // 入住人数
    },
    // 点击展示新增商机弹窗
    showBusinessDialog() {
      this.dialogBusinessVisible = true
      this.addBusinessForm.premisesId = null // 楼盘id
      this.addBusinessForm.proprietorName = '' // 业主姓名
      this.addBusinessForm.contactTel = '' // 手机号码
      this.addBusinessForm.gender = '' // 性别
      this.addBusinessForm.premisesName = '' // 楼盘名称
      this.addBusinessForm.housingDescribe = '' // 备注描述
      this.addBusinessForm.premisesAreaId = null // 区域Id
      this.addBusinessForm.premisesTradingId = null // 商圈Id
      this.addBusinessForm.valGroup = [] // 数组
      this.addBusinessForm.customerType = '' // 客户类别
      this.addBusinessForm.areaName = '' // 商圈name
    },
    // 新增线索获取客户类别
    getCustomerTypeOptionsFun() {
      getCustomerTypeOptions({
        userId: this.userId
      }).then(response => {
        this.customerTypeOptions = response.data.customerTypes
      }).catch(err => {
        console.log(err)
      })
    },
    // 新增商机获取客户类别
    getCustomerBusinessTypeOptionsFun() {
      getCustomerBusinessTypeOptions({
        userId: this.userId
      }).then(response => {
        this.customerBusinessTypeOptions = response.data.customerTypes
      }).catch(err => {
        console.log(err)
      })
    },
    // 新增线索获取大区数据
    getAreaOptionsFun() {
      getAreaOptions({
        dataType: 0
      }).then(response => {
        for (var x = 0; x < response.data.tradingAreas.length; x++) {
          this.areaOptionsIndex[response.data.tradingAreas[x].id] = x
          this.areaOptions.push({
            label: response.data.tradingAreas[x].dataName,
            id: response.data.tradingAreas[x].id,
            Group: []
          })
        }
        // console.log(this.areaOptions)
      }).catch(err => {
        console.log(err)
      })
    },
    // 选择区域商圈选择器
    handleItemChange(val) {
      var newindex = this.areaOptionsIndex[val]
      setTimeout(_ => {
        getAreaOptions({
          dataType: 1,
          parentId: val[0]
        }).then(response => {
          for (var x = 0; x < response.data.tradingAreas.length; x++) {
            this.areaOptions[newindex].Group.push({
              label: response.data.tradingAreas[x].dataName,
              id: response.data.tradingAreas[x].id
            })
          }
        }).catch(err => {
          console.log(err)
        })
      }, 300)
    },
    // 选择商圈触发方法
    ItemChange(val) {
      this.addClueForm.premisesAreaId = val[0]
      this.addClueForm.premisesTradingId = val[1]
    },
    // 根据区域及商圈Id和关键词查询意向楼盘
    seachBuild(formName) {
      this.$refs[formName].validateField('valGroup', valid => {
        if (!valid) {
          if (this.addClueForm.roomName === '') {
            this.$message({ type: "error", message: "关键词不能为空" })
          } else {
            this.roomNameOptions = [] // 清空已查询的结果
            getsearchHouseResourcesListOptions({
              houseResourcesName: this.addClueForm.roomName,
              premisesAreaId: this.addClueForm.premisesAreaId,
              premisesTradingId: this.addClueForm.premisesTradingId
            }).then(response => {
              for (var y = 0; y < response.data.bedroomLists.length; y++) {
                this.roomNameOptions.push({
                  pkId: response.data.bedroomLists[y].pkId,
                  bedroomName: response.data.bedroomLists[y].bedroomName
                })
              }
              this.$refs['clueFloorSelect'].focus()
            }).catch(err => {
              console.log(err)
            })
          }
        }
      })
    },
    // 保存新增线索
    saveAddClue(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.dialogFormVisible = false
          saveAddNewclue(this.addclueFormPara).then(response => {
            this.$message({ type: 'success', message: response.message })
            this.roomNameOptions = []
          }).catch(err => {
            console.log(err)
          })
        } else {
          return false
        }
      })
    },
    // 监控搜索框内的 "关键词"
    testSearch(val) {
      this.addClueForm.roomName = val
    },
    // 监听线索楼盘选中的值
    clueSelectChange(value) {
      for (var z = 0; z < this.roomNameOptions.length; z++) {
        if (this.roomNameOptions[z].bedroomName == value) {
          this.addClueForm.roomId = this.roomNameOptions[z].pkId
        }
      }
    },
    // 商机方法分割线
    // 新增商圈获取大区数据
    getAreaBusinessOptionsFun() {
      getAreaBusinessOptions({
        dataType: 0
      }).then(response => {
        for (var x = 0; x < response.data.tradingAreas.length; x++) {
          this.areabusinessOptionsIndex[response.data.tradingAreas[x].id] = x
          this.areabusinessOptions.push({
            label: response.data.tradingAreas[x].dataName,
            id: response.data.tradingAreas[x].id,
            Group: []
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 选择区域商圈选择器
    handlebusinessItemChange(val) {
      var newindex = this.areabusinessOptionsIndex[val]
      setTimeout(_ => {
        getAreaBusinessOptions({
          dataType: 1,
          parentId: val[0]
        }).then(response => {
          for (var x = 0; x < response.data.tradingAreas.length; x++) {
            this.areabusinessOptions[newindex].Group.push({
              label: response.data.tradingAreas[x].dataName,
              id: response.data.tradingAreas[x].id
            })
          }
        }).catch(err => {
          console.log(err)
        })
      }, 300)
    },
    // 选择商圈触发方法
    ItembusinessChange(val) {
      var areaId = val[0];
      var arr = this.areabusinessOptions;
      for(let i =0 ;i<arr.length;i++){
        if(arr[i].id === areaId) {
          this.addBusinessForm.areaName = arr[i].label
          break;
        }
      }
      
      this.addBusinessForm.premisesAreaId = val[0]
      this.addBusinessForm.premisesTradingId = val[1]
    },
    // 根据区域及商圈Id和关键词查询意向楼盘
    seachBusinessBuild(formName) {
      this.$refs[formName].validateField('valGroup', valid => {
        if (!valid) {
          if (this.addBusinessForm.premisesName === '') {
            this.$message({ type: "error", message: "关键词不能为空" })
          } else {
            this.premisesNameOptions = [] // 清空已查询的结果
            getsearchlistPremiseOptions({
              searchWord: this.addBusinessForm.premisesName,
              premisesAreaId: this.addBusinessForm.premisesAreaId,
              tradingId: this.addBusinessForm.premisesTradingId,
              pageIndex: 0,
              pageSize: 10
            }).then(response => {
              for (var y = 0; y < response.data.premises.length; y++) {
                this.premisesNameOptions.push({
                  id: response.data.premises[y].id,
                  premisesName: response.data.premises[y].premisesName
                })
              }
              this.$refs['businessFloorSelect'].focus() // 搜索框获取焦点
            }).catch(err => {
              console.log(err)
            })
          }
        }
      })
    },
    // 监控搜索框内的 "关键词"
    testBusinessSearch(val) {
      this.addBusinessForm.premisesName = val
    },
    // 监听商机楼盘选中的值
    businessSelectChange(value) {
      for (var z = 0; z < this.premisesNameOptions.length; z++) {
        if (this.premisesNameOptions[z].premisesName == value) {
          this.addBusinessForm.premisesId = this.premisesNameOptions[z].id
        }
      }
    },
    // 保存新增商机
    saveAddBusiness(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.dialogBusinessVisible = false
          saveAddNewbusiness(this.addbusinessFormPara).then(response => {
            this.$message({ type: 'success', message: response.message })
            // 清空刚刚楼盘检索出来的列表选项数据
            this.premisesNameOptions = []
          }).catch(err => {
            console.log(err)
          })
        } else {
          return false
        }
      })
    },
    pageChange(componentId, componentName) {
      if (!componentId) return;
      this.$store.dispatch("itemArrAdd", {
        name: componentName,
        id: componentId,
        params:{},
      });
    }
  }
}
</script>
