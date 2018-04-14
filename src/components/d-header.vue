<template>
  <div class="d-header">
    <div class="icon">
      <img src="/static/img/d-player.png">
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "DHeader",
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"
  .d-header
    display: flex
    height: 50px
    justify-content: center
    align-items: center
    background: $theme-color-2
    .icon
      width: 27px
      img
        width: 100%

</style>
