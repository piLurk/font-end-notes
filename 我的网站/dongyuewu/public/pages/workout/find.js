
// 二分查找

function binarySearch(arr, target) {
  var start = 0,
      end = arr.length - 1;

  while(start <= end) {
    let mid = Math.floor( (start + end) / 2);
    if(target === arr[mid]) {
      return mid
    } else if(target > arr[mid]) {
      start = mid +1
    } else {
      end = mid -1
    }
  }
  return -1
}
var s = binarySearch([10,25,6,8,1,2,0,58,569,5], 58)