<template>
  <div>
    <HeaderTop title="定位"/>
    <div class="goBack" @click="$router.back()">返回</div>
    <el-amap vid="amapDemo" :center="center" :zoom="zoom" :plugin="plugin" class="amap-demo" style="height: 300px; width: 100%;margin-top: 50px"></el-amap>
    <input class="btn" type="button" value="确定位置" @click="$router.push({ path: '/msite' })">
  </div>
</template>

<script>
  import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
  export default {
    data() {
      let self = this;
      return {
        addr:"",
        zoom:16,
        center: [121.59996, 31.197646],
        plugin: [
          {
            pName: "Geolocation",
            events: {
              init(o) {
                // o 是高德地图定位插件实例
                o.getCurrentPosition((status, result) => {
                  // console.log(result.position.lng,result.position.lat);  //  能获取定位的所有信息
                  if (result && result.position) {
                    self.lng = result.position.lng;
                    self.lat = result.position.lat;
                    self.center = [self.lng, self.lat];
                    self.loaded = true;
                    self.$nextTick();
                    sessionStorage.setItem(
                      "id",
                      JSON.stringify(
                        result.position.lng + "," + result.position.lat
                      )
                    );
                  }
                });
              }
            }
          }
        ]
      };
    },
    methods: {
      getlocalhost() {
        // this.addr = window.sessionStorage.id
        // alert(this.addr)

      }
    },
    components: {
      HeaderTop
    }
  }
</script>

<style lang="less" scoped>
  .goBack {
    position: absolute;
    top: 15px;
    left: 10px;
    z-index: 1000000;
    color: #fff;
    font-size: 16px;
  }
  .btn {
    border: 1px solid #02a774;
    background-color: #02a774;
    color: #fff;
    border-radius: 50px;
    width: 150px;
    height: 40px;
    margin-top: 50px;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
  }
</style>
