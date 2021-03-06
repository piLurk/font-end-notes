//冒泡排序

function bubbleSort(arr, fn = (a,b) => a - b) {
  let len = arr.length;
  for(let i = 0;i < len -1; i++) {
    for(let k = 0; k < len - i - 1; k++) {
      if(fn(arr[k], arr[k+1]) > 0) {
        [arr[k], arr[k+1]] = [arr[k+1], arr[k]]
      }
    }
  }
  return arr
}
var s = bubbleSort([140,25,1,2,58,12,36,96,5], (a, b) => a - b )
console.log(s)


// 选择排序
  // 主要思路是将找到最小值，将其放在第一位，接着找到第二小值，并放在第二位
  // 对于数组操作少
function selectSort(arr, fn = (a,b) => a - b) {
  let len = arr.length,
      index;
  for(let i = 0; i< len - 1; i++) {
    index = i;
    for(let k = i + 1; k < len; k++) {
      if(fn(arr[index],arr[k]) > 0) {
        index = k
      }
    }
    if(index !== i) {
      [ arr[index], arr[i] ] = [ arr[i], arr[index] ]
    }
  }
  return arr
}
var s = selectSort([140,25,1,2,58,12,36,96,5], (a, b) => b - a )
console.log(s)

// 插入排序

function insertSort(arr, fn = (a,b) => a - b) {
  let len = arr.length,
      j,temp;
  for(let i = 1; i<len; i++) {
    j = i;
    temp = arr[j];
    while( j > 0 && fn(arr[j - 1], temp) > 0) {
      arr[j] = arr[j - 1];
      j--;
    }
    arr[j] = temp; 
  }
  return arr
}
var s = insertSort([140,25,1,2,58,12,36,96,5], (a, b) => a - b )
console.log(s)

// 归并排序
function mergeSortRec (arr) {
  var len = arr.length;
  if(len === 1) {
    return arr
  }
  var mid = Math.floor(len / 2),
      left = arr.slice(0, mid),
      right = arr.slice(mid, len);
  return merge(mergeSortRec(left), mergeSortRec(right))
  function merge(left, right) {
    var result = [],
        il = 0,
        ir = 0;
    while(il < left.length && ir < right.length) {
      if(left[il] < right[ir]) {
        result.push(left[il++])
      } else {
        result.push(right[ir++])
      }
    }
    while(il < left.length) {
      result.push(left[il++])
    }
    while(ir < right.length) {
      result.push(right[ir++])
    }
    return result
  }
}


// 快速排序
  // 同样适用分治算法， 区别是快排是在划分阶段排序，
  //而归并是在 merge阶段排序


function quick(array, left, right) {
  var index;
  if(array.length > 1) {
    
    index = partition(array, left, right);

    if(left < index - 1) {
      quick(array, left, index - 1)
    }
    if(index < right) {
      quick(array, index, right)
    }

  }
}
function partition(array, left, right) {
  var pivot = array[ Math.floor( (left + right) /2 ) ],
      l = left,
      r = right;
  while(l <= r ) {

    while(array[l] < pivot) {
      l++;
    }
    while(array[r] > pivot) {
      r--;
    }
    if(l <= r) {
      [array[l], array[r]] =[array[r], array[l]];
      l++
      r--;
    }
  } 
  return l
}

var arr = [140,25,1,2,58,12,36,96,35, 35];
quick(arr, 0 , arr.length -1)
console.log(arr, 'a')

function mergeSortRec(array) {
  var len = array.length;
  if(len === 1) return array
  var mid = Math.floor(len / 2),
      left = array.slice(0, mid),
      right = array.slice(mid,len);

  return merge(mergeSortRec(left), mergeSortRec(right) );
  
}
function merge(left, right) {
  var result = [],
      l = 0,
      r = 0;

  while(l < left.length && r < right.length) {
    if(left[l] < right[r] ) {
      result.push(left[l++])
    } else {
      result.push(right[r++])
    }
  }
  while(l < left.length) {
    result.push(left[l++])
  }
  while(r < right.length) {
    result.push(right[r++])
  }
  return result
  
}

var s = mergeSortRec([140,25,1,2,58,12,36,96,5])
console.log(s, 'wa10')
