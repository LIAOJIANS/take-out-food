/*
与后台交互模块 （依赖已封装的ajax函数）
 */
import ajax from './ajax'
// const BASE_URL = 'http://local:4000'
const BASE_URL = '/api'
const Ba = 'http://10.12.226.10'
/**
 * 获取地址信息(根据经纬度串)
 * 这个接口的经纬度参数是在url路径里的，没有query参数
 * http://10.12.226.10/waimaiapi/index2/position/position/geohash/
 */
export const reqAddress = geohash => ajax(`${BASE_URL}/position/${geohash}`)
// export const reqAddress = geohash => ajax(`${ Ba}/waimaiapi/index2/position/position/geohash/${geohash}`)
/**
 * 获取 msite 页面食品分类列表
 * http://10.12.226.10/waimaiapi/index2/index_category/index_category
 */
// export const reqCategorys = () => ajax(Ba + '/waimaiapi/index2/index_category/index_category')
export const reqCategorys = () => ajax(BASE_URL + '/index_category')

/**
 * 获取 msite 商铺列表(根据query参数：经纬度)
 * 将经纬度两个数据作为一个参数对象传入
 * 也可以两个数据分别传入ajax， 然后再放入一个对象参数内， 如下面的手机号接口
 * http://10.12.226.10/waimaiapi/index2/llist/shops
 * http://10.12.226.10/waimaiapi/index2/shops/shops
 */
export const reqShops = ({latitude, longitude}) => ajax(BASE_URL + '/shops', {latitude, longitude})
// export const reqShops = ({latitude, longitude}) => ajax(Ba + '/waimaiapi/index2/llist/shops', {latitude, longitude})
/**
 * 根据经纬度和关键字搜索商铺列表
 */
export const reqSearchShop = (geohash, keyword) => ajax(BASE_URL + '/search_shops', {geohash, keyword})
/**
 * 账号密码登录
 */
export const reqPwdLogin = ({name, pwd, captcha}) => ajax(BASE_URL + '/login_pwd', {name, pwd, captcha}, 'POST')
/**
 * 获取短信验证码
 */
export const reqSendCode = phone => ajax(BASE_URL + '/sendcode', {phone})
/**
 * 手机号验证码登录
 */
export const reqSmsLogin = (phone, code) => ajax(BASE_URL + '/login_sms', {phone, code}, 'POST')
/**
 * 获取用户信息(根据会话)
 */
export const reqUserInfo = () => ajax(BASE_URL + '/userinfo')
/**
 * 请求登出
 */
export const reqLogout = () => ajax(BASE_URL + '/logout')
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
export const reqShopGoods = () => ajax('/goods')
