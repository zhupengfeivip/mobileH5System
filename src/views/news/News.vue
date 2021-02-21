<template>
  <van-tabs
          v-model="active"
          animated
          swipeable
          color="#1296db"
  >
    <van-tab title="消息">
     <Message></Message>
    </van-tab>
    <van-tab title="通知">
      <Notify></Notify>
    </van-tab>
  </van-tabs>
</template>

<script>
  import Message from "@/views/news/Message";
  import Notify from "@/views/news/Notify";
  export default {
    name: "index",
    data() {
      return {
        active: 0
      };
    },
    components: {
      Message,
      Notify
    }
  }
</script>

<style scoped>

</style>
