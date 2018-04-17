<template>
  <div class="player">
    <div class="player_full">
      <img class="player-background" src="https://y.gtimg.cn/music/photo_new/T002R300x300M000003bSL0v4bpKAx.jpg?max_age=2592000"/>
      <div class="header">
        <div class="back">
          <i class="icon-back"></i>
        </div>
        <div class="song_name">
          等你下课
        </div>
      </div>
      <div class="disc">
        <div class="disc_neddle">
          <img src="/static/img/disc_neddle.png"/>
        </div>
        <div class="disc_pan">
          <img src="https://y.gtimg.cn/music/photo_new/T002R300x300M000003bSL0v4bpKAx.jpg?max_age=2592000">
        </div>
      </div>
      <div class="bottom">
        <div class="bar">
          <div class="active_time">
            00:00
          </div>
          <div class="bar_box">
            <div class="bar_pan">
            </div>
          </div>
          <div class="total_time">
            01:39
          </div>
        </div>
        <div class="button">
          <div class="player_mode">
            <i class="icon-player_random">
            </i>
          </div>
          <div class="player_control">
            <i class="icon-player_prev"></i>
            <i class="icon-player_pause"></i>
            <i class="icon-player_next"></i>
          </div>
          <div class="song_list">
            <i class="icon-player_list"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="player_mini">
      <div class="left">
        <div class="page">
          <img src="https://y.gtimg.cn/music/photo_new/T002R300x300M000003bSL0v4bpKAx.jpg?max_age=2592000">
        </div>
        <div class="song_name">
          <div class="name">
            等你下课
          </div>
          <div class="singer">
            周杰伦
          </div>
        </div>
      </div>
      <div class="right">
        <i class="icon-player_play"></i>
        <i class="icon-player_list"></i>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "Player",
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

  @import "~common/stylus/variable.styl"

  .player
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    height: 100%
    background: #555
    .player_full
      // display: none
      position: relative
      width: 100%
      height: 100%

      .player-background
        position: absolute
        z-index: -1
        top: 0
        left: 0
        width: 100%
        height: 100%
        object-fit: cover
        filter: blur(35px)
      .header
        display: flex
        position: relative
        align-items: center
        justify-content: center
        height: 50px
        margin: 0 20px
        color: $theme-color-1
        box-shadow: 0px 1px 1px -1px rgba(255,255,255,0.1)
        .back
          position: absolute
          top: 0
          left: 0
          width: 26px
          >i
            font-size: 26px
            line-height: 50px
      .disc
        position: relative
        overflow: hidden
        .disc_neddle
          position: absolute
          z-index: 11
          top: 0
          width: 110px
          left: calc(50% - 18px)
          height: 157px
          img
            width: 100%
        .disc_pan
          position: relative
          z-index: 10
          display: flex
          align-items: center
          justify-content: center
          width: 75vw
          height: 75vw
          background-image: url(/static/img/disc_pan.png)
          background-size: cover
          margin: 72px auto 0
          img
            width: 46vw
            height: 46vw
            border-radius: 50%
          &:before
            content: ""
            position: absolute
            top: 0
            left: 0
            height: 100%
            width: 100%
            background-image: url(/static/img/disc_light.png)
            background-size: cover
      .bottom
        position: absolute
        width: 100%
        bottom: 30px
        .bar
          display: flex
          justify-content: space-between
          align-items: center
          font-size: 9px
          color: rgba(245,245,245,0.4)
          margin: 0 20px 20px
          .active_time
            color: rgba(245,245,245,0.6)
          .bar_box
            position: relative
            height: 2px
            width: 100%
            border-radius: 1px
            margin: 0 5px
            background: rgba(245,245,245,0.3)
            .bar_pan
              position: absolute
              width: 4px
              height: 4px
              left: 0
              border-radius: 50%
              background: $theme-color-2
              border: 4px solid #fff
              top: -5px
        .button
          display: flex
          justify-content: space-between
          align-items: center
          margin: 0 20px
          i
            font-size: 22px
            opacity: 0.5
          .player_control
            display: flex
            padding: 5px 2px
            justify-content: space-between
            align-items: center
            width: 56%
            i:nth-child(odd)
              font-size: 36px
              opacity: 0.7
            i:nth-child(2)
              font-size: 47px
              opacity: 0.6
    .player_mini
      position: absolute
      bottom: 0
      display: flex
      display: none
      justify-content: space-between
      width: 100%
      height: 50px
      background: rgba(255,255,255,0.95)
      i
        font-size: 25px
        color: #666
        margin-left: 20px
      .left
        height: 100%
        display: flex
        align-items: center
        .page
          height: 40px
          margin-left: 5px
          img
            height: 100%
        .song_name
          margin-left: 15px
          .name
            font-size: 13px
            color: #222
          .singer
            font-size: 11px
            margin-top: 8px
      .right
        display: flex
        align-items: center
        height: 100%
        margin-right: 15px

</style>
