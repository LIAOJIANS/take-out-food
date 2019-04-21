<template>
  <section class="msite">
    <!-- 首页头部title -->
    <!-- 使用 :title 来给头部组件传递数据 -->
    <HeaderTop :title="address.name">
      <!-- 要使用slot="left"指定插入的插槽位置 -->
      <router-link class="header_search" slot="left" to="/search">
        <i class="iconfont icon-sousuo"></i>
      </router-link>
      <router-link class="header_login" slot="right" :to="userInfo._id ? '/userinfo': '/login'">
        <span class="header_login_text" v-if="!userInfo._id">
          登录|注册
        </span>
        <span class="header_login_text" v-else>
          <i class="iconfont icon-yonghuming"></i>
        </span>
      </router-link>
    </HeaderTop>
    <!--首页导航轮播图-->
    <nav class="msite_nav">
      <!-- swiper的容器div -->
      <div class="swiper-container" v-if="categorys.length">
        <!-- swiper的包裹层div -->
        <div class="swiper-wrapper">
          <!-- swiper的轮播div -->
          <div class="swiper-slide" v-for="(pages,index) in categorysArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(data,index) in pages" :key="index">
              <div class="food_container">
                <img :src="baseImageUrl+data.image_url">
              </div>
              <span>{{data.title}}</span>
            </a>
          </div>
        </div>
        <!-- swiper轮播图圆点 -->
        <div class="swiper-pagination"></div>
      </div>
      <img src="./images/msite_back.svg" alt="back" v-else>
    </nav>
    <!--首页附近商家列表-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList></ShopList>
    </div>
  </section>
</template>
<script>
  import Swiper from 'swiper'
  import 'swiper//dist/css/swiper.min.css'
  import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
  import ShopList from '../../components/ShopList/ShopList.vue'
  export default {
    components: {
      HeaderTop,
      ShopList
    },
    mounted () {
      new Swiper('.swiper-container', {
        autoplay: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      })
    }
  }
</script>
<style lang="less" scoped>
  .msite {
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
    .msite_nav {
      position: relative;
      border: none;
      margin-top: 45px;
      height: 200px;
      background: #ffffff;
      &:after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1px;
        background-color: #e4e4e4;
        transform: scaleY(0.5);
      }
      .swiper-container {
        width: 100%;
        height: 100%;
        .swiper-wrapper {
          width: 100%;
          height: 100%;
          .swiper-slide {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            flex-wrap: wrap;
            .link_to_food {
              width: 25%;
              .food_container {
                display: block;
                width: 100%;
                text-align: center;
                padding-bottom: 10px;
                font-size: 0;
                img {
                  display: inline-block;
                  width: 50px;
                  height: 50px;
                }
              }
              span {
                display: block;
                width: 100%;
                text-align: center;
                font-size: 13px;
                color: #666666;
              }
            }
          }
        }
        .swiper-pagination {
          >span.swiper-pagination-bullet-active {
            background-color: #02a774;
          }
        }
      }
    }
    .msite_shop_list {
      position: relative;
      margin-top: 10px;
      background: #ffffff;
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
      .shop_header {
        padding: 10px 10px 0;
        .shop_icon {
          margin-left: 5px;
          color: #999999;
        }
        .shop_header_title {
          color: #999999;
          font-size: 14px;
          line-height: 20px;
        }
      }
    }
  }
</style>
