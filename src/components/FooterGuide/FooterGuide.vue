<template>
  <footer class="footer_guide border-1px">
    <div class="guide_item" @click="goto('/msite')" :class="{on:'/msite' === $route.path}">
    <span class="item_icon">
    <i class="iconfont icon-food"></i>
    </span>
      <span>首页</span>
    </div>
    <div class="guide_item" @click="goto('/search')" :class="{on:'/search' === $route.path}">
    <span class="item_icon">
    <i class="iconfont icon-search"></i>
    </span>
      <span>搜索</span>
    </div>
    <div class="guide_item" @click="goto('/order')" :class="{on:'/order' === $route.path}">
    <span class="item_icon">
    <i class="iconfont icon-single"></i>
    </span>
      <span>订单</span>
    </div>
    <div class="guide_item" @click="goto('/profile')" :class="{on:'/profile' === $route.path}">
    <span class="item_icon">
    <i class="iconfont icon-user"></i>
    </span>
      <span>我的</span>
    </div>
  </footer>
</template>
<script>
  export default {
    methods:{
      goto(path) {
        this.$router.replace(path)
      },
      isCurrent(path) {
        return this.$route === path;
      }
    }
  }
</script>
<style lang="less" scoped>
  .footer_guide {
    position: fixed;
    bottom: 0;
    z-index: 100;
    left: 0;
    right: 0;
    background-color: #ffffff;
    width: 100%;
    height: 50px;
    display: flex;
    &::before {
      content: '';
      position: absolute;
      z-index: 200;
      left: 0;
      top: 0;
      width: 100%;
      height: 1px;
      background-color: #e4e4e4;
    }
    .guide_item {
      display: flex;
      flex: 1;
      text-align: center;
      flex-direction: column;
      align-items: center;
      margin: 5px;
      color: #999;
      &.on {
        color: #02a774;
      }
      span {
        font-size: 12px;
        margin-top: 2px;
        margin-bottom: 2px;
        .iconfont {
          font-size: 22px;
        }
      }
    }
  }
</style>
