<template>
  <div class="player" v-show="play_list.length">
    <div class="player_full" v-show="full_screen">
      <img class="player-background" :src="play_song.img" :class="{opacity: toggle_lyric}"/>
      <div class="player-color"></div>
      <div class="header">
        <div class="back" @click="to_player_mini">
          <i class="icon-back"></i>
        </div>
        <div class="song_name">
          {{play_song.name}}
        </div>
      </div>
      <div class="middle" @click="middle_click">
        <div class="disc" v-show="!toggle_lyric">
          <div class="disc_neddle">
            <img src="/static/img/disc_neddle.png"/>
          </div>
          <div class="disc_pan" :class="toggle_disc">
            <img :src="play_song.img">
          </div>
        </div>
        <div class="lyric" v-show="toggle_lyric">
          <lyric
            :song_id = "play_song.id"
            :song_lyric = "play_song.lyric"
            :audio_is_ready = "audio_is_ready"
            :lyric_time = "lyric_time"
            :playing = "playing"
            :toggle_lyric = "toggle_lyric"
            @get_lyric_time = "get_lyric_time"
          >
          </lyric>
        </div>
      </div>
      <div class="bottom">
        <div class="bar">
          <div class="active_time">
            {{current_time}}
          </div>
          <progress-bar :precent="precent" :audio_is_ready="audio_is_ready"
            @time_change="active_time_change"
            @audio_change="current_time_change"
          >
          </progress-bar>
          <div class="total_time">
            {{this.play_song.time_minute}}
          </div>
        </div>
        <div class="button">
          <div class="player_mode">
            <i :class="toggle_mode_icon" @click="toggle_mode">
            </i>
          </div>
          <div class="player_control">
            <i class="icon-player_prev" @click="prev_song"></i>
            <i :class="toggle_playing_icon" @click="toggle_playing"></i>
            <i class="icon-player_next" @click="next_song"></i>
          </div>
          <div class="song_list">
            <i class="icon-player_list"@click="playerlist_show"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="player_mini" v-show="!full_screen" @click="to_player_full">
      <img class="player-background" :src="play_song.img"/>
      <div class="player-color"></div>
      <div class="left">
        <div class="page">
          <img :src="play_song.img">
        </div>
        <div class="song_name">
          <div class="name">
            {{play_song.name}}
          </div>
          <div class="singer">
            {{play_song.singer}}
          </div>
        </div>
      </div>
      <div class="right">
        <i :class="toggle_playing_icon" @click.stop="toggle_playing"></i>
        <i class="icon-player_list" @click.stop="playerlist_show"></i>
      </div>
    </div>
    <transition name="cover">
      <div class="cover" @click="playerlist_hide" v-show="playerlist_flag">
      </div>
    </transition>
    <transition name="player-list">
      <player-list class="player-list" v-show="playerlist_flag" :flag="playerlist_flag">
      </player-list>
    </transition>
    <audio :src="audio_src" ref="audio"
      @canplay="audio_ready"
      @timeupdate="time_update"
      @ended="ended"
    >
    </audio>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters,mapMutations,mapActions} from "vuex";
  import {play_mode_mixin} from "common/js/mixin";
  import {time_minute} from "common/js/common_function";
  import ProgressBar from "base/ProgressBar";
  import Lyric from "base/lyric";
  import PlayerList from "base/PlayerList";

  export default {
    name: "Player",
    mixins: [play_mode_mixin],
    data(){
      return {
        audio_is_ready: false,//判断audio是否可以播放
        current_time: "00:00",
        precent: 0,
        bar_is_move: false,//判断精度条是否正在移动
        song_id: "",//记入前一首歌的id,以判断歌曲是否确实进行了切换
        disc_rotate_num: 0,//用于disc旋转动画的数组
        lyric_time: 0,
        toggle_lyric: false,
        playerlist_flag: false,
      };
    },
    components: {ProgressBar,Lyric,PlayerList},
    computed: {
      ...mapGetters([
        "full_screen",
        "playing",
        "play_index",
        "play_order_index",
        "play_first"
      ]),

      audio_src(){
        if(this.play_first){
          return "static/audio/blank.m4a";
        }else{
          if(!this.play_list.length){return ""};
          return this.play_song.audio;
        }
      },

      //控制播放和暂停图标
      toggle_playing_icon(){
        return this.playing ? "icon-player_pause" : "icon-player_play";
      },

      //控制唱片的旋转
      toggle_disc(){
        if(this.audio_is_ready){
          let state = this.playing ? "play" : "pause";
          let animation = "rotate_" + (this.disc_rotate_num % 2);
          return state + " " + animation;
        }
      },

    },
    mounted(){
      this.$refs.audio.volume = 0.1;
    },
    methods: {
      ...mapMutations([
        "set_full_screen",
        "set_playing"
      ]),
      ...mapActions([
        "set_song_audio",
      ]),

      to_player_mini(){
        this.set_full_screen(false);
        this.toggle_lyric = false;
      },
      to_player_full(){
        this.set_full_screen(true);
      },

      //控制播放和暂停
      toggle_playing(){
        this.set_playing(!this.playing);
      },

      //上一首歌
      prev_song(){
        let index = this.play_index;
        if(index <= 0){
          index = this.play_list.length - 1;
        }else{
          index = index - 1;
        }
        this.set_play_index(index);
      },

      //下一首歌
      next_song(){
        let index = this.play_index;
        if(index >= this.play_list.length - 1){
          index = 0;
        }else{
          index = index + 1;
        }
        this.set_play_index(index);
      },

      //记录audio准备好了
      audio_ready(){
        if(this.play_first){return;}
        this.audio_is_ready = true;
      },

      //控制'显示时间'随着歌曲播放而变化.
      time_update(e){
        if(this.play_first){return;}
        if(!this.bar_is_move){
          this.current_time = time_minute(e.target.currentTime);
        }
      },

      //一首歌曲播放完之后的相关逻辑
      ended(){
        if(this.play_first){return;}
        //play_mode为 1时,表示单曲循环
        if(this.play_mode == 1){
          this.$refs.audio.currentTime = 0;
          this.$refs.audio.play();
          this.get_lyric_time();
        }else{
          this.next_song();
        }
      },

      //控制'显示时间'随着进度条拖动的变化.
      active_time_change(precent){
        this.bar_is_move = true;
        this.current_time = time_minute(this.play_song.time * precent);
      },

      //控制歌曲'播放时间'随着进度条拖动和点击的变化.
      current_time_change(precent){
        this.bar_is_move = false;
        this.$refs.audio.currentTime = this.play_song.time * precent;
        if(!this.playing){
          this.set_playing(true);
        }
        this.get_lyric_time();
      },

      //取得此时的'播放时间'并传给歌词组件
      get_lyric_time(){
        this.lyric_time = this.$refs.audio.currentTime * 1000;
      },

      //播放器中部的点击事件,控制歌词的显示和隐藏
      middle_click(){
        this.toggle_lyric = !this.toggle_lyric;
      },

      playerlist_show(){
        this.playerlist_flag = true;
      },
      playerlist_hide(){
        this.playerlist_flag = false;
      },
    },
    watch: {

      //每当audio_is_ready从false跳到true时,同时playing状态为true时,让audio播放.
      audio_is_ready(){
        if(this.audio_is_ready && this.playing){
          this.$refs.audio.play();
        }
      },
      play_song(){
        if(!this.play_list.length){
          this.audio_is_ready = false;
          this.playerlist_flag = false;
          this.precent = 0;
          return;
        }
        if(this.play_song.id == this.song_id){
          return;
        }
        if(!this.playing){
          this.set_playing(true);
        }
        if(this.play_song.audio == ""){
          this.set_song_audio();
        }
        this.audio_is_ready = false;
        this.song_id = this.play_song.id;
        this.disc_rotate_num++;
      },
      playing(){
        if(!this.play_list.length){
          return;
        }
        if(this.audio_is_ready){
          let $audio = this.$refs.audio;
          this.playing ? $audio.play() : $audio.pause();
        }
      },

      //歌曲播放时current_time变化而引起的进度条的变化.
      current_time(){
        if(!this.bar_is_move){
          this.precent = parseInt(this.$refs.audio.currentTime)/this.play_song.time;
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

  @import "~common/stylus/variable.styl"

  @keyframes rotate_0
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg)

  @keyframes rotate_1
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg)


  .player
    position: relative
    z-index: 10
    .player-background
      position: absolute
      z-index: -2
      top: 0
      left: 0
      width: 100%
      height: 100%
      object-fit: cover
      filter: blur(30px)
      opacity: 0.4
      &.opacity
        opacity: 0.3
    .player-color
      position: absolute
      z-index: -1
      top: 0
      left: 0
      width: 100%
      height: 100%
      background: rgba(255,255,255,0.1)
    .player_full
      position: fixed
      z-index: 9
      top: 0
      bottom: 0
      width: 100%
      height: 100%
      width: 100%
      height: 100%
      background: $color-1
      .header
        display: flex
        position: relative
        align-items: center
        justify-content: center
        height: 50px
        color: $color-3
        box-shadow: 0px 1px 1px -1px rgba(0,0,0,0.1)
        .back
          position: absolute
          left: 15px
          i
            color: $color-3
            display: block
            font-size: 25px
        .song_name
          margin: 0 50px
          white-space: nowrap
          text-overflow: ellipsis
          overflow: hidden
      .middle
        position: absolute
        width: 100%
        top: 50px
        bottom: 140px
        .disc
          position: relative
          overflow: hidden
          .disc_neddle
            position: absolute
            z-index: 11
            top: 0
            width: 110px
            left: calc(50% - 18px)
            height: 157px
            img
              width: 100%
          .disc_pan
            position: relative
            z-index: 10
            display: flex
            align-items: center
            justify-content: center
            width: 75vw
            height: 75vw
            background-image: url(/static/img/disc_pan.png)
            background-size: cover
            margin: 72px auto 0
            &.rotate_0
              animation: rotate_0 35s linear infinite
            &.rotate_1
              animation: rotate_1 35s linear infinite
            &.play
              animation-play-state: running
            &.pause
              animation-play-state: paused
            img
              width: 46vw
              height: 46vw
              border-radius: 50%
            &:before
              content: ""
              position: absolute
              top: 0
              left: 0
              height: 100%
              width: 100%
              background-image: url(/static/img/disc_light.png)
              background-size: cover
        .lyric
          position: absolute
          top: 20px
          bottom: 0
          width: 80%
          padding: 0 10%
      .bottom
        position: absolute
        width: 100%
        bottom: 30px
        .bar
          display: flex
          justify-content: space-between
          align-items: center
          font-size: 10px
          height: 13px
          color: $color-3
          margin: 0 20px 20px
          .active_time
            opacity: 0.8
            line-height: 13px
          .total_time
            line-height: 13px
        .button
          display: flex
          justify-content: space-between
          align-items: center
          margin: 0 20px
          i
            font-size: 22px
            color: $color-3
            opacity: 0.5
          .player_control
            display: flex
            padding: 5px 2px
            justify-content: space-between
            align-items: center
            width: 56%
            >i
              display: block
              padding: 1px
              overflow: auto
              opacity: 0.8
            i:nth-child(odd)
              font-size: 38px
            i:nth-child(2)
              width: 50px
              font-size: 48px
              opacity: 0.9
    .player_mini
      position: fixed
      z-index: 8
      bottom: 0
      width: 100%
      height: 50px
      background: $color-1
      overflow: hidden
      opacity: 0.98
      .player-background
        opacity: 0.6
      i
        font-size: 25px
        color: $color-4
        margin-left: 20px
      .left
        display: flex
        align-items: center
        min-width: 0
        height: 100%
        margin-right: 100px
        .page
          height: 40px
          margin-left: 5px
          img
            height: 100%
            border-radius: 2px
        .song_name
          overflow: hidden
          margin-left: 15px
          .name
            font-size: 13px
            color: #000
            white-space: nowrap
            text-overflow: ellipsis
            overflow: hidden
          .singer
            font-size: 11px
            margin-top: 8px
            color: $color-3
            white-space: nowrap
            text-overflow: ellipsis
            overflow: hidden
      .right
        position: absolute
        top: 0
        right: 0
        display: flex
        align-items: center
        height: 100%
        margin-right: 15px
    .cover-enter-active,.cover-leave-active
      transition: opacity 0.4s
    .cover-enter,.cover-leave-to
      opacity: 0
    .cover
      position: fixed
      z-index: 10
      top: 0
      bottom: 0
      width: 100%
      background: rgba(0,0,0,0.4)
    .player-list-enter-active,.player-list-leave-active
      transition: transform 0.4s
    .player-list-enter,.player-list-leave-to
      transform: translateY(100%)
    .player-list
      position: fixed
      z-index: 10
      bottom: 0
      width: 100%
      height: 60%
      background: $color-1
      border-radius: 8px 8px 0 0
</style>
