const toFixed2 = /^\s?\d+(\.\d{0,2})?$/
const num = /[^\.\d\s]/
const int = /^\d+$/



// 小数位数不能大于两位
export const numToFixed2 = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('输入不能为空'))
  } else if (num.test(value)) {
    callback(new Error('请输入数字'))
  } else if (value < 0) {
    callback(new Error('数值不能小于 0'))
  } else if (!toFixed2.test(value)) {
    callback(new Error('小数位数不能超过 2'))
  } else {
    callback()
  }
}


export const intNum = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('输入不能为空'))
  } else if (!int.test(value)) {
    callback(new Error('请输入整数'))
  } else if (value < 0) {
    callback(new Error('数值不能小于 0'))
  } else {
    callback()
  }
}

export const intNum2 = (rule, value, callback) => {
  if (!int.test(value)) {
    callback(new Error('请输入整数'))
  } else if (value < 0) {
    callback(new Error('数值不能小于 0'))
  } else {
    callback()
  }
}