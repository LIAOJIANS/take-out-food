<template>
  <div>
    <HeaderTop title="我要接单"/>
    <div class="back" @click="$router.back()">返回</div>
    <h3>本模块暂未开放</h3>
  </div>
</template>

<script>
  import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
  export default {
    components: {
      HeaderTop
    }
  }
</script>

<style lang="less" scoped>
  .back {
    margin-top: 50px;
    z-index: 10000000000000000000000000000000000;
  }
  h3 {
    margin-top: 50px;
  }
</style>
