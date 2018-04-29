<template>
    <!-- <div class="content">
      <img class="content-background" :src="singer.url">
      <div class="page">
        <img :src="singer.url">
      </div>
      <div class="page-right">
        <div class="name">
          <i class="icon-singer"></i>
          {{singer.name}}
        </div>
        <div class="player">
          <i class="icon-player_play"></i>
          播放全部
        </div>
      </div>
    </div>   -->
</template>

<script type="text/ecmascript-6">
  export default {
    name: "SonglistDetail",
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
      // .content
      //   position: relative
      //   display: flex
      //   height: 200px
      //   padding: 20px
      //   box-sizing: border-box
      //   overflow: hidden
      //   .content-background
      //     display: none
      //     position: absolute
      //     z-index: 5
      //     top: 0
      //     left: 0
      //     width: 100%
      //     height: 100%
      //     object-fit: cover
      //     filter: blur(35px)
      //   .page
      //     position: relative
      //     z-index: 6
      //     height: 160px
      //     img
      //       height: 100%
      //   .page-right
      //     position: relative
      //     z-index: 6
      //     display: flex
      //     align-items: center
      //     flex-direction: column
      //     height: 160px
      //     width: 100%
      //     padding-top: 30px
      //     color: $theme-color-1
      //     .name,.player
      //       font-size: 19px
      //       display: flex
      //       align-items: center
      //       margin-left: 20px
      //       i
      //         font-size: 20px
      //         margin-right: 5px
      //     .player
      //       font-size: 14px
      //       margin-top: 40px
      //       padding: 5px 10px
      //       border-radius: 5px
      //       background: rgba(218, 203, 203,0.5)
      //       i
      //         font-size: 15px
</style>
