<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <!-- 菜单对应的是食物分类列表-->
        <ul>
          <!--current-->
          <!--<li>{{ id }}</li>-->
          <li class="menu-item" v-for="(good, index) in goods" :class="{ current: index===currentIndex}"  @click="clickMenuItem(index)"  :key="index">
            <span class="text">
              <img class="icon" :src="good.icon" v-if="good.icon">
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <!-- 右侧的食物列表是根据左侧的分类列表展现的-->
        <!-- 所以右侧是在一个分类标题列表里面嵌套着各类食物列表-->
        <ul ref="foodsUl">
          <li class="food-list-hook" v-for="(good, index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food, index) in good.foods"
                  :key="index" @click="showFood(food)">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"></CartControl>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCar></ShopCar>
    </div>
    <Food :food="food" ref="food"/>
  </div>
</template>
<script>
    import {mapState} from 'vuex'
    import BScroll from 'better-scroll'
    import ShopCar from '../../../components/ShopCar/ShopCar.vue'
    import CartControl from '../../../components/CartControl/CartControl.vue'
    import Food from '../../../components/Food/Food.vue'
    export default {
      data() {
        return {
          tops: [], // 所有右侧分类li的top组成的数组
          scrollY: 0,// 右侧滑动的Y轴坐标（滑动过程实时变化）
          food: {}, //需要显示的food
        }
      },
      mounted() {
        // alert(id)
        const id = this.id
        // this.$store.dispatch("getShopGoods", () => {  // 数据更新后执行
        //   this.$nextTick(() => { // 列表更新后执行
        //     this._initScroll();
        //     this.initTops();
        //   });
        // } );
        // alert(this.id);
        this.$store.dispatch("getShopGoods",{  // 数据更新后执行
            callback: () => {
              this.$nextTick(() => { // 列表更新后执行
                this._initScroll();
                this.initTops();
              });
            },
            id: id
        });
      },
      methods: {
        _initScroll() {
          // 列表显示后执行
          new BScroll('.menu-wrapper', {
            click:true
          });
          this.foodsScorll = new BScroll('.foods-wrapper', {
            probeType:2, // 因为惯性引起的滑动不出发
            click:true
          });
          this.foodsScorll.on('scroll', ({x, y}) => {
            console.log(x, y)
            this.scrollY = Math.abs(y);
          });
          // 监听结束时的位置
          this.foodsScorll.on('scrollEnd', ({x, y}) => {
            console.log("scrollEnd" + x, y);
            this.scrollY = Math.abs(y);
          })
        },
        initTops() {
          // 创建一个统计状态的空数组
          const tops = [];
          // 初始化top
          let top = 0;
          tops.push(top);
          // 获取li列表元素
          const lis = this.$refs.foodsUl.getElementsByClassName('food-list-hook');
          // 把li列表元素转换的伪数组转换为数组
          Array.prototype.slice.call(lis).forEach(li => {
            // 储存他们的位置
            top += li.clientHeight;
            tops.push(top);
          });
          this.tops = tops;
          console.log(this.tops)
        },
        clickMenuItem (index) {
          // console.log(index)
          // 使用右侧列表滑动到对应的位置

          // 得到目标位置的scrollY
          const scrollY = this.tops[index]
          // 立即更新scrollY(让点击的分类项成为当前分类)
          this.scrollY = scrollY
          // 平滑滑动右侧列表 better-scroll里的方法
          this.foodsScorll.scrollTo(0, -scrollY, 300)
        },
        showFood(food) {
          this.food = food
          this.$refs.food.toggleShow();
        }
      },
      computed: {
        ...mapState(['goods', 'id']),
        currentIndex () {
          // 得到条件数据
          const {scrollY, tops} = this;
          // 根据条件计算产生一个结果
          const index = tops.findIndex((top, index) => {
            // scrollY>=当前top && scrollY<下一个top
            return scrollY>=top && scrollY < tops[index + 1]
          });
          // 返回结果(也就是当前的scrollY值属于第几个li区间)
          return index;
        }
      },
      components: {
        ShopCar,
        CartControl,
        Food
      }
    }
</script>

<style lang="less" scoped>
  .goods {
    display: flex;
    position: absolute;
    top: 195px;
    bottom: 46px;
    width: 100%;
    background: #fff;
    overflow: hidden;
    .menu-wrapper {
      flex: 0 0 80px;
      width: 80px;
      background: #f3f5f7;
      .menu-item {
        display: table;
        height: 54px;
        width: 56px;
        padding: 0 12px;
        line-height: 14px;
        &.current {
          position: relative;
          z-index: 10;
          margin-top: -1px;
          background: #fff;
          color: #02a774;
          font-weight: 700;
          .text {
            border: none;
          }
        }
        .icon {
          display: inline-block;
          vertical-align: top;
          width: 12px;
          height: 12px;
          margin-right: 2px;
          -webkit-background-size: 12px 12px;
          background-size: 12px 12px;
          background-repeat: no-repeat;
        }
        .text {
          display: table-cell;
          width: 56px;
          vertical-align: middle;
          position: relative;
          border: none;
          font-size: 12px;
          &:after {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 1px;
            background-color: rgba(7, 17, 27, 0.1);
            transform: scaleY(0.5);
          }
        }
      }
    }
    .foods-wrapper {
      flex: 1;
      .title {
        padding-left: 14px;
        height: 26px;
        line-height: 26px;
        border-left: 2px solid #d9dde1;
        font-size: 12px;
        color: rgb(147, 153, 159);
        background: #f3f5f7;
      }
      .food-item {
        display: flex;
        margin: 18px;
        padding-bottom: 18px;
        position: relative;
        border: none;
        &:after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 1px;
          background-color: rgba(7, 17, 27, 0.1);
          transform: scaleY(0.5);
        }
        &:last-child {
          border: none;
          margin-bottom: 0;
        }
        .icon {
          flex: 0 0 57px;
          margin-right: 10px;
        }
        .content {
          flex: 1;
          .name {
            margin: 2px 0 8px 0;
            height: 14px;
            line-height: 14px;
            font-size: 14px;
            color: rgb(7, 17, 27);
          }
          .desc, .extra {
            line-height: 10px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
          .desc {
            line-height: 12px;
            margin-bottom: 8px;
          }
          .extra {
            .count {
              margin-right: 12px;
            }
          }
          .price {
            font-weight: 700;
            line-height: 24px;
            .now {
              margin-right: 8px;
              font-size: 14px;
              color: rgb(240, 20, 20);
            }
            .old {
              text-decoration: line-through;
              font-size: 10px;
              color: rgb(147, 153, 159);
            }
          }
          .cartcontrol-wrapper {
            position: absolute;
            right: 0;
            bottom: 12px;
          }
        }
      }
    }
  }
</style>
