
// 二分查找，(有序数组中搜索数字，前提是数组为有序数组)
  // O(n)
function binarySearch(arr, target) {
  let start = 0;
  let end = arr.length - 1;

  while(start <= end){
    let mid = parseInt(start + (end - start)/2);
    if(target === arr[mid]) {
      return mid
    }else if(target > arr[mid]) {
      start = mid + 1;
    }else{
      end = mid - 1;
    }
  }
  return false
}

// 无序数组
// O(n)复杂度
function search(arr, target) {
  let index = -1;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      index = i;
    }
  }
  return index;
}
