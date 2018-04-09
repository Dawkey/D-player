import origin_jsonp from "jsonp";

//jsonp函数接受3个参数:
//url:基本的url地址(字符串)
//data:需要通过Get传递的信息(对象)
//option: origin_jsonp需要的包含配置信息的关键对象,主要需要一个关键属性param用来指定后端
//        的callback函数名.(对象)(形如{param: "callback",})(并不一定是callback.)
export default function jsonp(url,data,option){
  url = url + (url.indexOf("?") < 0 ?"?" :"&") + data_url(data);

  return new Promise((resolve,reject)=>{

    //jsonp模块所引入的origin_jsonp第三个参数是一个函数参数fn(),如果在一定时间内浏览器
    //取得了数据,它会执行fn(null,data),否则它会执行fn(new Error('Timeout')).
    //所以这里我们fn()的两个参数,如果!err == true(!null == true),就表示数据取得成功,
    //否则说明失败,执行reject(err).
    origin_jsonp(url,option,(err,res_data)=>{
      if(!err){
        resolve(res_data);
      }else{
        reject(err);
      }
    });
  });
}

function data_url(data){
  let url = "";
  if(typeof data == "object"){
    for(var key in data){
      url = url + "&" +`${key}=${encodeURIComponent(data[key])}`;
    }
    return url ?url.substring(1) :url;
  }else{
    throw new Error("data_url参数请输入字符串");
  }
}
