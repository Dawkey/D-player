<template>

    <div class="player-list" ref="player_list">
      <div class="header">
        <div class="player-mode" @click="toggle_mode">
          <i :class="toggle_mode_icon"></i>
          <div class="player-mode-text">
            {{toggle_mode_text}}
          </div>
        </div>
        <i class="icon-clear_all" @click="clear_song"></i>
      </div>
      <scroll :top="45" class="scroll" id="scroll" ref="scroll">
        <ul class="songlist">
          <li v-for="(song_item,index) in play_order_list">
            <div class="song-item-contain" @click="select_song(index)">
              <i v-show="active_song(index)" class="icon-logo"></i>
              <div class="name" :class="{color: active_song(index)}">
                {{song_item.name}}
              </div>
              <div class="singer" :class="{color: active_song(index)}">
                &nbsp-&nbsp{{song_item.singer}}
              </div>
            </div>
            <i class="icon-delete" @click="delete_song(index)"></i>
          </li>
        </ul>
      </scroll>
    </div>

</template>

<script type="text/ecmascript-6">
  import {play_mode_mixin} from "common/js/mixin";
  import {mapGetters,mapActions} from "vuex";
  import Scroll from "base/scroll";
  export default {
    name: "PlayerList",
    mixins: [play_mode_mixin],
    props: {
      flag: {
        type: Boolean,
        default: false
      },
    },
    components: {Scroll},
    computed: {
      ...mapGetters([
        "play_order_index"
      ]),
      toggle_mode_text(){
        let mode = this.play_mode;
        return mode == 2 ? "随机播放" : mode == 1 ? "单曲循环" : "列表循环";
      },
    },
    methods: {
      ...mapActions([
        "playerlist_select",
        "playerlist_delete",
        "playerlist_clear"
      ]),

      active_song(index){
        return index === this.play_order_index;
      },

      select_song(index){
        this.playerlist_select(index);
      },

      delete_song(index){
        this.playerlist_delete(index);
      },

      clear_song(){
        this.playerlist_clear();
      }
    },
    watch: {
      flag(){
        if(!this.flag){
          return;
        }
        let half_height = (this.$refs.player_list.clientHeight - 45) / 90;
        let scroll_top = (this.play_order_index + 1 - Math.round(half_height))  * 45;
        this.$refs.scroll.$el.scrollTop = scroll_top;
      }
    }

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"

  .player-list
    .header
      position: relative
      display: flex
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
      &#scroll
        padding-bottom: 0
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
            >i
              font-size: 18px
              color: $color-4
              margin-right: 5px
            >div
              white-space: nowrap
              text-overflow: ellipsis
              overflow: hidden
            .name
              max-width: 100%
              flex-shrink: 0
              font-size: 14px
              color: $color-3
              &.color
                color: $color-4
            .singer
              font-size: 11px
              color: #999
              &.color
                color: $color-4
          >i
            position: absolute
            top: 0
            right: 20px
            line-height: 45px
            font-size: 14px
            color: #666
</style>
