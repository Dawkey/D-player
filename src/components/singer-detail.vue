<template>
  <div class="singer-detail">
    <back :class="{background: back_flag}"></back>
    <scroll class="scroll-container" :z_index="9" @scroll.native="scroll">
      <div class="content" ref="content" :style="{'background-image': `url(${singer.url})`}">
        <div class="content-color" :style="content_color_style">
        </div>
      </div>
      <song-list :song_items="song_items" class="song-list"></song-list>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from "vuex";
  import {singer_detail_data} from "api/singer_detail";
  import class_song from "common/js/class_song";
  import Back from "base/back";
  import Scroll from "base/scroll";
  import SongList from "base/SongList";
  export default {
    name: "SingerDetail",
    data(){
      return {
        song_items: [],
        scroll_obj: {},
        content_color: 0,
        content_opacity: 0.2,
        back_flag: false,
      };
    },
    components: {Back,Scroll,SongList},
    created(){
      this.get_detail_data();
    },
    computed: {
      ...mapGetters([
        "singer"
      ]),
      content_color_style(){
        let color = Math.floor(this.content_color);
        let opacity = this.content_opacity;
        return {
          background: `rgb(${color},${color},${color},${opacity})`
        };
      },
    },
    methods: {
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

      scroll_handle(){
        let scroll_obj = this.scroll_obj;
        scroll_obj.height = this.$refs.content.clientHeight - 70;
        scroll_obj.color = 185 / scroll_obj.height;
        scroll_obj.opacity = 0.8 / scroll_obj.height;
      },

      scroll(e){
        let scroll_obj = this.scroll_obj;
        let scroll_top = e.target.scrollTop;
        let height = this.$refs.content.clientHeight - 70;
        if(height != scroll_obj.height){
          this.scroll_handle();
        }
        let offset = scroll_obj.height - scroll_top;
        if(offset > 0){
          this.back_flag = false;
          this.content_color = scroll_obj.color * scroll_top;
          this.content_opacity = 0.2 + scroll_obj.opacity * scroll_top;
        }else if(offset <= 0){
          this.back_flag = true;
          this.content_color = 185;
          this.content_opacity = 1;
          this.back_flag = true;
        }
      }
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
    background: $color-1
    .background
      background: $color-2
    >.scroll-container
      >.content
        position: relative
        z-index: 9
        height: 45%
        background-repeat: no-repeat
        background-size: cover
        .content-color
          width: 100%
          height: 100%
          background: rgba(0,0,0,0.2)
      >.song-list
        position: relative
        z-index: 10
        margin-top: -8px

</style>
