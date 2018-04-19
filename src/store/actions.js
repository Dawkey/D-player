import * as types from "./mutation-types";
import get_song_vkey from "api/song_vkey";

//action 函数第一个参数是一个context对象,它是一个commit,state等属性的对象,这里用到了es6的参数解构
export function set_player({commit,state},{list,index}){
  commit(types.set_play_order_list,list);
  if(state.play_mode == 2){
    return;
  }else{
    commit(types.set_play_list,list);
  }
  commit(types.set_play_index,index);
  commit(types.set_full_screen,true);
  commit(types.set_playing,true);
};

export function set_song_audio({commit,getters}){
  let song = getters.play_song;
  get_song_vkey(song.id).then((res)=>{
    if(res.code == 0){
      let data = res.data.items[0];
      let filename = data.filename;
      let vkey = data.vkey;
      let audio = `http://dl.stream.qqmusic.qq.com/${filename}?vkey=${vkey}&guid=5705112900&uin=0&fromtag=66`;
      commit(types.set_play_audio,audio);
    }
  });
}
