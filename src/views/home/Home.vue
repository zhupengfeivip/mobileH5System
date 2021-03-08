<template>
  <van-form>
    <van-swipe class="my-swipe" :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" />
      </van-swipe-item>
    </van-swipe>
    <van-cell-group>
      <van-cell
        title="监控中心"
        icon="browsing-history-o"
        value="实时查看设备状态"
        is-link
        to="monit"
      />
      <van-cell
        title="客户管理"
        icon="manager-o"
        value="管理客户信息"
        is-link
        to="company"
      />
      <van-cell
        title="操作员管理"
        icon="user-o"
        value="管理操作员"
        is-link
        to="operator"
      />
      <van-cell
        title="设备管理"
        icon="idcard"
        value="管理设备信息"
        is-link
        to="device"
      />
      <van-cell
        title="修改密码"
        icon="passed"
        value="修改当前用户密码"
        is-link
        to="modify_operator_pwd"
      />
    </van-cell-group>
  </van-form>
</template>

<script>
// import { } from 'vant'
// import { getInfo } from '../../src/utils/api.js'
// import { mapGetters } from 'vuex'

export default {
  components: {},
  computed: {
    // ...mapGetters([
    //   'name',
    //   'avatar',
    //   'roles'
    // ])
  },
  data() {
    return {
      images: [
        require('../../assets/image/home/apple-1x180.png'),
        require('../../assets/image/home/apple-2x180.png')
      ]
    }
  },
  created() {
    // this.getInfo()
  },
  methods: {
    async getInfo() {
      // const { roles } = await this.$store.dispatch('user/getInfo')
      // console.log(roles);
    }

  }
}

</script>

<style>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #fff;
  height: 160px;
  padding-bottom: 50px;
  padding-top: 30px;
}
</style>
