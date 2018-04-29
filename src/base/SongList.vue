<template>
  <div class="song-list">
    <ul>
      <li class="play_all">
        <i class="icon-player_play"></i>
        播放全部
      </li>
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
</template>

<script type="text/ecmascript-6">
  import {mapGetters,mapActions} from "vuex";
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
        "play_song"
      ]),
    },
    methods: {
      ...mapActions([
        "set_player",
        "set_song_audio"
      ]),
      //跳转到player播放器
      to_player(list,index){
        this.set_player({list,index});
        if(this.play_song.audio == ""){
          this.set_song_audio();
        }
      },
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"

  .song-list
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
