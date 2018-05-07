export const singer = state => state.singer;

export const songlist = state => state.songlist;

export const rank = state => state.rank;

export const songlist_id = state => state.songlist_id;

export const playing = state => state.playing;

export const full_screen = state => state.full_screen;

export const play_mode = state => state.play_mode;

export const play_list = state => state.play_list;

export const play_order_list = state => state.play_order_list;

export const play_index = state => state.play_index;

export const play_song = (state) => {
  return state.play_list[state.play_index] || {};
};

export const play_songlist_id = state => state.play_songlist_id;

export const play_first = state => state.play_first;


export const play_order_index = (state) => {
  if(state.play_mode === 2){
    let id = state.play_list[state.play_index].id;
    let index = state.play_order_list.findIndex((song)=>{
      return song.id === id;
    });
    return index;
  }else{
    return state.play_index;
  }
}
