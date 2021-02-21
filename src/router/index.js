import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/login2'
  },
  {
    path: '/home',
    component: import('../views/home/Home.vue'),
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/travel',
    component: import('../views/travel/Travel.vue'),
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/news',
    component: import('../views/news/News.vue')
  },
  {
    path: '/mine',
    component: import('../views/mine/Mine.vue')
  },
  {
    path: '/login',
    component: import('../views/login/Login.vue'),
    meta: {
      keepAlive: true,
      requireAuth: false
    }
  },
  {
    path: '/login2',
    component: () => import('../views/login/login2.vue'),
    meta: {
      keepAlive: true,
      requireAuth: false
    }
  },
  {
    path: '/loginByCode',
    name: '/loginByCode',
    component: import('../views/login/LoginByCode.vue'),
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/loginByPwd',
    name: '/loginByPwd',
    component: import('../views/login/LoginByPwd.vue'),
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/retrievePwd',
    name: '/retrievePwd',
    component: import('../views/login/RetrievePwd.vue'),
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
  // 需要权限校验的校验是否已登录，未登录时跳转登录页面
  if (to.meta.requireAuth === undefined && store.state.token === null) {
    store.commit('toggleTabbarShow', false);
    next('/login');
  }
  next()
});

export default router
