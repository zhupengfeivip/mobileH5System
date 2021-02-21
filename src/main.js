import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/reset.css'
import '@/assets/css/border.css'
import fastCLick from 'fastclick'
fastCLick.attach(document.body);
import http from '@/utils/http'
import { Tabbar, TabbarItem, NavBar, Tab, Tabs, Grid, GridItem, Divider, DropdownMenu, Toast,
  DropdownItem, Switch, Button, List, Cell, CellGroup, PullRefresh, Row, Col, Field, ActionSheet, Icon, Image} from "vant";
import 'vant/lib/index.css'

Vue.use(Tabbar).use(TabbarItem).use(NavBar).use(Tab).use(Tabs).use(Grid).use(GridItem).use(Divider).use(DropdownMenu)
    .use(DropdownItem).use(Switch).use(Button).use(List).use(Cell).use(CellGroup).use(PullRefresh).use(Row).use(Col)
    .use(Field).use(ActionSheet).use(Icon).use(Image).use(Toast);

Vue.config.productionTip = false;

Vue.prototype.$http = http;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
