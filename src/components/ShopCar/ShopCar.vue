<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div class="content-left" @click="toggleShow" >
          <div class="logo-wrapper" >
            <div class="logo" :class="{ highlight: totalCount }">
              <i class="iconfont icon-shopping" :class="{ highlight: totalCount }"></i>
            </div>
            <div class="num" v-if="totalCount">{{totalCount}}</div>
          </div>
          <div class="price" :class="{highlight: totalCount}">￥{{ totalPrice }}</div>
          <div class="desc">另需配送费￥{{info.deliveryPrice}}元</div>
        </div>icon-shopping
        <div class="content-right">
          <div class="pay" :class="payClass" @click="gotoOrder()">
            {{ payText }}
          </div>
        </div>
      </div>
      <transition name="move">
        <div class="shopcart-list" v-show="listshow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="clearShopCar">清空</span>
          </div>
          <div class="list-content">
            <ul>
              <li class="food" v-for="(food, index) in cartFoods" :key="index">
                <span class="name">{{food.name}}</span>
                <div class="price"><span>￥{{food.price}}</span></div>
                <div class="cartcontrol-wrapper">
                  <CartControl :food="food"/>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <div class="list-mask" v-show="listshow" @click="toggleShow"></div>
  </div>
</template>
<script>
  import CartControl from '../CartControl/CartControl.vue'
  import { MessageBox,Toast } from 'mint-ui'
  import { mapState, mapGetters } from 'vuex'
  import BScorll from 'better-scroll'
  export default {
    data(){
      return {
        isShow: false
      }
    },
   computed: {
     // 在购物车中获取到cartFoods的state 以及商家的info
     ...mapState(['cartFoods', 'info', 'userInfo']),
     // 获取相应的Getters里的数据
     ...mapGetters(['totalCount', 'totalPrice']),

     // 通过计算已购食品来设置购物车不同的样式和提示文字
     payClass () {
       const { totalPrice } = this
       const {minPrice} = this.info
       return totalPrice >= minPrice ? 'enough' : 'not-enough'
     },
     // 计算显示结算的三层关系
     payText () {
       const {totalPrice} = this
       const {minPrice} = this.info
       // 还没任何东西加入购物车的时候
       if(totalPrice === 0) {
         return `￥${minPrice}元起送`
         // 加入了购物车不够totalPrice元的时候
       } else if(totalPrice < minPrice) {
         return `还差￥${minPrice - totalPrice}元起送`
       } else {
         return '去结算'
       }
     },
     listshow() {
       // 总数量为0
       if(this.totalCount === 0) {
         this.isShow = false
         return false
       }
       // 创建滑动对象
       if(this.isShow === true) {
         // 赶在数据加载之前创建BScorll对象
         this.$nextTick(() => {
           // 判断当前BScorll对象是否存在（修复多个BScorll对象产生的多个click）
           if(!this.scorll) {
             // 储存BScorll对象
             this.scorll = new BScorll(".list-content",{
               click: true
             })
           } else {
             // 重新计算滚动条高度（解决少量变多量第一次不能滑动的问题）
             this.scorll.refresh()
           }
         })
       }
       return this.isShow
     }
   },
    methods: {
      toggleShow() {
        // 只有当总数量》0时才切换
        if(this.totalCount > 0) {
          this.isShow = !this.isShow
        }
      },
      clearShopCar() {
        MessageBox.confirm('你确定要清除购物车?').then(action => {
          this.$store.dispatch("clearShopCar")
        }, () => {});
      },
      gotoOrder() {
        // 在store仓库拿到 登录凭证
        const { totalPrice, userInfo } = this
        // 只有登录之后才可以下订单
        if(userInfo._id) {
          // 满20元下订单
          if(totalPrice > 20) {
            // 订单页面的路由跳转
            this.$router.push({ path : '/orderforgoods'})
          } else {
            Toast("亲，二十元送起哟")
          }
        } else {
          MessageBox.confirm('您还没登录，确定去登录吗?').then(action => {
            // 登录页面的路由跳转
            this.$router.push({ path : '/login'})
          }, () => {});
        }
      }
    },
    components: {
      CartControl
    }
  }
</script>

<style lang="less" scoped>
  .shopcart {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 48px;
    .content {
      display: flex;
      background: #141d27;
      font-size: 0;
      color: rgba(255, 255, 255, 0.4);
      .content-left {
        flex: 1;
        .logo-wrapper {
          display: inline-block;
          vertical-align: top;
          position: relative;
          top: -10px;
          margin: 0 12px;
          padding: 6px;
          width: 56px;
          height: 56px;
          box-sizing: border-box;
          border-radius: 50%;
          background: #141d27;
          .logo {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            text-align: center;
            background: #2b343c;
            &.highlight {
              background: #02a774;
            }
            .icon-shopping {
              line-height: 44px;
              font-size: 24px;
              color: #80858a;
              &.highlight {
                color: #fff;
              }
            }
          }
          .num {
            position: absolute;
            top: 0;
            right: 0;
            width: 24px;
            height: 16px;
            line-height: 16px;
            text-align: center;
            border-radius: 16px;
            font-size: 9px;
            font-weight: 700;
            color: #fff;
            background: rgb(240, 20, 20);
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
          }
        }
        .price {
          display: inline-block;
          vertical-align: top;
          margin-top: 5px;
          line-height: 24px;
          box-sizing: border-box;
          font-size: 16px;
          font-weight: 700;
          color: #fff;
          &.highlight {
            color: #fff;
          }

        }
        .desc {
          display: inline-block;
          vertical-align: bottom;
          margin-bottom: 15px;
          margin-left: -45px;
          font-size: 10px;

        }
      }
      .content-right {
        flex: 0 0 105px;
        width: 105px;
        .pay {
          height: 48px;
          line-height: 48px;
          text-align: center;
          font-size: 12px;
          font-weight: 700;
          color: #fff;
          &.not-enough {
            background: #2b333b;
          }
          &.enough {
            background: #00b43c;
            color: #fff;
          }
        }
      }
    }
    .ball-container {
      .ball {
        position: fixed;
        left: 32px;
        bottom: 22px;
        z-index: 200;
        transition:  all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
        .inner {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #02a774;
          transition: all 0.4s linear;
        }
      }
    }
    .shopcart-list {
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
      width: 100%;
      transform: translateY(-100%);
      &.move-enter-active, &.move-leave-active {
        transition:transform .3s;
      }
      &.move-enter, &.move-leave-to {
        transform: translateY(0);
      }
      .list-header {
        height: 40px;
        line-height: 40px;
        padding: 0 18px;
        background: #f3f5f7;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        .title {
          float: left;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }
        .empty {
          float: right;
          font-size: 12px;
          color: rgb(0, 160, 220);
        }
      }
      .list-content {
        padding: 0 18px;
        max-height: 217px;
        overflow: hidden;
        background: #ffffff;
        .food {
          position: relative;
          padding: 12px 0;
          box-sizing: border-box;
          border: none;
          &:after {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 1px;
            background-color: rgba(7, 17, 27, 0.1);
            transform: scaleY(0.5);
          }
          .name {
            line-height: 24px;
            font-size: 14px;
            color: rgb(7, 17, 27);
          }
          .price {
            position: absolute;
            right: 90px;
            bottom: 12px;
            line-height: 24px;
            font-size: 14px;
            font-weight: 700;
            color:rgb(240, 20, 20);
          }
          .cartcontrol-wrapper {
            position: absolute;
            right: 0;
            bottom: 6px;
          }
        }
      }
    }
  }
  .list-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 40;
    backdrop-filter: blur(10px);
    opacity: 1;
    background: rgba(7, 17, 27, 0.6);
    &.fade-enter-active, &.fade-leave-active {
      transition: all 0.5s;
    }
    &.fade-enter, &.fade-leave-to {
      opacity: 0;
      background: rgba(7, 17, 27, 0);
    }
  }
</style>
