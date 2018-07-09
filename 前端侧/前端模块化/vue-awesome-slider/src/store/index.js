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
      count:'',
      out_count:'',
    },
    dataList: [],
    newdataList: []
    
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
    },
    newdataList(state) {
      return state.newdataList
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
        }else if(type === '3') {
          state.house_count.out_count = item.orderCnt;
        }
      })
    },
    'ADD_DATALIST': (state, list) => {
      if(list && list.length > 0) {
        
        if(state.dataList.length === 0) {
          state.dataList = list
        }else {
          let newList = list.filter((item, i) => {
            return state.dataList.every((p) => {
              return p.employeeId !== item.employeeId
            })
          }) 
          state.newdataList = newList
        }
        
      }
      
    },
    'SET_MAPDATA':(state, list) => {
      state.mapData = state.mapData.concat(...list)
    },
    'ADD_MAPDATA': (state) => {
      state.mapData = [...state.mapData, ...state.newMapData]
    },
    'SET_NEW_MAP_DATA': (state, list) => {
      state.newMapData = list
    },
    'REFRESH_DATALIST': (state) => {
      state.dataList = [...state.newdataList, ...state.dataList].splice(0, 10)
    },
    'EMPTY_NEWDATALIST': (state) => {
      state.newdataList = []
    }
  },


  actions: {
    queryRightData({ commit, dispatch } ) {
      queryRightData({
        cb(data) {
          commit('SET_HOUSE_COUNT', data.count)
          commit('ADD_DATALIST', data.ten)
        },
        errorCb(msg) {
          // dispatch("sendMessage", {
          //   type:'error',
          //   message: msg || '房源及收出房数据获取失败！'
          // }, {root: true})
        }

      })
    },
    queryLeftData({ commit, dispatch }) {

      queryLeftData({
        cb(data) {
          commit('SET_MAPDATA', data);
        },
        errorCb(msg) {
          //console.log(msg)
          // dispatch("sendMessage", {
          //   type:'error',
          //   message: msg || '地图数据加载失败！'
          // }, {root: true})
        }
      })
    },
    getNewOrderList({ commit, dispatch, state }) {
      getNewOrderList({
        cb(data){
          let list = data;
          // 有新的收房数据
          if(list && list.length > 0) {
            
            //同时存在老的收房数据
            if(state.newMapData && state.newMapData.length > 0) {
              commit('ADD_MAPDATA')
            }
            commit('SET_NEW_MAP_DATA', data);
          }
          
          
          
        },
        errorCb(msg) {
          //console.log(msg)
          // dispatch("sendMessage", {
          //   type:'error',
          //   message: msg || '实时地图数据加载失败！'
          // }, {root: true})
        }
      })
    },
    setAllList({ commit }) {
      commit('REFRESH_DATALIST')
      commit('EMPTY_NEWDATALIST')
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
