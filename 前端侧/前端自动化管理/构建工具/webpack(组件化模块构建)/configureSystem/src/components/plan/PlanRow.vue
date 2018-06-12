<template>
  <tr :class="{'error-row' : validation[0]}">
    <td width="150">
      <div class="my-select" @click="rowClick('sortSelect', data, ...rowIndex)">{{data.sortName}}
        <i class="my-select__icon"></i>
      </div>
    </td>
    <td width="250">
      <div class="my-select" @click="rowClick('goodsSelect', data, ...rowIndex)">{{data.goodsName}}
        <i class="my-select__icon"></i>
      </div>
    </td>
    <td width="100">{{data.unit | blank}}</td>
    <td width="100">{{data.unitPrice | blank}}</td>
    <td width="150" v-if="type === 2">
      <el-date-picker v-model="data.startDate" type="date" :editable="false" placeholder="请选择日期">
      </el-date-picker>
    </td>
    <td width="150" v-if="type === 2">
      <el-date-picker v-model="data.endDate" type="date" :editable="false" placeholder="请选择日期">
      </el-date-picker>
    </td>
    <td width="120" style="position: relative;" :class="{'error-number-item': validation[1]}">
      <el-input v-model.number="data.number" :placeholder="data.maxNumber?'最大数量 '+data.maxNumber:'请输入'"></el-input>
      <div class="error-number-tip">{{validation[1]}}</div>
    </td>
    <td width="120" v-if="type === 3">
      <el-input v-model="data.height" placeholder="请输入高度"></el-input>
    </td>
    <td width="120">
      <div class="my-select" @click="rowClick('sourceSelect', data, ...rowIndex)">{{data.priceSource}}
        <i class="my-select__icon"></i>
      </div>
    </td>
    <td width="120">
      <p class="typeControl">
        <a class="z-btn" @click="delRow">删行</a>
      </p>
    </td>
  </tr>
</template>  

<script>
// type 1 普通
// type 2 保洁
// type 3 家居

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
  name: 'PlanRow',
  props: {
    data: {
      type: Object,
      required: true
    },
    rowIndex: {
      type: Array,
      required: true
    },
    type: {
      type: Number,
      default: 1
    }
  },
  computed: {
    validation() {
      const v = rowValidator(this.data)
      if(!!v[0]) {
        this.$emit('validation-count-true')
      } else {
        this.$emit('validation-count-false')
      }
      return v
    }
  },
  methods: {
    rowClick(...args) {
      this.$emit('oper-row', args)
    },
    delRow() {
      this.$emit('del-row')
    }
  },
  updated() {
    console.log('updated')
  },
  created() {
    console.log('created')
  }
}
</script>

<style scoped>
.typeControl {
  text-align: center;
}
.error-number-tip {
  display: none;
  color: #ff4949;
  font-size: 12px;
  line-height: 1;
  padding-top: 4px;
  position: absolute;
  top: 33px;
  left: 27px;
  z-index: 1;
}
.error-number-item .error-number-tip {
  display: block;
}
.tableBox .modtable .error-row td {
  background-color: hsla(0, 87%, 69%, 0.1);
}
</style>
