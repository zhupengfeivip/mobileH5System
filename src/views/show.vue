<template>
  <div>
    <van-notice-bar
      wrapable
      :scrollable="false"
      text="本页页仅展示后台系统用到的相关功能，您可以根据您的需要选择您用到的功能。"
    />
    <van-cell-group title="登录界面">
      <van-cell
        title="登录界面一"
        value="登录和验证码一个页面"
        is-link
        to="login2"
      />
      <van-cell
        title="登录界面二"
        value="登录和验证码不一个页面"
        is-link
        to="login"
      />
    </van-cell-group>
    <van-cell-group title="功能界面">
      <van-cell title="主界面一" value="内容" is-link to="home" />
    </van-cell-group>
    <van-cell-group title="系统管理">
      <van-cell title="操作员管理" value="内容" is-link to="list1" />
      <van-cell title="列表二" value="内容" is-link to="list2" />
    </van-cell-group>
  </div>
</template>

<script type="text/javascript">

export default {
  components: {},
  computed: {
  },
  data() {
    return {
    }
  },
  created() {

  },
  methods: {
    onLoad() {
    },

  }
}

</script>

<style>
</style>
