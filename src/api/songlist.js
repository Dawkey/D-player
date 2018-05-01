import common_param from "common/js/common_param.js";
import axios from "axios";

export function songlist_data(sin,ein){
  let num_obj = {sin,ein};//sin和ein表示选取歌单的数目.
  let data = Object.assign({},common_param,num_obj,{
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
};
