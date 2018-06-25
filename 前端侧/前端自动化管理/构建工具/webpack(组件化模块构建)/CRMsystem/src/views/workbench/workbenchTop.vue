<template>
  <div class="top">
    <div class="goldRegion">
        <div class="title"><i></i><span id="month">{{goldRegion.mouth}}</span><span>月</span><span>金质大区</span></div>
        <div class="regionName"><span id="regionName">{{goldRegion.region}}</span><span>大区</span></div>
        <div class="mainBox">
            <div class="inHouse">
                <div class="inTarget">
                    <p>收房目标(套)</p>
                    <span id="inTarget">{{goldRegion.in.target}}</span>
                </div>
                <div class="inActual">
                    <p>实际收房(套)</p>
                    <span id="inActual">{{goldRegion.in.actual}}</span>
                </div>
                <div class="inCompletionRate">
                    <p>收房达成率</p>
                    <span id="inCompletionRate">{{goldRegion.in.completionRate}}</span><span class="percentSign">%</span>
                </div>
            </div>
            <div class="outHouse">
                <div class="outTarget">
                    <p>出房目标(间)</p>
                    <span id="outTarget">{{goldRegion.out.target}}</span>
                </div>
                <div class="outActual">
                    <p>实际出房(间)</p>
                    <span id="outActual">{{goldRegion.out.actual}}</span>
                </div>
                <div class="outCompletionRate">
                    <p>出房达成率</p>
                    <span id="outCompletionRate">{{goldRegion.out.completionRate}}</span><span class="percentSign">%</span>
                </div>
            </div>
        </div>
    </div>
    <div class="goldGroup" :class="{longWidth : !sidebar.opened}">
        <div class="title"><i></i><span id="">{{goldGroup.mouth}}</span><span>月</span><span>金质业务组</span></div>
        <div class="items">
            <div class="item" v-for="(item,i) in goldGroup.list" :key="i">
                <div class="groupName">
                    <span id="region">{{item.region}}</span><span>大区</span>-<span id="groupName">{{item.group}}</span><span>业务组</span>
                </div>
                <div class="groupManager">
                    <span>区经</span><span id="groupManager">{{item.areaManager}}</span>
                </div>
                <div class="mainBox">
                    <div class="inHouse">
                        <div class="inTarget">
                            <p>收房目标</p>
                            <span id="">{{item.in.target}}</span>
                        </div>
                        <div class="inActual">
                            <p>实际收房</p>
                            <span id="">{{item.in.actual}}</span>
                        </div>
                        <div class="inCompletionRate">
                            <p>收房达成率</p>
                            <span id="">{{item.in.completionRate}}</span><span>%</span>
                        </div>
                        <div class="inScore">
                            <p>收房得分</p>
                            <span id="">{{item.in.score}}</span>
                        </div>
                    </div>
                    <div class="outHouse">
                        <div class="outTarget">
                            <p>出房目标</p>
                            <span id="">{{item.out.target}}</span>
                        </div>
                        <div class="outActual">
                            <p>实际出房</p>
                            <span id="">{{item.out.actual}}</span>
                        </div>
                        <div class="outCompletionRate">
                            <p>出房达成率</p>
                            <span id="">{{item.out.completionRate}}</span><span>%</span>
                        </div>
                        <div class="outScore">
                            <p>出房得分</p>
                            <span id="">{{item.out.score}}</span>
                        </div>
                    </div>
                </div>
                <div class="totalScroe">
                    <span>总分</span>
                    <span id="">{{item.totalScore}}</span>
                </div>
            </div>
        </div>
    </div>
    <div class="goldKeeper">
        <div class="title"><i></i><span id="">{{goldKeeper.mouth}}</span><span>月</span><span>金牌管家</span></div>
        <div class="tabChange"><span :class="{active : synthesis}" @click="synthesis = !synthesis">综合</span><i class="line"></i><span :class="{active : !synthesis}" @click="synthesis = !synthesis">直销</span></div>
        <div class=" inItems" v-show="synthesis">
            <div class="item" v-for="(item,i) in goldKeeper.inList" :key="i">
                <div class="left">
                    <div class="top">
                        <div class="keeperName" id="">{{item.name}}</div>
                        <div class="groupName">
                            <span id="region">{{item.region}}</span><span>大区</span><span id="groupName">{{item.group}}</span><span>业务组</span>
                        </div>
                    </div>
                    <div class="bottom">
                        <div class="in"><span>收房</span><span class="inNumb">{{item.actual}}</span><span>套</span><span class="inScroe">{{item.actualScore}}分</span></div>
                        <div class="performance"><span>业绩</span><span>{{item.performance}}</span><span class="performanceScroe">{{item.performanceScore}}分</span></div>
                    </div>
                </div>
                <div class="right">
                    <span>{{item.totalScore}}</span><span>分</span>
                </div>
            </div>
        </div>
        <div class=" outItems"  v-show="!synthesis">
            <div class="item" v-for="(item,i) in goldKeeper.outList" :key="i">
                <div class="left">
                    <div class="keeperName">{{item.name}}</div>
                    <div class="groupName">
                        <span>{{item.region}}</span><span>大区</span><span>{{item.group}}</span><span>业务组</span>
                    </div>
                </div>
                <div class="right">
                    <span>出房</span><span class="outNumb">{{item.actual}}</span><span>间</span>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'


export default {
  name: 'workbenchTop',
  data(){
      return{
        synthesis: true
      }
  },
  computed:{
    ...mapGetters([
        'goldRegion',
        'goldGroup',
        'goldKeeper',
        'sidebar'
    ])
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .top .goldRegion{
    background: #fff;
    // width: 360px;
    width: 22%;
    height: 420px;
    padding: 15px;
    display: inline-block;
    vertical-align: middle;
    margin-right: .3%;
    .title{
      font-family: PingFangSC-Semibold;
      font-size: 16px;
      color: #A3B2C6;
      margin-bottom: 30px;
      >i{
        display: inline-block;
        width: 26px;
        height: 23px;
        background: url(/static/images/jzdq.png);
        vertical-align: middle;
        margin-right: 5px;
      }
      span{
        vertical-align: middle;
      }
      span:nth-child(4){
        margin-left: 10px;
      }
    }
    .regionName{
      font-family: PingFangSC-Semibold;
      font-size: 16px;
      text-align: center;
      color: #FFFDF9;
      margin: 0 auto 35px 100px;
      width: 130px;
      height: 25px;
      line-height: 25px;
      display: inline-block;
      background: url(/static/images/goldRegion.png);
    }
    .mainBox{
      padding: 0 20px;
      >div>div{
        height: 90px;
        >p{
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #A3B2C6;
          margin-bottom: 5px;
        }
      }
        
      .inHouse{
        float: left;
        >div{
          >span{
            font-family: HelveticaNeue-Bold;
            font-size: 30px;
            color: #6D93FB;
            font-weight: 600;
          }
          .percentSign{
            font-size: 14px;
            margin-left: 5px; 
          }
        }
      }
      .outHouse{
        float: right;
        >div{
          >span{
            font-family: HelveticaNeue-Bold;
            font-size: 30px;
            color: #50E3C2;
            font-weight: 600;
          }
          .percentSign{
            font-size: 14px;
            margin-left: 5px; 
          }
        }
      }
    }
  }

  .top .goldGroup{
    background: #fff;
    // width: 850px;
    width: 50%;
    height: 420px;
    padding: 15px;
    display: inline-block;
    vertical-align: middle;
    margin-right: .3%;
    // &.longWidth{
    //   width: 980px;
    //   >.items>.item{
    //     width: 314px;
    //   }
    // }
    .title{
      font-family: PingFangSC-Semibold;
      font-size: 16px;
      color: #A3B2C6;
      margin-bottom: 35px;
      >i{
        display: inline-block;
        width: 28px;
        height: 26px;
        background: url(/static/images/jzywz.png);
        vertical-align: middle;
        margin-right: 5px;
      }
      span{
        vertical-align: middle;
      }
      span:nth-child(4){
        margin-left: 10px;
      }
    }
    .items{
      >.item{
        width: 270px;
        display: inline-block;
        padding: 0 10px 0 20px;
        border-right: 1px solid #F2F4F8;
        &:nth-last-child(1){
          border: 0;
        }
        .groupName{
          font-family: PingFangSC-Medium;
          font-size: 16px;
          color: #576578;
          margin-bottom: 5px;
        }
        .groupManager{
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #576578;
          margin-bottom: 30px;
          >span:nth-child(2){
            margin-left: 15px;
          }
        }
        .mainBox{
          >div>div{
            height: 55px;
            >p{
              font-family: PingFangSC-Regular;
              font-size: 12px;
              color: #A3B2C6;    
              margin-bottom: 5px;
            }
          }
            
          .inHouse{
            // float: left;
            display: inline-block;
            >div{
              >span{
                font-family: HelveticaNeue-Bold;
                font-size: 16px;
                color: #576578;
                font-weight: 600;
              }
              .percentSign{
                font-size: 14px;
                margin-left: 5px; 
              }
            }
          }
          .outHouse{
            float: right;
            margin-right: 35px;
            >div{
              >span{
                font-family: HelveticaNeue-Bold;
                font-size: 16px;
                color: #576578;
                font-weight: 600;
              }
              .percentSign{
                font-size: 14px;
                margin-left: 5px; 
              }
            }
          }
        }
        .totalScroe{
          text-align: center;
          margin-right: 30px;
          span:nth-child(1){
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #A3B2C6;
          }
          span:nth-child(2){
            font-family: PingFangSC-Medium;
            font-size: 16px;
            color: #918BF1;
            margin-right: 5px;
          }
        }
      }
    }
  }

  .top .goldKeeper{
    background: #fff;
    // width: 450px;
    width: 26.8%;
    height: 420px;
    padding: 15px;
    display: inline-block;
    vertical-align: middle;
    .title{
      font-family: PingFangSC-Semibold;
      font-size: 16px;
      color: #A3B2C6;
      margin-bottom: 10px;
      display: inline-block;
      >i{
        display: inline-block;
        width: 18px;
        height: 25px;
        background: url(/static/images/jpgj.png);
        vertical-align: middle;
        margin-right: 5px;
      }
      span{
        vertical-align: middle;
      }
      span:nth-child(4){
        margin-left: 10px;
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
    .inItems>.item{
      padding: 12px 20px;
      border-bottom: 1px solid #F2F4F8;
      &:hover{
        background: #F9FAFC;
      }
      &:nth-last-child(1){
        border: 0;
      }
      >.left{
        display: inline-block;
        .top{
          margin-bottom: 10px;
          .keeperName{
            font-family: PingFangSC-Medium;
            font-size: 16px;
            color: #576578;
            display: inline-block;
          }
          .groupName{
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #A3B2C6;
            display: inline-block;
            margin-left: 10px;
            >span:nth-child(2){
              margin-right: 5px;
            }
          }
        }
        .bottom{
          .in{
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #576578;
            display: inline-block;
            .inNumb{
              margin: 0 3px;
            }
            .inScroe{
              color: #6D93FB;
              margin-left: 15px;
            }
          }
          .performance{
            margin-left: 30px;
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #576578;
            margin-left: 20px;
            display: inline-block;
            .performanceScroe{
              color: #6D93FB;
              margin-left: 15px;
            }
          }
        }
      }
      >.right{
        float: right;
        height: 44px;
        line-height: 44px;
        >span:nth-child(1){
          font-family: PingFangSC-Medium;
          font-size: 22px;
          color: #6D93FB;
        }
        >span:nth-child(2){
          font-family: PingFangSC-Medium;
          font-size: 12px;
          color: #6D93FB;
          margin-left: 5px;
        }
      }
    }
    .outItems>.item{
      padding: 20px;
      border-bottom: 1px solid #F2F4F8;
      &:hover{
        background: #F9FAFC;
      }
      >.left{
        display: inline-block;
        .keeperName{
          font-family: PingFangSC-Medium;
          font-size: 16px;
          color: #576578;
          display: inline-block;
        }
        .groupName{
          font-family: PingFangSC-Regular;
          font-size: 12px;
          color: #A3B2C6;
          display: inline-block;
          margin-left: 10px;
          >span:nth-child(2){
            margin-right: 5px;
          }
        }
      }
      >.right{
        float: right;
        height: 18px;
        line-height: 18px;
        display: inline-block;
        >span:nth-child(2){
          font-family: PingFangSC-Medium;
          font-size: 20px;
          color: #50E3C2;
          margin: 0 10px;
        }
      }
    }
  }
</style>
