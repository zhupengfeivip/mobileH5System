<template>
  <van-tabbar v-model="active" route>
    <van-tabbar-item replace to="/home">
      <span>首页</span>
      <img
        slot="icon"
        slot-scope="props"
        :src="props.active ? icon.home_active : icon.home_inactive"
        alt=""
      />
    </van-tabbar-item>

    <van-tabbar-item replace to="/travel">
      <span>行程</span>
      <img
        slot="icon"
        slot-scope="props"
        :src="props.active ? icon.travel_active : icon.travel_inactive"
        alt=""
      />
    </van-tabbar-item>

    <div class="tabbar-item"></div>
    <img class="addImg" :src="icon.add" alt="" />

    <van-tabbar-item replace to="/news">
      <span>消息</span>
      <img
        slot="icon"
        slot-scope="props"
        :src="props.active ? icon.news_active : icon.news_inactive"
        alt=""
      />
    </van-tabbar-item>

    <van-tabbar-item replace to="/mine">
      <span>我的</span>
      <img
        slot="icon"
        slot-scope="props"
        :src="props.active ? icon.mine_active : icon.mine_inactive"
        alt=""
      />
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>

export default {
  name: "Tabbar",
  data() {
    return {
      active: 0,
      icon: {
        home_active: require('../../assets/image/tabbar/home_active.svg'),
        home_inactive: require('../../assets/image/tabbar/home.svg'),
        travel_active: require('../../assets/image/tabbar/travel_active.svg'),
        travel_inactive: require('../../assets/image/tabbar/travel.svg'),
        news_active: require('../../assets/image/tabbar/news_active.svg'),
        news_inactive: require('../../assets/image/tabbar/news.svg'),
        mine_active: require('../../assets/image/tabbar/mine_active.svg'),
        mine_inactive: require('../../assets/image/tabbar/mine.svg'),
        add: require('../../assets/image/tabbar/add.svg'),
      }
    }
  },
  methods: {}
}
</script>

<style scoped>
.addImg {
  width: 54px;
  height: 54px;
  position: absolute;
  z-index: 1;
  left: 50%;
  margin-left: -27px;
  bottom: 14px;
}

.tabbar-item {
  flex: 1;
}
</style>
