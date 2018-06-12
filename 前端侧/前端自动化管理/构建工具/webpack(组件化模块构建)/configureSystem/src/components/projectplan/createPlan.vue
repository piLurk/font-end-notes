<template>
  <div id="createPlan">
    <div class="table-wrap">
      <table class="table-content">
        <tr>
          <td class="content-left" valign="top" v-if="params.type === 0">
            <ul class="dotUl">
              <li></li>
              <li></li>
              <li></li>
            </ul>
            <ul class="tap_ul">
              <li :class="{active:tabsIndex===0}" @click="tabsClick(0)">生成配置方案</li>
              <li v-for="(tab, tabIndex) in tabList" :key="tabIndex" @click="tabsClick(tabIndex + 1)" :class="{active:tabsIndex===(tabIndex + 1), 'error-tab': tabListError[tabIndex]}"> {{tab.sortName}}</li>
            </ul>
          </td>
          <td class="control-line" valign="top" v-if="params.type === 0"></td>
          <td class="content-right" valign="top">

            <!--生成配置方案 begin-->
            <div class="item create" v-show="tabsIndex===0">

              <div class="create_content">
                <plan-basic-info :ordersPlanDetail="ordersPlanDetail" v-on:change="listenAdditionalSortId"></plan-basic-info>

                <!-- 超标备注 或 下单原因 begin-->
                <div class="item" v-if="params.type === 1">
                  <h3 v-text="ordersPlanDetail.deployTypeName ==='租期配置'?'下单原因':'超标备注'"></h3>
                  <ul class="item_ul clearfix">
                    <li style="width: 100%;">
                      <span class="tit">请输入{{ordersPlanDetail.deployTypeName ==='租期配置'?'下单原因':'超标备注'}}：</span>
                      <span class="content" style="width: 50%">
                        <p v-if="params.oper === 'view'">{{ordersPlanDetail.exceedRemark}}</p>
                        <el-input v-else @blur="remarkBlur" ref="exceedRemark" v-model="ordersPlanDetail.exceedRemark" placeholder="请输入" width="200px"></el-input>
                      </span>
                    </li>
                  </ul>
                </div>
                <!-- 超标备注 end-->

                <!-- 新建补充方案 -->
                <div v-if="params.type===1&&params.oper==='create'&&additionalSortObj.pkId">
                  <edit-plan-table v-on:updateForm="listenUpdateForm" :parent-item="additionalSortObj" :update="update" :sort-id="additionalSortObj.pkId" :contract-number="ordersPlanDetail.contractNumber"></edit-plan-table>
                  <div class="btnbar">
                    <el-button type="primary" :loading="buttonLoading" @click="savePlan(true)">保存配置方案</el-button>
                    <el-button @click="back()"> 取 消 </el-button>
                  </div>
                </div>

                <!-- 编辑补充方案 -->
                <div v-if="params.type===1&&params.oper==='edit'&&ordersPlanDetail.deployDetailsVos">
                  <edit-plan-table v-on:updateForm="listenUpdateForm" :parent-item="ordersPlanDetail.deployDetailsVos[0]" :sort-id="ordersPlanDetail.deployDetailsVos[0].sortId" :update="update" :contract-number="ordersPlanDetail.contractNumber"></edit-plan-table>
                  <div class="btnbar">
                    <el-button type="primary" :loading="buttonLoading" @click="savePlan(true)">保存配置方案</el-button>
                    <el-button @click="back()"> 取 消 </el-button>
                  </div>
                </div>

                <!-- 查看补充方案 -->
                <div v-if="params.type===1&&params.oper==='view'">
                  <view-plan-table v-if="ordersPlanDetail.deployDetailsVos" :parent-item="ordersPlanDetail.deployDetailsVos[0]"></view-plan-table>
                </div>

              </div>
            </div>
            <!--生成配置方案 end-->

            <!-- 分类信息 begin-->
            <div v-if="params.type===0 && (params.oper === 'create' || params.oper === 'edit')">
              <edit-plan-table v-for="(parentItem, parentIndex) in tabList" :key="parentIndex" v-show="tabsIndex===(parentIndex+1)" v-on:updateForm="listenUpdateForm" :parent-item="parentItem" :parent-index="parentIndex" :tabs-index="tabsIndex" :update.sync="update" :contract-number="ordersPlanDetail.contractNumber"></edit-plan-table>

              <div class="btnbar" v-if="tabsIndex !== 0">
                <el-button type="primary" v-if="tabsIndex === tabsLength" :loading="buttonLoading" @click="savePlan()">保存配置方案</el-button>
                <el-button type="primary" v-else @click="next()"> 下一步 </el-button>
              </div>
            </div>

            <div v-if="params.type===0 && params.oper === 'view'">
              <view-plan-table v-for="(parentItem, parentIndex) in tabList" :key="parentIndex" v-show="tabsIndex===(parentIndex+1)" :parent-item="parentItem" :parent-index="parentIndex"></view-plan-table>
            </div>
            <!--分类信息 end-->

          </td>
        </tr>

      </table>
    </div>

  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapActions } = createNamespacedHelpers('projectplan/createPlan')

import ViewPlanTable from '../plan/viewPlanTable.vue'
import PlanBasicInfo from '../plan/planBasicInfo.vue'
import EditPlanTable from '../plan/editPlanTable.vue'

import { saveConfPlan, editConfPlan } from '../../api/projectplan'

// // 检查数据完整性
// const isIntegrity = ele =>
//   ele.sortId &&
//   ele.goodsId &&
//   ele.key &&
//   !isNaN(ele.number) &&
//   ele.number !== '' &&
//   ele.number !== null &&
//   ele.number !== undefined &&
//   ele.functionType

// const formatFormDate = c => {
//   c.map(ele => ({
//     disposition: ele.disposition.filter(isIntegrity),
//     accessory
//   }))
// }

export default {
  name: 'createPlan',
  components: {
    'view-plan-table': ViewPlanTable,
    'edit-plan-table': EditPlanTable,
    'plan-basic-info': PlanBasicInfo
  },
  data() {
    return {
      additionalSortObj: {},
      remark: '',
      params: {
        oper: 'create',
        type: 0,
        id: ''
      },
      tabsIndex: 0, //初始选中“生成配置方案”
      formDate: [],
      sendDateLoading: null,
      buttonLoading: false,
      update: false // 子组件向上传递数据
    }
  },
  computed: {
    ...mapGetters({
      ordersPlanDetail: 'ordersPlanDetail',
      providerIdMap: 'providerIdMap',
      roomList: 'roomList'
    }),
    tabList() {
      let _list = this.$store.getters['projectplan/createPlan/tabList']
      if (this.params.oper !== 'view') {
        return _list
      } else {
        return _list.filter(l => l.pkId)
      }
    },
    tabsLength() {
      try {
        return this.tabList.length
      } catch (error) {
        return 0
      }
    },
    tabListError() {
      if (this.$route.params.oper === 'create') {
        return this.tabList.map(tab => !this.providerIdMap[tab.pkId])
      } else {
        return this.tabList.map(tab => false)
      }
    }
  },
  watch: {
    tabsIndex(newValue) {
      const i = newValue - 1
      if (i < 0 || this.params.oper === 'view') {
        return
      }
    }
  },
  methods: {
    ...mapActions({
      getOrdersPlanDetail: 'getOrdersPlanDetail',
      getConfPlan: 'getConfPlan',
      clearPlanDetail: 'clearPlanDetail'
    }),

    tabsClick(i) {
      if (this.tabListError[i - 1]) {
        this.$message.error(`该楼盘没有 ${this.tabList[i - 1].sortName} 供应商，此分类下物品无效`)
      }
      this.tabsIndex = i
    },
    listenAdditionalSortId(val) {
      this.additionalSortObj = {
        pkId: val.sortId,
        sortName: val.sortName
      }
    },
    getFormatFormDate() {
      const _flag = this.params.type === 1
      const deployDetailsVos = this.formDate.map((sortItem, sortIndex) => ({
        pkId: sortItem.pkId,
        sortId: this.additionalSortObj.sortId || sortItem.sortId,
        deployId: sortItem.deployId,
        modify: sortItem.modify,
        deployParticularMap: {
          goods: sortItem.deployParticularMap.goods,
          rooms: sortItem.deployParticularMap.rooms
        }
      }))
      const { pkId, orderId, deployType, exceedRemark, contractNumber } = this.ordersPlanDetail
      return {
        pkId,
        orderId,
        deployType,
        exceedRemark,
        contractNumber,
        deployDetailsVos
      }
    },
    listenUpdateForm(val) {
      this.formDate.push(val)
      if (this.params.type === 1 || this.formDate.length === this.tabList.length) {
        this.update = false
        let _putFn, mess
        if (this.params.oper === 'create') {
          _putFn = saveConfPlan
          mess = '生成'
        } else if (this.params.oper === 'edit') {
          _putFn = editConfPlan
          mess = '编辑'
        }
        this.sendDateLoading = this.$loading({ fullscreen: true, text: '提交中' })
        _putFn(
          this.getFormatFormDate(),
          d => {
            this.update = false
            this.$message.success(`${mess}配置方案成功`)
            this.back()
          },
          d => {
            this.update = false
            this.$message.error(`${mess}配置方案失败`)
          }
        ).finally(_ => this.sendDateLoading && this.sendDateLoading.close())
      }
    },
    back() {
      this.update = false
      this.$store.dispatch('itemArrRemove', {
        id: this.$route.name,
        to: {
          id: 'configuePlanManage',
          name: '配置方案管理',
          params: { updateId: new Date().getTime() }
        }
      })
    },
    next() {
      this.update = this.tabsIndex
      this.$nextTick(function() {
        if (this.update !== 'error') {
          this.tabsIndex += 1
        }
        setTimeout(() => {
          this.update = false
        }, 300)
      })

      if (this.tabListError[this.tabsIndex]) {
        this.$message.warning(
          `该楼盘没有 ${this.tabList[this.tabsIndex].sortName} 供应商，此分类下物品无效`
        )
      }
    },
    savePlan(immediately) {
      if (this.params.oper !== 'view' && this.params.type === 1) {
        if (this.ordersPlanDetail.exceedRemark === '' || this.ordersPlanDetail.exceedRemark === null) {
          this.$message.error('超标备注输入不能为空！')
          return
        } else if (this.ordersPlanDetail.exceedRemark.length > 50) {
          this.$message.error('超标备注输入不能超过50字！')
          return
        }
      }
      if (immediately) {
        this.update = true
        setTimeout(() => {
          this.update = false
        }, 300)

        this.buttonLoading = true
        setTimeout(() => {
          this.buttonLoading = false
        }, 3000)

        this.formDate = []
        return
      }
      if (this.tabListError[this.tabsIndex]) {
        this.$message.error(`该楼盘没有 ${this.tabList[this.tabsIndex].sortName} 供应商，此分类下物品无效`)
      }
      if (this.tabsIndex < this.tabsLength) {
        this.tabsIndex++
      } else {
        this.update = true
        setTimeout(() => {
          this.update = false
        }, 300)

        this.buttonLoading = true
        setTimeout(() => {
          this.buttonLoading = false
        }, 3000)

        this.formDate = []
      }
    },
    initPageDate() {
      this.formDate = []
      this.tabsIndex = 0
      this.params = { ...this.$route.params }
      this.clearPlanDetail()
      if (this.params.oper === 'create') {
        this.getOrdersPlanDetail(this.params).then(() => {
          this.$nextTick(function() {
            if (this.ordersPlanDetail.deployTypeName.indexOf('标准') > -1) {
              this.params.type = 0
            } else {
              this.params.type = 1
            }
          })
        })
      } else {
        this.getConfPlan(this.params)
      }
    },
    remarkBlur() {
      if (this.ordersPlanDetail.exceedRemark === '' || this.ordersPlanDetail.exceedRemark === null) {
        this.$message.error('超标备注输入不能为空！')
      } else if (this.ordersPlanDetail.exceedRemark.length > 50) {
        this.$message.error('超标备注输入不能超过50字！')
      }
    }
  },
  created() {
    this.initPageDate()
    if (!this.level2UsedTree || this.level2UsedTree.length === 0) {
      this.$store.dispatch('getAllCategory')
    }
  },
  activated() {
    if (
      this.$route.params.id === this.params.id &&
      this.$route.params.type === this.params.type &&
      this.$route.params.oper === this.params.oper
    ) {
      return
    }
    this.initPageDate()
  },
  mounted() {
    window.addEventListener('resize', () => {
      ;[].forEach.call(document.querySelectorAll('.el-select-dropdown'), function(s) {
        s.style.display = 'none'
      })
    })
  }
}
</script>

<style scoped>
input[disabled] {
  background-color: #eef1f6;
  color: #bbb;
  cursor: not-allowed;
}
#createPlan {
  height: 100%;
}
.btnbar {
  margin-bottom: 20px;
}
.table-wrap {
  height: 100%;
}
.table-content {
  height: 100%;
  width: 100%;
  position: relative;
  border-collapse: collapse;
}

.table-content .content-right > .item {
  padding-bottom: 20px;
}
.content-right .form-box {
  padding-top: 20px;
  padding-bottom: 5px;
  padding-left: 20px;
  border-bottom: 1px solid #f2f4f8;
  background-color: #fff;
}
.content-right .inp-item {
  width: 25%;
  display: inline-block;
  margin-top: 0;
  padding-bottom: 15px;
}
.content-right .inp-item.timeLong {
  width: 50%;
}
.content-right .inp-item.timeLong {
  width: 50%;
}
.inp-item.timeLong div.el-date-editor.el-input {
  width: 45%;
}
.content-right .inp-item.multiple-sel {
  min-width: 360px;
}

.content-right .inp-item > p {
  float: left;
  width: 75px;
  line-height: 36px;
  padding-left: 15px;
  height: 36px;
  color: #576578;
}
.content-right .inp-item.middle > p {
  width: 85px;
}
.content-right .inp-item .inp-box {
  margin-left: 95px;
  margin-right: 15px;
}
.content-right .inp-item.middle .inp-box {
  margin-left: 105px;
}

.content-left .tap_ul {
  padding: 20px 10px 25px 20px;
}
.content-left .tap_ul li {
  line-height: 65px;
  cursor: pointer;
  height: 65px;
  padding-left: 30px;
  font-size: 16px;
  border-bottom: 1px solid #f2f4f8;
}
.content-left .tap_ul li.active {
  color: #3ba0ff;
}
.create_content .item .item_ul li {
  height: 40px;
  line-height: 40px;
  width: 25%;
  float: left;
}
.create_content .item .item_ul li .tit {
  color: #a3b2c6;
  padding-left: 35px;
}
.create_content .item .item_ul li .content {
  display: inline-block;
  color: #151515;
}
.create_content .item .item_ul li.reason {
  width: 100%;
  margin-bottom: 35px;
}
.create_content .item .item_ul li.reason input {
  display: inline-block;
  width: calc(100% - 145px);
}
.create_content .btn_wrap {
  text-align: center;
}
.hosehold_appliances .tableBox {
  padding-top: 10px;
}
.error-tab {
  color: #ff4949;
}
</style>