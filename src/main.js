import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import '@/assets/css/reset.css'
// import '@/assets/css/border.css'

// 解决移动端点击延迟200ms的问题
import fastCLick from 'fastclick'
fastCLick.attach(document.body);

import http from '@/utils/http'
import {
  Tabbar, TabbarItem, NavBar, Tab, Tabs, Grid, GridItem, Divider, DropdownMenu, Toast,
  DropdownItem, Switch, Button, List, Cell, CellGroup, PullRefresh, Row, Col, Field, ActionSheet, Icon, Image
} from "vant";

import 'vant/lib/index.css'

Vue.use(Tabbar).use(TabbarItem).use(NavBar).use(Tab).use(Tabs).use(Grid).use(GridItem).use(Divider).use(DropdownMenu)
  .use(DropdownItem).use(Switch).use(Button).use(List).use(Cell).use(CellGroup).use(PullRefresh).use(Row).use(Col)
  .use(Field).use(ActionSheet).use(Icon).use(Image).use(Toast);

import { NoticeBar } from 'vant';
Vue.use(NoticeBar);

import { Pagination } from 'vant';
Vue.use(Pagination);

import { Form } from 'vant';
Vue.use(Form);

import { Popup } from 'vant';
Vue.use(Popup);

import { Picker } from 'vant';
Vue.use(Picker);

import { Swipe, SwipeItem } from 'vant';
Vue.use(Swipe);
Vue.use(SwipeItem);
// 5.图片懒加载
import { Lazyload } from 'vant'
Vue.use(Lazyload)


Vue.config.productionTip = false;

Vue.prototype.$http = http;

// 发布为生产时把这个注释
require('./mock')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
