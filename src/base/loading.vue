<template>
  <div class="loading-contain">
    <i :class="icon_class" :style="icon_style" v-show="show"></i>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "Loading",
    props: {
      icon_class: {
        type: String,
        default: ""
      },
      font_size: {
        type: Number,
        default: 24
      },
      time: {
        type: Number,
        default: 1
      },
      show: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      icon_style(){
        return {
          "font-size": `${this.font_size}px`,
          "animation-duration": `${this.time}s`,
        };
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @keyframes rotate
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg)

  .loading-contain
    display: flex
    i
      animation: rotate 1s linear infinite
      color: inherit
</style>
