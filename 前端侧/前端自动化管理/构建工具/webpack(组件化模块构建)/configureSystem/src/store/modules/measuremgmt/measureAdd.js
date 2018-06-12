import * as api from '../../../api/housemeasuremgmt'
import * as types from '../../mutation-types'

// initial state
const state = {
    orderFlow:0, //流程（0-5）
    amountpkId:'',
    houseMeasureData:{
        orderInfo:{},//合同基本信息
        amountRoomInfo:{}, //配置周期规划
        formSend:{
            houseReserveDate:'',
            startDate:'',
            character:'',
            measureCauseInfos:[],
            startCauseInfos:[],
        }
    },
    houseTypeJson:[
        {
            project:'年份',
            content:'2005以前(含05年)',
            remark:'2005年前房子水电暖管道方面改造费用高项目复杂记1分',
            point:1,
            pointT:"",
        },
        {
            project:'厨房',
            content:'橱柜',
            remark:'更换新橱柜计算1分',
            point:1,
            pointT:"",
        },
        {
            project:'厨房',
            content:'瓷砖',
            remark:'更换墙砖或地砖超过1平方（或7块砖）计算1分',
            point:1,
            pointT:"",
        },
        {
            project:'卫生间',
            content:'防水',
            remark:'涉及到拆除墙地砖、重做防水、重新贴砖则计算1分',
            point:1,
            pointT:"",
        },
        {
            project:'卫生间',
            content:'洁具',
            remark:'洁具类、只要包含马桶、柱盆、水池中任何一项都计算1分',
            point:1,
            pointT:"",
        },
        {
            project:'厅卧',
            content:'整面铲墙',
            remark:'整面铲除计算1分，若只是零星小面积铲除1平方内则不计算',
            point:1,
            pointT:"",
        },
        {
            project:'厅卧',
            content:'地板全铺',
            remark:'铺设>=2个功能区域全部地板才计算1分',
            point:1,
            pointT:"",
        },
        {
            project:'门窗',
            content:'门',
            remark:'更换两扇和两扇以上计1分（不含隔断门，含厨卫门，阳台门和防盗门户）',
            point:1,
            pointT:"",
        },
        {
            project:'门窗',
            content:'换塑钢窗',
            remark:'局部更换也计1分',
            point:1,
            pointT:"",
        },
    ],
    houseTypeName:'',//精装，毛坯
}

// getters
const getters = {
    orderFlow:state => state.orderFlow,
    houseTypeName:state => state.houseTypeName,
    houseMeasureData: state => state.houseMeasureData,
    amountpkId: state => state.amountpkId,
}
// actions
const actions = {
    setHouseMeasure ({ commit },params) {
        api.setHouseMeasure(params,providers => {
            commit(types.SET_MEASURE_HOUSEMEASURE, { providers })
            commit(types.NEW_MESSAGE, { message:"量房信息设置成功!", type: "success" },{root:true})
        },message => {
            commit(types.NEW_MESSAGE, { message:"量房信息设置失败!", type: "error" },{root:true})
        })
    },
    getHouseMeasure ({ commit },pkId) {
        
        api.getHouseMeasure(pkId,providers => {
            commit(types.GET_MEASURE_HOUSEMEASURE, { providers })
        },message => {
            commit(types.NEW_MESSAGE, { message:"量房信息获取失败!", type: "error" },{root:true})
        })
    },
    setHouseMsg ({ commit },params={
        limit: 10,
        pageNum: 1
    }) {
        api.setHouseMsg(params,providers => {
            commit(types.NEW_MESSAGE, { message:"房屋信息设置成功!", type: "success" },{root:true})
            commit(types.SET_MEASURE_HOUSEMSG, { providers })
        },message => {
            commit(types.NEW_MESSAGE, { message:"房屋信息设置失败!", type: "error" },{root:true})
        })
    },
    getHouseMsg ({ commit },pkId) {
        api.getHouseMsg(pkId,providers => {
            commit(types.GET_MEASURE_HOUSEMSG, { providers })
        },message =>{
            commit(types.NEW_MESSAGE, { message:"量房信息获取失败!", type: "error" },{root:true})
        })
    },
    setHouseProperty ({ commit },params={
        limit: 10,
        pageNum: 1
    }) {
        api.setHouseProperty(params,providers => {
            commit(types.NEW_MESSAGE, { message:"物业交割设置成功!", type: "success" },{root:true})
            commit(types.SET_MEASURE_HOUSEPROPERTY, { providers })
        },message => {
            commit(types.NEW_MESSAGE, { message:"物业交割设置失败!", type: "error" },{root:true})
        })
    },
    getHouseProperty ({ commit },pkId) {
        api.getHouseProperty(pkId,providers => {
            commit(types.GET_MEASURE_HOUSEPROPERTY, { providers })
        },message => {
            commit(types.NEW_MESSAGE, { message:"物业交割数据获取失败!", type: "error" },{root:true})
        })
    },
    setHousePic ({ commit },params={
        limit: 10,
        pageNum: 1
    }) {
        api.setHousePic(params,providers => {
            commit(types.NEW_MESSAGE, { message:"量房照片获取成功!", type: "success" },{root:true})
            commit(types.SET_MEASURE_HOUSEPIC, { providers })
        },message => {
            commit(types.NEW_MESSAGE, { message:"量房照片设置失败!", type: "error" },{root:true})
        })
    },
    getHousePic ({ commit },pkId) {
        api.getHousePic(pkId,providers => {
            commit(types.GET_MEASURE_HOUSEPIC, { providers })
        }, message => {
            commit(types.NEW_MESSAGE, { message:"量房照片获取失败!", type: "error" },{root:true})
        })
    },


}

// mutations
const mutations = {
  
  [types.SET_MEASURE_HOUSEMEASURE] (state, { providers }) {
    
  },
  [types.GET_MEASURE_HOUSEMEASURE] (state, { providers }) {
    state.houseMeasureData.orderInfo=providers.orderInfo;
    if(!!providers.amountRoomInfo){
        state.amountpkId=providers.amountRoomInfo.pkId;
        state.houseMeasureData.amountRoomInfo=providers.amountRoomInfo;
        
        var houseReserveDate=providers.amountRoomInfo.houseReserveDate;
        var startDate=providers.amountRoomInfo.startDate;
        state.houseMeasureData.formSend.character=providers.amountRoomInfo.character;
        state.houseMeasureData.formSend.measureCauseInfos=providers.amountRoomInfo.measureCauseInfos || [];
        state.houseMeasureData.formSend.startCauseInfos=providers.amountRoomInfo.startCauseInfos || [];
        state.houseMeasureData.formSend.houseReserveDate=(new Date(houseReserveDate-0));
        
        state.houseMeasureData.formSend.startDate=(new Date(startDate-0));
    }else{
        state.amountpkId='';
        state.houseMeasureData.amountRoomInfo={};

        state.houseMeasureData.formSend.character='';
        state.houseMeasureData.formSend.measureCauseInfos=[];
        state.houseMeasureData.formSend.startCauseInfos=[];
        state.houseMeasureData.formSend.houseReserveDate='';
        state.houseMeasureData.formSend.startDate='';
    }
    var character=providers.orderInfo.characterString;
    state.orderFlow=providers.orderInfo.orderFlow;
    state.houseTypeName=providers.orderInfo.houseTypeName;
    if(!!character){
        for(let i=0;i< state.houseTypeJson.length;i++){
            state.houseTypeJson[i].pointT=character[i];
        }
    }else{
        for(let i=0;i< state.houseTypeJson.length;i++){
            state.houseTypeJson[i].pointT='';
        }
    }
    state.houseMeasureData.formSend.houseTypeJson=state.houseTypeJson;

  },
  [types.SET_MEASURE_HOUSEMSG] (state, { providers }) {
    
  },
  [types.GET_MEASURE_HOUSEMSG] (state, { providers }) {
    
  },
  [types.SET_MEASURE_HOUSEPROPERTY] (state, { providers }) {
    
  },
  [types.GET_MEASURE_HOUSEPROPERTY] (state, { providers }) {
    
  },
  [types.SET_MEASURE_HOUSEPIC] (state, { providers }) {
    
  },
  [types.GET_MEASURE_HOUSEPIC] (state, { providers }) {
    
  },
}

export default {
  namespaced:true,
  state,
  getters,
  actions,
  mutations
}

