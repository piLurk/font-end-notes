

function bind(fn,target){
  return function(){
    return fn.apply(target,...arguments)
  }
}

function quick(array, left, right) {
  var index;

  if(array.length > 1) {
    index = partition(array, left, right);

    if(left < index - 1) {
      quick(array, left, index - 1);
    }

    if(index < right) {
      quick(array, index, right);
    }
  }
}

function partition(array, left, right) {
  var pivot = array[Math.floor(( right + left ) / 2)],
      i = left,
      j = right;
  while(i <= j) {
    while(array[i] < pivot) {
      i++;
    }
    while(array[j] > pivot) {
      j--;
    }
    if(i<=j) {
      [array[i] , array[j]] = [array[j] , array[i]];
      i++;
      j--;
    }
  }
  return i;
}

function swapQuickStort(array, index1, index2) {
  var aux = array[index1];
  array[index2] = aux;
}
function ArraySort () {
  if(this instanceof ArraySort !== true) {
    return new ArraySort(...arguments);
  }
  this.array = [];
  this.getArray = function(size = 10) {
    
    return this.array && this.array.length && this.array.length > 0 ? 
      this.array
      :
      this.createReverseArray(size).array;
  }
  this.insert = function(item) {
    this.array.push(item)
  }
  this.toString = function() { 
    return this.array.join();
  }

  
  // 冒泡排序
  // O(n²)
  this.bubbleSort = function () {
    var array = this.getArray();
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

  //选择排序,时间复杂度（O(n²)） ,要更优化一点，对于数组操作更少
  this.selectonSort = function() {
    var array = this.getArray();
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

  //插入排序（ 将array[i]插入i-1之前合适位置）--合适于小数组，更优化
  this.insertionSort = function() {
    var array = this.getArray();
    var len = array.length;
    for(let i = 1; i< len; i++) {
      j = i;
      temp = array[ i ];
      while( j > 0 && array[j-1] > temp) {
        array[j] = array[j - 1];
        j--;
      }
      array[j] = temp;
    }
    return this;
  }

  //并归排序(O(nlogn)),除了firefox使用并归排序实现sort方法  --分治算法

  this.mergeSortRec = function mergeSortRec(array) {
    var len = array.length;
    if(len === 1) {
      return array
    }
    var mid = Math.floor(len / 2),
        left = array.slice(0, mid),
        right = array.slice(mid, len);
      return merge(mergeSortRec(left), mergeSortRec(right) ) ;

    
    function merge(left, right) {
      var result = [],
          il = 0,
          ir = 0;
      while(il < left.length && ir < right.length) {
        if(left[il] < right[ir]) {
          result.push(left[ il++ ]);
        } else {
          result.push(right[ ir++ ]);
        }
      }
      while(il < left.length) {
        result.push(left[il++])
      }

      while(ir < right.length) {
        result.push(right[ir++])
      }
      return  result;
    }
  }

  // 快速排序(O(nlogn)),性能更好。也使用分治算法
  this.quickSort = function( array = this.getArray() ) {
    quick(array, 0, array.length - 1);
  }


}

ArraySort.prototype.createReverseArray = function(size) {
  var array = [];
  for(let i = size; i > 0; i--) {
    array.push(i);
  }
  this.array = array;
  return this;
}
ArraySort.prototype.createRandomArray = function(size) {
  var array = [];
  for(let i = 0; i < size; i++){
    var num = Math.floor(Math.random() * 10);
    array.push(num);
  }
  this.array = array;
  return this;
}

var str_1 = ArraySort().selectonSort().toString();

var str_2 = ArraySort().insertionSort().toString();

var arr = ArraySort().createRandomArray(10).array;
//var str_3 = ArraySort().mergeSortRec(arr);

 var str_4 =  ArraySort().quickSort(arr);
console.log(arr);







