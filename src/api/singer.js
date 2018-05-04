import common_param from "common/js/common_param.js";
import jsonp from "common/js/jsonp.js";

export function singer_data(key){
  let key_obj = {key};
  let url = "https://c.y.qq.com/v8/fcg-bin/v8.fcg";
  let data = Object.assign({},common_param,key_obj,{
    pagenum: 1,
    pagesize: 100,
    format: "jsonp",
    channel: "singer",
    page: "list",
  });
  let option = {param: "jsonpCallback"};
  return jsonp(url,data,option);
}
