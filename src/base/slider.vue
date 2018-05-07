<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <slot name="swiper-slide">
      </slot>
    </div>
    <slot name="swiper-pagination">
    </slot>
  </div>
</template>

<script type="text/ecmascript-6">
  import Swiper from "swiper";
  import "swiper/dist/css/swiper.min.css";
  export default {
    name: "Slider",
    data(){
      return {
      }
    },
    mounted(){
      this.swiper_ini();
    },
    methods: {
      swiper_ini(){
        let swiper_ini = new Swiper(".swiper-container",{
          loop: true,
          pagination: {
            el: ".swiper-pagination",
          },
          autoplay: {
            delay: 4000,
            disableOnInteraction: false,
          }
        });
      }
    },

  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"

  .swiper-pagination-bullet
    opacity: 0.4
  .swiper-pagination-bullet-active
    background: $color-4
    opacity: 1

</style>
