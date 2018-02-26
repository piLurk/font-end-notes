const arr = [10, 20, 30];
const fn = () =>{
  let num = 10 ;
  let arguts = arguments;
  arguts.map( (item) => {
    num += item
  })
  return num++;
}
fn(90, ...arr)
