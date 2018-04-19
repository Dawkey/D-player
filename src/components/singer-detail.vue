<template>
  <div class="singer-detail">
  <div class="header">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <i class="icon-logo" v-if="header_flag">
    </i>
    <div class="header-text" v-else>
      {{singer.name}}
    </div>
  </div>
  <scroll :top="50" class="scroll-container" @scroll.native="header_change">
    <div class="content">
      <img class="content-background" :src="singer.url">
      <div class="page">
        <img :src="singer.url">
      </div>
      <div class="page-right">
        <div class="name">
          <i class="icon-singer"></i>
          {{singer.name}}
        </div>
        <div class="player">
          <i class="icon-player_play"></i>
          播放全部
        </div>
      </div>
    </div>
    <div class="song-list">
      <ul>
        <li v-for="(song_item,index) in song_items" @click="to_player(song_items,index)">
          <div class="index">
            {{index + 1}}
          </div>
          <div class="content">
              <div class="name">
                {{song_item.name}}
              </div>
              <div class="album">
                {{song_item.singer}} - {{song_item.album}}
              </div>
          </div>
          <div class="time">
            {{song_item.time_minute}}
          </div>
        </li>
      </ul>
    </div>
  </scroll>
</div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters,mapActions} from "vuex";
  import {singer_detail_data} from "api/singer_detail";
  import class_song from "common/js/class_song";
  import Scroll from "base/scroll";
  export default {
    name: "SingerDetail",
    data(){
      return {
        song_items: [],
        header_flag: true
      };
    },
    components: {Scroll},
    mounted(){
      this.get_detail_data();
    },
    computed: {
      ...mapGetters([
        "singer",
        "play_song"
      ]),
    },
    methods: {
      ...mapActions([
        "set_player",
        "set_song_audio"
      ]),

      //取得歌曲数据
      get_detail_data(){
        singer_detail_data(this.singer.id).then((res)=>{
          if(res.code == 0){
            let array = res.data.list;
            this.song_items = array.map((data)=>{
              return new class_song(data.musicData);//data.musicData
            });
          }
        });
      },

      //返回
      back(){
        this.$router.back();
      },

      //控制滚动条移动时,头部元素的变化
      header_change(e){
        if(e.target.scrollTop > 200){
          this.header_flag = false;
        }else{
          this.header_flag = true;
        }
      },

      //跳转到player播放器
      to_player(list,index){
        this.set_player({list,index});
        if(this.play_song.audio == ""){
          this.set_song_audio();
        }
      },
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"

  .singer-detail
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    height: 100%
    background: $theme-color-1
    >.header
      display: flex
      align-items: center
      justify-content: center
      height: 50px
      color: $theme-color-1
      background: $theme-color-2
      i
        display: block
        font-size: 25px
      .back
        position: absolute
        left: 15px
    >.scroll-container
      >.content
        position: relative
        display: flex
        height: 200px
        padding: 20px
        box-sizing: border-box
        overflow: hidden
        background: #555
        .content-background
          position: absolute
          z-index: 5
          top: 0
          left: 0
          width: 100%
          height: 100%
          object-fit: cover
          filter: blur(35px)
        .page
          position: relative
          z-index: 6
          height: 160px
          img
            height: 100%
        .page-right
          position: relative
          z-index: 6
          display: flex
          align-items: center
          flex-direction: column
          height: 160px
          width: 100%
          padding-top: 30px
          color: $theme-color-1
          .name,.player
            font-size: 19px
            display: flex
            align-items: center
            margin-left: 20px
            opacity: 0.7
            i
              font-size: 20px
              margin-right: 5px
          .player
            font-size: 14px
            margin-top: 40px
            padding: 5px 10px
            border-radius: 5px
            background: rgba(218, 203, 203,0.5)
            i
              font-size: 15px

      >.song-list
        ul
          li
            position: relative
            display: flex
            height: 52px
            align-items: center
            color: #888
            .index
              width: 50px
              font-size: 17px
              text-align: center
            .content
              display: flex
              flex-direction: column
              justify-content: center
              min-width: 0
              width: 100%
              height: 100%
              box-shadow: 0 1px 1px -1px #ccc
              .name
                white-space: nowrap
                text-overflow: ellipsis
                overflow: hidden
                max-width: calc(100% - 80px)
                font-size: 15px
                color: #000
                margin-bottom: 4px
              .album
                white-space: nowrap
                text-overflow: ellipsis
                overflow: hidden
                max-width: calc(100% - 80px)
                font-size: 11px
            .time
              position: absolute
              font-size: 14px
              top: 0
              right: 0
              width: 80px
              height: 100%
              line-height: 55px
              text-align: center

</style>
