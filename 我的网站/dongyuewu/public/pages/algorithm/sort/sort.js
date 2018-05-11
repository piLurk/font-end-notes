
// 冒泡排序
  // O(n²)
function bubbleSort(arr) {
  let len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        // 相邻元素两两对比
        [arr[j+1], arr[j]] = [arr[j], arr[j+1]];
      }
    }
  }
  return arr;
}







