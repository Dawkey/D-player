<template>
  <scroll :top="90">
    <div class="recommend">
      <div class="slider-contain" v-if="slider_items.length">
        <slider>
          <div v-for="slider_item in slider_items" class="swiper-slide" slot="swiper-slide">
            <a :href="slider_item.linkUrl">
              <img :src="slider_item.picUrl">
            </a>
          </div>
          <div class="swiper-pagination" slot="swiper-pagination">
          </div>
        </slider>
      </div>
      <div class="songlist-contain">
        <div class="songlist-head">推荐歌单</div>
        <ul class="songlist">
          <li v-for="songlist_item in songlist_items_2d">
            <div v-for="item in songlist_item">
              <div class="song-page">
                <img v-lazy="item.imgurl"/>
              </div>
              <div class="song-name">{{item.dissname}}</div>
              <div class="song-hot">
                <i class="icon-logo"></i>
                <span>107万</span>
              </div>
            </div>
          </li>
        </ul>
      </div>

    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
  import Slider from "base/slider";
  import Scroll from "base/scroll";
  import Loading from "base/loading";
  import {slider_data,songlist_data} from "api/recommend";
  export default {
    name: "Recommend",
    data(){
      return {
        slider_items: [],//这两个都是异步过程
        songlist_items: [],
      }
    },
    components: {Slider,Scroll,Loading},
    created(){
      this.get_slider_data();
      this.get_songlist_data();
    },
    computed: {
      songlist_items_2d: function(){
        let items = [];
        if(this.songlist_items.length){
          this.songlist_items.forEach((value,index,array)=>{
            if((index+1)%3 == 0){
              items.push([array[index-2],array[index-1],array[index]]);
            }
          });
        }
        return items;
      },
    },

    methods: {
      get_slider_data(){
        slider_data().then((res)=>{
          if(res.code === 0){
            this.slider_items = res.data.slider;
          }
        });
      },
      get_songlist_data(){
        songlist_data().then((res)=>{
          if(res.code === 0){
            this.songlist_items = res.data.list;
          }
        });
      },
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"

  .recommend
    .slider-contain
      margin-top: 5px
      .swiper-slide
        a
          margin: 0 1%
          img
            width: 100%
            border-radius: 5px
      .swiper-pagination
        bottom: 5px
    .songlist-contain
      padding: 0 1%
      .songlist-head
        color: #666
        box-shadow: 4px 0 4px -4px #666 inset
        margin: 20px 0 12px 0
        padding-left: 6px
        font-size: 14px
        line-height: 18px
      .songlist
        >li
          display: flex
          justify-content: space-between
          padding-bottom: 13px
          >div
            position: relative
            width: 32.8%
            .song-page
              position: relative
              border-radius: 3px
              overflow: hidden
              >img
                width: 100%
              &:before
                content: ""
                position: absolute
                top: 0
                left: 0
                width: 100%
                height: 100%
                background: rgba(0,0,0,0.15)
            .song-name
              display: block
              width: 90%
              font-size: 12px
              color: #777
              margin: 3px auto 0
            .song-hot
              display: flex
              position: absolute
              top: 5px
              right: 5px
              i
                font-size: 11px
                color: $color-1
                margin-top: 2px
                margin-right: 2px
              >span
                font-size: 10px
                color: $color-1


</style>
