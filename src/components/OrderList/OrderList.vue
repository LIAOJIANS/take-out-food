<template>
    <div class="orderList">
      <div class="title">
        <p>三饭QBB</p>
        <p class="send">AIB专送</p>
      </div>
      <div class="goodList">
        <ul>
          <li v-for="(food, index) in cartFoods" :key="index">
            <div class="goodImg">
              <img v-lazy="food.image" alt="">
              <div class="name">
                <p>{{ food.name }}</p>
                <p>{{ food.name }}</p>
                <p class="number">×{{ food.count }}</p>
              </div>
            </div>
            <div class="pirce">
              ￥{{ food.price * food.count }}
            </div>
          </li>
        </ul>
      </div>
      <div class="cost">
        <ul class="sendCost">
          <li>
            <span>包装费</span>
            <span>￥2</span>
          </li>
          <li>
            <span>配送费</span>
            <span>￥4</span>
          </li>
          <li class="dash">
            <hr>
          </li>
          <li class="fullSend">
            <span class="fullReduction">减配送费</span>
            <span class="costFree">-￥1.5</span>
          </li>
          <li class="redBack">
            <span>校外红包</span>
            <span class="adre">填写地址后可选</span>
          </li>
          <li class="redBack">
            <span>商家代金券</span>
            <span class="adre">填写地址后可选</span>
          </li>
          <li class="dash">
            <hr>
          </li>
          <li class="allCost">
            <span class="reduction">已优惠￥{{ Total }}</span>
            <span>小计 <span class="monin">￥{{ TotalPrice }}</span></span>
          </li>
        </ul>
      </div>
    </div>
</template>
<script>
  import { mapState, mapGetters } from 'vuex'
  export default {
    data() {
      return {
      }
    },
    computed: {
      ...mapState(['cartFoods']),
      ...mapGetters(['totalPrice']),
      // 总价格
      TotalPrice() {
        const { totalPrice } = this
        return totalPrice + 4 - 1.5 + 2 + 4
      },
      // 计算价格
      Total() {
        return 1.5
      }
    }
  }
</script>

<style lang="less">
.orderList {
  margin: 10px 10px 0px 10px;
  background-color: #fff;
  .title {
    padding: 16px 10px;
    display: flex;
    justify-content: space-between;
    p {
      color: #a2a2a2;
    }
    span {
      color: #d9dde1;
      font-size: 18px;
    }
    .send {
      padding: 2px 3px;
      font-size: 12px;
      border: 1px solid #02a774;
      color: #02a774;
    }
  }
  .goodList {
    ul {
      li {
        padding: 10px 5px;
        background-color: #f8f8f8;
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
          p {
            margin: 3px 0;
            font-size: 16px;
          }
          p:nth-of-type(2) {
            color: #939393;
          }
          .number {
            font-size: 14px;
            color: #02a774;
          }
        }
        .pirce {
          margin-top: 10px;
          color: #7e8c8d;
          font-size: 14px;
        }
      }
      li:nth-of-type(2) {
        margin-top: 5px;
      }
    }
  }
  .cost {
    .sendCost {
      padding: 10px 0;
      li {
        display: flex;
        justify-content: space-between;
        padding: 10px;
        span {
          font-size: 16px;
          color: black;
        }
      }
      .dash {
        position: relative;
        padding: 5px 10px;
        hr {
          display: block;
          width: 100%;
          border: 1px dashed #ccc;
        }
        ::before,::after {
          content: '';
          width: 12px;
          height: 12px;
          background-color: #f3f3f3;
          position: absolute;
          top: 50%;
          border-radius: 50%;
          transform: translate(0, -50%);
        }
        ::before {
          left: -6px;
        }
        ::after {
          right: -6px;
        }
      }
      .fullSend {
        position: relative;
        .fullReduction {
          color: #939393;
          margin-left: 17px;
        }
        ::before {
          content: '减';
          width: 17px;
          height: 17px;
          position: absolute;
          top: 50%;
          left: 5px;
          transform: translate(0, -50%);
          font-size: 14px;
          color: #fff;
          background-color: purple;
          text-align: center;
          line-height: 17px;
        }
        .costFree {
          color: red;
        }
      }
      .redBack {
        padding-top: 20px;
        .adre {
          color: #93999f;
        }
      }
      .allCost {
        .reduction {
          font-size: 12px;
          color: #93999f;
        }
        span:nth-of-type(2) {
          color: black;
          span {
            color: red;
            font-weight: 700;
          }
        }
      }
    }
  }
  .totalPrice {
    display: flex;
    justify-content: space-between;
    .total {
      span {
        font-size: 16px;
      }
      span:nth-of-type(2) {
        font-size: 18px;
        font-weight: 700;
      }
    }
    .button {
      input {
        padding: 10px 20px;
        font-size: 16px;
        border: 1px solid #02a774;
        background-color: #fff;
      }
      input:nth-of-type(2) {
        color: #fff;
        background-color: #02a774;
      }
    }
  }
}
</style>
