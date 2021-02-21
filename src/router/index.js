import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter);

// 路由懒加载
const Home = () => import('../views/home/Home.vue');
const Travel = () => import('../views/travel/Travel.vue');
const News = () => import('../views/news/News.vue');
const Mine = () => import('../views/mine/Mine.vue');
const Login = () => import(/* webpackChunkName: "group-login" */ '../views/login/Login.vue');
const LoginByCode = () => import(/* webpackChunkName: "group-login" */ '../views/login/LoginByCode.vue');
const LoginByPwd = () => import(/* webpackChunkName: "group-login" */ '../views/login/LoginByPwd.vue');
const RetrievePwd = () => import(/* webpackChunkName: "group-login" */ '../views/login/RetrievePwd.vue');

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/travel',
    component: Travel,
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/news',
    component: News
  },
  {
    path: '/mine',
    component: Mine
  },
  {
    path: '/login',
    component: Login,
    meta: {
      keepAlive: true,
      requireAuth: false
    }
  },
  {
    path: '/loginByCode',
    name: '/loginByCode',
    component: LoginByCode,
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/loginByPwd',
    name: '/loginByPwd',
    component: LoginByPwd,
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/retrievePwd',
    name: '/retrievePwd',
    component: RetrievePwd,
    meta: {
      requireAuth: false
    }
  }
];

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  // 需要权限校验
  if(to.meta.requireAuth === undefined && store.state.token === null){
    store.commit('toggleTabbarShow', false);
    next('/login');
  }
  next()
});

export default router
