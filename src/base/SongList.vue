<template>
  <div class="song-list">
    <loading class="loading" v-show="!song_items.length"
      icon_class = "icon-loading"
      :font_size = "32"
    >
    </loading>
    <ul>
      <li class="play_all">
        <i class="icon-player_play"></i>
        播放全部
        <span class="song-num" v-show="song_items.length">
          (共{{song_items.length}}首)
        </span>
      </li>
      <li v-for="(song_item,index) in song_items" @click="to_player(song_items,index)">
        <div class="index">
          <span v-show="!active_song(index)">{{index + 1}}</span>
          <i v-show="active_song(index)" class="icon-logo"></i>
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
</template>

<script type="text/ecmascript-6">
  import {mapGetters,mapActions} from "vuex";
  import Loading from "base/loading";
  export default {
    name: "SongList",
    props: {
      song_items: {
        type: Array,
        default(){
          return [];
        }
      }
    },
    computed: {
      ...mapGetters([
        "play_song",
        "play_songlist_id",
        "songlist_id"
      ]),
      active_index(){
        if(this.play_songlist_id !== this.songlist_id){
          return -1;
        }
        return this.song_items.findIndex((item)=>{
          return item.id == this.play_song.id;
        });
      }
    },
    components: {Loading},
    methods: {
      ...mapActions([
        "set_player"
      ]),
      //跳转到player播放器
      to_player(list,index){
        this.set_player({list,index});
      },

      active_song(index){
        if(this.play_songlist_id !== this.songlist_id){
          return false;
        }
        return index === this.active_index;
      },

    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"

  .song-list
    .loading
      position: absolute
      z-index: 10
      top: 48px
      width: 100%
      justify-content: center
      color: $color-3
    ul
      padding-bottom: 25px
      background: $color-1
      border-radius: 8px 8px 0 0
      .play_all
        height: 40px
        padding-left: 14px
        color: #000
        box-shadow: 0 1px 1px -1px #ccc
        >i
          color: #999
          font-size: 22px
          margin-right: 8px
        .song-num
          font-size: 13px
          color: #999
          margin-left: 3px
      li
        position: relative
        display: flex
        height: 50px
        align-items: center
        color: #999
        .index
          width: 50px
          font-size: 16px
          text-align: center
          >i
            position: absolute
            top: 0
            left: 12px
            font-size: 20px
            line-height: 50px
            color: $color-4
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
          font-size: 13px
          top: 0
          right: 0
          width: 80px
          height: 100%
          line-height: 55px
          text-align: center
</style>
