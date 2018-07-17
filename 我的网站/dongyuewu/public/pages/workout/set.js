
// 交集(去重)

function interSet(a, b) {
  let setA = new Set(a),
      setB = new Set(b);
  return [...new Set([...setA].filter( x => setB.has(x)))]
}