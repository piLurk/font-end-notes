
// 拼图算法

function getFullArr (pArr, blockArr) {
  var xLength = blockArr[0],
      yLength = blockArr[1];
  
  function getXblockArr(xArr) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
    var r = [];

    var tree = function(leafs) {
      var branches = []; 
      if( leafs.length == 1 ) return leafs; 
      for( var leaf in leafs ) {
        var leaf = leafs[k];
        tree(leafs.join('').replace(leaf,'').split('')).concat("").map(function(subtree) {
        branches.push([leaf].concat(subtree));
        });
      }
      return branches;
    };
    console.log(tree("abc".split('')).map(function(str){return str.join('')}))

    // if( xArr[0] < xLength ) 
    function merge(okArr, restArr) {

    }

  }

}
var pArr =[[1,2],[5,5],[15,56]];
var blockArr = [100,100];
//getFullArr(pArr, blockArr )

var flag = false;

  setTimeout(() => {
    flag = true;
  }, 5000)
  var aaa = 0;
var tree = function(leafs) {
  //console.log(leafs)
   
  var branches = [];
  if( leafs.length === 1 ) return leafs;
  for( var k in leafs ) {
    // console.log(k, leafs)
    var leaf = leafs[k];
    tree(leafs.slice(k, 1))
      .concat("").map(function(subtree) {
      
      console.log('wa',leaf, subtree)
      branches.push([leaf].concat([subtree]));
    });
  }
  
  return branches;
 };
 console.log('babababa',tree([ [1,2],[10,11], [25,11] ]))


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