<template>
  <div class="d-header">
    <i class="icon-logo">
    </i>
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
    background: $color-2
    >i
      font-size: 25px
      color: $color-4

</style>
