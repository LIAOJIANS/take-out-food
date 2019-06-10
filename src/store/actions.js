/*
通过mutation简介更新state的多个方法的对象
 */

import  {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHPOS,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CAR,
  RECEIVE_SEARCH_SHOP,
  MONI_TEXT,
  UPDATA_SHOPS_ID
} from './mutation-types'

import {
  reqAddress,
  reqCategorys,
  reqShops,
  reqUserInfo,
  reqLogout,
  reqShopInfo,
  reqShopRatings,
  reqShopGoods,
  reqSearchShop,
  reqText
} from '../api'

export default  {

  // 异步获取地址
  async getAddress ({commit, state}) {
    // 发送异步ajax请求
    const geohash = state.latitude + ',' + state.longitude
    const result =  await reqAddress(geohash)
    // 提交一个mutation
    if(result.code === 0) {
      const address = result.data
      commit(RECEIVE_ADDRESS, {address})
    }
  },

  // 异步获取食品分类列表
  async getCategorys ({commit}) {
    // 发送异步ajax请求
    const result = await reqCategorys()
    // 提交一个mutation
    if (result.code === 0) {
      const categorys = result.data
      commit(RECEIVE_CATEGORYS, {categorys})
    }
  },

  // 异步获取商家列表
  async getShops ({commit, state}) {
      // 发送异步ajax请求
      const {longitude, latitude} = state
      const result = await reqShops({longitude, latitude})
      // 提交一个mutation
      if (result.code === 0) {
        const shops = result.data
        commit(RECEIVE_SHPOS, {shops})
      }
    },

  // 同步获取用户数据
  recordUser({commit}, userInfo) {
    commit(RECEIVE_USER_INFO, {userInfo})
  },

  // 异步获取用户信息
  async getUseInfo({commit}) {
    const result = await reqUserInfo();
    if(result.code === 0) {
      const userInfo = result.data;
      commit(RECEIVE_USER_INFO, {userInfo});
    }
  },

  // 异步清空用户信息
  async logout({commit}) {
    const result = await reqLogout();
    if(result.code === 0) {
      commit(RESET_USER_INFO)
    }
  },

  // 模拟异步获取后台数据
  async getText({commit}) {
    const result = await reqText();
    if(result.code === 0) {
      const saveText = result.data
      commit(MONI_TEXT, { saveText })
    }
  },

  // 异步获取商家数据
  async getShopInfo({commit}) {
    const result = await reqShopInfo();
    if(result.code === 0) {
      const info = result.data;
      commit(RECEIVE_INFO, {info})
    }
  },

  // 异步获取评论
  async getShopRatings({commit}, callback) {
    const result = await reqShopRatings();
    if(result.code === 0) {
      const ratings = result.data;
      commit(RECEIVE_RATINGS, {ratings})
      callback && callback();
    }
  },

  // 异步获取商品数据
  async getShopGoods({commit}, data) {
    const callback = data.callback;
    const id = data.id;
    const result = await reqShopGoods(id);
    if(result.code === 0) {
      const goods = result.data;
      commit(RECEIVE_GOODS, {goods});
      callback && callback();
    }
  },

  // 更新商家ID
  updataShopId({commit}, id) {
    commit(UPDATA_SHOPS_ID, {id})
  },

  // 同步更新count值
  updateFoodCount({commit}, {isAdd, food}) {
    if(isAdd) {
      commit(INCREMENT_FOOD_COUNT, {food})
    } else {
      commit(DECREMENT_FOOD_COUNT, {food})
    }
  },

  // 清除购物车
  clearShopCar({commit}) {
    commit(CLEAR_CAR)
  },

  // 异步获取搜索商品数据
  async searchShops({commit,state}, keyword) {
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqSearchShop(geohash, keyword);
    if(result.code === 0) {
      const searchShops = result.data
      commit(RECEIVE_SEARCH_SHOP, {searchShops})
    }
  },
}
