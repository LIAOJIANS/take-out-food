#项目报告
##项目目录
* 利用cli脚手架生成固定目录
####MSite.vue为项目首页

旗下子组件为以下：
------
1.头部组件HeaderTop
* 在scr目录中的components创建头部子组件HeaderTop（为公共组件）
* 因为在后续页面都有用到HeaderTop组件，所以内容不能为固定，可以由父组件向子组件传title值

2.ShopList组件
* 用来展示商家信息，从后台获取数据存储在store仓库中
* 利用...mapStroe 从仓库拿到shops的所以信息在用v-for进行渲染
* 用到公共组件Star组件

运用技术
----
1.滑动插件
* npm安装滑动插件
> npm i swiper -S
* 在组件引入CSS样式
>   import 'swiper/dist/css/swiper.min.css'
* 监听页面是否拿到导航栏信息
>```
> categorys (value) {
>          // 界面更新之后立即使用轮播图
>          this.$nextTick(() => {
>              autoplay: true,
>              pagination: {
>                el: '.swiper-pagination',
>                clickable: true
>              }
>            })
>          })
>        }
2. vuex仓库
> npm i vuex -S
* 引用vuex的方法(从仓库拿数据)
> import {mapState} from 'vuex'
* 在页面加载完之前异步加载数据
> this.$store.dispatch('getCategorys')<br>
  this.$store.dispatch('getShops')
3. 逻辑运用（为了使导航栏生成一个二维数组，目的：不让一页超过八个）
* 根据categorys数组生成一个二维数组、小数组中的元素个数最大是8
* 准备二维空数组
> const arr = [];<br>
> let minArr = [];
* 遍历categorys
``` 
         categorys.forEach(c => {
           // 如果当前小数组已经满了，创建一个新数组
           if(minArr.length === 8) {
             minArr = []
           }
          // 如果minArr是空的，将小数组保存到大数组中
           if(minArr.length === 0) {
            arr.push(minArr)
          }
          // 将当前分类保存到小数组中
          minArr.push(c)
         })
``` 
* 后续有空再写以下MD说明(https://github.com/LIAOJIANS/Shan_project)欢迎下载
