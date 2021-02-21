<template>
  <div style="padding: 20px; display: flex; justify-content: center; align-items: center">
<!--    <input type="file" @change="triggerFile($event)"/>-->
<!--    <van-button type="primary" block @click="upload">上传</van-button>-->
  </div>
</template>

<script>
  export default {
    name: "Travel",
    methods: {
      triggerFile : function (event) {
        this.params.file =  event.target.files[0]; // (利用console.log输出看file文件对象)
        // do something...
      },
      upload(){
        this.$http.upload("/test/upload", this.params);
      },
    }
  }
</script>

<style scoped>

</style>
