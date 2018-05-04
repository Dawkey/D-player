<template>
  <div class="singer-contain">
    <Scroll :top="90" @scroll.native="scroll">
      <div class="singer-class">
        <div class="class_text">
          {{this.choose_obj.text}}
          <i :class="this.choose_obj.icon"></i>
        </div>
        <div class="class_icon" @click="toggle_choose">
          <img src="static/img/icon-loading.svg" :class="{rotate_start: animate_flag}">
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
        choose_flag: false,
        animate_flag: false,
        close_flag: false,
        lan_swiper: null,
        sex_swiper: null,
        lan_index: 1,
        sex_index: 0,
        choose_obj: {
          key: "j_woman_all",
          text: "日本",
          icon: "icon-singer_female",
          lan_index: 1,
          sex_index: 0,
        },
      };
    },


    components: {Scroll},


    mounted(){
      this.get_singer_data(this.choose_obj.key);
      this.swiper_ini();
    },


    methods: {
      ...mapMutations([
        "set_singer"
      ]),

      //取得歌手数据
      get_singer_data(key){
        singer_data(key).then((res)=>{
          if(res.code == 0){
            this.animate_flag = false;
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
        let that = this;
        this.lan_swiper = new Swiper(".language",{
          loop: true,
          direction: "vertical",
          slidesPerView: 2,
          slideNextClass: "active-slide",
          on: {
            slideChangeTransitionEnd(){
              let index = this.realIndex;
              that.lan_index = index == 3 ? 0 : index + 1;
            }
          },
        });

        this.sex_swiper = new Swiper(".sex",{
          loop: true,
          direction: "vertical",
          slidesPerView: 2,
          slideActiveClass: "active-slide",
          on: {
            slideChangeTransitionEnd(){
              that.sex_index = this.realIndex;
            }
          },
        });
      },

      toggle_choose(){
        if(this.animate_flag || this.close_flag){
          return;
        }
        this.choose_flag = !this.choose_flag;
        if(!this.choose_flag){
          let old_obj = this.choose_obj;
          if(old_obj.lan_index == this.lan_index && old_obj.sex_index == this.sex_index){
            return;
          }
          let new_obj = this.index_to_obj(this.lan_index,this.sex_index);
          if(new_obj){
            this.choose_obj = new_obj;
            this.animate_flag = true;
            setTimeout(()=>{
              this.get_singer_data(this.choose_obj.key);
            },500);
          }
        }
      },

      index_to_obj(lan_index,sex_index){
        let lan_obj = {};
        let sex_obj = {};
        switch (lan_index){//华语 日本 欧美 韩国
          case 0:
            lan_obj.key = "cn";
            lan_obj.text = "华语";
            break;
          case 1:
            lan_obj.key = "j";
            lan_obj.text = "日本";
            break;
          case 2:
            lan_obj.key = "eu";
            lan_obj.text = "欧美";
            break;
          case 3:
            lan_obj.key = "k";
            lan_obj.text = "韩国";
            break;
          default:
            lan_obj = null;
        };
        switch (sex_index){//女性 男性 团体
          case 0:
            sex_obj.key = "woman";
            sex_obj.icon = "icon-singer_female";
            break;
          case 1:
            sex_obj.key = "man";
            sex_obj.icon = "icon-singer_man";
            break;
          case 2:
            sex_obj.key = "team";
            sex_obj.icon = "icon-singer_group";
            break;
          default:
            sex_obj = null;
        };
        if(!(lan_obj && sex_obj)){
          console.log("index不符 !!!");
          return null;
        }
        let final_obj = {};
        final_obj.key = `${lan_obj.key}_${sex_obj.key}_all`;
        final_obj.text = lan_obj.text;
        final_obj.icon = sex_obj.icon;
        final_obj.lan_index = lan_index;
        final_obj.sex_index = sex_index;
        return final_obj;
      },

      choose_close(){
        let lan_next_index = this.choose_obj.lan_index
        let sex_index = this.choose_obj.sex_index;
        if(lan_next_index == this.lan_index && sex_index == this.sex_index){
          this.choose_flag = false;
          return;
        }
        this.close_flag = true;
        let lan_index = lan_next_index == 0 ? 3 : lan_next_index - 1;
        this.lan_swiper.slideToLoop(lan_index,500,true);
        this.sex_swiper.slideToLoop(sex_index,500,true);
        setTimeout(()=>{
          this.choose_flag = false;
        },500);
        setTimeout(()=>{
          this.close_flag = false;
        },1000);
      },

      scroll(){
        if(this.close_flag){
          return;
        }
        if(this.choose_flag){
          this.choose_close();
        }
      }

    }

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"

  @keyframes rotate
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg)

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
        >img
          display: block
          width: 36px
          height: 36px
          animation: rotate 1s linear infinite
          animation-play-state: paused
          &.rotate_start
            animation-play-state: running
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
          .sex
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
