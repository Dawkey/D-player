<template>
  <div class="back-contain">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <span></span>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "Back",
    methods: {
      back(){
        this.$router.back();
      }
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"

  .back-contain
    position: absolute
    z-index: 10
    top: 0
    left: 0
    display: flex
    align-items: center
    justify-content: center
    width: 100%
    height: 50px
    color: $color-1
    i
      display: block
      font-size: 25px
      color: $color-3
    .back
      position: absolute
      left: 15px
</style>
