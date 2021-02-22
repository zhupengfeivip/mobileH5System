<template>
  <div>
    <van-cell-group title="登录界面">
      <van-cell title="登录界面一" value="登录和验证码一个页面" />
      <van-cell
        title="登录界面二"
        value="登录和验证码不一个页面"
        is-link
        to="login"
      />
    </van-cell-group>
    <van-cell-group title="分组1">
      <van-cell title="单元格" value="内容" />
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
