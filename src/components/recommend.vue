<template>
  <div class="recommend">
    <loading class="loading-container" v-show="!songlist_items_2d.length"></loading>
    <!-- 在取得了slider_items的数据之后才挂载slider组件 -->
    <scroll class="scroll-container" ref="scroll" :data="songlist_items_2d">

      <div>
        <div v-if="slider_items.length">
          <slider>
            <div v-for="slider_item in slider_items">
              <a :href="slider_item.linkUrl">
                <img :src="slider_item.picUrl" @load="slider_ready">
              </a>
            </div>
          </slider>
        </div>

        <div class="songlist_head">推荐歌单</div>
        <ul class="songlist">
          <li v-for="songlist_item in songlist_items_2d">
            <div v-for="item in songlist_item">
              <img v-lazy="item.imgurl"/>
              <span>{{item.dissname}}</span>
            </div>
          </li>
        </ul>
      </div>

    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import Slider from "base/slider";
  import Scroll from "base/scroll";
  import Loading from "base/loading";
  import {slider_data,songlist_data} from "api/recommend";
  export default {
    data(){
      return {
        slider_items: [],//这两个都是异步过程
        songlist_items: [],
        slider_is_ready: false,
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
      slider_ready(){
        if(!this.slider_is_ready){
          this.slider_is_ready = true;
          this.$refs.scroll.refresh();
        }
      }
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"

  .recommend
    position: fixed
    top: 98px
    bottom: 0//这个bottom很有必要
    width: 100%
    .loading-container
      position: absolute
      width: 100%
      top: 38%
    .scroll-container
      height: 100%
      overflow: hidden
      .songlist_head
        border-left: 2px solid $theme-color-2
        margin: 15px 0 12px 0
        padding-left: 5px
        font-size: 16px
        line-height: 16px
        color: #666
      .songlist
        >li
          display: flex
          justify-content: space-between
          padding-bottom: 13px
          div
            width: 32.95%
            img
              width: 100%
            span
              display: block
              width: 90%
              font-size: 12px
              color: #777
              margin: 3px auto 0


</style>
