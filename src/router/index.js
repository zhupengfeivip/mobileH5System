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
    name: 'show',
    path: '/show',
    component: require('../views/show.vue').default,
    meta: {
      requireAuth: false
    }
  },
  {
    name: 'home',
    path: '/home',
    component: require('../views/home/Home.vue').default,
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/travel',
    component: require('../views/travel/Travel.vue').default,
    meta: {
      requireAuth: false
    }
  },
  {
    name: 'list1',
    path: '/list1',
    component: require('../views/list/index1.vue').default,
    meta: {
      requireAuth: false
    }
  },
  {
    name: 'list2',
    path: '/list2',
    component: require('../views/list/index2.vue').default,
    meta: {
      requireAuth: false
    }
  },
  {
    name: 'list2_edit',
    path: '/list2_edit',
    component: require('../views/list/edit2.vue').default,
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/news',
    component: require('../views/news/News.vue').default
  },
  {
    path: '/mine',
    component: require('../views/mine/Mine.vue').default
  },
  {
    path: '/login',
    component: require('../views/login/Login.vue').default,
    meta: {
      keepAlive: true,
      requireAuth: false
    }
  },
  {
    path: '/login2',
    component: require('../views/login/login2.vue').default,
    meta: {
      keepAlive: true,
      requireAuth: false
    }
  },
  {
    path: '/loginByCode',
    name: 'loginByCode',
    component: require('../views/login/LoginByCode.vue').default,
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/loginByPwd',
    name: 'loginByPwd',
    component: require('../views/login/LoginByPwd.vue').default,
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/retrievePwd',
    name: 'retrievePwd',
    component: require('../views/login/RetrievePwd.vue').default,
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
