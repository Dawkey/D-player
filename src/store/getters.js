export const singer = state => state.singer;

export const songlist = state => state.songlist;

export const rank = state => state.rank;

export const playing = state => state.playing;

export const full_screen = state => state.full_screen;

export const play_mode = state => state.play_mode;

export const play_list = state => state.play_list;

export const play_order_list = state => state.play_order_list;

export const play_index = state => state.play_index;

export const play_song = (state) => {
  return state.play_list[state.play_index] || {};
};
