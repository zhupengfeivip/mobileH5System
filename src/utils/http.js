import axios from 'axios'
import store from '@/store'
import QS from 'qs'
import { Toast } from "vant";
import router from "@/router";

/**
 * 定义请求常量
 * TIME_OUT, BASE_URL
 */
export const timeout = 5000;    // 请求超时时间
// export const baseURL = 'http://127.0.0.1:8888';   // 引入全局url
export const baseURL = '/api';

// 创建axios实例
const instance = axios.create({
  baseURL,
  timeout
});

instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 封装请求拦截
instance.interceptors.request.use(
  config => {
    const token = store.state.token;
    if (token != null) {                          // 如果token不为null，否则传token给后台
      config.headers['X-Token'] = token
    }
    return config
  },
  error => {
    console.warn(error);
    return Promise.reject(error)
  }
);

// 封装响应拦截，判断token是否过期
instance.interceptors.response.use(
  response => {
    let { data } = response;
    // refreshToken过期,重新登录
    if (data.code === 1010) {
      // 提示认证过期
      Toast(data.msg);
      // 删除本地token
      store.commit("deleteToken")
      // 不让底部导航栏展示
      store.commit("toggleTabbarShow", false)
      // 跳转到登录页面
      router.replace("/login")
      return;
    }
    // 如果后台返回的错误标识为token过期，则重新登录
    if (data.code === 1007) {
      refreshToken(response);
      return Promise.resolve(response.data)
    }
    if (data.code !== 200) {
      Toast(data.msg);
    } else {
      return Promise.resolve(response.data)
    }
  },
  error => {
    if (error.response.status === 401) {
      Toast("没有相关权限");
      return;
    }
    if (error.response.status === 500) {
      Toast("服务器错误");
      return;
    }
    if (error.message === 'Network Error') {
      Toast("网络异常");
      return;
    }
    return Promise.reject(error)
  }
);
// 是否刷新token标识
let isRefreshing = true;
// 刷新token
function refreshToken(response) {
  // 刷新token的函数，这里需要添加一个函数，防止重复请求
  if (isRefreshing) {
    // 请求刷新token
    refreshTokenRequest()
  }
  isRefreshing = false;
  // 添加重试请求
  const retryOriginalRequest = new Promise((resolve => {
    // 添加请求函数到Promise函数集合
    addSubscriber(() => {
      let config = response.config
      resolve(http.request(config.url, config.method, config.params))
    });
    return retryOriginalRequest;
  }))
}

// 刷新token的请求函数
function refreshTokenRequest() {
  const refreshToken = localStorage.getItem("refreshToken");
  let params = {
    refreshToken
  }
  instance.post('/login/token/refresh', QS.stringify(params)).then(res => {
    // 修改localStorage与vuex中的token
    store.commit("updateToken", res.data)
    onAccessTokenFetched();
    // 修改刷新标识
    isRefreshing = true;
  })
}

// Promise函数集合
let subscribers = [];

function onAccessTokenFetched() {
  subscribers.forEach((callback) => {
    callback();
  })
  subscribers = [];
}

// 添加请求函数到Promise函数集合
function addSubscriber(callback) {
  subscribers.push(callback)
}


class http {
  static async request(url, method, params) {
    return await instance.request({
      url: url,
      method: method,
      params: params
    })
  }

  static async get(url, params) {
    return await instance.get(url, { params: params })
  }

  static async post(url, params) {
    return await instance.post(url, QS.stringify(params))
  }

  static async put(url, params) {
    return await instance.put(url, QS.stringify(params))
  }

  static async delete(url, params) {
    return await instance.delete(url, { params: QS.stringify(params) })
  }

  static async upload(url, params) {
    const formData = new FormData();
    Object.keys(params).forEach((key) => {
      formData.append(key, params[key])
    });
    let config = {
      headers: { "Content-Type": "multipart/form-data" }
    };
    return await instance.post(url, formData, config)
  }
}

export default http
