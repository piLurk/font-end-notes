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
            <div class="tabChange"><span :class="{active : inhouseBrief == 0}" @click="inhouseList">收房</span><i class="line"></i><span :class="{active :inhouseBrief == 1}" @click="outhouseList">出房</span></div>
            <div class="week"><span :class="{active : weekBrief ==1}" @click="weekBriefOne">第一周</span><span :class="{active : weekBrief ==2}" @click="weekBriefTwo">第二周</span><span :class="{active : weekBrief ==3}" @click="weekBriefThr">第三周</span><span :class="{active : weekBrief ==4}" @click="weekBriefFour">第四周</span></div>
            <div class="saleItems">
                <div class="item">
                    <div class="dealNumb"><span>成交单量</span><div class="right"><span id="">{{briefList.singCount}}</span><span>单</span></div></div>
                    <div class="businessNumb"><span>商机量</span><div class="right"><span id="">{{briefList.followPersonCount}}</span><span>个</span></div></div>
                    <div class="followRate"><span>及时跟进率</span><div class="right"><span id="">{{briefList.notTimeOutRate}}</span><span>%</span></div></div>
                </div>
            </div>
          </div>
        </div>
        
        <div class="inOut" :class="{longWidth : !sidebar.opened}">
          <div class="title"><i></i><span>收房&出房</span></div>
          <div class="e_box">
            <div class="e_box_l">
              <div class="content_box">
                <h3>收房</h3>
                <ul class="list">
                  <li>本月目标&nbsp;<i class="wordsB">{{performance.ganthObjectiveNum | blank}}</i>&nbsp;套</li>
                  <li>已完成&nbsp;<i class="wordsB">{{performance.ganthAchieveObjectiveNum | blank}}</i>&nbsp;套</li>
                </ul>
                <div class="than_p">环比&nbsp;&nbsp;<i :class="{up:performance.ganthRate>0,arrow:true}" v-text="performance.ganthRate?performance.ganthRate>0?'↑':'↓':'' "></i>&nbsp;{{performance.ganthRate | perAbs}}</div>
              </div><div id="house_in"></div>
            </div><div class="e_box_r">
              <div class="content_box">
                <h3>出房</h3>
                <ul class="list">
                  <li>本月目标&nbsp;<i class="wordsB">{{performance.rentObjectiveNum | blank}}</i>&nbsp;间</li>
                  <li>已完成&nbsp;<i class="wordsB">{{performance.rentAchieveObjectiveNum | blank}}</i>&nbsp;间</li>
                </ul>
                <p class="than_p">环比&nbsp;&nbsp;<i :class="{up:performance.rentRate>0,arrow:true}" v-text="performance.rentRate?performance.rentRate>0?'↑':'↓':'' "></i>&nbsp;{{performance.rentRate | perAbs}}</p>
              </div><div id="house_out"></div>
            </div>
          </div>

        </div>
        <div class="cancellation">
          <div class="title"><i></i><span>解约</span></div>
          <div class="e_box">
            <div class="e_top">
              <p class="top_cont">
                本月解约&nbsp;<i class="wordsB">{{allTermination}}</i>&nbsp;间&nbsp;&nbsp;&nbsp;
                环比&nbsp;<i :class="{up:terminationRate>0,arrow:true}" v-text="terminationRate?terminationRate>0?'↑':'↓':'' "></i>
                {{terminationRate | perAbs}}
              </p>
            </div>
            <div class="e_bot">
              <div class="content_box">
                <ul class="list">
                  <li v-for="(item, i) in termination" :key="i">{{item.dicName}}</li>
                </ul>
              </div><div id="e_termination"></div>
             
            </div>
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
let  setOption1 =(pieData,isRelease) =>{
  return {
    graphic: {
      type:'text',
      left:'center',
      top:'center',
      z:2,
      style: {
          text: pieData.proportion+(!!isRelease?'':'%'),
          y:100,
          font: 'normal small-caps bolder 16px/26px  "microsoft yahei",Tahoma,Helvetica'
      }
  },
  color:pieData.color,

  series: [
      {
          name:'比列图',
          symbol:'circle',
          type:'pie',
          hoverOffset:0,
          radius: (!!isRelease?['40%', '60%'] : ['47%', '60%']),
          data:pieData.data,
          label: {
              normal: {
                  show:false,
                  formatter: '{c}({d}%)'                 
              },
              emphasis: {
                  show: false
              }
          },
          labelLine:{ //指导线样式
              normal: {
                  show:false
              }
          }
      }
  ]
  } 
}
let  setOption2 =(pieData,isRelease) =>{
  return {
  color:pieData.color,
  series: [
      {
          name:'比列图',
          type:'pie',
          hoverOffset:0,
          avoidLabelOverlap: false,
          radius: ['50%', '80%'],
          data:pieData.data,
          label: {
              normal: {
                  show:false,
                  position:'center',
                  verticalAlign:'middle',
                  formatter: '{c}({d}%)'                 
              },
              emphasis: {
                  show: true,
                  textStyle: {
                      fontSize: '15',
                      fontWeight: 'bold'
                  }
              }
          },
          labelLine:{ //指导线样式
              normal: {
                  show:false,
              }
          }
      }
  ]
  } 
}

export default {
  name: 'workbench',
  data() {
    return {
      paginationRemind:{
        pageSize:4,
        curr:0,
      },
      inhouseBrief: 0,
      weekBrief: 1,
      pieHasData:false,
      pieHasData2:false,
      getChart:null,
      outChart:null,
      terChart:null
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
      'performance',
      'termination',
      'terminationRate',
      'sidebar'
    ]),
    allTermination(){
      var num=0;
      for(let i in this.termination){
        
        if(this.termination[i].cancelCount === null){
          
        }else{
          num += this.termination[i].cancelCount;
        }
      }
      return num;
    }
  },
  methods:{
    ...mapActions({
      getRemindNum:'GetRemindNum',
      getRemindList:'GetRemindList',
      readRemind:'ReadRemind',
      readAllRemind:'ReadAllRemind',
      getWeekCount: 'GetWeekCount',
      seeWeekBrief:'SeeWeekBrief',
      getPerformance:'GetPerformance',
      getTermination:'GetTermination'
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
      data['pageIndex'] = curr-1;
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
      data2['pageIndex'] = 0;
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
    }

  },
  watch:{
    performance: {
      handler(newValue, oldValue) {
          var flag=true;
　　　　　　for(let i in newValue){
              if(newValue[i] === null){
                flag=false;
              }
          }
          this.pieHasData=flag;
　　　　},
      deep:true
    },
  termination:{
    handler(newValue, oldValue) {
        var flag=false;
  　　　　　　for(let i in newValue){
            if(newValue[i].cancelCount !== null){
              flag=true;
            }
        }
        this.pieHasData2=flag;
　　　　},
      deep:true
    },
    pieHasData(n,o){
      if(n){
        var option1 = setOption1(
          {
            data:[
              {name:'本月目标',value:(this.performance.ganthObjectiveNum - this.performance.ganthAchieveObjectiveNum)<0?0:this.performance.ganthObjectiveNum - this.performance.ganthAchieveObjectiveNum},
              {name:'已完成',value:this.performance.ganthAchieveObjectiveNum}
            ],
            proportion:this.performance.ganthCompleteRate,
            color:['#d7d5db','#6D93FB'],
          }
        )
        var option2 = setOption1(
          {
            data:[
              {name:'本月目标',value:(this.performance.rentObjectiveNum - this.performance.rentAchieveObjectiveNum)<0?0:this.performance.rentObjectiveNum - this.performance.rentAchieveObjectiveNum},
              {name:'已完成',value:this.performance.rentAchieveObjectiveNum}
            ],
            proportion:this.performance.rentCompleteRate,
            color:['#d7d5db','#50E3C2'],
          }
        )
        this.getChart.setOption(option1)
        this.outChart.setOption(option2)
      }
    },
    pieHasData2(n,o){
      if(n){
        var data=[],legendData=[];
        for(let i in this.termination){
          data.push({
            name:this.termination[i]['dicName'],
            value:this.termination[i]['cancelCount']
          })
          legendData.push(this.termination[i]['dicName'])

        }
        var option = setOption2(
          {
            data:data,
            proportion:'',
            legendData:legendData,
            color:['#6D93FB','#FF5737','#FFBC00','#18CF1B','#D200D2','#0DADF1','#FE7E98','#A4F01F','#D0021B','#A470FF','#0DADF1'],
          },
          true
        )
        this.terChart.setOption(option)
        
      }
    }
  },
  beforeMount(){
    
  },  
  mounted:function () {
    this.getWeekCount({"userId":this.userId});
    this.weekBriefOne();

    //收房，出房
    this.getPerformance({"userId":this.userId});
    // 解约
    this.getTermination({"userId":this.userId});


    this.getChart = echarts.init(document.getElementById('house_in'));
    this.outChart = echarts.init(document.getElementById('house_out'));
    this.terChart = echarts.init(document.getElementById('e_termination'));

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

  .workbench-content .middle .inOut{
    background: #fff;
    // width: 850px;
    width: 50%;
    height: 320px;
    padding: 15px;
    display: inline-block;
    vertical-align: middle;
    margin-right: .3%;
    // &.longWidth{
    //   width: 980px;
    // }
    .title{
      font-family: PingFangSC-Semibold;
      font-size: 16px;
      color: #A3B2C6;
      margin-bottom: 22px;
      display: inline-block;
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
  }

  .workbench-content .middle .cancellation{
    background: #fff;
    // width: 450px;
    width: 26.8%;
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
        width: 23px;
        height: 20px;
        background: url(/static/images/jy.png);
        vertical-align: middle;
        margin-right: 10px;
      }
      span{
        vertical-align: middle;
      }
    }
  }

  .workbench-content .bottom{
    margin-top: 12px;
  }

  // .workbench-content .bottom .leaderBoard{
  //   background: #fff;
  //   width: 1690px;
  //   padding: 15px;
  //   display: inline-block;
  //   vertical-align: middle;
  //   .title{
  //     font-family: PingFangSC-Semibold;
  //     font-size: 16px;
  //     color: #A3B2C6;
  //     margin-bottom: 22px;
  //     display: inline-block;
  //     >i{
  //       display: inline-block;
  //       width: 23px;
  //       height: 20px;
  //       background: url(/static/images/phb.png);
  //       vertical-align: middle;
  //       margin-right: 10px;
  //     }
  //     span{
  //       vertical-align: middle;
  //     }
  //   }
  //   .tabChange{
  //     padding: 0 30px;
  //     margin-bottom: 20px;
  //     .line{
  //       font-family: PingFangSC-Regular;
  //       font-size: 12px;
  //       background-color: #A3B2C6;
  //       display: inline-block;
  //       width: 1px;
  //       margin: 0 25px;
  //       height: 12px;
  //       vertical-align: middle;
  //     }
  //     span{
  //       height: 20px;
  //       line-height: 20px;
  //       vertical-align: middle;
  //       cursor: pointer;
  //       color: #D1D1D1;
  //       &.active{
  //         color: #576578;
  //       }
  //     }
  //   }
  //   .leaderBoardBox1 .tableTitle{
  //     margin: 0 30px;
  //     background: #F6F8F8;
  //     padding: 15px 0 10px 0;
  //     position: relative;
  //     height: 36px;
  //     span{
  //       position: absolute;
  //       font-family: MicrosoftYaHei-Bold;
  //       font-size: 14px;
  //       color: #576578;
  //       font-weight: 600;
  //       &:nth-child(1){
  //         left: 29%;
  //       }
  //       &:nth-child(2){
  //         left: 66.5%;
  //       }
  //     }
  //   }
  //   .leaderBoardBox1 .mateTable{
  //     margin: 0 30px;
  //     border-collapse:collapse;
  //     tbody{
  //       tr{
  //         &.trth{
  //           .region{
  //             cursor: pointer;
  //             position: relative;
  //             .selectUi{
  //               position: absolute;
  //               left: 120px;
  //               top: 25px;
  //               border: 1px solid #ebeef5;
  //               border-radius: 2px;
  //               background-color: #fff;
  //               box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  //               // padding: 10px;
  //               li{
  //                 height: 36px;
  //                 line-height: 36px;
  //                 text-align: center;
  //                 width: 70px;
  //                 background: #fff;
  //                 &:hover{
  //                   background: #3CA0FF;
  //                   color: #fff;
  //                 }
  //               }
  //             }
  //           }
  //           .inAchieveRate{
  //             cursor: pointer;
  //             &.ascending{
  //               .sort-caret.ascending {
  //                   border-bottom-color: #409eff;
  //               }
  //             }
  //             &.descending{
  //               .sort-caret.descending {
  //                   border-top-color: #409eff;
  //               }
  //             }
  //           }
  //           .outAchieveRate{
  //             cursor: pointer;
  //             &.ascending{
  //               .sort-caret.ascending {
  //                   border-bottom-color: #409eff;
  //               }
  //             }
  //             &.descending{
  //               .sort-caret.descending {
  //                   border-top-color: #409eff;
  //               }
  //             }
  //           }
  //           background-color: #F6F8F8;border-bottom: 2px solid #e2e5e5;
  //           .caret-wrapper {
  //               display: inline-flex;
  //               flex-direction: column;
  //               align-items: center;
  //               height: 34px;
  //               width: 24px;
  //               vertical-align: middle;
  //               cursor: pointer;
  //               overflow: initial;
  //               position: relative;
  //               .sort-caret.ascending {
  //                   border-bottom-color: #c0c4cc;
  //                   top: 5px;
  //               }
  //               .sort-caret.up{
  //                   border-bottom-color: #c0c4cc;
  //                   top: 7px;
  //               }
  //               .sort-caret.descending {
  //                   border-top-color: #c0c4cc;
  //                   bottom: 7px;
  //               }
  //               .sort-caret.down{
  //                   border-top-color: #c0c4cc;
  //                   bottom: 9px;
  //               }
  //               .sort-caret {
  //                   width: 0;
  //                   height: 0;
  //                   border: 5px solid transparent;
  //                   position: absolute;
  //               }
  //           }
  //         }
  //         &:hover{
  //           >td{
  //             background-color: #f9fafc;
  //           }
  //         }
  //         td{
  //           text-align: center;
  //           background:#fff;vertical-align: middle;height:40px;
  //           color: #576578;word-break:break-all;max-width:200px; font-size: 14px; border-bottom: 1px solid #f1f1f1;
  //           &.loop{
  //             .up{
  //               display: inline-block;
  //               width: 6px;
  //               height: 14px;
  //               background: url(/static/images/up.png);
  //               vertical-align: middle;
  //               margin-left: 10px;
  //             }
  //             .down{
  //               display: inline-block;
  //               width: 6px;
  //               height: 14px;
  //               background: url(/static/images/down.png);
  //               vertical-align: middle;
  //               margin-left: 10px;
  //             }
  //           }
  //         }
  //         th{
  //           vertical-align: middle;height:40px;
  //           font-size: 14px; color: #a3b2c6; font-weight: 500;
  //           background-color: #F6F8F8;border-bottom: 2px solid #e2e5e5;
  //         }
  //       }
  //     }
  //   }
  //   .footPages{
  //     float: right;
  //     margin-right: 30px;
  //   }
  //   .leaderBoardBox2 .mateTable{
  //     margin: 0 30px;
  //     border-collapse:collapse;
  //     tbody{
  //       tr{
  //         &.trth{
  //           background-color: #F6F8F8;border-bottom: 2px solid #e2e5e5;
  //         }
  //         &:hover{
  //           >td{
  //             background-color: #f9fafc;
  //           }
  //         }
  //         td{
  //           text-align: center;
  //           background:#fff;vertical-align: middle;height:40px;
  //           color: #576578;word-break:break-all;max-width:200px; font-size: 14px; border-bottom: 1px solid #f1f1f1;
  //         }
  //         th{
  //           vertical-align: middle;height:40px;
  //           font-size: 14px; color: #a3b2c6; font-weight: 500;
  //           background-color: #F6F8F8;border-bottom: 2px solid #e2e5e5;
  //         }
  //       }
  //     }
  //   }
  //   .leaderBoardBox3 .mateTable{
  //     margin: 0 30px;
  //     border-collapse:collapse;
  //     tbody{
  //       tr{
  //         &.trth{
  //           background-color: #F6F8F8;border-bottom: 2px solid #e2e5e5;
  //         }
  //         &:hover{
  //           >td{
  //             background-color: #f9fafc;
  //           }
  //         }
  //         td{
  //           text-align: center;
  //           background:#fff;vertical-align: middle;height:40px;
  //           color: #576578;word-break:break-all;max-width:200px; font-size: 14px; border-bottom: 1px solid #f1f1f1;
  //         }
  //         th{
  //           vertical-align: middle;height:40px;
  //           font-size: 14px; color: #a3b2c6; font-weight: 500;
  //           background-color: #F6F8F8;border-bottom: 2px solid #e2e5e5;
  //         }
  //       }
  //     }
  //   }
  // }
</style>
