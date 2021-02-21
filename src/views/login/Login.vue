<template>
  <div>
    <van-nav-bar>
      <van-icon name="cross" slot="left" color="#000" size=".46rem" @click="close"></van-icon>
    </van-nav-bar>
    <section style="padding: 30px 30px;">
      <div style="font-size: 20px; font-weight: bold">登录后即可正常使用</div>
      <div>登录即代表同意&nbsp;<a>用户协议</a>&nbsp;和&nbsp;<a>隐私协议</a></div>
      <div>
        <van-cell-group>
          <van-field
                  @blur="blur"
                  ref="phone"
                  v-model="tel"
                  type="tel"
                  placeholder="请输入手机号"
                  clearable
                  style="background-color: WhiteSmoke"></van-field>
        </van-cell-group>
      </div>
      <div>未注册的手机号验证通过后将自动注册</div>
      <div style="background-color: DarkGray">
        <van-button :type="type" :disabled="disabled" size="large" @click="getCode">获取短信验证码</van-button>
      </div>
      <div class="space-between">
        <a @click="toPwdLogin">密码登录</a>
        <a @click="show = true">其它方式登录</a>
      </div>
    </section>
    <van-action-sheet
            v-model="show"
            :actions="actions"
            cancel-text="取消"
            @cancel="onCancel"
            @select="onSelect"
    >
    </van-action-sheet>
  </div>
</template>

<script>
  import {isPhone} from '@/utils/commons'

  export default {
    name: "Login",
    data() {
      return {
        tel: this.$store.state.phone,
        disabled: 'disabled',
        type: 'default',
        show: false,
        actions: [
          {name: 'QQ登录', index: 0},
          {name: '微信登录', index: 1},
          {name: '微博登录', index: 2}
        ]
      }
    },
    activated(){
      this.$refs.phone.focus();
      this.tel = this.$store.state.phone
      this.checkPhone(this.tel)
    },
    watch: {
      // 监听手机号输入，不让其输入数字以外的字符，包含空格和.
      tel(newVal, oldVal) {
        // 如果不是数字则让其等于旧值
        this.tel = this.tel.replace(/\s+/g, '').replace(/\D/g, '');
        if (isNaN(newVal) || newVal.length > 11) {
          this.tel = oldVal;
          return
        }
        this.checkPhone(newVal)
      }
    },
    methods: {
      // 手机号输入框校验
      checkPhone(newVal){
        if (isPhone(newVal)) {
          this.disabled = false;
          this.type = 'danger';
        } else {
          this.disabled = 'disabled';
          this.type = 'default';
        }
      },
      // 手机号输入框失去焦点事件
      blur(){
        // 修改store中phone
        if(isPhone(this.tel)){
          this.$store.commit('updatePhone', this.tel)
        }
      },
      // 去密码登录页面
      toPwdLogin() {
        this.$router.push('/loginByPwd')
      },
      // 获取验证码
      getCode() {
        this.$router.push('/loginByCode')
      },
      // 关闭登录页面
      close() {
        this.$router.back();
        // 切换导航栏显示
        this.$store.commit('toggleTabbarShow', true)
      },
      onCancel() {
        this.show = false;
      },
      onSelect(item) {
        switch (item.index) {
          case 0:
            console.log('QQ');
            break;
          case 1:
            console.log('微信');
            break;
          case 2:
            console.log('微博');
            break;
        }
        this.show = false;
      }
    }
  }
</script>

<style scoped>
  .space-between {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  section div {
    margin-bottom: 20px;
  }
</style>
