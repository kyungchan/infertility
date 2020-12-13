import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const apiPrefix = process.env.NODE_ENV == "development" ? "/api" : ""; // production mode를 구분
export default new Vuex.Store({
  state: {
    userId: "",
    userName: "",
    rule: "",
  },
  mutations: {
    signIn(state, user) {
      state.userId = user.userId;
      state.userName = user.userName;
      state.rule = user.rule;
    },
    signOut(state) {
      state.userId = "";
      state.userName = "";
      state.rule = "";
      axios.post(`${apiPrefix}/auth/signout`);
    },
  },
  actions: {},
  modules: {},
});
