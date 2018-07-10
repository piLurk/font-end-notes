
// 无序，不想等数组，取 N 求和 M

function getCombBySum (arr, num, total) {
  let getCombination = function(arr, num) {
    var r=[];
    (function f(t,a,n)
    {
        if (n==0)
        {
            return r.push(t);
        }
        for (var i=0,l=a.length; i<=l-n; i++)
        {
            f(t.concat(a[i]), a.slice(i+1), n-1);
        }
    })([],arr,num);
    return r;
  }


  var allCombition = getCombination(arr, num);

  var r = allCombition.filter( ( itemArr ) => {
    let t = 0;
    itemArr.map( i => {
      t += i
    })
    return t === total
  })
  var indexs = r.map( itemArr => {
    return itemArr.map( item => {
      return arr.findIndex((i) => i === item)
    })
  })
  return {
    result: r,
    indexs
  }
}
var a = getCombBySum([1,2,3,4,5,6,7,10,11], 3, 15);
console.log(a)