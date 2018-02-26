
function getError(action, option, xhr) {
  let msg;
  if(xhr.response){
    msg = `${xhr.status} ${xhr.response.error || xhr.response}`;
  }else if(xhr.responseText){
    msg = `${xhr.status} ${xhr.responseText}`
  }else{
    msg = `fail to request ${action} ${xhr.status}`
  }
}

function getBody(xhr) {
  const text = xhr.responseText || xhr.response;
  if(!text){
    return text 
  }
  try{
    return JSON.parse(text);
  }catch (e) {
    return text;
  }
}
var ajax = function upload(option){
  if(XMLHttpRequest === 'undefined'){
    return;
  }
  var async;
  const xhr = new XMLHttpRequest();
  const action = option.action;
  async = typeof option.async === "boolean"? option.async : true;

  const formData = new FormData();
  if(option.data){
    Object.keys(option.data).map( key => {
      formData.append(key, option.data[key]);
    });
  }
  
  xhr.onerror = function error(e) {
    option.onError(e);
  }
  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4){
      if(xhr.status >= 200 && xhr.status < 300 && xhr.response.code === 200){
        return option.onError(getError(action, option, xhr));
      }else{
        return option.onSuccess(getBody(xhr))
      }
    }
    
  }


  xhr.open('post' || option.method, action, async);
  
  if(option.withCredentials && 'withCredentials' in xhr){
    xhr.withCredentials = true;
  }
  const headers = option.headers || {};
  for(let  item in headers) {
    if(headers.hasOwnProperty(item) && headers[item] !== null) {
      xhr.setRequestHeader(item, headers[item])
    }
  }
  xhr.send(formData);
  return xhr
}