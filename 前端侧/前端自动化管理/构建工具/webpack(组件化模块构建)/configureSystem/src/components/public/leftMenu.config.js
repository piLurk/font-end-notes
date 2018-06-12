module.exports = [
  {
    id: 'workbench',
    name: '工作台',
    icon: 'i-workBench',
    p_code:'PZ_workBench'
  },
  {
    name: '订单管理',
    icon: 'i-orderManage',
    p_code:'PZ_orderAdmin',
    children: [{
      id: 'orderQuery',
      name: '订单查询',
      p_code:'PZ_twoOrderAll'
    }, {
      id: 'newOrder',
      name: '租期订单生成',
      p_code:'PZ_twoLease'
    }]
  }, {
    name: '量房管理',
    icon: 'i-measureManage',
    p_code:'PZ_amountAdmin',
    children: [{
      id: 'houseMeasureQuery',
      name: '量房信息列表',
      p_code:'PZ_twoAmount'
    }]
  }, {
    name: '项目计划',
    icon: 'i-projectPlan',
    p_code:'PZ_itemPlan',
    children: [{
      id: 'configuePlanManage',
      name: '配置方案管理',
      p_code:'PZ_twoDepley'
    }, {
      id: 'workOrderManage',
      name: '派工单管理',
      p_code:'PZ_twoTask'
    },]
  }, {
    name: '项目交付',
    icon: 'i-projectDelivery',
    p_code:'PZ_itemOver',
    children: [{
      id: 'workOrderCheck',
      name: '派工单验收管理',
      p_code: 'PZ_twoCheck'
    }, {
      id: 'informationDelivery',
      name: '信息交付管理',
      p_code: 'PZ_twoInfo'
    }, {
      id: 'completedCheck',
      name: '竣工验收管理',
      p_code: 'PZ_twoCloseout'
    },]
  }, {
    name: '管理中心',
    icon: 'i-managementCenter',
    p_code:'PZ_adminCentre',
    children: [{
      id: 'schedulePlan',
      name: '工期规划管理',
      p_code: 'PZ_twoPeriod'
    }, {
      id: 'approvalConfiguration',
      name: '配置方案审批',
      p_code: 'PZ_twoApproval'
    }, {
      id: 'calendar',
      name: '节假日维护',
      p_code:'PZ_twoHoliday'
    }, {
      id: 'replenishProject',
      name: '补充工期',
      p_code:'PZ_twoSth'
    }, {
      id: 'infoManagementQuery',
      name: '房屋信息变更',
      p_code:'PZ_twoChange'
    }, {
      id: 'costCount',
      name: '成本统计表',
      p_code:'PZ_twoCost'
    },  {
      id: 'completedDataManage',
      name: '竣工数据管理',
      p_code:'PZ_twoCost'
    }]
  }, {
    name: '基础数据管理',
    icon: 'i-basicData',
    p_code:'PZ_basic',
    children: [{
      id: 'supplier',
      name: '供应商管理',
      p_code:'PZ_twoProvider'
    }, {
      id: 'matchsupplier',
      name: '匹配供应商',
      p_code:'PZ_twoMate'
    }, {
      id: 'solution',
      name: '标配方案管理',
      p_code:'PZ_twoStandard'
    }, {
      id: 'itemclassification',
      name: '物品分类管理',
      p_code:'PZ_twoSort'
    }, {
      id: 'itemmanagement',
      name: '物品管理',
      p_code:'PZ_twoGoods'
    }]
  }
]