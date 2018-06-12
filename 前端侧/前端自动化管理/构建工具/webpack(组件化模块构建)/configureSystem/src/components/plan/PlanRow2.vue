<template>
  <tr :class="{'error-row' : validation[0]}">
    <td>{{data.sortName}}</td>
    <td>{{data.goodsName}}</td>
    <td>{{data.parentName}}</td>
    <td>{{data.unit | blank}}</td>
    <td>{{data.unitPrice | blank}}</td>
    <td style="position: relative;" :class="{'error-number-item': validation[1]}">
      <el-input v-model="data.number" :placeholder="data.maxNumber?'最大数量 '+data.maxNumber:'请输入'"></el-input>
      <div class="error-number-tip">{{validation[1]}}</div>
    </td>
    <td>
      <el-select filterable v-model="data.priceSource" placeholder="请选择">
        <el-option v-for="(item, index) in priceSource" :key="index" :value="item">
        </el-option>
      </el-select>
    </td>
  </tr>
</template>  

<script>
import { priceSource } from '@/components/public/options.config'


// 检查数据完整性
const checkIntegrity = ele =>
  ((ele.unitPrice || ele.unitPrice === 0) &&
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
  name: 'PlanRow2',
  props: {
    data: {
      type: Object,
      required: true
    },
    rowIndex: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      priceSource
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
