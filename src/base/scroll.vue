<template>
  <div ref="scroll">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  import Bscroll from "better-scroll";

  export default {
    name: "Scroll",
    data(){
      return {
        scroll: undefined,//初始化better-scroll的变量.
      };
    },
    props: {
      data: {
        type: Array,
        default: ()=>[],//对于props数组类型,默认值要用一个函数传值.
      }
    },

    mounted(){
      setTimeout(()=>{
        this.init_scroll();
      },20);
    },

    watch: {
      data(){
        if(this.scroll){
          this.refresh();
        }
      }
    },

    methods: {
      init_scroll(){
        if(!this.$refs.scroll){return;}
        this.scroll = new Bscroll(this.$refs.scroll,{
          probeType: 1,
          click: true
        });
      },
      refresh(){
        if(this.scroll){
          this.scroll.refresh();
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
