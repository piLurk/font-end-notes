<template>
  <div id="createPlan">
    <div class="table-wrap">
      <table class="table-content">
        <tr>
          <td class="content-right" valign="top">

            <!--生成配置方案 begin-->
            <div class="item create" v-show="tabsIndex===0">

              <div class="create_content">
                <div class="t_r clearfix pdt20 pdr30">
                  <input type="button" value="驳 回" @click="rejectPlan" class="surebtn orangebtn" />
                  <input type="button" value="通 过" @click="passedPlan" class="surebtn greenbtn" />
                </div>
                <plan-basic-info :ordersPlanDetail="ordersPlanDetail" v-on:change="listenAdditionalSortId"></plan-basic-info>

                <!-- 超标备注 begin-->
                <div class="item">
                  <h3>超标备注</h3>
                  <ul class="item_ul clearfix">
                    <li style="width: 100%;">
                      <span class="tit">请输入超标备注：</span>
                      <span class="content" style="width: 50%">
                        <p>{{ordersPlanDetail.exceedRemark}}</p>
                      </span>
                    </li>
                  </ul>
                </div>
                <!-- 超标备注 end-->

                <!-- 查看补充方案 -->
                <div>
                  <view-plan-table v-if="ordersPlanDetail.deployDetailsVos" :parent-item="ordersPlanDetail.deployDetailsVos[0]"></view-plan-table>
                </div>

              </div>
            </div>
            <!--生成配置方案 end-->

          </td>
        </tr>

      </table>
    </div>

  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapGetters, mapActions } = createNamespacedHelpers(
  "projectplan/createPlan"
);

import ViewPlanTable from "../plan/viewPlanTable.vue";
import PlanBasicInfo from "../plan/planBasicInfo.vue";

import { saveConfPlan, editConfPlan } from "../../api/projectplan";
import { approvePlan } from "../../api/mgmtcenter";

const formatFormDate = c => {
  c.map(ele => ({
    disposition: ele.disposition.filter(isIntegrity),
    accessory
  }));
};

export default {
  name:'approvePlan',
  components: {
    "view-plan-table": ViewPlanTable,
    "plan-basic-info": PlanBasicInfo
  },
  data() {
    return {
      additionalSortObj: {},
      remark: "",
      params: {
        oper: "create",
        type: 0,
        id: ""
      },
      tabsIndex: 0, //初始选中“生成配置方案”
      formDate: [],
      // level2UsedTree: [],
      update: false // 子组件向上传递数据
    };
  },
  computed: {
    ...mapGetters({
      ordersPlanDetail: "ordersPlanDetail",
      providerIdMap: "providerIdMap",
      tabList: "tabList"
    }),
    tabsLength() {
      try {
        return this.tabList.length;
      } catch (error) {
        return 0;
      }
    }
  },

  methods: {
    ...mapActions({
      getOrdersPlanDetail: "getOrdersPlanDetail",
      getConfPlan: "getConfPlan",
      clearPlanDetail: "clearPlanDetail"
    }),

    listenAdditionalSortId(val) {
      this.additionalSortObj = {
        pkId: val.sortId,
        sortName: val.sortName
      };
    },
    initPageDate() {
      this.formDate = [];
      this.tabsIndex = 0;
      this.params = { ...this.$route.params };
      this.clearPlanDetail();
      if (this.params.oper === "create") {
        this.getOrdersPlanDetail(this.params);
      } else {
        this.getConfPlan(this.params);
      }
    },
    goBack() {
      this.$store.dispatch("itemArrRemove", {
        id: this.$route.name,
        to: { id: "approvalConfiguration", name: "配置方案审批", params: { updateId: new Date().getTime() } }
      });
    },
    //驳回方法
    rejectPlan() {
      this.$prompt("确定驳回配置方案?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /[^\s]+/,
        inputPlaceholder: "请输入驳回原因",
        inputErrorMessage: "请输入驳回原因"
      })
        .then(({ value }) => {
          approvePlan(
            {
              pkId: this.params.id,
              state: 2,
              remark: value
            },
            () => {
              this.$message.success("已驳回！");
              this.goBack();
            },
            () => this.$message.error("驳回失败！")
          );
        })
        .catch(() => {
          this.$message({ type: "info", message: "已取消驳回！" });
        });
    },
    passedPlan() {
      this.$confirm("确定通过配置方案?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          approvePlan(
            {
              pkId: this.params.id,
              state: 3
            },
            () => {
              this.$message.success("已审批！");
              this.goBack();
            },
            () => this.$message.error("审批失败！")
          );
        })
        .catch(() => {
          this.$message({ type: "info", message: "已取消审批！" });
        });
    }
  },
  created() {
    this.initPageDate();
    if (!this.level2UsedTree || this.level2UsedTree.length === 0) {
      this.$store.dispatch("getAllCategory");
    }
  },
  activated() {
    if (
      this.$route.params.id === this.params.id &&
      this.$route.params.type === this.params.type &&
      this.$route.params.oper === this.params.oper
    ) {
      return;
    }
    this.initPageDate();
  }
};
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
  margin-top: 20px;
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
</style>