<template>
  <div>
    <nav-bar></nav-bar>
    <section style="padding: 30px 30px; display: flex; flex-flow: column nowrap;">
      <div style="font-size: 20px; font-weight: bold;">手机号密码登录</div>
      <div>
        <van-cell-group>
          <van-field
                  v-model="tel"
                  clearable
                  placeholder="请输入手机号"
                  style="background-color: WhiteSmoke"
                  ref="phone"
                  @blur="blur"
          >
          </van-field>
          <van-field
                  v-model="pwd"
                  center
                  clearable
                  placeholder="请输入密码"
                  style="background-color: WhiteSmoke"
                  ref="pwd"
                  type="password"
          >
          </van-field>
        </van-cell-group>
        <span style="color: red" v-show="errMsg">{{ errMsg }}</span>
      </div>
      <div style="background-color: DarkGray">
        <van-button :type="type" block :disabled="loginDisabled" @click="login">登录</van-button>
      </div>
      <div>
        忘记了？&nbsp;<a @click="toRetrievePwd">找回密码</a>
      </div>
    </section>
  </div>
</template>

<script>
  import NavBar from "@/components/NavBar";
  import {isPhone} from "@/utils/commons";
  import { loginByPwd } from "@/api";

  export default {
    name: "LoginByPwd",
    components: {NavBar},
    mounted(){
      // 输入框聚焦
      if(!this.tel){
        this.$refs.phone.focus();
      }else {
        this.$refs.pwd.focus();
      }
    },
    watch:{
      // 监听手机号和密码输入框，修改登录按钮状态和类型
      pwd(newVal){
        if(isPhone(this.tel) && newVal.length > 0){
          this.loginDisabled = false;
          this.type = 'danger'
        } else {
          this.loginDisabled = 'disabled';
          this.type = 'default'
        }
      },
      tel(newVal, oldVal){
        this.tel = this.tel.replace(/\s+/g, '').replace(/\D/g, '');
        if (isNaN(newVal) || newVal.length > 11) {
          this.tel = oldVal;
          return
        }
        if(isPhone(this.tel) && this.pwd.length > 0){
          this.loginDisabled = false;
          this.type = 'danger'
        } else {
          this.loginDisabled = 'disabled';
          this.type = 'default'
        }
      }
    },
    data(){
      return {
        // 登录按钮类型
        type: 'default',
        // 手机号
        tel: this.$store.state.phone,
        // 密码
        pwd: '',
        // 错误提示信息
        errMsg: '',
        // 登录按钮是否禁用
        loginDisabled: 'disabled'
      }
    },
    methods: {
      blur(){
        // 修改store中phone
        if(isPhone(this.tel)){
          this.$store.commit('updatePhone', this.tel)
        }
      },
      // 登录
      login(){
        let params = {
          phone: this.tel,
          password: this.pwd
        };
        loginByPwd(params)
            .then(res => {
              if(res.code !== 200){
                this.errMsg = res.msg;
                // 密码输入错误时重新聚焦输入框
                this.$refs.pwd.focus();
              } else {
                this.$store.commit('login', res.data);
              }
            })
      },
      // 去找回密码
      toRetrievePwd(){
        if(!isPhone(this.tel)){
          this.errMsg = "手机号填写错误";
          this.$refs.phone.focus()
        }else{
          this.$router.push('/retrievePwd');
          this.errMsg = ''
        }
      }
    }
  }
</script>

<style scoped>
  section div {
    margin-bottom: 16px;
  }
</style>
