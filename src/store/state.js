const state = {
  singer: {},
  songlist: {},
  rank: {},
  songlist_id: "",//标记当前点进去的songlist
  playing: false,
  full_screen: true,
  play_mode: 0,//play_mode表示播放模式,0--顺序播放,1--单曲循环,2--随机播放
  play_list: [],
  play_order_list: [],
  play_index: -1,
  play_songlist_id: "",//标记当前播放歌曲的songlist
  play_first: true,
};

export default state;
