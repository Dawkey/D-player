<template>
  <div class="singer">
    <Scroll class="scroll-container">
      <div>
        <ul class="singer-list">
          <li v-for="singer_item in singer_items">
            <div class="page">
              <img v-lazy="`https://y.gtimg.cn/music/photo_new/T001R150x150M000${singer_item.Fsinger_mid}.jpg?max_age=2592000`"/>
            </div>
            <div class="name">{{singer_item.Fsinger_name}}<img src="/static/img/player.png"/></div>
          </li>
        </ul>
      </div>
    </Scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from "base/scroll";
  import {singer_data} from "api/singer";
  export default {
    data(){
      return {
        singer_items: [],
      };
    },
    components: {Scroll},
    mounted(){
      this.get_singer_data();
    },
    methods: {
      get_singer_data(){
        singer_data().then((res)=>{
          if(res.code == 0){
            this.singer_items = res.data.list;
          }
        });
      },
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

  .singer
    position: fixed
    top: 98px
    bottom: 0
    width: 100%
    .scroll-container
      height: 100%
      overflow: hidden
      .singer-list
        li
          display: flex
          .page
            width: 16%
            margin: 3px 0
            >img
              width: 100%
          .name
            display: flex
            align-items: center
            justify-content: space-between
            box-sizing: border-box
            padding: 0 30px 0 40px
            width: 83%
            font-size: 14px
            color: #666
            box-shadow: 0 2px 2px -2px #ccc
            >img
              width: 27px
              height: @width


</style>
