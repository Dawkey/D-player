<template>

  <transition name="songlist">
    <div class="player-song-list" v-show="songlist_flag">
      <div class="cover" @click="cover_click">
      </div>
      <div class="content">
        <div class="header">
          <div class="player-mode">
            <i class="icon-player_order"></i>
            <div class="player-mode-text">
              列表循环
            </div>
          </div>
          <i class="icon-clear_all"></i>
        </div>
        <scroll :top="45" class="scroll">
          <ul class="songlist">
            <li v-for="song_item in song_items">
              <div class="song-item-contain">
                <div class="name">{{song_item.name}}</div>
                <div class="singer">&nbsp-&nbsp{{song_item.singer}}</div>
              </div>
              <i class="icon-delete"></i>
            </li>
          </ul>
        </scroll>
      </div>
    </div>
  </transition>

</template>

<script type="text/ecmascript-6">
  import Scroll from "base/scroll";
  export default {
    name: "PlayerSongList",
    components: {Scroll},
    data(){
      return {
        songlist_flag: true,
      };
    },
    props: {
      song_items: {
        type: Array,
        default(){
          return [];
        },
      }
    },
    methods: {
      cover_click(){
        this.songlist_flag = false;
      },
    }

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"

  .songlist-enter-active,.songlist-leave-active
    transition: opacity 2s
  .songlist-enter,.songlist-leave-to
    opacity: 0
  .player-song-list
    // display: none
    .cover
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background: rgba(0,0,0,0.4)
    .content
      position: relative
      background: $color-1
      height: 100%
      border-radius: 8px 8px 0 0
      .header
        position: relative
        height: 45px
        box-shadow: 0 1px 1px -1px #ccc
        padding-left: 2.5%
        .player-mode
          display: flex
          align-items: center
          >i
            font-size: 17px
            color: #aaa
          .player-mode-text
            line-height: 45px
            font-size: 14px
            margin-left: 5px
            color: $color-3
        .icon-clear_all
          position: absolute
          top: 0
          right: 18px
          line-height: 45px
          font-size: 19px
          color: #666
      .scroll
        position: absolute
        .songlist
          padding-left: 2.5%
          li
            position: relative
            height: 45px
            box-shadow: 0 1px 1px -1px #ccc
            padding-right: 55px
            overflow: hidden
            .song-item-contain
              display: flex
              height: 100%
              align-items: center
              overflow: hidden
              >div
                white-space: nowrap
                text-overflow: ellipsis
                overflow: hidden
              .name
                max-width: 100%
                flex-shrink: 0
                font-size: 14px
                color: $color-3
              .singer
                font-size: 11px
                color: #999
            >i
              position: absolute
              top: 0
              right: 20px
              line-height: 45px
              font-size: 14px
              color: #666
</style>
