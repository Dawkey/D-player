<template>
  <div class="player" v-show="play_list.length">
    <div class="player_full" v-show="full_screen">
      <img class="player-background" :src="play_song.img"/>
      <div class="header">
        <div class="back" @click="to_player_mini">
          <i class="icon-back"></i>
        </div>
        <div class="song_name">
          {{play_song.name}}
        </div>
      </div>
      <div class="disc">
        <div class="disc_neddle">
          <img src="/static/img/disc_neddle.png"/>
        </div>
        <div class="disc_pan" :class="toggle_disc">
          <img :src="play_song.img">
        </div>
      </div>
      <div class="bottom">
        <div class="bar">
          <div class="active_time">
            {{current_time}}
          </div>
          <progress-bar :precent="precent"></progress-bar>
          <div class="total_time">
            {{this.play_song.time_minute}}
          </div>
        </div>
        <div class="button">
          <div class="player_mode">
            <i class="icon-player_random">
            </i>
          </div>
          <div class="player_control">
            <i class="icon-player_prev" @click="prev_song"></i>
            <i :class="toggle_icon" @click="toggle_playing"></i>
            <i class="icon-player_next" @click="next_song"></i>
          </div>
          <div class="song_list">
            <i class="icon-player_list"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="player_mini" v-show="!full_screen" @click="to_player_full">
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
        <i :class="toggle_icon" @click.stop="toggle_playing"></i>
        <i class="icon-player_list"></i>
      </div>
    </div>
    <audio :src="play_song.audio" ref="audio" @canplay="audio_ready">
    </audio>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters,mapMutations,mapActions} from "vuex";
  import {time_minute} from "common/js/common_function";
  import ProgressBar from "base/ProgressBar";
  export default {
    name: "Player",
    data(){
      return {
        audio_is_ready: false,
        timer: null,
        current_time: "00:00",
        precent: 0,
      };
    },
    components: {ProgressBar},
    computed: {
      ...mapGetters([
        "play_list",
        "play_song",
        "full_screen",
        "playing",
        "play_index"
      ]),

      //控制播放和暂停图标
      toggle_icon(){
        return this.playing ? "icon-player_pause" : "icon-player_play";
      },

      //控制唱片的旋转
      toggle_disc(){
        let state = this.playing ? "play" : "pause";
        let animation = "rotate_" + (this.play_index % 2);
        return state + " " + animation;
      },
    },
    mounted(){
      this.$refs.audio.volume = 0.2;
    },
    methods: {
      ...mapMutations([
        "set_full_screen",
        "set_playing",
        "set_play_index",
      ]),
      ...mapActions([
        "set_song_audio",
      ]),

      to_player_mini(){
        this.set_full_screen(false);
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
        this.time_clear();
        if(!this.playing){
          this.set_playing(true);
        }
        if(this.play_song.audio == ""){
          this.set_song_audio();
        }
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
        this.time_clear();
        if(!this.playing){
          this.set_playing(true);
        }
        if(this.play_song.audio == ""){
          this.set_song_audio();
        }
      },

      //记录audio准备好了
      audio_ready(){
        this.audio_is_ready = true;
      },

      time_update(){
        this.timer = setInterval(()=>{
          this.current_time = time_minute(this.$refs.audio.currentTime);
        },1000);
      },
      time_clear(){
        clearInterval(this.timer);
      }

    },
    watch: {

      //每当audio_is_ready从false跳到true时,同时playing状态为true时,让audio播放.
      audio_is_ready(){
        if(this.audio_is_ready && this.playing){
          this.$refs.audio.play();
          this.time_update();
        }
      },
      play_song(){
        this.audio_is_ready = false;
      },
      playing(){
        let audio = this.$refs.audio;
        if(this.audio_is_ready){
          if(this.playing){
            audio.play();
            this.time_update();
          }else{
            audio.pause();
            this.time_clear();
          }
          this.playing ? audio.play() : audio.pause();
        }
      },
      current_time(){
        this.precent = parseInt(this.$refs.audio.currentTime)/this.play_song.time;
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
    .player_full
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      height: 100%
      background: #333
      width: 100%
      height: 100%

      .player-background
        position: absolute
        z-index: -1
        top: 0
        left: 0
        width: 100%
        height: 100%
        object-fit: cover
        filter: blur(35px)
      .header
        display: flex
        position: relative
        align-items: center
        justify-content: center
        height: 50px
        color: $theme-color-1
        box-shadow: 0px 1px 1px -1px rgba(255,255,255,0.1)
        .back
          position: absolute
          left: 15px
          i
            display: block
            font-size: 25px
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
      .bottom
        position: absolute
        width: 100%
        bottom: 30px
        .bar
          display: flex
          justify-content: space-between
          align-items: center
          font-size: 10px
          color: rgba(245,245,245,0.4)
          margin: 0 20px 20px
          .active_time
            color: rgba(245,245,245,0.6)
        .button
          display: flex
          justify-content: space-between
          align-items: center
          margin: 0 20px
          i
            font-size: 22px
            opacity: 0.5
          .player_control
            display: flex
            padding: 5px 2px
            justify-content: space-between
            align-items: center
            width: 56%
            i:nth-child(odd)
              font-size: 36px
              opacity: 0.7
            i:nth-child(2)
              font-size: 47px
              opacity: 0.6
    .player_mini
      position: fixed
      bottom: 0
      display: flex
      justify-content: space-between
      width: 100%
      height: 50px
      background: rgba(255,255,255,0.95)
      i
        font-size: 25px
        color: #666
        margin-left: 20px
      .left
        height: 100%
        display: flex
        align-items: center
        .page
          height: 40px
          margin-left: 5px
          img
            height: 100%
        .song_name
          margin-left: 15px
          .name
            font-size: 13px
            color: #222
          .singer
            font-size: 11px
            margin-top: 8px
      .right
        display: flex
        align-items: center
        height: 100%
        margin-right: 15px

</style>
