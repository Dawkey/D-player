import common_param from "common/js/common.js";
import jsonp from "common/js/jsonp.js";

export function singer_data(){
  let url = "https://c.y.qq.com/v8/fcg-bin/v8.fcg";
  let data = Object.assign({},common_param,{
    channel: "singer",
    page: "list",
    key: "all_all_all",
    pagesize: 100,
    pagenum: 1,
    format: "jsonp",
  });
  let option = {param: "jsonpCallback"};
  return jsonp(url,data,option);
}
