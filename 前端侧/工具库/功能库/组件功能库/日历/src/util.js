//全局配置文件

function getConfig() {
    return require('../config.json');
}

function getHost() {
    return getConfig().host
}
export default{
  install(Vue,options)
  {
    var token = location.search.split("=")[1];
    token=!!token?token:'';
    Vue.prototype.getAjax = function (hostip,url,data) {
    	return  $.ajax({
		            url:hostip+url,
		            type:'post',
		            data : data,
                headers:{'sessionId':token}

		    	});
    },
    Vue.prototype.host = getHost();
  }
}