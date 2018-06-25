<template>
  <div class="settarget-container">
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <!--   --------------------------------- 总目标 版块begin -----------------------------------------------   -->
      <el-tab-pane label="总目标" name="totalGoal">
        <div class="goalBox">
          <div><el-button class="greenBtn" @click="showFirstdialog" >设置总目标</el-button></div>
          <!--各大区目标数据 begin-->

          <el-table :data="tableData" empty-text="暂无数据" header-row-class-name="headth" style="margin-top:20px;width:100%" v-loading.body="listLoading"
            element-loading-text="Loading" highlight-current-row show-summary sum-text="业务拓展部">
            <el-table-column prop="areaNm" label="大区"></el-table-column>
            <el-table-column prop="gantherObjective" label="收房套数"></el-table-column>
            <el-table-column prop="rentObjective" label="出房间数"></el-table-column>
          </el-table>

        <!--各大区目标数据 end-->
        </div>
      </el-tab-pane>
      <!--   --------------------------------- 总目标 版块end -----------------------------------------------   -->

      <!--   --------------------------------- 业务组目标 版块begin -----------------------------------------------   -->
      <el-tab-pane label="业务组目标" name="teamGoal">
        <div class="goalBox">
          <!-- 各业主组目标数据 begin -->
          <div class="tableBox">
            <table class="modtable" width="100%" border="0" cellpadding="0" cellspacing="0">
              <tr>
                <th width="20%">大区名称</th>
                <th width="20%">业务组</th>
                <th width="20%">收房套数</th>
                <th width="20%">出房间数</th>
                <th width="20%">操作</th>
              </tr>
              <tr>
                <td>业务拓展部</td>
                <td>渠道业务组</td>
                <td>{{allAcceptHouseFun}}</td>
                <td>{{allOutRoomFun}}</td>
                <td>&nbsp;</td>
              </tr>
              <tr v-for="(item,index,key) in teamTableName">
                <td colspan="5" style="padding:0;">
                  <table class="modtable" width="100%" border="0" cellpadding="0" cellspacing="0">
                    <tr v-for="(myitem,myindex) in teamTableData[item]">
                      <td width="20%" v-if="myindex == 0" :rowspan="teamTableData[item].length">{{myitem.areaNm}}</td>
                      <td width="20%">{{myitem.userName}}</td>
                      <td width="20%">{{myitem.gantherObjective}}</td>
                      <td width="20%">{{myitem.rentObjective}}</td>
                      <td width="20%" v-if="myindex == 0">
                        <p class="typeControl">
                            <a href="javascript:void(0)" class="e-btn" @click="editTeamData(teamTableData[item])">
                            <i></i>编辑</a>
                        </p>
                      </td>
                      <td width="20%" v-else >&nbsp;</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </div>
          <!-- 各业主组目标数据 end -->
        </div>
      </el-tab-pane>
      <!--   --------------------------------- 业务组目标 版块end -----------------------------------------------   -->

      <!--   --------------------------------- 管家目标 版块begin -----------------------------------------------   -->
      <el-tab-pane label="管家目标" name="housekeeperGoal">
        <div class="goalBox">
          <!-- 各管家目标数据 begin -->
          <div class="tableBox">
            <table class="modtable" width="100%" border="0" cellpadding="0" cellspacing="0">
              <tr>
                <th width="25%">业务组</th>
                <th width="25%">管家</th>
                <th width="25%">收房套数</th>
                <th width="25%">操作</th>
              </tr>
              <tr v-for="(item,index,key) in housekeeperTableName">
                <td colspan="4" style="padding:0;">
                  <table class="modtable" width="100%" border="0" cellpadding="0" cellspacing="0">
                    <tr v-for="(myitem,myindex) in housekeeperTableData[item]">
                      <td width="25%" v-if="myindex == 0" :rowspan="housekeeperTableData[item].length">{{myitem.businessAreaNm}}</td>
                      <td width="25%">{{myitem.userName}}</td>
                      <td width="25%">{{myitem.gantherObjective}}</td>
                      <td width="25%" v-if="myindex == 0">
                        <p class="typeControl">
                            <a href="javascript:void(0)" class="e-btn" @click="editHousekeeperData(housekeeperTableData[item])">
                            <i></i>编辑</a>
                        </p>
                      </td>
                      <td width="20%" v-else >&nbsp;</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </div>
          <!-- 各管家目标数据 end -->
        </div>
      </el-tab-pane>
      <!--   --------------------------------- 管家目标 版块end -----------------------------------------------   -->

    </el-tabs>

    <!-- 设置总目标 begin -->
    <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :modal="true" :append-to-body="true" :modal-append-to-body="true" :visible.sync="dialogFirstVisible" @close="cancelTotalGoal">
      <h3 slot="title" class="el-dialog__title">设置总目标</h3>
      <div class="tableBox">
        <table class="modtable" width="100%" border="0" cellpadding="0" cellspacing="0">
          <tr>
            <th>大区名称</th>
            <th>收房目标</th>
            <th>出房目标</th>
          </tr>
          <tr v-for="item in tableData">
            <td>{{item.areaNm}}</td>
            <td><el-input-number v-model="item.gantherObjective" :controls="false" :min="1"></el-input-number> 套</td>
            <td><el-input-number v-model="item.rentObjective" :controls="false" :min="1"></el-input-number> 间</td>
          </tr>
          <tr>
            <td>总目标</td>
            <td>收房 {{allAcceptHouseFun}} 套</td>
            <td>出房 {{allOutRoomFun}} 间</td>
          </tr>
        </table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelTotalGoal">取 消</el-button>
        <el-button type="primary" @click="saveTotalGoal">保 存</el-button>
      </div>

    </el-dialog>
    <!-- 设置总目标 end -->



    <!-- 设置业务组目标 begin -->
    <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :modal="true" :append-to-body="true" :modal-append-to-body="true" :visible.sync="dialogSecondVisible" @close="cancelTeamGoal">
      <h3 slot="title" class="el-dialog__title">设置业务组目标</h3>
      <div class="tableBox">
        <table class="modtable" width="100%" border="0" cellpadding="0" cellspacing="0">
          <tr>
            <th>业务组名称</th>
            <th>收房目标</th>
            <th>出房目标</th>
          </tr>
          <tr v-for="(teamitem,teamindex) in currentGroup">
              <td>{{teamitem.businessAreaNm}}</td>
              <td><el-input-number v-model="teamitem.gantherObjective" @change="numberChange" :controls="false" :min="1" :max="1000"></el-input-number> 套</td>
              <td><el-input-number v-model="teamitem.rentObjective" @change="numberChange" :controls="false" :min="1" :max="1000"></el-input-number> 间</td>
          </tr>
          <tr>
              <td>{{currentALLGroup.areaNm}}</td>
              <td>{{currentALLGroup.gantherObjective}}</td>
              <td>{{currentALLGroup.rentObjective}}</td>
          </tr>
        </table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelTeamGoal">取 消</el-button>
        <el-button type="primary" @click="saveTeamGoal">保 存</el-button>
      </div>

    </el-dialog>
    <!-- 设置业务组目标 end -->


    <!-- 设置管家目标 begin -->
    <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :modal="true" :append-to-body="true" :modal-append-to-body="true" :visible.sync="dialogThirdVisible" @close="cancelHousekeeperGoal">
      <h3 slot="title" class="el-dialog__title">设置管家目标</h3>
      <div class="tableBox">
        <table class="modtable" width="100%" border="0" cellpadding="0" cellspacing="0">
          <tr>
            <th>管家名称</th>
            <th>收房目标</th>
          </tr>
          <tr v-for="(teamitem,teamindex) in currenthousekeeperGroup">
              <td>{{teamitem.userName}}</td>
              <td><el-input-number v-model="teamitem.gantherObjective" @change="numberHouseChange" :controls="false" :min="1" :max="1000"></el-input-number> 套</td>
          </tr>
          <tr>
              <td>{{currentALLhousekeeperGroup.businessAreaNm}}</td>
              <td>{{currentALLhousekeeperGroup.gantherObjective}}</td>
          </tr>
        </table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelHousekeeperGoal">取 消</el-button>
        <el-button type="primary" @click="saveHousekeeperGoal">保 存</el-button>
      </div>

    </el-dialog>
    <!-- 设置管家目标 end -->


  </div>
</template>

<script>
import {
  getlistAllObjectives,
  savebatchUpdateObjective,
  getlistAreaObjectives,
  getlistGroupObjectives
} from '@/api/settarget'
import { mapGetters } from 'vuex'

export default {
  name: 'settarget',
  data() {
    return {
      userId: null, // 用户userId
      activeName: 'totalGoal', // 初始栏目(总目标)
      listLoading: false, // 数据是否加载完成
      tableData: [], // 大区总目标表格数据
      tableDatabackup: [], // 数据备份防止双向绑定后取消还原
      teamTableData: [], // 业务组目标表格数据
      teamTableName: [], // 业务组所属大区名称
      currentALLGroup: [], // 当前业务组总数据
      currentGroup: [], // 当前业务组数据
      housekeeperTableData: [], // 管家目标数据表格
      housekeeperTableName: [], // 管家所属大区
      currentALLhousekeeperGroup: [], // 当前管家大区总数据
      currenthousekeeperGroup: [], // 当前管家大区数据
      changeFlag: false, // 监控业务组目标数据是否发生改变
      changehousekeeperFlag: false, // 监控管家目标数据是否发生改变
      dialogFirstVisible: false, // 设置总目标窗口初始隐藏
      dialogSecondVisible: false, // 设置业务组目标窗口初始隐藏
      dialogThirdVisible: false // 设置管家目标窗口初始隐藏
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ]),
    // 计算收房总目标
    allAcceptHouseFun: function() {
      var allacceptHouse = 0
      for (var y = 0; y < this.tableData.length; y++) {
        allacceptHouse += this.tableData[y].gantherObjective
      }
      return allacceptHouse
    },
    // 计算出房总目标
    allOutRoomFun: function() {
      var alloutRoom = 0
      for (var y = 0; y < this.tableData.length; y++) {
        alloutRoom += this.tableData[y].rentObjective
      }
      return alloutRoom
    }
  },
  created() {
    // 获取全局变量userId
    this.userId = this.$store.getters.userId
    this.getlistAllObjectivesFun()
  },
  methods: {
    // 切换选项卡
    handleClick(tab, event, name) {
      if (tab.name === 'totalGoal') {
        this.getlistAllObjectivesFun()
      } else if (tab.name === 'teamGoal') {
        this.teamTableData = []
        this.teamTableName = []
        this.getlistAreaObjectivesFun()
      } else if (tab.name === 'housekeeperGoal') {
        this.housekeeperTableData = []
        this.housekeeperTableName = []
        this.getlistGroupObjectivesFun()
      }
    },
    // 获取大区数据列表
    getlistAllObjectivesFun() {
      getlistAllObjectives({ userId: this.userId }).then(response => {
        this.tableData = []
        this.tableDatabackup = []
        for (var x = 0; x < response.data.crmAchievementObjectives.length; x++) {
          this.tableData.push(
            {
              id: response.data.crmAchievementObjectives[x].id,
              areaNm: response.data.crmAchievementObjectives[x].areaNm,
              userId: response.data.crmAchievementObjectives[x].userId,
              userName: response.data.crmAchievementObjectives[x].userName,
              rentObjective: response.data.crmAchievementObjectives[x].rentObjective,
              gantherObjective: response.data.crmAchievementObjectives[x].gantherObjective
            }
          )
          this.tableDatabackup.push(
            {
              id: response.data.crmAchievementObjectives[x].id,
              areaNm: response.data.crmAchievementObjectives[x].areaNm,
              userId: response.data.crmAchievementObjectives[x].userId,
              userName: response.data.crmAchievementObjectives[x].userName,
              rentObjective: response.data.crmAchievementObjectives[x].rentObjective,
              gantherObjective: response.data.crmAchievementObjectives[x].gantherObjective
            }
          )
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取大区下业务组列表
    getlistAreaObjectivesFun() {
      getlistAreaObjectives({ userId: this.userId }).then(response => {
        this.teamTableData = []
        this.teamTableName = []
        for (var x = 0; x < response.data.crmAchievementObjectives.length; x++) {
          if (!this.teamTableData[response.data.crmAchievementObjectives[x].areaNm]) {
            this.teamTableData[response.data.crmAchievementObjectives[x].areaNm] = []
            this.teamTableName.push(response.data.crmAchievementObjectives[x].areaNm)
          }
          this.teamTableData[response.data.crmAchievementObjectives[x].areaNm].push({
            id: response.data.crmAchievementObjectives[x].id,
            businessAreaNm: response.data.crmAchievementObjectives[x].businessAreaNm,
            areaNm: response.data.crmAchievementObjectives[x].areaNm,
            userId: response.data.crmAchievementObjectives[x].userId,
            userName: response.data.crmAchievementObjectives[x].userName,
            rentObjective: response.data.crmAchievementObjectives[x].rentObjective,
            gantherObjective: response.data.crmAchievementObjectives[x].gantherObjective
          })
        }
        this.changeFlag = false
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取大区下管家目标列表
    getlistGroupObjectivesFun() {
      getlistGroupObjectives({ userId: this.userId }).then(response => {
        this.housekeeperTableData = []
        this.housekeeperTableName = []
        for (var x = 0; x < response.data.crmAchievementObjectives.length; x++) {
          if (!this.housekeeperTableData[response.data.crmAchievementObjectives[x].businessAreaNm]) {
            this.housekeeperTableData[response.data.crmAchievementObjectives[x].businessAreaNm] = []
            this.housekeeperTableName.push(response.data.crmAchievementObjectives[x].businessAreaNm)
          }
          this.housekeeperTableData[response.data.crmAchievementObjectives[x].businessAreaNm].push({
            id: response.data.crmAchievementObjectives[x].id,
            businessAreaNm: response.data.crmAchievementObjectives[x].businessAreaNm,
            areaNm: response.data.crmAchievementObjectives[x].areaNm,
            userId: response.data.crmAchievementObjectives[x].userId,
            userName: response.data.crmAchievementObjectives[x].userName,
            rentObjective: response.data.crmAchievementObjectives[x].rentObjective,
            gantherObjective: response.data.crmAchievementObjectives[x].gantherObjective
          })
        }
        this.changehousekeeperFlag = false
      }).catch(err => {
        console.log(err)
      })
    },
    // 编辑业务组目标
    editTeamData(teamdata) {
      this.currentALLGroup = [] // 清空数据
      this.currentGroup = [] // 清空数据
      this.dialogSecondVisible = true
      this.currentALLGroup = teamdata[0]
      for (var n = 1; n < teamdata.length; n++) {
        this.currentGroup.push(teamdata[n])
      }
    },
    // 编辑管家目标
    editHousekeeperData(teamdata) {
      this.currentALLhousekeeperGroup = [] // 清空数据
      this.currenthousekeeperGroup = [] // 清空数据
      this.dialogThirdVisible = true
      this.currentALLhousekeeperGroup = teamdata[0]
      for (var n = 1; n < teamdata.length; n++) {
        this.currenthousekeeperGroup.push(teamdata[n])
      }
    },
    // 点击弹窗设置总目标
    showFirstdialog() {
      this.dialogFirstVisible = true
    },
    // 保存设置总目标
    saveTotalGoal() {
      if (this.allAcceptHouseFun % 1 > 0) {
        this.$message({ type: 'error', message: '收房总目标不能为小数', duration: 2000 })
      } else if (this.allOutRoomFun % 1 > 0) {
        this.$message({ type: 'error', message: '出房总目标不能为小数', duration: 2000 })
      } else {
        var feature_group_json = JSON.stringify(this.tableData)
        savebatchUpdateObjective(
          {
            objectivesStr: feature_group_json,
            userId: this.userId,
            objectivesFromType: '1'
          }
        ).then(response => {
          this.$message({ type: 'success', message: response.message, duration: 2000 })
          this.dialogFirstVisible = false
          this.getlistAllObjectivesFun()
        }).catch(err => {
          console.log(err)
        })
      }
    },
    // 取消设置总目标
    cancelTotalGoal() {
      this.dialogFirstVisible = false
      for (var k = 0; k < this.tableDatabackup.length; k++) {
        for (var q = 0; q < this.tableData.length; q++) {
          if (this.tableData[q].userId == this.tableDatabackup[k].userId) {
            this.tableData[q].gantherObjective = this.tableDatabackup[k].gantherObjective
            this.tableData[q].rentObjective = this.tableDatabackup[k].rentObjective
            break
          }
        }
      }
    },
    // 取消保存业务组目标
    cancelTeamGoal() {
      this.dialogSecondVisible = false
      if (this.changeFlag) {
        this.getlistAreaObjectivesFun()
      }
    },
    // 取消保存管家目标
    cancelHousekeeperGoal() {
      this.dialogThirdVisible = false
      if (this.changehousekeeperFlag) {
        this.getlistGroupObjectivesFun()
      }
    },
    // 保存设置业务组目标
    saveTeamGoal() {
      var allTeamacceptHouse = 0 // 计算业务组合计收房目标
      var allTeamoutRoom = 0 // 计算业务组合计出房目标
      for (var l = 0; l < this.currentGroup.length; l++) {
        allTeamacceptHouse += this.currentGroup[l].gantherObjective
      }
      for (var m = 0; m < this.currentGroup.length; m++) {
        allTeamoutRoom += this.currentGroup[m].rentObjective
      }
      if (allTeamacceptHouse % 1 > 0) {
        this.$message({ type: 'error', message: '收房总目标不能为小数', duration: 2000 })
      } else if (allTeamoutRoom % 1 > 0) {
        this.$message({ type: 'error', message: '出房总目标不能为小数', duration: 2000 })
      }
      // else if (allTeamacceptHouse > this.currentALLGroup.gantherObjective) {
      //   this.$message({ type: 'error', message: '收房总目标不能大于区域总目标数', duration: 2000 })
      // } else if (allTeamoutRoom > this.currentALLGroup.rentObjective) {
      //   this.$message({ type: 'error', message: '出房总目标不能大于区域总目标数', duration: 2000 })
      // }
      else {
        var feature_Team_json = JSON.stringify(this.currentGroup)
        savebatchUpdateObjective(
          {
            objectivesStr: feature_Team_json,
            userId: this.userId,
            objectivesFromType: '2'
          }
        ).then(response => {
          this.$message({ type: 'success', message: response.message, duration: 2000 })
          this.dialogSecondVisible = false
          this.getlistAreaObjectivesFun()
        }).catch(err => {
          console.log(err)
        })
      }
    },
    // 保存设置管家目标
    saveHousekeeperGoal() {
      var allhousekeeperHouse = 0 // 计算业务组合计收房目标
      for (var l = 0; l < this.currenthousekeeperGroup.length; l++) {
        allhousekeeperHouse += this.currenthousekeeperGroup[l].gantherObjective
      }
      if (allhousekeeperHouse % 1 > 0) {
        this.$message({ type: 'error', message: '收房总目标不能为小数', duration: 2000 })
      }
      // else if (allhousekeeperHouse > this.currentALLhousekeeperGroup.gantherObjective) {
      //   this.$message({ type: 'error', message: '收房总目标不能大于区域总目标数', duration: 2000 })
      // }
      else {
        var feature_housekeeper_json = JSON.stringify(this.currenthousekeeperGroup)
        savebatchUpdateObjective(
          {
            objectivesStr: feature_housekeeper_json,
            userId: this.userId,
            objectivesFromType: '3'
          }
        ).then(response => {
          this.$message({ type: 'success', message: response.message, duration: 2000 })
          this.dialogThirdVisible = false
          this.getlistGroupObjectivesFun()
        }).catch(err => {
          console.log(err)
        })
      }
    },
    // 监听业务组目标数是否发生改变
    numberChange() {
      this.changeFlag = true
    },
    // 监听管家目标数是否发生改变
    numberHouseChange() {
      this.changehousekeeperFlag = true
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.settarget-container {
  padding: 15px;
}
.goalBox {padding: 25px;width: 100%;}
</style>
