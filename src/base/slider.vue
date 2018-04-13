<template>
  <div class="bscroll" ref="bscroll">
    <div class="slider" ref="slider">
      <slot>
      </slot>
    </div>
    <div class="slider-dots">
      <div class="slider-dot" v-for="(dot,index) in dots" :class="{active: index === active_page}">
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from "better-scroll";
  import {addClassName} from "common/js/dom.js";

  export default {
    name: "Slider",
    data(){
      return {
        slider: undefined,//Bscroll实例
        children: undefined,//slider滑块下的子dom元素
        dots: [],//slider-dots数组
        active_page: 0,//此时出现在屏幕的轮播图页面的index
        timer: null//用于自动轮播的定时器
      }
    },
    mounted(){
      setTimeout(()=>{
        this.set_img_width();
        this.set_dots_length();//要在set_slider_scroll前执行.
        this.set_slider_scroll();
        this.set_auto_slider();
      },20);
    },
    methods: {
      set_img_width(){
        //this.$refs只有在mounted后才能的得到应有的值.
        let bscroll = this.$refs.bscroll;
        let slider = this.$refs.slider;
        let width = bscroll.clientWidth;//宽度要去bscroll的宽度.
        let length = slider.children.length;
        let slider_num = length+2;
        this.children = slider.children;//children事实上是一个对象,这里不能用foreach方法.
        slider.style.width = width*slider_num + "px";
        for(let i=0;i<length;i++){
          this.children[i].style.width = width + "px";
          addClassName(this.children[i],"slider-item");
        }
      },

      set_dots_length(){
        this.dots = new Array(this.children.length);
      },

      set_slider_scroll(){
        this.slider = new BScroll(this.$refs.bscroll,{
          scrollX: true,
          scrollY: false,
          momentum: false,//惯性
          //snap属性传入一个对象
          snap: {
            loop: true,//是否循环
            threshold: 0.3//拖动的阈值
          },
          snapSpeed: 400
        });
        this.slider.on("scrollEnd",()=>{//better-scroll没次滚一下都会触发scrollEnd事件.
          this.active_page = this.slider.getCurrentPage().pageX;
          clearTimeout(this.timer);
          this.set_auto_slider();
        });
      },

      set_auto_slider(){
        this.timer = setTimeout(()=>{
          this.slider.next(400);//slider滚动到下一块(API文档)
        },4000);
      },
    },

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"

  $dots-size = 8px

  .bscroll
    position: relative
    overflow: hidden
    .slider
      display: flex
      .slider-item
        //flex-shrink默认值为 1,会在整个屏幕空间不够时,把元素缩小,以让所有元素都显示出来.
        flex-shrink: 0
        img
          width: 100%
    .slider-dots
      position: absolute
      display: flex
      justify-content: center
      bottom: $dots-size + 2px
      width: 100%
      .slider-dot
        height: $dots-size
        width: $dots-size
        border-radius: 50%
        margin: 0 4px
        background: $theme-color-1
        &.active
          background: $theme-color-2
          opacity: 0.8
</style>
