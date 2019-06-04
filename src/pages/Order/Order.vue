<template>
    <div>
      <section class="order">
        <HeaderTop title="订单列表"></HeaderTop>
        <section class="order_no_login"  v-show="showOrder">
          <img src="./images/order/person.png">
          <h3>登录后查看外卖订单</h3>
          <button @click="goProfile('/login')">立即登陆</button>
        </section>
        <div class="div" v-show="!showOrder">
          <section class="order_no_login"  v-if="cartFoods.length == 0" >
            <img src="./images/order/person.png">
            <h3>一个订单都没有喔~</h3>
            <button @click="goProfile('/msite')">去逛逛</button>
          </section>
          <section class="order_login" v-else>
            <div class="goodList">
              <ul>
                <li>
                  <div class="item">
                    <div class="goodImg">
                      <img v-lazy="cartFoods[0].image" alt="">
                      <div class="name">
                        <p v-for="(food, index) in cartFoods" :key="index">{{food.name }} × {{ food.count }}</p>
                      </div>
                    </div>
                    <p>已付款</p>
                  </div>
                  <p class="addr" v-if="isShowBGC == 0">外卖将在30分钟后到达您宿舍</p>
                  <p class="addr" v-else>请您到农工商四饭摊位凭单号：26222领取</p>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </section>
    </div>
</template>
<script>
  import { mapState } from 'vuex'
  import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
  export default {
    data() {
      return {
        showOrder: true,
        isShowBGC: this.$route.params.isShowBGC
      }
    },
    mounted() {
     this._ShowOrder()
    },
    computed: {
      ...mapState(['userInfo', 'cartFoods'])
    },
    methods: {
      _ShowOrder() {
        if(this.userInfo._id) {
          this.showOrder = !this.showOrder
        }
      },
      goProfile(url) {
        this.$router.push({path: url});
      }
    },
    watch: {
      userInfo() {
        this._ShowOrder()
      }
    },
    components: {
      HeaderTop
    }
  }
</script>
<style lang="less" scoped>
    .order {
      width: 100%;
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
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          width: 10%;
          height: 50%;
          .iconfont {
            font-size: 22px;
            color: #ffffff;
          }
        }
        .header_title {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 30%;
          color: #fff;
        }
      }
      .order_login {
        padding-top: 50px;
        width: 100%;
        .goodList {
          ul {
            li {
              padding: 10px 5px;
              background-color: #f8f8f8;
              .item {
                display: flex;
                justify-content: space-between;
                .goodImg {
                  img {
                    max-width: 60px;
                    max-height: 65px;
                    min-width: 60px;
                    min-height: 65px;
                  }
                  .name {
                    float: right;
                    margin-left: 10px;
                  }
                  p{
                    margin: 3px 0;
                    font-size: 12px;
                    color: #939393;
                  }
                  .number {
                    font-size: 14px;
                    color: #02a774;
                  }
                }
              }
              .addr {
                text-align: right;
                font-size: 12px;
              }
            }
            li:nth-of-type(2) {
              margin-top: 5px;
            }
          }
        }
      }
      .order_no_login {
        padding-top: 140px;
        width: 60%;
        margin: 0 auto;
        text-align: center;
        > img {
          display: block;
          width: 100%;
          height: 30%;
        }
        > h3 {
          padding: 10px 0;
          font-size: 17px;
          color: #6a6a6a;
        }
        > button {
          display: inline-block;
          background: #02a774;
          font-size: 14px;
          color: #ffffff;
          border: 0;
          outline: none;
          border-radius: 5px;
          padding: 10px 20px;
        }
      }
    }
</style>
