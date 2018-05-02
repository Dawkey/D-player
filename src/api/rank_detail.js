import jsonp from "common/js/jsonp";
import common_param from "common/js/common_param";

export function rank_detail_data(id){
  let rank_topid = {topid: id};

  let url = "https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg";
  let data = Object.assign({},common_param,rank_topid,{
    uin: 0,
    tpl: 3,
    needNewCode: 1,
    type: "top",
    page: "detail",
    platform: "h5",
  });
  let option = {param: "jsonpCallback"};
  return jsonp(url,data,option);
}
