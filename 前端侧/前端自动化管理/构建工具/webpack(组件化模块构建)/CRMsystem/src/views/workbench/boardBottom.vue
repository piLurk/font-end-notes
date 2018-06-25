<template>
      <div class="bottom">
        <div class="leaderBoard" :class="{longWidth : !sidebar.opened}">
          <div class="title"><i></i><span>排行榜</span></div>
          <div class="tabChange"><span :class="{active:leaderBoard==1}" @click="leaderBoard=1">业务组排行</span><i class="line"></i><span :class="{active:leaderBoard==2}" @click="leaderBoardTwo">收房单量排行</span><i class="line"></i><span :class="{active:leaderBoard==3}" @click="leaderBoardThr">出房单量排行</span></div>
          <div class="leaderBoardBox1" v-show="leaderBoard==1">
              <div class="tableTitle"><span>收房</span><span>出房</span></div>
              <table class="mateTable" :class="{longWidth : !sidebar.opened}">
                <tbody>
                  <tr class="trth">
                    <th width="12.5%" class="region" @click="selectUiShow = !selectUiShow"><span v-show="rankType==0">大区</span><span v-show="rankType==1">业务组</span>
                      <span class="caret-wrapper"><i class="sort-caret up" v-show="selectUiShow"></i><i class="sort-caret down" v-show="!selectUiShow"></i></span>
                      <ul class="selectUi" v-show="selectUiShow">
                        <li @click="seeRegion">大区</li>
                        <li @click="seeGroup">业务组</li>
                      </ul>
                    </th>
                    <th width="12.5%">收房目标</th>
                    <th width="7.5%">收房套数</th>
                    <th width="7.5%">审核套数</th>
                    <th width="7.5%" class="inAchieveRate" :class="{ascending:rankSortType==0,descending:rankSortType==2}" @click="inAchieveRate">收房达成率<span class="caret-wrapper"><i class="sort-caret ascending"></i><i class="sort-caret descending"></i></span></th>
                    <th width="7.5%">环比</th>
                    <th width="7.5%">出房目标</th>
                    <th width="7.5%">出房间数</th>
                    <th width="7.5%">审核间数</th>
                    <th width="7.5%" class="outAchieveRate" :class="{ascending:rankSortType==1,descending:rankSortType==3}" @click="outAchieveRate">出房达成率<span class="caret-wrapper"><i class="sort-caret ascending"></i><i class="sort-caret descending"></i></span></th>
                    <th width="7.5%">环比</th>
                    <th width="7.5%">达成率排名</th>
                  </tr>
                  <tr v-for="(item,i) in allRankList" :key="i">
                    <td>{{item.areaNm}}</td>
                    <td>{{item.gatherExpCnt}}</td>
                    <td>{{item.gatherTotalCnt}}</td>
                    <td>{{item.gatherApprovedCnt}}</td>
                    <td>{{item.gatherReachRate}}%</td>
                    <td class="loop">{{item.gatherLoop}}%<i :class="{up:item.gatherLoop>0,down:item.gatherLoop<0}"></i></td>
                    <td>{{item.rentExpCnt}}</td>
                    <td>{{item.rentTotalCnt}}</td>
                    <td>{{item.rentApprovedCnt}}</td>
                    <td>{{item.rentReachRate}}%</td>
                    <td class="loop">{{item.rentLoop}}%<i :class="{up:item.rentLoop>0,down:item.rentLoop<0}"></i></td>
                    <td>{{item.top}}</td>
                  </tr>
                </tbody>
              </table>
              <div class="footPages">
                <el-pagination background v-on:current-change="pageGoRank1" layout="prev, pager, next" :page-size="paginationRank1.pageSize" :current-page="paginationRank1.curr" :total="rankType == 0?allAreaCount:allGroupCount" ></el-pagination>
              </div>
          </div>
          <div class="leaderBoardBox2" v-show="leaderBoard==2">
              <table class="mateTable" :class="{longWidth : !sidebar.opened}">
                <tbody>
                  <tr class="trth">
                    <th width="18.75%">综合管家</th>
                    <th width="15.625%">收房目标</th>
                    <th width="15.625%">收房套数</th>
                    <th width="15.625%">审核套数</th>
                    <th width="15.625%">收房达成率</th>
                    <th width="9.375%">大区排名</th>
                    <th width="9.375%">公司排名</th>
                  </tr>
                  <tr v-for="(item,i) in gantherList" :key="i">
                    <td>{{item.employeeNm}}({{item.businessAreaNm}})</td>
                    <td>{{item.objectiveNum}}</td>
                    <td>{{item.orderCnt}}</td>
                    <td>{{item.applyCnt}}</td>
                    <td>{{item.completeRate}}%</td>
                    <td>{{item.areaNum}}</td>
                    <td>{{item.companyNum}}</td>
                  </tr>
                </tbody>
              </table>
              <div class="footPages">
                <el-pagination background v-on:current-change="pageGoRank2" layout="prev, pager, next" :page-size="paginationRank2.pageSize" :current-page="paginationRank2.curr" :total="gantherCount" ></el-pagination>
              </div>
          </div>
          <div class="leaderBoardBox3" v-show="leaderBoard==3">
              <table class="mateTable" :class="{longWidth : !sidebar.opened}">
                <tbody>
                  <tr class="trth">
                    <th width="25%">直销管家</th>
                    <th width="18.75%">出房间数</th>
                    <th width="31.25%">审核间数</th>
                    <th width="12.5%">大区排名</th>
                    <th width="12.5%">公司排名</th>
                  </tr>
                  <tr v-for="(item,i) in rentList" :key="i">
                    <td>{{item.employeeNm}}({{item.businessAreaNm}})</td>
                    <td>{{item.orderCnt}}</td>
                    <td>{{item.applyCnt}}</td>
                    <td>{{item.areaNum}}</td>
                    <td>{{item.companyNum}}</td>
                  </tr>
                </tbody>
              </table>
              <div class="footPages">
                <el-pagination background v-on:current-change="pageGoRank3" layout="prev, pager, next" :page-size="paginationRank3.pageSize" :current-page="paginationRank3.curr" :total="rentCount" ></el-pagination>
              </div>
          </div>
        </div>
      </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'

export default {
  data(){
      return{
        selectUiShow: false,
        rankType: 0,
        rankSortType: 4,
        paginationRank1:{
            pageSize:6,
            curr:1,
        },
        leaderBoard:1,
        paginationRank2:{
            pageSize:6,
            curr:1,
        },
        paginationRank3:{
            pageSize:6,
            curr:1,
        },
        cunstomType: 0,
        paginationFollow:{
            pageSize:4,
            curr:1,
        }
      }
  },
  computed:{
    ...mapGetters([
      'userId',
      'allAreaCount',
      'allGroupCount',
      'allRankList',
      'gantherCount',
      'gantherList',
      'rentCount',
      'rentList',
      'sidebar'
    ])
  },
  methods:{
    ...mapActions({
      countAllAchievementRank:'CountAllAchievementRank',
      listAllAchievementRank:'ListAllAchievementRank',
      countGantherAchievementRank: 'CountGantherAchievementRank',
      listGatherAchievementRank: 'ListGatherAchievementRank',
      countRentAchievementRank: 'CountRentAchievementRank',
      listRentAchievementRank: 'ListRentAchievementRank',
    }),
    seeRegion(){
      this.rankType = 0;
      this.getRankCount();
      this.getRankList();
    },
    seeGroup(){
      this.rankType = 1;
      this.getRankCount();
      this.getRankList();
    },
    inAchieveRate(){
      if(this.rankSortType == 0){
        this.rankSortType = 2;
        this.getRankList();
      }else if(this.rankSortType == 2){
        this.rankSortType = 4;
        this.getRankList();
      }else{
        this.rankSortType = 0;
        this.getRankList();
      }
    },
    outAchieveRate(){
      if(this.rankSortType == 1){
        this.rankSortType = 3;
        this.getRankList();
      }else if(this.rankSortType == 3){
        this.rankSortType = 4;
        this.getRankList();
      }else{
        this.rankSortType = 1;
        this.getRankList();
      }
    },
    pageGoRank1(curr){
      if(this.paginationRank1.curr===curr){
				return;
			}
      this.paginationRank1.curr=curr;
      this.getRankList();
    },
    getRankList(){
      var data = {};
      data['userId'] = this.userId;
      data['pageSize'] = this.paginationRank1.pageSize;
      data['pageIndex'] = this.paginationRank1.curr-1;
      data['rankType'] = this.rankType;
      data['rankSortType'] = this.rankSortType;
			this.listAllAchievementRank(data);
    },
    getRankCount(){
      var data = {};
      data['userId'] = this.userId;
      data['rankType'] = this.rankType;
			this.countAllAchievementRank(data);
    },
    leaderBoardTwo(){
      this.leaderBoard =2;
      this.countGantherAchievementRank({"userId":this.userId});
      this.listGatherAchievementRank({"userId":this.userId,"pageSize":this.paginationRank2.pageSize,"pageIndex":this.paginationRank2.curr-1})
    },
    pageGoRank2(curr){
      if(this.paginationRank2.curr===curr){
				return;
      }
      this.paginationRank2.curr=curr;
      this.listGatherAchievementRank({"userId":this.userId,"pageSize":this.paginationRank2.pageSize,"pageIndex":this.paginationRank2.curr-1})
    },
    leaderBoardThr(){
      this.leaderBoard =3;
      this.countRentAchievementRank({"userId":this.userId});
      this.listRentAchievementRank({"userId":this.userId,"pageSize":this.paginationRank3.pageSize,"pageIndex":this.paginationRank3.curr-1})
    },
    pageGoRank3(curr){
      if(this.paginationRank3.curr===curr){
				return;
      }
      this.paginationRank3.curr=curr;
      this.listRentAchievementRank({"userId":this.userId,"pageSize":this.paginationRank3.pageSize,"pageIndex":this.paginationRank3.curr-1})
    }
  },
  mounted:function(){
    this.countAllAchievementRank({"userId":this.userId,"rankType":this.rankType});
    this.listAllAchievementRank({"userId":this.userId,"rankType":this.rankType,"rankSortType":this.rankSortType,"pageSize":this.paginationRank1.pageSize,"pageIndex":this.paginationRank1.curr-1});
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .bottom .leaderBoard{
    background: #fff;
    // width: 1690px;
    width: 100%;
    padding: 15px;
    display: inline-block;
    vertical-align: middle;
    // &.longWidth{
    //   width: 1820px;
    // }
    .title{
      font-family: PingFangSC-Semibold;
      font-size: 16px;
      color: #A3B2C6;
      margin-bottom: 22px;
      display: inline-block;
      >i{
        display: inline-block;
        width: 23px;
        height: 20px;
        background: url(/static/images/phb.png);
        vertical-align: middle;
        margin-right: 10px;
      }
      span{
        vertical-align: middle;
      }
    }
    .tabChange{
      padding: 0 30px;
      margin-bottom: 20px;
      .line{
        font-family: PingFangSC-Regular;
        font-size: 12px;
        background-color: #A3B2C6;
        display: inline-block;
        width: 1px;
        margin: 0 25px;
        height: 12px;
        vertical-align: middle;
      }
      span{
        height: 20px;
        line-height: 20px;
        vertical-align: middle;
        cursor: pointer;
        color: #D1D1D1;
        &.active{
          color: #576578;
        }
      }
    }
    .leaderBoardBox1{
      margin: 0 30px;
    }
    .leaderBoardBox1 .tableTitle{
      // margin: 0 30px;
      background: #F6F8F8;
      padding: 15px 0 10px 0;
      position: relative;
      height: 36px;
      span{
        position: absolute;
        font-family: MicrosoftYaHei-Bold;
        font-size: 14px;
        color: #576578;
        font-weight: 600;
        &:nth-child(1){
          left: 29%;
        }
        &:nth-child(2){
          left: 66.5%;
        }
      }
    }
    .leaderBoardBox1 .mateTable{
      // margin: 0 30px;
      border-collapse:collapse;
      width: 100%;
      // width: 1600px;
      // &.longWidth{
      //   width: 1730px;
      // }
      tbody{
        tr{
          &.trth{
            .region{
              cursor: pointer;
              position: relative;
              .selectUi{
                position: absolute;
                left: 120px;
                top: 25px;
                border: 1px solid #ebeef5;
                border-radius: 2px;
                background-color: #fff;
                box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
                // padding: 10px;
                li{
                  height: 36px;
                  line-height: 36px;
                  text-align: center;
                  width: 70px;
                  background: #fff;
                  &:hover{
                    background: #3CA0FF;
                    color: #fff;
                  }
                }
              }
            }
            .inAchieveRate{
              cursor: pointer;
              &.ascending{
                .sort-caret.ascending {
                    border-bottom-color: #409eff;
                }
              }
              &.descending{
                .sort-caret.descending {
                    border-top-color: #409eff;
                }
              }
            }
            .outAchieveRate{
              cursor: pointer;
              &.ascending{
                .sort-caret.ascending {
                    border-bottom-color: #409eff;
                }
              }
              &.descending{
                .sort-caret.descending {
                    border-top-color: #409eff;
                }
              }
            }
            background-color: #F6F8F8;border-bottom: 2px solid #e2e5e5;
            .caret-wrapper {
                display: inline-flex;
                flex-direction: column;
                align-items: center;
                height: 34px;
                width: 24px;
                vertical-align: middle;
                cursor: pointer;
                overflow: initial;
                position: relative;
                .sort-caret.ascending {
                    border-bottom-color: #c0c4cc;
                    top: 5px;
                }
                .sort-caret.up{
                    border-bottom-color: #c0c4cc;
                    top: 7px;
                }
                .sort-caret.descending {
                    border-top-color: #c0c4cc;
                    bottom: 7px;
                }
                .sort-caret.down{
                    border-top-color: #c0c4cc;
                    bottom: 9px;
                }
                .sort-caret {
                    width: 0;
                    height: 0;
                    border: 5px solid transparent;
                    position: absolute;
                }
            }
          }
          &:hover{
            >td{
              background-color: #f9fafc;
            }
          }
          td{
            text-align: center;
            background:#fff;vertical-align: middle;height:40px;
            color: #576578;word-break:break-all;max-width:200px; font-size: 14px; border-bottom: 1px solid #f1f1f1;
            &.loop{
              .up{
                display: inline-block;
                width: 6px;
                height: 14px;
                background: url(/static/images/up.png);
                vertical-align: middle;
                margin-left: 10px;
              }
              .down{
                display: inline-block;
                width: 6px;
                height: 14px;
                background: url(/static/images/down.png);
                vertical-align: middle;
                margin-left: 10px;
              }
            }
          }
          th{
            vertical-align: middle;height:40px;
            font-size: 14px; color: #a3b2c6; font-weight: 500;
            background-color: #F6F8F8;border-bottom: 2px solid #e2e5e5;
          }
        }
      }
    }
    .footPages{
      float: right;
      margin-right: 30px;
    }
    .leaderBoardBox2{
      margin: 0 30px;
    }
    .leaderBoardBox2 .mateTable{
      // margin: 0 30px;
      border-collapse:collapse;
      width: 100%;
      // width: 1600px;
      // &.longWidth{
      //   width: 1730px;
      // }
      tbody{
        tr{
          &.trth{
            background-color: #F6F8F8;border-bottom: 2px solid #e2e5e5;
          }
          &:hover{
            >td{
              background-color: #f9fafc;
            }
          }
          td{
            text-align: center;
            background:#fff;vertical-align: middle;height:40px;
            color: #576578;word-break:break-all;max-width:200px; font-size: 14px; border-bottom: 1px solid #f1f1f1;
          }
          th{
            vertical-align: middle;height:40px;
            font-size: 14px; color: #a3b2c6; font-weight: 500;
            background-color: #F6F8F8;border-bottom: 2px solid #e2e5e5;
          }
        }
      }
    }
    .leaderBoardBox3{
      margin: 0 30px;
    }
    .leaderBoardBox3 .mateTable{
      // margin: 0 30px;
      border-collapse:collapse;
      width: 100%;
      // width: 1600px;
      // &.longWidth{
      //   width: 1730px;
      // }
      tbody{
        tr{
          &.trth{
            background-color: #F6F8F8;border-bottom: 2px solid #e2e5e5;
          }
          &:hover{
            >td{
              background-color: #f9fafc;
            }
          }
          td{
            text-align: center;
            background:#fff;vertical-align: middle;height:40px;
            color: #576578;word-break:break-all;max-width:200px; font-size: 14px; border-bottom: 1px solid #f1f1f1;
          }
          th{
            vertical-align: middle;height:40px;
            font-size: 14px; color: #a3b2c6; font-weight: 500;
            background-color: #F6F8F8;border-bottom: 2px solid #e2e5e5;
          }
        }
      }
    }
  }
</style>

