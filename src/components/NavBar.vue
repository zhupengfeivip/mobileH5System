<template>
  <van-nav-bar>
    <van-icon name="arrow-left" slot="left" color="#000" size=".46rem" @click="back"></van-icon>
  </van-nav-bar>
</template>

<script>
  export default {
    name: "NavBar",
    methods: {
      back() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped>

</style>
