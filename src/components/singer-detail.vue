<template>
  <div class="singer-detail">
    <back class="back">{{back_text}}</back>
    <scroll class="scroll-container" :z_index="9" @scroll.native="scroll">
      <div class="back-background">
        <img :src="singer.url">
      </div>
      <div class="cover-background">
        <img :src="singer.url">
      </div>
      <div class="content" ref="content" :style="{'background-image': `url(${singer.url})`}">
        <div class="content-color">
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
        back_text: "",
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

      scroll(e){
        if(e.target.scrollTop >= this.$refs.content.clientHeight){
          this.back_text = this.singer.name;
        }else{
          this.back_text = "";
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
    background: $color-1
    .back
      color: $color-1
    >.scroll-container
      .back-background
        position: fixed
        z-index: 9
        top: 0
        left: 0
        width: 100%
        height: 50px
        background: $color-1
        overflow: hidden
        opacity: 0.98
        &:before
          content: ""
          position: absolute
          z-index: -1
          top: 0
          left: 0
          width: 100%
          height: 100%
          background: rgba(0,0,0,0.1)
        img
          position: absolute
          z-index: -2
          top: 0
          left: 0
          width: 100%
          height: 100%
          object-fit: cover
          filter: blur(30px)
          opacity: 0.5
      .cover-background
        position: absolute
        z-index: 7
        top: 0
        left: 0
        width: 100%
        height: 47%
        overflow: hidden
        &:before
          content: ""
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
          background: rgba(0,0,0,0.1)
        img
          width: 100%
      >.content
        position: relative
        z-index: 10
        height: 45%
        background-repeat: no-repeat
        background-size: cover
        .content-color
          width: 100%
          height: 100%
          background: rgba(0,0,0,0.1)
      >.song-list
        position: relative
        z-index: 8

</style>
