// 函数节流

function throttle(fn, await = 100) {
  let _fn = fn,
      timer,
      flag = true;

  return function() {
    var self = this,
        args = arguments;
    
    if(flag) {
      //第一次执行
      _fn.apply(this,args);
      flag = false;
      return flag;
    }

    if(timer) {
      return false
    }
    timer = setTimeout(() => {
      clearTimeout(timer);
      timer = null;
      _fn.apply(self,args)
    }, await)

  }
}

//防抖

function debounce(fn , await) {
  let _fn = fn,
      timer;
  return function() {
    let args = arguments;
    clearTimeout(timer)
    timer = setTimeout( () => {
      _fn.apply(this, args)
    }, await)
  }
}
