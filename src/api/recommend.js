import jsonp from "common/js/jsonp.js";
import axios from "axios";

export function slider_data(){
  let url = "https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg";
  let data = {};
  let option = {param: "jsonpCallback"};
  return jsonp(url,data,option);
};

export function songlist_data(){
  let data = {
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    inCharset: "utf-8",
    outCharset: "utf-8",
    notice: 0,
    platform: "yqq",
    needNewCode: 0,
    categoryId: 10000000,
    sortId: 5,
    sin: 0,
    ein: 29,
    format: "json",
  };
  return axios("/songlist",{
    params: data,
  }).then((res)=>{
    return Promise.resolve(res.data);
  }).catch((e)=>{
    console.log(e);
  });
}
