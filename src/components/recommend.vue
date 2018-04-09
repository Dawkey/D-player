<template>
  <div class="recommend">
    <!-- 在取得了slider_items的数据之后才挂载slider组件 -->
    <div v-if="slider_items.length">
      <slider>
        <div v-for="slider_item in slider_items">
          <a :href="slider_item.linkUrl">
            <img :src="slider_item.picUrl">
          </a>
        </div>
      </slider>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Slider from "base/slider";
  import {slider_data} from "api/recommend.js";
  export default {
    data(){
      return {
        slider_items: [],
      }
    },
    created(){
      this.get_slider_data();
    },
    methods: {
      get_slider_data(){
        slider_data().then((res)=>{
          if(res.code === 0){
            this.slider_items = res.data.slider;
          }else{
            console.log("slider-状态码:code:0-错误");
          }
        });
      },
    },
    components: {Slider},
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
