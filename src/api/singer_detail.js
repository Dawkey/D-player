import jsonp from "common/js/jsonp";
import common_param from "common/js/common_param";

export function singer_detail_data(id){
  let singer_mid = {singermid: id};

  let url = "https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg";
  let data = Object.assign({},common_param,singer_mid,{
    begin: 0,
    num: 50,
    format: "jsonp",
    order: "listen",
    songstatus: 1,
  });
  let option = {param: "jsonpCallback"};
  return jsonp(url,data,option);
}
