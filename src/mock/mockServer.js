

import Mock from 'mockjs'
import data from './data.json'

// 模拟数据测试
Mock.mock('/text', { code: 0, data: data.text })

// 商品列表数据模拟
Mock.mock('/goods', { code: 0, data: data.goods })
//评论数据模拟
Mock.mock('/ratings', { code: 0, data: data.ratings })
// 商品详情数据模拟
Mock.mock('/info', { code: 0, data: data.info })


