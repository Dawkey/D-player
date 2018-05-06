import * as types from "./mutation-types";
import get_song_vkey from "api/song_vkey";
import {shuffle} from "common/js/common_function";

//action 函数第一个参数是一个context对象,它是一个commit,state等属性的对象,这里用到了es6的参数解构
export function set_player({commit,state},{list,index}){
  let list_copy = list.slice();
  commit(types.set_play_order_list,list_copy);
  let _list = state.play_order_list.slice();
  let flag = state.songlist_id === state.play_songlist_id;
  if(state.play_mode === 2){
    commit(types.set_play_list,shuffle(_list));
    index = state.play_list.findIndex((new_song)=>{
      return new_song.id === _list[index].id;
    });
  }else{
    commit(types.set_play_list,_list);
  }
  commit(types.set_play_songlist_id,state.songlist_id);
  commit(types.set_play_index,index);
  if(!flag){
    commit(types.set_full_screen,true);
  }
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
};

export function playerlist_select({commit,state},index){
  let id = state.play_order_list[index].id;
  if(state.play_mode === 2){
    index = state.play_list.findIndex((song)=>{
      return song.id === id;
    });
  }
  commit(types.set_play_index,index);
  commit(types.set_playing,true);
};

export function playerlist_delete({commit,state},index){
  let id = state.play_order_list[index].id;
  let current_index = state.play_index;
  let order_index = index;
  if(state.play_mode === 2){
    index = state.play_list.findIndex((song)=>{
      return song.id === id;
    });
  }
  commit(types.delete_play_song,{index,order_index});
  if(current_index == index){
    let next_index = index == state.play_list.length - 1 ? 0 : index;
    commit(types.set_play_index,next_index);
  }else if(current_index > index){
    current_index = current_index - 1;
    commit(types.set_play_index,current_index);
  }
}
