<template>
  <div style="padding: 20px;">
    <div class="title">用户列表：</div>
    <van-divider></van-divider>
    <van-pull-refresh v-model="loading" @refresh="onLoad">
      <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
      >
        <div v-for="item in list" :key="item.userId">
          <van-row gutter="20">
            <van-col span="8">
              <van-image width="80" height="80" :src="item.avatar"></van-image>
              <van-divider></van-divider>
            </van-col>
            <van-col span="16">
              <van-row gutter="15">
                <van-col span="16">{{ item.name === null ? 'null' : item.name }}</van-col>
                <van-col span="8">{{ item.sex === 0 ? '男' : '女' }}</van-col>
              </van-row>
              <van-divider></van-divider>
              <van-row type="flex" justify="space-between">
                <van-col span="6">{{ item.phone }}</van-col>
              </van-row>
            </van-col>
          </van-row>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import {Toast} from 'vant'

export default {
  name: 'Home',
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      isLoading: false,
      count: 0
    }
  },
  methods: {
    onLoad() {
      this.$http.get("/user")
          .then(res => {
            if (res.code === 200) {
              if (this.count !== 0) {
                Toast("刷新成功");
              }
              this.count++;
              this.list = res.data;
            }
            // 加载状态结束
            this.loading = false;

            // 数据全部加载完成
            if (this.list.length >= 1) {
              this.finished = true;
            }
          })
    },
    // // 滚动到底部
    // scrollToBottom: function () {
    //   this.$nextTick(() => {
    //     let container = this.$el.querySelector(".content");
    //     container.scrollTop = container.scrollHeight;
    //   })
    // },
  },
  // updated(){
  //   this.scrollToBottom()
  // }
}
</script>

<style>
.title {
  font-weight: 600;
  font-size: 18px;
}

.van-pull-refresh {
  height: 90%;
}

.van-pull-refresh /deep/ .van-pull-refresh__track {
  height: inherit;
}
</style>
