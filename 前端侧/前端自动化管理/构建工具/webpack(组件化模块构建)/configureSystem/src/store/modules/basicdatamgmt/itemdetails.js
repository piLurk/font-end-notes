import * as api from '../../../api/basicdatamgmt'
import * as types from '../../mutation-types'

// initial state
const state = {
  goodsDetail: {},
  goodsPro0: [],
  allTotal0: [0, 0, 0],

  goodsPro1: [],
  allTotal1: [0, 0, 0],

  goodsPro2: [],
  allTotal2: [0, 0, 0],

  operGoods0: {}
}

const format = p => ({
  number: p.defaultNumber,
  expirydate: p.endDate,
  goodsId: p.goodsId,
  goodsTypeId: p.goodsTypeId,
  status: p.isUse,
  applyto: p.jrId,
  proName: p.natureName,
  natureType: p.natureType,
  pkId: p.pkId,
  effectivedate: p.startDate
})

// getters
const getters = {
  allTotal0: state => state.allTotal0,
  allTotal1: state => state.allTotal1,
  allTotal2: state => state.allTotal2,
  accessoriesGroup: ({ goodsPro0 }) => goodsPro0.map(format),
  assemblyGroup: ({ goodsPro1 }) => goodsPro1.map(format),

  /**{
								parameter1: "M233434", //物品价格编码
								parameter2: "使用中", //状态
								parameter3: "M233434", //供应商编码
								parameter4: "武汉飞龙基业物流有限公司", //供应商名称
								parameter5: "¥2100.00",
								parameter6: "2017-09-01", //生效日期
								parameter7: "2017-09-01", //失效日期
								parameter8: "5%（含税）",
								parameter9: "武汉飞龙基业物流有限公司", //结算供应商
								parameter10: "是"
              }, 
              anProId:"62f1b162-480a-447c-940a-4898b061e2ae"
              cost:11
endDate:"1496505600000"
goodsId:"7ce9dd3f-2ab9-414d-915c-d4ceeade6075"
isRate:1
isRepair:0
jrId:null
json:null
pkId:"266acb04-9c0a-40c4-b805-48e7152cc888"
priceIsUse:1
priceNumber:"JG010115445656413246"
proId:"113e34a2-0384-4c08-a13a-7aa08a29c1aa"
proName:"美的,冰箱"
proNumber:"SSA45645643"
rate:1
startDate:"1501776000000"
              
              */
  priceGroup: ({ goodsPro2 }) => goodsPro2.map(p => ({
    pkId: p.pkId,
    parameter1: p.priceNumber, //物品价格编码
    parameter2: p.priceIsUse, //状态
    parameter3: p.proNumber, //供应商编码
    parameter4: p.proName, //供应商名称
    parameter5: '￥' + p.cost,
    parameter6: p.startDate, //生效日期
    parameter7: p.endDate, //失效日期
    parameter8: p.rate + '%（' + (p.isRate ? '含税' : '不含税') + '）',
    parameter9: p.anSupplierName, //结算供应商
    parameter10: p.isRepair ? '是' : '否'
  })),
  goodsDetail: ({ goodsDetail }) => ({
    pkId: goodsDetail.pkId,
    proNumber: goodsDetail.goodsNumber,
    proName: goodsDetail.goodsName,
    status: '' + goodsDetail.goodsIsUse,
    nature: goodsDetail.natureName,
    proUnit: goodsDetail.goodsUnit,
    isRepair: '' + goodsDetail.isMaintain,
    proNatureValue: '' + goodsDetail.proType,
    upperLimit: goodsDetail.maxNumber,
    firstCategory: goodsDetail.sortOne,
    secondCategory: goodsDetail.sortTwo,
    thirdCategory: goodsDetail.classifyId,
    apportioned: '' + goodsDetail.isApportion,
    apportionedYear: goodsDetail.apportionDeadline,
    applyto: '江寓合租V1.0',
    startDate: goodsDetail.startDate,
    endDate: goodsDetail.endDate
  })
}

// actions
const actions = {
  getGoodsDetailById({ commit }, params) {
    return api.getGoodsById(params, goods => {
      commit(types.RECEIVE_GOODS_DETAIL, { goods })
    }, () => {
      commit(types.NEW_MESSAGE, { message: '获取物品信息失败!', type: "error" })
    })
  },
  getGoodsPro({ commit }, params) {
    let _p = Object.assign({}, params, { type: params.type + 1 });
    return api.getGoodsPro(_p, goods => {
      commit(types.RECEIVE_GOODS_PRO, { goods, type: params.type })
    }, () => {
      commit(types.NEW_MESSAGE, { message: '获取物品信息失败!', type: "error" })
    })
  },
  getGoodsPrice({ commit }, params) {
    return api.getGoodsPrice(params, goods => {
      commit(types.RECEIVE_GOODS_PRO, { goods, type: 2 })
    }, () => {
      commit(types.NEW_MESSAGE, { message: '获取物品信息失败!', type: "error" })
    })
  },
}

// mutations
const mutations = {
  // [types.RECEIVE_ALL_GOODS](state, { goods, total }) {
  //   state.goods = goods || []
  //   state.goodsTotal = total
  // },
  [types.RECEIVE_GOODS_DETAIL](state, { goods }) {
    state.goodsDetail = goods || {}
  },
  [types.RECEIVE_GOODS_PRO](state, { goods, type }) {
    state[`goodsPro${type}`] = goods.items || []
    state[`allTotal${type}`] = goods.totalNum || [0, 0, 0]
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
