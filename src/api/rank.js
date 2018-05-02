import jsonp from "common/js/jsonp.js";
import common_param from "common/js/common_param";

export function rank_data(){
  let url = "https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg";
  let data = Object.assign({},common_param,{
    uin: 0,
    platform: "h5",
    needNewCode: 1
  });
  let option = {param: "jsonpCallback"};
  return jsonp(url,data,option);
}
