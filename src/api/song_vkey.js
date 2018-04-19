import common_param from "common/js/common_param.js";
import jsonp from "common/js/jsonp.js";

export default function get_song_vkey(id){
  let song_mid = {
    songmid: id,
    filename: `C400${id}.m4a`
  };

  let url = "https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg";
  let data = Object.assign({},common_param,song_mid,{
    fomat: "jsonp",
    uin: 0,
    cid: 205361747,
    guid: 5705112900
  });
  let option = {param: "callback"};//qq音乐源的jsonp用的是"callback".....
  return jsonp(url,data,option);

};
