import * as types from "./mutation-types";

const mutation = {
  [types.set_singer](state,singer){
    state.singer = singer;
  },
  [types.set_playing](state,flag){
    state.playing = flag;
  },
  [types.set_full_screen](state,flag){
    state.full_screen = flag;
  },
  [types.set_play_mode](state,mode){
    state.play_mode = mode;
  },
  [types.set_play_list](state,list){
    state.play_list = list;
  },
  [types.set_play_order_list](state,play_order_list){
    state.play_order_list = play_order_list;
  },
  [types.set_play_index](state,index){
    state.play_index = index;
  },
  [types.set_play_audio](state,audio){
    state.play_list[state.play_index].audio = audio;
  },
  [types.set_play_lyric](state,lyric){
    state.play_list[state.play_index].lyric = lyric;
  }
};

export default mutation;
