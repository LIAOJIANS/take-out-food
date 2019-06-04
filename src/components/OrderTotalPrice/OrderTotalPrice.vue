<template>
  <div class="totalPrice">
    <div class="total">
      <span>合计</span>
      <span>￥{{ TotalPrice }}</span>
    </div>
    <div class="button">
      <input class="firendPay" type="button" value="找人付">
      <input class="myPay" type="button" value="自己付" @click="showAlert">
    </div>
    <AlertTip :alertText = alertText v-show="alertShow" @closeTip="closeTip"/>
  </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import AlertTip from '../AlertTip/AlertTip.vue'
    export default {
      props: {
        isShowBGC : Number,
        alertShow: false,
        alertText : ""
      },
      data() {
        return {
        }
      },
      methods: {
        closeTip() {
          this.alertShow = false
          this.alertText = ""
          const isShowBGC  = this.isShowBGC
          this.$router.push({ name: "order", params: { isShowBGC } })
        },
        showAlert() {
          this.alertShow = true
          this.alertText = "支付成功"
        }
      },
       computed: {
         ...mapGetters(['totalPrice']),
         TotalPrice() {
           const { totalPrice,isShowBGC } = this
           if(isShowBGC === 0) {
             return totalPrice  - 1.5 + 2 + 4
           } else {
             return totalPrice  - 1.5
           }
         }
       },
      components: {
        AlertTip
      }
    }
</script>

<style lang="less" scoped>
  .totalPrice {
    width: 100%;
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    padding: 12px 5px;
    .total {
      line-height: 43px;
      span {
        font-size: 18px;
      }
      span:nth-of-type(2) {
        font-size: 22px;
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
</style>
