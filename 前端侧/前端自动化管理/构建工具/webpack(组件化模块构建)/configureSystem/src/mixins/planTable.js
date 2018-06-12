import { priceSource } from '@/components/public/options.config'
import uniq from 'lodash/uniq'
import sortBy from 'lodash/sortBy'
import { getSortGoods, getGoodsById } from '@/api/basicdatamgmt'
import { getStandardDetail, getConfPlanDetail, getGoodsAddition, getGoodsPriceDetail } from '@/api/projectplan'


// 检查数据完整性
const checkIntegrity = ele =>
  !ele.goodsId ||
  (ele.sortId &&
    ele.goodsId &&
    ele.key &&
    (ele.unitPrice || ele.unitPrice === 0) &&
    ele.unit &&
    !isNaN(ele.number) &&
    ele.number !== '' &&
    ele.number !== null &&
    ele.number !== undefined)

const createRow = functionType => ({
  endDate: null,
  goodsId: '',
  goodsName: '请选择',
  number: '',
  sortId: '',
  sortName: '请选择',
  functionType: functionType,
  key: 'disposition',
  startDate: null,
  height: null,
  startDate: null,
  endDate: null,
  priceSource: priceSource[0]
})

const numValidator = ele => {
  if (ele.number === '' || !ele.maxNumber) {
    return ''
  } else if (isNaN(ele.number)) {
    return '请输入数字'
  } else if (ele.number > ele.maxNumber) {
    return '不能大于最大数量 ' + ele.maxNumber
  } else {
    return ''
  }
}

const rowValidator = ele => {
  const _numValid = numValidator(ele)
  const _rowValid = _numValid || !checkIntegrity(ele)
  return [_rowValid, _numValid]
}

export default {
  data() {
    return {
      BLANK1: { sortName: '请选择', id: '' },
      BLANK2: { goodsName: '请选择', pkId: '' },
      isOperRow: false,
      classifyDetail: {
        disposition: [],
        accessory: []
      },
      costSourceOptions: priceSource,
      goodsOptionsMap: {},
      goodsOptionsMapFlag: {},
      goodsDetailMap: {},
      isInit: false,
      isRefreshTable: false,
      validateRow1: [],
      validateRow2: [],
      mergrRule1: [],
      // mergrRule2: []
    }
  },
  computed: {
    level2UsedTreeMap() {
      let _map = {}
      this.$store.getters.level2UsedTree.map(ele => {
        _map[ele.id] = ele
      })
      return _map
    },
    // mergrRule1() {
    //   return this.setMergrRule(this.classifyDetail.disposition)
    // },
    mergrRule2() {
      return this.setMergrRule(this.classifyDetail.accessory)
    },
    rowClass1() {
      return this.setRowClass(this.mergrRule1)
    },
    rowClass2() {
      return this.setRowClass(this.mergrRule2)
    }
  },
  methods: {
    initMergrRule1(dataList) {
      this.mergrRule1 = this.setMergrRule(dataList)
    },
    // 设置合并规则
    setMergrRule(dataList) {
      const roomList = this.roomList
      let _map = roomList.map(e => -1)
      let result = []
      dataList.map((d, index) => {
        let i = roomList.indexOf(d.functionType)
        if (_map[i] === -1) {
          _map[i] = index
          result[index] = 1
        } else {
          result[_map[i]]++
          result[index] = 0
        }
      })
      return result
    },
    // 设置样式
    setRowClass(rule) {
      const splitClass = 'split-class'
      let flag = 1

      return rule.map(ele => {
        if (ele !== 0) {
          flag = flag === 0 ? 1 : 0
        }
        return splitClass + flag
      })
    },
    // 校验数据
    rowValidator(row, index, type) {
      const v = rowValidator(row)
      this.$nextTick(function () {
        this['validateRow' + type][index] = v
      })
      return v
    },

    setGoodsOptionsMap(sItem) {
      if (!sItem.sortId) return
      if (this.goodsOptionsMap[sItem.sortId]) {
        if (this.goodsOptionsMap[sItem.sortId].some(e => e.pkId == sItem.goodsId)) {
          return
        }
        this.goodsOptionsMap[sItem.sortId].push({
          pkId: sItem.goodsId,
          goodsName: sItem.goodsName
        })
      } else {
        this.$set(this.goodsOptionsMap, sItem.sortId, [{ pkId: sItem.goodsId, goodsName: sItem.goodsName }])
      }
    },
    // 检查是否有重复物品
    checkRepeat(item) {
      if (item.goodsId == '' || (this.parentItem && this.parentItem.sortName === '家居')) {
        return
      }
      const c = this.classifyDetail.disposition
      const l = c.filter(e => e.functionType === item.functionType && e.goodsId === item.goodsId)
      if (l.length > 1) {
        this.$message.error('同一功能区间不能选择相同物品！')
        return true
      } else {
        return false
      }
    },
    // 清除无效配件
    clearAddition(deployDetailsMap) {
      let _map = {}
      const classifyDetail = deployDetailsMap || this.classifyDetail
      classifyDetail.disposition.forEach(ele => {
        _map[ele.functionType] ? _map[ele.functionType].push(ele.goodsId) : (_map[ele.functionType] = [ele.goodsId])
      })
      classifyDetail.accessory = classifyDetail.accessory.filter(
        ele => _map[ele.functionType] && _map[ele.functionType].indexOf(ele.pid) !== -1
      )
      return classifyDetail
    },
    // 在数据集合里添加配件
    addAddition(additions, functionType) {
      this.$nextTick(function(){
        additions = additions || []
        additions = JSON.parse(JSON.stringify(additions))
        additions.forEach(ele => (ele.functionType = functionType))
  
        this.classifyDetail.accessory.push(...additions)
        this.sortClassifyDetail(this.classifyDetail, 'accessory')
      })
    },
    sortClassifyDetail(classify, key) {
      const _list = this.roomList
      const fn = a => _list.indexOf(a.functionType)
      classify[key] = sortBy(classify[key], fn)
    },
    clearItem(item) {
      if (this.isOperRow) {
        return
      }
      // 物品分类改变时清空物品信息
      if (!this.isRefreshTable) {
        this.$set(item, 'goodsId', '')
        this.$set(item, 'unit', '')
        this.$set(item, 'unitPrice', '')
        this.$set(item, 'number', '')
      }
    },
    getGoodsOptions(classifyId, item) {
      // 没有Id（置空）
      if (!classifyId) return
      if (!this.goodsOptionsMapFlag[classifyId]) {
        return getSortGoods(
          {
            items: {
              classifyId: classifyId,
              maxNumber: 3
            },
            limit: 999,
            pageNum: 1
          },
          data => {
            const opt = data.items
              ? data.items.filter(e => e.goodsIsUse === 1 && e.isExpired === 0 && e.proType === 0)
              : []
            this.$set(this.goodsOptionsMapFlag, classifyId, true)
            this.$set(this.goodsOptionsMap, classifyId, opt)
          }
        )
      }
    },
    getGoodsDetail(index, item, sortId) {
      if (this.isOperRow || this.isRefreshTable) {
        return
      }

      this.$set(item, 'maxNumber', '')
      this.$set(item, 'unit', '')
      this.$set(item, 'unitPrice', '')
      if (this.checkRepeat(item)) {
        return (item.goodsId = '')
      }
      this.clearAddition()
      // this.refreshMergrRule();
      const goodsId = item.goodsId
      if (!goodsId) {
        return
      }
      // 如果物品详情map里面有就直接取
      // 没有就分别查两个接口获取 单位/最大数量、价格
      if (!this.goodsDetailMap[goodsId]) {
        this.$set(this.goodsDetailMap, goodsId, {})
        getGoodsById(goodsId, data => {
          item.maxNumber = data.maxNumber
          item.unit = data.goodsUnit
          this.$set(this.goodsDetailMap[goodsId], 'maxNumber', data.maxNumber)
          this.$set(this.goodsDetailMap[goodsId], 'unit', data.goodsUnit)
        })
        if (!this.providerIdMap[sortId]) {
          this.$message.warning('此分类没有供应商，无法获取价格')
          return
        }
        getGoodsPriceDetail(goodsId, this.providerIdMap[sortId], data => {
          item.unitPrice = data.cost
          if (!data.cost && data.cost !== 0) {
            this.$message.warning('该物品没有价格')
          }
          this.$set(this.goodsDetailMap[goodsId], 'unitPrice', data.cost)
        })
        getGoodsAddition(item.functionType, item.goodsId, this.providerIdMap[sortId], data => {
          data.forEach(ele => {
            ele.pid = goodsId
            ele.key = 'accessory'
            ele.priceSource = priceSource[0]
          })
          this.$set(this.goodsDetailMap[goodsId], 'addition', data)
          this.addAddition(data, item.functionType)
        })
      } else {
        const data = this.goodsDetailMap[goodsId]
        item.maxNumber = data.maxNumber
        item.unit = data.unit
        item.unitPrice = data.unitPrice
        this.addAddition(data.addition, item.functionType)
      }
    },
    delRow(index, { functionType, goodsId }) {
      this.isOperRow = true
      const list = this.classifyDetail
      let _rule = this.mergrRule1
      let headNum = 0;
      for(let i = index; i>-1;i--){
        headNum = this.mergrRule1[i]
        if(headNum>0){
          _rule.splice(i, 2, headNum - 1)
          break;
        }
      }
      this.mergrRule1 = _rule
      list.disposition.splice(index, 1)
      list.accessory = list.accessory.filter(ele => !(ele.pid === goodsId && ele.functionType === functionType))
      this.$nextTick(function () {
        this.isOperRow = false
      })
    },
    addRow(index, { functionType, goodsId }) {
      this.isOperRow = true
      const newRow = createRow(functionType)
      const headNum = this.mergrRule1[index]
      
      this.classifyDetail.disposition.splice(headNum + index, 0, newRow)
      this.mergrRule1.splice(index, 1, headNum + 1, 0)
      this.$nextTick(function () {
        this.isOperRow = false
      })
    },
    caclSum(i) {
      let classifyDetail = JSON.parse(JSON.stringify(this.classifyDetail))
      let sum = 0
      const reduceFn = (a, b) => {
        const p = isNaN(b.unitPrice) ? 0 : b.unitPrice
        const n = isNaN(b.number) ? 0 : b.number
        return a + Math.round(p * n * 100) / 100
      }
      if (classifyDetail.disposition && classifyDetail.disposition.length > 0) {
        sum += classifyDetail.disposition.reduce(reduceFn, 0)
      }
      if (classifyDetail.accessory && classifyDetail.accessory.length > 0) {
        sum += classifyDetail.accessory.reduce(reduceFn, 0)
      }

      return sum.toFixed(2)
    },
    getGoodsOpt() {
      let sortList = []
      sortList = this.classifyDetail.disposition.map(e => e.sortId)

      sortList = uniq(sortList, false)

      sortList.map((sortId, index, arr) => {
        this.$nextTick(function () {
          sortId && this.getGoodsOptions(sortId, {}, false)
          if (index === arr.length - 1) {
            this.isRefreshTable = false
          }
        })
      })
    },
    // 补齐缺少的房间
    roomPolyfill(confList) {
      const roomList = this.roomList
      // 宽带不区分房间, 传入第一个房间作排序使用
      if (this.parentItem.sortName == '宽带') {
        if (confList && confList.length === 0) {
          confList.push(createRow(roomList[0]))
        }
        return
      }
      let _map = roomList.map(e => false)
      confList.forEach(c => {
        _map[roomList.indexOf(c.functionType)] = true
      })
      _map.forEach((m, i) => {
        if (!m) {
          confList.push(createRow(roomList[i]))
        }
      })
    },
  }
}