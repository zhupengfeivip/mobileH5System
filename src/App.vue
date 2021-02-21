<template>
  <div id="app">
    <keep-alive>
      <router-view
        v-if="this.$route.meta.keepAlive"
        :class="[this.tabbarShow ? 'content-height' : 'page-height']"
      />
    </keep-alive>
    <router-view
      v-if="!this.$route.meta.keepAlive"
      :class="[this.tabbarShow ? 'content-height' : 'page-height']"
    />
    <tabbar v-show="this.tabbarShow" />
  </div>
</template>

<script>
import Tabbar from "@/views/layout/Tabbar";
import { mapState } from "vuex"
export default {
  components: {
    Tabbar
  },
  computed: {
    ...mapState({
      tabbarShow: state => state.tabbarShow,
    })
  },
  data() {
    return {

    }
  },
}
</script>

<style>
#app {
  height: 100%;
}
/* 有导航栏的高度 */
.content-height {
  height: calc(100% - 50px);
}
/* 无导航栏高度 */
.page-height {
  height: inherit;
}
.van-tabs__content {
  height: inherit;
}
</style>
