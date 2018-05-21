
import lodash from 'lodash';
console.log(lodash.add)
export default function() {
  console.log('m.js文件');
  var add = lodash.add(1,2);
  console.log(add)
}