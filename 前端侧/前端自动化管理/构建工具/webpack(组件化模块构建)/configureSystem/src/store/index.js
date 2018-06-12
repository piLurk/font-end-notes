import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

// import actions from './actions'
import message from './modules/message'

// by wudongyue
import orderQuery from './modules/ordermgmt/orderQuery'
import orderDetail from './modules/ordermgmt/orderDetail'
import newOrder from './modules/ordermgmt/newOrder'

import measureQuery from './modules/measuremgmt/measureQuery'
import measureAdd from './modules/measuremgmt/measureAdd'

import menu from './modules/menu'
import user from './modules/user'
import getters from './getters'


import supplier from './modules/basicdatamgmt/supplier'
import itemclassification from './modules/basicdatamgmt/itemclassification'
import itemmanagement from './modules/basicdatamgmt/itemmanagement'
import itemdetails from './modules/basicdatamgmt/itemdetails'
import matchsupplier from './modules/basicdatamgmt/matchsupplier'
import solution from './modules/basicdatamgmt/solution'


import configuePlanManage from './modules/projectplan/configuePlanManage'
import createPlan from './modules/projectplan/createPlan'
import workOrderManage from './modules/projectplan/workOrderManage'
import plan from './modules/projectplan/plan'

import projectdelivery from './modules/projectdelivery/projectdelivery'


export default new Vuex.Store({
	getters,
	//模块引用 用modules ，mutations包括 state和mutaions getters
	modules: {
		menu,
		message,
		user,

		supplier,
		orderQuery,
		orderDetail,
		newOrder,
		measureQuery,
		measureAdd,
		itemclassification,
		itemmanagement,
		itemdetails,
		matchsupplier,
		solution,
		projectplan: {
			namespaced: true,
			modules: {
				configuePlanManage,
				createPlan,
				workOrderManage,
				plan
			}
		},
		projectdelivery,


	},
	// actions
})