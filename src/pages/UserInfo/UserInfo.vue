<template>
    <div class="userinfo">
      <HeaderTop title="个人中心列表"></HeaderTop>
      <div class="go_back iconfont icon-arrow-left " @click="$router.back()"></div>
      <div class="userinfoContent">
        <input type="button" class="btn btnFront" value="点我查看前端开发人员的信息" @click="LookDeveloperInfo(1)">
        <input type="button" class="btn btnBackstage" value="点我查看后台开发人员的信息" @click="LookDeveloperInfo(0)">
        <mt-popup
          v-model="popupVisible" class="privateInfo">
          <div class="infoBox" v-if="showInfo === 1">
            <img :src="saveText[0].privatePhoto" alt="">
            <div class="info">
              <p>{{ saveText[0].developer }}</p>
              <span class="mt30">性别：{{ saveText[0].sex }}</span>
              <p class="mt30">个人简介：{{ saveText[0].content }}</p>
            </div>
          </div>
          <div class="infoBox" v-else>
            <img :src="saveText[1].privatePhoto" alt="">
            <div class="info">
              <p>{{ saveText[1].developer }}</p>
              <span class="mt30">性别：{{ saveText[1].sex }}</span>
              <p class="mt30">个人简介：{{ saveText[1].content }}</p>
            </div>
          </div>
        </mt-popup>
      </div>
    </div>
</template>

<script>
    import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
    import { mapState } from 'vuex'
    export default {
      data() {
        return {
          popupVisible: false, // 控制信息的展示与输出
          showInfo: 1 // 如果为1则展示前端程序员的个人信息，如果为0则展示后台开发人员的信息
        }
      },
      mounted() {
        // 异步获取数据
        this.$store.dispatch("getText")
      },
      methods: {
        LookDeveloperInfo(showInfo) {
          this.popupVisible = !this.popupVisible
          /*
          * 如果点击的时候传过来是1则显示前端信息
          * 0则显示后台开发人员信息
          * */
          this.showInfo = showInfo
        }
      },
      computed: {
        ...mapState(['saveText'])
      },
      components: {
        HeaderTop
      }
    }
</script>

<style lang="less" scoped>
  .userinfo {
    position: relative;
    .go_back {
      position: absolute;
      top: 50%;
      left: 10px;
      color: #fff;
      transform: translate(0,-50%);
      font-size: 22px;
      z-index: 999;
    }
    .btn {
      border-radius: 5px;
      position: absolute;
      left: 50%;
      transform: translate(-50%, 0);
      height: 30px;
      width: 70%;
      box-shadow: 0 0 6px 1px rgba(0, 0, 0, 0.1);
    }
    .btnFront {
      top: 300px;
      background-color: #f1f1b8;
    }
    .btnBackstage {
      top: 500px;
      background-color: pink;
    }
   .userinfoContent {
     padding: 45px 5px 0px 5px;
     .privateInfo {
       .infoBox {
         display: flex;
         justify-content: space-between;
         img {
           max-height: 200px;
           max-width: 200px;
         }
         .info {
           padding-top: 10px;
           width: 200px;
           font-size: 16px;
           text-align: center;
           .mt30 {
             margin-top: 20px;
           }
           span {
             display: block;
           }
         }
       }
     }
   }
  }
</style>
