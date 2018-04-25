<template>
  <div class="lyric-contain">
    <p v-for="(lyric_item,item_index) in lyric_items" :class="{'active': item_index == index}">
      <span>{{lyric_item.text}}</span>
      <span v-if="trans_items.length">{{trans_items[item_index].text}}</span>
    </p>
  </div>
</template>

<script type="text/ecmascript-6">
  import {lyric_data} from "api/song_lyric";
  import {Base64} from "js-base64";
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
      songmid: {
        type: String,
        default: ""
      },
      audio_is_ready: {
        type: Boolean,
        default: false
      },
      lyric_time: {
        type: Number,
        default: 0
      }
    },
    methods: {
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
      }
    },
    watch: {
      audio_is_ready(){
        if(this.audio_is_ready == false){
          return;
        }
        this.lyric_items = [];
        this.trans_items = [];
        lyric_data(this.songmid).then((res)=>{
          let lyric = Base64.decode(res.lyric);
          let trans = Base64.decode(res.trans);
          this.lyric_items = lyric_array(lyric);
          if(trans != ""){
            this.trans_items = lyric_array(trans);
          }
          this.$emit("get_lyric_time");
        });
      },
      lyric_time(){
        this.set_lyric_time();
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .lyric-contain
    height: 100%
    width: 100%
    overflow-y: scroll
    p
      text-align: center
      font-size: 14px
      color: rgba(245,245,245,0.3)
      margin: 18px 0
      &.active
        color: #fff
      span
        display: block
</style>
