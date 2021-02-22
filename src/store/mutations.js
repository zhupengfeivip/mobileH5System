import router from "@/router";
import { Toast } from "vant";

export default {
  /**
   * 退出登录
   */
  logout(state) {
    state.token = null;
    // 清除token
    localStorage.removeItem('token');
    // 跳转到登录页面
    router.replace('/')
      .catch(err => console.warn(err));
    Toast('退出成功')
  },

  /**
   * 登录
   * @param state
   * @param token
   */
  login(state, data) {
    state.token = data.token;
    // 切换tabbar为显示状态
    // this.commit('toggleTabbarShow', true);
    // 保存token到localStorage
    localStorage.setItem('token', data.token);
    // 保存refreshToken到localStorage
    // localStorage.setItem('refreshToken', data.refreshToken);
    // 跳转到首页
    // router.replace('/')
    //   .catch(err => console.warn(err));
    // Toast('登录成功');
  },

  /**
   * 切换tabbar显示
   * @param state
   * @param booleanVal
   */
  toggleTabbarShow(state, booleanVal) {
    state.tabbarShow = booleanVal
  },

  /**
   * 更新手机号
   * @param state
   * @param phone
   */
  updatePhone(state, phone) {
    state.phone = phone;
    localStorage.setItem("phone", phone)
  },

  /**
   * 更新token
   * @param state
   * @param token
   */
  updateToken(state, data) {
    state.token = data.token;
    localStorage.setItem("token", data.token)
    localStorage.setItem("refreshToken", data.refreshToken)
  },

  /**
   *
   * @param state
   * @param token
   * @param refreshToken
   */
  deleteToken(state) {
    state.token = null;
    localStorage.removeItem("token")
    localStorage.removeItem("refreshToken")
  }
};

