<template>
  <div id="completedCheckDetail">

    <div class="table-wrap">
      <table class="table-content">
        <tr>
          <td class="content-left" valign="top">
            <ul class="dotUl">
              <li></li>
              <li></li>
              <li></li>
            </ul>
            <ul class="tap_ul">
              <li :class="{active:tabsIndex===0}" @click="tabsClick(0)">基本信息</li>
              <li v-for="(tab, tabIndex) in tabList" :key="tabIndex" @click="tabsClick(tabIndex + 1)" :class="{active:tabsIndex===(tabIndex + 1)}">
                {{tab.sortName + (tab.pkId?'':'补充')}}</li>
            </ul>
          </td>
          <td class="control-line" valign="top"></td>
          <td class="content-right" valign="top">
            <div class="btnbar" style="padding-top:25px;border-bottom: 1px solid #f2f4f8;" v-if="params.oper !=='view'">
              <input type="button" class="surebtn surereset" @click="completedCheck('reject')" value="驳回" />
              <input type="button" class="surebtn" @click="completedCheck('approve')" value="通过" />
            </div>
            <!--生成配置方案 begin-->
            <div class="item create" v-show="tabsIndex===0">

              <div class="create_content">
                <plan-basic-info :ordersPlanDetail="ordersPlanDetail" :is-check="true"></plan-basic-info>
              </div>
            </div>
            <!--生成配置方案 end-->

            <div v-if="showItem">
              <view-plan-table1 v-for="(parentItem, parentIndex) in tabList" :key="parentIndex" v-show="tabsIndex===(parentIndex+1)" :parent-item="parentItem" :room-list="roomList" :parent-index="parentIndex"></view-plan-table1>
            </div>
            <!--分类信息 end-->

          </td>
        </tr>

      </table>
    </div>

  </div>
</template>

<script>
import ViewPlanTable1 from '../plan/viewPlanTable.1.vue'
import PlanBasicInfo from '../plan/planBasicInfo.vue'

import { getCompletedBasic, getCompletedDetail, operCompletion } from '../../api/projectdelivery'

export default {
  name: 'completedCheckDetail',
  components: {
    'view-plan-table1': ViewPlanTable1,
    'plan-basic-info': PlanBasicInfo
  },
  data() {
    return {
      ordersPlanDetail: {
        propertyVo: {},
        deployDetailsVos: [],
        replenishDetailsVo: []
      },
      additionalSortObj: {},
      params: {
        oper: 'view',
        id: ''
      },
      tabsIndex: 0, //初始选中“生成配置方案”
      showItem: false
    }
  },
  computed: {
    tabList() {
      const list = this.ordersPlanDetail.deployDetailsVos || []
      const list2 = this.ordersPlanDetail.replenishDetailsVo || []
      return [...list, ...list2]
    },
    roomList() {
      try {
        return this.ordersPlanDetail.propertyVo.roomVos.map(r => {
          if (r.functionType) {
            return r.functionType
          } else {
            return r.sectionType + r.bedroomNum
          }
        })
      } catch (e) {
        return []
      }
    }
  },
  methods: {
    tabsClick(i) {
      this.tabsIndex = i
    },
    next(immediately) {},
    initPageDate() {
      this.tabsIndex = 0
      this.params = { ...this.$route.params }
      getCompletedBasic(this.params.id, data => {
        this.ordersPlanDetail = data
        this.$nextTick(() => {
          this.showItem = true
        })
      })
    },
    completedCheck(operate) {
      let sendLoading = this.$loading({ fullscreen: true, text: '提交中' })
      operCompletion(
        operate,
        this.ordersPlanDetail.orderId,
        () => {
          this.$message.success('操作成功')
          this.$store.dispatch('itemArrRemove', {
            id: this.$route.name,
            to: { id: 'completedCheck', name: '竣工验收管理', params: { updateId: new Date().getTime() } }
          })
        },
        () => this.$message.error('操作失败')
      ).finally(_ => sendLoading.close())
    }
  },
  created() {
    this.initPageDate()
    if (!this.level2UsedTree || this.level2UsedTree.length === 0) {
      this.$store.dispatch('getAllCategory')
    }
  },
  activated() {
    if (this.$route.params.id === this.params.id && this.$route.params.oper === this.params.oper) {
      return
    }
    this.initPageDate()
    this.showItem = false
  }
}
</script>

<style scoped>
#completedCheckDetail,
.table-wrap,
.table-content {
  width: 100%;
  height: 100%;
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
.content-right .btnbar {
  text-align: right;
  width: auto;
  margin-right: 35px;
}
</style>
