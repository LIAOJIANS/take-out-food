<template>
  <div class="star" :class="'star-'+size">
    <span class="star-item" v-for="(sc, index) in starClasses" :class="sc" :key="index"></span>
  </div>
</template>

<script>
    //  声明常量类名
    const CLASS_NO = 'on'
    const CLASS_HALF = 'half'
    const CLASS_OFF= 'off'
    export default {
        props: {
          score: Number,
          size: Number
        },
      computed: {
          /*
            1、3.5个星，其实就是3个on+1个half+1个off
            2、将ShopList传过来的数值进行向下取整，得到的是on的个数
            3、如果传过来的数score，比向下取整的数要大于等于0.5的话，就证明有一个half星
            4、以上以及添加了on星、half星，如果储存数组starArr还不够长度5的话，其余位置用off星来填满够5
           */
        starClasses() {
          const {score} = this
          const starArr = []
          // 向starArr中添加n个CLASS_ON
          const scoreInteger = Math.floor(score)
          for (let i = 0; i < scoreInteger; i++) {
            starArr.push(CLASS_NO)
          }
          // 向starArr中添加0-1个CLASS_HALF
          if(score*10 - scoreInteger*10 >= 5) {
            starArr.push(CLASS_HALF)
          }
          // 向starArr中添加n个CLASS_OFF
          while (starArr.length < 5) {
            starArr.push(CLASS_OFF)
          }
          return starArr
        }
      }
    }
</script>

<style lang="less">
  .star {
    float: left;
    font-size: 0;
    .star-item {
      display: inline-block;
      background-repeat: no-repeat;
    }
    &.star-48 {
      .star-item {
        width: 20px;
        height: 20px;
        margin-right: 22px;
        background-size: 20px 20px;
        &:last-child {
          margin-right: 0;
        }
        &.on {
          background-image: url("./images/star48_on@2x.png");
          @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
            background-image: url("./images/star48_on@3x.png");
          }
        }
        &.half {
          background-image: url("./images/star48_half@2x.png");
          @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
            background-image: url("./images/star48_half@3x.png");
          }
        }
        &.off {
          background-image: url("./images/star48_off@2x.png");
          @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
            background-image: url("./images/star48_off@3x.png");
          }
        }
      }
    }
    &.star-36 {
      .star-item {
        width: 15px;
        height: 15px;
        margin-right: 6px;
        -webkit-background-size: 15px 15px;
        background-size: 15px 15px;
        &:last-child {
          margin-right: 0;
        }
        &.on {
          background-image: url("./images/star36_on@2x.png");
          @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
            background-image: url("./images/star36_on@3x.png");
          }
        }
        &.half {
          background-image: url("./images/star36_half@2x.png");
          @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
            background-image: url("./images/star36_half@3x.png");
          }
        }
        &.off {
          background-image: url("./images/star36_off@2x.png");
          @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
            background-image: url("./images/star36_off@3x.png");
          }
        }
      }
    }
    &.star-24 {
      .star-item {
        width: 10px;
        height: 10px;
        margin-right: 3px;
        -webkit-background-size: 10px 10px;
        background-size: 10px 10px;
        &:last-child {
          margin-right: 0;
        }
        &.on {
          background-image: url("./images/star24_on@2x.png");
          @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
            background-image: url("./images/star24_on@3x.png");
          }
        }
        &.half {
          background-image: url("./images/star24_half@2x.png");
          @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
            background-image: url("./images/star24_half@3x.png");
          }
        }
        &.off {
          background-image: url("./images/star24_off@2x.png");
          @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
            background-image: url("./images/star24_off@3x.png");
          }
        }
      }
    }
  }
</style>
