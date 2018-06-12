<template>
  <div class="modtable" width="100%" border="0" cellpadding="0" cellspacing="0" style="position: absolute;z-index: 1;" :style="style">
    <div class="select-wrap" v-show="choosedSelect === 'sortSelect'">
      <el-select ref="sortSelect" filterable size="small" filterable v-model="sortSelectModel" value-key="sortId" placeholder="请选择">
        <el-option v-for="sortOpt in _sortOptions" :key="sortOpt.sortId" :label="sortOpt.sortName" :value="sortOpt">
        </el-option>
      </el-select>
    </div>
    <div class="select-wrap" v-show="choosedSelect === 'goodsSelect'">
      <el-select ref="goodsSelect" filterable size="small" filterable v-model="goodsSelectModel" placeholder="请选择" @change="getGoodsDetail(value.goodsId)" @visible-change="getGoodsOptions(value.sortId)" :loading="!goodsOptionsMapFlag[value.sortId]" value-key="goodsId">
        <el-option v-for="goodsOpt in _goodsOptions" :key="goodsOpt.goodsId" :label="goodsOpt.goodsName" :value="goodsOpt">
        </el-option>
      </el-select>
    </div>
    <div class="select-wrap" v-show="choosedSelect === 'sourceSelect'">
      <el-select ref="sourceSelect" filterable v-model="value.priceSource" placeholder="请选择">
        <el-option v-for="(item, index) in costSourceOptions" :key="index" :value="item">
        </el-option>
      </el-select>
    </div>
  </div>
</template>


<script type="text/javascript">
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapActions } = createNamespacedHelpers('projectplan/createPlan')
import { priceSource } from '@/components/public/options.config'

import { getSortGoods } from '@/api/basicdatamgmt'
import { getGoodsAddition, getGoodsPriceDetail } from '@/api/projectplan'
export default {
  name: 'PlanEditRow',
  props: {
    value: {
      type: Object,
      default: function() {
        return {}
      }
    },
    choosedSelect: {
      type: String,
      default: ''
    },
    isOperRow: {
      type: Boolean,
      default: false
    },
    rowIndex: {
      type: Array
    },
    position: {
      type: Object,
      default: function() {
        return {}
      }
    },
    rowClass: {
      type: Array
    },
    sortOptions: {
      type: Array,
      default: function() {
        return []
      }
    },
    checkRepeat: Function,
    providerId: String
  },
  data() {
    return {
      _isOperRow: false,
      goodsOptionsMap: {},
      goodsOptionsMapFlag: {},
      goodsDetailMap: {},
      costSourceOptions: priceSource,
      BLANK2: { goodsName: '请选择', goodsId: '' }
    }
  },
  watch: {
    // value() {
    //   // this._isOperRow = true
    //   if (!this.isOperRow && this.choosedSelect && this.$refs[this.choosedSelect]) {
    //     this.$nextTick(function() {
    //       this.$refs[this.choosedSelect].handleFocus()
    //     })
    //   }
    //   // this.$nextTick(() => (this._isOperRow = false))
    // },
    choosedSelect() {
      if (this.choosedSelect && this.$refs[this.choosedSelect]) {
        this.$nextTick(function() {
          this.$refs[this.choosedSelect].handleFocus()
        })
      }
    }
  },
  computed: {
    ...mapGetters({
      providerIdMap: 'providerIdMap'
    }),
    style() {
      return {
        top: this.position.top + 'px',
        left: this.position.left + 'px',
        width: this.position.width + 'px'
      }
    },
    _sortOptions() {
      const _s = this.sortOptions.map(opt => ({
        sortId: opt.id,
        sortName: opt.sortName
      }))
      return [{ sortName: '请选择', sortId: '' }, ..._s]
    },
    _goodsOptions() {
      if (!this.goodsOptionsMapFlag[this.value.sortId]) {
        // return []
        return [{ goodsId: this.value.goodsId, goodsName: this.value.goodsName }]
      }
      const BLANK2 = { goodsName: '请选择', goodsId: '', unit: '', maxNumber: '' }
      const _m = this.goodsOptionsMap[this.value.sortId]
      return _m ? [BLANK2, ..._m] : [BLANK2]
    },
    sortSelectModel: {
      get: function() {
        return { sortId: this.value.sortId, sortName: this.value.sortName }
      },
      set: function(newValue) {
        let _value = Object.create(this.value)
        if (this.value.sortId !== newValue.sortId) {
          _value = Object.assign(this.value, {
            goodsId: '',
            goodsName: '请选择',
            unit: '',
            unitPrice: '',
            number: '',
            maxNumber: ''
          })
        }
        _value = Object.assign(_value, newValue)
        this.$emit('input', _value)
      }
    },

    goodsSelectModel: {
      get: function() {
        return {
          goodsId: this.value.goodsId,
          goodsName: this.value.goodsName,
          unit: this.value.unit,
          maxNumber: this.value.maxNumber
        }
      },
      set: function(newValue) {
        // this._isOperRow = true
        let _value = Object.assign({}, this.value)
        if (_value.goodsId === newValue.goodsId) return

        if (this.value.sortId !== newValue.sortId) {
          _value = Object.assign(this.value, {
            unitPrice: ''
          })
        }
        _value = Object.assign(_value, newValue)
        this.$emit('input', _value)
      }
    }
  },
  methods: {
    getGoodsOptions(classifyId) {
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
            const _opt = data.items
              ? data.items.filter(e => e.goodsIsUse === 1 && e.isExpired === 0 && e.proType === 0)
              : []
            const opt = _opt.map(item => ({
              goodsId: item.pkId,
              goodsName: item.goodsName,
              unit: item.goodsUnit,
              maxNumber: item.maxNumber
            }))
            this.$set(this.goodsOptionsMapFlag, classifyId, true)
            this.$set(this.goodsOptionsMap, classifyId, opt)
          }
        )
      }
    },
    addFunctionType(accessory, functionType) {
      return accessory.map(ele => ({ ...ele, functionType }))
    },
    getGoodsDetail(goodsId) {
      if (this.isOperRow || this._isOperRow) return

      let _value = Object.assign({}, this.value)

      if (this.checkRepeat(_value)) {
        // this._isOperRow = true
        _value.goodsId = ''
        _value.unit = ''
        _value.goodsName = ''
        _value.maxNumber = ''
        this._isOperRow = true
        this.$nextTick(function() {
          this._isOperRow = false
        })
        return this.$emit('input', _value)
      }
      if (!goodsId) {
        return
      }

      // 如果物品详情map里面有就直接取
      // 没有就分别查价格
      if (!this.goodsDetailMap[goodsId]) {
        this.$set(this.goodsDetailMap, goodsId, {})
        if (!this.providerId) {
          this.$message.warning('此分类没有供应商，无法获取价格')
          return
        }
        getGoodsPriceDetail(goodsId, this.providerId, data => {
          // this._isOperRow = true
          let _value = Object.assign({}, this.value)
          _value.unitPrice = data.cost
          this.$emit('input', _value)
          this._isOperRow = true
          this.$nextTick(function() {
            this._isOperRow = false
          })
          if (!data.cost && data.cost !== 0) {
            this.$message.warning('该物品没有价格')
          }
          this.$set(this.goodsDetailMap[goodsId], 'unitPrice', data.cost)
        })
        getGoodsAddition(_value.functionType, _value.goodsId, this.providerId, data => {
          data.forEach(ele => {
            ele.pid = goodsId
            ele.key = 'accessory'
            ele.priceSource = priceSource[0]
          })
          this.$set(this.goodsDetailMap[goodsId], 'addition', data)
          // this.addAddition(data, _value.functionType)
          this.$emit(
            'input',
            Object.assign({}, this.value, {
              accessory: this.addFunctionType(data, this.value.functionType)
            })
          )
        })
      } else {
        const data = this.goodsDetailMap[goodsId]
        let _value = Object.assign({}, this.value, {
          unitPrice: data.unitPrice,
          accessory: this.addFunctionType(data.addition, this.value.functionType)
        })
        // _value.unitPrice = data.unitPrice
        // _value.accessory = this.addFunctionType(data.addition, this.value.functionType)
        this.$emit('input', _value)
        this._isOperRow = true
        this.$nextTick(function() {
          this._isOperRow = false
        })
        // this.addAddition(data.addition, _value.functionType)
      }
    }
  },
  mounted() {
    // this.$on('input', function(){
    //   this.$nextTick(function(){
    //         this._isOperRow = false
    //       })
    // })
  }
}
</script>

<style>
.select-wrap {
  padding-left: 11px;
  padding-top: 2px;
}
.my-select {
  display: inline-block;
  position: relative;
  border-color: #dfe5e7;
  height: 33px;
  color: #333;
  background-color: #fff;
  padding: 3px 10px;
  padding-right: 35px;
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;
  padding-left: 12px;
  line-height: 26px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: none;
  border-radius: 3px;
  border: 1px solid #dfe5e7;
  font-size: inherit;
  outline: 0;
  overflow: hidden;
}
.my-select:hover {
  border-color: #3ba0ff;
  overflow: hidden;
}
.my-select__icon {
  font-family: element-icons !important;
  speak: none;
  font-style: normal;
  font-weight: 400;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  vertical-align: baseline;
  display: inline-block;
  -webkit-font-smoothing: antialiased;
  position: absolute;
  width: 35px;
  height: 100%;
  right: 0;
  top: 0;
  text-align: center;
  font-size: 12px;
  transition: transform 0.3s;
  -ms-transform: translateY(-50%) rotate(180deg);
  transform: translateY(-50%) rotateZ(180deg);
  line-height: 16px;
  top: 50%;
  cursor: pointer;
  color: #dfe5e7;
}
.my-select__icon:before {
  content: '\E607';
  border-bottom: 2px solid #333;
  border-right: 2px solid #333;
  content: '';
  display: inline-block;
  height: 5px;
  width: 5px;
  -webkit-transform: rotate(225deg);
  -ms-transform: rotate(225deg);
  transform: rotate(225deg);
}
.my-select__icon:after {
  content: '';
  height: 100%;
  width: 0;
  display: inline-block;
  vertical-align: middle;
}
</style>

