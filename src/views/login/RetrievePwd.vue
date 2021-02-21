<template>
  <div>
    <nav-bar></nav-bar>
    <section style="padding: 30px 30px; display: flex; flex-flow: column nowrap;">
      <div style="font-size: 20px; font-weight: bold;">找回密码</div>
      <div>验证码已通过短信发送至+86&nbsp;{{ tel }}。密码为8-20位，至少包含数字、字母、符号两种组合</div>
      <div>
        <van-cell-group>
          <van-field
                  v-model="code"
                  clearable
                  placeholder="请输入验证码"
                  style="background-color: WhiteSmoke"
                  ref="code"
          >
            <van-button slot="button" size="small" type="default" :disabled="disabled" @click="sendCode">{{ text }}</van-button>
          </van-field>
          <van-field
                  v-model="pwd"
                  center
                  clearable
                  placeholder="请输入要修改的密码"
                  style="background-color: WhiteSmoke"
          >
          </van-field>
        </van-cell-group>
        <span style="color: red" v-show="errMsg">{{ errMsg }}</span>
      </div>
      <div style="background-color: DarkGray">
        <van-button :type="type" block :disabled="loginDisabled" @click="login">完成</van-button>
      </div>
    </section>
  </div>
</template>

<script>
  import NavBar from "@/components/NavBar";
  import {modifyPassword , sendModifyPasswordCode} from "@/api";
  import {isCode} from "@/utils/commons";
  import {Toast} from "vant";

  export default {
    name: "LoginByPwd",
    components: {NavBar},
    mounted(){
      this.$refs.code.focus();
    },
    watch: {
      code(newVal, oldVal){
        this.code = this.code.replace(/\s+/g, '').replace(/\D/g, '');
        if (isNaN(newVal) || newVal.length > 4) {
          this.code = oldVal;
        }
        if(isCode(newVal) && this.pwd.length > 0){
          this.type = 'danger';
          this.loginDisabled = false
        }else{
          this.type = 'default';
          this.loginDisabled = 'disabled'
        }
      },
      pwd(newVal){
        if(isCode(this.code) && newVal.length > 0){
          this.type = 'danger';
          this.loginDisabled = false
        }else{
          this.type = 'default';
          this.loginDisabled = 'disabled'
        }
      }
    },
    data(){
      return {
        loginDisabled: 'disabled',
        type: 'default',
        errMsg: '',
        tel: this.$store.state.phone,
        code: '',
        pwd: '',
        disabled: 'disabled',
        // 发送验证码按钮文字
        text: ''
      }
    },
    methods: {
      // 完成密码修改并进行登录跳转
      login(){
        let params = {
          phone: this.tel,
          code: this.code,
          password: this.pwd
        };
        modifyPassword(params)
            .then(res => {
              if(res.code !== 200){
                this.errMsg = res.msg;
              }else{
                this.$store.commit('login', res.data.token)
              }
            })
      },
      // 发送验证码
      sendCode(){
        let params = {phone: this.tel};
        sendModifyPasswordCode(params).then(res => {
          if(res.code === 200){
            Toast("验证码发送成功")
          }
        });
        this.timer()
      },
      timer(){
        let i = 60;
        this.text = i;
        let timerId = setInterval(() => {
          if(i === 0){
            clearInterval(timerId);
            this.text = "重新发送";
            this.disabled = false;
            return
          }
          this.text = --i;
        }, 1000);
      }
    },
    created(){
      this.sendCode();
    }
  }
</script>

<style scoped>
  section div {
    margin-bottom: 16px;
  }
</style>
