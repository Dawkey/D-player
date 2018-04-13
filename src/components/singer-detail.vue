<template>
  <div class="singer-detail">
    singer-detail
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from "vuex";
  import {singer_detail_data} from "api/singer_detail";
  export default {
    name: "SingerDetail",
    mounted(){
      console.log(this.singer);
      this.get_detail_data();
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
</style>
