<template>
  <div class="singer">
    <Scroll class="scroll-container">
      <div>
        <ul class="singer-list">
          <li v-for="singer_item in singer_items">
            <div class="page">
              <img v-lazy="singer_item.url"/>
            </div>
            <div class="name">
              {{singer_item.name}}
              <img src="/static/img/player.png" @click="to_singer_detail(singer_item)"/>
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
      to_singer_detail(class_singer){
        this.$router.push({
          path: `/singer/${class_singer.id}`,
        });
        this.set_singer(class_singer);
      },
      ...mapMutations({
        set_singer: "set_singer",
      }),
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

  .singer
    position: fixed
    top: 94px
    bottom: 0
    width: 100%
    .scroll-container
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
