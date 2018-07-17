
// 回文测试
function testNum () {
  var arr = str.split('');
  return str === arr.reverse().join('')
}

// sleep
function Man(name) {
  let args = arguments;
  if(new.target !== Man) return new Man(...args)

  console.log(`hi ${name}`)
  this.promise = Promise.resolve('');
  this.flag = false;
}


Man.prototype = {
  sleep(time) {
    
    this.promise.then( () => {
      if(this.flag) return
      this.promise = new Promise((resolve) => {
        setTimeout( () => {
          resolve('aaaa')
        }, time)
      })
    })
    return this
  },
  eat(something) {
    let prePromise = this.promise;


    this.promise.then( () => {
      if(this.promise !== prePromise) {
        this.promise.then( () => {
          console.log(`eat ${something}`)
        })
      } else {
        console.log(`eat ${something}`)
      }
      
    })

    return this
  },
  stop(time) {
    // 这里有问题， flag在输出时判定很low
    this.promise.then(() => {
      setTimeout( () => {
        this.flag = false;

      }, time)
    })
    
    return this
  }
}