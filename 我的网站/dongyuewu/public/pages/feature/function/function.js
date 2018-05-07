// 函数节流
function throttle(fn, wait) {
  var _fn = fn,
      timer,
      flags = true;

  return function() {
    var self = this;
        args = arguments;
    if(flags) {
      _fn.apply(this, args);
      flags = false;
      return flags;
    }
    if(timer) {
      return false
    }

    timer = setTimeout(() => {
      clearTimeout(timer);
      timer = null;
      _fn.apply(self, args)
    }, wait);

  }
}

// 分段处理

function timeChunk(data, fn, count = 1, wait) {
  let obj, timer;
  function start() {
    let len = Math.max(count, data.length);
    for(let i = 0; i < len; i++) {
      var item = data.shift();
      fn(item);
    }
  }

  return function() {
    timer = setInterval( function() {
      if(data.length === 0) {
        return clearInterval(timer);
      }
      start();
    }, wait)
  }
}
  