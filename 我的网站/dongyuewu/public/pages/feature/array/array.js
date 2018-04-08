
// filter
    //去重的一种实现
    function unique1(arr) {
      return arr.filter(function(ele, index, array) {
          return array.indexOf(ele) === index
      })
    }


// indexOf
['a','b','c'].indexOf('b')  // 1


// fill
var arr = [1,2,3,4];
arr.fill('test',2,5)


// 数组与set集合
    // 去重的一种实现
    function unique2(arr){
      return [...new Set(arr)]
    }
