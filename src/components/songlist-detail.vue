<template>
  <div class="songlist-detail">
    <back class="back">
    </back>
    <scroll class="scroll-container" :z_index="9">
      <div class="back-background">
        <img class="background-img" :src="songlist.url"/>
      </div>
      <div class="cover-background">
        <img class="background-img" :src="songlist.url"/>
      </div>
      <div class="content">
        <img class="background-img" :src="songlist.url"/>
        <div class="content-body">
          <div class="page">
            <img :src="songlist.url">
            <div class="hot">
              <i class="icon-logo"></i>
              <span>{{songlist.hot}}</span>
            </div>
          </div>
          <div class="text">
            <div class="name">
              {{songlist.name}}
            </div>
            <div class="creator">
              <div class="creator_page">
                <img v-if="creator_page != ''" :src="creator_page">
              </div>
              <div class="creator_name">
                {{songlist.creator}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <song-list :song_items="song_items" class="song-list"></song-list>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import Back from "base/back";
  import Scroll from "base/scroll";
  import SongList from "base/SongList";
  import {mapGetters} from "vuex";
  import {songlist_detail_data} from "api/songlist_detail";
  import class_song from "common/js/class_song";
  export default {
    name: "SonglistDetail",
    data(){
      return {
        song_items: [],
        creator_page: "",
      };
    },
    computed: {
      ...mapGetters([
        "songlist"
      ]),
    },
    components: {Scroll,SongList,Back},
    created(){
      this.get_detail_data();
    },
    methods: {
      get_detail_data(){
        songlist_detail_data(this.songlist.id).then((res)=>{
          if(res.code == 0){
            let data = res.cdlist[0];
            this.creator_page = data.headurl;
            let array = data.songlist;
            this.song_items = array.map((data)=>{
              return new class_song(data);
            });
          }
        });
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"

  .songlist-detail
    position: fixed
    z-index: 10
    top: 0
    bottom: 0
    width: 100%
    height: 100%
    background: $color-1
    .background-img
      position: absolute
      z-index: -1
      top: 0
      left: 0
      width: 100%
      height: 100%
      object-fit: cover
      filter: blur(30px)
      opacity: 0.4
    .scroll-container
      .back-background
        position: fixed
        z-index: 9
        width: 100%
        height: 50px
        background: $color-1
        opacity: 0.98
        overflow: hidden
      .cover-background
        position: absolute
        z-index: 7
        top: 0
        left: 0
        width: 100%
        height: 250px
        background: $color-1
        overflow: hidden
      .content
        position: relative
        z-index: 10
        width: 100%
        padding-bottom: 1px
        background: $color-1
        overflow: hidden
        .content-body
          height: 140px
          margin: 60px 25px 40px
          display: flex
          .page
            position: relative
            height: 100%
            margin-right: 20px
            img
              height: 100%
              border-radius: 3px
            .hot
              position: absolute
              display: flex
              align-items: center
              top: 5px
              right: 5px
              >i
                display: block
                font-size: 10px
                color: $color-1
                margin-right: 4px
              >span
                display: block
                font-size: 10px
                color: $color-1
          .text
            display: flex
            flex-direction: column
            padding-top: 15px
            .name
              font-size: 17px
              font-weight: bold
              color: $color-3
            .creator
              height: 100%
              display: flex
              align-items: center
              .creator_page
                height: 25px
                width: 25px
                border-radius: 50%
                overflow: hidden
                img
                  height: 100%
                  width: 100%
              .creator_name
                margin-left: 10px
                font-size: 15px
                color: $color-3
      .song-list
        position: relative
        z-index: 8
</style>
