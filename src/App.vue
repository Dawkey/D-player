<template>
  <div id="app">
    <d-header></d-header>
    <tab></tab>
    <!-- keep-alive可以把路由的页面缓存起来 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script type="text/ecmascript-6">
  import DHeader from "components/d-header";
  import Tab from "components/tab";
  import Player from "components/player";

  export default{
    name: "App",
    components: {
      DHeader,
      Tab,
      Player
    },
  }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
