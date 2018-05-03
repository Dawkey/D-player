<template>
  <div class="singer-contain">
    <Scroll :top="90">
      <div class="singer-class">
        <div class="class_text">
          日本
          <i class="icon-singer_female"></i>
        </div>
        <div class="class_icon" @click="toggle_choose">
          <i class="icon-loading"></i>
        </div>
        <div class="class_choose">

          <div class="language-contain" :class="{choose_height: choose_flag}">
              <div class="language swiper-container">
                <ul class="swiper-wrapper">
                  <li class="swiper-slide">
                    <div class="class_text">
                      华语
                    </div>
                    <div class="class_icon">
                      <i class="icon-loading"></i>
                    </div>
                  </li>
                  <li class="swiper-slide">
                    <div class="class_text">
                      日本
                    </div>
                    <div class="class_icon">
                      <i class="icon-loading"></i>
                    </div>
                  </li>
                  <li class="swiper-slide">
                    <div class="class_text">
                      欧美
                    </div>
                    <div class="class_icon">
                      <i class="icon-loading"></i>
                    </div>
                  </li>
                  <li class="swiper-slide">
                    <div class="class_text">
                      韩国
                    </div>
                    <div class="class_icon">
                      <i class="icon-loading"></i>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

          <div class="sex-contain" :class="{choose_height: choose_flag}">
              <div class="sex swiper-container">
                <ul class="swiper-wrapper">
                  <li class="swiper-slide">
                    <div class="class_text">
                      <i class="icon-singer_female"></i>
                    </div>
                    <div class="class_icon">
                      <i class="icon-loading"></i>
                    </div>
                  </li>
                  <li class="swiper-slide">
                    <div class="class_text">
                      <i class="icon-singer_man"></i>
                    </div>
                    <div class="class_icon">
                      <i class="icon-loading"></i>
                    </div>
                  </li>
                  <li class="swiper-slide">
                    <div class="class_text">
                      <i class="icon-singer_group"></i>
                    </div>
                    <div class="class_icon">
                      <i class="icon-loading"></i>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

        </div>
      </div>
      <div class="singer">
        <ul class="singer-list">
          <li v-for="singer_item in singer_items" @click="to_singer_detail(singer_item)">
            <div class="page">
              <img v-lazy="singer_item.url"/>
            </div>
            <div class="name">
              {{singer_item.name}}
            </div>
          </li>
        </ul>
      </div>
    </Scroll>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from "base/scroll";
  import {singer_data} from "api/singer";
  import class_singer from "common/js/class_singer";
  import {mapMutations} from "vuex";
  import Swiper from "swiper";
  import "swiper/dist/css/swiper.min.css";
  export default {
    name: "Singer",


    data(){
      return {
        singer_items: [],
        active_slide: null,
        choose_flag: false,
      };
    },


    components: {Scroll},


    mounted(){
      this.get_singer_data();
      this.swiper_ini();
    },


    methods: {
      ...mapMutations([
        "set_singer"
      ]),

      //取得歌手数据
      get_singer_data(){
        singer_data().then((res)=>{
          if(res.code == 0){
            let array = res.data.list;
            this.singer_items = array.map((value)=>{
              return new class_singer(value.Fsinger_name,value.Fsinger_mid);
            });
          }
        });
      },

      //跳转到歌手详情页面
      to_singer_detail(singer){
        this.$router.push({
          path: `/singer/${singer.id}`,
        });
        this.set_singer(singer);
      },

      swiper_ini(){

        let language_swiper_ini = new Swiper(".language",{
          loop: true,
          direction: "vertical",
          slidesPerView: 2,
          slideNextClass: "active-slide",
        });

        let sex_swiper_ini = new Swiper(".sex",{
          loop: true,
          direction: "vertical",
          slidesPerView: 2,
          slideActiveClass: "active-slide",
          on: {
            slideChangeTransitionEnd(){
            },
          }
        });

      },

      toggle_choose(){
        this.choose_flag = !this.choose_flag;
      },

    }

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"

  .singer-contain
    .singer-class
      position: fixed
      top: 45%
      right: 0
      height: 40px
      padding-right: 20px
      display: flex
      align-items: center
      >.class_text
        position: relative
        z-index: 9
        font-size: 13px
        color: $color-1
        background: rgba(1, 159, 222,0.7)
        padding-left: 5px
        i
          font-size: 13px
          margin-left: -3px
          margin-right: 15px
          color: $color-1
      >.class_icon
        position: relative
        z-index: 10
        padding: 2px
        border-radius: 50%
        margin-left: -10px
        background: rgba(245,245,245,0.5)
        i
          display: block
          font-size: 36px
          color: $color-4
      .class_choose
        position: absolute
        top: 0
        right: 15px
        width: 89px
        height: 40px
        .swiper-container
          height: 60px
          li
            position: relative
            display: flex
            align-items: center
            .class_text
              background: rgba(255,255,255,0.5)
              color: $color-3
              font-size: 12px
              margin-left: 5px
              padding-left: 10px
              padding-right: 20px
              box-shadow: 0 1px 6px -2px $color-3
            .class_icon
              background: rgba(245,245,245,0.5)
              border-radius: 50%
              margin-left: -8px
              height: 25px
              padding: 1px
              i
                font-size: 25px
                color: $color-3
          .active-slide
            .class_text
              color: $color-4
        .language-contain
          position: absolute
          bottom: 40px
          height: 0
          display: flex
          align-items: flex-end
          overflow: hidden
          transition: height 0.5s
          &.choose_height
            height: 60px
        .sex-contain
          position: absolute
          top: 40px
          height: 0
          overflow: hidden
          transition: height 0.5s
          &.choose_height
            height: 60px
          .class_text
            display: flex
            align-items: center
            width: 24px
            height: 16px
            padding-left: 15px
            padding-right: 15px
            i
              font-size: 12px
              color: inherit

    .singer
      .singer-list
        margin-top: 5px
        padding: 0 1%
        li
          display: flex
          .page
            width: 70px
            margin: 3px 0
            >img
              width: 100%
              border-radius: 2px
          .name
            display: flex
            align-items: center
            justify-content: space-between
            box-sizing: border-box
            padding: 0 30px 0 40px
            width: 83%
            font-size: 14px
            color: #666
            box-shadow: 0 2px 2px -2px #ccc


</style>
