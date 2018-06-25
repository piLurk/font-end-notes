<template>
  <div class="workbench-container" id="workbench">
    <div class="workbench-content" :class="{longWidth : !sidebar.opened}">
      <div class="top">
        <workbench-top></workbench-top>
      </div>
      <div class="middle">
        <div class="middleLeft">
          <div class="salesBrief">
            <div class="title"><i></i><span>销售简报</span></div>
            <!-- <div class="tabChange"><span :class="{active : inhouseBrief == 0}" @click="inhouseList">收房</span><i class="line"></i><span :class="{active :inhouseBrief == 1}" @click="outhouseList">出房</span></div> -->
            <div class="week"><span :class="{active : weekBrief ==1}" @click="weekBriefOne">第一周</span><span :class="{active : weekBrief ==2}" @click="weekBriefTwo">第二周</span><span :class="{active : weekBrief ==3}" @click="weekBriefThr">第三周</span><span :class="{active : weekBrief ==4}" @click="weekBriefFour">第四周</span></div>
            <div class="saleItems">
                <div class="item">
                    <div class="dealNumb"><span>成交单量</span><div class="right"><span id="">{{briefList.singCount}}</span><span>单</span></div></div>
                    <div class="businessNumb"><span>商机量</span><div class="right"><span id="">{{briefList.followPersonCount}}</span><span>个</span></div></div>
                    <div class="followRate"><span>及时跟进率</span><div class="right"><span id="">{{briefList.notTimeOutRate}}</span><span>%</span></div></div>
                </div>
            </div>
          </div>
          <div class="announcementRemind">
            <div class="title"><i></i><span>公告提醒</span></div>
            <div class="tabChange" @click="toReadAllRemind">全部标记为已读</div>
            <div class="remind"><span><i>{{remindList.tipsCount}}</i>个退租提醒</span><span><i>{{remindList.timeOutCount}}</i>个跟进超时提醒</span></div>
            <div class="remindItems">
              <div class="item" :class="{hasRead : item.readFlag}" v-for="(item,i) in remindList.tips" :key="i" @click="toReadRemind(item)">
                <i></i>
                <span>{{item.tipTime}}&nbsp;&nbsp;&nbsp;&nbsp;{{item.userName}}&nbsp;&nbsp;&nbsp;&nbsp;{{item.tipType}}</span>
              </div>
            </div>
            <div class="footPages">
						  <el-pagination v-on:current-change="pageGoRemind" layout="prev, pager, next" :page-size="paginationRemind.pageSize" :current-page="paginationRemind.curr" :total="allRemindNum" ></el-pagination>
					  </div>
          </div>
        </div>
        
        <div class="inOut" :class="{longWidth : !sidebar.opened}">
          <div class="title"><i></i><span>收房目标及完成情况</span></div>
          <div class="inDataItems">
              <div class="item" v-for="(item,i) in ganthAchievementList.rankRecords" :key="i">
                  <div class="mouth">{{item.month}}</div>
                  <div class="right">
                    <div class="inTotle">出房总量<span>{{item.compeletNum}}</span>间</div>
                    <div class="rightBottom">
                        <div class="twoRow">公司排名<span>{{item.companyRank}}</span></div>
                        <div class="thrRow">大区排名<span>{{item.areaRank}}</span></div>
                    </div>
                  </div>
              </div>
          </div>
          <div class="pieChart">
              <div class="echart_box" id="inhouseEchart"></div>
              <ul class="colorList">
                  <li><i class="circle"></i>本月目标<span>{{ganthAchievementList.objectiveCount}}</span>套</li>
                  <li><i class="circle"></i>已完成<span>{{ganthAchievementList.ganthCount}}</span>套</li>
              </ul>    
          </div>
          <div class="houseState">
              <div class="emptyCnt">
                  <div class="title">空置中</div>
                  <div class="dataNum">{{houseStateList.emptyCnt}}</div>
              </div>
              <div class="confCnt">
                  <div class="title">配置中</div>
                  <div class="dataNum">{{houseStateList.confCnt}}</div>
              </div>
              <div class="releaseCnt">
                  <div class="title">释放中</div>
                  <div class="dataNum">{{houseStateList.releaseCnt}}</div>
              </div>
              <div class="putwayCnt">
                  <div class="title">上架中</div>
                  <div class="dataNum">{{houseStateList.putwayCnt}}</div>
              </div>
              <div class="waitCnt">
                  <div class="title">待租中</div>
                  <div class="dataNum">{{houseStateList.waitCnt}}</div>
              </div>
              <div class="saleCnt">
                  <div class="title">促销房</div>
                  <div class="dataNum">{{houseStateList.saleCnt}}</div>
              </div>
          </div>
        </div>
        <div class="cancellation">
          <div class="title"><i></i><span>跟进情况</span></div>
          <div class="tabChange"><span :class="{active : cunstomType == 0}" @click="newRentList">租客</span><i class="line"></i><span :class="{active :cunstomType == 1}" @click="newOwnerList">业主</span></div>
          <div class="newCustomItems">
              <div class="item" v-for="(item,i) in newCustomList" :key="i">
                  <div class="time"><span>{{item.createTime}}</span><span>{{item.createDate}}</span></div>
                  <div class="doat"></div>
                  <div class="line"></div>
                  <div class="followStat">{{item.followStat}}</div>
                  <div class="info name"><span>客户：</span><span>{{item.userName}}</span></div>
                  <div class="info name"><span>管家：</span><span>{{item.managerName}}</span></div>
                  <div class="info"><span>签约：</span><span>{{item.signFlag}}</span></div>
              </div>
          </div>
          <div class="footPages">
						  <el-pagination v-on:current-change="pageGoFollow" layout="prev, pager, next" :page-size="paginationFollow.pageSize" :current-page="paginationFollow.curr" :total="newCustomCount" ></el-pagination>
					</div>
        </div>
      </div>
      <div class="bottom">
        <board-bottom></board-bottom>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import workbenchTop from '@/views/workbench/workbenchTop'
import boardBottom from '@/views/workbench/boardBottom'

export default {
  name: 'workbench',
  data() {
    return {
      paginationRemind:{
        pageSize:4,
        curr:1,
      },
      inhouseBrief: 0,
      weekBrief: 1,
      cunstomType: 0,
      paginationFollow:{
        pageSize:9,
        curr:1,
      }
    }
  },
  components:{
    workbenchTop,
    boardBottom
  },
  computed: {
    ...mapGetters([
      'allRemindNum',
      'remindList',
      'userId',
      'weekCount',
      'briefList',
      'newCustomCount',
      'newCustomList',
      // 'rentAchievementList',
      'ganthAchievementList',
      'houseStateList',
      'sidebar'
    ])
  },
  methods:{
    ...mapActions({
      getRemindNum:'GetRemindNum',
      getRemindList:'GetRemindList',
      readRemind:'ReadRemind',
      readAllRemind:'ReadAllRemind',
      getWeekCount: 'GetWeekCount',
      seeWeekBrief:'SeeWeekBrief',
      countNewCustom:'CountNewCustom',
      listNewCustom:'ListNewCustom',
      // viewRentAchievement: 'ViewRentAchievement',
      viewGanthAchievement: 'ViewGanthAchievement',
      viewHouseState: 'ViewHouseState',
		}),
    filterTag(value, row) {
        return row.tag == value;
    },
    pageGoRemind(curr){
			if(this.paginationRemind.curr===curr){
				return;
			}
      this.paginationRemind.curr=curr;
      var data = {};
      data['userId'] = this.userId;
      data['pageSize'] = this.paginationRemind.pageSize;
      data['pageIndex'] = this.paginationRemind.curr-1;
			this.getRemindList(data);
    },
    toReadRemind(item){
      if(item.readFlag){
				return;
      }
      var data = {};
      data['userId'] = this.userId;
      data['tipId'] = item.id;
      this.readRemind(data);
      item.readFlag = true;
    },
    toReadAllRemind(){
      var data = {};
      data['userId'] = this.userId;
      this.readAllRemind(data);
      var data2 = {};
      data2['userId'] = this.userId;
      data2['pageSize'] = this.paginationRemind.pageSize;
      data2['pageIndex'] = this.paginationRemind.curr-1;
      this.getRemindList(data2);
    },
    inhouseList(){
      this.inhouseBrief = 0;
      this.toSeeWeekBrief();
    },
    outhouseList(){
      this.inhouseBrief = 1;
      this.toSeeWeekBrief();
    },
    weekBriefOne(){
      if(this.weekCount < 1){
        return;
      }
      this.weekBrief = 1;
      this.toSeeWeekBrief();
    },
    weekBriefTwo(){
      if(this.weekCount < 2){
        return;
      }
      this.weekBrief = 2;
      this.toSeeWeekBrief();
    },
    weekBriefThr(){
      if(this.weekCount < 3){
        return;
      }
      this.weekBrief = 3;
      this.toSeeWeekBrief();
    },
    weekBriefFour(){
      if(this.weekCount < 4){
        return;
      }
      this.weekBrief = 4;
      this.toSeeWeekBrief();
    },
    toSeeWeekBrief(){
      var data={};
      data['userId'] = this.userId;
      data['dateType'] = this.weekBrief;
      data['objectiveType'] = this.inhouseBrief;
      this.seeWeekBrief(data);
    },
    seeRegion(){
      this.rankType = 0;
      this.getRankCount();
      this.getRankList();
    },
    newRentList(){
      this.cunstomType = 0;
      this.countNewCustom({"userId":this.userId,"cunstomType":this.cunstomType});
      this.listNewCustom({"userId":this.userId,"cunstomType":this.cunstomType,"pageSize":this.paginationFollow.pageSize,"pageIndex":this.paginationFollow.curr-1});
    },
    newOwnerList(){
      this.cunstomType = 1;
      this.countNewCustom({"userId":this.userId,"cunstomType":this.cunstomType});
      this.listNewCustom({"userId":this.userId,"cunstomType":this.cunstomType,"pageSize":this.paginationFollow.pageSize,"pageIndex":this.paginationFollow.curr-1});
    },
    pageGoFollow(curr){
      if(this.paginationFollow.curr===curr){
				return;
      }
      this.paginationFollow.curr=curr;
      this.listNewCustom({"userId":this.userId,"cunstomType":this.cunstomType,"pageSize":this.paginationFollow.pageSize,"pageIndex":this.paginationFollow.curr-1});
    }
  },
  beforeMount:function(){
    this.getRemindNum({"userId":this.userId});
    this.getRemindList({"pageSize":this.paginationRemind.pageSize,"pageIndex":this.paginationRemind.curr-1,"userId":this.userId});
    this.getWeekCount({"userId":this.userId});
    this.weekBriefOne();
    
    this.countNewCustom({"userId":this.userId,"cunstomType":this.cunstomType});
    this.listNewCustom({"userId":this.userId,"cunstomType":this.cunstomType,"pageSize":this.paginationFollow.pageSize,"pageIndex":this.paginationFollow.curr-1});
    // this.viewRentAchievement({"userId":this.userId});
    this.viewGanthAchievement({"userId":this.userId});
    this.viewHouseState({"userId":this.userId});
  },
  updated:function () {
    echarts.init(document.getElementById('inhouseEchart')).setOption(
      {
        color: ['#d7d5db', '#6D93FB' ],
        graphic: {
            type: 'text',
            left: 'center',
            top: '45%',
            z: 2,
            zlevel: 100,
            style: {
              text: this.ganthAchievementList.rate+'%',
              x: 100,
              y: 100,
              textAlign: 'center',
              fill: '#333',
              width: 30,
              height: 30,
              font:'normal small-caps bolder 25px/26px  "microsoft yahei",Tahoma,Helvetica'
            }
        },
        series: {
            type: 'pie',
            center: ['50%', '50%'],
            radius: ['47%', '60%'],
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: false,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data: [
                {name: '本月目标', value: this.ganthAchievementList.objectiveCount-this.ganthAchievementList.ganthCount},
                {name: '已完成', value: this.ganthAchievementList.ganthCount}
            ]
        }
      }
    );
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  #workbench{
		height: 100%;
  }
  .workbench-content{
    position: relative;
    min-width: 1700px;
    // overflow-x: scroll;
    // width: 1700px;
    // &.longWidth{
    //   width: 1830px;
    // }
    &.longWidth{
      min-width: 1830px;
    }
  }
  
  .workbench-content .middle{
    margin-top: 12px;
  }

  .workbench-content .middle .middleLeft{
    display: inline-block;
    // width: 360px;
    width: 22%;
    margin-right: .3%;
    vertical-align: middle;
  }

  .workbench-content .middle .middleLeft .salesBrief{
    background: #fff;
    // width: 360px;
    width: 100%;
    height: 320px;
    padding: 15px;
    display: inline-block;
    vertical-align: middle;
    .title{
      font-family: PingFangSC-Semibold;
      font-size: 16px;
      color: #A3B2C6;
      margin-bottom: 22px;
      display: inline-block;
      >i{
        display: inline-block;
        width: 18px;
        height: 22px;
        background: url(/static/images/xsjb.png);
        vertical-align: middle;
        margin-right: 10px;
      }
      span{
        vertical-align: middle;
      }
    }
    .tabChange{
      float: right;
      .line{
        font-family: PingFangSC-Regular;
        font-size: 12px;
        background-color: #A3B2C6;
        display: inline-block;
        width: 1px;
        margin: 0 8px;
        height: 12px;
        vertical-align: middle;
      }
      span{
        height: 20px;
        line-height: 20px;
        vertical-align: middle;
        cursor: pointer;
        color: #D3D3D3;
        &.active{
          color: #576578;
        }
      }
    }
    .week{
      padding: 0 20px;
      height: 28px;
      margin-bottom: 20px;
      span{
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #D3D3D3;
        padding: 5px 5px;
        margin-left: 21px;
        cursor: pointer;
        border-bottom: 2px solid #D3D3D3;
        &.active{
          color: #576578;
          border-bottom: 2px solid #576578;
        }
      }
    }
    .saleItems{
      padding: 0 30px;
      .item{
        .dealNumb{
          width: 270px;
          height: 45px;
          background: url(/static/images/cjdl.png);
          background-size: cover;
        }
        .businessNumb{
          width: 270px;
          height: 45px;
          background: url(/static/images/sjl.png);
          background-size: cover;
        }
        .followRate{
          width: 270px;
          height: 45px;
          background: url(/static/images/jsgjl.png);
          background-size: cover;
        }
        >div{
          margin-bottom: 15px;
          padding: 0 0 0 30px;
          span{
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #FFFFFF;
            vertical-align: middle;
            margin-top: 15px;
            display: inline-block;
          }
          .right{
            float: right;
            margin-right: 50px;
            span{
              &:nth-child(1){
                font-size: 24px;
                margin-top: 7px;
                margin-right: 5px;
              }
              &:nth-child(2){
                margin-top: 9px;
              }
            }
          }
        }
      }
    }
  }

  .workbench-content .middle .middleLeft .announcementRemind{
    background: #fff;
    // width: 360px;
    width: 100%;
    height: 320px;
    padding: 20px;
    display: inline-block;
    vertical-align: middle;
    margin-top: 12px;
    .title{
      font-family: PingFangSC-Semibold;
      font-size: 16px;
      color: #A3B2C6;
      margin-bottom: 22px;
      display: inline-block;
      >i{
        display: inline-block;
        width: 22px;
        height: 25px;
        background: url(/static/images/ggtx.png);
        vertical-align: middle;
        margin-right: 10px;
      }
      span{
        vertical-align: middle;
      }
    }
    .tabChange{
      float: right;
      height: 25px;
      line-height: 25px;
      vertical-align: middle;
      cursor: pointer;
      font-size: 14px;
      color: #D1D1D1;
    }
    .remind{
      border-bottom: 1px solid #DDDDDD;
      padding-bottom: 10px;
      span{
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #A3B2C6;
        margin-right: 30px;
        i{
          font-family: HelveticaNeue;
          font-size: 14px;
          color: #FB6788;
        }
      }
    }
    .remindItems{
      padding-top: 10px;
      .item{
        width: 320px;
        height: 40px;
        line-height: 40px;
        cursor: pointer;
        >i{
          display: inline-block;
          width: 20px;
          height: 21px;
          background: url(/static/images/txwd.png);
          vertical-align: middle;
          margin-right: 10px;
        }
        >span{
          overflow: hidden;
          white-space: nowrap;
          text-overflow:ellipsis;
          width: 280px;
          display: inline-block;
          vertical-align: middle;
        }
        &.hasRead{
          color: #A3B2C6;
          >i{
            display: inline-block;
            width: 20px;
            height: 21px;
            background: url(/static/images/txyd.png);
            vertical-align: middle;
            margin-right: 10px;
          }
        }
      }
    }
    .footPages{
      float: right;
    }
  }

  .workbench-content .middle .inOut{
    background: #fff;
    // width: 850px;
    width: 50%;
    height: 652px;
    padding: 15px;
    display: inline-block;
    vertical-align: middle;
    margin-right: .3%;
    // &.longWidth{
    //   width: 980px;
    // }
    >.title{
      font-family: PingFangSC-Semibold;
      font-size: 16px;
      color: #A3B2C6;
      margin-bottom: 22px;
      // display: inline-block;
      >i{
        display: inline-block;
        width: 24px;
        height: 24px;
        background: url(/static/images/sfcf.png);
        vertical-align: middle;
        margin-right: 10px;
      }
      span{
        vertical-align: middle;
      }
    }
    .inDataItems{
      display: inline-block;
      width: 400px;
      vertical-align: middle;
      .item{
        height: 130px;
        width: 400px;
        display: inline-block;
        div{
          display: inline-block;
        }
        .mouth{
          font-family: PingFangSC-Medium;
          font-size: 20px;
          color: #576578;
          letter-spacing: 0;
          height: 70px;
          line-height: 70px;
          margin: 30px 15px 30px 50px;
          vertical-align: middle;
        }
        .right{
          height: 70px;
          vertical-align: middle;
          width: 200px;
          .inTotle{
            height: 35px;
            line-height: 35px;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #A3B2C6;
            letter-spacing: 0;
            span{
              font-family: HelveticaNeue-Medium;
              font-size: 24px;
              color: #6D93FB;
              letter-spacing: 0;
              margin: 0 10px;
            }
          }
          .rightBottom{
            height: 35px;
            .twoRow{
              height: 35px;
              line-height: 35px;
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: #A3B2C6;
              letter-spacing: 0;
              margin-right: 20px;
              span{
                font-family: PingFangSC-Medium;
                font-size: 18px;
                color: #576578;
                letter-spacing: 0;
                margin-left: 10px;
              }
            }
            .thrRow{
              height: 35px;
              line-height: 35px;
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: #A3B2C6;
              letter-spacing: 0;
              span{
                font-family: PingFangSC-Medium;
                font-size: 18px;
                color: #576578;
                letter-spacing: 0;
                margin-left: 10px;
              }
            }
          }
        }
      }
    }
    .pieChart{
      display: inline-block;
      width: 400px;
      height: 390px;
      vertical-align: middle;
      .echart_box{
        width: 400px;
        height: 300px;
      }
      .colorList{
        text-align: center;
        >li{
          display: inline-block;
          &:nth-child(1){
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #A3B2C6;
            margin-right: 15px;
            span{
              font-family: HelveticaNeue-Bold;
              font-size: 24px;
              color: #576578;
              margin: 0 10px;
            }
            .circle{
              width: 10px;
              height: 10px;
              border-radius: 5px;
              display: inline-block;
              background: #EAE9EC;
              margin-right: 8px;
            }
          }
          &:nth-child(2){
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #A3B2C6;
            span{
              font-family: HelveticaNeue-Bold;
              font-size: 24px;
              color: #576578;
              margin: 0 10px;
            }
            .circle{
              width: 10px;
              height: 10px;
              border-radius: 5px;
              display: inline-block;
              background: #6D93FB;
              margin-right: 8px;
            }
          }
        }
      }
    }
    .houseState{
      margin: 20px 50px 0 50px;
      padding: 50px 0 0 0;
      border-top: 1px solid #F2F4F8;
      >div{
        display: inline-block;
        width: 100px;
        border: 1px solid #F2F4F8;
        border-radius: 4px;
        margin-right: 18.5px;
        &:nth-last-child(1){
          margin-right: 0;
        }
        .title{
          width: 100px;
          height: 25px;
          line-height: 25px;
          text-align: center;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #FFFFFF;
          letter-spacing: 0;
        }
        .dataNum{
          width: 100px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          font-family: HelveticaNeue-Medium;
          font-size: 24px;
          color: #576578;
          letter-spacing: 0;
        }
      }
      .emptyCnt{
        .title{
          background: url(/static/images/kzz.png);
        }
      }
      .confCnt{
        .title{
          background: url(/static/images/pzz.png);
        }
      }
      .releaseCnt{
        .title{
          background: url(/static/images/sfz.png);
        }
      }
      .putwayCnt{
        .title{
          background: url(/static/images/sjz.png);
        }
      }
      .waitCnt{
        .title{
          background: url(/static/images/dzz.png);
        }
      }
      .saleCnt{
        .title{
          background: url(/static/images/cxf.png);
        }
      }
    }
  }

  .workbench-content .middle .cancellation{
    background: #fff;
    // width: 450px;
    width: 26.8%;
    height: 652px;
    padding: 15px;
    display: inline-block;
    vertical-align: middle;
    .title{
      font-family: PingFangSC-Semibold;
      font-size: 16px;
      color: #A3B2C6;
      margin-bottom: 18px;
      display: inline-block;
      >i{
        display: inline-block;
        width: 22px;
        height: 24px;
        background: url(/static/images/gjqk.png);
        vertical-align: middle;
        margin-right: 10px;
      }
      span{
        vertical-align: middle;
      }
    }
    .tabChange{
      float: right;
      .line{
        font-family: PingFangSC-Regular;
        font-size: 12px;
        background-color: #A3B2C6;
        display: inline-block;
        width: 1px;
        margin: 0 8px;
        height: 12px;
        vertical-align: middle;
      }
      span{
        height: 20px;
        line-height: 20px;
        vertical-align: middle;
        cursor: pointer;
        color: #D3D3D3;
        &.active{
          color: #576578;
        }
      }
    }
    .newCustomItems{
      padding-bottom: 10px;
      position: relative;
      .item{
        margin: 17px 0;
        height: 40px;
        position: relative;
        z-index: 2;
        >div{
          display: inline-block;
          vertical-align: middle;
        }
        .time{
          height: 40px;
          width: 80px;
          span{
            display: block;
            height: 20px;
            line-height: 20px;
            &:nth-child(1){
              text-align: right;
              margin-right: 10px;
              font-family: HelveticaNeue-Bold;
              font-size: 14px;
              color: #576578;
            }
            &:nth-child(2){
              text-align: center;
              // font-family: HelveticaNeue;
              font-size: 12px;
              color: #A3B2C6;
            }
          }
        }
        .doat{
          display: inline-block;
          width: 5px;
          height: 5px;
          border-radius: 2.5px;
          background: #A3B2C6;
        }
        .line{
          width: 1px;
          height: 54px;
          background: #D1D1D1;
          position: absolute;
          top: 22px;
          left: 86px;
          z-index: 1;
        }
        .followStat{
          width: 50px;
          height: 17px;
          line-height: 17px;
          font-family: PingFangSC-Semibold;
          font-size: 14px;
          color: #576578;
          margin-left: 5px;
          margin-right: 3px;
        }
        .info{
          span{
            vertical-align: middle;
            &:nth-child(1){
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: #A3B2C6;
            }
            &:nth-child(2){
              font-family: PingFangSC-Regular;
              font-size: 14px;
              color: #272900;
            }
          }
          &.name{
            margin-right: 10px;
            span{
              &:nth-child(2){
              width: 45px;
              overflow: hidden;
              white-space:nowrap; 
              text-overflow:ellipsis;
              display: inline-block;
            }
            }
          }
        }
        &:nth-last-child(1){
          margin-bottom: 0px;
          .line{
            height: 24px;
          }
        }
      }
    }
    .footPages{
      float: right;
      padding-top: 12px;
    }
  }

  .workbench-content .bottom{
    margin-top: 12px;
  }


</style>
