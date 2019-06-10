/*
  这是路由入口
*/

import Vue from 'vue'
import VueRouter from 'vue-router'
// 使用插件
Vue.use(VueRouter)

//引用组件
// 路由组件懒加载，用在大型外层组键上
// const Msite () => import('../pages/MSite/MSite.vue')
// 以下路由板块少，不需要路由懒加载，浪费请求
import Msite from '../pages/MSite/MSite.vue'
import Localhost from '../pages/Localhost/Localhost.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Search from '../pages/Search/Search.vue'
import Login from '../pages/Login/Login.vue'
import Shop from '../pages/Shop/Shop.vue'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods.vue'
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings.vue'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo.vue'
import UserInfo from '../pages/UserInfo/UserInfo.vue'
import OrderForGoods from '../pages/OrderForGoods/OrderForGoods.vue'
import Integral from '../pages/Integral/Integral.vue'
import MembershipCard from '../pages/MembershipCard/MembershipCard.vue'
import ServiceCentre from '../pages/ServiceCentre/ServiceCentre.vue'
import Receipt from '../pages/Receipt/Receipt.vue'
// 暴露路由
export default new VueRouter ({
  routes:[
    { path: '/', redirect: '/msite' },
    { path: '/localhost', component: Localhost },
    { path: "/msite", component: Msite, meta:{ FootShow: true, localhostShow: true } },
    { path: '/order', component: Order, meta:{ FootShow: true }, name: 'order' },
    { path: '/profile', component: Profile, meta:{ FootShow: true } },
    { path: '/search', component: Search, meta:{ FootShow: true } },
    { path: '/login', component: Login },
    { path: '/shop', component: Shop, children: [
        {
          path: '/shop/goods',
          component: ShopGoods,
          name: 'shop'
        },
        {
          path: '/shop/info',
          component: ShopInfo
        },
        {
          path: '/shop/ratings',
          component: ShopRatings
        },
        {
          path: '',
          redirect: '/shop/goods'
        }
      ]},
    { path: '/userinfo', component: UserInfo },
    { path: '/orderforgoods', component: OrderForGoods },
    { path: '/integral', component: Integral },
    { path: '/membershipcard', component: MembershipCard },
    { path: '/servicecentre', component: ServiceCentre },
    { path: '/receipt', component: Receipt }
  ]
})
