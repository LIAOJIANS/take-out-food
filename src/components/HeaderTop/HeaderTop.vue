<template>
  <header class="header">
    <!-- 插槽是父组件与子组件的通讯方式，子组件中的slot可以显示父组件传递给子组件的内容 -->
    <slot name="left"></slot>
    <span class="header_title">
      <span class="header_title_text ellipsis">{{ title }}</span>
    </span>
    <slot name="right"></slot>
  </header>
</template>

<script>
export default {
  // 外部组件传递给此组件的属性
  props: {
    title: String
  },
}
</script>

<style lang="less" scoped>
  .header {
    background-color: #02a774;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    width: 100%;
    height: 45px;
    .header_search {
      position: absolute;
      font: 15;
      top: 50%;
      transform: translateY(-50%);
      width: 10%;
      height: 50%;
      .icon-sousuo {
        font-size: 25px;
        color: #ffffff;
      }
    }
    .header_title {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 50%;
      color: #ffffff;
      text-align: center;
      .header_title_text {
        font-size: 20px;
        color: #ffffff;
        display: block;
      }
    }
    .header_login {
      font-size: 14px;
      color: #ffffff;
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
      .header_login_text {
        color: #ffffff;
      }
    }
  }
</style>
