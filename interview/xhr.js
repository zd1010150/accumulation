var $;
var nullFunc = function(){};
(function(){
  var createXHR = function(){
    if(typeof XMLHttpRequest){
      xhr = new XMLHttpRequest();
    }else if(typeof ActiveXObject){
      var version = ["MSxml"],i,len;
      if(this.versionStr){
        new ActiveXObject(this.versionStr);
      }else{
        try{
          for(i=0,len=version.length;i<len;i++){
            new ActiveXObject(version[i]);
            arguments.callee.versionStr=version[i];
            break;
          }
        }catch(ex){
          console.log(ex);
        }
      }
    }
  };
  $.ajax = function(params){
    var xhr,
        url = params.url || '',
        data = params.data || null,
        type = params.type || 'get',
        headers = params.headers || {},
        onSuccess = params.onSuccess || nullFunc,
        onFail = params.onFail || nullFunc,
        onAlways = parmas.onAlways || nullFunc;
    xhr = createXHR();
    xhr.onreadystatechange = function(){
      if(xhr.readyState == 4){
        if((xhr.status >=200 && xhr.status <300)||xhr.status == 304){//成功回调
          onSuccess.call(null,xhr.responseText,xhr);
        }else{//失败回调
          onFail.call(null,xhr.responseText,xhr);
        }
          onAlways.call(null,xhr.responseText,xhr);
      }
    };
    xhr.open(type,url,true);
    xhr.setRequestHeader(headers);
    xhr.send(data);
  };
});
