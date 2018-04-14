<template>
  <div class="singer-detail">
    <div class="header">
      <div class="back">
        <img src="/static/img/back.png">
      </div>
      <div class="header-content">
        <img src="/static/img/d-player.png"/>
      </div>
    </div>
    <div class="content">
      <img class="content-background" src="https://y.gtimg.cn/music/photo_new/T001R300x300M0000025NhlN2yWrP4.jpg?max_age=2592000">
      <div class="page">
        <img src="https://y.gtimg.cn/music/photo_new/T001R300x300M0000025NhlN2yWrP4.jpg?max_age=2592000">
      </div>
      <div class="page-right">
        <div class="name">
          <img src="/static/img/singer.png">
          周杰伦
        </div>
        <div class="player">
          <img src="/static/img/player-2.png">
          播放全部
        </div>
      </div>
    </div>
    <div class="song-list">
      <ul>
        <li>
          <div class="index">
            1
          </div>
          <div class="content">
              <div class="name">
                告别气球
              </div>
              <div class="album">
                周杰伦 - 周杰伦的床边故事
              </div>
          </div>
          <div class="time">
            03:35
          </div>
        </li>
        <li>
          <div class="index">
            1
          </div>
          <div class="content">
              <div class="name">
                告别气球
              </div>
              <div class="album">
                周杰伦 - 周杰伦的床边故事
              </div>
          </div>
          <div class="time">
            03:35
          </div>
        </li>
        <li>
          <div class="index">
            1
          </div>
          <div class="content">
              <div class="name">
                告别气球
              </div>
              <div class="album">
                周杰伦 - 周杰伦的床边故事
              </div>
          </div>
          <div class="time">
            03:35
          </div>
        </li>
        <li>
          <div class="index">
            1
          </div>
          <div class="content">
              <div class="name">
                告别气球
              </div>
              <div class="album">
                周杰伦 - 周杰伦的床边故事
              </div>
          </div>
          <div class="time">
            03:35
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from "vuex";
  import {singer_detail_data} from "api/singer_detail";
  export default {
    name: "SingerDetail",
    mounted(){
      // console.log(this.singer);
      // this.get_detail_data();
    },
    computed: {
      ...mapGetters(["singer"]),
    },
    methods: {
      get_detail_data(){
        singer_detail_data(this.singer.id).then((res)=>{
          console.log(res);
        });
      },
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"
  .singer-detail
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    height: 100%
    background: $theme-color-1
    >.header
      display: flex
      align-items: center
      justify-content: center
      height: 50px
      color: $theme-color-1
      background: $theme-color-2
      .back
        position: absolute
        width: 26px
        top: ((50px-@width)/2)
        left: 13px
        img
          width: 100%
      .header-content
        width: 27px
        img
          width: 100%
    >.content
      position: relative
      display: flex
      height: 200px
      padding: 20px
      box-sizing: border-box
      overflow: hidden
      .content-background
        position: absolute
        z-index: 5
        top: 0
        left: 0
        width: 100%
        height: 100%
        object-fit: cover
        filter: blur(35px)
      .page
        position: relative
        z-index: 6
        height: 160px
        img
          height: 100%
      .page-right
        position: relative
        z-index: 6
        display: flex
        align-items: center
        flex-direction: column
        height: 160px
        width: 100%
        padding-top: 30px
        color: $theme-color-1
        .name,.player
          font-size: 20px
          display: flex
          align-items: center
          img
            height: 23px
            width: 23px
            margin-right: 5px
        .player
          font-size: 14px
          margin-top: 40px
          padding: 5px 10px
          border-radius: 5px
          background: rgba(218, 203, 203,0.5)
          img
            height: 20px
            width: 20px
    >.song-list
      ul
        li
          position: relative
          display: flex
          height: 55px
          align-items: center
          color: #888
          .index
            font-size: 17px
            padding: 0 20px
          .content
            display: flex
            flex-direction: column
            justify-content: center
            width: 100%
            height: 100%
            box-shadow: 0 1px 1px -1px #ccc
            .name
              font-size: 15px
              color: #000
              margin-bottom: 5px
            .album
              font-size: 12px
          .time
            position: absolute
            font-size: 14px
            top: 0
            right: 20px
            height: 100%
            line-height: 55px

</style>
