<template>
  <div class="lyric-contain" ref="lyric"
    @touchstart = "touch_start"
    @touchend = "touch_end"
  >
    <loading class="loading" v-show="!lyric_items.length"
      icon_class = "icon-loading"
      :font_size = "32"
    >
    </loading>
    <div class="half-space" ref="half_space"></div>
    <p ref="lyric_p" v-for="(lyric_item,item_index) in lyric_items" :class="{'active': item_index == index}">
      <span v-html="lyric_item.text"></span>
      <span v-if="trans_items.length">{{trans_items[item_index].text}}</span>
    </p>
    <div class="half-space"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapMutations} from "vuex";
  import {lyric_data} from "api/song_lyric";
  import {Base64} from "js-base64";
  import {TweenMax} from "gsap";
  import lyric_array from "common/js/lyric_array";
  import Loading from "base/loading";

  export default {
    name: "Lyric",


    data(){
      return {
        lyric_items: [],//歌词数组
        trans_items: [],//翻译歌词数组
        timer: null,//歌词变化的定时器对象
        index: -1,//""核心""变量,歌词的一切变化跟它有关,对应于歌词数组(lyric_items)中的index
        tween: null,//TweenMax.js库对应的对象,控制歌词的运动
        move_flag: false,
        touch_timer: null,
        handle_timer: null,
      };
    },


    components: {Loading},


    props: {
      song_id: {
        type: String,
        default: ""
      },
      song_lyric: {
        type: Object,
        default(){
          return {};
        }
      },
      audio_is_ready: {
        type: Boolean,
        default: false
      },
      lyric_time: {
        type: Number,
        default: 0
      },
      playing: {
        type: Boolean,
        default: false
      },
      toggle_lyric: {
        type: Boolean,
        default: false
      },
    },


    methods: {

      ...mapMutations([
        "set_play_lyric"
      ]),

      //对歌词的加工处理---Base64转码,再通过lyric_array,把歌词加工为对应的数组,并赋给
      //lyric_items
      lyric_handle(_lyric){
        this.handle_timer = setTimeout(()=>{
          let lyric = Base64.decode(_lyric.lyric);
          let trans = Base64.decode(_lyric.trans);
          this.lyric_items = lyric_array(lyric);
          if(trans != ""){
            let trans_items = lyric_array(trans);
            if(trans_items.length == this.lyric_items.length){
              this.trans_items = trans_items;
            }else{
              this.trans_items = [];
              console.log("翻译歌词不匹配(╥╯^╰╥)");
            }
          }
          this.$emit("get_lyric_time");
        },500);
      },

      //歌词变化的定时器函数,在到达下一句歌词时间时,对 index 加 1
      timer_fn(){
        let i = this.index + 1;
        let items = this.lyric_items;
        if(i >= items.length){return;}
        let interval = i == 0? items[i].time : (items[i].time - items[i-1].time);
        this.timer = setTimeout(()=>{
          this.index = this.index + 1;
          this.timer_fn();
        },interval);
      },

      //在歌曲时间在受人为控制变化(拖动进度条)后,歌词也应该相应变化,set_lyric_time重新
      //设置歌词定时器的时间
      set_lyric_time(){
        if(!this.lyric_items.length){
          return;
        }
        clearTimeout(this.timer);
        let items = this.lyric_items;
        let i = items.findIndex((value)=>{
          return value.time > this.lyric_time;
        });
        if(i == -1){
          this.index = items.length - 1;
          return;
        }
        this.index = i - 1;
        let interval = items[i].time - this.lyric_time;
        this.timer = setTimeout(()=>{
          this.index = this.index + 1;
          this.timer_fn();
        },interval);
      },

      //控制歌词的运动(通过TweenMax.js)
      lyric_move(){
        let $lyric = this.$refs.lyric;
        let $lyric_p = this.$refs.lyric_p[this.index];
        let $half_space = this.$refs.half_space;
        if(!$lyric_p){return;}
        let scroll_top = $lyric_p.offsetTop - $half_space.clientHeight;
        this.tween = new TimelineMax();
        this.tween.to($lyric,0.7,{scrollTop: scroll_top});
      },

      //在触发touch事件后,歌词运动的相关逻辑.
      touch_start(){
        clearTimeout(this.touch_timer);
        this.move_flag = false;
        if(this.tween == null){return;}
        this.tween.clear();
      },
      touch_end(){
        this.touch_timer = setTimeout(()=>{
          if(this.toggle_lyric){
            this.move_flag = true;
          }
        },2000)
      },

    },


    watch: {

      //对应于player组件里面audio_is_ready,在歌曲播放后才开始歌词运动,保证同步
      audio_is_ready(){
        if(this.audio_is_ready == false){
          this.lyric_items = [];
          this.trans_items = [];
          this.index = -1;
          this.move_flag = true;
          clearTimeout(this.timer);
          clearTimeout(this.touch_timer);
          clearTimeout(this.handle_timer);
          return;
        }
        if(JSON.stringify(this.song_lyric) == "{}"){
          lyric_data(this.song_id).then((res)=>{
            if(res.code == 0){
              this.set_play_lyric(res);
              this.lyric_handle(res);
            }else{
              console.log("歌词数据请求失败Σ(っ°Д°;)っ");
            }
          });
        }else{
          this.lyric_handle(this.song_lyric);
        }
      },

      //""核心变量"",受组件player的影响,在外部lyric_time变化后,触发set_lyric_time.
      lyric_time(){
        this.set_lyric_time();
      },

      //在歌曲播放和暂停时的歌词变化的相关逻辑
      playing(){
        if(this.playing && this.audio_is_ready){
          this.$emit("get_lyric_time");
        }else if(!this.playing){
          clearTimeout(this.timer);
        }
      },

      //index发生变化时,触发歌词运动函数
      index(){
        if(!this.move_flag){return;}
        this.$nextTick(()=>{
          this.lyric_move();
        });
      },

      //对应于player组件的变量toggle_lyric(控制歌词的显示和隐藏),只在歌词显示时,才控制
      //歌词运动,减少性能损耗.
      toggle_lyric(){
        if(this.toggle_lyric){
          this.move_flag = true;
          this.$nextTick(()=>{
            this.lyric_move();
          });
        }else{
          this.move_flag = false;
        }
      }

    }


  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"

  .lyric-contain
    position: relative
    height: 100%
    width: 100%
    overflow-y: scroll
    .loading
      position: absolute
      top: 45%
      width: 100%
      justify-content: center
      color: $color-4
    .half-space
      height: 45%
      width: 100%
    p
      text-align: center
      font-size: 14px
      letter-spacing: 1px
      color: $color-3
      margin: 16px 0
      &.active
        color: $color-4
      span
        display: block
        margin-bottom: 3px
</style>
