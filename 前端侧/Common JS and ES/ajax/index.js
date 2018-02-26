
document.getElementById('req').onclick = function(){
  ajax({
    action:'http://thoa.jiangroom.com/employeeInfo/queryUserInfos.json',
    method:'post',
    async:true,
    data:{
      pageSize:10,
      pageIndex:1
    },
    onError:(e) =>{
      console.error(e)
    },
    onSuccess: (e) =>{
      
    }
  }) 
}