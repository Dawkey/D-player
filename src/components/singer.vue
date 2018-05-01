<template>
  <div class="singer-contain">
    <Scroll :top="90">
      <div class="singer">
        <ul class="singer-list">
          <li v-for="singer_item in singer_items">
            <div class="page">
              <img v-lazy="singer_item.url"/>
            </div>
            <div class="name">
              {{singer_item.name}}
              <i class="icon-player_play" @click="to_singer_detail(singer_item)"></i>
            </div>
          </li>
        </ul>
      </div>
    </Scroll>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from "base/scroll";
  import {singer_data} from "api/singer";
  import class_singer from "common/js/class_singer";
  import {mapMutations} from "vuex";
  export default {
    name: "Singer",
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
      ...mapMutations(["set_singer"]),

      //取得歌手数据
      get_singer_data(){
        singer_data().then((res)=>{
          if(res.code == 0){
            let array = res.data.list;
            this.singer_items = array.map((value)=>{
              return new class_singer(value.Fsinger_name,value.Fsinger_mid);
            });
          }
        });
      },

      //跳转到歌手详情页面
      to_singer_detail(class_singer){
        this.$router.push({
          path: `/singer/${class_singer.id}`,
        });
        this.set_singer(class_singer);
      },
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"

  .singer
    .singer-list
      margin-top: 5px
      padding: 0 1%
      li
        display: flex
        .page
          width: 16%
          margin: 3px 0
          >img
            width: 100%
            border-radius: 2px
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
          >i
            font-size: 25px
            color: #666


</style>
