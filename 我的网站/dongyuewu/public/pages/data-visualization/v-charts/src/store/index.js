import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import  { queryRightData, queryLeftData, getNewOrderList } from 'api';

import message from './message'
const app = {
  state: {
    mapData:[],
    newMapData:[],
    house_count: {
      range:'',
      count:''
    },
    dataList: []
    
  },
  getters: {
    mapData(state) {
      return state.mapData
    },
    newMapData(state) {
      return state.newMapData
    },
    house_count(state) {
      return state.house_count
    },
    dataList(state) {
      return state.dataList
    }


  },
  mutations: {
    'SET_HOUSE_COUNT': (state, count) => {
      count.map( (item,i) => {
        let type = item.type;
        if(type === '1') {
          state.house_count.range = item.orderCnt;
        }else if(type === '2') {
          state.house_count.count = item.orderCnt;
        }
      })
    },
    'SET_DATALIST': (state, list) => {
      state.dataList = list
    },
    'SET_MAPDATA':(state, list) => {
      state.mapData = list
    },
    'SET_NEW_MAP_DATA': (state, list) => {
      state.newMapData = list
    }
  },


  actions: {
    queryRightData({ commit } ) {
      queryRightData({
        cb(data) {
          commit('SET_HOUSE_COUNT', data.count)
          commit('SET_DATALIST', data.ten)
        },
        errorCb(msg) {
          dispatch("sendMessage", {
            type:'error',
            message: msg || '房源及收出房数据获取失败！'
          }, {root: true})
        }

      })
    },
    queryLeftData({ commit }) {

      queryLeftData({
        cb(data) {
          commit('SET_MAPDATA', data);
        },
        errorCb(msg) {
          dispatch("sendMessage", {
            type:'error',
            message: msg || '地图数据加载失败！'
          }, {root: true})
        }
      })
    },
    getNewOrderList({ commit }) {
      getNewOrderList({
        cb(data){
          commit('SET_NEW_MAP_DATA', data.ten)
        },
        errorCb(msg) {
          dispatch("sendMessage", {
            type:'error',
            message: msg || '实时地图数据加载失败！'
          }, {root: true})
        }
      })
    }

  }
}

const store = new Vuex.Store({
  modules: {
    app,
    message
  }
})

export default store
