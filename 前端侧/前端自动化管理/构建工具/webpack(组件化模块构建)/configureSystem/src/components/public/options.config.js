export const orderTypeOptions = [
  { value: 0, label: '新收订单' },
  { value: 1, label: '租期订单' },
  { value: 2, label: '退租订单' }
]

export const houseTypeOptions = [
  { value: 4, label: '精装' },
  { value: 1, label: '老旧' },
  { value: 2, label: '毛坯' }
]

export const orderStateOptions = [
  { value: 0, label: '待量房' },
  { value: 1, label: '量房中' },
  { value: 2, label: '待生成配置方案' },
  { value: 3, label: '待提交配置方案' },
  { value: 4, label: '配置方案待审批' },
  { value: 5, label: '待派单' },
  { value: 6, label: '施工中' },
  { value: 7, label: '待验收' },
  { value: 8, label: '待提交竣工' },
  { value: 9, label: '竣工驳回' },
  { value: 10, label: '待竣工' },
  { value: 11, label: '已竣工' },
  { value: 12, label: '订单完成' },
  { value: 13, label: '已取消' }
]

export const priceSource = [
  '管家单倍业绩',
  '管家双倍业绩',
  '扣供应商款',
  '扣配置提佣',
  '扣直销管家提佣',
  '扣客户押金',
  '扣业主房租',
  '公司付费'
]

// 超期天数
export const overdueDayOptions = [
  '未超期',
  '超期',
  '超期<=2',
  '超期(3-5)',
  '超期>=6'
]

export const deployStateOptions = [
  { value: 0, label: '待配置' },
  { value: 1, label: '配置中' },
  { value: 2, label: '配置完' }
]

export const ALL = { value: '', label: '全部' }

export const workOrderState = {
  9: '发送中', 
  0: '未发送',
  1: '未发送',
  2: '已发送',
  3: '已发送',
  4: '发送失败'
}
export const outTimeType = [
  { value: 0, label: '物业原因' },
  { value: 1, label: '管家原因' },
  { value: 2, label: '遗留物品没搬走' },
  { value: 3, label: '配置原因' },
  { value: 4, label: '供应商原因' },
  { value: 5, label: '系统原因' },
]
export const balconyTypes = [{ name: '无', value: 0 }, { name: '封闭式', value: 1 }, { name: '开放式', value: 2 }];
export const tolitTypes = [{ name: '独卫', value: 0 }, { name: '小合用卫生间', value: 1 }, { name: '大合用卫生间', value: 2 }]
export const isHaves = [{ name: '是', value: 1 }, { name: '否', value: 0 }];
export const houseStyles = [{ name: '可可', value: 0 }, { name: '起司', value: 1 }, { name: '原麦', value: 2 }]
export const houseOrientations = [{ name: '东', value: 0 }, { name: '南', value: 1 }, { name: '西', value: 2 }, { name: '北', value: 3 }, { name: '东南', value: 4 }, { name: '西北', value: 5 }, { name: '东北', value: 6 }, { name: '西南', value: 7 }];
export const houseInfoItems = {
  remark: { text: '说明', isBoolean: false },
  houseArea: { text: '使用面积', isBoolean: false },
  houseStyle: { text: '装修风格', isBoolean: false },
  isHeating: { text: '是否有暖气', isBoolean: true },
  isConditioner: { text: '是否能装空调', isBoolean: true },
  houseOrientation: { text: '房屋朝向', isBoolean: false },
  isToilet: { text: '是否有独卫', isBoolean: true },
  toiletArea: { text: '独卫面积', isBoolean: false },
  balconyType: { text: '阳台类型', isBoolean: false },
  balconyArea: { text: '阳台面积', isBoolean: false },
}
export const exceedCauseList = [
  { label: '物业原因', value: 0 },
  { label: '管家原因', value: 1 },
  { label: '遗留物品没搬走', value: 2 },
  { label: '供应商原因', value: 3 },
  { label: '系统原因', value: 4 },
  { label: '配置原因', value: 5 }
]