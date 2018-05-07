
// filter
    //去重的一种实现
    function unique1(arr) {
        return arr.filter(function(ele, index, array) {
            return array.indexOf(ele) === index
        })
      }
  
  // map
  [10,20,30,40].map(function(item, index, arr){
      return item * 2
  }, {name:'tom'} )
  
  
  // reduce  数组聚合
      // map + reduce
      const numbers = [10,20,30,40]
      const doubleOver50 = numbers.reduce( (finalList, num) => {
          num *= 2;
          if(num > 50) {
              finalList.push(num)
          }
          return finalList
      }, [])
      // map
      function map(arr, cb, thisArg) {
          return arr.reduce(function(res, item, index, arr){
              var newItem = cb.call(thisArg, item, index, arr)
              res.push(newItem);
              return res
          }, [])
      }
      // filter
      function filter(arr, cb, thisArg) {
          return arr.reduce((res, item, index, arr) => {
              if(cb.call(thisArg, item, index, arr)) {
                  res.push(item)
              }
              return res
          }, [])
      }
      // 字符关联匹配（ 如字符串中括号是否匹配 ）
      const isParensBalanced = (str ) => {
          return str.split('').reduce( (counter, chart, index, arr) => {
              if(counter < 0) {
                  return counter
              }else if( chart === '(') {
                  return ++counter
              }else if( chart === ')') {
                  return --counter
              }
              return counter
          }, 0) 
      }
      // 计算数组中元素出现次数
      var names = ['tom', 'tom', 'alice', 'bruce', 'wu']
      var countNames = names.reduce( (obj, item, index, arr) => {
          if(item in obj) {
              obj[item]++;
          }else {
              obj[item] = 1;
          }
          return obj
      }, {})
      console.log(countNames)
  
      // 解构 -- 将多层对象中一些属性放到一个数组中去
      var data = [
          {
              item1:[{name:'tom1'},{name:'gg1'}],
              children:{
                  name:'children1',
                  item2:[{name:'hehe1'},{name:'gaga1'}]
              }
          },
          {
              item1:[{name:'tom2'},{name:'gg2'}],
              children:{
                  name:'children2',
                  item2:[{name:'hehe2'},{name:'gaga2'}]
              }
          }
      ]
      var data2 = data.reduce( (res, item, index, arr) => {
          return [...res, item.item1, item.children.item2]
      }, [])
      console.log(data2);
  
  // indexOf
  ['a','b','c'].indexOf('b')  // 1
  
  
  // fill
  var arr = [1,2,3,4];
  arr.fill('test',2,5);

  // splice

  
  // 数组与set集合
      // 去重的一种实现
      function unique2(arr){
          return [...new Set(arr)]
        }
  
  // 数组与 变量值交换
      let a = 2, b = 20;
      [a, b] = [b, a]
  
  
  
  function bind(fn, context) {
      return function(){
          fn.apply(context, arguments)
      }
  }
  
  
  
  
  
  