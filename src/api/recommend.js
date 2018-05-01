import jsonp from "common/js/jsonp.js";

export function slider_data(){
  let url = "https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg";
  let data = {};
  let option = {param: "jsonpCallback"};
  return jsonp(url,data,option);
};
