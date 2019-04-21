/*
入口文件
*/

import Vue from 'vue'
import App from './App.vue'
import router from './router/router'

var vm = new Vue ({
  el: "#app",
  render: h => h(App),
  router
})

