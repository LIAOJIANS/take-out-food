<template>
    <div>
      <router-view></router-view>
      <FooterGuide v-show="$route.meta.FootShow"></FooterGuide>
    </div>
</template>

<script>
    import FooterGuide from "./components/FooterGuide/FooterGuide.vue"
    export default {
        name: "App",
        components: {
          FooterGuide
        }
    }
</script>

<style scoped>

</style>
