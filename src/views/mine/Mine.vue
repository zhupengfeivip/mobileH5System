<template>
  <div class="box">
    <van-button type="info" @click="logout">退出登录</van-button>
  </div>
</template>

<script>
  export default {
    name: "Mine",
    methods: {
      logout(){
        this.$store.commit('logout')
      }
    }
  }
</script>

<style scoped>
  .box{
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
