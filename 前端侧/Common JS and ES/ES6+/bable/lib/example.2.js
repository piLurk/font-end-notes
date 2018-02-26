"use strict";

var _arguments = arguments;
var arr = [10, 20, 30];
var fn = function fn() {
  var num = 10;
  var arguts = _arguments;
  arguts.map(function (item) {
    num += item;
  });
  return num++;
};
fn.apply(undefined, [90].concat(arr));