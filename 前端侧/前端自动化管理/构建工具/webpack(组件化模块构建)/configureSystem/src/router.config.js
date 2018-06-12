
//路由配置文件

const workbench = () => import('components/workbench/workbench.vue')//工作台
const supplier = () => import('components/basicdatamgmt/supplier.vue')//基础数据管理(供应商管理)
const matchsupplier = () => import('components/basicdatamgmt/matchsupplier.vue')//基础数据管理(匹配供应商)
const solution = () => import('components/basicdatamgmt/solution.vue')//基础数据管理(标配方案管理)
const configuePlanManage = () => import('components/projectplan/configuePlanManage.vue')//项目计划(配置方案管理)
const createPlan = () => import('components/projectplan/createPlan.vue')//项目计划(生成配置方案)
const approvePlan = () => import('components/mgmtcenter/approvePlan.vue')//项目计划(生成配置方案) mego
const workOrderManage = () => import('components/projectplan/workOrderManage.vue')//项目计划(派工单管理)
const plan = () => import('components/projectplan/plan.vue')//项目计划(制定施工计划)
const workOrderCheck = () => import('components/projectdelivery/workOrderCheck.vue')//项目交付(派工单验收管理)
const checkorder = () => import('components/projectdelivery/checkorder.vue')//项目交付(工单验收)
const completedCheck = () => import('components/projectdelivery/completedCheck.vue')//项目交付(竣工验收管理)
const completedCheckDetail = () => import('components/projectdelivery/completedCheckDetail.vue')//项目交付(竣工验收-验收页面)
const replenishProject = () => import('components/mgmtcenter/replenishProject.vue')//管理中心(补充工期)

// by wudongyue
const newOrder = () => import('components/ordermgmt/NewOrder.vue')
const orderQuery = () => import('components/ordermgmt/OrderQuery.vue')
const orderDetail = () => import('components/ordermgmt/OrderDetail.vue')
const addOrder = () => import('components/ordermgmt/AddOrder.vue')
const houseMeasureQuery = () => import('components/housemeasuremgmt/HouseMeasureQuery.vue')
const houseMeasureAdd = () => import('components/housemeasuremgmt/HouseMeasureAdd.vue')
const schedulePlan = () => import('components/mgmtcenter/SchedulePlan.vue')
const infoManagementQuery = () => import('components/mgmtcenter/InfoManagementQuery.vue')
const infoManagementEditor = () => import('components/mgmtcenter/InfoManagemenetEditor.vue')
const costCount = () => import('components/mgmtcenter/CostCount.vue')
const completedDataManage = () => import('components/mgmtcenter/CompletedDataManage.vue')
const completedDataEdit = () => import('components/mgmtcenter/CompletedDataEdit.vue')


//by chifeng
const itemclassification = () => import('components/basicdatamgmt/itemclassification.vue')  //物品分类管理
const itemmanagement = () => import('components/basicdatamgmt/itemmanagement.vue')  //物品管理
const itemdetails = () => import('components/basicdatamgmt/itemdetails.vue') //物品详情
const informationDelivery = () => import('components/projectdelivery/informationDelivery.vue')  //信息交付
const informationDeliveryDetails = () => import('components/projectdelivery/informationDeliveryDetails.vue') //信息交付详情页
const approvalConfiguration = () => import('components/mgmtcenter/approvalConfiguration.vue')  //审批配置方案
const approvalConfigurationDetail = () => import('components/mgmtcenter/approvalConfigurationDetail.vue')  //审批配置方案详情
const calendar = () => import('components/mgmtcenter/calendar.vue')  //日历

// :id? 可选参数,一般只能最后一个参数可选

export default [
	// { path: '/', redirect: { name: 'workbench' } },
	{ path: '/workbench', name: 'workbench', component: workbench, alias: '/' },
	{ path: '/itemclassification', name: 'itemclassification', component: itemclassification },
	{ path: '/itemmanagement', name: 'itemmanagement', component: itemmanagement },
	{ path: '/itemdetails/:id?', name: 'itemdetails', component: itemdetails },
	{ path: '/supplier', name: 'supplier', component: supplier },
	{ path: '/matchsupplier', name: 'matchsupplier', component: matchsupplier },
	{ path: '/solution', name: 'solution', component: solution },
	{ path: '/configuePlanManage', name: 'configuePlanManage', component: configuePlanManage },
	{ path: '/createPlan/:oper/:type/:id', name: 'createPlan', component: createPlan },
	{ path: '/approvePlan/:id',name:'approvePlan',component:approvePlan},//mego
	{ path: '/plan/:oper', name: 'plan', component: plan },
	{ path: '/workOrderManage', name: 'workOrderManage', component: workOrderManage },
	{ path: '/workOrderCheck', name: 'workOrderCheck', component: workOrderCheck },
	{ path: '/checkorder', name: 'checkorder', component: checkorder },
	{ path: '/completedCheck', name: 'completedCheck', component: completedCheck },
	{ path: '/completedCheckDetail', name: 'completedCheckDetail', component: completedCheckDetail },
	{ path: '/replenishProject', name: 'replenishProject', component: replenishProject },
	{ path: '/newOrder', name: 'newOrder', component: newOrder },
	{ path: '/orderQuery', name: 'orderQuery', component: orderQuery },
	{ path: '/orderDetail', name: 'orderDetail', component: orderDetail },
	{ path: '/addOrder', name: 'addOrder', component: addOrder },
	{ path: '/houseMeasureQuery', name: 'houseMeasureQuery', component: houseMeasureQuery },
	{ path: '/houseMeasureAdd', name: 'houseMeasureAdd', component: houseMeasureAdd },
	{ path: '/schedulePlan', name: 'schedulePlan', component: schedulePlan },
	{ path: '/infoManagementQuery', name: 'infoManagementQuery', component: infoManagementQuery },
	{ path: '/infoManagementEditor', name: 'infoManagementEditor', component: infoManagementEditor },
	{ path: '/informationDelivery', name: 'informationDelivery', component: informationDelivery },
	{ path: '/informationDeliveryDetails', name: 'informationDeliveryDetails', component: informationDeliveryDetails },
	{ path: '/approvalConfiguration', name: 'approvalConfiguration', component: approvalConfiguration },
	{ path: '/approvalConfigurationDetail', name: 'approvalConfigurationDetail', component: approvalConfigurationDetail },
	{ path: '/calendar', name: 'calendar', component: calendar },
	{ path: '/costCount', name: 'costCount', component: costCount },
	{ path: '/completedDataManage', name: 'completedDataManage', component: completedDataManage },
	{ path: '/completedDataEdit', name: 'completedDataEdit', component: completedDataEdit }	
]