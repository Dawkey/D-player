<template>
  <div class="scroll" :style="style">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "Scroll",
    data(){
      return {
        style: {},
      };
    },
    props: {
      top: {
        type: Number,
        default: 0
      },
      z_index: {
        type: [Number,String],//想要多个值可以用数组.
        default: "auto"
      }
    },
    mounted(){
      this.add_style();
    },
    methods: {
      add_style(){
        this.style = {
          top: this.top + "px",
          "z-index": this.z_index,
        };
      },
    },

  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

  .scroll
    position: fixed
    bottom: 0
    width: 100%
    overflow-y: scroll

</style>
