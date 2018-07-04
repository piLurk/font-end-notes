
export const isRequired = (rule, value, cb) => {
  if(value === '') {
    return cb(new Error('输入不能为空'))
  }
  cb()
};

export const isMax = (max) => {
  return (rule, value, cb) => {
    if(value === '') {
      return cb(new Error('输入不能为空'))
    }else if(value.length > max) {
      return cb(new Error(`输入字符不能超过${max}个`))
    }
    cb()
  }
}
export const isLength = (length) => {
  return (rule, value, cb) => {
    if(value === '') {
      return cb(new Error('输入不能为空'))
    }else if(value.length !== length) {
      return cb(new Error(`输入字符必须为${length}个`))
    }
    cb()
  } 
}

export const checkboxRequired = (rule, value, cb) => {
  if(value.length === 0) {
    return cb(new Error('必须勾选一项！'))
  }
  cb()
};