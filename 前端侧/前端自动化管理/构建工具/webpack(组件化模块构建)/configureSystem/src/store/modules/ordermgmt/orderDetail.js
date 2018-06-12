import * as api from '../../../api/ordermgmt.js'
import * as types from '../../mutation-types'

//服务器错误
const hostErrorCb = () => {
    commit(types.NEW_MESSAGE, { state, message: { type: 'error', message: '服务器错误' } })
}

// initial state
const state = {
    dataObj: {},
    form: {
        orderMsg: {
            orderNumber: '',//订单编号
            orderStateName: '',//订单状态
            orderTypeName: '',//订单类型
            predictPrice: '',//订单预估计总额
            standardPrice: '',//订单实际总额
            predictPeriod: '',//订单预计周期
            standardPeriod: '',//订单标准配置周期
            orderPeriod: '',//订单实际周期
            predictDate: '',//预计竣工日期
            standardDate: '',//实际竣工日期
            orderProcess: '',//订单流程
            houseTypeName: '',// 收房产品
            relatedRoom: '' //相关房间 
        },
        orderState: {

        },
        otherMsg: {
            contractNumber: '',//收房合同号
            contractDate: '',//合同生效日期
            pactState: '',//收房产品
            productRelease: '',//产品版本
            reserveDate: '',//量房日期
            maintenanceFunds: '',//年维修基金

            housingNumber: '',//房源编号
            propertyAddress: '',//物业地址
            optimizeNew: '',//优化前户型
            optimizeOld: '',//优化后户型
            buildArea: '',//建筑面积

            steward: '',//收房管家
            deployAttache: '',//收房配置专员
            area: '',//收房区经
            deployGroup: '',//收房配置组长
            majordomo: '',//收房总监
            groupAttache: '',//所属配置专员
            directSteward: '',//直销管家
            groupGroup: '',//所属配置组长
            groupSteward: '',//所属管家
            quitAttache: '',//退租配置专员
            groupArea: '',//所属区经
            quitGroup: '',//退租配置组长
            groupMajordomo: ''//所属总监			
        },
        comments:[]
    }
}

// getters
const getters = {
    dataObj: state => state.dataObj,
    form: state => state.form
}

// actions
const actions = {
    getOrderDetail({ commit }, orderId) {
        api.getorderDetail(orderId, proviers => {
            commit(types.RECEIVE_ORDER_DETAIL, { proviers });
        })
    }
}

// mutations
const mutations = {
    [types.RECEIVE_ORDER_DETAIL](state, { proviers }) {
        let dataHandle = new DataHandle();
        dataHandle.assignJson(state.form.orderMsg, proviers);
        var otherMsg = Object.assign(proviers.housePactMo, proviers.housingBaseMo, proviers.peopleMo);
        dataHandle.assignJson(state.form.otherMsg, otherMsg);
        state.form.comments=proviers.comments;
    }
}

export default {
    namespaced:true,
    state,
    getters,
    actions,
    mutations
}
