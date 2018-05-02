<template>
  <div class="rank-contain">
    <scroll :top="90" class="scroll">
      <ul class="rank">
        <li class="rank-li" v-for="rank_item in rank_items" @click="to_rank_detail(rank_item)">
          <div class="rank-page">
            <img :src="rank_item.url">
            <div class="rank-hot">
              <i class="icon-logo"></i>
              <span>{{rank_item.hot}}</span>
            </div>
          </div>
          <div class="rank-song">
            <div v-for="(item,index) in rank_item.songs">
              {{index + 1}}. {{item.songname}} - {{item.singername}}
            </div>
          </div>
        </li>
      </ul>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from "base/scroll";
  import {rank_data} from "api/rank";
  import class_rank from "common/js/class_rank";
  import {mapMutations} from "vuex";
  export default {

    name: "Rank",


    data(){
      return {
        rank_items: [],
      };
    },


    components: {Scroll},


    created(){
      this.get_rank_data();
    },


    methods: {

      ...mapMutations([
        "set_rank"
      ]),

      get_rank_data(){
        rank_data().then((res)=>{
          if(res.code == 0){
            let array = res.data.topList
            array.forEach((data)=>{
              let item = new class_rank(data);
              if(item.id != 201){
                this.rank_items.push(item);
              }
            });
          }
        });
      },

      to_rank_detail(rank){
        this.$router.push({
          path: `/rank/${rank.id}`,
        });
        this.set_rank(rank);
      },

    },

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"

  .rank-contain
    .scroll
      .rank
        margin-top: 10px
        padding: 0 2%
        .rank-li
          margin-bottom: 8px
          display: flex
          box-shadow: 0 2px 2px -2px #ccc
          .rank-page
            position: relative
            flex-shrink: 0
            height: 120px
            width: 120px
            opacity: 0.9
            img
              width: 100%
              border-radius: 3px
            .rank-hot
              display: flex
              position: absolute
              align-items: center
              top: 5px
              right: 5px
              i
                display: block
                font-size: 10px
                color: $color-1
                margin-right: 4px
              >span
                display: block
                font-size: 10px
                color: $color-1
          .rank-song
            display: flex
            min-width: 0
            width: 100%
            flex-direction: column
            justify-content: space-around
            margin-left: 20px
            margin-right: 20px
            padding: 6px 0
            font-size: 14px
            color: $color-3
            overflow: hidden
            >div
              white-space: nowrap
              text-overflow: ellipsis
              overflow: hidden

</style>
