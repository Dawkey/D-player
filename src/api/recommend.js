import jsonp from "common/js/jsonp.js";

const slider_data = () => {
  let url = "https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg";
  let data = {};
  let option = {param: "jsonpCallback"};
  return jsonp(url,data,option);
};

export {slider_data};
