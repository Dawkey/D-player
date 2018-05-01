<template>
  <div class="progress_bar" ref="progress_bar" @click="bar_click">
    <div class="bar" ref="bar">
    </div>
    <div class="bar_pan" ref="bar_pan"  :class="{color: audio_is_ready}"
      @touchstart.prevent = "touch_start"
      @touchmove.prevent = "touch_move"
      @touchend = "touch_end"
      @click.stop = "pan_click"
    >
      <loading class="loading" v-show = "!audio_is_ready"
        icon_class = "icon-loading_3"
        :font_size = "9"
      >
      </loading>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Loading from "base/loading";
  export default {
    name: "ProgressBar",
    data(){
      return{
        length_copy: 0,
        move_length: 0,
        touch: {init: false},
      };
    },
    props: {
      precent: {
        type: Number,
        default: 0
      },
      audio_is_ready: {
        type: Boolean,
        default: false
      }
    },
    components: {Loading},
    methods: {
      move(){
        this.$refs.bar.style.width = `${this.move_length}px`;
        this.$refs.bar_pan.style.transform = `translateX(${this.move_length}px)`;
      },

      bar_click(e){
        let precent = e.offsetX / this.$refs.progress_bar.clientWidth;
        this.$emit("audio_change",precent);
      },

      pan_click(){
        return;
      },
      touch_start(e){
        this.touch.init = true;
        this.touch.start_pagex = e.touches[0].pageX;
        this.touch.start_length = this.move_length;
        this.touch.max_length = this.$refs.progress_bar.clientWidth;
      },
      touch_move(e){
        if(this.touch.init){
          let differ_pagex = e.touches[0].pageX - this.touch.start_pagex;
          let move_length = differ_pagex + this.touch.start_length;
          this.move_length = Math.min(move_length,this.touch.max_length);
          this.move_length = Math.max(this.move_length,0);
          let precent = this.move_length / this.touch.max_length;
          this.$emit("time_change",precent);
          this.move();
        }
      },
      touch_end(){
        this.touch.init = false;
        let precent = this.move_length / this.touch.max_length;
        this.$emit("audio_change",precent);
      }
    },
    watch: {
      precent(){
        let length = this.$refs.progress_bar.clientWidth;
        length = length == 0 ? this.length_copy : length;
        this.length_copy = length;

        if(!this.touch.init){
          this.move_length = length * this.precent;
          this.move();
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"

  .progress_bar
    position: relative
    height: 2px
    width: 100%
    border-radius: 1px
    margin: 0 15px
    background: rgba(50,50,50,0.3)
    .bar
      height: 100%
      width: 0
      background: $color-4
    .bar_pan
      position: absolute
      left: -6px
      top: -5px
      width: 4px
      height: 4px
      border-radius: 50%
      background: $color-3
      border: 4px solid $color-3
      opacity: 0.75
      display: flex
      align-items: center
      justify-content: center
      &.color
        background: $color-4
      .loading
        color: $color-4  
</style>
