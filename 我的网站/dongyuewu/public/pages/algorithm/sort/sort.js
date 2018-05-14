


function createNonSortedArray(size) {
  var array = new arrayList();
  for(let i = size; i > 0; i--) {
    array.insert(i);
  }
  return array;
}
function arrayList () {
  var array = [];
  this.insert = function(item) {
    array.push(item)
  }

  this.toString = function() {
    return array.join();
  }

  
  // 冒泡排序
  // O(n²)
  this.bubbleSort = function () {
    let len = array.length;
    for (let i = 0; i < len - 1; i++) {
      for (let j = 0; j < len - 1 - i; j++) {
        if (array[j] > array[j + 1]) {
          // 相邻元素两两对比
          [array[j+1], array[j]] = [array[j], array[j+1]];
        }
      }
    }
    return this;
  }

  //选择排序,时间复杂度（O(n²)）
  this.selectonSort = function() {
    var len = array.length,
        indexMin;
    for(var i = 0; i<len -1; i++) {
      indexMin = i;
      for(var j = i + 1; j<len; j++) {
        if(array[indexMin] > array[j]) {
          indexMin = j;
        }
      }
      if( i !== indexMin ) {
        
        [array[i], array[indexMin]] = [array[indexMin], array[i]]
      }
    }
    return this;
  }
}

var str = createNonSortedArray(10).selectonSort().toString()

console.log(str);







