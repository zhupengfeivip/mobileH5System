import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
  // token
  token: localStorage.getItem("token"),
  tabbarShow: true,
  phone: localStorage.getItem("phone"),
};

import mutations from "@/store/mutations";
import actions from "@/store/actions";
import getters from "@/store/getters";


export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
