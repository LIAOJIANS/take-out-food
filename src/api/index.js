/*
与后台交互模块 （依赖已封装的ajax函数）
https://www.fhyiii.cn/ljs/
 */
import ajax from './ajax'

// const BASE_URL = 'http://local:4000'
const BASE_URL = '/api'
// const Ba = 'http://10.12.226.10'
// const Ba = 'http://110.64.211.210/takeout/waimaiapi/home'
/**
 * 获取地址信息(根据经纬度串)
 * 这个接口的经纬度参数是在url路径里的，没有query参数
 * http://10.12.226.10/waimaiapi/index2/position/position/geohash/
 */
export const reqAddress = geohash => ajax(`${BASE_URL}/api/home/position/geohash/${geohash}`)
// export const reqAddress = geohash => ajax(`${Ba}/position/geohash/${geohash}`)
/**
 * 获取 msite 页面食品分类列表
 * http://10.12.226.10/waimaiapi/index2/index_category/index_category
 */
// export const reqCategorys = () => ajax(Ba + '/index_category')
export const reqCategorys = () => ajax(BASE_URL + '/api/home/index_category')

/**
 * 获取 msite 商铺列表(根据query参数：经纬度)
 * 将经纬度两个数据作为一个参数对象传入
 * 也可以两个数据分别传入ajax， 然后再放入一个对象参数内， 如下面的手机号接口
 * http://10.12.226.10/waimaiapi/index2/llist/shops
 * http://10.12.226.10/waimaiapi/index2/shops/shops
 */
export const reqShops = ({latitude, longitude}) => ajax(BASE_URL + '/api/home/shops', {latitude, longitude})
// export const reqShops = ({latitude, longitude}) => ajax(Ba + '/shops', {latitude, longitude})
/**
 * 根据经纬度和关键字搜索商铺列表
 * search_shops
 */
// export const reqSearchShop = (geohash, keyword) => ajax(Ba + '/search_shops', {geohash, keyword})
export const reqSearchShop = (geohash, keyword) => ajax( BASE_URL+ '/api/home/search_shops', {geohash, keyword})
/**
 * 账号密码登录
 *
 * http://10.34.62.29/takeout/waimaiapi/index2/login_pwd/login_pwd
 *
 */
export const reqPwdLogin = ({name, pwd, captcha}) => ajax(BASE_URL + '/api/home/login_pwd', {name, pwd, captcha}, 'POST')
// export const reqPwdLogin = ({name, pwd, captcha}) => ajax(Ba + '/login_pwd', {name, pwd, captcha}, 'POST')
/**
 * 获取短信验证码
 */
// export const reqSendCode = phone => ajax(BASE_URL + '/sendcode', {phone})
export const reqSendCode = phone => ajax(BASE_URL + '/api/home/sendcode', {phone})
/**
 * 手机号验证码登录
 */
// export const reqSmsLogin = (phone, code) => ajax(BASE_URL + '/login_sms', {phone, code}, 'POST')
export const reqSmsLogin = (phone, code) => ajax(BASE_URL + '/api/home/login_sms', {phone, code}, 'POST')
/**
 * 获取用户信息(根据会话)
 */
export const reqUserInfo = () => ajax(BASE_URL + '/api/home/userinfo')
/**
 * 请求登出
 */
export const reqLogout = () => ajax(BASE_URL + '/api/home/logout')
// export const reqLogout = () => ajax(BASE_URL + '/logout')
/**
 * 模拟数据测试(下列请求由mock拦截并返回 不需要代理)
 */
export const reqText = () => ajax('/text')
/**
 * 获取商家信息
 */
export const reqShopInfo = () => ajax('/info')
/**
 * 获取商家评价数组
 */
export const reqShopRatings = () => ajax('/ratings')
/**
 * 获取商家商品数组
 */
// export const reqShopGoods = () => ajax('/goods')
export const reqShopGoods = ( id ) => ajax(BASE_URL + '/api/home/foods', { id }, 'POST')
