
async function getFullPost() {
  return await Promise.all([
    fetch('/getJson/test1'),
    fetch('/getJson/test2')
  ])
}
getFullPost().then((r) => {
  [a,b] = r ;
  console.log(a)
})

