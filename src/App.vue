<template>
    <div>
      <router-view></router-view>
      <FooterGuide v-show="$route.meta.FootShow"></FooterGuide>
    </div>
</template>

<script>
    import FooterGuide from "./components/FooterGuide/FooterGuide.vue"
    import {mapActions} from 'vuex'
    export default {
        // name: "App",
      async mounted() {
        // this.$store.dispatch('getAddress')
        this.getAddress()
        this.getUseInfo()
      },
      components: {
        FooterGuide
      },
      methods: {
        ...mapActions(['getAddress', 'getUseInfo'])
      }
    }
</script>

<style scoped>

</style>
