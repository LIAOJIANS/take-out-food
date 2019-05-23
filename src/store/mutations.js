/*
直接更新state的底盘各方法的对象
 */
import  Vue from 'vue'
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
  MONI_TEXT
} from './mutation-types'
export default {
  [RECEIVE_ADDRESS] (state, {address}) {
    state.address = address
  },
  [RECEIVE_CATEGORYS] (state, {categorys}) {
    state.categorys = categorys
  },
  [RECEIVE_SHPOS] (state, {shops}) {
    state.shops = shops
  },
  [RECEIVE_USER_INFO] (state, {userInfo}) {
    state.userInfo = userInfo
  },
  [RESET_USER_INFO] (state) {
    state.userInfo = {}
  },
  // 模拟数据测试
  [MONI_TEXT] (state, {saveText}) {
    state.saveText = saveText
  },
  [RECEIVE_GOODS] (state, {goods}) {
    state.goods = goods
  },
  [RECEIVE_RATINGS] (state, {ratings}) {
    state.ratings = ratings
  },
  [RECEIVE_INFO] (state, {info}) {
    state.info = info
  },
  [INCREMENT_FOOD_COUNT] (state, {food}) {
    if(!food.count) {
      Vue.set(food, 'count', 1);
      state.cartFoods.push(food);
    } else {
      food.count++;
    }
  },
  [DECREMENT_FOOD_COUNT] (state, {food}) {
    if(food.count) {
      food.count--;
      if(food.count === 0 ) {
        state.cartFoods.slice(state.cartFoods.indexOf(food), 1)
      }
    }
  },
  [CLEAR_CAR] (state) {
    // 清空购物车的count值
    state.cartFoods.forEach(food => food.count = 0)
    // 清空购物车的foods
    state.cartFoods = []
  },
  [RECEIVE_SEARCH_SHOP] (state, {searchShops}) {
    state.searchShops = searchShops
  },
}
