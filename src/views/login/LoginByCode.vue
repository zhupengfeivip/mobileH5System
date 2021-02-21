<template>
  <div>
    <nav-bar />
    <section
      style="padding: 30px 30px; display: flex; flex-flow: column nowrap"
    >
      <div style="font-size: 20px; font-weight: bold">请输入验证码</div>
      <div>验证码已通过短信发送至&nbsp;{{ tel }}</div>
      <div>
        <van-cell-group>
          <van-field
            v-model="sms"
            center
            clearable
            placeholder="请输入验证码"
            style="background-color: WhiteSmoke"
            ref="code"
          >
            <van-button
              slot="button"
              size="small"
              type="default"
              :disabled="disabled"
              @click="sendCode"
              >{{ text }}</van-button
            >
          </van-field>
        </van-cell-group>
        <span style="color: red" v-show="errMsg">{{ errMsg }}</span>
      </div>
      <div style="background-color: DarkGray">
        <van-button :type="type" block :disabled="loginDisabled" @click="login"
          >登录</van-button
        >
      </div>
    </section>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import { isCode } from '@/utils/commons'
import { sendLoginCode, loginByCode } from "@/api";

export default {
  name: "LoginByCode",
  components: { NavBar },
  watch: {
    sms(newVal, oldVal) {
      this.sms = this.sms.replace(/\s+/g, '').replace(/\D/g, '');
      if (isNaN(newVal) || newVal.length > 4) {
        this.sms = oldVal;
      }
      if (isCode(newVal)) {
        this.login();
        this.type = 'danger';
        this.loginDisabled = false
      } else {
        this.type = 'default';
        this.loginDisabled = 'disabled'
      }
    }
  },
  mounted() {
    this.$refs.code.focus()
  },
  data() {
    return {
      tel: this.$store.state.phone,
      sms: '',
      text: '发送验证码',
      disabled: false,
      loginDisabled: 'disabled',
      type: 'default',
      errMsg: '',
    }
  },
  methods: {
    // 验证码登录
    login() {
      let params = {
        phone: this.tel,
        code: this.sms
      };
      loginByCode(params)
        .then(res => {
          if (res.code !== 200) {
            this.errMsg = res.msg
          } else {
            this.$store.commit('login', res.data);
          }
        })
    },
    // 发送验证码
    sendCode() {
      let params = {
        phone: this.tel
      };
      sendLoginCode(params).then(data => {
        console.log(data)
        if (data.code === 200) {
          this.disabled = 'disabled';
          this.timer()
        }
      });
    },
    // 60s计时器
    timer() {
      let i = 60;
      this.text = i;
      let timerId = setInterval(() => {
        if (i === 0) {
          clearInterval(timerId);
          this.text = "重新发送";
          this.disabled = false;
          return
        }
        this.text = --i;
      }, 1000);
    }
  },
  created() {
    this.sendCode();
  }
}
</script>

<style scoped>
section div {
  margin-bottom: 16px;
}
</style>
