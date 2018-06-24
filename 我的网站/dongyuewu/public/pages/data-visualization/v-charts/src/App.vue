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
          <h3>房源总数</h3>
          <div class="clearfix">
            <div class="count-item count-houses">
              <p>套数</p>
              <p class="num">{{house_count.range}}</p>
            </div>
            <div class="count-item count-rooms">
              <p>间数</p>
              <p class="num">{{house_count.count}}</p>
            </div>
          </div>
        </div>
        

      </div>
      <div class="detail-box">
        <div class="detail-inner">
          <h3>收出房实时</h3>
          <table>
            <thead>
              <th width="20%">姓名</th>
              <th width="20%">区域</th>
              <th width="40%">业务组</th>
              <th width="20%">单量</th>
            </thead>
            <tbody>
              <tr>
                <td colspan="4">
                  <table class="second">
                    <tr v-for="item in dataList" :key="item.employeeId">
                      <td>{{item.userName}}</td>
                      <td>{{item.areaNm}}</td>
                      <td>{{item.businessAreaNm}}</td>
                      <td>处房{{item.orderCnt}}单</td>
                    </tr>
                  </table>
                </td>
              </tr>
              
            </tbody>
          </table>
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
      dateMap:{} //时间map
    };
  },
  computed:{
    ...mapGetters({
      mapData:'mapData',
      newMapData:'newMapData',
      house_count:'house_count',
      dataList:'dataList'
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
          type: 'scatter',
          coordinateSystem: 'geo',
          symbolSize: 1,
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
        this.newMapSeries = {
          name:'最近10个收房',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          symbolSize: 5,
          data,
          showEffectOn: 'render',
          rippleEffect: {
            period: 15,
            scale: 6,
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
              position:'right',
              distance: 15,
              color: '#fff'
            }
            

          }
        };
        
      }
    },
    series: {
      handler() {
        this.generateMap();
      }
    },
    
  },
  methods: {
    ...mapActions({
      queryRightData:'queryRightData',
      queryLeftData:'queryLeftData',
      getNewOrderList:'getNewOrderList'
    }),
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
    generateMap() {
      var myChart = this.myChart;
      myChart.hideLoading();
      myChart.setOption( {
          tooltip: {
              trigger: 'item',
              // formatter: '{b}<br/>{c} (p / km2)'
          },
          geo: {
            // aspectScale: 1,
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
                borderColor: 'rgb(65,141,255)',
                borderWidth: 2,
                shadowColor:'rgb(65,141,255)',
                shadowBlur:20

                
              }
              
            },
            regions:[{
              name: '江夏区',
              itemStyle: {
                normal: {
                  borderWidth:5
                }
                
              }
            }]
          },
          
          series: this.series
      });
    },
    cicleReq() {
      this.getNewOrderList();
    },
    cicleTimer() {
      var timer = setInterval( () => {
        console.log('request')
        this.cicleReq();
      },30000)
    }
  },
  beforeMount() {
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