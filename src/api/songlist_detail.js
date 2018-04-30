import common_param from "common/js/common_param.js";
import axios from "axios";

export function songlist_detail_data(id){
  let song_id = {disstid: id};
  let data = Object.assign({},common_param,song_id,{
    format: "json",
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
  });
  return axios("/songlist_detail",{
    params: data,
  }).then((res)=>{
    return Promise.resolve(res.data);
  }).catch((e)=>{
    console.log(e);
  });
}
