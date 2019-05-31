/*
入口文件
*/

import Vue from 'vue'
import {Button, Popup} from 'mint-ui'
Vue.component(Popup.name, Popup);
import App from './App.vue'
import router from './router/router'
import store from './store'
import './mock/mockServer.js'  // 引入虚拟数据
import './fiters/index' // 引入过滤器

// 懒加载
import VueLazyLoad from 'vue-lazyload'
// 载入预加载图片
import loading from './common/imgs/loding.gif'
import error from './common/imgs/error.jpg'
Vue.use(VueLazyLoad,{
  error, // 图片丢失时显示
  loading
})

// 载入高德地图
import  VueAMap from 'vue-amap'
Vue.use(VueAMap)
Vue.config.productionTip = false;
VueAMap.initAMapApiLoader({
  key: '556bf5369f5ae314deff161dacca8670',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView',
    'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor',
    'AMap.CircleEditor', 'AMap.Geolocation']
});

// 全局button的组件标签
Vue.component(Button.name, Button)

var vm = new Vue ({
  el: "#app",
  render: h => h(App),
  router, // 使用上router
  store, // 使用上vuex
})

