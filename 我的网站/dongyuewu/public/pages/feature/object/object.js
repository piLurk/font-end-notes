// 对象解构
    //除开部分获取
    const obj = {name:'tom', year: 17, love:'myself', like:'man'}
    const {name,like, ...otherItems} = obj
    console.log(otherItems)