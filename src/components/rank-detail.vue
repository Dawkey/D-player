<template>
  <div class="rank-detail">
    <back class="back">{{back_text}}</back>
    <scroll class="scroll-container" :z_index="9" @scroll.native="scroll">
      <div class="back-background">
        <img class="background-img" :src="rank_page"/>
      </div>
      <div class="cover-background">
        <img class="background-img" :src="rank_page"/>
      </div>
      <div class="content" ref="content">
        <img class="background-img" :src="rank_page"/>
        <div class="content-body">
          <div class="page">
            <img :src="rank_page"/>
          </div>
          <div class="text">
            <div class="name">
              {{rank_name}}
            </div>
            <div class="time" v-show="rank_time != ''">
              最近更新: {{rank_time}}
            </div>
          </div>
        </div>
      </div>
      <song-list :song_items="rank_items" class="song-list"></song-list>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import Back from "base/back";
  import Scroll from "base/scroll";
  import SongList from "base/SongList";
  import {mapGetters} from "vuex";
  import {rank_detail_data} from "api/rank_detail";
  import class_song from "common/js/class_song";

  export default {

    name: "RankDetail",


    data(){
      return {
        rank_items: [],
        rank_page: "",
        rank_name: "",
        rank_time: "",
        back_text: "",
      };
    },

    computed: {
      ...mapGetters([
        "rank"
      ]),
    },


    components: {Back,Scroll,SongList},


    created(){
      this.get_detail_data();
    },


    methods: {

      get_detail_data(){
        rank_detail_data(this.rank.id).then((res)=>{
          if(res.code == 0){
            this.rank_page = res.topinfo.pic_album;
            this.rank_name = res.topinfo.ListName;
            this.rank_time = res.update_time;
            let array = res.songlist;
            this.rank_items = array.map((value)=>{
              return new class_song(value.data);
            });
          }
        });
      },

      scroll(e){
        if(e.target.scrollTop >= this.$refs.content.clientHeight){
          this.back_text = this.rank_name;
        }else{
          this.back_text = "";
        }
      },

    },

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"

.rank-detail
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
  .back
    color: $color-3
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
          height: 140px
          width: 140px
          margin-right: 20px
          img
            height: 100%
            border-radius: 3px
        .text
          display: flex
          flex-direction: column
          padding-top: 15px
          .name
            font-size: 17px
            font-weight: bold
            color: $color-3
          .time
            height: 100%
            display: flex
            align-items: center
            font-size: 13px
            color: $color-3
    .song-list
      position: relative
      z-index: 8

</style>
