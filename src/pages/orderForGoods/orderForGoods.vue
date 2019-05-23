<template>
    <div class="oederForG">
      <div class="HeaderTop">
        <HeaderTop :title="'提交订单'"/>
        <span class="go_back iconfont icon-arrow-left" @click="$router.back()"></span>
      </div>
      <div class="deliveryAddress">
        <div class="addAddress">
          <p>新增收货地址</p>
        </div>
        <div class="deliveryTime">
          <div class="left">
           <p class="time">
             <span>立即送出</span>
             <span>大约<span><span v-if="this.h < 10">0</span>{{ H }}</span>:<span><span v-if="this.M < 10">0</span>{{ M }}</span>送达</span>
           </p>
            <p class="iconfont icon-arrow-right"></p>
          </div>

        </div>
      </div>
      <OrderList/>
      <OrderTotalPrice/>
    </div>
</template>

<script>
    import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
    import OrderList from '../../components/OrderList/OrderList.vue'
    import OrderTotalPrice from '../../components/OrderTotalPrice/OrderTotalPrice.vue'
    export default {
        data() {
          return {
            H: 0,
            M: 0,
          }
        },
        mounted() {
          // 获取当前时间
          const NowTime = new Date()
          const h = NowTime.getHours()
          const m = NowTime.getMinutes()
          // 三十分钟后送达
          this.M = m + 30
          this.H = h
          // 如果分位超过60则让他本身减去60的绝对值
          if( this.M > 60 ) {
            this.H++
            this.M = Math.abs(this.M - 60)
          }
          // 如果时位超过24则让他本身减去24的绝对值
          if(this.H > 24) {
            this.H = Math.abs(this.H - 24)
          }
        },
        components: {
          HeaderTop,
          OrderList,
          OrderTotalPrice
        }
    }
</script>

<style lang="less" scoped>
  .oederForG{
    background-color: #f3f3f3;
    height: 100%;
    .HeaderTop {
      position: relative;
      height: 45px;
      .go_back {
        position: absolute;
        top: 50%;
        left: 10px;
        z-index: 999;
        font-size: 22px;
        color: #fff;
        transform: translate(0, -50%);
      }
    }
    .deliveryAddress {
      margin: 0 10px;
      background-color: #fff;
      box-shadow: 0 0 3px 0px rgba(0, 0, 0, 0.2);
      .addAddress {
        padding: 20px 0;
        position: relative;
        p {
          padding: 10px 35px;
          position: absolute;
          left: 50%;
          transform: translate(-50%);
          border: 2px solid #02a774;
          color: #02a774;
          border-radius: 20px;
        }
      }
      .deliveryTime {
        padding: 0 5px;
        margin-top: 40px;
        .left {
          border-top: 1px solid #ddd;
          display: flex;
          justify-content: space-between;
          padding: 20px 5px;
          .time {
            span:nth-last-of-type(1) {
              font-size: 16px;
              color: #2b333b;
            }
            span:nth-of-type(2) {
              font-size: 14px;
              color: #00a0dc;
              font-weight: 700;
              span {
                font-size: 14px;
                color: #00a0dc;
                font-weight: 700;
              }
            }
          }
          .iconfont {
            font-size: 14px;
            color: #ccc;
          }
        }
      }
    }
  }
</style>
