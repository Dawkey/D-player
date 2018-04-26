<template>
  <div class="lyric-contain" ref="lyric">
    <div class="half-space" ref="half_space">
    </div>
    <p ref="lyric_p" v-for="(lyric_item,item_index) in lyric_items" :class="{'active': item_index == index}">
      <span>{{lyric_item.text}}</span>
      <span v-if="trans_items.length">{{trans_items[item_index].text}}</span>
    </p>
    <div class="half-space">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapMutations} from "vuex";
  import {lyric_data} from "api/song_lyric";
  import {Base64} from "js-base64";
  import {TweenMax} from "gsap";
  import lyric_array from "common/js/lyric_array";

  export default {
    name: "Lyric",
    data(){
      return {
        lyric_items: [],
        trans_items: [],
        timer: null,
        index: -1,
      };
    },
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
      }
    },
    methods: {
      ...mapMutations([
        "set_play_lyric"
      ]),
      lyric_handle(_lyric){
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
      },
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
      lyric_move(){
        let $lyric = this.$refs.lyric;
        let $lyric_p = this.$refs.lyric_p[this.index];
        let $half_space = this.$refs.half_space;
        if(!$lyric_p){return;}
        let scroll_top = $lyric_p.offsetTop - $half_space.clientHeight;

        TweenLite.to($lyric,0.7,{scrollTop: scroll_top});
      }
    },
    watch: {
      audio_is_ready(){
        if(this.audio_is_ready == false){
          this.lyric_items = [];
          this.trans_items = [];
          clearTimeout(this.timer);
          this.$nextTick(()=>{
            this.$refs.lyric.scrollTop = 0;
          });
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
      lyric_time(){
        this.set_lyric_time();
      },
      playing(){
        if(this.playing && this.audio_is_ready){
          this.$emit("get_lyric_time");
        }else if(!this.playing){
          clearTimeout(this.timer);
        }
      },
      index(){
        this.$nextTick(()=>{
          this.lyric_move();
        });
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .lyric-contain
    height: 100%
    width: 100%
    overflow-y: scroll
    .half-space
      height: 45%
      width: 100%
    p
      text-align: center
      font-size: 14px
      letter-spacing: 1px
      color: rgba(245,245,245,0.4)
      margin: 18px 0
      &.active
        color: rgba(245,245,245,0.8)
      span
        display: block
</style>
