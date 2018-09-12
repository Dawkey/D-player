import {shuffle} from "common/js/common_function";
import {mapGetters,mapMutations} from "vuex";

export const play_mode_mixin = {

  computed:{

    ...mapGetters([
      "play_mode",
      "play_song",
      "play_order_list",
      "play_list",
    ]),

    //控制播放模式图标
    toggle_mode_icon(){
      let mode = this.play_mode;
      return mode == 2 ? "icon-player_random" : mode == 1 ? "icon-player_loop" : "icon-player_order";
    },
  },


  methods:{

    ...mapMutations([
      "set_play_mode",
      "set_play_list",
      "set_play_index",
    ]),

    //控制播放模式切换(改变play_list) (0表示顺序播放,1表示单曲循环,2表示随机播放)
    toggle_mode(){
      let mode = (this.play_mode + 1) % 3;
      this.set_play_mode(mode);
      if(this.play_mode == 1){
        return;
      }

      let old_song = this.play_song;
      let _list = this.play_order_list.slice();
      if(this.play_mode == 0){
        this.set_play_list(_list);
      }else if(this.play_mode == 2){
        this.set_play_list(shuffle(_list));
      }

      let index = this.play_list.findIndex((new_song)=>{
        return new_song.id == old_song.id
      });
      this.set_play_index(index);
    },
  }

};
