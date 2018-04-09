<template>
  <div class="d-header">
    <div class="icon">
      <img src="/static/img/dawkey.ico" alt="icon">
    </div>
    D-player
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"
  .d-header
    display: flex
    justify-content: center
    align-items: center
    font-size: 15px
    font-family: Georgia
    letter-spacing: 1px
    padding: 13px 0 8px
    color: $theme-color-1
    background: $theme-color-2
    .icon
      width: 35px
      height: @width
      border-radius: (@width/2)
      overflow: hidden
      margin-right: 10px
      img
        width: @width
        height: @width

</style>
