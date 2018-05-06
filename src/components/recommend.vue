<template>
  <div class="recommend-contain">
    <scroll :top="90" class="scroll">
      <loading class="loading" v-show="!(img_is_ready && songlist_items.length)"
        icon_class = "icon-loading"
        :font_size = "32"
      >
      </loading>
      <div class="recommend">
        <div class="slider-contain" v-if="slider_items.length">
          <slider>
            <div v-for="slider_item in slider_items" class="swiper-slide" slot="swiper-slide">
              <a :href="slider_item.linkUrl">
                <img :src="slider_item.picUrl" @load="img_is_ready = true">
              </a>
            </div>
            <div class="swiper-pagination" slot="swiper-pagination">
            </div>
          </slider>
        </div>
        <div class="songlist-contain" v-if="img_is_ready && songlist_items.length">
          <div class="songlist-head" @click="to_songlist">
            <div class="songlist-dot">
            </div>
            推荐歌单
            <div class="songlist-more">
              更多
              <i class="icon-more"></i>
            </div>
          </div>
          <ul class="songlist">
            <li v-for="songlist_item in songlist_items_2d">
              <div v-for="item in songlist_item">
                <div class="song-page" @click="to_songlist_detail(item)">
                  <img v-lazy="item.url"/>
                </div>
                <div class="song-name">{{item.name}}</div>
                <div class="song-hot">
                  <i class="icon-logo"></i>
                  <span>{{item.hot}}</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import Slider from "base/slider";
  import Scroll from "base/scroll";
  import Loading from "base/loading";
  import {slider_data} from "api/recommend";
  import {songlist_data} from "api/songlist";
  import class_songlist from "common/js/class_songlist";
  import {mapMutations} from "vuex";
  export default {
    name: "Recommend",
    data(){
      return {
        slider_items: [],//这两个都是异步过程
        songlist_items: [],
        img_is_ready: false,
      }
    },
    components: {Slider,Scroll,Loading},
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
    created(){
      this.get_slider_data();
      this.get_songlist_data();
    },
    methods: {

      ...mapMutations([
        "set_songlist",
        "set_songlist_id"
      ]),

      get_slider_data(){
        slider_data().then((res)=>{
          if(res.code === 0){
            this.slider_items = res.data.slider;
          }
        });
      },

      get_songlist_data(){
        songlist_data(0,11).then((res)=>{
          if(res.code == 0){
            let array = res.data.list;
            this.songlist_items = array.map((value)=>{
              return new class_songlist(value);
            });
          }
        });
      },

      to_songlist(){
        this.$router.push({
          path: "/recommend/songlist"
        });
      },

      to_songlist_detail(songlist){
        this.$router.push({
          path: `/recommend/${songlist.id}`,
        });
        let id = `songlist-${songlist.id}`;
        this.set_songlist_id(id);
        this.set_songlist(songlist);
      }

    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"

  .recommend-contain
    .scroll
      .loading
        position: absolute
        z-index: 10
        top: 45%
        width: 100%
        justify-content: center
        color: $color-4
      .recommend
        .slider-contain
          position: relative
          margin-top: 5px
          .swiper-slide
            a
              margin: 0 1.5%
              img
                width: 100%
                border-radius: 5px
          .swiper-pagination
            bottom: 5px
        .songlist-contain
          padding: 0 1%
          .songlist-head
            position: relative
            display: flex
            align-items: center
            color: $color-3
            box-shadow: 0 2px 2px -2px $color-4
            margin: 20px 0 10px 0
            height: 30px
            font-size: 14px
            .songlist-dot
              height: 4px
              width: 4px
              background: $color-1
              opacity: 0.8
              border: 4px solid $color-4
              border-radius: 50%
              margin-left: 3px
              margin-right: 8px
            .songlist-more
              position: absolute
              display: flex
              align-items: center
              top: 0
              right: 10px
              height: 100%
              font-size: 12px
              color: #999
              i
                font-size: 15px
                color: $color-4
                margin-left: -2px
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
                    background: rgba(0,0,0,0.2)
                .song-name
                  display: block
                  width: 90%
                  font-size: 12px
                  color: #777
                  margin: 3px auto 0
                .song-hot
                  display: flex
                  position: absolute
                  align-items: center
                  top: 5px
                  right: 5px
                  i
                    display: block
                    font-size: 10px
                    color: $color-1
                    margin-right: 4px
                  >span
                    display: block
                    font-size: 10px
                    color: $color-1

</style>
