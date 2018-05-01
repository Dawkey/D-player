<template>
  <div class="songlist">
    <loading class="loading-1" v-show="!songlist_items.length"
      icon_class = "icon-loading"
      :font_size = "32"
    >
    </loading>
    <back class="back">
      歌单
    </back>
    <div class="back-border">
    </div>
    <scroll :z_index="8" @scroll.native="scroll">
      <ul class="songlist-ul" ref="songlist_ul" v-if="songlist_items.length">
        <li v-for="songlist_item in songlist_items">
          <div class="songlist-page" @click="to_songlist_detail(songlist_item)">
            <img v-lazy="songlist_item.url"/>
          </div>
          <div class="songlist-name">{{songlist_item.name}}</div>
          <div class="songlist-hot">
            <i class="icon-logo"></i>
            <span>{{songlist_item.hot}}</span>
          </div>
        </li>
        <loading class="loading-2"
          icon_class = "icon-loading"
          :font_size = "28"
          :show = "push_flag"
        >
        </loading>
      </ul>
    </scroll>
    <router-view></router-view>
  </div>

</template>

<script type="text/ecmascript-6">
  import Back from "base/back";
  import Scroll from "base/scroll";
  import Loading from "base/loading";
  import {songlist_data} from "api/songlist";
  import class_songlist from "common/js/class_songlist";
  import {mapMutations} from "vuex";
  export default {

    name: "Songlist",


    data(){
      return {
        songlist_items: [],
        start: 0,
        end: 19,
        push_flag: false,
      };
    },


    components: {Back,Scroll,Loading},


    created(){
      this.get_songlist_data(this.start,this.end);
    },


    methods: {

      ...mapMutations([
        "set_songlist"
      ]),

      get_songlist_data(start,end){
        songlist_data(start,end).then((res)=>{
          if(res.code == 0){
            let array = res.data.list;
            this.songlist_items = array.map((value)=>{
              return new class_songlist(value);
            });
          }
        });
      },

      push_songlist_items(){
        this.start = this.end + 1;
        this.end = this.start + 19;
        songlist_data(this.start,this.end).then((res)=>{
          if(res.code == 0){
            let array = res.data.list;
            let add_array = array.map((value)=>{
              return new class_songlist(value);
            });
            this.songlist_items.push(...add_array);
            this.push_flag = false;
          }
        });
      },

      scroll(e){
        let $scroll = e.target;
        let scroll_top = $scroll.scrollTop;
        let scroll_height = $scroll.clientHeight;
        let ul_height = this.$refs.songlist_ul.clientHeight;
        if( scroll_top + scroll_height > (ul_height - 13) ){
          this.push_flag = true;
        }
      },

      to_songlist_detail(songlist){
        this.$router.push({
          path: `/recommend/songlist/${songlist.id}`,
        });
        this.set_songlist(songlist);
      },

    },

    watch: {

      push_flag(){
        if(this.push_flag){
          this.push_songlist_items();
        }
      },

    }

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"

  .songlist
    position: fixed
    z-index: 10
    top: 0
    bottom: 0
    width: 100%
    height: 100%
    background: $color-1
    .loading-1
      position: absolute
      z-index: 10
      display: flex
      color: $color-4
      top: 45%
      width: 100%
      justify-content: center
    .back
      color: $color-4
      background: rgba(245,245,245,0.99)
    .back-border
      position: absolute
      z-index: 9
      height: 50px
      width: 97%
      margin: 0 1.5%
      box-shadow: 0 2px 2px -2px $color-4
    .songlist-ul
      display: flex
      flex-wrap: wrap
      justify-content: space-between
      padding: 0 1.5%
      padding-top: 63px
      padding-bottom: 13px
      >li
        position: relative
        padding-bottom: 13px
        width: 49.5%
        .songlist-page
          position: relative
          width: 100%
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
        .songlist-name
          display: block
          width: 90%
          font-size: 12px
          color: #777
          margin: 3px auto 0
        .songlist-hot
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
      .loading-2
        display: flex
        height: 28px
        justify-content: center
        width: 100%
        color: $color-4


</style>
