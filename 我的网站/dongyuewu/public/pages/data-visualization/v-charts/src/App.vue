<template>
  <div id="app">
    <div class="left">
      <div id="main"></div>
    </div>
    
    <div class="right">
      <p class="time">
        <i class="num">2018</i><i class="txt">年</i>
        <i class="num">06</i><i class="txt">月</i>
        <i class="num">13</i><i class="txt">日</i>
        <i class="txt">星期</i><i class="num">三</i>
      </p>
      <div class="total-box">
        <h3>房源总数</h3>
      </div>
      <div class="detail-box">
        <h3>收出房实时</h3>
        <table>
          <thead>
            <th>姓名</th>
            <th>区域</th>
            <th>业务组</th>
            <th>单量</th>
          </thead>
          <tbody>
            <tr v-for="item in dataList" :key="item.employeeId">
              <td>{{item.userName}}</td>
              <td>{{item.areaNm}}</td>
              <td>{{item.businessAreaNm}}</td>
              <td>{{item.orderCnt}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import geoJson from "utils/wuhan"

import {mapGetters, mapActions} from 'vuex'

export default {
  name: "App",
  data() {

    return {
      myChart: null,
      option: null,
      series:null
    };
  },
  computed:{
    ...mapGetters({
      mapData:'mapData',
      newMapData:'newMapData',
      house_count:'house_count',
      dataList:'dataList'
    })
  },
  methods: {
    ...mapActions({
      queryRightData:'queryRightData',
      queryLeftData:'queryLeftData',
      getNewOrderList:'getNewOrderList'
    }),
    initMap() {
      this.queryLeftData();
      this.queryRightData();
      this.getNewOrderList();
      

      this.myChart = echarts.init(document.getElementById("main"), null, {
        renderer: "svg"
      });
      var colorList = [
        "#5AB1EF",
        "#2EC7C9",
        "#B6A2DE",
        "#FFB980",
        "#ED868C",
        "#FF0000",
        "#C23531"
      ];

      var labels = [
        "待定",
        "<500",
        "500-800",
        "800-1200K",
        "1200-1500",
        "1500-2000",
        ">2000"
      ];

      var points = {
        "800-1200K": [
          [120.677751, 31.301185, 1],
          [120.5361, 31.278975, 1],
          [120.427795, 31.332868, 1],
          [120.740906, 31.259732, 1],
          [120.789811, 31.31306, 1],
          [120.713688, 31.329436, 1],
          [120.740392, 31.270454, 1],
          [120.42881, 31.342064, 1],
          [120.743858, 31.263709, 1],
          [120.74092, 31.260035, 1],
          [120.41821, 31.368697, 1],
          [120.830034, 31.321659, 1],
          [120.589613, 31.304566, 1],
          [120.782438, 31.313247, 1],
          [120.545678, 31.283175, 1],
          [120.740392, 31.270454, 1],
          [120.729188, 31.266647, 1],
          [120.800638, 31.603136, 1],
          [120.673487, 31.30151, 1],
          [120.897596, 31.021527, 1],
          [120.729188, 31.266647, 1],
          [120.782418, 31.313036, 1],
          [120.628268, 31.259262, 1],
          [120.675773, 31.301285, 1],
          [120.620621, 31.256209, 1],
          [120.740906, 31.259732, 1],
          [120.719815, 31.329722, 1],
          [120.540591, 31.182041, 1],
          [120.635477, 31.277872, 1]
        ],
        "1200-1500": [
          [120.626152, 31.468818, 1],
          [120.728959, 31.283179, 1],
          [120.635477, 31.277872, 1],
          [120.61018, 31.314886, 1],
          [120.744554, 31.375122, 1],
          [120.672626, 31.311643, 1],
          [120.740392, 31.270454, 1],
          [116.321404, 39.990632, 1],
          [120.627095, 31.239935, 1],
          [120.73022, 31.268655, 1],
          [120.673487, 31.30151, 1],
          [120.561285, 31.278847, 1],
          [120.658435, 31.143837, 1],
          [120.751868, 31.276324, 1]
        ],
        "<500": [
          [120.674054, 31.244839, 1],
          [120.782726, 31.312978, 1],
          [120.655944, 31.321389, 1],
          [120.744082, 31.272092, 1],
          [120.744555, 31.282666, 1]
        ],
        "500-800": [
          [120.729188, 31.266647, 1],
          [120.67316, 31.301914, 1],
          [120.606204, 31.31531, 1],
          [120.586237, 31.335448, 1],
          [120.677751, 31.301185, 1],
          [120.427795, 31.332868, 1],
          [120.740392, 31.270454, 1],
          [120.543933, 31.276319, 1],
          [120.428409, 31.331202, 1],
          [120.786061, 31.346362, 1],
          [120.742956, 31.272322, 1],
          [120.736745, 31.269358, 1]
        ],
        待定: [
          [120.737579, 31.268801, 1],
          [120.740392, 31.270454, 1],
          [120.740392, 31.270454, 1],
          [120.739624, 31.271157, 1],
          [120.531206, 31.299944, 1]
        ],
        ">2000": [
          [120.751868, 31.276324, 1],
          [120.751868, 31.276324, 1],
          [121.128619, 31.296403, 1],
          [120.740392, 31.270454, 1],
          [120.740392, 31.270454, 1],
          [120.74092, 31.260035, 1],
          [120.681934, 31.321388, 1],
          [120.728959, 31.283179, 1]
        ],
        "1500-2000": [
          [121.128619, 31.296403, 1],
          [120.740392, 31.270454, 1],
          [120.782726, 31.312978, 1],
          [120.736316, 31.277789, 1],
          [120.672626, 31.311643, 1]
        ]
      };
      
      var new_points = {
        'n_t':[
          [120.745472, 31.272965, 1],
          [120.545678, 31.283175, 1],
          [120.425087, 31.340143, 1],
          [120.425087, 31.340143, 1],
          [120.621102, 31.239954, 1]
        ]
      }
      var series = labels.map((i, j) => {
        var name = i;
        var data = points[name];
        var color = colorList[j];
        var data = data.map((item, index) => {
          return [item[0] - 6.32402, item[1] - 0.738151];
        });

        return {
          name: name,
          type: "scatter",
          coordinateSystem: "bmap",
          data: data,
          showEffectOn: "render",
          rippleEffect: {
            brushType: "stroke"
          },
          itemStyle: {
            normal: {
              color: color
            }
          }
        };
      });

      
      let colorNew = {'n_t': '#f4e925'};
      let new_series = [];
      for(let i in new_points) {
        var name = i;
        var data = new_points[i].map((item, index) => {
          return [item[0] - 6.32402, item[1] - 0.738151];
        });
        var color = colorNew[i];

        new_series.push({
          name,
          type: 'effectScatter',
          coordinateSystem: "bmap",
          data,
          showEffectOn: "render",
          rippleEffect: {
            brushType: "stroke"
          },
          itemStyle: {
            normal: {
              color
            }
          },
          //label: {
          //   normal: {
          //     formatter: '{b}',
          //     position: 'right',
          //     show: true,
          //   }
          // }
          // 
        })

      }

      series = series.concat(new_series);
      console.log(series)
      this.option = {
        bmap: {
          center: [114.306987, 30.570611],
          zoom: 12,
          z: -1,

          roam: true,
          enableMapClick: false,
          
        },
        title: {
          text: "吉家江寓楼盘分布(2018.03)",
          subtext: "来源:吉家江寓 | 作者:吴东岳 | 官网:jiangroom.com",
          left: "center",
          top: 5,
          backgroundColor: "rgba(255,255,255,0.8)",
          textStyle: {
            color: "#2B98DC",
            fontWeight: "bold"
          }
        },
        legend: {
          orient: "vertical",
          bottom: "50",
          left: "10",
          backgroundColor: "rgba(255,255,255,0.8)",
          data: labels.reverse(),
          formatter: function(name) {
            return "房价 " + name;
          }
        },
        series: series
      };
      this.series = series;
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
  },
  mounted() {
    this.initMap();

    var myChart = this.myChart;
    myChart.hideLoading();
    console.log(geoJson)
    // echarts.registerMap('WH', geoJson);
    echarts.registerMap('wuhan', geoJson);
    myChart.setOption( {
      
        title: {
            text: '武汉吉家江寓',
            subtext: '人口密度数据来自Wikipedia',
            sublink: 'http://zh.wikipedia.org/wiki/%E9%A6%99%E6%B8%AF%E8%A1%8C%E6%94%BF%E5%8D%80%E5%8A%83#cite_note-12'
        },
        tooltip: {
            trigger: 'item',
            // formatter: '{b}<br/>{c} (p / km2)'
        },
        bmap: {
            center:[114.306987, 30.570611],
            zoom: 10,
            roam: false,
            mapStyle: {
              'styleJson': [
                {
                  'featureType': 'water',
                  'elementType': 'all',
                  'stylers': {
                    'color': '#031628'
                  }
                },
                {
                  'featureType': 'land',
                  'elementType': 'geometry',
                  'stylers': {
                    'color': '#000102'
                  }
                },
                {
                  'featureType': 'highway',
                  'elementType': 'all',
                  'stylers': {
                    'visibility': 'off'
                  }
                },
                {
                  'featureType': 'arterial',
                  'elementType': 'geometry.fill',
                  'stylers': {
                    'color': '#000000'
                  }
                },
                {
                  'featureType': 'arterial',
                  'elementType': 'geometry.stroke',
                  'stylers': {
                    'color': '#0b3d51'
                  }
                },
                {
                  'featureType': 'local',
                  'elementType': 'geometry',
                  'stylers': {
                    'color': '#000000'
                  }
                },
                {
                  'featureType': 'railway',
                  'elementType': 'geometry.fill',
                  'stylers': {
                    'color': '#000000'
                  }
                },
                {
                  'featureType': 'railway',
                  'elementType': 'geometry.stroke',
                  'stylers': {
                    'color': '#08304b'
                  }
                },
                {
                  'featureType': 'subway',
                  'elementType': 'geometry',
                  'stylers': {
                    'lightness': -70
                  }
                },
                {
                  'featureType': 'building',
                  'elementType': 'geometry.fill',
                  'stylers': {
                    'color': '#000000'
                  }
                },
                {
                  'featureType': 'all',
                  'elementType': 'labels.text.fill',
                  'stylers': {
                    'color': '#857f7f'
                  }
                },
                {
                  'featureType': 'all',
                  'elementType': 'labels.text.stroke',
                  'stylers': {
                    'color': '#000000'
                  }
                },
                {
                  'featureType': 'building',
                  'elementType': 'geometry',
                  'stylers': {
                    'color': '#022338'
                  }
                },
                {
                  'featureType': 'green',
                  'elementType': 'geometry',
                  'stylers': {
                    'color': '#062032'
                  }
                },
                {
                  'featureType': 'boundary',
                  'elementType': 'all',
                  'stylers': {
                    'color': '#465b6c'
                  }
                },
                {
                  'featureType': 'manmade',
                  'elementType': 'all',
                  'stylers': {
                    'color': '#022338'
                  }
                },
                {
                  'featureType': 'label',
                  'elementType': 'all',
                  'stylers': {
                    'visibility': 'off'
                  }
                }
              ]
            }
        },
        geo: {
          aspectScale: 1
        },
        
        series: [
          {
            type: 'map',
            map:'wuhan',
            
            coordinateSystem: 'wuhan',
            itemStyle:{
              normal: {
                areaColor: 'rgb(9,10,34)',
                borderColor: 'rgb(47,131,243)',
                borderWidth: 1,
                shadowColor: 'rgba(47,131,243,1)',
                shadowBlur: 10,
                shadowOffsetX:0,
                shadowOffsetY: 0,
              },
              emphasis: {
                show: true
              }
            }
          }
        ].concat(this.series)
    });

   // this.myChart.setOption(this.option);
  },
};
</script>