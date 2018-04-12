import common_param from "common/js/common.js";
import jsonp from "common/js/jsonp.js";
import axios from "axios";

export function slider_data(){
  let url = "https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg";
  let data = {};
  let option = {param: "jsonpCallback"};
  return jsonp(url,data,option);
};

export function songlist_data(){
  let data = Object.assign({},common_param,{
    sin: 0,//sin和ein表示选取歌单的数目.
    ein: 29,
    format: "json",
    categoryId: 10000000,
    sortId: 5,
  });
  return axios("/songlist",{
    params: data,
  }).then((res)=>{
    return Promise.resolve(res.data);
  }).catch((e)=>{
    console.log(e);
  });
}
