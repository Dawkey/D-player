<template>
  <div class="scroll">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "Scroll",
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

  .scroll
    height: 100%
    overflow-y: scroll

</style>
