<template>
  <div class="scroll" :style="style" :class="{padding_bottom: play_list.length}">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from "vuex";
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
    computed: {
      ...mapGetters([
        "play_list"
      ]),
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

  .scroll::-webkit-scrollbar
    display: none

  .scroll
    position: fixed
    bottom: 0
    width: 100%
    overflow-y: scroll
    overflow-s
    -webkit-overflow-scrolling: touch
    &.padding_bottom
      padding-bottom: 50px

</style>
