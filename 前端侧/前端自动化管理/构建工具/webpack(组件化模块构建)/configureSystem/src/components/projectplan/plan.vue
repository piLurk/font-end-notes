<template>
  <div id="plan" class="plan">
    <!--顶部 begin-->
    <div class="modbox">
      <div class="title">订单基本信息</div>
      <ul class="col3ul clearfix">
        <li>
          <p class="name">订单编号：</p>
          <div class="inpbox">{{orderDetail.orderNumber}}</div>
        </li>
        <li>
          <p class="name">订单预估总额：</p>
          <div class="inpbox">{{orderDetail.predictPrice | blank}} 元</div>
        </li>
        <li>
          <p class="name">预计竣工日期：</p>
          <div class="inpbox">{{orderDetail.predictDate | toDate}}</div>
        </li>
        <li class="singlerow">
          <p class="name">预计周期：</p>
          <div class="inpbox">{{orderDetail.json}}</div>
        </li>
      </ul>
    </div>
    <!--顶部 end-->

    <div class="section clearfix">
      <!--左侧 begin-->
      <div class="modbox side">
        <div class="title">施工流程参考</div>
        <ul class="stepul">
          <p class="lineP"></p>
          <li>
            <i class="num">1</i>提交闭水试验结果</li>
          <li>
            <i class="num">2</i>地板铺装</li>
          <li>
            <i class="num">3</i>隔断制作</li>
          <li>
            <i class="num">4</i>刷墙</li>
          <li>
            <i class="num">5</i>橱柜安装</li>
          <li>
            <i class="num">6</i>防水制作</li>
          <li>
            <i class="num">7</i>门窗安装</li>
          <li>
            <i class="num">8</i>墙地砖安装</li>
          <li>
            <i class="num">9</i>宽带安装</li>
          <li>
            <i class="num">10</i>布艺安装</li>
          <li>
            <i class="num">11</i>家居配送</li>
          <li>
            <i class="num">12</i>门锁安装</li>
        </ul>
      </div>
      <!--左侧 begin-->

      <!--右侧 begin-->
      <div class="main">
        <div class="modbox table-wrap">
          <div class="title">制定施工计划</div>
          <div class="count mgt15">
            <div class="tableBox">
              <table class="modtable" width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <th width="200">项目</th>
                  <th width="250" class="pdh20">指定到达时间</th>
                  <th class="pdh20">备注/线路描述</th>
                </tr>
                <tr v-for="(item, index) in planData" :key="index">
                  <td>{{item.sortName}}</td>
                  <td v-if="oper!=='view'" class="pdh20">
                    <el-date-picker v-model="item.allotDate" :picker-options="pickerOption" type="datetime" format="yyyy-MM-dd HH:mm" :default-value="defaultDate" :editable="false" placeholder="选择日期时间">
                    </el-date-picker>
                  </td>
                  <td v-else class="pdh20">{{item.allotDate | toTime00}}</td>
                  <td v-if="oper!=='view'" class="pdh20">
                    <input type="text" v-model="item.remark" placeholder="请输入" class="inp" />
                  </td>
                  <td v-else class="pdh20">{{item.remark}}</td>
                </tr>
              </table>
            </div>
            <div class="t_c mgt15" v-if="oper!=='view'">
              <!-- <input type="button" class="surebtn" value="保存" @click="save" /> -->
              <el-button type="primary" @click="save">保 存</el-button>
            </div>
          </div>
        </div>
      </div>
      <!--右侧 begin-->
    </div>

  </div>
</template>
<script type="text/javascript">
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapActions } = createNamespacedHelpers('projectplan/plan')
import {
  getConstructionPlan,
  saveConstructionPlan,
  getEditPlan,
  putEditPlan
} from '../../api/projectplan'
import { getorderDetail } from '../../api/ordermgmt'
const deleteMin = 1000 * 60 * 60

export default {
  name: 'plan',
  data() {
    return {
      // orderId: "", //订单编号
      params: {
        id: '',
        workOrdersId: '',
        oper: ''
      },
      planData: [],
      orderDetail: {},
      disabledDate: [],
      defaultDate: parseInt(new Date().getTime() / deleteMin) * deleteMin,
      pickerOption: {
        disabledDate: time => {
          if (time) {
            return (
              time.getTime() <
              new Date(new Date() - 1000 * 60 * 60 * 24).getTime()
            )
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters(['orderInfo']),
    oper() {
      return this.$route.params.oper
    }
  },
  methods: {
    save() {
      for (let i = 0, len = this.planData.length; i < len; i++) {
        if (!this.planData[i].allotDate) {
          return this.$message.warning('请填写指定到达时间')
        }
      }
      const postData = this.planData.map(ele => {
        return Object.assign({}, ele, {
          allotDate: new Date(ele.allotDate).getTime()
        })
      })
      let sendDateLoading = this.$loading({ fullscreen: true, text: '提交中' })
      ;(this.oper !== 'edit' ? saveConstructionPlan : putEditPlan)(
        postData,
        () => {
          this.$message.success('保存成功')
          this.$store.dispatch('itemArrRemove', {
            id: this.$route.name,
            to: {
              id: 'workOrderManage',
              name: '派工单管理',
              params: { updateId: new Date().getTime() }
            }
          })
        },
        () => this.$message.error('保存失败')
      ).finally(_ => sendDateLoading.close())
    },
    getOrderDetail() {
      getorderDetail(this.orderInfo.pkId, data => (this.orderDetail = data))
    },
    getConstructionPlan() {
      // 删除分钟（对小时取整）
      const initDate = data => {
        this.planData = data.map(d => {
          const dataTime = d.allotDate
            ? parseInt(d.allotDate * 1 / deleteMin) * deleteMin
            : ''
          return {
            deployDetailId: d.deployDetailId,
            remark: d.remark,
            allotDate: dataTime,
            sortName: d.sortName,
            state: d.state,
            orderId: this.orderInfo.pkId,
            pkId: d.pkId
          }
        })
        this.disabledDate = this.planData.map(ele => ele.allotDate)
      }
      if (this.oper !== 'edit') {
        getConstructionPlan(this.orderInfo.deployId, initDate)
      } else {
        getEditPlan(this.$route.params.workOrdersId, initDate)
      }
    }
  },
  activated() {
    if (
      this.$route.params.id === this.params.id &&
      this.$route.params.workOrdersId === this.params.workOrdersId &&
      this.$route.params.oper === this.params.oper
    ) {
      return
    }
    this.params = { ...this.$route.params }
    this.getOrderDetail()
    this.getConstructionPlan()
  }
}
</script>


<style scoped>
.plan {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.section {
  height: calc(100% - 188px);
  min-height: 500px;
}
.side,
.main,
.table-wrap {
  height: 100%;
  margin-bottom: 0;
}
.pdh20 {
  padding: 0 20px;
}
</style>