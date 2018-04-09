<template>
  <div class="tab">
    <router-link tag="div" to="/recommend" class="recommend">
      推荐
    </router-link>
    <router-link tag="div" to="/singer" class="singer">
      歌手
    </router-link>
    <router-link tag="div" to="/rank" class="rank">
      排行
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"

  .tab
    display: flex
    justify-content: space-around
    font-size: 13px
    >div
      color: #999
      padding: 8px 15px
      text-align: center
    .router-link-active//在vue-router激活时,会给相关元素自动添加一个'router-link-active的class'
      color: $theme-color-2
      border-bottom: 2px solid $theme-color-2

</style>
