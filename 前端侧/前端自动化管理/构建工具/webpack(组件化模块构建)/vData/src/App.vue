<template>
  <div id="app">
    <div class="left">
      <div id="main"></div>
    </div>
    
    <div class="right">
      
      <p class="time">
        <i class="num">{{dateMap.year}}</i><i class="txt">年</i>
        <i class="num">{{dateMap.month}}</i><i class="txt">月</i>
        <i class="num">{{dateMap.date}}</i><i class="txt">日</i>
        <i class="txt">星期</i><i class="num">{{dateMap.day}}</i>
      </p>
      <div class="total-box">
        <div class="total-inner">
          <h3>房源数据</h3>
          <div class="clearfix">
            <div class="count-item count-houses">
              <p class="num">{{house_count.range}}</p>
              <p>套<br>数</p>
            </div>
            <div class="count-item count-rooms">
              <p class="num">{{house_count.count}}</p>
              <p>间<br>数</p>
            </div>
          </div>
          <div class="out-total">
            <span class="total-tit">累计出房签约量</span>
            <span class="total-num">{{house_count.out_count}}</span>
          </div>
        </div>
        

      </div>
      <div class="detail-box">
        <div class="detail-inner">
          <h3>收出房实时</h3>
          <table class="first">
            <thead>
              <th width="20%">姓名</th>
              <th width="20%">区域</th>
              <th width="40%">业务组</th>
              <th width="20%">单量</th>
            </thead>
          </table>
          <div class="data-wrap">
            <div class="data-inner" ref="dataWrap">
              <table :class="{'new-data': true}" >
                <tr v-for="item in newdataList" :key="item.employeeId">
                  <td>{{item.userName}}</td>
                  <td>{{item.areaNm}}</td>
                  <td>{{item.businessAreaNm}}</td>
                  <td>{{ item.type === '1' ? "出房":"收房" + item.orderCnt}}单</td>
                </tr>
              </table>
              
              <table class="second" ref="secondTable">
                <tr v-for="item in dataList" :key="item.employeeId">
                  <td>{{item.userName}}</td>
                  <td>{{item.areaNm}}</td>
                  <td>{{item.businessAreaNm}}</td>
                  <td>{{item.type === '1' ? "出房":"收房" + item.orderCnt}}单</td>
                </tr>
              </table>
            </div>
              
          </div>
            

          
        </div>
        
        
      </div>
    </div>
  </div>
</template>
<script>

import geoJson from "utils/wuhan.json"

import {mapGetters, mapActions} from 'vuex'

export default {
  name: "App",
  data() {

    return {
      myChart: null,
      mapSeries: null, // 底图点
      newMapSeries: null, //新增点
      dateMap:{}, //时间map
      timerId: null,
      devicePixelRatio: '',//物理像素分辨率与css像素像素分辨率的比值。
    };
  },
  computed:{
    ...mapGetters({
      mapData:'mapData',
      newMapData:'newMapData',
      house_count:'house_count',
      dataList:'dataList',
      newdataList: 'newdataList'
    }),
    series() {
      let series = [];
      if(this.mapSeries) series.push(this.mapSeries)
      if(this.newMapSeries) series.push(this.newMapSeries)
      return series
    },
    
  },
  watch: {
    mapData:{
      handler(newData) {
        
        let data = this.mapData.reduce((accumulator, currentValue) => {
          accumulator.push([currentValue.longitude, currentValue.latitude]) 
          return accumulator
        } 
        , []);
        this.mapSeries = {
          name:'dots',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          symbolSize: 2 * this.devicePixelRatio,
          data,
          itemStyle: { 
            normal:{
              color: "#ffcc00"
            }
          }
        };
        
      }
    },
    newMapData:{
      handler(newData) {
        

        let data = newData.reduce((accumulator, currentValue) => {
          accumulator.push([currentValue.longitude, currentValue.latitude, `${currentValue.userName}\n${currentValue.businessAreaNm}`]) 
          return accumulator
        }
        , []);

        clearInterval(this.timerId);
        this.setNewMapSeries(data)

        // let num = data.length, 
        //     index = 0;
        
        // this.setNewMapSeries([data[0]]);
        // this.timerId = setInterval(() => {
        //   ++index;
        //   if(index === num) index = 0
        //   this.setNewMapSeries([data[index]])
        // },5000)
      }
    },
    series: {
      handler() {
        this.generateMap();
      }
    },
    newdataList: {
      handler(newList) {
        let $tableWrap = this.$refs['dataWrap'],
            transitionRate = 0.5;
        if(newList && newList.length > 0) {
          
          
          $tableWrap.style.top = '-' + newList.length * 0.16 + 'rem';
          //  $tableWrap.style.top = 0;
          setTimeout(()=> {
             $tableWrap.style.top = 0;
             $tableWrap.style.transition = `all ${transitionRate * newList.length}s ease`;
            //  transition: ;
            // 动画完成，合并list
            setTimeout(() => {
              this.setAllList()
            }, 0.1*newList.length*1000 + 1000);
            
          }, 10)
          

        }else {
          $tableWrap.style.transition = 'none';
        }
      }
    }
    
  },
  methods: {
    ...mapActions({
      queryRightData:'queryRightData',
      queryLeftData:'queryLeftData',
      getNewOrderList:'getNewOrderList',
      setAllList:'setAllList'
    }),
    setNewMapSeries(data) {
      this.newMapSeries = {
        name:'最近10个收房',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        symbolSize: this.getRealSize(5),
        data: data,
        showEffectOn: 'render',
        rippleEffect: {
          period: this.getRealSize(15),
          scale: this.getRealSize(6),
          brushType: 'fill'
        },
        itemStyle: { 
          normal:{
            color: "#ffcc00"
          }
        },
        label: {
          normal: {
            show: true,
            formatter({data}){
              return data[2]
            },
            rotate: 0,
            position:'right',
            distance: 15,
            color: '#fff'
          }
        }
      };
    },
    checkDate() {
      let timer = new Date();
      let year = timer.getFullYear(),
          month = timer.getMonth() + 1,
          date = timer.getDate(),
          day = timer.getDay();
      this.dateMap = {
        year,
        month: month - 10 < 0 ? `0${month}` : month,
        date: date - 10 < 0 ? `0${date}` : date,
        day:['日','一', '二', '三', '四','五','六'][day]
      }
    },


    initMap() {
      this.queryLeftData();
      this.queryRightData();
      this.getNewOrderList();
      echarts.registerMap('wuhan', geoJson);
      this.myChart = echarts.init(document.getElementById("main"), null, {
        renderer: "svg"
      });

    },
    getRealSize(size) {
      return size * this.devicePixelRatio
    },
    generateMap() {
      var myChart = this.myChart;
      myChart.hideLoading();
      myChart.setOption( {
          title: { 
            text: '吉家江寓',
            subtext:'收出房数据展示',
            left: "left",
            top: '10%',
            left: '6%',
            textStyle: {
              color: "#fff",
              fontWeight: "bold",
              fontSize: this.getRealSize(30)
            },
            subtextStyle: {
              color: "#fff",
              fontWeight: "bold",
              fontSize: this.getRealSize(30)
            },
            itemGap: this.getRealSize(10)
            
          },
          tooltip: {
              trigger: 'item',
              // formatter: '{b}<br/>{c} (p / km2)'
          },
          geo: {
            aspectScale: 0.75,
            zoom:3,
            center:[114.319347,30.593244],
            // show: true,
            map: 'wuhan',
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            roam: false,
            itemStyle: {
              normal: {
                areaColor: 'rgb(8,11,33)',
                borderWidth: this.getRealSize(2),
                borderColor: 'rgb(65,141,255)',
                
                shadowColor:'rgb(65,141,255)',
                shadowBlur:this.getRealSize(20),
                shadowOffsetX: 0,
                shadowOffsetY: 0,

              }
              
            },
            regions:[{
              name: '新洲区',
              itemStyle: {
                normal: {
                  opacity:0.8,
                  borderColor: 'rgba(65,141,255,0.5)',
                }
                
              }
            },{
              name: '江夏区',
              itemStyle: {
                normal: {
                  opacity:0.8,
                  borderColor: 'rgba(65,141,255,0.5)',
                }
                
              }
            },{
              name: '黄陂区',
              itemStyle: {
                normal: {
                  opacity:0.8,
                  borderColor: 'rgba(65,141,255,0.5)',
                }
                
              }
            },{
              name: '蔡甸区',
              itemStyle: {
                normal: {
                  opacity:0.8,
                  borderColor: 'rgba(65,141,255,0.5)',
                }
                
              }
            },{
              name: '汉南区',
              itemStyle: {
                normal: {
                  opacity:0.8,
                  borderColor: 'rgba(65,141,255,0.5)',
                }
                
              }
            },{
              name: '东西湖区',
              itemStyle: {
                normal: {
                  opacity:0.8,
                  borderColor: 'rgba(65,141,255,0.5)',
                }
                
              }
            }]
          },
          
          series: this.series
      });
    },
    cicleMapReq() {
      this.getNewOrderList();
    },
    cicleListReq() {
      this.queryRightData()
    },
    cicleTimer() {
      var time = 60 * 1000;
      var mapTimer = setInterval( () => {
        this.cicleMapReq();
        this.cicleListReq();
        this.checkDate();
      },time);
    }
  },
  beforeMount() { 
    // 获取分辨率比
    this.devicePixelRatio = window.devicePixelRatio;

    //自适应代码rem单位
    function rePosition(){
        var width = document.documentElement.clientWidth || document.body.clientWidth;
        var ratio = width/750;
        
        document.getElementsByTagName('html')[0].style.fontSize=100*ratio+"px";
        
    }
    rePosition();
    window.onresize = function(){
        rePosition();
    }
    //时间初始化
    this.checkDate()
  },
  mounted() {
    this.initMap();

    this.cicleTimer();

  },
};
</script>