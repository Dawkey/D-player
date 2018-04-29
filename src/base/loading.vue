<template>
  <div class="loading-contain">
    <i :class="icon_class" :style="icon_style"></i>
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
        default: 25
      },
      color: {
        type: String,
        default: "#666"
      },
      time: {
        type: Number,
        default: 1
      }
    },
    computed: {
      icon_style(){
        return {
          "font-size": `${this.font_size}px`,
          "color": this.color,
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
      display: block
      animation: rotate 1s linear infinite
</style>
