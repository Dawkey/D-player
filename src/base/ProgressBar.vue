<template>
  <div class="progress_bar" ref="progress_bar">
    <div class="bar_box">
      <div class="bar" ref="bar">
      </div>
      <div class="bar_pan">
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "ProgressBar",
    props: {
      precent: {
        type: Number,
        default: 0
      },
    },
    watch: {
      precent(){
        let length = this.$refs.progress_bar.clientWidth;
        this.$refs.bar.style.width = length * this.precent + "px";
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .progress_bar
    position: relative
    height: 2px
    width: 100%
    border-radius: 1px
    margin: 0 15px
    background: rgba(245,245,245,0.3)
    .bar_box
      position: absolute
      top: 0
      left: -6px
      display: flex
      align-items: center
      height: 100%
      width: calc(100% + 12px)
      .bar
        height: 100%
        width: 0
        background: #dacbcb
      .bar_pan
        width: 4px
        height: 4px
        border-radius: 50%
        background: #dacbcb
        border: 4px solid #fff
</style>
